import { db } from "../db/database";
import {
  SubscriptionEntity,
  SubscriptionPlanId,
  SubscriptionStatus,
  SubscriptionInterval,
  PlanUsageStats,
  UserRole,
} from "@/core/types";
import { ALL_PLANS } from "@/core/constants";

export class SubscriptionRepository {
  findByUserId(userId: string): SubscriptionEntity | undefined {
    return (db.getState().subscriptions || []).find((s) => s.userId === userId);
  }

  findByOrganizationId(organizationId: string): SubscriptionEntity | undefined {
    return (db.getState().subscriptions || []).find(
      (s) => s.organizationId === organizationId
    );
  }

  getById(id: string): SubscriptionEntity | undefined {
    return (db.getState().subscriptions || []).find((s) => s.id === id);
  }

  getAll(): SubscriptionEntity[] {
    return [...(db.getState().subscriptions || [])];
  }

  create(data: {
    userId: string;
    organizationId?: string;
    role: UserRole;
    planId: SubscriptionPlanId;
    status?: SubscriptionStatus;
    interval?: SubscriptionInterval;
    price?: number;
  }): SubscriptionEntity {
    const plan = ALL_PLANS[data.planId];
    if (!plan) {
      throw new Error(`Invalid plan ID: ${data.planId}`);
    }

    const interval = data.interval || "monthly";
    const price =
      data.price !== undefined
        ? data.price
        : interval === "annual"
        ? plan.annualPrice * 12
        : plan.monthlyPrice;

    const now = new Date();
    const periodEnd = new Date(now);
    periodEnd.setDate(periodEnd.getDate() + (interval === "annual" ? 365 : 30));

    const initialUsage: PlanUsageStats = {
      activeCampaignsCount: 0,
      applicationsThisMonth: 0,
      crmContactsCount: 0,
      aiTokensUsed: 0,
      lastResetDate: now.toISOString(),
    };

    const newSubscription: SubscriptionEntity = {
      id: `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      userId: data.userId,
      organizationId: data.organizationId,
      role: data.role,
      planId: data.planId,
      status: data.status || "active",
      interval,
      currentPeriodStart: now.toISOString(),
      currentPeriodEnd: periodEnd.toISOString(),
      cancelAtPeriodEnd: false,
      price,
      currency: "USD",
      features: { ...plan.features },
      usage: initialUsage,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
    };

    db.updateState((state) => {
      state.subscriptions = state.subscriptions || [];
      // Remove any previous subscription for this user
      const existingIdx = state.subscriptions.findIndex((s) => s.userId === data.userId);
      if (existingIdx >= 0) {
        state.subscriptions[existingIdx] = newSubscription;
      } else {
        state.subscriptions.push(newSubscription);
      }
    });

    return newSubscription;
  }

  update(id: string, updates: Partial<SubscriptionEntity>): SubscriptionEntity | null {
    let updated: SubscriptionEntity | null = null;

    db.updateState((state) => {
      state.subscriptions = state.subscriptions || [];
      const idx = state.subscriptions.findIndex((s) => s.id === id);
      if (idx >= 0) {
        state.subscriptions[idx] = {
          ...state.subscriptions[idx],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        updated = state.subscriptions[idx];
      }
    });

    return updated;
  }

  updateByUserId(userId: string, updates: Partial<SubscriptionEntity>): SubscriptionEntity | null {
    let updated: SubscriptionEntity | null = null;

    db.updateState((state) => {
      state.subscriptions = state.subscriptions || [];
      const idx = state.subscriptions.findIndex((s) => s.userId === userId);
      if (idx >= 0) {
        state.subscriptions[idx] = {
          ...state.subscriptions[idx],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        updated = state.subscriptions[idx];
      }
    });

    return updated;
  }

  incrementUsage(
    userId: string,
    key: "activeCampaignsCount" | "applicationsThisMonth" | "crmContactsCount" | "aiTokensUsed",
    amount: number = 1
  ): PlanUsageStats | null {
    let newUsage: PlanUsageStats | null = null;

    db.updateState((state) => {
      state.subscriptions = state.subscriptions || [];
      const sub = state.subscriptions.find((s) => s.userId === userId);
      if (sub) {
        sub.usage = sub.usage || {
          activeCampaignsCount: 0,
          applicationsThisMonth: 0,
          crmContactsCount: 0,
          aiTokensUsed: 0,
          lastResetDate: new Date().toISOString(),
        };
        sub.usage[key] = (sub.usage[key] || 0) + amount;
        sub.updatedAt = new Date().toISOString();
        newUsage = { ...sub.usage };
      }
    });

    return newUsage;
  }

  decrementUsage(
    userId: string,
    key: "activeCampaignsCount" | "applicationsThisMonth" | "crmContactsCount" | "aiTokensUsed",
    amount: number = 1
  ): PlanUsageStats | null {
    let newUsage: PlanUsageStats | null = null;

    db.updateState((state) => {
      state.subscriptions = state.subscriptions || [];
      const sub = state.subscriptions.find((s) => s.userId === userId);
      if (sub) {
        sub.usage = sub.usage || {
          activeCampaignsCount: 0,
          applicationsThisMonth: 0,
          crmContactsCount: 0,
          aiTokensUsed: 0,
          lastResetDate: new Date().toISOString(),
        };
        sub.usage[key] = Math.max(0, (sub.usage[key] || 0) - amount);
        sub.updatedAt = new Date().toISOString();
        newUsage = { ...sub.usage };
      }
    });

    return newUsage;
  }
}

export const subscriptionRepo = new SubscriptionRepository();
