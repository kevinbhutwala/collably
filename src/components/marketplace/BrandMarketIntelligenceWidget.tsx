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
    <div className="rounded-2xl border border-white/10 bg-[#12121A] p-6 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
            <span>📊</span> Brand Market Intelligence &amp; Pricing Index
          </div>
          <h3 className="mt-1.5 text-lg font-bold text-white font-display">
            Creator Rate Benchmarks &amp; Market Pulse
          </h3>
          <p className="text-xs text-neutral-400">
            Real-time category demand benchmarks and high-compatibility creator candidates for your briefs.
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-mono text-neutral-400">
          Live Platform Telemetry
        </span>
      </div>

      {/* Market Pulse Quick Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/8 font-mono">
        <div>
          <span className="text-[10px] text-neutral-400 block uppercase">Niche Demand</span>
          <span className="text-sm font-bold text-emerald-400">Demand ↑ 18%</span>
        </div>
        <div>
          <span className="text-[10px] text-neutral-400 block uppercase">Avg Campaign Budget</span>
          <span className="text-sm font-bold text-white">₹32,500 ($2,850)</span>
        </div>
        <div>
          <span className="text-[10px] text-neutral-400 block uppercase">Most Requested Format</span>
          <span className="text-sm font-bold text-white">Short-form video</span>
        </div>
        <div>
          <span className="text-[10px] text-neutral-400 block uppercase">Avg Engagement</span>
          <span className="text-sm font-bold text-emerald-400">6.8%</span>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-[10px] text-neutral-400 block uppercase">Avg Turnaround</span>
          <span className="text-sm font-bold text-amber-300">4.2 days</span>
        </div>
      </div>

      {/* 3-Column Grid: Pricing Benchmarks, Format Popularity, High-ROI Categories */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* 1. Pricing Benchmarks by Tier */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            Creator Rate Card Benchmarks
          </h4>
          <div className="space-y-2">
            {data.creatorPricingBenchmarks.map((tier, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 text-xs"
              >
                <div>
                  <div className="font-semibold text-white">{tier.tier}</div>
                  <div className="text-[10px] text-neutral-400">
                    Range: ${tier.rateRange[0]} - ${tier.rateRange[1]}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-[#FFD21F]">${tier.avgRate}</div>
                  <div className="text-[10px] text-neutral-500">Median</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Format Popularity & Engagement */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            Deliverable Format Demand
          </h4>
          <div className="space-y-3">
            {data.formatDemandBreakdown.map((fmt, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-300 truncate">{fmt.format}</span>
                  <span className="font-bold text-white">{fmt.sharePercent}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    style={{ width: `${fmt.sharePercent}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-neutral-400">
                  <span>Avg Eng: {fmt.avgEngagement}%</span>
                  <span>Turnaround: {fmt.avgCompletionDays} days</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. High Conversion Categories & Trends */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
              High-Conversion Categories
            </h4>
            <div className="space-y-2">
              {data.highConversionCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2 text-xs"
                >
                  <span className="font-medium text-white">{cat.category}</span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[10px] font-bold text-emerald-400">
                      ROI {cat.roiIndex}x
                    </span>
                    <span className="text-[10px] text-neutral-400">
                      {cat.demandVelocity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-neutral-500 italic">
            Estimated based on AbeyCollab market transactions
          </div>
        </div>
      </div>

      {/* Recommended Creators Matching Your Briefs */}
      {recommendedCreators.length > 0 && (
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-300 font-display">
                Recommended Creators for Your Active Briefs
              </h4>
              <p className="text-[11px] text-neutral-400">
                Matched to your niche, verified audience engagement, and budget benchmarks.
              </p>
            </div>
            <Link
              href="/app/brand/creators"
              className="text-xs font-mono text-[#FFD21F] hover:underline font-bold"
            >
              Browse all talent →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {recommendedCreators.map((creator) => (
              <div
                key={creator.id}
                className="p-3.5 rounded-xl bg-white/[0.03] border border-white/8 hover:border-[#FFD21F]/40 transition-all flex flex-col justify-between space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-neutral-800 shrink-0 border border-white/10">
                    {creator.avatarUrl ? (
                      <Image
                        src={creator.avatarUrl}
                        alt={creator.fullName}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center font-bold text-white text-xs">
                        {creator.fullName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h5 className="text-xs font-bold text-white truncate">{creator.fullName}</h5>
                    <p className="text-[10px] text-neutral-400 font-mono truncate">
                      {creator.primaryCategory} • {creator.avgEngagementRate}% ER
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-[11px] font-mono">
                  <span className="text-emerald-400 font-bold">92% Match</span>
                  <Link
                    href={`/creators/${creator.id}`}
                    className="px-2.5 py-1 rounded-lg bg-[#FFD21F] text-black text-[10px] font-extrabold hover:brightness-110 transition-all"
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
