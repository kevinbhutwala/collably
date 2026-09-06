"use client";

import React, { useState, useEffect } from "react";
import { CreatorMarketPulseData } from "@/core/types";

export function CreatorMarketPulseWidget({ creatorId }: { creatorId?: string }) {
  const [pulse, setPulse] = useState<CreatorMarketPulseData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const url = creatorId ? `/api/marketplace/pulse?creatorId=${creatorId}` : "/api/marketplace/pulse";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.pulse) setPulse(data.pulse);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load pulse:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [creatorId]);

  if (loading) {
    return (
      <div className="h-64 w-full animate-pulse rounded-2xl border border-white/5 bg-white/[0.02] p-6" />
    );
  }

  if (!pulse) return null;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#12121A] p-6 shadow-2xl backdrop-blur-xl">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-400">
            <span>⚡</span> Personalized Market Pulse
          </div>
          <h3 className="mt-1.5 text-lg font-bold text-white">
            {pulse.category} Opportunity & Market Demand
          </h3>
          <p className="text-xs text-neutral-400">
            Real-time industry pricing benchmarks and growth recommendations.
          </p>
        </div>

        {/* Opportunity Score Gauge */}
        <div className="flex items-center gap-3 self-start sm:self-auto rounded-xl border border-white/10 bg-white/5 px-4 py-2.5">
          <div className="flex flex-col items-end">
            <span className="text-[10px] uppercase tracking-wider text-neutral-400">
              Opportunity Score
            </span>
            <span className="text-xs font-semibold text-[#FFD21F]">
              {pulse.opportunityTier}
            </span>
          </div>
          <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#FFD21F] bg-[#FFD21F]/10 font-black text-white text-base">
            {pulse.opportunityScore}
          </div>
        </div>
      </div>

      {/* Rationale Notice */}
      <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.02] p-3 text-xs text-neutral-300 leading-relaxed">
        <span className="font-semibold text-white">Market Assessment:</span> {pulse.opportunityRationale}
      </div>

      {/* 2-Column Grid: Category Benchmark & Format Demand */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Left: Category Financial Benchmark */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            Category Pricing Benchmark
          </h4>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-lg bg-white/5 p-2.5">
              <div className="text-[10px] text-neutral-400">Avg Deal Size</div>
              <div className="mt-0.5 text-sm font-bold text-white">
                ${pulse.categoryTrends.avgBudget.toLocaleString()}
              </div>
            </div>
            <div className="rounded-lg bg-white/5 p-2.5">
              <div className="text-[10px] text-neutral-400">Growth (MoM)</div>
              <div className="mt-0.5 text-sm font-bold text-emerald-400">
                +{pulse.categoryTrends.growthMoM}%
              </div>
            </div>
            <div className="rounded-lg bg-white/5 p-2.5">
              <div className="text-[10px] text-neutral-400">Competition</div>
              <div className="mt-0.5 text-sm font-bold text-amber-300">
                {pulse.categoryTrends.competitionLevel}
              </div>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="text-[11px] font-medium text-neutral-400">
              Format Demand Share in {pulse.category}:
            </div>
            {pulse.deliverableDemand.map((d, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-300">{d.deliverableType}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">${d.suggestedRate}</span>
                    <span className="text-[10px] text-emerald-400">({d.momentum})</span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yellow-500 to-[#FFD21F] rounded-full"
                    style={{ width: `${d.demandPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actionable Insights */}
        <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Recommended Deal Growth Actions
            </h4>
            <div className="mt-3 space-y-2.5">
              {pulse.actionableInsights.map((ins, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 rounded-lg border border-white/5 bg-white/[0.03] p-2.5 transition-colors hover:border-[#FFD21F]/30"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-emerald-400 text-sm">✓</span>
                    <span className="text-xs text-neutral-300 leading-snug">
                      {ins.action}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-md bg-[#FFD21F]/10 border border-[#FFD21F]/20 px-2 py-0.5 text-[10px] font-bold text-[#FFD21F]">
                    {ins.estimatedEarningBoost}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-500">
            <span>Deterministic marketplace calculations</span>
            <span className="italic">Estimated based on AbeyCollab data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
