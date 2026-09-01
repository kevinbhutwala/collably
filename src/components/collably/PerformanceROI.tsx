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
    <section className="py-24 sm:py-32 bg-[#FAFAF8] border-b border-[#E7E7E4] relative overflow-hidden select-none text-[#101010]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-xs font-mono font-bold text-[#101010] shadow-xs uppercase tracking-wider">
            <BarChart3 className="w-3.5 h-3.5 text-[#101010]" />
            <span>07 • Measure &amp; Attributions</span>
          </div>

          <h2 className="section-headline text-center">
            Real performance, <span className="font-serif italic font-normal text-[#626262]">audited telemetry.</span>
          </h2>

          <p className="editorial-body mx-auto text-center">
            Track direct clickthrough conversions, authentic engagement multipliers, and ROI attribution across every partnered channel.
          </p>
        </div>

        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {sampleMetrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-editorial hover:border-[#101010] transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-[#626262] uppercase tracking-wider">{m.label}</span>
                  <div className="w-8 h-8 rounded-lg bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-center text-[#101010] group-hover:scale-105 transition-transform">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-extrabold text-[#101010] font-display numeric-tabular tracking-tight">
                    {m.value}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mono pt-1">
                    <span className="text-[#626262]">{m.subtext}</span>
                    <span className="text-[#101010] font-bold bg-[#B7FF3C] px-1.5 py-0.5 rounded text-[10px]">
                      {m.trend}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Channel Breakdown Table */}
        <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-editorial overflow-hidden">
          <div className="p-6 border-b border-[#E7E7E4] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-[#101010] font-display">Attributed Deliverable Performance</h3>
              <p className="text-xs text-[#626262] font-sans">Live telemetry for Vertex Pro AI campaign (Last 30 Days)</p>
            </div>
            <span className="text-xs font-mono font-bold text-[#101010] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C] animate-pulse" />
              Real-Time Tracking Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#FAFAF8] border-b border-[#E7E7E4] text-[#626262] font-mono uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-6 font-semibold">Format &amp; Channel</th>
                  <th className="py-3.5 px-6 font-semibold">Creator Partner</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Views</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Clicks</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Conversions</th>
                  <th className="py-3.5 px-6 font-semibold text-right">Attributed ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E7E4] text-[#101010]">
                {channelPerformance.map((row, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAF8] transition-colors">
                    <td className="py-4 px-6 font-semibold">{row.platform}</td>
                    <td className="py-4 px-6 text-[#626262] font-mono">{row.creator}</td>
                    <td className="py-4 px-6 text-right font-mono font-bold numeric-tabular">{row.views}</td>
                    <td className="py-4 px-6 text-right font-mono font-bold numeric-tabular">{row.clicks}</td>
                    <td className="py-4 px-6 text-right font-mono font-bold numeric-tabular">{row.conversions}</td>
                    <td className="py-4 px-6 text-right font-mono font-extrabold text-[#101010] numeric-tabular">
                      <span className="bg-[#B7FF3C] px-2 py-0.5 rounded text-[#101010]">{row.roas}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
