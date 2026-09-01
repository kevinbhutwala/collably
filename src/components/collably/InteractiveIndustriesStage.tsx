"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { INDUSTRY_PRESETS, IndustryPreset } from "@/data/industries";
import { formatCurrency } from "@/core/utils/currency";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";
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
  Cpu: <Cpu className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Shirt: <Shirt className="w-4 h-4" />,
  Utensils: <Utensils className="w-4 h-4" />,
  Gamepad2: <Gamepad2 className="w-4 h-4" />,
};

export function InteractiveIndustriesStage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activePreset: IndustryPreset = INDUSTRY_PRESETS[activeIndex] || INDUSTRY_PRESETS[0];

  return (
    <section className="py-24 sm:py-32 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Category Benchmarks &amp; Briefs</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["tailored", "playbooks", "category"]}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-tight"
          >
            Tailored campaign briefs for your industry.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["industry", "budgets", "creator", "cohorts", "roi"]}
            className="text-sm sm:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Select your vertical to preview verified creator cohorts, recommended milestone budgets, and expected return on ad spend.
          </ScrollRevealText>
        </div>

        {/* Industry Pill Switchers */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start lg:justify-center">
          {INDUSTRY_PRESETS.map((preset, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={preset.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-4 py-2.5 rounded-full text-xs font-display font-bold transition-all duration-200 flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white shadow-lg shadow-pink-500/25 scale-[1.02]"
                    : "bg-[#120c16] text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/10"
                }`}
              >
                {iconMap[preset.iconName] || <Sparkles className="w-3.5 h-3.5" />}
                <span>{preset.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Industry Showcase Card */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePreset.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-10 rounded-3xl bg-[#120c16] border border-white/10 shadow-elevated space-y-8 text-white relative overflow-hidden"
            >
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[hsl(327,100%,55%)]">
                      {activePreset.tag}
                    </span>
                    <span className="text-white/20">•</span>
                    <span className="text-emerald-400 font-mono text-[10px] font-bold">Verified Category Playbook</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display">
                    {activePreset.briefTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed max-w-3xl">
                    {activePreset.briefDescription}
                  </p>
                </div>

                <div className="text-left sm:text-right shrink-0 font-mono">
                  <span className="text-[10px] text-slate-400 block font-bold">RECOMMENDED BUDGET</span>
                  <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                    {formatCurrency(activePreset.recommendedBudget)}
                  </span>
                </div>
              </div>

              {/* Benchmark Metrics Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                    <Users className="w-3.5 h-3.5 text-pink-400" />
                    <span>EST. REACH</span>
                  </div>
                  <span className="text-base font-bold text-white">{activePreset.expectedReach}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                    <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                    <span>AVG. ENGAGEMENT</span>
                  </div>
                  <span className="text-base font-bold text-emerald-400">{activePreset.expectedEngagement}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>TURNAROUND</span>
                  </div>
                  <span className="text-base font-bold text-white">{activePreset.targetTimelineDays} Days</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-400 text-[10px]">
                    <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                    <span>EXPECTED ROI</span>
                  </div>
                  <span className="text-base font-bold text-white">{activePreset.expectedROIRange}</span>
                </div>
              </div>

              {/* Creator Cohort Showcase */}
              <div className="space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Matched Creator Cohort Examples:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {activePreset.creators.map((c) => (
                    <div
                      key={c.handle}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-xl object-cover border border-white/10 shrink-0" />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-white font-display truncate">{c.name}</h4>
                          <span className="text-[10px] text-slate-400 font-mono block truncate">{c.handle}</span>
                        </div>
                      </div>
                      <div className="text-right font-mono text-xs shrink-0">
                        <span className="text-emerald-400 font-bold block">{c.rate}</span>
                        <span className="text-[9px] text-slate-400">{c.followers}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 text-xs font-mono">
                <span className="text-slate-400">
                  Target Format: <strong className="text-white font-sans">{activePreset.targetDeliverable}</strong>
                </span>
                <Link
                  href="/app/brand/campaigns/create"
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold font-display shadow-md shadow-pink-500/25 hover:brightness-110 transition-all"
                >
                  <span>Launch {activePreset.name} Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
