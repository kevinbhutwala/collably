import { NextRequest, NextResponse } from "next/server";
import { SecurityService } from "@/server/services/security.service";
import { ledgerService } from "@/server/services/ledger.service";
import { collaborationRepo } from "@/server/repositories/collaboration.repo";
import { auditRepo } from "@/server/repositories/audit.repo";
import { db } from "@/server/db/database";

export async function GET(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminRoles = ["super_admin", "agency_admin", "agency_owner", "finance_manager"];
    if (!adminRoles.includes(session.role)) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const collaborations = collaborationRepo.getAll();
    const ledgerEntries = ledgerService.getEntries();

    const totalEscrowHeldCents = ledgerService.getAccountBalanceCents("ESCROW_HOLDING", "*");
    const platformRevenueCents = ledgerService.getAccountBalanceCents("PLATFORM_REVENUE", "*");
    const creatorWalletsCents = ledgerService.getAccountBalanceCents("CREATOR_WALLET", "*");

    const vaults = collaborations.map((c) => {
      const collabEscrowCents = ledgerService.getAccountBalanceCents("ESCROW_HOLDING", c.id);
      return {
        collaborationId: c.id,
        campaignTitle: c.campaignTitle,
        brandName: c.brand?.companyName || "Brand Partner",
        creatorName: c.creator?.fullName || "Creator",
        totalAgreedBudget: c.totalAgreedBudget,
        paymentStatus: c.paymentStatus || c.status,
        isFunded: c.isFunded,
        escrowBalanceDollars: collabEscrowCents / 100,
        createdAt: c.createdAt,
      };
    });

    return NextResponse.json({
      summary: {
        totalEscrowHeldDollars: totalEscrowHeldCents / 100,
        platformRevenueDollars: platformRevenueCents / 100,
        creatorWalletsDollars: creatorWalletsCents / 100,
        activeVaultsCount: vaults.filter((v) => v.escrowBalanceDollars > 0).length,
      },
      vaults,
      recentTransactions: ledgerEntries.slice(-50).reverse(),
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminRoles = ["super_admin", "agency_admin", "agency_owner"];
    if (!adminRoles.includes(session.role)) {
      return NextResponse.json({ error: "Forbidden: Super Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const { action, collaborationId, reason, amountDollars } = body;

    const collab = collaborationRepo.getById(collaborationId);
    if (!collab) {
      return NextResponse.json({ error: "Collaboration not found" }, { status: 404 });
    }

    const currentEscrow = ledgerService.getAccountBalanceCents("ESCROW_HOLDING", collaborationId) / 100;
    const releaseAmount = amountDollars || currentEscrow;

    if (releaseAmount <= 0 || releaseAmount > currentEscrow) {
      return NextResponse.json(
        { error: `Invalid release amount. Current escrow is $${currentEscrow.toFixed(2)}` },
        { status: 400 }
      );
    }

    let txId = `tx_override_${Date.now()}`;
    const now = new Date().toISOString();

    if (action === "emergency_release_to_creator") {
      const split = await ledgerService.executeArbitrarySplit({
        milestoneId: `override_${collaborationId}`,
        collaborationId,
        brandId: collab.brandId || "brand",
        creatorId: collab.creatorId || "creator",
        totalAmountDollars: releaseAmount,
        brandRefundDollars: 0,
        creatorPayoutDollars: releaseAmount,
        feeRatePercent: 10,
      });
      txId = split.transactionId;

      db.updateState((state) => {
        const c = (state.collaborations || []).find((item) => item.id === collaborationId);
        if (c) {
          c.status = "completed";
          c.paymentStatus = "paid";
          c.escrowStatus = "fully_released";
          c.updatedAt = now;
        }
      });
    } else if (action === "emergency_refund_to_brand") {
      const split = await ledgerService.executeArbitrarySplit({
        milestoneId: `override_${collaborationId}`,
        collaborationId,
        brandId: collab.brandId || "brand",
        creatorId: collab.creatorId || "creator",
        totalAmountDollars: releaseAmount,
        brandRefundDollars: releaseAmount,
        creatorPayoutDollars: 0,
        feeRatePercent: 0,
      });
      txId = split.transactionId;

      db.updateState((state) => {
        const c = (state.collaborations || []).find((item) => item.id === collaborationId);
        if (c) {
          c.status = "cancelled";
          c.paymentStatus = "refunded";
          c.escrowStatus = "refunded";
          c.updatedAt = now;
        }
      });
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    const ipAddress = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";

    auditRepo.logEvent({
      actorId: session.userId,
      actorName: session.email,
      actorRole: session.role,
      action: "ADMIN_ESCROW_MANUAL_OVERRIDE",
      entityType: "Collaboration",
      entityId: collaborationId,
      entityName: collab.campaignTitle,
      metadata: {
        action,
        amountDollars: releaseAmount,
        reason,
        ipAddress,
        transactionId: txId,
      },
    });

    return NextResponse.json({
      success: true,
      action,
      amountDollars: releaseAmount,
      transactionId: txId,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
