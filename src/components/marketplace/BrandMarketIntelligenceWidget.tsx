"use client";

import React, { useState, useEffect } from "react";
import { BrandMarketIntelligenceData } from "@/core/types";

export function BrandMarketIntelligenceWidget({ initialCategory }: { initialCategory?: string }) {
  const [data, setData] = useState<BrandMarketIntelligenceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const url = initialCategory
      ? `/api/marketplace/intelligence?category=${encodeURIComponent(initialCategory)}`
      : "/api/marketplace/intelligence";

    fetch(url)
      .then((res) => res.json())
      .then((resData) => {
        if (!isMounted) return;
        if (resData.intelligence) setData(resData.intelligence);
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
    <div className="rounded-2xl border border-white/10 bg-[#12121A] p-6 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-xs font-semibold text-blue-400">
            <span>📊</span> Market Intelligence & Pricing Index
          </div>
          <h3 className="mt-1.5 text-lg font-bold text-white">
            Creator Rate Benchmarks & ROI Intelligence
          </h3>
          <p className="text-xs text-neutral-400">
            Data-backed baseline pricing across tier categories to guide your campaign budget allocation.
          </p>
        </div>
        <span className="self-start sm:self-auto rounded-lg bg-white/5 px-2.5 py-1 text-[11px] font-mono text-neutral-400">
          Industry Medians
        </span>
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
    </div>
  );
}
