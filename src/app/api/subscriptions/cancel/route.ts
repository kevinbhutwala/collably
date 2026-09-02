import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { subscriptionService } from "@/server/services/subscription.service";
import { verifySessionToken } from "@/server/auth/crypto";

export async function POST(req: NextRequest) {
  try {
    const token =
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

    let immediate = false;
    try {
      const body = await req.json();
      immediate = Boolean(body?.immediate);
    } catch {
      // Empty body is valid
    }

    const updatedSubscription = await subscriptionService.cancelSubscription(user.id, immediate);

    return NextResponse.json({
      success: true,
      message: immediate
        ? "Subscription cancelled immediately and downgraded to Starter tier."
        : "Subscription scheduled for cancellation at the end of the billing period.",
      subscription: updatedSubscription,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to cancel subscription" }, { status: 500 });
  }
}
