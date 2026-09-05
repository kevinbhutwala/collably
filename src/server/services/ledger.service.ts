import { db } from "../db/database";
import { dollarsToCents, centsToDollars, calculateFeeCents } from "@/core/utils/currency";

export type LedgerAccount =
  | "ESCROW_HOLDING"
  | "CREATOR_WALLET"
  | "PLATFORM_REVENUE"
  | "BRAND_CASH"
  | "CREATOR_BANK";

export interface LedgerEntry {
  id: string;
  transactionId: string;
  account: LedgerAccount;
  entityId: string; // userId, brandId, creatorId, or 'platform'
  type: "DEBIT" | "CREDIT";
  amountCents: number; // positive integer cents
  netCentsSigned: number; // signed cents (negative for debit, positive for credit)
  currency: string;
  referenceType:
    | "MILESTONE_FUNDING"
    | "ESCROW_RELEASE"
    | "DISPUTE_SPLIT"
    | "PAYOUT_WITHDRAWAL"
    | "ESCROW_FUNDING"
    | "COLLABORATION_CANCELLATION"
    | "ADMIN_OVERRIDE";
  referenceId: string;
  description: string;
  createdAt: string;
}

export class LedgerService {
  // Concurrency Mutex: Simulates PostgreSQL pessimistic row locking (SELECT ... FOR UPDATE)
  private activeLocks: Set<string> = new Set();

  async acquireLock(resourceId: string): Promise<boolean> {
    if (this.activeLocks.has(resourceId)) {
      return false; // Locked by another concurrent process
    }
    this.activeLocks.add(resourceId);
    return true;
  }

  releaseLock(resourceId: string): void {
    this.activeLocks.delete(resourceId);
  }

  getEntries(referenceId?: string): LedgerEntry[] {
    const all = (db.getState() as any).ledgerEntries || [];
    if (referenceId) {
      return all.filter((e: LedgerEntry) => e.referenceId === referenceId);
    }
    return all;
  }

  getAccountBalance(account: LedgerAccount, entityId: string): number {
    const all = this.getEntries();
    const accountEntries = all.filter(
      (e: LedgerEntry) => e.account === account && (entityId === "*" || e.entityId === entityId)
    );
    const totalCents = accountEntries.reduce((sum: number, e: LedgerEntry) => sum + e.netCentsSigned, 0);
    return centsToDollars(totalCents);
  }

  getAccountBalanceCents(account: LedgerAccount, entityId: string): number {
    const all = this.getEntries();
    const accountEntries = all.filter(
      (e: LedgerEntry) => e.account === account && (entityId === "*" || e.entityId === entityId)
    );
    return accountEntries.reduce((sum: number, e: LedgerEntry) => sum + e.netCentsSigned, 0);
  }

  /**
   * Phase 2: Brand pre-funds milestone into escrow
   */
  async fundMilestoneEscrow(params: {
    milestoneId: string;
    collaborationId: string;
    brandId: string;
    amountDollars: number;
    currency?: string;
  }): Promise<{ transactionId: string; entries: LedgerEntry[] }> {
    const currency = params.currency || "USD";
    const amountCents = dollarsToCents(params.amountDollars);
    const txId = `tx_fund_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const debitBrandCash: LedgerEntry = {
      id: `led_${Date.now()}_1`,
      transactionId: txId,
      account: "BRAND_CASH",
      entityId: params.brandId,
      type: "DEBIT",
      amountCents,
      netCentsSigned: -amountCents,
      currency,
      referenceType: "MILESTONE_FUNDING",
      referenceId: params.milestoneId,
      description: `Milestone pre-funding deposit for deliverable ${params.milestoneId}`,
      createdAt: now,
    };

    const creditEscrow: LedgerEntry = {
      id: `led_${Date.now()}_2`,
      transactionId: txId,
      account: "ESCROW_HOLDING",
      entityId: params.collaborationId,
      type: "CREDIT",
      amountCents,
      netCentsSigned: amountCents,
      currency,
      referenceType: "MILESTONE_FUNDING",
      referenceId: params.milestoneId,
      description: `Escrow pre-funded holding for deliverable ${params.milestoneId}`,
      createdAt: now,
    };

    // Double-entry balancing invariant
    if (debitBrandCash.netCentsSigned + creditEscrow.netCentsSigned !== 0) {
      throw new Error("Double-entry invariant violated: debits and credits do not balance");
    }

    db.updateState((state: any) => {
      state.ledgerEntries = state.ledgerEntries || [];
      state.ledgerEntries.push(debitBrandCash, creditEscrow);
    });

    return { transactionId: txId, entries: [debitBrandCash, creditEscrow] };
  }

  /**
   * Phase 4: Brand approves deliverable -> Escrow disbursement to Creator + Platform fee
   */
  async disburseMilestoneEscrow(params: {
    milestoneId: string;
    collaborationId: string;
    creatorId: string;
    amountDollars: number;
    feeRatePercent?: number; // default 10%
    currency?: string;
  }): Promise<{ transactionId: string; entries: LedgerEntry[]; netCreatorPayout: number; platformFee: number }> {
    const lockKey = `milestone_disburse_${params.milestoneId}`;
    const acquired = await this.acquireLock(lockKey);
    if (!acquired) {
      throw new Error("Conflict: Deliverable approval/disbursement is currently processing");
    }

    try {
      // Idempotency / Duplicate Check: Verify milestone hasn't already been disbursed
      const existingDisbursement = this.getEntries(params.milestoneId).find(
        (e) => e.referenceType === "ESCROW_RELEASE"
      );
      if (existingDisbursement) {
        throw new Error("Milestone escrow has already been disbursed");
      }

      const currency = params.currency || "USD";
      const totalCents = dollarsToCents(params.amountDollars);
      const feeRate = params.feeRatePercent !== undefined ? params.feeRatePercent : 10;
      const { feeCents, netCents } = calculateFeeCents(totalCents, feeRate);

      const txId = `tx_disburse_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      const now = new Date().toISOString();

      // 1. Debit Escrow Holding (-$3,500.00)
      const debitEscrow: LedgerEntry = {
        id: `led_${Date.now()}_1`,
        transactionId: txId,
        account: "ESCROW_HOLDING",
        entityId: params.collaborationId,
        type: "DEBIT",
        amountCents: totalCents,
        netCentsSigned: -totalCents,
        currency,
        referenceType: "ESCROW_RELEASE",
        referenceId: params.milestoneId,
        description: `Release escrow holding for approved milestone ${params.milestoneId}`,
        createdAt: now,
      };

      // 2. Credit Creator Wallet (+$3,150.00)
      const creditCreatorWallet: LedgerEntry = {
        id: `led_${Date.now()}_2`,
        transactionId: txId,
        account: "CREATOR_WALLET",
        entityId: params.creatorId,
        type: "CREDIT",
        amountCents: netCents,
        netCentsSigned: netCents,
        currency,
        referenceType: "ESCROW_RELEASE",
        referenceId: params.milestoneId,
        description: `Net earnings credit for milestone ${params.milestoneId}`,
        createdAt: now,
      };

      // 3. Credit Platform Revenue (+$350.00)
      const creditPlatformRevenue: LedgerEntry = {
        id: `led_${Date.now()}_3`,
        transactionId: txId,
        account: "PLATFORM_REVENUE",
        entityId: "platform",
        type: "CREDIT",
        amountCents: feeCents,
        netCentsSigned: feeCents,
        currency,
        referenceType: "ESCROW_RELEASE",
        referenceId: params.milestoneId,
        description: `${feeRate}% platform agency fee on milestone ${params.milestoneId}`,
        createdAt: now,
      };

      // Strict Double-Entry Balancing Invariant Check:
      // Debit (-3500) + Credit (+3150) + Credit (+350) === 0
      const totalBalance =
        debitEscrow.netCentsSigned + creditCreatorWallet.netCentsSigned + creditPlatformRevenue.netCentsSigned;

      if (totalBalance !== 0) {
        throw new Error(`Double-entry balance check failed! Discrepancy: ${totalBalance} cents`);
      }

      db.updateState((state: any) => {
        state.ledgerEntries = state.ledgerEntries || [];
        state.ledgerEntries.push(debitEscrow, creditCreatorWallet, creditPlatformRevenue);
      });

      return {
        transactionId: txId,
        entries: [debitEscrow, creditCreatorWallet, creditPlatformRevenue],
        netCreatorPayout: centsToDollars(netCents),
        platformFee: centsToDollars(feeCents),
      };
    } finally {
      this.releaseLock(lockKey);
    }
  }

  /**
   * Phase 5: Arbitrary Escrow Split Execution (Dispute Resolution)
   */
  async executeArbitrarySplit(params: {
    milestoneId: string;
    collaborationId: string;
    brandId: string;
    creatorId: string;
    totalAmountDollars: number;
    brandRefundDollars: number;
    creatorPayoutDollars: number;
    feeRatePercent?: number;
    currency?: string;
  }): Promise<{ transactionId: string; entries: LedgerEntry[] }> {
    const currency = params.currency || "USD";
    const totalCents = dollarsToCents(params.totalAmountDollars);
    const refundBrandCents = dollarsToCents(params.brandRefundDollars);
    const creatorGrossCents = dollarsToCents(params.creatorPayoutDollars);

    if (refundBrandCents + creatorGrossCents !== totalCents) {
      throw new Error(
        `Split amounts (${refundBrandCents} + ${creatorGrossCents}) do not match total escrow (${totalCents})`
      );
    }

    const feeRate = params.feeRatePercent !== undefined ? params.feeRatePercent : 10;
    const { feeCents, netCents: creatorNetCents } = calculateFeeCents(creatorGrossCents, feeRate);

    const txId = `tx_split_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const debitEscrow: LedgerEntry = {
      id: `led_${Date.now()}_1`,
      transactionId: txId,
      account: "ESCROW_HOLDING",
      entityId: params.collaborationId,
      type: "DEBIT",
      amountCents: totalCents,
      netCentsSigned: -totalCents,
      currency,
      referenceType: "DISPUTE_SPLIT",
      referenceId: params.milestoneId,
      description: `Dispute split resolution debiting escrow for ${params.milestoneId}`,
      createdAt: now,
    };

    const creditBrandRefund: LedgerEntry = {
      id: `led_${Date.now()}_2`,
      transactionId: txId,
      account: "BRAND_CASH",
      entityId: params.brandId,
      type: "CREDIT",
      amountCents: refundBrandCents,
      netCentsSigned: refundBrandCents,
      currency,
      referenceType: "DISPUTE_SPLIT",
      referenceId: params.milestoneId,
      description: `Dispute arbitrated refund to brand`,
      createdAt: now,
    };

    const creditCreatorWallet: LedgerEntry = {
      id: `led_${Date.now()}_3`,
      transactionId: txId,
      account: "CREATOR_WALLET",
      entityId: params.creatorId,
      type: "CREDIT",
      amountCents: creatorNetCents,
      netCentsSigned: creatorNetCents,
      currency,
      referenceType: "DISPUTE_SPLIT",
      referenceId: params.milestoneId,
      description: `Dispute arbitrated partial creator settlement`,
      createdAt: now,
    };

    const creditPlatformFee: LedgerEntry = {
      id: `led_${Date.now()}_4`,
      transactionId: txId,
      account: "PLATFORM_REVENUE",
      entityId: "platform",
      type: "CREDIT",
      amountCents: feeCents,
      netCentsSigned: feeCents,
      currency,
      referenceType: "DISPUTE_SPLIT",
      referenceId: params.milestoneId,
      description: `Platform fee on arbitrated creator earnings`,
      createdAt: now,
    };

    // Verify balance
    const sum =
      debitEscrow.netCentsSigned +
      creditBrandRefund.netCentsSigned +
      creditCreatorWallet.netCentsSigned +
      creditPlatformFee.netCentsSigned;

    if (sum !== 0) {
      throw new Error(`Split invariant failed! Net offset discrepancy: ${sum} cents`);
    }

    db.updateState((state: any) => {
      state.ledgerEntries = state.ledgerEntries || [];
      state.ledgerEntries.push(debitEscrow, creditBrandRefund, creditCreatorWallet, creditPlatformFee);
    });

    return {
      transactionId: txId,
      entries: [debitEscrow, creditBrandRefund, creditCreatorWallet, creditPlatformFee],
    };
  }

  /**
   * Phase 4: Creator Withdrawal / Stripe Connect Transfer
   */
  async withdrawCreatorFunds(params: {
    creatorId: string;
    amountDollars: number;
    destinationBankOrStripeId: string;
    currency?: string;
  }): Promise<{ transactionId: string; remainingBalanceDollars: number; entry: LedgerEntry }> {
    const currency = params.currency || "USD";
    const amountCents = dollarsToCents(params.amountDollars);
    const availableCents = this.getAccountBalanceCents("CREATOR_WALLET", params.creatorId);

    if (amountCents > availableCents) {
      throw new Error(
        `Insufficient funds in Creator Wallet: requested $${params.amountDollars}, available $${centsToDollars(availableCents)}`
      );
    }

    const txId = `tx_withdraw_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const now = new Date().toISOString();

    const debitCreatorWallet: LedgerEntry = {
      id: `led_${Date.now()}_w1`,
      transactionId: txId,
      account: "CREATOR_WALLET",
      entityId: params.creatorId,
      type: "DEBIT",
      amountCents,
      netCentsSigned: -amountCents,
      currency,
      referenceType: "PAYOUT_WITHDRAWAL",
      referenceId: params.destinationBankOrStripeId,
      description: `Payout withdrawal to bank account ${params.destinationBankOrStripeId}`,
      createdAt: now,
    };

    const creditCreatorBank: LedgerEntry = {
      id: `led_${Date.now()}_w2`,
      transactionId: txId,
      account: "CREATOR_BANK",
      entityId: params.creatorId,
      type: "CREDIT",
      amountCents,
      netCentsSigned: amountCents,
      currency,
      referenceType: "PAYOUT_WITHDRAWAL",
      referenceId: params.destinationBankOrStripeId,
      description: `Disbursed to connected external account`,
      createdAt: now,
    };

    db.updateState((state: any) => {
      state.ledgerEntries = state.ledgerEntries || [];
      state.ledgerEntries.push(debitCreatorWallet, creditCreatorBank);
    });

    const remainingBalanceDollars = this.getAccountBalance("CREATOR_WALLET", params.creatorId);

    return {
      transactionId: txId,
      remainingBalanceDollars,
      entry: debitCreatorWallet,
    };
  }
}

export const ledgerService = new LedgerService();
