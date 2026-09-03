import { NextRequest, NextResponse } from "next/server";
import { userRepo } from "@/server/repositories/user.repo";
import { subscriptionService } from "@/server/services/subscription.service";
import { verifySessionToken } from "@/server/auth/crypto";
import { ALL_PLANS } from "@/core/constants";
import { SubscriptionPlanId, SubscriptionInterval } from "@/core/types";

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

    const body = await req.json();
    const { planId, interval } = body as {
      planId: SubscriptionPlanId;
      interval?: SubscriptionInterval;
    };

    if (!planId || !ALL_PLANS[planId]) {
      return NextResponse.json({ error: "Invalid plan identifier" }, { status: 400 });
    }

    const targetPlan = ALL_PLANS[planId];
    const isAdmin = ["super_admin", "agency_admin", "agency_owner"].includes(user.role);

    // Validate role compatibility
    if (!isAdmin) {
      if (targetPlan.role === "creator" && (user.role === "brand" || user.role === "brand_owner")) {
        return NextResponse.json(
          { error: "Brand accounts cannot subscribe to Creator plans." },
          { status: 403 }
        );
      }
      if (targetPlan.role === "brand" && user.role === "creator") {
        return NextResponse.json(
          { error: "Creator accounts cannot subscribe to Brand plans." },
          { status: 403 }
        );
      }
    }

    // A plan change for a paid tier must be confirmed by a payment-provider
    // webhook or verified payment. In non-production development or for admins,
    // allow direct plan switches so all tiers and features can be tested.
    const isDev = process.env.NODE_ENV !== "production";
    const selectedPrice = interval === "annual" ? targetPlan.annualPrice : targetPlan.monthlyPrice;
    if (!isAdmin && !isDev && selectedPrice > 0) {
      return NextResponse.json(
        {
          error: "Checkout is not configured for paid plans.",
          code: "PAYMENT_REQUIRED",
          planId,
        },
        { status: 402 }
      );
    }

    const updatedSubscription = await subscriptionService.upgradeOrChangePlan(
      user.id,
      planId,
      interval || "monthly"
    );

    return NextResponse.json({
      success: true,
      message: `Plan upgraded to ${targetPlan.name} successfully.`,
      subscription: updatedSubscription,
      currentPlan: targetPlan,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update subscription" }, { status: 500 });
  }
}
