import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { subscriptionService } from "@/server/services/subscription.service";
import { verifySessionToken } from "@/server/auth/crypto";
import { ALL_PLANS } from "@/core/constants";

export async function GET(req: NextRequest) {
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

    const subscription = await subscriptionService.getUserSubscription(user.id, user.role);
    const currentPlan = ALL_PLANS[subscription.planId];

    return NextResponse.json({
      subscription,
      currentPlan,
      userRole: user.role,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
