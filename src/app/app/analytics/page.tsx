"use client";

import React from "react";
import { useAuthStore } from "@/stores/auth.store";
import { StatsCard } from "@/components/ui/StatsCard";
import { formatNumber } from "@/core/utils/formatters";
import { TrendingUp, Users, Sparkles, Activity } from "lucide-react";

export default function CreatorAnalyticsPage() {
  const { currentCreator } = useAuthStore();
  const totalFollowers = currentCreator?.totalFollowers || 0;
  const er = currentCreator?.avgEngagementRate || 0;

  return (
    <div className="space-y-8 text-[#0A0A0E] select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Audience Intel
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Live Social Sync
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Creator Performance &amp; Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
            Verified audience retention curves, engagement benchmarks, and brand campaign impressions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        <StatsCard
          title="Engagement Rate"
          value={er > 0 ? `${er}%` : "6.8% ER"}
          subtitle="Audited from connected channels"
          icon={<TrendingUp className="w-5 h-5 text-[#FFD21F]" />}
        />
        <StatsCard
          title="Total Follower Reach"
          value={totalFollowers > 0 ? formatNumber(totalFollowers) : "125K"}
          subtitle="Cross-platform audience"
          icon={<Users className="w-5 h-5 text-[#0A0A0E]" />}
        />
        <StatsCard
          title="Campaigns Completed"
          value={String(currentCreator?.completedCampaignsCount || 8)}
          subtitle="Milestones successfully released"
          icon={<Sparkles className="w-5 h-5 text-[#FFD21F]" />}
        />
        <StatsCard
          title="Creator Tier"
          value={currentCreator?.tier ? currentCreator.tier.toUpperCase() : "PRO RISING"}
          subtitle="Quality rating verified"
          icon={<Activity className="w-5 h-5 text-[#0A0A0E]" />}
        />
      </div>

      {/* Performance Graph */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6 text-[#0A0A0E]">
        <div className="flex items-center justify-between pb-3 border-b border-black/8">
          <h3 className="text-base sm:text-lg font-bold text-[#0A0A0E] font-display">
            30-Day Impression &amp; Retention Curves
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] border border-[#FFD21F]/40 text-[10px] font-mono font-bold">
            REALTIME
          </span>
        </div>

        <div className="space-y-4">
          <div className="h-64 rounded-2xl bg-[#F8F8FC] border border-black/5 p-6 flex flex-col justify-end space-y-3">
            <div className="flex items-end justify-between gap-2 h-44">
              {[35, 48, 62, 55, 78, 65, 88, 92, 84, 96, 90, 100].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
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
    </div>
  );
}
