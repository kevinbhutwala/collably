"use client";

import React, { useState, useEffect } from "react";
import { paymentService } from "@/services/payment.service";
import { PayoutRecord } from "@/core/types";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { StatsCard } from "@/components/ui/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/core/utils/formatters";
import { Wallet, ShieldCheck, Download, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function EarningsAndEscrowPage() {
  const { role } = useAuthStore();
  const { addToast } = useUIStore();
  const [payouts, setPayouts] = useState<PayoutRecord[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await paymentService.getPayouts();
      setPayouts(data);
    };
    fetch();
  }, []);

  const handleWithdraw = () => {
    addToast({
      type: "success",
      title: "Withdrawal Initiated",
      message: "Funds scheduled for transfer via Stripe Direct. Expected within 24 hours.",
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
            <Badge variant="glow" size="sm">Stripe / Escrow Secured</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {role === "creator" ? "Earnings & Milestone Payouts" : "Brand Escrow & Invoices"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            {role === "creator"
              ? "View funds currently secured in escrow, released payouts, and withdraw to bank."
              : "Manage funded campaign pools, released tranches, and tax receipts."}
          </p>
        </div>

        {role === "creator" && (
          <Button variant="accent" size="md" onClick={handleWithdraw} rightIcon={<ArrowUpRight className="w-4 h-4" />}>
            Withdraw Available Balance
          </Button>
        )}
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono">
        <StatsCard
          title="Available for Payout"
          value={formatCurrency(3150)}
          subtitle="Ready for instant Stripe withdrawal"
          icon={<Wallet className="w-5 h-5 text-emerald-600" />}
        />
        <StatsCard
          title="Secured in Escrow"
          value={formatCurrency(6300)}
          subtitle="Locked pending deliverable approval"
          icon={<ShieldCheck className="w-5 h-5 text-amber-500" />}
        />
        <StatsCard
          title="Lifetime Processed"
          value={formatCurrency(48500)}
          subtitle="Across 42 successful campaigns"
          icon={<CheckCircle2 className="w-5 h-5 text-purple-600" />}
        />
      </div>

      {/* Transaction History Table */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Tranche Payout History</h3>
            <p className="text-xs text-slate-500">All milestone settlements and escrow releases.</p>
          </div>
          <Button variant="ghost" size="sm" leftIcon={<Download className="w-3.5 h-3.5" />}>
            Export CSV
          </Button>
        </div>

        <div className="divide-y divide-slate-100 font-mono text-xs">
          {payouts.map((p) => (
            <div key={p.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 font-sans text-sm">{p.campaignTitle}</span>
                  <Badge variant="glow" size="sm">{p.brandName}</Badge>
                </div>
                <p className="text-slate-500 font-sans">Method: {p.paymentMethod} • ID: {p.id}</p>
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <span className="text-slate-400 block text-[10px]">Net Payout</span>
                  <span className="text-emerald-600 font-extrabold text-sm">{formatCurrency(p.netAmount)}</span>
                </div>
                <Badge variant={p.status === "paid" ? "success" : "warning"} size="sm" dot>
                  {p.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
