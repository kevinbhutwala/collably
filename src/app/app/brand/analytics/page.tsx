"use client";

import React from "react";
import { StatsCard } from "@/components/ui/StatsCard";
import { formatCurrency } from "@/core/utils/formatters";
import { TrendingUp, Users, Target, DollarSign } from "lucide-react";

export default function BrandAnalyticsPage() {
  return (
    <div className="space-y-6 text-[#0A0A0E] select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Attribution &amp; ROI
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Realtime
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] font-display tracking-tight">
            Campaign Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            Track impressions, conversion rates, and creator ROI.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono">
        <StatsCard
          title="Average ROI"
          value="5.2x"
          change="+18%"
          subtitle="Campaign average"
          icon={<TrendingUp className="w-4 h-4 text-[#FFD21F]" />}
        />
        <StatsCard
          title="Total Reach"
          value="2.4M"
          change="+420k"
          subtitle="Audited impressions"
          icon={<Users className="w-4 h-4 text-[#0A0A0E]" />}
        />
        <StatsCard
          title="Avg CPA"
          value="$14.20"
          trend="down"
          change="-22%"
          subtitle="Cost per signup"
          icon={<Target className="w-4 h-4 text-[#FFD21F]" />}
        />
        <StatsCard
          title="Total Escrow"
          value={formatCurrency(45000)}
          subtitle="3 active briefs"
          icon={<DollarSign className="w-4 h-4 text-[#0A0A0E]" />}
        />
      </div>

      {/* Cohort Performance Breakdown */}
      <div className="p-5 sm:p-7 rounded-3xl bg-white border border-black/8 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-black/8">
          <div>
            <h3 className="text-base font-bold text-[#0A0A0E] font-display">Creator Performance</h3>
            <p className="text-xs text-[#5A5A68]">Conversion metrics across your roster.</p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-mono font-bold">
            Live Cohort
          </span>
        </div>

        <div className="divide-y divide-black/5 font-mono text-xs">
          {[
            { name: "Elena Rostova", platform: "YouTube 60s", views: "142,000", signups: "1,840", spend: "$3,500", roi: "6.4x" },
            { name: "Marcus Vance", platform: "Instagram Reel", views: "185,000", signups: "940", spend: "$2,800", roi: "4.8x" },
            { name: "Aria Sterling", platform: "YouTube Dedicated", views: "210,000", signups: "2,200", spend: "$5,000", roi: "5.9x" },
          ].map((row, i) => (
            <div key={i} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-[#0A0A0E] font-sans">{row.name}</h4>
                <p className="text-[11px] text-[#6A6A78] font-sans">{row.platform}</p>
              </div>

              <div className="grid grid-cols-4 sm:flex items-center gap-3 sm:gap-6 text-xs pt-2 sm:pt-0 border-t sm:border-t-0 border-black/5">
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Views</span>
                  <span className="text-[#0A0A0E] font-bold">{row.views}</span>
                </div>
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Signups</span>
                  <span className="text-[#0A0A0E] font-bold">{row.signups}</span>
                </div>
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Spend</span>
                  <span className="text-[#0A0A0E] font-bold">{row.spend}</span>
                </div>
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">ROI</span>
                  <span className="text-emerald-700 font-extrabold text-xs sm:text-sm flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
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
