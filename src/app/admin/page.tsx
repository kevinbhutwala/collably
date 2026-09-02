"use client";

import React, { useState } from "react";
import { StatsCard } from "@/components/ui/StatsCard";
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
    <div className="space-y-8 text-[#0A0A0E] select-none">
      {/* Header */}
      <div className="hidden lg:flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Agency Master Operations
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              System Level: Optimal
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Agency Admin Command Center
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
            Realtime platform gross volume, creator roster verification, and escrow settlement control.
          </p>
        </div>
      </div>

      {/* Global System Telemetry */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        <StatsCard
          title="Gross Escrow Volume (GMV)"
          value={formatCurrency(MOCK_ANALYTICS.totalGMV)}
          change="+34.2% MoM"
          trend="up"
          subtitle="Pre-funded in Stripe Connect"
          icon={<Wallet className="w-5 h-5 text-[#FFD21F]" />}
        />
        <StatsCard
          title="Net Platform Take-Rate (10%)"
          value={formatCurrency(MOCK_ANALYTICS.totalGMV * 0.1)}
          change="+28.4% MoM"
          trend="up"
          subtitle="Realized transaction fees"
          icon={<Sparkles className="w-5 h-5 text-[#FFD21F]" />}
        />
        <StatsCard
          title="Verified Creator Roster"
          value={String(MOCK_ANALYTICS.creatorsCount)}
          change="+42 this week"
          trend="up"
          subtitle="Audited demographics"
          icon={<Users className="w-5 h-5 text-[#0A0A0E]" />}
        />
        <StatsCard
          title="Active Brand Sponsors"
          value={String(MOCK_ANALYTICS.brandsCount)}
          change="89% Retention"
          trend="up"
          subtitle="Direct contracting accounts"
          icon={<Building2 className="w-5 h-5 text-[#0A0A0E]" />}
        />
      </div>

      {/* 2-Column Admin Control Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Creator Verification Approval Queue */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-black/8">
            <div>
              <h3 className="text-lg font-bold text-[#0A0A0E] font-display">Creator Verification &amp; Badge Control</h3>
              <p className="text-xs text-[#5A5A68] font-sans">Toggle verified checkmarks for algorithmic spotlight ranking.</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
              {creators.filter((c) => c.verified).length} Verified
            </span>
          </div>

          <div className="divide-y divide-black/5 space-y-3">
            {creators.map((creator) => (
              <div
                key={creator.id}
                className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-[#F5F5F9] border border-black/8 shrink-0">
                    <SafeImage
                      src={creator.avatarUrl}
                      alt={creator.fullName}
                      fallbackType="creator"
                      fallbackName={creator.fullName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-[#0A0A0E] font-display">{creator.fullName}</h4>
                      {creator.verified && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-[#7A7A8A] font-mono">
                      @{creator.handle} • {creator.primaryCategory} • {formatNumber(creator.totalFollowers)} Reach
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleVerifyCreator(creator.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold font-mono transition-all border ${
                    creator.verified
                      ? "bg-black/5 text-[#5A5A68] hover:text-[#0A0A0E] border-black/10"
                      : "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] font-bold shadow-xs border-black/10"
                  }`}
                >
                  {creator.verified ? "Revoke Badge" : "Grant Verified"}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Live Escrow Custody Rail */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-black/8">
            <div>
              <h3 className="text-lg font-bold text-[#0A0A0E] font-display">Active Campaign Escrows</h3>
              <p className="text-xs text-[#5A5A68] font-sans">Milestone custody status across deals.</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] border border-[#FFD21F]/40 text-xs font-mono font-bold">
              {campaigns.length} Active
            </span>
          </div>

          <div className="space-y-4 font-mono text-xs">
            {campaigns.map((camp) => (
              <div
                key={camp.id}
                className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-2"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-sm text-[#0A0A0E] font-sans truncate max-w-[200px]">
                    {camp.title}
                  </h4>
                  <span className="text-[#0A0A0E] font-extrabold text-sm">
                    {formatCurrency(camp.budget.totalBudget)}
                  </span>
                </div>
                <div className="flex justify-between text-[#6A6A78] text-[11px]">
                  <span>Sponsor: {camp.brand.companyName}</span>
                  <span className="text-[#0A0A0E] font-bold">
                    {camp.acceptedCount}/{camp.maxCreators} Creators Funded
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-black/10 overflow-hidden">
                  <div
                    className="h-full bg-[#FFD21F] rounded-full"
                    style={{
                      width: `${Math.min(100, (camp.acceptedCount / camp.maxCreators) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
