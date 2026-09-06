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
    <div className="relative overflow-hidden rounded-3xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#12121A] p-6 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-2xl text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
      {/* Top Banner */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-5 border-b border-black/8 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FFD21F]/40 bg-[#FFD21F]/15 px-3 py-1 text-xs font-semibold text-[#0A0A0E] dark:text-[#FFD21F]">
            <span>⚡</span> Personalized Market Pulse
          </div>
          <h3 className="mt-2 text-xl font-bold text-[#0A0A0E] dark:text-white font-display">
            Where are my opportunities?
          </h3>
          <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4]">
            Real-time demand signals and actionable career recommendations for {pulse.category}.
          </p>
        </div>

        {/* Opportunity Score Gauge */}
        <div className="flex items-center gap-3 self-start sm:self-auto rounded-2xl border border-black/8 dark:border-white/10 bg-[#F8F8FC] dark:bg-white/5 px-4 py-2.5 shadow-2xs">
          <div className="flex flex-col items-end">
            <span className="text-[11px] font-bold text-[#0A0A0E] dark:text-white">
              Your Opportunity Score
            </span>
            <span className="text-xs font-semibold text-[#8A6500] dark:text-[#FFD21F]">
              {pulse.opportunityTier}
            </span>
          </div>
          <div className="relative flex h-14 px-3.5 items-center justify-center rounded-2xl border-2 border-[#FFD21F] bg-[#FFD21F]/15 font-black text-[#0A0A0E] dark:text-white text-lg font-mono shadow-2xs">
            {pulse.opportunityScore}<span className="text-xs text-[#7A7A8A] dark:text-neutral-400">/100</span>
          </div>
        </div>
      </div>

      {/* Rationale Notice */}
      <div className="mt-4 rounded-2xl border border-black/6 dark:border-white/5 bg-[#FAF9F5] dark:bg-white/[0.02] p-3.5 text-xs text-[#4A4A58] dark:text-neutral-300 leading-relaxed font-sans">
        <span className="font-bold text-[#0A0A0E] dark:text-white">Market Assessment:</span> {pulse.opportunityRationale}
      </div>

      {/* 2-Column Grid: Category Benchmark & Format Demand */}
      <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* Left: Category Financial Benchmark */}
        <div className="rounded-2xl border border-black/6 dark:border-white/8 bg-[#FAFAFC] dark:bg-[#161622] p-5">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6A6A78] dark:text-[#8E8EA4]">
            Category Pricing Benchmark
          </h4>
          <div className="mt-3.5 grid grid-cols-3 gap-2.5 text-center font-mono">
            <div className="rounded-xl bg-white dark:bg-[#1C1C2A] border border-black/4 dark:border-white/5 p-3 shadow-2xs">
              <div className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold">Avg Deal Size</div>
              <div className="mt-0.5 text-sm font-extrabold text-[#0A0A0E] dark:text-white">
                ${pulse.categoryTrends.avgBudget.toLocaleString()}
              </div>
            </div>
            <div className="rounded-xl bg-white dark:bg-[#1C1C2A] border border-black/4 dark:border-white/5 p-3 shadow-2xs">
              <div className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold">Growth (MoM)</div>
              <div className="mt-0.5 text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                +{pulse.categoryTrends.growthMoM}%
              </div>
            </div>
            <div className="rounded-xl bg-white dark:bg-[#1C1C2A] border border-black/4 dark:border-white/5 p-3 shadow-2xs">
              <div className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold">Competition</div>
              <div className="mt-0.5 text-sm font-extrabold text-amber-600 dark:text-amber-300">
                {pulse.categoryTrends.competitionLevel}
              </div>
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            <div className="text-[11px] font-bold text-[#6A6A78] dark:text-[#8E8EA4]">
              Format Demand Share in {pulse.category}:
            </div>
            {pulse.deliverableDemand.map((d, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#4A4A58] dark:text-neutral-300 font-medium">{d.deliverableType}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="font-bold text-[#0A0A0E] dark:text-white">${d.suggestedRate}</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">({d.momentum})</span>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] rounded-full"
                    style={{ width: `${d.demandPercent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Actionable Insights */}
        <div className="rounded-2xl border border-black/6 dark:border-white/8 bg-[#FAFAFC] dark:bg-[#161622] p-5 flex flex-col justify-between">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#6A6A78] dark:text-[#8E8EA4]">
              Recommended Deal Growth Actions
            </h4>
            <div className="mt-3.5 space-y-2.5">
              {pulse.actionableInsights.map((ins, idx) => (
                <div
                  key={idx}
                  className="flex items-start justify-between gap-3 rounded-xl border border-black/6 dark:border-white/5 bg-white dark:bg-[#1C1C2A] p-3 shadow-2xs transition-colors hover:border-[#FFD21F]/40"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="text-emerald-600 dark:text-emerald-400 text-sm font-bold">✓</span>
                    <span className="text-xs text-[#3A3A48] dark:text-neutral-300 leading-snug font-medium">
                      {ins.action}
                    </span>
                  </div>
                  <span className="shrink-0 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 px-2.5 py-0.5 text-[10px] font-mono font-bold text-[#0A0A0E] dark:text-[#FFD21F]">
                    {ins.estimatedEarningBoost}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-black/6 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">
            <span>Deterministic platform calculation</span>
            <span className="text-[#8A6500] dark:text-[#FFD21F] font-bold">Potential opportunity • Estimated • Based on platform data</span>
          </div>
        </div>
      </div>
    </div>
  );
}
