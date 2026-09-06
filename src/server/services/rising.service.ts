import { db } from "../db/database";
import { CreatorProfile, AlgorithmWeightsConfig } from "@/core/types";
import { DEFAULT_ALGORITHM_CONFIG } from "../db/seed";

export interface RisingDetectionResult {
  isRising: boolean;
  risingScore: number; // 0 - 100
  followerBracket: "Nano" | "Micro" | "Emerging";
  engagementToFollowerRatio: number;
  growthVelocity: number;
  rationale: string;
}

export class RisingService {
  private static instance: RisingService;

  public static getInstance(): RisingService {
    if (!RisingService.instance) {
      RisingService.instance = new RisingService();
    }
    return RisingService.instance;
  }

  public getRisingCriteria(): AlgorithmWeightsConfig["risingCriteria"] {
    const state = db.getState();
    return state.algorithmConfig?.risingCriteria || DEFAULT_ALGORITHM_CONFIG.risingCriteria;
  }

  /**
   * Evaluates whether a creator qualifies as an algorithmic "Rising Creator".
   */
  public evaluateCreator(creator: CreatorProfile): RisingDetectionResult {
    const criteria = this.getRisingCriteria();
    const followers = creator.totalFollowers || 1000;
    const engagement = creator.avgEngagementRate || 1.0;

    // Follower cap condition
    const isUnderFollowerCap = followers <= criteria.maxFollowers;

    // Engagement-to-follower power ratio:
    // Nano/Micro creators with > 4.5% engagement have high authenticity
    const engagementToFollowerRatio = (engagement / (Math.log10(followers + 10))) * 20;

    // Recent activity velocity: count views and saves from platform metrics in the last 14 days
    const state = db.getState();
    const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const recentEvents = (state.platformMetrics || []).filter(
      (m) => m.targetId === creator.id && m.timestamp >= fourteenDaysAgo
    );

    // Recent view velocity multiplier
    const baseVelocity = Math.max(1, recentEvents.length);
    const growthVelocity = Number((1.0 + Math.min(2.5, (baseVelocity * 0.15) + (engagement * 0.1))).toFixed(2));

    // Calculate compound rising score
    // Weight: engagement (40%), velocity (30%), authenticity/quality (30%)
    const qualityFactor = creator.qualityScore || 85;
    const rawScore = (Math.min(10, engagement) / 10) * 40 +
                     (Math.min(3.0, growthVelocity) / 3.0) * 30 +
                     (qualityFactor / 100) * 30;

    const risingScore = Math.min(99, Math.round(rawScore));

    const isRising = isUnderFollowerCap &&
                     engagement >= criteria.minEngagementRate &&
                     growthVelocity >= criteria.minRecentVelocity;

    const followerBracket = followers < 15000 ? "Nano" : followers < 60000 ? "Micro" : "Emerging";

    let rationale = "";
    if (isRising) {
      rationale = `Exceptional ${engagement}% engagement for a ${followerBracket} creator, with a ${growthVelocity}x recent discovery velocity.`;
    } else if (!isUnderFollowerCap) {
      rationale = `Audience size (${Math.round(followers / 1000)}k) exceeds the rising creator threshold (${Math.round(criteria.maxFollowers / 1000)}k max).`;
    } else {
      rationale = `Engagement (${engagement}%) is currently below the rising threshold (${criteria.minEngagementRate}% required).`;
    }

    return {
      isRising,
      risingScore,
      followerBracket,
      engagementToFollowerRatio: Number(engagementToFollowerRatio.toFixed(1)),
      growthVelocity,
      rationale,
    };
  }
}

export const risingService = RisingService.getInstance();
