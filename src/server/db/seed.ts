import { DatabaseState, UserEntity } from "./schema";
import { hashPassword } from "../auth/crypto";
import { ALL_PLANS } from "@/core/constants";
import { SubscriptionEntity, CreatorProfile, BrandProfile } from "@/core/types";
import { MOCK_CAMPAIGNS } from "@/mock/campaigns.mock";

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
      bio: "A verified creator profile used to explore the Collably workspace.",
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
    conversations: [],
    messages: [],
    notifications: [],
    webhookEvents: [],
    aiUsage: [],
    auditLogs: [],
    ledgerEntries: [],
  };
}
