"use client";

import React from "react";
import { motion } from "framer-motion";
import { XCircle, CheckCircle2, AlertTriangle, Sparkles, Layers } from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function ChaosToOrder() {
  const chaosItems = [
    "Scattered Google Sheets & WhatsApp DMs",
    "Net 60-90 day invoice waiting & delayed wire transfers",
    "Missing FTC disclosures & unverified follower fraud",
    "Vague revision requests over email threads",
    "Manual contract drafting and lost NDA files",
    "Zero post-campaign ROI or conversion tracking",
  ];

  const orderItems = [
    "One unified collaboration workspace for brands & creators",
    "100% Pre-funded milestone escrow with <24h payouts",
    "Verified engagement rates & authentic audience analytics",
    "4K frame-accurate video review with timecode annotations",
    "Automated standard digital contracts & commercial IP licensing",
    "Real-time campaign telemetry & verified 4.8× ROI reporting",
  ];

  return (
    <section className="py-24 sm:py-28 bg-slate-50/60 border-b border-slate-200 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/80 text-xs font-mono font-bold text-brand-accent shadow-xs">
            <Layers className="w-3.5 h-3.5 text-brand-accent" />
            <span>10 • Transformation</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["chaos", "order", "collably"]}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans leading-tight"
          >
            Turning creator marketing chaos into order.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["fragmented", "tools", "unified", "infrastructure"]}
            className="text-sm sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            See how Collably replaces broken legacy agency habits with intelligent product infrastructure.
          </ScrollRevealText>
        </div>

        {/* Side-by-Side Comparison Canvas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Left Card: WITHOUT COLLABLY */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-rose-200/80 shadow-card space-y-6 relative overflow-hidden group">
            <div className="flex items-center justify-between pb-4 border-b border-rose-100">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-500" />
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-rose-600">
                  WITHOUT COLLABLY
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-mono text-[10px] font-bold">
                Broken &amp; Chaotic
              </span>
            </div>

            <ul className="space-y-3.5">
              {chaosItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 font-sans">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Card: WITH COLLABLY */}
          <div className="p-8 sm:p-10 rounded-3xl bg-white border border-emerald-200/80 shadow-elevated space-y-6 relative overflow-hidden group">
            <div className="flex items-center justify-between pb-4 border-b border-emerald-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h3 className="font-mono font-bold text-xs uppercase tracking-wider text-emerald-700">
                  WITH COLLABLY
                </h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-mono text-[10px] font-bold">
                Automated &amp; Crystalline
              </span>
            </div>

            <ul className="space-y-3.5">
              {orderItems.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-900 font-sans font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
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
