import { CreatorCategory, PlatformType, CreatorProfile, Campaign } from "./index";

export type MetricEventType =
  | "profile_view"
  | "profile_search"
  | "profile_save"
  | "campaign_view"
  | "campaign_save"
  | "campaign_apply"
  | "campaign_invite"
  | "collaboration_started"
  | "deal_completed"
  | "review_received";

export interface PlatformMetricEntity {
  id: string;
  eventType: MetricEventType;
  actorId?: string; // User ID who initiated action
  actorRole?: "creator" | "brand" | "visitor" | "admin";
  targetId: string; // Creator ID or Campaign ID
  targetType: "creator" | "campaign" | "brand";
  sessionHash?: string; // Anonymous IP or device hash for deduplication
  metadata?: Record<string, any>;
  timestamp: string; // ISO 8601
}

export interface AlgorithmWeightsConfig {
  id: string;
  creatorWeights: {
    engagementRate: number; // default 0.20
    engagementGrowth: number; // default 0.15
    profileViews: number; // default 0.10
    profileSaves: number; // default 0.10
    campaignApplications: number; // default 0.05
    successfulCollabs: number; // default 0.15
    completionRate: number; // default 0.10
    responseRate: number; // default 0.05
    reviewsRating: number; // default 0.10
  };
  campaignWeights: {
    views: number; // default 0.20
    applications: number; // default 0.30
    velocity: number; // default 0.25 (apps per day)
    categoryDemand: number; // default 0.15
    daysRemaining: number; // default 0.10
  };
  risingCriteria: {
    maxFollowers: number; // default 100,000
    minEngagementRate: number; // default 4.5
    minRecentVelocity: number; // default 1.25x average view/inquiry growth
    minCompletedDeals: number; // default 1
  };
  badgeThresholds: {
    fastResponderMaxHours: number; // default 2
    topPerformerMinCompletionRate: number; // default 95%
    topRatedMinRating: number; // default 4.8
    topRatedMinReviewsCount: number; // default 3
    brandFavoriteMinRehireRate: number; // default 60%
    newTalentMaxAccountAgeDays: number; // default 30
  };
  updatedAt: string;
  updatedBy?: string;
}

export type BadgeId =
  | "trending"
  | "rising"
  | "fast_responder"
  | "top_performer"
  | "top_rated"
  | "brand_favorite"
  | "new_talent"
  | "reliable_partner"
  | "high_conversion"
  | "verified";

export interface ReputationBadge {
  id: BadgeId;
  label: string;
  icon: string;
  description: string;
  awardedAt?: string;
  qualificationProof?: string;
  colorTheme: {
    bg: string;
    border: string;
    text: string;
  };
}

export interface UserBadgeEntity {
  id: string;
  userId: string;
  targetId: string; // creatorId or brandId
  badgeId: BadgeId;
  awardedAt: string;
  proofMetrics: Record<string, any>;
  expiresAt?: string;
}

export type TrendingFeedType =
  | "trending_now"
  | "rising"
  | "top_performing"
  | "fast_responders"
  | "top_rated"
  | "new_promising"
  | "trending_campaigns"
  | "trending_categories";

export type TimeframeWindow = "7d" | "30d" | "90d";

export interface CreatorTrendingScore {
  creatorId: string;
  creator: CreatorProfile;
  overallScore: number; // 0 - 100
  breakdown: {
    engagementScore: number;
    activityScore: number;
    collabScore: number;
    reputationScore: number;
    velocityMultiplier: number;
  };
  badges: ReputationBadge[];
  recentMetrics: {
    views7d: number;
    saves7d: number;
    applications7d: number;
    completedDeals: number;
    avgResponseHours: number;
  };
}

export interface CampaignTrendingScore {
  campaignId: string;
  campaign: Campaign;
  overallScore: number; // 0 - 100
  breakdown: {
    popularityScore: number;
    velocityScore: number;
    demandScore: number;
    urgencyScore: number;
  };
  recentMetrics: {
    views7d: number;
    applicationsCount: number;
    velocityPerDay: number;
    daysRemaining: number;
  };
}

export interface MatchFactorBreakdown {
  categoryMatch: { score: number; weight: number; rationale: string };
  audienceMatch: { score: number; weight: number; rationale: string };
  budgetMatch: { score: number; weight: number; rationale: string };
  locationMatch: { score: number; weight: number; rationale: string };
  engagementMatch: { score: number; weight: number; rationale: string };
  reliabilityMatch: { score: number; weight: number; rationale: string };
}

export interface ExplainableMatchResult {
  overallScore: number; // 0 - 100 %
  matchTier: "Perfect" | "Strong" | "Good" | "Moderate";
  summary: string;
  factors: MatchFactorBreakdown;
  keyStrengths: string[];
  growthOpportunities: string[];
}

export interface ParsedBriefQuery {
  rawQuery: string;
  category?: CreatorCategory;
  location?: string;
  minFollowers?: number;
  maxFollowers?: number;
  minBudget?: number;
  maxBudget?: number;
  currency?: string;
  platforms?: PlatformType[];
  minEngagementRate?: number;
  deliverables?: string[];
  extractedTags: string[];
}

export interface CreatorMarketPulseData {
  creatorId: string;
  category: CreatorCategory;
  opportunityScore: number; // 0 - 100
  opportunityTier: "High Growth Potential" | "Optimal Market Fit" | "Moderate Momentum" | "Needs Attention";
  opportunityRationale: string;
  categoryTrends: {
    name: string;
    avgBudget: number;
    currency: string;
    dealsVolume30d: number;
    growthMoM: number; // e.g. +18.4%
    competitionLevel: "Low" | "Moderate" | "High";
  };
  deliverableDemand: {
    deliverableType: string;
    demandPercent: number; // e.g. 58%
    suggestedRate: number;
    momentum: "Rising" | "Stable" | "Cooling";
  }[];
  actionableInsights: {
    action: string;
    impact: "High" | "Medium" | "Low";
    estimatedEarningBoost: string;
  }[];
  isEstimate: boolean;
}

export interface BrandMarketIntelligenceData {
  primaryCategory: string;
  creatorPricingBenchmarks: {
    tier: "Nano (<10K)" | "Micro (10K-50K)" | "Mid-Tier (50K-250K)" | "Macro (250K-1M)" | "Elite (1M+)";
    avgRate: number;
    rateRange: [number, number];
    sampleCount: number;
  }[];
  formatDemandBreakdown: {
    format: string;
    sharePercent: number;
    avgEngagement: number;
    avgCompletionDays: number;
  }[];
  highConversionCategories: {
    category: string;
    roiIndex: number;
    demandVelocity: "Surging" | "Steady" | "Emerging";
  }[];
  activeHiringTrends: {
    headline: string;
    detail: string;
  }[];
  isEstimate: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  creator: CreatorProfile;
  trendingScore: number;
  engagementRate: number;
  completedDeals: number;
  rating: number;
  badges: ReputationBadge[];
  growthRate: number;
}

export interface LeaderboardFilters {
  category?: string;
  location?: string;
  platform?: PlatformType;
  followerTier?: string; // Nano, Micro, Mid-Tier, Macro, Elite
  timeframe: TimeframeWindow;
  limit?: number;
}

export interface SuspiciousActivityRecord {
  id: string;
  actorId?: string;
  targetId: string;
  reason: string;
  burstCount: number;
  detectedAt: string;
  status: "flagged" | "dismissed" | "blocked";
}
