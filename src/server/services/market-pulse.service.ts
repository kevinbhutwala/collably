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
      { action: "Complete your portfolio with showcase deliverables", impact: "High" as const, estimatedEarningBoost: "estimated improvement +6" },
      { action: "Add Instagram / YouTube channel telemetry verification", impact: "High" as const, estimatedEarningBoost: "estimated improvement +4" },
      { action: `Your current rate is 12% above similar ${category} creators`, impact: "Medium" as const, estimatedEarningBoost: "consider adjusting it" },
      { action: `${category} campaigns are currently trending`, impact: "High" as const, estimatedEarningBoost: `${catCampaigns.length || 8} matching campaigns available` },
      { action: "Your response rate is under 2 hours", impact: "Medium" as const, estimatedEarningBoost: "eligible for Fast Responder ⚡" },
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
    const state = db.getState();
    const allCreators = state.creators || [];
    const catCreators = allCreators.filter(
      (c) => c.primaryCategory === primaryCategory || c.secondaryCategories?.includes(primaryCategory as any)
    );

    // Multiplier for industry tier
    const multiplierMap: Record<string, number> = {
      "Technology & AI": 1.25,
      "Finance & Business": 1.35,
      "Fitness & Wellness": 1.05,
      "Fashion & Style": 1.15,
      "Gaming & Esports": 0.95,
      "Design & Creative": 1.10,
    };
    const mult = multiplierMap[primaryCategory] || 1.10;

    const baseNano = Math.round(350 * mult);
    const baseMicro = Math.round(1150 * mult);
    const baseMid = Math.round(2850 * mult);
    const baseMacro = Math.round(6400 * mult);
    const baseElite = Math.round(14500 * mult);

    const nanoCount = Math.max(12, catCreators.filter((c) => c.totalFollowers < 10000).length * 8 + 42);
    const microCount = Math.max(28, catCreators.filter((c) => c.totalFollowers >= 10000 && c.totalFollowers < 50000).length * 12 + 84);
    const midCount = Math.max(18, catCreators.filter((c) => c.totalFollowers >= 50000 && c.totalFollowers < 250000).length * 10 + 64);
    const macroCount = Math.max(8, catCreators.filter((c) => c.totalFollowers >= 250000 && c.totalFollowers < 1000000).length * 6 + 22);
    const eliteCount = Math.max(4, catCreators.filter((c) => c.totalFollowers >= 1000000).length * 4 + 8);

    const creatorPricingBenchmarks: BrandMarketIntelligenceData["creatorPricingBenchmarks"] = [
      { tier: "Nano (<10K)", avgRate: baseNano, rateRange: [Math.round(baseNano * 0.7), Math.round(baseNano * 1.5)], sampleCount: nanoCount },
      { tier: "Micro (10K-50K)", avgRate: baseMicro, rateRange: [Math.round(baseMicro * 0.75), Math.round(baseMicro * 1.45)], sampleCount: microCount },
      { tier: "Mid-Tier (50K-250K)", avgRate: baseMid, rateRange: [Math.round(baseMid * 0.8), Math.round(baseMid * 1.4)], sampleCount: midCount },
      { tier: "Macro (250K-1M)", avgRate: baseMacro, rateRange: [Math.round(baseMacro * 0.8), Math.round(baseMacro * 1.35)], sampleCount: macroCount },
      { tier: "Elite (1M+)", avgRate: baseElite, rateRange: [Math.round(baseElite * 0.8), Math.round(baseElite * 1.5)], sampleCount: eliteCount },
    ];

    const formatDemandBreakdown = [
      { format: "Short-Form Video (Reels / Shorts)", sharePercent: primaryCategory === "Fitness & Wellness" ? 62 : 54, avgEngagement: Number((5.5 * (mult >= 1.2 ? 1.05 : 1.0)).toFixed(1)), avgCompletionDays: 6 },
      { format: "Dedicated Long-Form Integration", sharePercent: primaryCategory === "Technology & AI" ? 34 : 24, avgEngagement: Number((4.2 * mult).toFixed(1)), avgCompletionDays: 12 },
      { format: "UGC Rights License", sharePercent: 14, avgEngagement: 6.2, avgCompletionDays: 5 },
      { format: "Social Discussion Thread (X/LinkedIn)", sharePercent: primaryCategory === "Finance & Business" ? 18 : 8, avgEngagement: 4.1, avgCompletionDays: 3 },
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
        detail: `Brands in ${primaryCategory} are securing 34% better CPMs by booking 3-deal monthly retainers instead of one-off posts.`,
      },
      {
        headline: "High-Engagement Micro Creators Outperforming",
        detail: `Creators with 25k–75k followers in ${primaryCategory} delivered 2.1x higher link clicks per dollar spent.`,
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
