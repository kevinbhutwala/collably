import { NextRequest, NextResponse } from "next/server";
import { disputeRepo } from "@/server/repositories/dispute.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { SecurityService } from "@/server/services/security.service";

import { creatorRepo } from "@/server/repositories/creator.repo";
import { brandRepo } from "@/server/repositories/brand.repo";
import { collaborationRepo } from "@/server/repositories/collaboration.repo";

export async function GET(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

    const disputes = disputeRepo.getDisputes();
    // Non-admins only see disputes they are part of
    const adminRoles = ["super_admin", "agency_admin", "agency_owner", "moderator"];
    if (adminRoles.includes(session.role)) {
      return NextResponse.json(disputes);
    }

    const creator = creatorRepo.getByUserId(session.userId);
    const brand = brandRepo.getByUserId(session.userId);

    const userDisputes = disputes.filter(
      (d) =>
        d.filedByUserId === session.userId ||
        d.creatorUserId === session.userId ||
        d.brandUserId === session.userId ||
        (creator && d.creatorName === creator.fullName) ||
        (brand && d.brandName === brand.companyName)
    );
    return NextResponse.json(userDisputes);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

    const body = await req.json();
    const { action, id, adminNotes, outcome, ...disputeData } = body;

    // ── 1. Advance Stage (Admin Only) ──
    if (action === "advance_stage") {
      const adminRoles = ["super_admin", "agency_admin", "agency_owner", "moderator"];
      if (!adminRoles.includes(session.role)) {
        return NextResponse.json({ error: "Forbidden: Only administrators can update dispute stage" }, { status: 403 });
      }

      const updated = disputeRepo.updateStage(id, body.stage, adminNotes);
      if (!updated) {
        return NextResponse.json({ error: "Dispute not found" }, { status: 404 });
      }

      auditRepo.logEvent({
        actorId: session.userId,
        actorName: session.email,
        actorRole: session.role,
        action: "DISPUTE_STAGE_UPDATED",
        entityType: "Dispute",
        entityId: id,
        entityName: `Dispute ${id} advanced to ${body.stage}`,
        metadata: { stage: body.stage, adminNotes },
      });

      return NextResponse.json({ success: true, dispute: updated });
    }

    // ── 2. Add Evidence Attachment ──
    if (action === "add_evidence") {
      const attachment = {
        id: `att-${Date.now()}`,
        url: body.url || "",
        title: body.title || "Evidence Attachment",
        submittedBy: session.email,
        submittedAt: new Date().toISOString(),
        role: session.role as any,
        notes: body.notes,
      };

      const updated = disputeRepo.addEvidenceAttachment(id, attachment);
      if (!updated) {
        return NextResponse.json({ error: "Dispute not found" }, { status: 404 });
      }

      return NextResponse.json({ success: true, attachment, dispute: updated });
    }

    // ── 3. Resolve Dispute with 6 Structured Outcomes ──
    if (action === "resolve" || action === "split" || action === "arbitrate") {
      // Must be authorized admin
      const adminRoles = ["super_admin", "agency_admin", "agency_owner", "moderator"];
      if (!adminRoles.includes(session.role)) {
        return NextResponse.json({ error: "Forbidden: Only administrators can resolve disputes" }, { status: 403 });
      }

      const { ledgerService } = await import("@/server/services/ledger.service");
      const { reliabilityService } = await import("@/server/services/reliability.service");
      const dispute = disputeRepo.getDisputes().find((d) => d.id === id);
      if (!dispute) {
        return NextResponse.json({ error: "Dispute not found" }, { status: 404 });
      }

      const totalAmountDollars = Number(dispute.amountInDispute) || 3500;
      const selectedOutcome = outcome || (action === "split" ? "SPLIT_SETTLEMENT" : "FULL_CREATOR_PAYOUT");

      let brandRefundDollars = 0;
      let creatorPayoutDollars = 0;
      let newCollabStatus = "completed";

      switch (selectedOutcome) {
        case "FULL_CREATOR_PAYOUT":
          brandRefundDollars = 0;
          creatorPayoutDollars = totalAmountDollars;
          newCollabStatus = "completed";
          break;

        case "FULL_BRAND_REFUND":
          brandRefundDollars = totalAmountDollars;
          creatorPayoutDollars = 0;
          newCollabStatus = "cancelled";
          break;

        case "PARTIAL_CREATOR_PAYOUT":
          creatorPayoutDollars = body.creatorPayoutDollars !== undefined ? Number(body.creatorPayoutDollars) : totalAmountDollars * 0.7;
          brandRefundDollars = totalAmountDollars - creatorPayoutDollars;
          newCollabStatus = "completed";
          break;

        case "SPLIT_SETTLEMENT":
          brandRefundDollars = body.brandRefundDollars !== undefined ? Number(body.brandRefundDollars) : totalAmountDollars / 2;
          creatorPayoutDollars = body.creatorPayoutDollars !== undefined ? Number(body.creatorPayoutDollars) : totalAmountDollars - brandRefundDollars;
          newCollabStatus = "completed";
          break;

        case "ADDITIONAL_REVISION":
          brandRefundDollars = 0;
          creatorPayoutDollars = 0;
          newCollabStatus = "revision_requested";
          break;

        case "CANCELLATION_WITHOUT_PAYOUT":
          brandRefundDollars = totalAmountDollars;
          creatorPayoutDollars = 0;
          newCollabStatus = "cancelled";
          break;

        default:
          brandRefundDollars = totalAmountDollars / 2;
          creatorPayoutDollars = totalAmountDollars / 2;
      }

      let txId: string | undefined = undefined;

      // If money is being disbursed/refunded, execute balanced double-entry ledger split
      if (selectedOutcome !== "ADDITIONAL_REVISION" && totalAmountDollars > 0) {
        const splitResult = await ledgerService.executeArbitrarySplit({
          milestoneId: dispute.id,
          collaborationId: dispute.collaborationId,
          brandId: dispute.brandName,
          creatorId: dispute.creatorName,
          totalAmountDollars,
          brandRefundDollars,
          creatorPayoutDollars,
          feeRatePercent: 10,
        });
        txId = splitResult.transactionId;
      }

      // Update dispute record with resolution details
      const resolutionDetails = {
        outcome: selectedOutcome,
        brandRefundDollars,
        creatorPayoutDollars,
        platformFeeDollars: (creatorPayoutDollars * 10) / 100,
        notes: adminNotes || `Arbitrated with outcome: ${selectedOutcome}`,
        resolvedBy: session.email,
        resolvedAt: new Date().toISOString(),
        transactionId: txId,
      };

      disputeRepo.updateStatus(id, "Resolved", adminNotes || `Resolved via ${selectedOutcome}`);
      const resolvedDispute = disputeRepo.findById(id);
      if (resolvedDispute) {
        resolvedDispute.resolutionOutcome = selectedOutcome;
        resolvedDispute.resolutionDetails = resolutionDetails;
      }

      if (dispute.collaborationId) {
        collaborationRepo.updateStatus(dispute.collaborationId, newCollabStatus as any);
      }

      // Adjust reliability scores based on arbitration outcome
      if (selectedOutcome === "FULL_CREATOR_PAYOUT") {
        if (dispute.creatorUserId) reliabilityService.recordEvent(dispute.creatorUserId, "creator", "DISPUTE_WON");
        if (dispute.brandUserId) reliabilityService.recordEvent(dispute.brandUserId, "brand", "DISPUTE_LOST");
      } else if (selectedOutcome === "FULL_BRAND_REFUND" || selectedOutcome === "CANCELLATION_WITHOUT_PAYOUT") {
        if (dispute.brandUserId) reliabilityService.recordEvent(dispute.brandUserId, "brand", "DISPUTE_WON");
        if (dispute.creatorUserId) reliabilityService.recordEvent(dispute.creatorUserId, "creator", "DISPUTE_LOST");
      }

      // Extract client IP address for immutable audit logging
      const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";

      auditRepo.logEvent({
        actorId: session.userId,
        actorName: session.email,
        actorRole: session.role,
        action: "DISPUTE_ARBITRATED",
        entityType: "Dispute",
        entityId: id,
        entityName: `Dispute ${id} resolution (${selectedOutcome})`,
        metadata: {
          adminUserId: session.userId,
          ipAddress,
          outcome: selectedOutcome,
          brandRefundDollars,
          creatorPayoutDollars,
          totalEscrowDebited: totalAmountDollars,
          transactionId: txId,
          timestamp: new Date().toISOString(),
        },
      });

      return NextResponse.json({
        success: true,
        status: "RESOLVED",
        resolution: selectedOutcome,
        outcome: selectedOutcome,
        split: {
          brandRefundDollars,
          creatorPayoutDollars,
        },
        transactionId: txId,
      });
    }

    // ── 4. File Dispute & Lock Milestone ──
    const newDispute = disputeRepo.fileDispute({
      ...disputeData,
      filedBy: session.role === "creator" ? "creator" : "brand",
      filedByUserId: session.userId,
    });

    // Halts automated release timer and locks collaboration into DISPUTED status
    if (newDispute.collaborationId) {
      collaborationRepo.updateStatus(newDispute.collaborationId, "disputed");
    }

    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";

    auditRepo.logEvent({
      actorId: session.userId,
      actorName: session.email,
      actorRole: session.role,
      action: "DISPUTE_OPENED",
      entityType: "Dispute",
      entityId: newDispute.id,
      entityName: newDispute.campaignTitle,
      metadata: {
        amount: newDispute.amountInDispute,
        collaborationId: newDispute.collaborationId,
        ipAddress,
        timestamp: new Date().toISOString(),
      },
    });

    return NextResponse.json({ success: true, dispute: newDispute, milestoneStatus: "DISPUTED" }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
