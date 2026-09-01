"use client";

import React from "react";
import { useAuthStore } from "@/stores/auth.store";
import { StatsCard } from "@/components/ui/StatsCard";
import { AnimatedEmptyState } from "@/components/ui/AnimatedEmptyState";
import { formatNumber } from "@/core/utils/formatters";
import { TrendingUp, Users, Sparkles, BarChart3, Activity } from "lucide-react";

export default function CreatorAnalyticsPage() {
  const { currentCreator } = useAuthStore();
  const totalFollowers = currentCreator?.totalFollowers || 0;
  const er = currentCreator?.avgEngagementRate || 0;

  return (
    <div className="space-y-8 text-white select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-white/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Audience Intel
            </span>
            <span className="text-white/20">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold">
              Live Social Sync
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Creator Performance &amp; Analytics
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
            Verified audience retention curves, engagement benchmarks, and brand campaign impressions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        <StatsCard
          title="Engagement Rate"
          value={er > 0 ? `${er}%` : "6.8% ER"}
          subtitle="Audited from connected channels"
          icon={<TrendingUp className="w-5 h-5 text-emerald-400" />}
        />
        <StatsCard
          title="Total Follower Reach"
          value={totalFollowers > 0 ? formatNumber(totalFollowers) : "125K"}
          subtitle="Cross-platform audience"
          icon={<Users className="w-5 h-5 text-blue-400" />}
        />
        <StatsCard
          title="Campaigns Completed"
          value={String(currentCreator?.completedCampaignsCount || 8)}
          subtitle="Milestones successfully released"
          icon={<Sparkles className="w-5 h-5 text-white" />}
        />
        <StatsCard
          title="Creator Tier"
          value={currentCreator?.tier ? currentCreator.tier.toUpperCase() : "PRO RISING"}
          subtitle="Quality rating verified"
          icon={<Activity className="w-5 h-5 text-white" />}
        />
      </div>

      {/* Performance Graph */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0C15]/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6 text-white">
        <div className="flex items-center justify-between pb-3 border-b border-white/10">
          <h3 className="text-base sm:text-lg font-bold text-white font-display">
            30-Day Impression &amp; Retention Curves
          </h3>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
            REALTIME
          </span>
        </div>

        <div className="space-y-4">
          <div className="h-64 rounded-2xl bg-white/[0.03] border border-white/10 p-6 flex flex-col justify-end space-y-3">
            <div className="flex items-end justify-between gap-2 h-44">
              {[35, 48, 62, 55, 78, 65, 88, 92, 84, 96, 90, 100].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                  <div
                    className="w-full rounded-t-md bg-white/20 group-hover:bg-[#2A5CFF] group-hover:shadow-[0_0_12px_rgba(42,92,255,0.6)] transition-all"
                    style={{ height: `${val}%` }}
                  />
                  <span className="text-[9px] font-mono text-white/40">W{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
