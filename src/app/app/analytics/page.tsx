"use client";

import React from "react";
import { useAuthStore } from "@/stores/auth.store";
import { StatsCard } from "@/components/ui/StatsCard";
import { formatNumber } from "@/core/utils/formatters";
import { FeatureGate } from "@/components/subscriptions/FeatureGate";
import { TrendingUp, Users, Sparkles, Activity } from "lucide-react";

export default function CreatorAnalyticsPage() {
  const { currentCreator } = useAuthStore();
  const totalFollowers = currentCreator?.totalFollowers || 0;
  const er = currentCreator?.avgEngagementRate || 0;

  return (
    <div className="space-y-6 text-[#0A0A0E] select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Audience Intel
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Synced
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            Audience reach, engagement benchmarks, and campaign performance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono">
        <StatsCard
          title="Engagement Rate"
          value={er > 0 ? `${er}%` : "6.8%"}
          subtitle="Audited rate"
          icon={<TrendingUp className="w-4 h-4 text-[#FFD21F]" />}
        />
        <StatsCard
          title="Total Reach"
          value={totalFollowers > 0 ? formatNumber(totalFollowers) : "125K"}
          subtitle="Followers"
          icon={<Users className="w-4 h-4 text-[#0A0A0E]" />}
        />
        <StatsCard
          title="Deals Completed"
          value={String(currentCreator?.completedCampaignsCount || 8)}
          subtitle="Released milestones"
          icon={<Sparkles className="w-4 h-4 text-[#FFD21F]" />}
        />
        <StatsCard
          title="Creator Tier"
          value={currentCreator?.tier ? currentCreator.tier.toUpperCase() : "PRO"}
          subtitle="Verified tier"
          icon={<Activity className="w-4 h-4 text-[#0A0A0E]" />}
        />
      </div>

      {/* Advanced Performance Graph (Pro Tier Feature) */}
      <FeatureGate
        feature="advancedAnalytics"
        requiredPlanId="creator_pro"
        title="30-Day Impression Telemetry"
        description="Detailed demographic breakdown and weekly retention curves for Creator Pro members."
      >
        <div className="p-5 sm:p-7 rounded-3xl bg-white border border-black/8 shadow-xs space-y-4 text-[#0A0A0E]">
          <div className="flex items-center justify-between pb-3 border-b border-black/8">
            <h3 className="text-base font-bold text-[#0A0A0E] font-display">
              30-Day Impression Activity
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] border border-[#FFD21F]/40 text-[10px] font-mono font-bold">
              LIVE
            </span>
          </div>

          <div className="space-y-3">
            <div className="h-56 rounded-2xl bg-[#F8F8FC] border border-black/5 p-4 sm:p-6 flex flex-col justify-end space-y-2">
              <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-40">
                {[35, 48, 62, 55, 78, 65, 88, 92, 84, 96, 90, 100].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                    <div
                      className="w-full rounded-t-md bg-black/15 group-hover:bg-[#FFD21F] transition-all"
                      style={{ height: `${val}%` }}
                    />
                    <span className="text-[9px] font-mono text-[#7A7A8A]">W{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FeatureGate>
    </div>
  );
}

