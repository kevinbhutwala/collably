"use client";

import React, { useState, useEffect } from "react";
import { paymentService } from "@/services/payment.service";
import { collaborationService } from "@/services/collaboration.service";
import { PayoutRecord, Collaboration } from "@/core/types";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { StatsCard } from "@/components/ui/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { AnimatedEmptyState } from "@/components/ui/AnimatedEmptyState";
import { formatCurrency } from "@/core/utils/formatters";
import { Wallet, ShieldCheck, Download, ArrowUpRight, CheckCircle2, Receipt } from "lucide-react";

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
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-brand-accent">
              Financial Ledger
            </span>
            <span className="text-slate-300">•</span>
            <Badge variant="glow" size="sm">
              Stripe / Escrow Secured
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            {role === "creator" ? "Earnings & Milestone Payouts" : "Brand Escrow & Invoices"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-sans">
            {role === "creator"
              ? "View funds currently secured in escrow, released payouts, and withdraw to bank."
              : "Manage funded campaign pools, released tranches, and tax receipts."}
          </p>
        </div>

        {role === "creator" && (
          <Button
            variant="accent"
            size="md"
            onClick={handleWithdraw}
            rightIcon={<ArrowUpRight className="w-4 h-4" />}
            className="font-display"
          >
            Withdraw Available Balance
          </Button>
        )}
      </div>

      {/* 3 Real Computed Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
        <StatsCard
          title="Available for Payout"
          value={formatCurrency(availableForPayout)}
          subtitle={availableForPayout > 0 ? "Ready for instant Stripe withdrawal" : "No pending tranches"}
          icon={<Wallet className="w-5 h-5 text-emerald-600" />}
        />
        <StatsCard
          title="Secured in Escrow"
          value={formatCurrency(securedInEscrow)}
          subtitle={securedInEscrow > 0 ? "Locked pending deliverable approval" : "No active funds locked"}
          icon={<ShieldCheck className="w-5 h-5 text-amber-500" />}
        />
        <StatsCard
          title="Lifetime Processed"
          value={formatCurrency(lifetimeProcessed)}
          subtitle={`Across ${payouts.length} milestone releases`}
          icon={<CheckCircle2 className="w-5 h-5 text-purple-600" />}
        />
      </div>

      {/* Transaction History Table or Animated Empty State */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-black text-slate-900 font-display">Tranche Payout History</h3>
            <p className="text-xs text-slate-500 font-sans">All milestone settlements and escrow releases.</p>
          </div>
          {payouts.length > 0 && (
            <Button variant="ghost" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
              Export CSV
            </Button>
          )}
        </div>

        {payouts.length === 0 ? (
          <AnimatedEmptyState
            icon={<Receipt className="w-8 h-8" />}
            badgeText="Financial Custody"
            title="No Payout Records Yet"
            description="Once you complete milestone deliverables or approve submitted content, official Stripe payout disbursement receipts will be logged here."
            actionText={role === "creator" ? "Browse Brand Briefs" : "Create Campaign Brief"}
            actionHref={role === "creator" ? "/campaigns" : "/app/brand/campaigns/create"}
            secondaryText="Return to Dashboard"
            secondaryHref="/app/dashboard"
          />
        ) : (
          <div className="divide-y divide-slate-100 font-mono text-xs">
            {payouts.map((p) => (
              <div key={p.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 font-display text-sm">{p.campaignTitle}</span>
                    <Badge variant="glow" size="sm">
                      {p.brandName}
                    </Badge>
                  </div>
                  <p className="text-slate-500 font-sans">
                    Method: {p.paymentMethod} • ID: {p.id}
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Net Payout</span>
                    <span className="text-emerald-600 font-extrabold text-sm">
                      {formatCurrency(p.netAmount)}
                    </span>
                  </div>
                  <Badge variant={p.status === "paid" ? "success" : "warning"} size="sm" dot>
                    {p.status.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
