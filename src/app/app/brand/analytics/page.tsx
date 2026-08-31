"use client";

import React from "react";
import { StatsCard } from "@/components/ui/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import { TrendingUp, Users, Target, DollarSign, BarChart3, Award } from "lucide-react";

export default function BrandAnalyticsPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-brand-accent">
              Attribution & ROI
            </span>
            <span className="text-zinc-600">•</span>
            <Badge variant="glow" size="sm">Realtime Multiplier</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Campaign Performance Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Audit creator retention, coupon redemptions, and cost per acquisition.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Blended ROI Multiplier"
          value="5.2x"
          change="+18% vs benchmark"
          subtitle="Revenue generated / Creator budget"
          icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
        />
        <StatsCard
          title="Total Reach Delivered"
          value="2.4M"
          change="+420k organic"
          subtitle="Audited impressions across cohort"
          icon={<Users className="w-5 h-5 text-sky-400" />}
        />
        <StatsCard
          title="Average CPA"
          value="$14.20"
          trend="down"
          change="-22% CAC reduction"
          subtitle="Per qualified software signup"
          icon={<Target className="w-5 h-5 text-amber-400" />}
        />
        <StatsCard
          title="Total Escrow Invested"
          value={formatCurrency(45000)}
          subtitle="Across 3 live campaigns"
          icon={<DollarSign className="w-5 h-5 text-purple-400" />}
        />
      </div>

      {/* Cohort Performance Breakdown */}
      <div className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Creator Cohort Breakdown</h3>
            <p className="text-xs text-zinc-400">Individual conversion metrics across your roster.</p>
          </div>
          <Badge variant="glow" size="sm">Top Quartile</Badge>
        </div>

        <div className="divide-y divide-zinc-800 font-mono text-xs">
          {[
            { name: "Elena Rostova", platform: "YouTube 60s", views: "142,000", signups: "1,840", spend: "$3,500", roi: "6.4x" },
            { name: "Marcus Vance", platform: "Instagram Reel", views: "185,000", signups: "940", spend: "$2,800", roi: "4.8x" },
            { name: "Aria Sterling", platform: "YouTube Dedicated", views: "210,000", signups: "2,200", spend: "$5,000", roi: "5.9x" },
          ].map((row, i) => (
            <div key={i} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-sm font-bold text-white font-sans">{row.name}</h4>
                <p className="text-[11px] text-zinc-400 font-sans">{row.platform}</p>
              </div>

              <div className="flex items-center gap-6 text-xs">
                <div>
                  <span className="text-zinc-500 block text-[10px]">Views</span>
                  <span className="text-zinc-200 font-bold">{row.views}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">Conversions</span>
                  <span className="text-zinc-200 font-bold">{row.signups}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">Spend</span>
                  <span className="text-zinc-200 font-bold">{row.spend}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block text-[10px]">ROI</span>
                  <span className="text-emerald-400 font-bold text-sm">{row.roi}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
