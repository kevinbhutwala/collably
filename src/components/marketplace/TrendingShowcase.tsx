"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingFeedType,
  TimeframeWindow,
  CreatorTrendingScore,
  CampaignTrendingScore,
} from "@/core/types";
import { ReputationBadgeBar } from "./ReputationBadgeBar";
import { CategoryBadge, TitleIcon } from "@/components/ui/TitleIconBadge";
import { formatCurrency } from "@/core/utils/formatters";
import { useGlobalCurrency } from "@/core/hooks/useGlobalCurrency";

const FEED_TABS: { id: TrendingFeedType; label: string; icon: string }[] = [
  { id: "trending_now", label: "Trending Now", icon: "🔥" },
  { id: "rising", label: "Rising Creators", icon: "📈" },
  { id: "fast_responders", label: "Fast Responders", icon: "⚡" },
  { id: "top_performing", label: "Top Performing", icon: "🏆" },
  { id: "top_rated", label: "Top Rated", icon: "⭐" },
  { id: "new_promising", label: "New & Promising", icon: "🌱" },
  { id: "trending_campaigns", label: "Trending Campaigns", icon: "🚀" },
];

export function TrendingShowcase() {
  const { format } = useGlobalCurrency();
  const [activeTab, setActiveTab] = useState<TrendingFeedType>("trending_now");
  const [timeframe, setTimeframe] = useState<TimeframeWindow>("7d");
  const [creators, setCreators] = useState<CreatorTrendingScore[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignTrendingScore[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch(`/api/marketplace/trending?feed=${activeTab}&timeframe=${timeframe}&limit=12`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.creators) setCreators(data.creators);
        if (data.campaigns) setCampaigns(data.campaigns);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load trending data:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeTab, timeframe]);

  const isCampaignView = activeTab === "trending_campaigns";

  return (
    <div className="w-full text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-black/8 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD21F]/40 bg-[#FFD21F]/15 px-3 py-1 text-xs font-semibold text-[#0A0A0E] dark:text-[#FFD21F]">
            <span>🔥</span> Real-Time Algorithmic Activity
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0A0A0E] dark:text-white font-display">
            Marketplace Trending Hub
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#5A5A68] dark:text-[#8E8EA4]">
            Powered by live platform interactions, escrow completion rates, and verified engagement.
          </p>
        </div>

        {/* Timeframe Filter */}
        <div className="flex items-center gap-1 rounded-2xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#161622] p-1 shadow-2xs self-start sm:self-auto font-mono">
          {(["7d", "30d", "90d"] as TimeframeWindow[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                timeframe === tf
                  ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-2xs"
                  : "text-[#6A6A78] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
              }`}
            >
              {tf === "7d" ? "7 Days" : tf === "30d" ? "30 Days" : "90 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-black/8 dark:border-white/10 mb-6">
        {FEED_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? "border border-[#FFD21F]/40 bg-[#FFD21F]/15 text-[#0A0A0E] dark:text-[#FFD21F] shadow-xs"
                : "border border-black/6 dark:border-white/8 bg-white dark:bg-[#161622] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Loading Skeleton */}
      {loading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-72 animate-pulse rounded-3xl border border-black/6 dark:border-white/5 bg-[#F8F8FC] dark:bg-white/[0.02] p-5"
            />
          ))}
        </div>
      )}

      {/* Campaigns Grid */}
      {!loading && isCampaignView && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((item) => (
            <div
              key={item.campaignId}
              className="group relative flex flex-col justify-between rounded-3xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#16161F] p-6 shadow-xs hover:border-[#FFD21F] dark:hover:border-[#FFD21F] hover:shadow-md transition-all duration-300"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <CategoryBadge category={item.campaign.category} size="xs" showIcon={true} />
                  <div className="flex items-center gap-1 rounded-full border border-[#FFD21F]/40 bg-[#FFD21F]/15 px-2.5 py-0.5 text-xs font-bold text-[#0A0A0E] dark:text-[#FFD21F] font-mono">
                    <span>🔥</span> {item.overallScore} Score
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-[#F8F8FC] dark:bg-white/10 flex items-center justify-center shrink-0 border border-black/5 dark:border-white/10 group-hover:bg-[#FFD21F] transition-colors">
                    <TitleIcon title={item.campaign.title} category={item.campaign.category} className="w-3.5 h-3.5 text-[#0A0A0E] dark:text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#0A0A0E] dark:text-white font-display line-clamp-1 group-hover:text-[#8A6500] dark:group-hover:text-[#FFD21F] transition-colors">
                    {item.campaign.title}
                  </h3>
                </div>
                <p className="mt-1 text-xs text-[#5A5A68] dark:text-[#8E8EA4] line-clamp-2 leading-relaxed">
                  {item.campaign.tagline || item.campaign.description}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-[#F8F8FC] dark:bg-white/[0.03] p-3 text-center border border-black/6 dark:border-white/5 font-mono">
                  <div>
                    <div className="text-[10px] text-[#7A7A8A] uppercase font-bold">Budget</div>
                    <div className="mt-0.5 text-xs font-extrabold text-[#0A0A0E] dark:text-white">
                      {format(item.campaign.budget?.perCreatorBudget || 1500, item.campaign.budget?.currency || "USD")}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#7A7A8A] uppercase font-bold">Applicants</div>
                    <div className="mt-0.5 text-xs font-extrabold text-[#0A0A0E] dark:text-[#FFD21F]">
                      {item.recentMetrics.applicationsCount}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-[#7A7A8A] uppercase font-bold">Time Left</div>
                    <div className="mt-0.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      {item.recentMetrics.daysRemaining}d
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between pt-4 border-t border-black/6 dark:border-white/5">
                <span className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">
                  By {item.campaign.brand?.companyName || "Verified Brand"}
                </span>
                <Link
                  href={`/campaigns`}
                  className="rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] px-4 py-1.5 text-xs font-extrabold text-[#0A0A0E] shadow-2xs border border-black/10 transition-all"
                >
                  View Brief →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Creators Grid */}
      {!loading && !isCampaignView && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {creators.map((item) => {
            const creator = item.creator;
            return (
              <div
                key={item.creatorId}
                className="group relative flex flex-col justify-between rounded-3xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#16161F] p-5 shadow-xs hover:border-[#FFD21F] dark:hover:border-[#FFD21F] hover:shadow-md transition-all duration-300"
              >
                <div>
                  {/* Top Badge & Score */}
                  <div className="flex items-start justify-between gap-2">
                    <CategoryBadge category={creator.primaryCategory} size="xs" showIcon={true} />
                    <div className="flex items-center gap-1 rounded-full border border-[#FFD21F]/40 bg-[#FFD21F]/15 px-2.5 py-0.5 text-[11px] font-bold text-[#0A0A0E] dark:text-[#FFD21F] font-mono">
                      <span>🔥</span> {item.overallScore}
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-black/10 dark:border-white/20 bg-[#F5F5F9] dark:bg-neutral-800">
                      {creator.avatarUrl ? (
                        <Image
                          src={creator.avatarUrl}
                          alt={creator.fullName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-bold text-[#0A0A0E] dark:text-white text-sm">
                          {creator.fullName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="truncate font-extrabold text-[#0A0A0E] dark:text-white text-sm font-display group-hover:text-[#8A6500] dark:group-hover:text-[#FFD21F] transition-colors">
                          {creator.fullName}
                        </h4>
                        {creator.verified && (
                          <span className="text-[#FFD21F] text-xs" title="Verified">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="truncate text-xs font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
                        @{creator.handle} · {creator.location}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Badges Bar */}
                  <div className="mt-3.5">
                    <ReputationBadgeBar badges={item.badges} maxVisible={3} size="sm" />
                  </div>

                  {/* Metrics Row */}
                  <div className="mt-4 grid grid-cols-3 gap-1 rounded-2xl bg-[#F8F8FC] dark:bg-white/[0.03] p-2.5 text-center border border-black/6 dark:border-white/5 font-mono">
                    <div>
                      <div className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold">Followers</div>
                      <div className="mt-0.5 text-xs font-extrabold text-[#0A0A0E] dark:text-white">
                        {creator.totalFollowers >= 1000000
                          ? `${(creator.totalFollowers / 1000000).toFixed(1)}M`
                          : `${Math.round(creator.totalFollowers / 1000)}k`}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold">Eng. Rate</div>
                      <div className="mt-0.5 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                        {creator.avgEngagementRate}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold">Deals</div>
                      <div className="mt-0.5 text-xs font-extrabold text-[#0A0A0E] dark:text-[#FFD21F]">
                        {creator.completedCampaignsCount || 0}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-black/6 dark:border-white/5">
                  <div className="text-xs text-[#5A5A68] dark:text-neutral-300 font-mono">
                    From <span className="font-extrabold text-[#0A0A0E] dark:text-white">{format(creator.startingPrice, (creator as any).currency || "USD")}</span>
                  </div>
                  <Link
                    href={`/creators/${creator.id}`}
                    className="rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] px-4 py-1.5 text-xs font-extrabold text-[#0A0A0E] shadow-2xs border border-black/10 transition-all"
                  >
                    View Talent →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!loading && !isCampaignView && creators.length === 0 && (
        <div className="rounded-3xl border border-black/8 dark:border-white/10 bg-white dark:bg-white/5 p-12 text-center text-[#7A7A8A] dark:text-neutral-400 font-mono text-xs">
          No creators found in this curation view.
        </div>
      )}
    </div>
  );
}
