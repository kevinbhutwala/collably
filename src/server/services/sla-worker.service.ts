import { db } from "../db/database";
import { collaborationRepo } from "../repositories/collaboration.repo";
import { auditRepo } from "../repositories/audit.repo";
import { notificationRepo } from "../repositories/notification.repo";
import { ledgerService } from "./ledger.service";

export interface SlaJobResult {
  processedCount: number;
  autoReleasedCount: number;
  claimedDeliverableIds: string[];
}

export class SlaAutoReleaseWorker {
  private SLA_HOURS = 120; // 120-Hour Brand Inaction SLA window

  /**
   * Scans all submitted deliverables across active collaborations.
   * Simulates PostgreSQL 'FOR UPDATE SKIP LOCKED' by atomically claiming rows via mutex.
   */
  async runAutoReleaseJob(): Promise<SlaJobResult> {
    const collaborations = db.getState().collaborations || [];
    const now = Date.now();
    const slaDurationMs = this.SLA_HOURS * 60 * 60 * 1000;

    let processedCount = 0;
    let autoReleasedCount = 0;
    const claimedDeliverableIds: string[] = [];

    for (const collab of collaborations) {
      if (collab.status === "disputed" || collab.status === "cancelled") {
        continue; // Disputed collaborations have their SLA release halted
      }

      for (const deliverable of collab.deliverables || []) {
        if (deliverable.status !== "submitted") {
          continue;
        }

        processedCount++;

        const latestSubmission = deliverable.submissions?.slice(-1)[0];
        const submittedAt = latestSubmission?.submittedAt
          ? new Date(latestSubmission.submittedAt).getTime()
          : new Date(collab.updatedAt || collab.createdAt).getTime();

        const autoReleaseDeadline = submittedAt + slaDurationMs;

        // Check if 120 hours have elapsed without brand action
        if (now >= autoReleaseDeadline) {
          const lockKey = `sla_claim_${deliverable.id}`;
          
          // FOR UPDATE SKIP LOCKED: Atomically claim row, skipping if another worker already claimed it
          const claimed = await ledgerService.acquireLock(lockKey);
          if (!claimed) {
            continue; // Row is currently locked/claimed by another concurrent worker instance
          }

          try {
            claimedDeliverableIds.push(deliverable.id);
            const payoutAmount = deliverable.payoutAmount || 3500;

            // 1. Execute Escrow Release via Double-Entry Ledger
            const ledgerResult = await ledgerService.disburseMilestoneEscrow({
              milestoneId: deliverable.id,
              collaborationId: collab.id,
              creatorId: collab.creatorId,
              amountDollars: payoutAmount,
              feeRatePercent: 10,
            });

            // 2. Update Milestone Status to Approved (auto-released via SLA)
            collaborationRepo.updateDeliverableStatus(collab.id, deliverable.id, "approved");

            // 3. Immutable Audit Log
            auditRepo.logEvent({
              actorId: "system_sla_worker",
              actorName: "Collably 120h Auto-Release Engine",
              actorRole: "super_admin",
              action: "SLA_AUTO_RELEASE_EXECUTED",
              entityType: "Deliverable",
              entityId: deliverable.id,
              entityName: deliverable.title,
              metadata: {
                reason: "120_HOUR_BRAND_INACTION",
                submittedAt: new Date(submittedAt).toISOString(),
                autoReleaseDeadline: new Date(autoReleaseDeadline).toISOString(),
                transactionId: ledgerResult.transactionId,
                netCreatorPayout: ledgerResult.netCreatorPayout,
                platformFee: ledgerResult.platformFee,
              },
            });

            // 4. Notify both parties
            await notificationRepo.createNotification({
              userId: collab.creator?.userId || collab.creatorId,
              title: "SLA Auto-Release: Milestone Approved!",
              message: `The 120-hour brand review window expired for "${deliverable.title}". Funds ($${ledgerResult.netCreatorPayout.toFixed(2)}) have been automatically released to your wallet.`,
              type: "payment",
              entityType: "Deliverable",
              entityId: deliverable.id,
            });

            await notificationRepo.createNotification({
              userId: collab.brand?.userId || collab.brandId,
              title: "SLA Auto-Release Completed",
              message: `The 120-hour review SLA for deliverable "${deliverable.title}" expired. Funds were released to the creator under platform terms.`,
              type: "campaign",
              entityType: "Deliverable",
              entityId: deliverable.id,
            });

            autoReleasedCount++;
          } finally {
            ledgerService.releaseLock(lockKey);
          }
        }
      }
    }

    return {
      processedCount,
      autoReleasedCount,
      claimedDeliverableIds,
    };
  }
}

export const slaAutoReleaseWorker = new SlaAutoReleaseWorker();
