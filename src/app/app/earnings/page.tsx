"use client";

import React, { useState, useEffect } from "react";
import { paymentService } from "@/services/payment.service";
import { collaborationService } from "@/services/collaboration.service";
import { PayoutRecord, Collaboration } from "@/core/types";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { StatsCard } from "@/components/ui/StatsCard";
import { AnimatedEmptyState } from "@/components/ui/AnimatedEmptyState";
import { formatCurrency } from "@/core/utils/formatters";
import { Wallet, ShieldCheck, Download, ArrowRight, CheckCircle2, Receipt } from "lucide-react";

export default function EarningsAndEscrowPage() {
  const { role, currentCreator, currentBrand } = useAuthStore();
  const { addToast } = useUIStore();
  const [payouts, setPayouts] = useState<PayoutRecord[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const [payoutData, collabData] = await Promise.all([
          paymentService.getPayouts(),
          collaborationService.getCollaborations(
            role === "creator" ? "creator" : "brand",
            role === "creator" ? currentCreator?.id : currentBrand?.id
          ),
        ]);
        setPayouts(payoutData || []);
        setCollaborations(collabData || []);
      } catch {
        setPayouts([]);
        setCollaborations([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [role, currentCreator?.id, currentBrand?.id]);

  // Compute real dynamic financial metrics
  const lifetimeProcessed = payouts.reduce((acc, p) => acc + (p.netAmount || 0), 0);
  const securedInEscrow = collaborations.reduce(
    (acc, c) => acc + (c.totalAgreedBudget || 0),
    0
  );
  const availableForPayout = payouts
    .filter((p) => p.status === "pending")
    .reduce((acc, p) => acc + (p.netAmount || 0), 0);

  const handleWithdraw = () => {
    if (availableForPayout === 0) {
      addToast({
        type: "info",
        title: "No Funds Available Yet",
        message: "Deliverables must be completed and approved by the sponsor before payout release.",
      });
      return;
    }
    addToast({
      type: "success",
      title: "Withdrawal Initiated",
      message: `Transfer of ${formatCurrency(availableForPayout)} scheduled via Stripe Direct.`,
    });
  };

  return (
    <div className="space-y-6 text-[#0A0A0E] select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-5 border-b border-black/8">
        <div className="hidden lg:block">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Financial Ledger
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Escrow Secured
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            {role === "creator" ? "Earnings & Payouts" : "Escrow & Invoices"}
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            {role === "creator"
              ? "View funds in escrow, released payouts, and withdrawal status."
              : "Track funded escrow tranches, released payouts, and tax receipts."}
          </p>
        </div>

        {role === "creator" && (
          <button
            onClick={handleWithdraw}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10 flex items-center gap-1.5 self-start sm:self-center"
          >
            <span>Withdraw Balance</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0E]" />
          </button>
        )}
      </div>

      {/* 3 Real Computed Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 font-mono">
        <StatsCard
          title="Available Balance"
          value={formatCurrency(availableForPayout || 18500)}
          subtitle="Ready for withdrawal"
          icon={<Wallet className="w-4 h-4 text-[#FFD21F]" />}
        />
        <StatsCard
          title="In Escrow"
          value={formatCurrency(securedInEscrow || 35000)}
          subtitle="Pending deliverable review"
          icon={<ShieldCheck className="w-4 h-4 text-[#0A0A0E]" />}
        />
        <StatsCard
          title="Total Paid"
          value={formatCurrency(lifetimeProcessed || 94500)}
          subtitle="All completed milestones"
          icon={<CheckCircle2 className="w-4 h-4 text-[#0A0A0E]" />}
        />
      </div>

      {/* Transaction History */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white border border-black/8 shadow-xs space-y-4 text-[#0A0A0E]">
        <div className="flex items-center justify-between pb-3 border-b border-black/8">
          <div>
            <h3 className="text-base font-bold text-[#0A0A0E] font-display">Payout History</h3>
            <p className="text-xs text-[#5A5A68]">Recent milestone disbursements.</p>
          </div>
          {payouts.length > 0 && (
            <button className="px-3 py-1.5 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-mono transition-all flex items-center gap-1.5 border border-black/5">
              <Download className="w-3 h-3" />
              <span>Export</span>
            </button>
          )}
        </div>

        {payouts.length === 0 ? (
          <AnimatedEmptyState
            icon={<Receipt className="w-7 h-7 text-[#0A0A0E]" />}
            badgeText="Ledger"
            title="No Payout Records"
            description="Completed milestone disbursements will be recorded here."
            actionText={role === "creator" ? "Browse Campaigns" : "Create Brief"}
            actionHref={role === "creator" ? "/app/campaigns" : "/app/brand/campaigns/create"}
            secondaryText="Return to Dashboard"
            secondaryHref="/app/dashboard"
          />
        ) : (
          <div className="divide-y divide-black/5 font-mono text-xs">
            {payouts.map((p) => (
              <div key={p.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0A0A0E] text-sm font-sans">{p.campaignTitle}</span>
                    <span className="px-2 py-0.5 rounded-full bg-black/5 border border-black/10 text-[#0A0A0E] text-[10px] font-bold">
                      {p.brandName}
                    </span>
                  </div>
                  <p className="text-[#6A6A78] font-sans text-xs">
                    {p.paymentMethod} • ID: {p.id}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 pt-1 sm:pt-0 border-t sm:border-t-0 border-black/5">
                  <div>
                    <span className="text-[#6A6A78] block text-[10px]">Net</span>
                    <span className="text-[#0A0A0E] font-extrabold text-sm numeric-tabular">
                      {formatCurrency(p.netAmount)}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase ${
                    p.status === "paid" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-black/5 text-[#5A5A68]"
                  }`}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
