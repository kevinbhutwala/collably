import { db } from "../db/database";
import { PlatformMetricEntity, SuspiciousActivityRecord, MetricEventType } from "@/core/types";

export class AntiGamingService {
  private static instance: AntiGamingService;

  public static getInstance(): AntiGamingService {
    if (!AntiGamingService.instance) {
      AntiGamingService.instance = new AntiGamingService();
    }
    return AntiGamingService.instance;
  }

  /**
   * Evaluates an incoming interaction event.
   * Returns true if the event is legitimate, or false if it was rejected due to gaming/abuse.
   */
  public validateAndRecord(event: {
    eventType: MetricEventType;
    actorId?: string;
    actorRole?: "creator" | "brand" | "visitor" | "admin";
    targetId: string;
    targetType: "creator" | "campaign" | "brand";
    sessionHash?: string;
    metadata?: Record<string, any>;
  }): { valid: boolean; reason?: string } {
    const state = db.getState();
    const now = Date.now();
    const oneHourAgo = new Date(now - 60 * 60 * 1000).toISOString();
    const oneMinuteAgo = new Date(now - 60 * 1000).toISOString();

    // 1. Self-Interaction Rejection: creator interacting with their own profile, or brand with own campaign
    if (event.actorId && event.targetType === "creator") {
      const creator = state.creators.find((c) => c.id === event.targetId || c.userId === event.targetId);
      if (creator && creator.userId === event.actorId) {
        return { valid: false, reason: "Self-interaction rejected" };
      }
    }

    if (event.actorId && event.targetType === "campaign") {
      const campaign = state.campaigns.find((c) => c.id === event.targetId);
      if (campaign) {
        const brand = state.brands.find((b) => b.id === campaign.brandId || b.userId === event.actorId);
        if (brand && (brand.userId === event.actorId || brand.id === campaign.brandId && event.actorRole === "brand")) {
          // If brand owner viewing own campaign, allow reading but don't inflate trending
          return { valid: false, reason: "Campaign owner interaction not counted in metrics" };
        }
      }
    }

    const metrics = state.platformMetrics || [];

    // 2. Burst Rate-Limiting: Check how many events actor or session generated in the last 60 seconds
    const recentActorEvents = metrics.filter((m) => {
      const isActor = (event.actorId && m.actorId === event.actorId) ||
                      (event.sessionHash && m.sessionHash === event.sessionHash);
      return isActor && m.timestamp >= oneMinuteAgo;
    });

    if (recentActorEvents.length >= 25) {
      // Flag suspicious activity
      const flagRecord: SuspiciousActivityRecord = {
        id: `susp-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
        actorId: event.actorId,
        targetId: event.targetId,
        reason: `Rate limit burst exceeded (${recentActorEvents.length} events/min)`,
        burstCount: recentActorEvents.length,
        detectedAt: new Date().toISOString(),
        status: "flagged",
      };

      db.updateState((s) => {
        if (!s.suspiciousActivities) s.suspiciousActivities = [];
        s.suspiciousActivities.unshift(flagRecord);
      });

      return { valid: false, reason: "Excessive activity burst throttled" };
    }

    // 3. Deduplication: One profile view or save per actor/session per target per hour
    if (event.eventType === "profile_view" || event.eventType === "profile_save" || event.eventType === "campaign_view") {
      const isDuplicate = metrics.some((m) => {
        const sameTarget = m.targetId === event.targetId && m.eventType === event.eventType;
        const sameActor = (event.actorId && m.actorId === event.actorId) ||
                          (event.sessionHash && m.sessionHash === event.sessionHash);
        return sameTarget && sameActor && m.timestamp >= oneHourAgo;
      });

      if (isDuplicate) {
        return { valid: false, reason: "Duplicate interaction within cooldown window" };
      }
    }

    // Valid event: persist to platform metrics
    const metricRecord: PlatformMetricEntity = {
      id: `metric-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      eventType: event.eventType,
      actorId: event.actorId,
      actorRole: event.actorRole,
      targetId: event.targetId,
      targetType: event.targetType,
      sessionHash: event.sessionHash,
      metadata: event.metadata,
      timestamp: new Date().toISOString(),
    };

    db.updateState((s) => {
      if (!s.platformMetrics) s.platformMetrics = [];
      s.platformMetrics.push(metricRecord);
    });

    return { valid: true };
  }

  /**
   * Computes the time-decay weight for a metric based on age.
   * Window:
   *  <= 7 days: weight 1.0
   *  <= 30 days: weight 0.6
   *  <= 90 days: weight 0.25
   *  > 90 days: weight 0.05
   */
  public static calculateTimeDecayWeight(timestamp: string, windowDays: number = 30): number {
    const ageMs = Date.now() - new Date(timestamp).getTime();
    const ageDays = ageMs / (1000 * 60 * 60 * 24);

    if (ageDays <= 7) return 1.0;
    if (ageDays <= 30) return 0.6;
    if (ageDays <= 90) return 0.25;
    return 0.05;
  }
}

export const antiGamingService = AntiGamingService.getInstance();
