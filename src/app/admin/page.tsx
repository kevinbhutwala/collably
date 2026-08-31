"use client";

import React, { useState } from "react";
import { StatsCard } from "@/components/ui/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import { MOCK_ANALYTICS } from "@/mock/notifications.mock";
import { MOCK_CREATORS } from "@/mock/creators.mock";
import { MOCK_CAMPAIGNS } from "@/mock/campaigns.mock";
import { useUIStore } from "@/stores/ui.store";
import {
  Wallet,
  Users,
  Building2,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function AgencyAdminCommandCenter() {
  const { addToast } = useUIStore();
  const [creators, setCreators] = useState(MOCK_CREATORS);
  const [campaigns, setCampaigns] = useState(MOCK_CAMPAIGNS);

  const handleVerifyCreator = (id: string) => {
    setCreators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, verified: !c.verified } : c))
    );
    addToast({
      type: "success",
      title: "Creator Verification Updated",
      message: "Verification badge status toggled on public directory.",
    });
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-brand-accent">
              Agency Master Operations
            </span>
            <span className="text-slate-300">•</span>
            <Badge variant="glow" size="sm">System Level: Optimal</Badge>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Agency Admin Command Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Realtime platform gross volume, creator roster verification, and escrow settlement control.
          </p>
        </div>
      </div>

      {/* 4 Master Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        <StatsCard
          title="Platform GMV (All-Time)"
          value={formatCurrency(MOCK_ANALYTICS.totalGMV)}
          change="+34.2% MoM"
          subtitle="Processed through Collably Escrow"
          icon={<Wallet className="w-5 h-5 text-emerald-600" />}
        />
        <StatsCard
          title="Active Live Campaigns"
          value={MOCK_ANALYTICS.activeCampaigns}
          subtitle="Across 230 brand accounts"
          icon={<Building2 className="w-5 h-5 text-sky-600" />}
        />
        <StatsCard
          title="Vetted Creator Roster"
          value={formatNumber(MOCK_ANALYTICS.creatorsCount)}
          change="+85 this week"
          subtitle="Top 5% admitted creators"
          icon={<Users className="w-5 h-5 text-amber-500" />}
        />
        <StatsCard
          title="Agency Commission Earned"
          value={formatCurrency(485000)}
          change="+28.4%"
          subtitle="Platform take-rate revenue"
          icon={<Sparkles className="w-5 h-5 text-purple-600" />}
        />
      </div>

      {/* 2-Column Moderation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Creator Verification Queue */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Creator Verification Queue</h3>
              <p className="text-xs text-slate-500">Review audience authenticity and toggle verified badges.</p>
            </div>
            <Badge variant="glow" size="sm">Audited</Badge>
          </div>

          <div className="divide-y divide-slate-100">
            {creators.slice(0, 5).map((c) => (
              <div key={c.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <SafeImage
                      src={c.avatarUrl}
                      alt={c.fullName}
                      fallbackType="creator"
                      fallbackName={c.fullName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1">
                      {c.fullName}
                      {c.verified && <CheckCircle2 className="w-3.5 h-3.5 fill-sky-500 text-white" />}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {c.primaryCategory} • {formatNumber(c.totalFollowers)} Reach
                    </p>
                  </div>
                </div>

                <Button
                  variant={c.verified ? "secondary" : "accent"}
                  size="sm"
                  onClick={() => handleVerifyCreator(c.id)}
                >
                  {c.verified ? "Revoke" : "Verify & Badge"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Escrow Vault Status */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Escrow Settlement Vault</h3>
              <p className="text-xs text-slate-500">Funds secured in platform vault for active campaigns.</p>
            </div>
            <span className="text-xs font-mono text-emerald-600 font-bold">100% Solvency</span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {campaigns.map((camp) => (
              <div key={camp.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 font-sans text-xs">{camp.title}</h4>
                  <p className="text-slate-500 font-sans text-[11px]">{camp.brand.companyName}</p>
                </div>
                <div className="text-right">
                  <span className="text-emerald-600 font-bold block">{formatCurrency(camp.budget.totalBudget)}</span>
                  <span className="text-[10px] text-slate-400">Escrow Locked</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
