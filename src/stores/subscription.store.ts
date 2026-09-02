import { create } from "zustand";
import {
  SubscriptionEntity,
  SubscriptionPlan,
  SubscriptionPlanId,
  SubscriptionInterval,
  PlanFeatureKey,
} from "@/core/types";
import { ALL_PLANS, CREATOR_PLANS, BRAND_PLANS } from "@/core/constants";

interface SubscriptionState {
  subscription: SubscriptionEntity | null;
  currentPlan: SubscriptionPlan | null;
  creatorPlans: SubscriptionPlan[];
  brandPlans: SubscriptionPlan[];
  isLoading: boolean;
  isUpgradeModalOpen: boolean;
  targetUpgradePlanId: SubscriptionPlanId | null;

  setSubscription: (subscription: SubscriptionEntity | null) => void;
  fetchSubscription: () => Promise<SubscriptionEntity | null>;
  fetchPlans: () => Promise<void>;
  upgradePlan: (
    planId: SubscriptionPlanId,
    interval?: SubscriptionInterval
  ) => Promise<SubscriptionEntity>;
  cancelPlan: (immediate?: boolean) => Promise<SubscriptionEntity>;
  resumePlan: () => Promise<SubscriptionEntity>;
  openUpgradeModal: (preselectedPlanId?: SubscriptionPlanId) => void;
  closeUpgradeModal: () => void;
  hasFeature: (key: PlanFeatureKey) => boolean;
  getQuota: (metric: "activeCampaigns" | "campaignApplications") => {
    limit: number;
    current: number;
    percent: number;
    allowed: boolean;
  };
}

export const useSubscriptionStore = create<SubscriptionState>((set, get) => ({
  subscription: null,
  currentPlan: null,
  creatorPlans: Object.values(CREATOR_PLANS),
  brandPlans: Object.values(BRAND_PLANS),
  isLoading: false,
  isUpgradeModalOpen: false,
  targetUpgradePlanId: null,

  setSubscription: (subscription: SubscriptionEntity | null) => {
    const currentPlan = subscription ? ALL_PLANS[subscription.planId] || null : null;
    set({ subscription, currentPlan });
  },

  fetchSubscription: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/subscriptions/me");
      if (!res.ok) {
        set({ subscription: null, currentPlan: null, isLoading: false });
        return null;
      }
      const data = await res.json();
      const sub: SubscriptionEntity = data.subscription;
      const currentPlan = ALL_PLANS[sub.planId] || null;
      set({ subscription: sub, currentPlan, isLoading: false });
      return sub;
    } catch {
      set({ subscription: null, currentPlan: null, isLoading: false });
      return null;
    }
  },

  fetchPlans: async () => {
    try {
      const res = await fetch("/api/subscriptions/plans");
      if (res.ok) {
        const data = await res.json();
        set({
          creatorPlans: data.creatorPlans || Object.values(CREATOR_PLANS),
          brandPlans: data.brandPlans || Object.values(BRAND_PLANS),
        });
      }
    } catch {
      // Fallback to constants
    }
  },

  upgradePlan: async (planId: SubscriptionPlanId, interval: SubscriptionInterval = "monthly") => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/subscriptions/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, interval }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to upgrade plan");
      }

      const data = await res.json();
      const updated: SubscriptionEntity = data.subscription;
      const currentPlan = ALL_PLANS[updated.planId] || null;
      set({
        subscription: updated,
        currentPlan,
        isLoading: false,
        isUpgradeModalOpen: false,
      });
      return updated;
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  cancelPlan: async (immediate: boolean = false) => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/subscriptions/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ immediate }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to cancel subscription");
      }

      const data = await res.json();
      const updated: SubscriptionEntity = data.subscription;
      const currentPlan = ALL_PLANS[updated.planId] || null;
      set({ subscription: updated, currentPlan, isLoading: false });
      return updated;
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  resumePlan: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch("/api/subscriptions/resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to resume subscription");
      }

      const data = await res.json();
      const updated: SubscriptionEntity = data.subscription;
      const currentPlan = ALL_PLANS[updated.planId] || null;
      set({ subscription: updated, currentPlan, isLoading: false });
      return updated;
    } catch (err) {
      set({ isLoading: false });
      throw err;
    }
  },

  openUpgradeModal: (preselectedPlanId?: SubscriptionPlanId) => {
    set({
      isUpgradeModalOpen: true,
      targetUpgradePlanId: preselectedPlanId || null,
    });
  },

  closeUpgradeModal: () => {
    set({ isUpgradeModalOpen: false, targetUpgradePlanId: null });
  },

  hasFeature: (key: PlanFeatureKey): boolean => {
    const { subscription } = get();
    if (!subscription) return false;

    // Admin override
    if (subscription.features.adminOverride) return true;

    // Check status
    if (
      subscription.status !== "active" &&
      subscription.status !== "trialing" &&
      subscription.status !== "cancelled"
    ) {
      return false;
    }

    const val = subscription.features[key as keyof typeof subscription.features];
    if (typeof val === "boolean") return val;
    if (typeof val === "number") return val === -1 || val > 0;
    return false;
  },

  getQuota: (metric: "activeCampaigns" | "campaignApplications") => {
    const { subscription } = get();
    if (!subscription) {
      return { limit: 0, current: 0, percent: 100, allowed: false };
    }

    if (subscription.features.adminOverride) {
      return { limit: -1, current: 0, percent: 0, allowed: true };
    }

    if (metric === "activeCampaigns") {
      const limit = subscription.features.maxActiveCampaigns;
      const current = subscription.usage.activeCampaignsCount || 0;
      if (limit === -1) return { limit: -1, current, percent: 0, allowed: true };
      const percent = Math.min(100, Math.round((current / limit) * 100));
      return { limit, current, percent, allowed: current < limit };
    } else {
      const limit = subscription.features.maxApplicationsPerMonth;
      const current = subscription.usage.applicationsThisMonth || 0;
      if (limit === -1) return { limit: -1, current, percent: 0, allowed: true };
      const percent = Math.min(100, Math.round((current / limit) * 100));
      return { limit, current, percent, allowed: current < limit };
    }
  },
}));
