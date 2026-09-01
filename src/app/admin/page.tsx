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
  const [campaigns] = useState(MOCK_CAMPAIGNS);

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
    <div className="space-y-8 text-[#111111]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
              Agency Master Operations
            </span>
            <span className="text-[#E7E7E4]">•</span>
            <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
              System Level: Optimal
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#111111] tracking-tight font-display">
            Agency Admin Command Center
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
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
          icon={<Wallet className="w-5 h-5 text-[#111111]" />}
        />
        <StatsCard
          title="Active Live Campaigns"
          value={MOCK_ANALYTICS.activeCampaigns}
          subtitle="Across 230 brand accounts"
          icon={<Building2 className="w-5 h-5 text-[#111111]" />}
        />
        <StatsCard
          title="Vetted Creator Roster"
          value={formatNumber(MOCK_ANALYTICS.creatorsCount)}
          change="+85 this week"
          subtitle="Top 5% admitted creators"
          icon={<Users className="w-5 h-5 text-[#111111]" />}
        />
        <StatsCard
          title="Agency Commission Earned"
          value={formatCurrency(485000)}
          change="+28.4%"
          subtitle="Platform take-rate revenue"
          icon={<Sparkles className="w-5 h-5 text-[#111111]" />}
        />
      </div>

      {/* 2-Column Moderation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Creator Verification Queue */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E4]">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#111111] font-display">Creator Verification Queue</h3>
              <p className="text-xs text-[#6B6B6B] font-sans">Review audience authenticity and toggle verified badges.</p>
            </div>
            <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
              Audited
            </span>
          </div>

          <div className="divide-y divide-[#E7E7E4]">
            {creators.slice(0, 5).map((c) => (
              <div key={c.id} className="py-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#FAFAF8] border border-[#E7E7E4] shrink-0">
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
                    <h4 className="text-xs font-bold text-[#111111] flex items-center gap-1 font-display">
                      {c.fullName}
                      {c.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#111111]" />}
                    </h4>
                    <p className="text-[11px] text-[#6B6B6B] font-mono">
                      {c.primaryCategory} • {formatNumber(c.totalFollowers)} Reach
                    </p>
                  </div>
                </div>

                <Button
                  variant={c.verified ? "secondary" : "primary"}
                  size="sm"
                  onClick={() => handleVerifyCreator(c.id)}
                  className="rounded-[9px]"
                >
                  {c.verified ? "Revoke" : "Verify & Badge"}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Escrow Vault Status */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E4]">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#111111] font-display">Escrow Settlement Vault</h3>
              <p className="text-xs text-[#6B6B6B] font-sans">Funds secured in platform vault for active campaigns.</p>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-[#B7FF3C] text-[#111111] text-xs font-mono font-bold">
              100% Solvency
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs">
            {campaigns.map((camp) => (
              <div key={camp.id} className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-[#111111] font-sans text-xs">{camp.title}</h4>
                  <p className="text-[#6B6B6B] font-sans text-[11px]">{camp.brand.companyName}</p>
                </div>
                <div className="text-right">
                  <span className="text-[#111111] font-extrabold block">{formatCurrency(camp.budget.totalBudget)}</span>
                  <span className="text-[10px] text-[#6B6B6B]">Escrow Locked</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
