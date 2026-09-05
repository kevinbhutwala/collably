import { db } from "../db/database";
import { collaborationRepo } from "../repositories/collaboration.repo";
import { auditRepo } from "../repositories/audit.repo";
import { notificationRepo } from "../repositories/notification.repo";
import { slaAutoReleaseWorker } from "./sla-worker.service";
import { reliabilityService } from "./reliability.service";

export interface GuardianJobReport {
  expiredUnfundedCount: number;
  flaggedOverdueCount: number;
  slaAutoReleasedCount: number;
  timestamp: string;
}

export class PaymentGuardianService {
  private UNPAID_EXPIRATION_HOURS = 48; // 48-hour brand inaction funding SLA
  private DEFAULT_GRACE_HOURS = 24;     // 24-hour grace period for creator posting/submission

  /**
   * Run full watchdog routine across all collaborations in the database
   */
  async runWatchdog(): Promise<GuardianJobReport> {
    const collaborations = db.getState().collaborations || [];
    const now = Date.now();
    let expiredUnfundedCount = 0;
    let flaggedOverdueCount = 0;

    for (const collab of collaborations) {
      const createdTime = new Date(collab.createdAt).getTime();

      // ── 1. Auto-Expire Unfunded Collaborations (>48 Hours) ──
      const isUnfunded = !collab.isFunded || collab.paymentStatus === "payment_pending" || collab.status === "payment_pending";
      if (isUnfunded && collab.status !== "expired" && collab.status !== "cancelled") {
        const ageHours = (now - createdTime) / (1000 * 60 * 60);
        if (ageHours >= this.UNPAID_EXPIRATION_HOURS) {
          db.updateState((state) => {
            const c = (state.collaborations || []).find((item) => item.id === collab.id);
            if (!c) return;
            c.status = "expired";
            c.paymentStatus = "expired";
            c.updatedAt = new Date().toISOString();
          });

          expiredUnfundedCount++;

          auditRepo.logEvent({
            actorId: "payment_guardian",
            actorName: "Collably Payment Guardian",
            actorRole: "super_admin",
            action: "COLLABORATION_EXPIRED_UNFUNDED",
            entityType: "Collaboration",
            entityId: collab.id,
            entityName: collab.campaignTitle,
            metadata: {
              ageHours,
              reason: "Brand failed to fund escrow within 48h SLA",
            },
          });

          await notificationRepo.createNotification({
            userId: collab.brand?.userId || collab.brandId,
            title: "Collaboration Expired",
            message: `Collaboration "${collab.campaignTitle}" was automatically cancelled because the escrow vault was not funded within 48 hours.`,
            type: "campaign",
            entityType: "Collaboration",
            entityId: collab.id,
          });
        }
      }

      // ── 2. Flag Overdue Deliverables / Missed Deadlines ──
      const isActiveAndFunded =
        collab.isFunded &&
        (collab.paymentStatus === "work_in_progress" ||
         collab.paymentStatus === "payment_secured" ||
         collab.status === "active" ||
         collab.status === "work_in_progress");

      if (isActiveAndFunded && !collab.isOverdue) {
        const deadline = collab.postingDeadline || collab.finalDeadline;
        if (deadline) {
          const deadlineTime = new Date(deadline).getTime();
          const gracePeriodMs = (collab.gracePeriodHours || this.DEFAULT_GRACE_HOURS) * 60 * 60 * 1000;

          if (now >= deadlineTime + gracePeriodMs) {
            db.updateState((state) => {
              const c = (state.collaborations || []).find((item) => item.id === collab.id);
              if (!c) return;
              c.isOverdue = true;
              c.paymentStatus = "overdue";
              c.status = "overdue";
              c.updatedAt = new Date().toISOString();
            });

            flaggedOverdueCount++;

            // Deduct creator reliability score for breach
            reliabilityService.recordEvent(
              collab.creator?.userId || collab.creatorId,
              "creator",
              "MISSED_DEADLINE"
            );

            auditRepo.logEvent({
              actorId: "payment_guardian",
              actorName: "Collably Payment Guardian",
              actorRole: "super_admin",
              action: "COLLABORATION_MARKED_OVERDUE",
              entityType: "Collaboration",
              entityId: collab.id,
              entityName: collab.campaignTitle,
              metadata: {
                deadline,
                gracePeriodHours: collab.gracePeriodHours || this.DEFAULT_GRACE_HOURS,
              },
            });

            await notificationRepo.createNotification({
              userId: collab.brand?.userId || collab.brandId,
              title: "Deliverable Overdue - Brand Options Available",
              message: `The agreed deadline + grace period for "${collab.campaignTitle}" has passed. You may cancel for a 100% refund or initiate dispute arbitration.`,
              type: "campaign",
              entityType: "Collaboration",
              entityId: collab.id,
            });

            await notificationRepo.createNotification({
              userId: collab.creator?.userId || collab.creatorId,
              title: "Urgent: Deliverable Deadline Breached",
              message: `Your deadline for "${collab.campaignTitle}" is overdue. Please submit your deliverable immediately to avoid cancellation and account penalties.`,
              type: "deliverable",
              entityType: "Collaboration",
              entityId: collab.id,
            });
          }
        }
      }
    }

    // ── 3. Run 120-hour Brand Inaction SLA Auto-Release ──
    const slaResult = await slaAutoReleaseWorker.runAutoReleaseJob();

    return {
      expiredUnfundedCount,
      flaggedOverdueCount,
      slaAutoReleasedCount: slaResult.autoReleasedCount,
      timestamp: new Date().toISOString(),
    };
  }
}

export const paymentGuardian = new PaymentGuardianService();
