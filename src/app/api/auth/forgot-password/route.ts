import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { notificationService } from "@/server/services/notification.service";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(8).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, newPassword } = forgotPasswordSchema.parse(body);

    const user = userRepo.findByEmail(email);
    if (!user) {
      // Return success even if not found to prevent user enumeration attacks
      return NextResponse.json({
        success: true,
        message: "If an account matches that email address, password reset instructions have been sent.",
      });
    }

    if (newPassword) {
      // Direct reset
      const ok = userRepo.updatePassword(user.id, newPassword);
      if (!ok) {
        return NextResponse.json({ error: "Failed to update password" }, { status: 500 });
      }
      return NextResponse.json({
        success: true,
        message: "Your password has been reset successfully. You can now log in.",
      });
    }

    // Send reset instructions via email
    await notificationService.sendTransactionalEmail({
      to: user.email,
      subject: "Reset your Collably password",
      template: "welcome",
      variables: {
        name: user.name,
        message: "We received a request to reset your password. You can set a new password on the password reset portal.",
        actionUrl: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/forgot-password?email=${encodeURIComponent(user.email)}`,
        actionLabel: "Reset Password",
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password reset instructions have been dispatched to your email address.",
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to process password reset request" },
      { status: 400 }
    );
  }
}
