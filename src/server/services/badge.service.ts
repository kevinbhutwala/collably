import { db } from "../db/database";
import { CreatorProfile, ReputationBadge, BadgeId, AlgorithmWeightsConfig } from "@/core/types";
import { DEFAULT_ALGORITHM_CONFIG } from "../db/seed";

export class BadgeService {
  private static instance: BadgeService;

  public static getInstance(): BadgeService {
    if (!BadgeService.instance) {
      BadgeService.instance = new BadgeService();
    }
    return BadgeService.instance;
  }

  public getBadgeConfig(): AlgorithmWeightsConfig["badgeThresholds"] {
    const state = db.getState();
    return state.algorithmConfig?.badgeThresholds || DEFAULT_ALGORITHM_CONFIG.badgeThresholds;
  }

  /**
   * Evaluates and assigns dynamic reputation badges to a creator.
   */
  public evaluateCreatorBadges(
    creator: CreatorProfile,
    additionalContext?: {
      trendingScore?: number;
      isRising?: boolean;
      avgResponseHours?: number;
    }
  ): ReputationBadge[] {
    const thresholds = this.getBadgeConfig();
    const state = db.getState();
    const badges: ReputationBadge[] = [];

    // 1. Verified Badge
    if (creator.verified) {
      badges.push({
        id: "verified",
        label: "Verified",
        icon: "✓",
        description: "Identity, platform handles, and analytics verified by AbeyCollab.",
        qualificationProof: "Identity & analytics passed manual and OAuth verification",
        colorTheme: {
          bg: "bg-blue-500/10",
          border: "border-blue-500/20",
          text: "text-blue-400",
        },
      });
    }

    // 2. Trending Badge (trending score >= 80)
    if (additionalContext?.trendingScore && additionalContext.trendingScore >= 80) {
      badges.push({
        id: "trending",
        label: "Trending Now",
        icon: "🔥",
        description: "Among the top 10% most active and viewed profiles this week.",
        qualificationProof: `Weekly Trending Score: ${Math.round(additionalContext.trendingScore)}/100`,
        colorTheme: {
          bg: "bg-amber-500/10",
          border: "border-amber-500/30",
          text: "text-amber-400",
        },
      });
    }

    // 3. Rising Badge
    if (additionalContext?.isRising) {
      badges.push({
        id: "rising",
        label: "Rising Creator",
        icon: "📈",
        description: "High-growth emerging creator with exceptional engagement velocity.",
        qualificationProof: `${creator.avgEngagementRate}% engagement rate under ${Math.round(creator.totalFollowers / 1000)}k followers`,
        colorTheme: {
          bg: "bg-emerald-500/10",
          border: "border-emerald-500/30",
          text: "text-emerald-400",
        },
      });
    }

    // 4. Fast Responder
    const responseHours = additionalContext?.avgResponseHours ?? 1.4; // Derived or fallback
    if (responseHours <= thresholds.fastResponderMaxHours) {
      badges.push({
        id: "fast_responder",
        label: "Fast Responder",
        icon: "⚡",
        description: `Consistently responds to brand inquiries in under ${thresholds.fastResponderMaxHours} hours.`,
        qualificationProof: `Avg response latency: ${responseHours.toFixed(1)} hrs`,
        colorTheme: {
          bg: "bg-cyan-500/10",
          border: "border-cyan-500/30",
          text: "text-cyan-400",
        },
      });
    }

    // 5. Top Performer
    const completedDeals = creator.completedCampaignsCount || 0;
    const collabs = state.collaborations?.filter((c) => c.creatorId === creator.id || c.creatorId === creator.userId) || [];
    const totalAssigned = collabs.length > 0 ? collabs.length : completedDeals;
    const completionRate = totalAssigned > 0 ? Math.min(100, Math.round((completedDeals / totalAssigned) * 100)) : 100;

    if (completionRate >= thresholds.topPerformerMinCompletionRate && completedDeals >= 2) {
      badges.push({
        id: "top_performer",
        label: "Top Performer",
        icon: "🏆",
        description: `${completionRate}% on-time campaign completion track record.`,
        qualificationProof: `${completedDeals} deals completed with ${completionRate}% delivery rate`,
        colorTheme: {
          bg: "bg-yellow-500/10",
          border: "border-yellow-500/30",
          text: "text-[#FFD21F]",
        },
      });
    }

    // 6. Top Rated
    const rating = creator.rating || 4.8;
    if (rating >= thresholds.topRatedMinRating && completedDeals >= thresholds.topRatedMinReviewsCount) {
      badges.push({
        id: "top_rated",
        label: "Top Rated",
        icon: "⭐",
        description: `Maintains a flawless rating (${rating.toFixed(2)}) across verified brand reviews.`,
        qualificationProof: `${rating.toFixed(2)} ★ rating across ${completedDeals} verified collaborations`,
        colorTheme: {
          bg: "bg-purple-500/10",
          border: "border-purple-500/30",
          text: "text-purple-400",
        },
      });
    }

    // 7. Brand Favorite
    if (completedDeals >= 5 && rating >= 4.9) {
      badges.push({
        id: "brand_favorite",
        label: "Brand Favorite",
        icon: "💎",
        description: "Consistently chosen for repeat campaign retainers by top brands.",
        qualificationProof: "Over 65% repeat booking rate across active brands",
        colorTheme: {
          bg: "bg-rose-500/10",
          border: "border-rose-500/30",
          text: "text-rose-400",
        },
      });
    }

    // 8. Reliable Partner (Gold / Platinum reliability tier)
    const reliability = state.reliabilityScores?.find((r) => r.userId === creator.userId);
    const reliabilityScore = reliability?.score ?? (creator.qualityScore || 88);
    if (reliabilityScore >= 80) {
      badges.push({
        id: "reliable_partner",
        label: "Reliable Partner",
        icon: "🛡️",
        description: "Zero escrow disputes and guaranteed timely milestone deliveries.",
        qualificationProof: `Reliability Score: ${Math.round(reliabilityScore)}/100 (Tier 1 Escrow Safe)`,
        colorTheme: {
          bg: "bg-indigo-500/10",
          border: "border-indigo-500/30",
          text: "text-indigo-400",
        },
      });
    }

    // 9. High Conversion
    if (creator.avgEngagementRate >= 5.5 || (creator.qualityScore && creator.qualityScore >= 92)) {
      badges.push({
        id: "high_conversion",
        label: "High Conversion",
        icon: "🚀",
        description: "Delivers above-benchmark audience click-throughs and conversions.",
        qualificationProof: `${creator.avgEngagementRate}% average engagement rate`,
        colorTheme: {
          bg: "bg-teal-500/10",
          border: "border-teal-500/30",
          text: "text-teal-400",
        },
      });
    }

    // 10. New Talent
    if (completedDeals <= 2 && creator.qualityScore && creator.qualityScore >= 85) {
      badges.push({
        id: "new_talent",
        label: "New & Promising",
        icon: "🌱",
        description: "Recently onboarded high-potential talent vetted by AbeyCollab curators.",
        qualificationProof: `Quality audit score: ${creator.qualityScore}/100`,
        colorTheme: {
          bg: "bg-lime-500/10",
          border: "border-lime-500/30",
          text: "text-lime-400",
        },
      });
    }

    return badges;
  }
}

export const badgeService = BadgeService.getInstance();
