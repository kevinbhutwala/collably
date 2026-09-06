import { DatabaseState, UserEntity } from "./schema";
import { hashPassword } from "../auth/crypto";
import { ALL_PLANS } from "@/core/constants";
import { SubscriptionEntity, CreatorProfile, BrandProfile, AlgorithmWeightsConfig, PlatformMetricEntity, UserBadgeEntity } from "@/core/types";
import { MOCK_CAMPAIGNS } from "@/mock/campaigns.mock";
import { MOCK_CREATORS } from "@/mock/creators.mock";
import { MOCK_CONVERSATIONS, MOCK_MESSAGES } from "@/mock/messages.mock";

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

  // Functional demo profiles keep the published login credentials usable for
  // real API flows rather than only for mock-driven screens.
  const initialCreators: CreatorProfile[] = [
    {
      id: "creator-demo",
      userId: "user-creator",
      fullName: "Demo Creator",
      handle: "democreator",
      headline: "Technology & AI creator",
      bio: "A verified creator profile used to explore the AbeyCollab workspace.",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      location: "Worldwide",
      languages: ["English"],
      primaryCategory: "Technology & AI",
      secondaryCategories: ["Design & Creative"],
      verified: true,
      featured: true,
      tier: "Mid-Tier",
      rating: 4.9,
      completedCampaignsCount: 12,
      totalFollowers: 125000,
      avgEngagementRate: 5.2,
      startingPrice: 1500,
      availableForHire: true,
      profileCompleteness: 90,
      qualityScore: 92,
      socialAccounts: [],
      audience: {
        topCountries: [{ country: "United States", percentage: 55 }, { country: "India", percentage: 20 }],
        ageDistribution: [{ range: "25-34", percentage: 52 }, { range: "18-24", percentage: 31 }],
        genderSplit: [{ gender: "Female", percentage: 52 }, { gender: "Male", percentage: 48 }],
        interests: ["Technology", "Creator Economy", "Design"],
      },
      rateCards: [],
    },
    ...MOCK_CREATORS.filter((c) => c.userId !== "user-creator"),
  ];

  const initialBrands: BrandProfile[] = [
    {
      id: "brand-demo",
      userId: "user-brand",
      companyName: "Demo Brand",
      industry: "Technology & AI",
      headline: "A modern brand workspace",
      description: "A verified demo brand profile for testing campaign, payment, and creator workflows.",
      logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
      coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
      websiteUrl: "https://example.com",
      location: "San Francisco, CA",
      companySize: "11-50",
      verified: true,
      activeCampaignsCount: 0,
      totalSpent: 0,
      socialHandles: {},
      createdAt: now,
    },
  ];

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
    collaborations: [],
    payouts: [],
    subscriptions: initialSubscriptions,
    crmContacts: [],
    shortlists: [],
    disputes: [],
    tickets: [],
    payments: [],
    mediaAssets: [],
    conversations: [...MOCK_CONVERSATIONS],
    messages: Object.values(MOCK_MESSAGES).flat(),
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

