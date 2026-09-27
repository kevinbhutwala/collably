import { DatabaseState, UserEntity } from "./schema";
import { hashPassword } from "../auth/crypto";
import crypto from "crypto";
import { ALL_PLANS } from "@/core/constants";
import { SubscriptionEntity, CreatorProfile, BrandProfile, AlgorithmWeightsConfig, PlatformMetricEntity, UserBadgeEntity } from "@/core/types";
import { MOCK_BRANDS } from "@/mock/brands.mock";
import { MOCK_CAMPAIGNS } from "@/mock/campaigns.mock";
import { MOCK_CREATORS, ELENA_ROSTOVA_PROFILE } from "@/mock/creators.mock";
import { MOCK_COLLABORATIONS } from "@/mock/collaborations.mock";

export const DEFAULT_ALGORITHM_CONFIG: AlgorithmWeightsConfig = {
  id: "algo-config-default",
  creatorWeights: {
    engagementRate: 0.20,
    engagementGrowth: 0.15,
    profileViews: 0.10,
    profileSaves: 0.10,
    campaignApplications: 0.05,
    successfulCollabs: 0.15,
    completionRate: 0.10,
    responseRate: 0.05,
    reviewsRating: 0.10,
  },
  campaignWeights: {
    views: 0.20,
    applications: 0.30,
    velocity: 0.25,
    categoryDemand: 0.15,
    daysRemaining: 0.10,
  },
  risingCriteria: {
    maxFollowers: 100000,
    minEngagementRate: 4.5,
    minRecentVelocity: 1.25,
    minCompletedDeals: 1,
  },
  badgeThresholds: {
    fastResponderMaxHours: 2,
    topPerformerMinCompletionRate: 95,
    topRatedMinRating: 4.8,
    topRatedMinReviewsCount: 3,
    brandFavoriteMinRehireRate: 60,
    newTalentMaxAccountAgeDays: 30,
  },
  updatedAt: new Date().toISOString(),
};


export function getInitialSeedDatabase(): DatabaseState {
  const adminPassword = process.env.ADMIN_INITIAL_PASSWORD || "admin123";
  const creatorPassword = process.env.CREATOR_INITIAL_PASSWORD || "password123";
  const brandPassword = process.env.BRAND_INITIAL_PASSWORD || "password123";

  const creatorPasswordHash = hashPassword(creatorPassword);
  const brandPasswordHash = hashPassword(brandPassword);
  const adminPasswordHash = hashPassword(adminPassword);

  const now = new Date().toISOString();
  const futureDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();

  const initialUsers: UserEntity[] = [
    // ── 1. Agency Super Admin ──
    {
      id: "user-owner",
      name: "Kevin Bhutwala",
      email: "kevinbhutwala417@gmail.com",
      passwordHash: adminPasswordHash,
      role: "agency_admin",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
      verified: true,
      createdAt: now,
      updatedAt: now,
    },
    // ── 2. Verified Creator: Waseem Khan ──
    {
      id: "user-c-waseem",
      name: "Waseem Khan",
      email: "Bloggermaster786@gmail.com",
      passwordHash: creatorPasswordHash,
      role: "creator",
      avatarUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80",
      verified: true,
      createdAt: now,
      updatedAt: now,
    },
    // ── 3. Verified Creator: Prarthana ──
    {
      id: "user-c-prarthana",
      name: "Prarthana",
      email: "prarthaana04@creators.collably.io",
      passwordHash: creatorPasswordHash,
      role: "creator",
      avatarUrl: "/creators/prarthana.jpg",
      verified: true,
      createdAt: now,
      updatedAt: now,
    },
    // ── 4. Verified Creator: Kushi Hanamsagar ──
    {
      id: "user-c-kushi",
      name: "Kushi Hanamsagar",
      email: "kushihanamsagar9@creators.collably.io",
      passwordHash: creatorPasswordHash,
      role: "creator",
      avatarUrl: "/creators/kushi-hanamsagar.jpg",
      verified: true,
      createdAt: now,
      updatedAt: now,
    },
    // ── 5. Verified Creator: Pooja Bera ──
    {
      id: "user-c-pooja",
      name: "Pooja Bera",
      email: "berapooja1994@gmail.com",
      passwordHash: creatorPasswordHash,
      role: "creator",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
      verified: true,
      createdAt: now,
      updatedAt: now,
    },
    // ── 6. Verified Creator: Kunal Rajput ──
    {
      id: "user-c-kunal",
      name: "Kunal Rajput",
      email: "subtle.strength@abeycollab.io",
      passwordHash: creatorPasswordHash,
      role: "creator",
      avatarUrl: "/creators/kunal-rajput.jpg",
      verified: true,
      createdAt: now,
      updatedAt: now,
    },
    // ── 7. Verified Brand: The Whole Truth Foods ──
    {
      id: "user-brand-truth",
      name: "The Whole Truth Foods",
      email: "partnerships@thewholetruthfoods.com",
      passwordHash: brandPasswordHash,
      role: "brand",
      avatarUrl: "/brands/the-whole-truth.png",
      verified: true,
      createdAt: now,
      updatedAt: now,
    },
    // ── 8. Verified Brand: Snitch ──
    {
      id: "user-brand-snitch",
      name: "Snitch",
      email: "influencer.reach@snitch.co.in",
      passwordHash: brandPasswordHash,
      role: "brand",
      avatarUrl: "/brands/snitch.png",
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

  // Curated brands and campaigns roster
  const initialBrands: BrandProfile[] = [...MOCK_BRANDS];

  // Curated creators roster (8 creators)
  const initialCreators: CreatorProfile[] = [...MOCK_CREATORS];

  // Seed baseline platform metrics for trending calculation
  const seedMetrics: PlatformMetricEntity[] = [
    { id: "met-1", eventType: "profile_view", targetId: "creator-1", targetType: "creator", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: "met-2", eventType: "profile_view", targetId: "creator-1", targetType: "creator", timestamp: new Date(Date.now() - 7200000).toISOString() },
    { id: "met-3", eventType: "profile_save", targetId: "creator-1", targetType: "creator", timestamp: new Date(Date.now() - 10800000).toISOString() },
    { id: "met-4", eventType: "campaign_apply", targetId: "camp-1", targetType: "campaign", timestamp: new Date(Date.now() - 14400000).toISOString() },
    { id: "met-5", eventType: "profile_view", targetId: "creator-2", targetType: "creator", timestamp: new Date(Date.now() - 18000000).toISOString() },
    { id: "met-6", eventType: "profile_view", targetId: "creator-3", targetType: "creator", timestamp: new Date(Date.now() - 21600000).toISOString() },
    { id: "met-7", eventType: "profile_save", targetId: "creator-3", targetType: "creator", timestamp: new Date(Date.now() - 25200000).toISOString() },
  ];

  return {
    users: initialUsers,
    creators: initialCreators,
    brands: initialBrands,
    campaigns: MOCK_CAMPAIGNS,
    applications: [],
    collaborations: [...MOCK_COLLABORATIONS],
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
    ledgerEntries: [],
    platformMetrics: seedMetrics,
    algorithmConfig: DEFAULT_ALGORITHM_CONFIG,
    userBadges: [],
    suspiciousActivities: [],
  };
}

