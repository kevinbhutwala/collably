import { db } from "../db/database";
import {
  CreatorProfile,
  Campaign,
  CreatorTrendingScore,
  CampaignTrendingScore,
  AlgorithmWeightsConfig,
  TimeframeWindow,
  TrendingFeedType,
} from "@/core/types";
import { DEFAULT_ALGORITHM_CONFIG } from "../db/seed";
import { badgeService } from "./badge.service";
import { risingService } from "./rising.service";
import { AntiGamingService } from "./anti-gaming.service";

export class TrendingService {
  private static instance: TrendingService;

  public static getInstance(): TrendingService {
    if (!TrendingService.instance) {
      TrendingService.instance = new TrendingService();
    }
    return TrendingService.instance;
  }

  public getAlgorithmConfig(): AlgorithmWeightsConfig {
    const state = db.getState();
    return state.algorithmConfig || DEFAULT_ALGORITHM_CONFIG;
  }

  /**
   * Calculates the multi-factor weighted trending score for a creator.
   */
  public calculateCreatorScore(
    creator: CreatorProfile,
    window: TimeframeWindow = "7d"
  ): CreatorTrendingScore {
    const config = this.getAlgorithmConfig();
    const weights = config.creatorWeights;
    const state = db.getState();

    const windowDays = window === "7d" ? 7 : window === "30d" ? 30 : 90;
    const windowStart = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000).toISOString();

    const metrics = (state.platformMetrics || []).filter(
      (m) => m.targetId === creator.id && m.timestamp >= windowStart
    );

    // Activity aggregation with decay weighting
    let weightedViews = 0;
    let weightedSaves = 0;
    let weightedApplications = 0;

    for (const m of metrics) {
      const decay = AntiGamingService.calculateTimeDecayWeight(m.timestamp, windowDays);
      if (m.eventType === "profile_view") weightedViews += 1 * decay;
      if (m.eventType === "profile_save") weightedSaves += 2.5 * decay;
      if (m.eventType === "campaign_apply") weightedApplications += 2.0 * decay;
    }

    // Baseline fallbacks if metrics are thin so all real creators score meaningfully
    const totalViews = Math.max(Math.round(weightedViews), Math.round((creator.avgEngagementRate * 12) + ((creator.totalFollowers % 1000) / 25)));
    const totalSaves = Math.max(Math.round(weightedSaves), Math.round(creator.avgEngagementRate * 2.5));
    const totalApps = Math.max(Math.round(weightedApplications), creator.completedCampaignsCount || 2);

    // Factor 1: Engagement Rate & Growth (0 - 100)
    const normEngagement = Math.min(100, (creator.avgEngagementRate / 8.0) * 100);
    const engGrowthEstimate = Math.min(100, 75 + (creator.avgEngagementRate * 3.5));
    const engagementScore = (normEngagement * 0.6) + (engGrowthEstimate * 0.4);

    // Factor 2: Activity Score (views & saves & applications) (0 - 100)
    const viewFactor = Math.min(100, (totalViews / 50) * 100);
    const saveFactor = Math.min(100, (totalSaves / 15) * 100);
    const appFactor = Math.min(100, (totalApps / 10) * 100);
    const activityScore = (viewFactor * 0.45) + (saveFactor * 0.35) + (appFactor * 0.20);

    // Factor 3: Collaboration & Completion (0 - 100)
    const completedDeals = creator.completedCampaignsCount || 0;
    const collabs = state.collaborations?.filter((c) => c.creatorId === creator.id || c.creatorId === creator.userId) || [];
    const totalAssigned = collabs.length > 0 ? collabs.length : Math.max(completedDeals, 1);
    const completionRate = Math.min(100, Math.round((completedDeals / totalAssigned) * 100));
    const collabScore = (Math.min(100, (completedDeals / 15) * 100) * 0.5) + (completionRate * 0.5);

    // Factor 4: Reputation & Reliability (0 - 100)
    const ratingNorm = ((creator.rating || 4.8) / 5.0) * 100;
    const qualityNorm = creator.qualityScore || 90;
    const reputationScore = (ratingNorm * 0.6) + (qualityNorm * 0.4);

    // Factor 5: Response Rate & Velocity
    // Faster responders (< 2h) get boost
    const avgResponseHours = Number((1.2 + ((creator.totalFollowers % 10) / 10)).toFixed(1));
    const responseScore = Math.max(40, 100 - (avgResponseHours * 12));

    // Dynamic Weighted Score
    const overallScore = Math.min(99, Math.round(
      (engagementScore * (weights.engagementRate + weights.engagementGrowth)) +
      (activityScore * (weights.profileViews + weights.profileSaves + weights.campaignApplications)) +
      (collabScore * (weights.successfulCollabs + weights.completionRate)) +
      (reputationScore * weights.reviewsRating) +
      (responseScore * weights.responseRate)
    ));

    // Velocity multiplier
    const velocityMultiplier = Number((1.0 + (activityScore / 200)).toFixed(2));

    // Evaluate Rising status
    const risingInfo = risingService.evaluateCreator(creator);

    // Dynamic Badges
    const badges = badgeService.evaluateCreatorBadges(creator, {
      trendingScore: overallScore,
      isRising: risingInfo.isRising,
      avgResponseHours,
    });

    return {
      creatorId: creator.id,
      creator,
      overallScore,
      breakdown: {
        engagementScore: Math.round(engagementScore),
        activityScore: Math.round(activityScore),
        collabScore: Math.round(collabScore),
        reputationScore: Math.round(reputationScore),
        velocityMultiplier,
      },
      badges,
      recentMetrics: {
        views7d: totalViews,
        saves7d: totalSaves,
        applications7d: totalApps,
        completedDeals,
        avgResponseHours,
      },
    };
  }

  /**
   * Calculates weighted trending score for a campaign.
   */
  public calculateCampaignScore(
    campaign: Campaign,
    window: TimeframeWindow = "7d"
  ): CampaignTrendingScore {
    const config = this.getAlgorithmConfig();
    const weights = config.campaignWeights;
    const state = db.getState();

    const windowDays = window === "7d" ? 7 : window === "30d" ? 30 : 90;
    const windowStart = new Date(Date.now() - windowDays * 24 * 60 * 60 * 1000).toISOString();

    const metrics = (state.platformMetrics || []).filter(
      (m) => m.targetId === campaign.id && m.timestamp >= windowStart
    );

    const views = Math.max(metrics.filter((m) => m.eventType === "campaign_view").length, campaign.applicantsCount * 3 + 12);
    const applications = Math.max(campaign.applicantsCount, 1);

    // Days remaining urgency
    const endMs = new Date(campaign.timeline.campaignEndDate).getTime();
    const daysRemaining = Math.max(1, Math.round((endMs - Date.now()) / (1000 * 60 * 60 * 24)));
    const urgencyScore = Math.max(20, Math.min(100, 100 - (daysRemaining * 2)));

    // Application velocity per day
    const velocityPerDay = Number((applications / Math.max(1, 30 - daysRemaining)).toFixed(1));
    const velocityScore = Math.min(100, velocityPerDay * 25);

    // Popularity score
    const popularityScore = Math.min(100, (views / 40) * 100);

    // Category demand score
    const demandScore = campaign.category === "Technology & AI" ? 95 :
                        campaign.category === "Fitness & Wellness" ? 90 :
                        campaign.category === "Fashion & Style" ? 88 : 82;

    const overallScore = Math.min(99, Math.round(
      (popularityScore * weights.views) +
      (Math.min(100, applications * 12) * weights.applications) +
      (velocityScore * weights.velocity) +
      (demandScore * weights.categoryDemand) +
      (urgencyScore * weights.daysRemaining)
    ));

    return {
      campaignId: campaign.id,
      campaign,
      overallScore,
      breakdown: {
        popularityScore: Math.round(popularityScore),
        velocityScore: Math.round(velocityScore),
        demandScore: Math.round(demandScore),
        urgencyScore: Math.round(urgencyScore),
      },
      recentMetrics: {
        views7d: views,
        applicationsCount: applications,
        velocityPerDay,
        daysRemaining,
      },
    };
  }

  /**
   * Returns curated list for any feed type.
   */
  public getTrendingFeed(
    feed: TrendingFeedType,
    timeframe: TimeframeWindow = "7d",
    limit: number = 20
  ): {
    creators?: CreatorTrendingScore[];
    campaigns?: CampaignTrendingScore[];
    categories?: { name: string; count: number; growthRate: number; avgBudget: number }[];
  } {
    const state = db.getState();
    const creators = state.creators || [];
    const campaigns = state.campaigns || [];

    if (feed === "trending_campaigns") {
      const scoredCampaigns = campaigns
        .filter((c) => c.status === "active")
        .map((c) => this.calculateCampaignScore(c, timeframe))
        .sort((a, b) => b.overallScore - a.overallScore)
        .slice(0, limit);

      return { campaigns: scoredCampaigns };
    }

    if (feed === "trending_categories") {
      const categoryMap = new Map<string, { count: number; totalBudget: number; countDeals: number }>();
      campaigns.forEach((c) => {
        const entry = categoryMap.get(c.category) || { count: 0, totalBudget: 0, countDeals: 0 };
        entry.count += 1;
        entry.totalBudget += c.budget.perCreatorBudget || 1000;
        entry.countDeals += c.acceptedCount || 1;
        categoryMap.set(c.category, entry);
      });

      const categories = Array.from(categoryMap.entries()).map(([name, data]) => ({
        name,
        count: data.count,
        growthRate: Number((12.5 + (data.count * 4.2)).toFixed(1)),
        avgBudget: Math.round(data.totalBudget / Math.max(1, data.count)),
      })).sort((a, b) => b.count - a.count);

      return { categories };
    }

    // Score all creators
    const scoredCreators = creators.map((c) => this.calculateCreatorScore(c, timeframe));

    let filtered = [...scoredCreators];

    switch (feed) {
      case "rising":
        filtered = filtered
          .filter((item) => item.badges.some((b) => b.id === "rising"))
          .sort((a, b) => b.creator.avgEngagementRate - a.creator.avgEngagementRate);
        // Fallback if empty: sort lowest followers with highest engagement
        if (filtered.length === 0) {
          filtered = [...scoredCreators]
            .filter((c) => c.creator.totalFollowers <= 150000)
            .sort((a, b) => b.creator.avgEngagementRate - a.creator.avgEngagementRate);
        }
        break;

      case "top_performing":
        filtered = filtered.sort(
          (a, b) => (b.creator.completedCampaignsCount || 0) - (a.creator.completedCampaignsCount || 0)
        );
        break;

      case "fast_responders":
        filtered = filtered.sort(
          (a, b) => a.recentMetrics.avgResponseHours - b.recentMetrics.avgResponseHours
        );
        break;

      case "top_rated":
        filtered = filtered.sort((a, b) => (b.creator.rating || 0) - (a.creator.rating || 0));
        break;

      case "new_promising":
        filtered = filtered.sort((a, b) => (b.creator.qualityScore || 0) - (a.creator.qualityScore || 0));
        break;

      case "trending_now":
      default:
        filtered = filtered.sort((a, b) => b.overallScore - a.overallScore);
        break;
    }

    return { creators: filtered.slice(0, limit) };
  }
}

export const trendingService = TrendingService.getInstance();
