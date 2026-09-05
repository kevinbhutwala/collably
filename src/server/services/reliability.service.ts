import { db } from "../db/database";
import { UserReliabilityScore, ReliabilityTier } from "@/core/types";

export type ReliabilityEventType =
  | "ON_TIME_COMPLETION"
  | "MISSED_DEADLINE"
  | "DISPUTE_WON"
  | "DISPUTE_LOST"
  | "DISPUTE_INITIATED"
  | "CREATOR_UNAUTHORIZED_CANCELLATION"
  | "BRAND_LATE_CANCELLATION"
  | "SLA_BREACH_INACTION";

export class ReliabilityService {
  /**
   * Determine trust tier based on numerical score (0-100)
   */
  private computeTier(score: number): ReliabilityTier {
    if (score >= 90) return "Elite";
    if (score >= 75) return "Trusted";
    if (score >= 60) return "Good";
    if (score >= 40) return "At_Risk";
    return "Suspended";
  }

  /**
   * Fetch existing score or initialize with default pristine baseline
   */
  getScore(userId: string, role: "creator" | "brand"): UserReliabilityScore {
    const list = db.getState().reliabilityScores || [];
    const existing = list.find((s) => s.userId === userId);
    if (existing) return existing;

    const initial: UserReliabilityScore = {
      userId,
      role,
      score: 100,
      tier: "Elite",
      metrics: {
        totalCollaborations: 0,
        onTimeCompletions: 0,
        missedDeadlines: 0,
        disputesInitiated: 0,
        disputesLost: 0,
        cancellations: 0,
        avgReviewResponseHours: 24,
      },
      lastCalculatedAt: new Date().toISOString(),
    };

    db.updateState((state) => {
      state.reliabilityScores = state.reliabilityScores || [];
      state.reliabilityScores.push(initial);
    });

    return initial;
  }

  /**
   * Record a behavioral event and adjust reliability score accordingly
   */
  recordEvent(
    userId: string,
    role: "creator" | "brand",
    event: ReliabilityEventType,
    metadata?: Record<string, any>
  ): UserReliabilityScore {
    let scoreObj = this.getScore(userId, role);
    let delta = 0;

    switch (event) {
      case "ON_TIME_COMPLETION":
        delta = +3;
        scoreObj.metrics.totalCollaborations += 1;
        scoreObj.metrics.onTimeCompletions += 1;
        break;

      case "MISSED_DEADLINE":
        delta = -10;
        scoreObj.metrics.missedDeadlines += 1;
        break;

      case "DISPUTE_WON":
        delta = +2;
        break;

      case "DISPUTE_LOST":
        delta = -20;
        scoreObj.metrics.disputesLost += 1;
        break;

      case "DISPUTE_INITIATED":
        scoreObj.metrics.disputesInitiated += 1;
        break;

      case "CREATOR_UNAUTHORIZED_CANCELLATION":
        delta = -25;
        scoreObj.metrics.cancellations += 1;
        break;

      case "BRAND_LATE_CANCELLATION":
        delta = -15;
        scoreObj.metrics.cancellations += 1;
        break;

      case "SLA_BREACH_INACTION":
        delta = -8;
        break;
    }

    const newScore = Math.max(0, Math.min(100, scoreObj.score + delta));
    const newTier = this.computeTier(newScore);

    const updated: UserReliabilityScore = {
      ...scoreObj,
      score: newScore,
      tier: newTier,
      lastCalculatedAt: new Date().toISOString(),
    };

    db.updateState((state) => {
      state.reliabilityScores = state.reliabilityScores || [];
      const idx = state.reliabilityScores.findIndex((s) => s.userId === userId);
      if (idx !== -1) {
        state.reliabilityScores[idx] = updated;
      } else {
        state.reliabilityScores.push(updated);
      }
    });

    return updated;
  }

  getAllScores(): UserReliabilityScore[] {
    return db.getState().reliabilityScores || [];
  }
}

export const reliabilityService = new ReliabilityService();
