"use client";

import React from "react";
import { XCircle, CheckCircle2, AlertTriangle, Layers } from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function ChaosToOrder() {
  const chaosItems = [
    "Scattered Google Sheets, DMs & lost email threads",
    "Net 60-90 day invoice waiting & delayed wire transfers",
    "Missing FTC disclosures & unverified follower metrics",
    "Vague, timestamp-less revision requests",
    "Manual PDF contracts and unmanaged usage licenses",
    "Zero post-campaign ROI or conversion tracking",
  ];

  const orderItems = [
    "One unified collaboration workspace for brands & creators",
    "100% Pre-funded milestone escrow with <24h payouts",
    "Verified engagement rates & authentic audience analytics",
    "4K frame-accurate video review with timecode annotations",
    "Automated standard digital contracts & commercial IP licensing",
    "Real-time campaign telemetry & link conversion tracking",
  ];

  return (
    <section className="py-24 sm:py-28 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>07 • Comparison</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["chaos", "order", "collably"]}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-tight"
          >
            Turning creator marketing chaos into order.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["fragmented", "tools", "unified", "infrastructure"]}
            className="text-sm sm:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            See how Collably replaces broken legacy habits with intelligent, milestone-protected infrastructure.
          </ScrollRevealText>
        </div>

        {/* Side-by-Side Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Card: WITHOUT COLLABLY */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#120c16] border border-rose-500/30 shadow-card space-y-6 relative overflow-hidden group text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-rose-400 font-display">
                  WITHOUT COLLABLY
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 font-mono text-[10px] font-bold">
                Broken &amp; Risky
              </span>
            </div>

            <ul className="space-y-3.5">
              {chaosItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-400 font-sans">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Card: WITH COLLABLY */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#120c16] border border-pink-500/40 shadow-elevated space-y-6 relative overflow-hidden group text-white">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-400 font-display">
                  WITH COLLABLY
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono text-[10px] font-bold">
                Automated &amp; Secure
              </span>
            </div>

            <ul className="space-y-3.5">
              {orderItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-white font-sans font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
