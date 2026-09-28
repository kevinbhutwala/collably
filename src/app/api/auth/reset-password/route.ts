import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { resetTokenRepo } from "@/server/repositories/resetToken.repo";
import { verifyPassword } from "@/server/auth/crypto";
import { z } from "zod";

const schema = z.object({
  token: z.string().min(32, "Invalid or missing reset token."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(128, "Password too long.")
    .regex(/[A-Za-z]/, "Password must contain at least one letter.")
    .regex(/[0-9]/, "Password must contain at least one number."),
  confirmPassword: z.string(),
});

/**
 * POST /api/auth/reset-password
 * Validates the one-time reset token and sets the new password.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0]?.message ?? "Invalid request.";
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    const { token, password, confirmPassword } = parsed.data;

    if (password !== confirmPassword) {
      return NextResponse.json({ error: "Passwords do not match." }, { status: 400 });
    }

    // --- Validate the token ---
    const result = resetTokenRepo.validate(token);
    if (!result.valid) {
      const messages: Record<string, string> = {
        invalid_token: "This reset link is invalid or has been tampered with.",
        already_used:
          "This reset link has already been used. Please request a new one if you need to reset your password again.",
        expired:
          "This reset link has expired (links are valid for 1 hour). Please request a new one.",
      };
      return NextResponse.json(
        { error: messages[result.reason] ?? "Invalid reset link." },
        { status: 400 }
      );
    }

    const { record } = result;
    const user = userRepo.findById(record.userId);
    if (!user) {
      return NextResponse.json({ error: "Account not found." }, { status: 404 });
    }

    // --- Prevent reuse of the same password ---
    if (user.passwordHash && verifyPassword(password, user.passwordHash)) {
      return NextResponse.json(
        {
          error:
            "Your new password cannot be the same as your current password. Please choose a different one.",
        },
        { status: 400 }
      );
    }

    // --- Update the password ---
    const updated = await userRepo.updatePasswordAsync(user.id, password, user.email);
    if (!updated) {
      return NextResponse.json({ error: "Failed to update password. Please try again." }, { status: 500 });
    }

    // --- Consume the token — it can never be used again ---
    resetTokenRepo.consume(record.tokenHash);

    // --- Invalidate any remaining tokens for this email ---
    resetTokenRepo.invalidateAllForEmail(record.email);

    return NextResponse.json({
      success: true,
      message: "Password updated successfully. You can now sign in with your new password.",
    });
  } catch (err: unknown) {
    console.error("[reset-password] Unexpected error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth/reset-password?token=…
 * Lets the client-side reset page validate a token before showing the form.
 */
export async function GET(req: NextRequest) {
  const token = new URL(req.url).searchParams.get("token") ?? "";
  const result = resetTokenRepo.validate(token);
  if (!result.valid) {
    const messages: Record<string, string> = {
      invalid_token: "This reset link is invalid.",
      already_used: "This reset link has already been used.",
      expired: "This reset link has expired.",
    };
    return NextResponse.json(
      { valid: false, reason: result.reason, message: messages[result.reason] ?? "Invalid link." },
      { status: 400 }
    );
  }
  return NextResponse.json({ valid: true });
}
