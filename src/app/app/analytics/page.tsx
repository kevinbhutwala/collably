"use client";

import React from "react";
import { useAuthStore } from "@/stores/auth.store";
import { StatsCard } from "@/components/ui/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { TrendingUp, Users, Eye, Sparkles } from "lucide-react";

export default function CreatorAnalyticsPage() {
  const { currentCreator } = useAuthStore();

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-brand-accent">
              Audience Intel
            </span>
            <span className="text-slate-300">•</span>
            <Badge variant="glow" size="sm">Live Social Sync</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Creator Performance & Retention
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Verified audience retention curves, engagement benchmarks, and brand campaign impressions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        <StatsCard
          title="Average Engagement Rate"
          value={`${currentCreator?.avgEngagementRate || 6.4}%`}
          change="+1.2% this month"
          subtitle="Top 3% in Technology & AI"
          icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
        />
        <StatsCard
          title="Total Follower Network"
          value={formatNumber(currentCreator?.totalFollowers || 485000)}
          change="+14.5k growth"
          subtitle="Across YouTube, X, and Instagram"
          icon={<Users className="w-5 h-5 text-sky-600" />}
        />
        <StatsCard
          title="Monthly Impressions"
          value="880K"
          change="+28%"
          subtitle="Average 30-day cross-platform views"
          icon={<Eye className="w-5 h-5 text-amber-500" />}
        />
        <StatsCard
          title="Campaign Satisfaction"
          value="4.98 / 5.0"
          subtitle="100% on-time milestone delivery"
          icon={<Sparkles className="w-5 h-5 text-purple-600" />}
        />
      </div>

      {/* Audience Demographics Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
          <h3 className="text-base font-bold text-slate-900">Geographic Distribution</h3>
          <div className="space-y-3 font-mono text-xs">
            {currentCreator?.audience.topCountries.map((c, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-700 font-sans font-medium">{c.country}</span>
                  <span className="text-emerald-600 font-bold">{c.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-brand-accent rounded-full" style={{ width: `${c.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
          <h3 className="text-base font-bold text-slate-900">Age Breakdown</h3>
          <div className="space-y-3 font-mono text-xs">
            {currentCreator?.audience.ageDistribution.map((a, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-700 font-sans font-medium">{a.range} Years</span>
                  <span className="text-sky-600 font-bold">{a.percentage}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-sky-500 rounded-full" style={{ width: `${a.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
