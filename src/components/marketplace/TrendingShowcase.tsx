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
    <div className="w-full">
      {/* Header & Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD21F]/30 bg-[#FFD21F]/10 px-3 py-1 text-xs font-semibold text-[#FFD21F]">
            <span>🔥</span> Real-Time Algorithmic Activity
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Marketplace Trending Hub
          </h2>
          <p className="mt-1 text-sm text-neutral-400">
            Powered by live platform interactions, escrow completion rates, and verified engagement.
          </p>
        </div>

        {/* Timeframe Filter */}
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-md self-start sm:self-auto">
          {(["7d", "30d", "90d"] as TimeframeWindow[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                timeframe === tf
                  ? "bg-[#FFD21F] text-black font-semibold shadow-md shadow-[#FFD21F]/20"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {tf === "7d" ? "7 Days" : tf === "30d" ? "30 Days" : "90 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar border-b border-white/10 mb-6">
        {FEED_TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2 text-xs font-medium transition-all ${
              activeTab === tab.id
                ? "border border-[#FFD21F]/40 bg-[#FFD21F]/15 text-[#FFD21F] shadow-lg shadow-[#FFD21F]/10"
                : "border border-white/5 bg-white/5 text-neutral-400 hover:border-white/15 hover:text-white"
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
              className="h-72 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02] p-5"
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
              className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#16161F] p-6 transition-all duration-300 hover:border-[#FFD21F]/40 hover:shadow-xl hover:shadow-[#FFD21F]/5"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400">
                    {item.campaign.category}
                  </span>
                  <div className="flex items-center gap-1 rounded-full border border-[#FFD21F]/30 bg-[#FFD21F]/10 px-2.5 py-0.5 text-xs font-bold text-[#FFD21F]">
                    <span>🔥</span> {item.overallScore} Score
                  </div>
                </div>

                <h3 className="mt-3 text-lg font-bold text-white line-clamp-1 group-hover:text-[#FFD21F] transition-colors">
                  {item.campaign.title}
                </h3>
                <p className="mt-1 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                  {item.campaign.tagline || item.campaign.description}
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-white/[0.03] p-3 text-center border border-white/5">
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Budget</div>
                    <div className="mt-0.5 text-xs font-bold text-white">
                      ${item.campaign.budget?.perCreatorBudget?.toLocaleString() || "1,500"}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Applicants</div>
                    <div className="mt-0.5 text-xs font-bold text-[#FFD21F]">
                      {item.recentMetrics.applicationsCount}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Time Left</div>
                    <div className="mt-0.5 text-xs font-bold text-neutral-300">
                      {item.recentMetrics.daysRemaining}d
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between pt-4 border-t border-white/5">
                <span className="text-xs text-neutral-400">
                  By {item.campaign.brand?.companyName || "Verified Brand"}
                </span>
                <Link
                  href={`/campaigns`}
                  className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-[#FFD21F] hover:text-black transition-all"
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
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#16161F] p-5 transition-all duration-300 hover:border-[#FFD21F]/40 hover:shadow-xl hover:shadow-[#FFD21F]/5"
              >
                <div>
                  {/* Top Badge & Score */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-neutral-300">
                      {creator.primaryCategory}
                    </span>
                    <div className="flex items-center gap-1 rounded-full border border-[#FFD21F]/30 bg-[#FFD21F]/10 px-2 py-0.5 text-[11px] font-bold text-[#FFD21F]">
                      <span>🔥</span> {item.overallScore}
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/20 bg-neutral-800">
                      {creator.avatarUrl ? (
                        <Image
                          src={creator.avatarUrl}
                          alt={creator.fullName}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center font-bold text-white text-sm">
                          {creator.fullName.charAt(0)}
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="truncate font-semibold text-white text-sm group-hover:text-[#FFD21F] transition-colors">
                          {creator.fullName}
                        </h4>
                        {creator.verified && (
                          <span className="text-blue-400 text-xs" title="Verified">
                            ✓
                          </span>
                        )}
                      </div>
                      <p className="truncate text-xs text-neutral-400">
                        @{creator.handle} · {creator.location}
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Badges Bar */}
                  <div className="mt-3.5">
                    <ReputationBadgeBar badges={item.badges} maxVisible={3} size="sm" />
                  </div>

                  {/* Metrics Row */}
                  <div className="mt-4 grid grid-cols-3 gap-1 rounded-xl bg-white/[0.03] p-2.5 text-center border border-white/5">
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Followers</div>
                      <div className="mt-0.5 text-xs font-bold text-white">
                        {creator.totalFollowers >= 1000000
                          ? `${(creator.totalFollowers / 1000000).toFixed(1)}M`
                          : `${Math.round(creator.totalFollowers / 1000)}k`}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Eng. Rate</div>
                      <div className="mt-0.5 text-xs font-bold text-emerald-400">
                        {creator.avgEngagementRate}%
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider">Deals</div>
                      <div className="mt-0.5 text-xs font-bold text-[#FFD21F]">
                        {creator.completedCampaignsCount || 0}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer / CTA */}
                <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/5">
                  <div className="text-xs text-neutral-300">
                    From <span className="font-semibold text-white">${creator.startingPrice}</span>
                  </div>
                  <Link
                    href={`/creators/${creator.id}`}
                    className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-medium text-white hover:bg-[#FFD21F] hover:text-black transition-all"
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
        <div className="rounded-2xl border border-white/10 bg-white/5 p-12 text-center text-neutral-400">
          No creators found in this curation view.
        </div>
      )}
    </div>
  );
}
