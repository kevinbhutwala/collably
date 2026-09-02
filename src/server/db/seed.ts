import { DatabaseState, UserEntity } from "./schema";
import { hashPassword } from "../auth/crypto";
import { ALL_PLANS } from "@/core/constants";
import { SubscriptionEntity } from "@/core/types";

export function getInitialSeedDatabase(): DatabaseState {
  const defaultPasswordHash = hashPassword("password123");
  const adminPasswordHash = hashPassword("admin123");

  const now = new Date().toISOString();
  const futureDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

  const initialUsers: UserEntity[] = [
    // ── 1. Demo Creator ──
    {
      id: "user-creator",
      name: "Demo Creator",
      email: "creator@collably.io",
      passwordHash: defaultPasswordHash,
      role: "creator",
      avatarUrl: "",
      verified: true,
      createdAt: now,
      updatedAt: now,
    },
    // ── 2. Demo Brand ──
    {
      id: "user-brand",
      name: "Demo Brand",
      email: "brand@collably.io",
      passwordHash: defaultPasswordHash,
      role: "brand",
      avatarUrl: "",
      verified: true,
      createdAt: now,
      updatedAt: now,
    },
    // ── 3. Kevin — Super Admin ──
    {
      id: "user-owner",
      name: "Kevin Bhutwala",
      email: "kevinbhutwala417@gmail.com",
      passwordHash: adminPasswordHash,
      role: "agency_admin",
      avatarUrl: "",
      verified: true,
      createdAt: now,
      updatedAt: now,
    },
  ];

  const initialSubscriptions: SubscriptionEntity[] = [
    // Creator — Pro plan
    {
      id: "sub-creator",
      userId: "user-creator",
      role: "creator",
      planId: "creator_pro",
      status: "active",
      interval: "monthly",
      currentPeriodStart: now,
      currentPeriodEnd: futureDate,
      cancelAtPeriodEnd: false,
      price: 29,
      currency: "USD",
      features: { ...ALL_PLANS.creator_pro.features },
      usage: {
        activeCampaignsCount: 0,
        applicationsThisMonth: 0,
        crmContactsCount: 0,
        aiTokensUsed: 0,
        lastResetDate: now,
      },
      createdAt: now,
      updatedAt: now,
    },
    // Brand — Growth plan
    {
      id: "sub-brand",
      userId: "user-brand",
      role: "brand",
      planId: "brand_growth",
      status: "active",
      interval: "monthly",
      currentPeriodStart: now,
      currentPeriodEnd: futureDate,
      cancelAtPeriodEnd: false,
      price: 199,
      currency: "USD",
      features: { ...ALL_PLANS.brand_growth.features },
      usage: {
        activeCampaignsCount: 0,
        applicationsThisMonth: 0,
        crmContactsCount: 0,
        aiTokensUsed: 0,
        lastResetDate: now,
      },
      createdAt: now,
      updatedAt: now,
    },
    // Kevin — Admin (unlimited)
    {
      id: "sub-owner",
      userId: "user-owner",
      role: "agency_admin",
      planId: "brand_enterprise",
      status: "active",
      interval: "annual",
      currentPeriodStart: now,
      currentPeriodEnd: futureDate,
      cancelAtPeriodEnd: false,
      price: 0,
      currency: "USD",
      features: {
        ...ALL_PLANS.brand_enterprise.features,
        adminOverride: true,
        maxActiveCampaigns: -1,
        maxApplicationsPerMonth: -1,
        aiPitchGenerator: true,
        advancedAnalytics: true,
        instantPayouts: true,
        verifiedBadge: true,
      },
      usage: {
        activeCampaignsCount: 0,
        applicationsThisMonth: 0,
        crmContactsCount: 0,
        aiTokensUsed: 0,
        lastResetDate: now,
      },
      createdAt: now,
      updatedAt: now,
    },
  ];

  return {
    users: initialUsers,
    creators: [],
    brands: [],
    campaigns: [],
    applications: [],
    collaborations: [],
    payouts: [],
    subscriptions: initialSubscriptions,
    crmContacts: [],
    shortlists: [],
    disputes: [],
    tickets: [],
    payments: [],
    mediaAssets: [],
    conversations: [],
    messages: [],
    notifications: [],
    webhookEvents: [],
    aiUsage: [],
    auditLogs: [],
  };
}
