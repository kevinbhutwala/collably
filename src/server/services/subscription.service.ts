import { subscriptionRepo } from "../repositories/subscription.repo";
import { userRepo } from "../repositories/user.repo";
import {
  SubscriptionEntity,
  SubscriptionPlanId,
  SubscriptionInterval,
  PlanFeatureKey,
  UserRole,
} from "@/core/types";
import { ALL_PLANS, CREATOR_PLANS, BRAND_PLANS } from "@/core/constants";

export class SubscriptionService {
  /**
   * Resolves the active subscription for a user.
   * If none exists, creates the default Starter tier.
   */
  async getUserSubscription(userId: string, roleHint?: UserRole): Promise<SubscriptionEntity> {
    let sub = subscriptionRepo.findByUserId(userId);

    const user = userRepo.findById(userId);
    const role = user?.role || roleHint || "creator";

    // Super Admin / Agency Admin override
    const isAdmin = ["super_admin", "agency_admin", "agency_owner"].includes(role);

    if (!sub) {
      const defaultPlanId: SubscriptionPlanId = isAdmin
        ? "brand_enterprise"
        : role === "brand" || role === "brand_owner" || role === "brand_manager"
        ? "brand_starter"
        : "creator_starter";

      sub = subscriptionRepo.create({
        userId,
        role,
        planId: defaultPlanId,
        status: "active",
        interval: "monthly",
      });
    }

    // Auto-check expired / cancelled subscription lifecycle
    if (sub.status === "active" || sub.status === "trialing" || sub.status === "cancelled") {
      const now = new Date();
      const periodEnd = new Date(sub.currentPeriodEnd);
      if (now > periodEnd) {
        if (sub.cancelAtPeriodEnd || sub.status === "cancelled") {
          // Downgrade to starter tier
          const fallbackPlan: SubscriptionPlanId =
            role === "brand" || role === "brand_owner" ? "brand_starter" : "creator_starter";
          sub = subscriptionRepo.create({
            userId,
            role,
            planId: fallbackPlan,
            status: "active",
            interval: "monthly",
          });
        }
      }
    }

    // If admin, ensure adminOverride is flagged
    if (isAdmin && sub) {
      sub.features.adminOverride = true;
      sub.features.maxActiveCampaigns = -1;
      sub.features.maxApplicationsPerMonth = -1;
      sub.features.crmPipeline = true;
      sub.features.aiCreatorMatching = true;
      sub.features.aiPitchGenerator = true;
      sub.features.advancedAnalytics = true;
      sub.features.advancedRoiTelemetry = true;
    }

    return sub;
  }

  /**
   * Upgrades, downgrades, or switches billing interval for a user.
   */
  async upgradeOrChangePlan(
    userId: string,
    planId: SubscriptionPlanId,
    interval: SubscriptionInterval = "monthly"
  ): Promise<SubscriptionEntity> {
    const plan = ALL_PLANS[planId];
    if (!plan) {
      throw new Error(`Plan "${planId}" does not exist.`);
    }

    const user = userRepo.findById(userId);
    const role = user?.role || (plan.role === "brand" ? "brand" : "creator");

    // Ensure role matches plan type (unless admin)
    const isAdmin = ["super_admin", "agency_admin", "agency_owner"].includes(role);
    if (!isAdmin) {
      if (plan.role === "creator" && (role === "brand" || role === "brand_owner")) {
        throw new Error("Brand accounts cannot subscribe to Creator plans.");
      }
      if (plan.role === "brand" && role === "creator") {
        throw new Error("Creator accounts cannot subscribe to Brand plans.");
      }
    }

    const now = new Date();
    const periodEnd = new Date(now);
    periodEnd.setDate(periodEnd.getDate() + (interval === "annual" ? 365 : 30));

    const price = interval === "annual" ? plan.annualPrice * 12 : plan.monthlyPrice;

    let sub = subscriptionRepo.findByUserId(userId);
    if (!sub) {
      sub = subscriptionRepo.create({
        userId,
        role,
        planId,
        status: "active",
        interval,
        price,
      });
    } else {
      sub = subscriptionRepo.updateByUserId(userId, {
        planId,
        role,
        status: "active",
        interval,
        price,
        currentPeriodStart: now.toISOString(),
        currentPeriodEnd: periodEnd.toISOString(),
        cancelAtPeriodEnd: false,
        features: { ...plan.features },
      })!;
    }

    return sub;
  }

  /**
   * Cancel subscription (scheduled for end of period or immediate).
   */
  async cancelSubscription(userId: string, immediate: boolean = false): Promise<SubscriptionEntity> {
    const sub = await this.getUserSubscription(userId);

    if (immediate) {
      const fallbackPlan: SubscriptionPlanId =
        sub.role === "brand" || sub.role === "brand_owner" ? "brand_starter" : "creator_starter";
      return this.upgradeOrChangePlan(userId, fallbackPlan, "monthly");
    }

    const updated = subscriptionRepo.updateByUserId(userId, {
      cancelAtPeriodEnd: true,
      status: "cancelled",
    });

    return updated || sub;
  }

  /**
   * Resumes a subscription marked for cancellation.
   */
  async resumeSubscription(userId: string): Promise<SubscriptionEntity> {
    const sub = await this.getUserSubscription(userId);
    const updated = subscriptionRepo.updateByUserId(userId, {
      cancelAtPeriodEnd: false,
      status: "active",
    });
    return updated || sub;
  }

  /**
   * Checks if user has access to a specific feature flag.
   */
  async checkFeatureAccess(userId: string, featureKey: PlanFeatureKey): Promise<boolean> {
    const user = userRepo.findById(userId);
    if (!user) return false;

    // Admin always granted access
    if (["super_admin", "agency_admin", "agency_owner"].includes(user.role)) {
      return true;
    }

    const sub = await this.getUserSubscription(userId, user.role);
    if (sub.status !== "active" && sub.status !== "trialing" && sub.status !== "cancelled") {
      return false;
    }

    const value = sub.features[featureKey as keyof typeof sub.features];
    if (typeof value === "boolean") {
      return value;
    }
    if (typeof value === "number") {
      return value === -1 || value > 0;
    }
    return false;
  }

  /**
   * Enforces numeric campaign quota for Brand accounts.
   */
  async checkCampaignQuota(
    brandUserId: string,
    currentActiveCampaignsCount?: number
  ): Promise<{ allowed: boolean; limit: number; current: number; planName: string; planId: SubscriptionPlanId }> {
    const user = userRepo.findById(brandUserId);
    if (user && ["super_admin", "agency_admin", "agency_owner"].includes(user.role)) {
      return { allowed: true, limit: -1, current: 0, planName: "Admin Override", planId: "brand_enterprise" };
    }

    const sub = await this.getUserSubscription(brandUserId, "brand");
    const limit = sub.features.maxActiveCampaigns;
    const current =
      currentActiveCampaignsCount !== undefined
        ? currentActiveCampaignsCount
        : sub.usage.activeCampaignsCount || 0;

    const plan = ALL_PLANS[sub.planId] || BRAND_PLANS.brand_starter;
    const allowed = limit === -1 || current < limit;

    return {
      allowed,
      limit,
      current,
      planName: plan.name,
      planId: sub.planId,
    };
  }

  /**
   * Enforces numeric application quota for Creator accounts.
   */
  async checkApplicationQuota(
    creatorUserId: string
  ): Promise<{ allowed: boolean; limit: number; current: number; planName: string; planId: SubscriptionPlanId }> {
    const user = userRepo.findById(creatorUserId);
    if (user && ["super_admin", "agency_admin", "agency_owner"].includes(user.role)) {
      return { allowed: true, limit: -1, current: 0, planName: "Admin Override", planId: "creator_enterprise" };
    }

    const sub = await this.getUserSubscription(creatorUserId, "creator");
    const limit = sub.features.maxApplicationsPerMonth;
    const current = sub.usage.applicationsThisMonth || 0;

    const plan = ALL_PLANS[sub.planId] || CREATOR_PLANS.creator_starter;
    const allowed = limit === -1 || current < limit;

    return {
      allowed,
      limit,
      current,
      planName: plan.name,
      planId: sub.planId,
    };
  }

  /**
   * Record usage metric consumption
   */
  async recordUsage(
    userId: string,
    key: "activeCampaignsCount" | "applicationsThisMonth" | "crmContactsCount" | "aiTokensUsed",
    amount: number = 1
  ) {
    return subscriptionRepo.incrementUsage(userId, key, amount);
  }
}

export const subscriptionService = new SubscriptionService();
