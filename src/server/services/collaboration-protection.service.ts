import { db } from "../db/database";
import { collaborationRepo } from "../repositories/collaboration.repo";
import { auditRepo } from "../repositories/audit.repo";
import { notificationRepo } from "../repositories/notification.repo";
import { ledgerService } from "./ledger.service";
import { reliabilityService } from "./reliability.service";
import { PaymentStateMachine } from "./payment-state-machine";
import {
  Collaboration,
  CollaborationDeliverableItem,
  CollaborationPaymentStatus,
  PlatformType,
  PostingVerificationProof,
  UserRole,
} from "@/core/types";
import { dollarsToCents, centsToDollars, calculateFeeCents } from "@/core/utils/currency";

export class CollaborationProtectionService {
  /**
   * Phase 1: Brand deposits upfront budget into secure escrow vault.
   * Unlocks the creator to begin work.
   */
  async fundCollaborationEscrow(params: {
    collaborationId: string;
    brandUserId: string;
    actorRole?: string;
  }): Promise<{ success: boolean; collaboration: Collaboration; transactionId: string }> {
    const collab = collaborationRepo.getById(params.collaborationId);
    if (!collab) {
      throw new Error(`Collaboration ${params.collaborationId} not found`);
    }

    if (collab.isFunded) {
      throw new Error("Collaboration escrow is already secured and funded.");
    }

    const totalBudget = collab.totalAgreedBudget || 3500;
    const now = new Date().toISOString();

    // 1. Debit Brand Cash, Credit Escrow Holding in balanced double-entry ledger
    const ledgerResult = await ledgerService.fundMilestoneEscrow({
      milestoneId: `collab_escrow_${collab.id}`,
      collaborationId: collab.id,
      brandId: collab.brandId || collab.brand?.companyName || "brand",
      amountDollars: totalBudget,
      currency: "USD",
    });

    // 2. Advance state machine to PAYMENT_SECURED
    PaymentStateMachine.transition(
      (collab.paymentStatus?.toUpperCase() as any) || "PAYMENT_PENDING",
      "PAYMENT_SECURED",
      {
        collaborationId: collab.id,
        actorId: params.brandUserId,
        actorRole: params.actorRole || "brand",
      }
    );

    // 3. Update collaboration record in state
    let updatedCollab: Collaboration = collab;
    db.updateState((state) => {
      state.collaborations = state.collaborations || [];
      const c = state.collaborations.find((item) => item.id === params.collaborationId);
      if (!c) return;

      c.isFunded = true;
      c.fundedAt = now;
      c.escrowStatus = "held_in_escrow";
      c.paymentStatus = "payment_secured";
      c.status = "payment_secured";

      // Unlock deliverables from draft to assigned/in_progress
      for (const del of c.deliverables || []) {
        if (del.status === "draft") {
          del.status = "assigned";
        }
      }

      c.updatedAt = now;
      updatedCollab = { ...c };
    });

    // 4. Audit Log & Notifications
    auditRepo.logEvent({
      actorId: params.brandUserId,
      actorName: collab.brand?.companyName || "Brand",
      actorRole: "brand",
      action: "COLLABORATION_ESCROW_FUNDED",
      entityType: "Collaboration",
      entityId: collab.id,
      entityName: collab.campaignTitle,
      metadata: {
        totalAgreedBudget: totalBudget,
        transactionId: ledgerResult.transactionId,
        paymentStatus: "payment_secured",
      },
    });

    await notificationRepo.createNotification({
      userId: collab.creator?.userId || collab.creatorId,
      title: "Escrow Secured: You may now start work!",
      message: `The escrow vault for "${collab.campaignTitle}" ($${totalBudget.toLocaleString()}) has been fully secured. You are safe to start production.`,
      type: "payment",
      entityType: "Collaboration",
      entityId: collab.id,
    });

    return {
      success: true,
      collaboration: updatedCollab,
      transactionId: ledgerResult.transactionId,
    };
  }

  /**
   * Creator confirms acceptance and begins production
   */
  startWork(params: {
    collaborationId: string;
    creatorUserId: string;
  }): Collaboration {
    const collab = collaborationRepo.getById(params.collaborationId);
    if (!collab) throw new Error("Collaboration not found");

    if (!collab.isFunded) {
      throw new Error("Cannot start work: Escrow vault is unfunded. Brand must fund first.");
    }

    let updated: Collaboration = collab;
    const now = new Date().toISOString();

    db.updateState((state) => {
      const c = (state.collaborations || []).find((item) => item.id === params.collaborationId);
      if (!c) return;
      c.paymentStatus = "work_in_progress";
      c.status = "work_in_progress";
      for (const del of c.deliverables || []) {
        if (del.status === "assigned") del.status = "in_progress";
      }
      c.updatedAt = now;
      updated = { ...c };
    });

    return updated;
  }

  /**
   * Creator submits external link for a deliverable.
   * Strictly verifies that collaboration is funded before accepting.
   */
  submitDeliverableDraft(params: {
    collaborationId: string;
    deliverableId: string;
    creatorUserId: string;
    assetUrl: string;
    notes?: string;
  }): { collaboration: Collaboration; deliverable: CollaborationDeliverableItem } {
    const collab = collaborationRepo.getById(params.collaborationId);
    if (!collab) throw new Error("Collaboration not found");

    if (!collab.isFunded || collab.paymentStatus === "payment_pending") {
      throw new Error("COLLABORATION_UNFUNDED: Creator cannot submit deliverables before escrow is funded.");
    }

    if (!params.assetUrl || !params.assetUrl.startsWith("https://")) {
      throw new Error("Deliverable link must be a secure HTTPS URL (e.g., Google Drive, Dropbox, Frame.io)");
    }

    const updatedDel = collaborationRepo.submitDeliverableDraft(params.collaborationId, params.deliverableId, {
      assetUrl: params.assetUrl,
      notes: params.notes,
      creatorNotes: params.notes,
    });

    if (!updatedDel) throw new Error("Deliverable not found");

    // Advance collaboration state to submitted_for_review
    db.updateState((state) => {
      const c = (state.collaborations || []).find((item) => item.id === params.collaborationId);
      if (!c) return;
      c.paymentStatus = "submitted_for_review";
      c.status = "submitted_for_review";
      c.reviewWindowHours = 120;
      c.reviewDeadline = new Date(Date.now() + 120 * 60 * 60 * 1000).toISOString();
      c.updatedAt = new Date().toISOString();
    });

    const refreshed = collaborationRepo.getById(params.collaborationId)!;
    return { collaboration: refreshed, deliverable: updatedDel };
  }

  /**
   * Brand requests revision with strict boundary check (revisionCount < maxRevisions)
   */
  requestRevision(params: {
    collaborationId: string;
    deliverableId: string;
    brandUserId: string;
    feedback: string;
    actorRole?: string;
  }): { collaboration: Collaboration; deliverable: CollaborationDeliverableItem } {
    const collab = collaborationRepo.getById(params.collaborationId);
    if (!collab) throw new Error("Collaboration not found");

    const del = (collab.deliverables || []).find((d) => d.id === params.deliverableId);
    if (!del) throw new Error("Deliverable not found");

    // Revision boundary check
    if (del.revisionCount >= del.maxRevisions) {
      throw new Error(
        `MAX_REVISIONS_EXCEEDED: Deliverable has already reached the maximum of ${del.maxRevisions} revision(s). You must approve or open a dispute.`
      );
    }

    const now = new Date().toISOString();
    let updatedDel: CollaborationDeliverableItem = del;

    db.updateState((state) => {
      const c = (state.collaborations || []).find((item) => item.id === params.collaborationId);
      if (!c) return;
      const d = (c.deliverables || []).find((item) => item.id === params.deliverableId);
      if (!d) return;

      d.revisionCount += 1;
      d.status = "revision_requested";
      c.paymentStatus = "revision_requested";
      c.status = "revision_requested";
      c.updatedAt = now;
      updatedDel = { ...d };
    });

    notificationRepo.createNotification({
      userId: collab.creator?.userId || collab.creatorId,
      title: "Revision Requested",
      message: `The brand requested revision #${updatedDel.revisionCount}/${updatedDel.maxRevisions} for "${del.title}": ${params.feedback}`,
      type: "deliverable",
      entityType: "Deliverable",
      entityId: del.id,
    });

    return { collaboration: collaborationRepo.getById(params.collaborationId)!, deliverable: updatedDel };
  }

  /**
   * Creator submits proof of live post (link, screenshot, platform match).
   * Verifies proof and marks POSTED.
   */
  async submitAndVerifyPostProof(params: {
    collaborationId: string;
    creatorUserId: string;
    postUrl: string;
    platform?: PlatformType;
    screenshotUrl?: string;
    metrics?: { views?: number; likes?: number; comments?: number; shares?: number };
    notes?: string;
  }): Promise<{ success: boolean; proof: PostingVerificationProof; collaboration: Collaboration }> {
    const collab = collaborationRepo.getById(params.collaborationId);
    if (!collab) throw new Error("Collaboration not found");

    if (!params.postUrl || !params.postUrl.startsWith("https://")) {
      throw new Error("Post link must start with https://");
    }

    const validDomains = ["instagram.com", "tiktok.com", "youtube.com", "youtu.be", "twitter.com", "x.com", "linkedin.com"];
    const isRecognized = validDomains.some((d) => params.postUrl.includes(d));
    if (!isRecognized) {
      throw new Error("Post link must be a recognized social platform (YouTube, Instagram, TikTok, X, LinkedIn)");
    }

    const now = new Date().toISOString();
    const proof: PostingVerificationProof = {
      postUrl: params.postUrl,
      platform: params.platform,
      screenshotUrl: params.screenshotUrl,
      publishedAt: now,
      verifiedAt: now,
      verifiedBy: "system_proof_verifier",
      status: "verified",
      metrics: params.metrics,
      notes: params.notes,
    };

    let updatedCollab: Collaboration = collab;
    db.updateState((state) => {
      const c = (state.collaborations || []).find((item) => item.id === params.collaborationId);
      if (!c) return;
      c.verificationProof = proof;
      c.paymentStatus = "posted";
      c.status = "posted";
      c.updatedAt = now;
      updatedCollab = { ...c };
    });

    // Reward creator on-time reliability score
    reliabilityService.recordEvent(
      collab.creator?.userId || collab.creatorId,
      "creator",
      "ON_TIME_COMPLETION"
    );

    auditRepo.logEvent({
      actorId: params.creatorUserId,
      actorName: collab.creator?.fullName || "Creator",
      actorRole: "creator",
      action: "POST_PROOF_VERIFIED",
      entityType: "Collaboration",
      entityId: collab.id,
      entityName: collab.campaignTitle,
      metadata: {
        postUrl: params.postUrl,
        platform: params.platform,
        verifiedAt: now,
      },
    });

    return { success: true, proof, collaboration: updatedCollab };
  }

  /**
   * Stage-Aware Cancellation Engine:
   * Accurately calculates brand refunds and creator kill-fees based on current lifecycle stage.
   * Executes double-entry balancing ledger transactions.
   */
  async cancelCollaboration(params: {
    collaborationId: string;
    actorUserId: string;
    actorRole: UserRole;
    reason: string;
  }): Promise<{
    success: boolean;
    stage: string;
    refundAmountDollars: number;
    killFeeAmountDollars: number;
    transactionId?: string;
    collaboration: Collaboration;
  }> {
    const collab = collaborationRepo.getById(params.collaborationId);
    if (!collab) throw new Error("Collaboration not found");

    if (collab.status === "cancelled" || collab.status === "completed") {
      throw new Error(`Cannot cancel collaboration in status "${collab.status}"`);
    }

    const totalBudget = Number(collab.totalAgreedBudget) || 3500;
    const currentStatus = collab.paymentStatus || "payment_pending";

    // 1. Determine Cancellation Stage & Mathematical Distribution
    let stage: "before_acceptance" | "before_work" | "work_in_progress" | "submitted" | "posted" | "overdue";
    let refundPercentToBrand = 100;
    let killFeePercentToCreator = 0;

    if (!collab.isFunded || currentStatus === "payment_pending") {
      // Unfunded: Nothing held in escrow
      stage = "before_acceptance";
      refundPercentToBrand = 0;
      killFeePercentToCreator = 0;
    } else if (currentStatus === "payment_secured") {
      // Funded, but creator hasn't started production
      stage = "before_work";
      refundPercentToBrand = 100;
      killFeePercentToCreator = 0;
    } else if (currentStatus === "work_in_progress") {
      // Work started -> 30% Kill Fee to creator for reserved time, 70% refund to brand
      stage = "work_in_progress";
      refundPercentToBrand = 70;
      killFeePercentToCreator = 30;
    } else if (currentStatus === "submitted_for_review" || currentStatus === "revision_requested") {
      // Content already created and submitted -> 50% kill-fee to creator, 50% refund to brand
      stage = "submitted";
      refundPercentToBrand = 50;
      killFeePercentToCreator = 50;
    } else if (currentStatus === "overdue" || collab.isOverdue) {
      // Creator missed deadline -> 100% refund to brand, 0% to creator
      stage = "overdue";
      refundPercentToBrand = 100;
      killFeePercentToCreator = 0;
    } else if (currentStatus === "posted" || currentStatus === "approved") {
      throw new Error("CANNOT_CANCEL: Deliverable is already approved/posted. Open a dispute if there is a contract breach.");
    } else {
      stage = "before_work";
      refundPercentToBrand = 100;
      killFeePercentToCreator = 0;
    }

    const refundAmountDollars = (totalBudget * refundPercentToBrand) / 100;
    const killFeeAmountDollars = (totalBudget * killFeePercentToCreator) / 100;

    // 2. Execute Balanced Double-Entry Ledger Transaction if funds were in escrow
    let txId: string | undefined = undefined;
    if (collab.isFunded && totalBudget > 0) {
      const currency = "USD";
      const totalCents = dollarsToCents(totalBudget);
      const refundBrandCents = dollarsToCents(refundAmountDollars);
      const creatorGrossCents = dollarsToCents(killFeeAmountDollars);
      const { feeCents, netCents: creatorNetCents } = calculateFeeCents(creatorGrossCents, 10);

      txId = `tx_cancel_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
      const now = new Date().toISOString();

      const debitEscrow = {
        id: `led_${Date.now()}_1`,
        transactionId: txId,
        account: "ESCROW_HOLDING" as const,
        entityId: collab.id,
        type: "DEBIT" as const,
        amountCents: totalCents,
        netCentsSigned: -totalCents,
        currency,
        referenceType: "COLLABORATION_CANCELLATION" as const,
        referenceId: collab.id,
        description: `Release escrow on stage-aware cancellation (${stage})`,
        createdAt: now,
      };

      const creditBrand = {
        id: `led_${Date.now()}_2`,
        transactionId: txId,
        account: "BRAND_CASH" as const,
        entityId: collab.brandId || "brand",
        type: "CREDIT" as const,
        amountCents: refundBrandCents,
        netCentsSigned: refundBrandCents,
        currency,
        referenceType: "COLLABORATION_CANCELLATION" as const,
        referenceId: collab.id,
        description: `${refundPercentToBrand}% cancellation refund to brand`,
        createdAt: now,
      };

      const creditCreator = {
        id: `led_${Date.now()}_3`,
        transactionId: txId,
        account: "CREATOR_WALLET" as const,
        entityId: collab.creatorId || "creator",
        type: "CREDIT" as const,
        amountCents: creatorNetCents,
        netCentsSigned: creatorNetCents,
        currency,
        referenceType: "COLLABORATION_CANCELLATION" as const,
        referenceId: collab.id,
        description: `${killFeePercentToCreator}% kill fee compensation to creator`,
        createdAt: now,
      };

      const creditPlatform = {
        id: `led_${Date.now()}_4`,
        transactionId: txId,
        account: "PLATFORM_REVENUE" as const,
        entityId: "platform",
        type: "CREDIT" as const,
        amountCents: feeCents,
        netCentsSigned: feeCents,
        currency,
        referenceType: "COLLABORATION_CANCELLATION" as const,
        referenceId: collab.id,
        description: `Platform commission on creator kill-fee`,
        createdAt: now,
      };

      // Double-entry balancing invariant
      const diff = debitEscrow.netCentsSigned + creditBrand.netCentsSigned + creditCreator.netCentsSigned + creditPlatform.netCentsSigned;
      if (diff !== 0) {
        throw new Error(`Double-entry balance mismatch in cancellation: ${diff} cents`);
      }

      db.updateState((state: any) => {
        state.ledgerEntries = state.ledgerEntries || [];
        state.ledgerEntries.push(debitEscrow, creditBrand, creditCreator, creditPlatform);
      });
    }

    // 3. Update Collaboration State
    const now = new Date().toISOString();
    let updatedCollab: Collaboration = collab;
    db.updateState((state) => {
      const c = (state.collaborations || []).find((item) => item.id === params.collaborationId);
      if (!c) return;

      c.status = "cancelled";
      c.paymentStatus = "cancelled";
      c.escrowStatus = "refunded";
      c.cancellationDetails = {
        cancelledBy: params.actorUserId,
        cancelledByRole: params.actorRole,
        cancelledAt: now,
        stage,
        reason: params.reason,
        refundPercentToBrand,
        killFeePercentToCreator,
        refundAmountDollars,
        killFeeAmountDollars,
        transactionId: txId,
      };
      c.updatedAt = now;
      updatedCollab = { ...c };
    });

    // 4. Update Reliability Scores
    if (stage === "overdue") {
      reliabilityService.recordEvent(collab.creator?.userId || collab.creatorId, "creator", "MISSED_DEADLINE");
    } else if (params.actorRole === "creator" && stage === "work_in_progress") {
      reliabilityService.recordEvent(params.actorUserId, "creator", "CREATOR_UNAUTHORIZED_CANCELLATION");
    } else if (params.actorRole === "brand" && stage === "work_in_progress") {
      reliabilityService.recordEvent(params.actorUserId, "brand", "BRAND_LATE_CANCELLATION");
    }

    // 5. Immutable Audit Log
    auditRepo.logEvent({
      actorId: params.actorUserId,
      actorName: params.actorUserId,
      actorRole: params.actorRole,
      action: "COLLABORATION_CANCELLED",
      entityType: "Collaboration",
      entityId: collab.id,
      entityName: collab.campaignTitle,
      metadata: {
        stage,
        refundAmountDollars,
        killFeeAmountDollars,
        transactionId: txId,
        reason: params.reason,
      },
    });

    return {
      success: true,
      stage,
      refundAmountDollars,
      killFeeAmountDollars,
      transactionId: txId,
      collaboration: updatedCollab,
    };
  }
}

export const collaborationProtectionService = new CollaborationProtectionService();
