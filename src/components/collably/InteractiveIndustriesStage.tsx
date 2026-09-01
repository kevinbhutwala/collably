"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INDUSTRY_PRESETS, IndustryPreset } from "@/data/industries";
import { formatCurrency } from "@/core/utils/currency";
import {
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  Users,
  ShieldCheck,
  Cpu,
  Activity,
  Sparkles,
  Shirt,
  Utensils,
  Gamepad2,
} from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, React.ReactNode> = {
  Cpu: <Cpu className="w-3.5 h-3.5" />,
  Activity: <Activity className="w-3.5 h-3.5" />,
  Sparkles: <Sparkles className="w-3.5 h-3.5" />,
  Shirt: <Shirt className="w-3.5 h-3.5" />,
  Utensils: <Utensils className="w-3.5 h-3.5" />,
  Gamepad2: <Gamepad2 className="w-3.5 h-3.5" />,
};

export function InteractiveIndustriesStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePreset: IndustryPreset = INDUSTRY_PRESETS[activeIndex] || INDUSTRY_PRESETS[0];

  return (
    <section className="py-24 sm:py-32 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Category Playbooks</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Built for your industry.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans">
            Select your vertical to preview verified creator cohorts and recommended budgets.
          </p>
        </div>

        {/* Industry Pill Switchers */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
          {INDUSTRY_PRESETS.map((preset, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={preset.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-2 rounded-full text-xs font-display font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white shadow-md shadow-pink-500/25 scale-102"
                    : "bg-[#120c16] text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/10"
                }`}
              >
                {iconMap[preset.iconName] || <Sparkles className="w-3.5 h-3.5" />}
                <span>{preset.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Visual Showcase */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePreset.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#120c16] border border-white/10 shadow-2xl space-y-6 text-white"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-[hsl(327,100%,55%)]">
                    {activePreset.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-display">
                    {activePreset.briefTitle}
                  </h3>
                </div>

                <div className="font-mono text-left sm:text-right shrink-0">
                  <span className="text-[10px] text-slate-400 block font-semibold">BUDGET</span>
                  <span className="text-xl sm:text-2xl font-black text-white">
                    {formatCurrency(activePreset.recommendedBudget)}
                  </span>
                </div>
              </div>

              {/* 4 Metric Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs text-center">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] text-slate-400 block">EST. REACH</span>
                  <span className="font-bold text-white text-sm">{activePreset.expectedReach}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] text-slate-400 block">ENGAGEMENT</span>
                  <span className="font-bold text-emerald-400 text-sm">{activePreset.expectedEngagement}</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] text-slate-400 block">TURNAROUND</span>
                  <span className="font-bold text-white text-sm">{activePreset.targetTimelineDays} Days</span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <span className="text-[10px] text-slate-400 block">EXP. ROAS</span>
                  <span className="font-bold text-pink-300 text-sm">{activePreset.expectedROIRange}</span>
                </div>
              </div>

              {/* Creator Avatars */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">Example Matched Talent:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activePreset.creators.map((c) => (
                    <div
                      key={c.handle}
                      className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-lg object-cover border border-white/10 shrink-0" />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-white font-display truncate">{c.name}</h4>
                          <span className="text-[10px] text-slate-400 font-mono block truncate">{c.handle}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 font-mono shrink-0">{c.rate}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs font-mono">
                <span className="text-slate-400">Format: <strong className="text-white">{activePreset.targetDeliverable}</strong></span>
                <Link
                  href="/app/brand/campaigns/create"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold font-display shadow-md shadow-pink-500/20 hover:brightness-110 transition-all"
                >
                  <span>Launch Brief</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
