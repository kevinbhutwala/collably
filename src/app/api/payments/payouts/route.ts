import { NextRequest, NextResponse } from "next/server";
import { paymentService } from "@/server/services/payment.service";
import { SecurityService } from "@/server/services/security.service";

export async function GET(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const creatorId = searchParams.get("creatorId") || undefined;
    const payouts = await paymentService.getPayouts(creatorId);

    // Compute live multi-currency wallet balance from immutable ledger
    const { ledgerService } = await import("@/server/services/ledger.service");
    const { creatorRepo } = await import("@/server/repositories/creator.repo");
    const creator = creatorRepo.getByUserId(session.userId);
    const targetCurrency = searchParams.get("currency") || (creator as any)?.currency || "USD";
    const balancesByCurrency = creator ? ledgerService.getAccountBalancesByCurrency("CREATOR_WALLET", creator.id) : {};
    const walletBalance = creator ? ledgerService.getAccountBalanceInCurrency("CREATOR_WALLET", creator.id, targetCurrency) : 0;

    return NextResponse.json({
      payouts,
      walletBalance,
      currency: targetCurrency,
      balancesByCurrency,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch payouts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = SecurityService.getSession(req);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized: Session required" }, { status: 401 });
    }

    const body = await req.json();

    // 1. Creator Self-Service Withdrawal Flow
    if (body.action === "withdraw" || session.role === "creator") {
      const { creatorRepo } = await import("@/server/repositories/creator.repo");
      const { ledgerService } = await import("@/server/services/ledger.service");
      const { paymentRepo } = await import("@/server/repositories/payment.repo");

      const creator = creatorRepo.getByUserId(session.userId);
      if (!creator) {
        return NextResponse.json({ error: "Creator profile not found" }, { status: 404 });
      }

      const withdrawAmount = Number(body.amountDollars || body.amount) || 3150;
      const withdrawCurrency = (body.currency || (creator as any).currency || "USD").toUpperCase();
      const bankDestination = body.destinationAccount || "stripe_connect_express_verified";

      // Deduct from Creator Wallet via ledger service
      const withdrawalResult = await ledgerService.withdrawCreatorFunds({
        creatorId: creator.id,
        amountDollars: withdrawAmount,
        currency: withdrawCurrency,
        destinationBankOrStripeId: bankDestination,
      });

      // Record payout record marked as paid in withdrawCurrency
      const payout = await paymentRepo.createPayout({
        creatorId: creator.id,
        collaborationId: "withdrawal",
        campaignTitle: "Creator Wallet Withdrawal",
        brandName: "AbeyCollab Escrow Rails",
        creatorName: creator.fullName,
        deliverableTitle: "Direct Express Bank Transfer",
        grossAmount: withdrawAmount,
        netAmount: withdrawAmount,
        currency: withdrawCurrency,
        agencyFee: 0,
        status: "paid", // Status shifts to PAID_OUT
        paymentMethod: "stripe_connect",
      });

      return NextResponse.json({
        success: true,
        status: "PAID_OUT",
        withdrawnAmount: withdrawAmount,
        currency: withdrawCurrency,
        remainingBalanceDollars: withdrawalResult.remainingBalanceDollars,
        transactionId: withdrawalResult.transactionId,
        payout,
      });
    }

    // 2. Admin Manual Payout Release
    const adminRoles = ["super_admin", "agency_admin", "agency_owner", "finance_manager"];
    if (!adminRoles.includes(session.role)) {
      return NextResponse.json({ error: "Forbidden: Admin privileges required to release payouts" }, { status: 403 });
    }

    if (!body.payoutId) {
      return NextResponse.json({ error: "payoutId is required" }, { status: 400 });
    }

    const payout = await paymentService.releasePayout(body.payoutId);
    return NextResponse.json({ success: true, payout, status: "PAID_OUT" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to release payout" }, { status: 400 });
  }
}
