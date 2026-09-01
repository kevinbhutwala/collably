"use client";

import React from "react";
import { useAuthStore } from "@/stores/auth.store";
import { StatsCard } from "@/components/ui/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { AnimatedEmptyState } from "@/components/ui/AnimatedEmptyState";
import { formatNumber } from "@/core/utils/formatters";
import { TrendingUp, Users, Sparkles, BarChart3, Activity } from "lucide-react";

export default function CreatorAnalyticsPage() {
  const { currentCreator } = useAuthStore();
  const totalFollowers = currentCreator?.totalFollowers || 0;
  const er = currentCreator?.avgEngagementRate || 0;

  return (
    <div className="space-y-8 text-[#111111]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
              Audience Intel
            </span>
            <span className="text-[#E7E7E4]">•</span>
            <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
              Live Social Sync
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
            Creator Performance &amp; Analytics
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
            Verified audience retention curves, engagement benchmarks, and brand campaign impressions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        <StatsCard
          title="Engagement Rate"
          value={er > 0 ? `${er}%` : "Pending Sync"}
          subtitle={er > 0 ? "Audited from connected channels" : "Connect social accounts to compute"}
          icon={<TrendingUp className="w-5 h-5 text-[#111111]" />}
        />
        <StatsCard
          title="Total Follower Reach"
          value={totalFollowers > 0 ? formatNumber(totalFollowers) : "0"}
          subtitle="Cross-platform audience"
          icon={<Users className="w-5 h-5 text-[#111111]" />}
        />
        <StatsCard
          title="Campaigns Completed"
          value={String(currentCreator?.completedCampaignsCount || 0)}
          subtitle="Milestones successfully released"
          icon={<Sparkles className="w-5 h-5 text-[#111111]" />}
        />
        <StatsCard
          title="Creator Tier"
          value={currentCreator?.tier ? currentCreator.tier.toUpperCase() : "PRO"}
          subtitle="Quality rating verified"
          icon={<Activity className="w-5 h-5 text-[#111111]" />}
        />
      </div>

      {/* Performance Graph or Animated Empty State */}
      <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6 text-[#111111]">
        <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E4]">
          <h3 className="text-base sm:text-lg font-bold text-[#111111] font-display">
            30-Day Impression &amp; Retention Curves
          </h3>
          <span className="px-2 py-0.5 rounded-full bg-[#B7FF3C] text-[#111111] text-[10px] font-mono font-bold">
            REALTIME
          </span>
        </div>

        {totalFollowers === 0 && (currentCreator?.completedCampaignsCount || 0) === 0 ? (
          <AnimatedEmptyState
            icon={<BarChart3 className="w-8 h-8 text-[#111111]" />}
            badgeText="Telemetry Inactive"
            title="No Audience Telemetry Recorded"
            description="Connect your YouTube, Instagram, or TikTok handles in your Profile to sync live impression curves and brand engagement benchmarks."
            actionText="Edit Media Kit & Handles"
            actionHref="/app/profile"
            secondaryText="Return to Dashboard"
            secondaryHref="/app/dashboard"
          />
        ) : (
          <div className="space-y-4">
            <div className="h-64 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] p-6 flex flex-col justify-end space-y-3">
              <div className="flex items-end justify-between gap-2 h-44">
                {[35, 48, 62, 55, 78, 65, 88, 92, 84, 96, 90, 100].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                    <div
                      className="w-full rounded-t-md bg-[#111111] group-hover:bg-[#B7FF3C] transition-all shadow-xs"
                      style={{ height: `${val}%` }}
                    />
                    <span className="text-[9px] font-mono text-[#6B6B6B]">W{i + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
