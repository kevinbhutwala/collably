"use client";

import React from "react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";
import { BarChart3, TrendingUp, Users, Target, ArrowUpRight, Sparkles } from "lucide-react";
import { formatCurrency } from "@/core/utils/currency";

export function PerformanceROI() {
  const sampleMetrics = [
    {
      label: "Campaign Video Impressions",
      value: "1.42M",
      subtext: "Across 3 creator deliverables",
      trend: "+28% vs benchmark",
      icon: Users,
    },
    {
      label: "Average Engagement Rate",
      value: "6.8%",
      subtext: "Audited organically",
      trend: "2.1× industry median",
      icon: TrendingUp,
    },
    {
      label: "Tracked Conversions / Signups",
      value: "3,840",
      subtext: "Via dedicated UTM & coupons",
      trend: "$0.91 CAC",
      icon: Target,
    },
    {
      label: "Measured Campaign ROAS",
      value: "4.8×",
      subtext: "Attributed 30-day revenue",
      trend: "Direct revenue ROI",
      icon: BarChart3,
    },
  ];

  const channelPerformance = [
    { platform: "YouTube 60s Integration", creator: "Devon Thorne (@devoncodes)", views: "72,000", clicks: "4,120", conversions: "1,840", roas: "5.2×" },
    { platform: "X Technical Thread", creator: "Elena Rostova (@elenatech)", views: "125,000", clicks: "2,890", conversions: "1,120", roas: "4.6×" },
    { platform: "Instagram 4K Reel", creator: "Marcus Vance (@marcusvance)", views: "95,000", clicks: "1,650", conversions: "880", roas: "4.1×" },
  ];

  return (
    <section className="py-24 sm:py-32 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>07 • Measure &amp; Attributions</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["audited", "attribution", "telemetry", "conversion"]}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-tight"
          >
            Real-time attribution &amp; conversion telemetry.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["granularity", "tracking", "utm", "conversion", "roi"]}
            className="text-sm sm:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Measure audience reach, link click-throughs, and customer acquisition costs with audited post-campaign performance data.
          </ScrollRevealText>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
          {sampleMetrics.map((m, idx) => {
            const Icon = m.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#120c16] border border-white/10 shadow-card space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">{m.label}</span>
                  <div className="p-2 rounded-xl bg-white/[0.05] border border-white/10 text-pink-400">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-3xl font-black text-white font-mono">{m.value}</div>
                <div className="flex items-center justify-between text-[11px] pt-2 border-t border-white/10">
                  <span className="text-slate-400 font-sans">{m.subtext}</span>
                  <span className="text-emerald-400 font-bold">{m.trend}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Channel Breakdown Table */}
        <div className="max-w-5xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#120c16] border border-white/10 shadow-elevated space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white font-display">Campaign Attribution Breakdown</h4>
              <p className="text-xs text-slate-400 font-mono">Sample Campaign: Q3 AI Developer SDK ($3,500 Total Spend)</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-white/[0.05] border border-white/10 text-[10px] font-mono text-slate-300">
              Sample Data
            </span>
          </div>

          <div className="divide-y divide-white/10 font-mono text-xs">
            {channelPerformance.map((c, idx) => (
              <div key={idx} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-bold text-white block">{c.platform}</span>
                  <span className="text-[11px] text-slate-400 font-sans">{c.creator}</span>
                </div>

                <div className="grid grid-cols-4 gap-4 text-left sm:text-right shrink-0">
                  <div>
                    <span className="text-[9px] text-slate-400 block">VIEWS</span>
                    <span className="text-white font-bold">{c.views}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">CLICKS</span>
                    <span className="text-white font-bold">{c.clicks}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">CONVERSIONS</span>
                    <span className="text-emerald-400 font-bold">{c.conversions}</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 block">ROAS</span>
                    <span className="text-pink-300 font-bold">{c.roas}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
