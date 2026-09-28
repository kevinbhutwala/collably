import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { resetTokenRepo } from "@/server/repositories/resetToken.repo";
import { notificationService } from "@/server/services/notification.service";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Please enter a valid email address."),
});

// Generic message — never reveal whether an email is registered (prevents enumeration).
const GENERIC_RESPONSE = {
  success: true,
  message:
    "If an account exists with this email, we've sent you a password reset link. Check your inbox (and spam folder).",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const email = parsed.data.email.toLowerCase().trim();

    // --- Rate limit: max 3 requests per hour per email ---
    if (resetTokenRepo.isRateLimited(email)) {
      // Still return generic message to prevent enumeration via timing.
      return NextResponse.json(GENERIC_RESPONSE);
    }

    // --- Purge stale tokens (background housekeeping) ---
    resetTokenRepo.purgeExpired();

    const user = userRepo.findByEmail(email);
    if (!user) {
      // Non-existent user: return generic message immediately.
      return NextResponse.json(GENERIC_RESPONSE);
    }

    // OAuth-only users (no password hash set): still return generic message.
    if (!user.passwordHash || user.passwordHash === "") {
      return NextResponse.json(GENERIC_RESPONSE);
    }

    // Invalidate any outstanding (unused) tokens for this email before issuing a new one.
    // This ensures old links stop working as soon as a new request is made.
    resetTokenRepo.invalidateAllForEmail(email);

    // Create new signed token (only hash stored in DB).
    const { raw } = resetTokenRepo.create(user.id, email);

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") || "http://localhost:3000";
    const resetUrl = `${appUrl}/reset-password?token=${raw}`;

    // Send reset email via Resend (already configured in env).
    await notificationService.sendTransactionalEmail({
      to: email,
      subject: "Reset your AbeyCollab password",
      template: "welcome",
      variables: {
        name: user.name,
        message:
          "We received a request to reset your AbeyCollab password. This link expires in 1 hour and can only be used once.",
        actionUrl: resetUrl,
        actionLabel: "Reset My Password",
      },
    });

    return NextResponse.json(GENERIC_RESPONSE);
  } catch (err: unknown) {
    console.error("[forgot-password] Unexpected error:", err instanceof Error ? err.message : err);
    // Return generic message even on server error to prevent enumeration.
    return NextResponse.json(GENERIC_RESPONSE);
  }
}
