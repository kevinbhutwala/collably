import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { subscriptionService } from "@/server/services/subscription.service";
import { verifySessionToken } from "@/server/auth/crypto";

export async function POST(req: NextRequest) {
  try {
    const token =
      req.cookies.get("abeycollab_session")?.value ||
      req.cookies.get("collably_session")?.value ||
      req.cookies.get("valence_session")?.value ||
      req.headers.get("authorization")?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const payload = verifySessionToken(token);
    if (!payload) {
      return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
    }

    const user = userRepo.findById(payload.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedSubscription = await subscriptionService.resumeSubscription(user.id);

    return NextResponse.json({
      success: true,
      message: "Subscription resumed successfully.",
      subscription: updatedSubscription,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to resume subscription" }, { status: 500 });
  }
}
