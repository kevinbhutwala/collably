import { db } from "../db/database";
import {
  CreatorMarketPulseData,
  BrandMarketIntelligenceData,
  CreatorProfile,
  CreatorCategory,
} from "@/core/types";

export class MarketPulseService {
  private static instance: MarketPulseService;

  public static getInstance(): MarketPulseService {
    if (!MarketPulseService.instance) {
      MarketPulseService.instance = new MarketPulseService();
    }
    return MarketPulseService.instance;
  }

  /**
   * Generates a personalized Market Pulse and Opportunity Score for a creator.
   */
  public getCreatorMarketPulse(creatorId: string): CreatorMarketPulseData {
    const state = db.getState();
    const creator = state.creators.find((c) => c.id === creatorId || c.userId === creatorId) || state.creators[0];

    const category: CreatorCategory = creator?.primaryCategory || "Technology & AI";

    // 1. Calculate Opportunity Score (0 - 100)
    // Factors: Profile Completeness (30%), Quality Score (30%), Pricing Competitiveness (20%), Category Velocity (20%)
    const compScore = creator.profileCompleteness || 85;
    const qualScore = creator.qualityScore || 90;

    // Check pricing vs category average ($2,200 avg)
    const startingPrice = creator.startingPrice || 1500;
    const priceFit = startingPrice <= 2500 ? 95 : startingPrice <= 4000 ? 80 : 65;

    // Category velocity
    const catCampaigns = state.campaigns.filter((c) => c.category === category);
    const catVelocity = Math.min(100, 70 + catCampaigns.length * 8);

    const opportunityScore = Math.min(98, Math.round(
      compScore * 0.30 +
      qualScore * 0.30 +
      priceFit * 0.20 +
      catVelocity * 0.20
    ));

    const opportunityTier: CreatorMarketPulseData["opportunityTier"] =
      opportunityScore >= 88 ? "High Growth Potential" :
      opportunityScore >= 78 ? "Optimal Market Fit" :
      opportunityScore >= 65 ? "Moderate Momentum" : "Needs Attention";

    const opportunityRationale =
      opportunityScore >= 85
        ? `Your profile is performing in the top 15% for ${category}. Brand interest is surging with an average deal size of $2,450.`
        : `Your category demand is healthy. Adding verified social metrics and a video introduction can elevate your deal volume by 32%.`;

    // 2. Category Deliverable Benchmark Rates
    const baseMult = category === "Technology & AI" ? 1.3 :
                     category === "Finance & Business" ? 1.4 :
                     category === "Fitness & Wellness" ? 1.1 :
                     category === "Fashion & Style" ? 1.2 : 1.0;

    const deliverableDemand = [
      { deliverableType: "Instagram 60s Reel", demandPercent: 64, suggestedRate: Math.round(1800 * baseMult), momentum: "Rising" as const },
      { deliverableType: "YouTube Dedicated Sponsor", demandPercent: 52, suggestedRate: Math.round(3200 * baseMult), momentum: "Rising" as const },
      { deliverableType: "X / Twitter Deep Dive", demandPercent: 38, suggestedRate: Math.round(1100 * baseMult), momentum: "Stable" as const },
      { deliverableType: "UGC Product Video", demandPercent: 44, suggestedRate: Math.round(950 * baseMult), momentum: "Rising" as const },
    ];

    // 3. Actionable Insights
    const actionableInsights = [
      { action: `Add a package deal bundle for '${category}' briefs`, impact: "High" as const, estimatedEarningBoost: "+$1,200/mo" },
      { action: "Enable Instant Collaboration invites to bypass manual inquiries", impact: "High" as const, estimatedEarningBoost: "+35% conversions" },
      { action: "Link verified YouTube or Instagram analytics for auto-badging", impact: "Medium" as const, estimatedEarningBoost: "+$650/mo" },
    ];

    return {
      creatorId: creator.id,
      category,
      opportunityScore,
      opportunityTier,
      opportunityRationale,
      categoryTrends: {
        name: category,
        avgBudget: Math.round(2400 * baseMult),
        currency: "USD",
        dealsVolume30d: 48 + catCampaigns.length * 6,
        growthMoM: Number((14.2 + catCampaigns.length * 1.5).toFixed(1)),
        competitionLevel: catCampaigns.length > 5 ? "High" : "Moderate",
      },
      deliverableDemand,
      actionableInsights,
      isEstimate: true,
    };
  }

  /**
   * Generates Brand Market Intelligence insights for pricing benchmarks, deliverable popularity, and category ROI.
   */
  public getBrandMarketIntelligence(categoryName?: string): BrandMarketIntelligenceData {
    const primaryCategory = categoryName || "Technology & AI";

    const creatorPricingBenchmarks: BrandMarketIntelligenceData["creatorPricingBenchmarks"] = [
      { tier: "Nano (<10K)", avgRate: 350, rateRange: [200, 600], sampleCount: 142 },
      { tier: "Micro (10K-50K)", avgRate: 1150, rateRange: [750, 1800], sampleCount: 384 },
      { tier: "Mid-Tier (50K-250K)", avgRate: 2850, rateRange: [1900, 4200], sampleCount: 290 },
      { tier: "Macro (250K-1M)", avgRate: 6400, rateRange: [4500, 9500], sampleCount: 88 },
      { tier: "Elite (1M+)", avgRate: 14500, rateRange: [10000, 25000], sampleCount: 24 },
    ];

    const formatDemandBreakdown = [
      { format: "Short-Form Video (Reels / Shorts)", sharePercent: 54, avgEngagement: 5.8, avgCompletionDays: 6 },
      { format: "Dedicated Long-Form Integration", sharePercent: 26, avgEngagement: 4.2, avgCompletionDays: 14 },
      { format: "UGC Rights License", sharePercent: 12, avgEngagement: 6.4, avgCompletionDays: 5 },
      { format: "Social Discussion Thread (X/LinkedIn)", sharePercent: 8, avgEngagement: 3.9, avgCompletionDays: 3 },
    ];

    const highConversionCategories = [
      { category: "Technology & AI", roiIndex: 9.4, demandVelocity: "Surging" as const },
      { category: "Fitness & Wellness", roiIndex: 8.9, demandVelocity: "Surging" as const },
      { category: "Finance & Business", roiIndex: 8.6, demandVelocity: "Steady" as const },
      { category: "Design & Creative", roiIndex: 8.2, demandVelocity: "Steady" as const },
      { category: "Gaming & Esports", roiIndex: 7.9, demandVelocity: "Emerging" as const },
    ];

    const activeHiringTrends = [
      {
        headline: "Shift to 3-Month Creator Retainers",
        detail: "Brands are securing 34% better CPMs by booking 3-deal monthly retainers instead of one-off posts.",
      },
      {
        headline: "High-Engagement Micro Creators Outperforming",
        detail: "Creators between 25k–75k followers with >5% engagement delivered 2.1x higher link clicks per dollar.",
      },
      {
        headline: "Escrow-Protected Fast Milestones",
        detail: "Campaigns using 50/50 escrow with 7-day turnaround receive 4.5x more top-rated creator applications.",
      },
    ];

    return {
      primaryCategory,
      creatorPricingBenchmarks,
      formatDemandBreakdown,
      highConversionCategories,
      activeHiringTrends,
      isEstimate: true,
    };
  }
}

export const marketPulseService = MarketPulseService.getInstance();
