import { NextRequest, NextResponse } from "next/server";
import { collaborationRepo } from "@/server/repositories/collaboration.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { SecurityService } from "@/server/services/security.service";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const collab = collaborationRepo.getById(params.id);
    if (!collab) {
      return NextResponse.json({ error: "Collaboration not found" }, { status: 404 });
    }
    return NextResponse.json(collab);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    // 1. Enforce authenticated session
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

    const collab = collaborationRepo.getById(params.id);
    if (!collab) {
      return NextResponse.json({ error: "Collaboration not found" }, { status: 404 });
    }

    const body = await req.json();
    const { action, deliverableId, mediaUrls, captionText, creatorNotes } = body;

    if (action === "submit") {
      // Must be creator or admin
      if (session.role !== "creator" && session.role !== "super_admin" && session.role !== "agency_admin") {
        return NextResponse.json({ error: "Forbidden: Only creators can submit deliverable drafts" }, { status: 403 });
      }

      const updatedDel = collaborationRepo.submitDeliverableDraft(params.id, deliverableId, {
        mediaUrls,
        captionText,
        creatorNotes,
      });

      auditRepo.logEvent({
        actorId: session.userId,
        actorName: session.email,
        actorRole: session.role,
        action: "DELIVERABLE_SUBMITTED",
        entityType: "Deliverable",
        entityId: deliverableId,
        entityName: `Deliverable draft for collab ${params.id}`,
      });

      return NextResponse.json({ success: true, deliverable: updatedDel });
    }

    if (action === "approve") {
      // Must be brand or admin
      const isBrandRole = ["brand", "brand_owner", "brand_manager", "super_admin", "agency_admin"].includes(session.role);
      if (!isBrandRole) {
        return NextResponse.json({ error: "Forbidden: Only sponsoring brand can approve deliverables" }, { status: 403 });
      }

      const deliverable = collab.deliverables.find((d) => d.id === deliverableId);
      if (!deliverable) {
        return NextResponse.json({ error: "Deliverable not found" }, { status: 404 });
      }

      // Concurrency / Pessimistic Locking & Double-Click Protection
      const { ledgerService } = await import("@/server/services/ledger.service");
      const { paymentRepo } = await import("@/server/repositories/payment.repo");
      const { notificationRepo } = await import("@/server/repositories/notification.repo");

      const payoutAmount = deliverable.payoutAmount || 3500;

      // Execute atomic double-entry escrow release
      // Debit: ESCROW_HOLDING (-payoutAmount)
      // Credit: CREATOR_WALLET (+payoutAmount * 0.90) and PLATFORM_REVENUE (+payoutAmount * 0.10)
      const ledgerResult = await ledgerService.disburseMilestoneEscrow({
        milestoneId: deliverableId,
        collaborationId: params.id,
        creatorId: collab.creatorId,
        amountDollars: payoutAmount,
        feeRatePercent: 10,
      });

      // Update deliverable status to approved
      collaborationRepo.approveDeliverable(params.id, deliverableId);

      // Create payout record
      await paymentRepo.createPayout({
        creatorId: collab.creatorId,
        collaborationId: params.id,
        campaignId: collab.campaignId,
        campaignTitle: collab.campaignTitle,
        brandName: collab.brand?.companyName || "Brand Partner",
        creatorName: collab.creator?.fullName || "Creator",
        deliverableTitle: deliverable.title,
        grossAmount: payoutAmount,
        netAmount: ledgerResult.netCreatorPayout,
        agencyFee: ledgerResult.platformFee,
        status: "pending", // Ready for creator withdrawal
        paymentMethod: "stripe_connect",
      });

      // Notify creator
      await notificationRepo.createNotification({
        userId: collab.creator?.userId || collab.creatorId,
        title: "Milestone Approved & Disbursed!",
        message: `Your deliverable for "${collab.campaignTitle}" was approved. $${ledgerResult.netCreatorPayout.toFixed(2)} has been credited to your Creator Wallet.`,
        type: "payment",
        entityType: "Payout",
        entityId: deliverableId,
      });

      auditRepo.logEvent({
        actorId: session.userId,
        actorName: session.email,
        actorRole: session.role,
        action: "DELIVERABLE_APPROVED_TRANCHE_RELEASED",
        entityType: "Deliverable",
        entityId: deliverableId,
        entityName: `Deliverable approved for collab ${params.id}`,
        metadata: {
          grossEscrowDebited: payoutAmount,
          creatorWalletCredited: ledgerResult.netCreatorPayout,
          platformRevenueCredited: ledgerResult.platformFee,
          transactionId: ledgerResult.transactionId,
        },
      });

      return NextResponse.json({
        success: true,
        status: "RELEASED",
        deliverableId,
        ledger: {
          debit: { account: "ESCROW_HOLDING", amount: -payoutAmount },
          credits: [
            { account: "CREATOR_WALLET", amount: ledgerResult.netCreatorPayout },
            { account: "PLATFORM_REVENUE", amount: ledgerResult.platformFee },
          ],
        },
      });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
