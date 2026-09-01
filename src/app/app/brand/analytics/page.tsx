"use client";

import React from "react";
import { StatsCard } from "@/components/ui/StatsCard";
import { formatCurrency } from "@/core/utils/formatters";
import { TrendingUp, Users, Target, DollarSign } from "lucide-react";

export default function BrandAnalyticsPage() {
  return (
    <div className="space-y-8 text-white select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-white/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Attribution &amp; ROI
            </span>
            <span className="text-white/20">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#FFD21F] font-mono text-[10px] font-bold">
              Realtime Multiplier
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Campaign Performance Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
            Audit creator retention, coupon redemptions, and cost per acquisition.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        <StatsCard
          title="Blended ROI Multiplier"
          value="5.2x"
          change="+18% vs benchmark"
          subtitle="Revenue generated / Creator budget"
          icon={<TrendingUp className="w-5 h-5 text-[#FFD21F]" />}
        />
        <StatsCard
          title="Total Reach Delivered"
          value="2.4M"
          change="+420k organic"
          subtitle="Audited impressions across cohort"
          icon={<Users className="w-5 h-5 text-white" />}
        />
        <StatsCard
          title="Average CPA"
          value="$14.20"
          trend="down"
          change="-22% CAC reduction"
          subtitle="Per qualified software signup"
          icon={<Target className="w-5 h-5 text-[#FFD21F]" />}
        />
        <StatsCard
          title="Total Escrow Invested"
          value={formatCurrency(45000)}
          subtitle="Across 3 live campaigns"
          icon={<DollarSign className="w-5 h-5 text-white" />}
        />
      </div>

      {/* Cohort Performance Breakdown */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0C15]/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white font-display">Creator Cohort Breakdown</h3>
            <p className="text-xs text-white/50 font-sans">Individual conversion metrics across your roster.</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold">
            Top Quartile
          </span>
        </div>

        <div className="divide-y divide-white/10 font-mono text-xs">
          {[
            { name: "Elena Rostova", platform: "YouTube 60s", views: "142,000", signups: "1,840", spend: "$3,500", roi: "6.4x" },
            { name: "Marcus Vance", platform: "Instagram Reel", views: "185,000", signups: "940", spend: "$2,800", roi: "4.8x" },
            { name: "Aria Sterling", platform: "YouTube Dedicated", views: "210,000", signups: "2,200", spend: "$5,000", roi: "5.9x" },
          ].map((row, i) => (
            <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white font-sans">{row.name}</h4>
                <p className="text-[11px] text-white/50 font-sans">{row.platform}</p>
              </div>

              <div className="flex items-center gap-6 text-xs">
                <div>
                  <span className="text-white/40 block text-[10px]">Views</span>
                  <span className="text-white font-bold">{row.views}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">Conversions</span>
                  <span className="text-white font-bold">{row.signups}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">Spend</span>
                  <span className="text-white font-bold">{row.spend}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">ROI</span>
                  <span className="text-emerald-400 font-extrabold text-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {row.roi}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
