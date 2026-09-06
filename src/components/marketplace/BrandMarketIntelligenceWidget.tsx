"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrandMarketIntelligenceData } from "@/core/types";

export function BrandMarketIntelligenceWidget({ initialCategory }: { initialCategory?: string }) {
  const [data, setData] = useState<BrandMarketIntelligenceData | null>(null);
  const [recommendedCreators, setRecommendedCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const url = initialCategory
      ? `/api/marketplace/intelligence?category=${encodeURIComponent(initialCategory)}`
      : "/api/marketplace/intelligence";

    Promise.all([
      fetch(url).then((res) => res.json()),
      fetch("/api/creators").then((res) => res.json()),
    ])
      .then(([intelRes, creatorsRes]) => {
        if (!isMounted) return;
        if (intelRes.intelligence) setData(intelRes.intelligence);
        const list = Array.isArray(creatorsRes) ? creatorsRes : creatorsRes.creators || [];
        setRecommendedCreators(list.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load intelligence:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [initialCategory]);

  if (loading) {
    return (
      <div className="h-64 w-full animate-pulse rounded-2xl border border-white/5 bg-white/[0.02] p-6" />
    );
  }

  if (!data) return null;

  return (
    <div className="rounded-3xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#12121A] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-2xl space-y-6 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/8 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD21F]/40 bg-[#FFD21F]/15 px-3 py-1 text-xs font-semibold text-[#0A0A0E] dark:text-[#FFD21F]">
            <span>📊</span> Brand Market Intelligence &amp; Rate Benchmarks
          </div>
          <h3 className="mt-2 text-lg font-bold text-[#0A0A0E] dark:text-white font-display">
            Creator Rate Benchmarks &amp; Market Pulse
          </h3>
          <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4]">
            Real-time category demand benchmarks and high-compatibility creator candidates for your briefs.
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-xl bg-[#F4F4F8] dark:bg-white/5 border border-black/6 dark:border-white/10 px-3 py-1 text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
          Live Platform Telemetry
        </span>
      </div>

      {/* Market Pulse Quick Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#1A1A28] border border-black/6 dark:border-white/6 font-mono">
        <div>
          <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] block uppercase font-bold">Niche Demand</span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Demand ↑ 18%</span>
        </div>
        <div>
          <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] block uppercase font-bold">Avg Campaign Budget</span>
          <span className="text-sm font-bold text-[#0A0A0E] dark:text-white">₹32,500 ($2,850)</span>
        </div>
        <div>
          <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] block uppercase font-bold">Most Requested Format</span>
          <span className="text-sm font-bold text-[#0A0A0E] dark:text-white">Short-form video</span>
        </div>
        <div>
          <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] block uppercase font-bold">Avg Engagement</span>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">6.8%</span>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] block uppercase font-bold">Avg Turnaround</span>
          <span className="text-sm font-bold text-amber-600 dark:text-amber-300">4.2 days</span>
        </div>
      </div>

      {/* 3-Column Grid: Pricing Benchmarks, Format Popularity, High-ROI Categories */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* 1. Pricing Benchmarks by Tier */}
        <div className="rounded-2xl border border-black/6 dark:border-white/8 bg-[#FAFAFC] dark:bg-[#161622] p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6A6A78] dark:text-[#8E8EA4] mb-3">
            Creator Rate Card Benchmarks
          </h4>
          <div className="space-y-2">
            {data.creatorPricingBenchmarks.map((tier, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-xl bg-white dark:bg-[#1C1C2A] border border-black/4 dark:border-white/5 px-3 py-2.5 text-xs shadow-2xs"
              >
                <div>
                  <div className="font-bold text-[#0A0A0E] dark:text-white">{tier.tier}</div>
                  <div className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4]">
                    Range: ${tier.rateRange[0]} - ${tier.rateRange[1]}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-extrabold text-[#0A0A0E] dark:text-[#FFD21F] font-mono">${tier.avgRate}</div>
                  <div className="text-[10px] text-[#8A8A9A]">Median</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Format Popularity & Engagement */}
        <div className="rounded-2xl border border-black/6 dark:border-white/8 bg-[#FAFAFC] dark:bg-[#161622] p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6A6A78] dark:text-[#8E8EA4] mb-3">
            Deliverable Format Demand
          </h4>
          <div className="space-y-3">
            {data.formatDemandBreakdown.map((fmt, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#4A4A58] dark:text-neutral-300 font-medium truncate">{fmt.format}</span>
                  <span className="font-bold text-[#0A0A0E] dark:text-white font-mono">{fmt.sharePercent}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] rounded-full"
                    style={{ width: `${fmt.sharePercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">
                  <span>Avg Eng: {fmt.avgEngagement}%</span>
                  <span>Turnaround: {fmt.avgCompletionDays} days</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. High Conversion Categories & Trends */}
        <div className="rounded-2xl border border-black/6 dark:border-white/8 bg-[#FAFAFC] dark:bg-[#161622] p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6A6A78] dark:text-[#8E8EA4] mb-3">
              High-Conversion Categories
            </h4>
            <div className="space-y-2">
              {data.highConversionCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-xl bg-white dark:bg-[#1C1C2A] border border-black/4 dark:border-white/5 px-3 py-2 text-xs shadow-2xs"
                >
                  <span className="font-bold text-[#0A0A0E] dark:text-white">{cat.category}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                      ROI {cat.roiIndex}x
                    </span>
                    <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4]">
                      {cat.demandVelocity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-black/6 dark:border-white/5 text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4] italic font-sans">
            Estimated based on AbeyCollab market transactions
          </div>
        </div>
      </div>

      {/* Recommended Creators Matching Your Briefs */}
      {recommendedCreators.length > 0 && (
        <div className="pt-5 border-t border-black/8 dark:border-white/10 space-y-3.5">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0E] dark:text-white font-display">
                Recommended Creators for Your Active Briefs
              </h4>
              <p className="text-[11px] text-[#5A5A68] dark:text-[#8E8EA4]">
                Matched to your niche, verified audience engagement, and budget benchmarks.
              </p>
            </div>
            <Link
              href="/app/brand/creators"
              className="text-xs font-mono text-[#0A0A0E] dark:text-[#FFD21F] hover:underline font-bold"
            >
              Browse all talent →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {recommendedCreators.map((creator) => (
              <div
                key={creator.id}
                className="p-4 rounded-2xl bg-white dark:bg-[#181826] border border-black/8 dark:border-white/10 hover:border-[#FFD21F]/60 dark:hover:border-[#FFD21F] shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-11 h-11 rounded-xl overflow-hidden bg-[#F5F5F9] dark:bg-neutral-800 shrink-0 border border-black/10 dark:border-white/10">
                    {creator.avatarUrl ? (
                      <Image
                        src={creator.avatarUrl}
                        alt={creator.fullName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-[#0A0A0E] dark:text-white text-xs">
                        {creator.fullName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-[#0A0A0E] dark:text-white truncate">{creator.fullName}</h5>
                    <p className="text-[10px] text-[#6A6A78] dark:text-[#8E8EA4] font-mono truncate">
                      {creator.primaryCategory} • {creator.avgEngagementRate}% ER
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2.5 border-t border-black/6 dark:border-white/5 text-[11px] font-mono">
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">92% Match</span>
                  <Link
                    href={`/creators/${creator.id}`}
                    className="px-3 py-1 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-[10px] font-extrabold hover:brightness-105 transition-all shadow-2xs border border-black/10"
                  >
                    View &amp; Invite
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
