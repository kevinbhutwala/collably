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
    const { action, id, adminNotes, ...disputeData } = body;

    if (action === "resolve" || action === "split") {
      // Must be authorized admin
      const adminRoles = ["super_admin", "agency_admin", "agency_owner", "moderator"];
      if (!adminRoles.includes(session.role)) {
        return NextResponse.json({ error: "Forbidden: Only administrators can resolve disputes" }, { status: 403 });
      }

      const { ledgerService } = await import("@/server/services/ledger.service");
      const dispute = disputeRepo.getDisputes().find((d) => d.id === id);
      if (!dispute) {
        return NextResponse.json({ error: "Dispute not found" }, { status: 404 });
      }

      const totalAmountDollars = Number(dispute.amountInDispute) || 3500;
      // Default to 50/50 split if not specified
      const brandRefundDollars = body.brandRefundDollars !== undefined ? Number(body.brandRefundDollars) : totalAmountDollars / 2;
      const creatorPayoutDollars = body.creatorPayoutDollars !== undefined ? Number(body.creatorPayoutDollars) : totalAmountDollars / 2;

      // Execute double-entry arbitrary split
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

      disputeRepo.resolveDispute(id, adminNotes || "Resolved via arbitrated escrow split");
      collaborationRepo.updateStatus(dispute.collaborationId, "completed");

      // Extract client IP address for immutable audit logging
      const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";

      auditRepo.logEvent({
        actorId: session.userId,
        actorName: session.email,
        actorRole: session.role,
        action: "FUNDS_SPLIT",
        entityType: "Dispute",
        entityId: id,
        entityName: `Dispute ${id} arbitrated split`,
        metadata: {
          adminUserId: session.userId,
          ipAddress,
          brandRefundDollars,
          creatorPayoutDollars,
          totalEscrowDebited: totalAmountDollars,
          transactionId: splitResult.transactionId,
          timestamp: new Date().toISOString(),
        },
      });

      return NextResponse.json({
        success: true,
        status: "RESOLVED",
        resolution: "FUNDS_SPLIT",
        split: {
          brandRefundDollars,
          creatorPayoutDollars,
        },
        transactionId: splitResult.transactionId,
      });
    }

    // 1. File Dispute & Lock Milestone
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
