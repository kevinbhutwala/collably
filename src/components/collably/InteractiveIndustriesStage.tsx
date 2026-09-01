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
    <section className="py-20 sm:py-28 bg-[#FCFCFA] border-b border-[#E2E6E1] relative overflow-hidden select-none text-[#101310]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF8F2] border border-[#C3EBDA] text-xs font-mono font-semibold text-[#087F5B]">
            <Layers className="w-3.5 h-3.5" />
            <span>Category Playbooks</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#101310] tracking-tight font-display">
            Built for your industry.
          </h2>
          <p className="text-sm sm:text-base text-[#626862] font-sans">
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
                className={`px-3.5 py-1.5 rounded-[9px] text-xs font-semibold transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? "bg-[#087F5B] text-white shadow-xs"
                    : "bg-[#F6F7F3] text-[#626862] hover:text-[#101310] hover:bg-[#E2E6E1] border border-[#E2E6E1]"
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
              className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E2E6E1] shadow-fintech space-y-6 text-[#101310]"
            >
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E6E1]">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase text-[#087F5B]">
                    {activePreset.tag}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-[#101310] font-sans">
                    {activePreset.briefTitle}
                  </h3>
                </div>

                <div className="font-mono text-left sm:text-right shrink-0">
                  <span className="text-[10px] text-[#8A908B] block font-semibold">BUDGET</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#101310]">
                    {formatCurrency(activePreset.recommendedBudget)}
                  </span>
                </div>
              </div>

              {/* 4 Metric Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs text-center">
                <div className="p-3 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1]">
                  <span className="text-[10px] text-[#626862] block">EST. REACH</span>
                  <span className="font-bold text-[#101310] text-sm">{activePreset.expectedReach}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1]">
                  <span className="text-[10px] text-[#626862] block">ENGAGEMENT</span>
                  <span className="font-bold text-[#087F5B] text-sm">{activePreset.expectedEngagement}</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1]">
                  <span className="text-[10px] text-[#626862] block">TURNAROUND</span>
                  <span className="font-bold text-[#101310] text-sm">{activePreset.targetTimelineDays} Days</span>
                </div>
                <div className="p-3 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1]">
                  <span className="text-[10px] text-[#626862] block">EXP. ROAS</span>
                  <span className="font-bold text-[#087F5B] text-sm">{activePreset.expectedROIRange}</span>
                </div>
              </div>

              {/* Creator Avatars */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-[#626862] font-semibold uppercase">Example Matched Talent:</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {activePreset.creators.map((c) => (
                    <div
                      key={c.handle}
                      className="p-3 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] flex items-center justify-between gap-2"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <img src={c.avatar} alt={c.name} className="w-8 h-8 rounded-lg object-cover border border-[#E2E6E1] shrink-0" />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-[#101310] font-sans truncate">{c.name}</h4>
                          <span className="text-[10px] text-[#626862] font-mono block truncate">{c.handle}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#087F5B] font-mono shrink-0">{c.rate}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 flex items-center justify-between border-t border-[#E2E6E1] text-xs font-mono">
                <span className="text-[#626862]">Format: <strong className="text-[#101310]">{activePreset.targetDeliverable}</strong></span>
                <Link
                  href="/app/brand/campaigns/create"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[9px] bg-[#087F5B] hover:bg-[#075E45] text-white font-semibold font-sans shadow-xs transition-all"
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
