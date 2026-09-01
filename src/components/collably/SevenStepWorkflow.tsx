"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Sparkles,
  FileCheck2,
  Video,
  CheckCircle2,
  Wallet,
  BarChart3,
  Layers,
  ArrowRight,
} from "lucide-react";

export function SevenStepWorkflow() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { step: "01", name: "Discover", tag: "Vetted Creator Talent", icon: Compass, summary: "Find creators by verified engagement, audience geography, and transparent rate cards." },
    { step: "02", name: "Match", tag: "AI Compatibility", icon: Sparkles, summary: "Match creators by audience demographics and niche relevance with AI match scores." },
    { step: "03", name: "Collaborate", tag: "Pre-Funded Milestones", icon: FileCheck2, summary: "Secure campaign budgets in milestone custody before filming starts." },
    { step: "04", name: "Create", tag: "4K Master Drafts", icon: Video, summary: "Creators film and upload high-res video drafts directly to the platform." },
    { step: "05", name: "Approve", tag: "Timecoded QA", icon: CheckCircle2, summary: "Drop frame-by-frame comments and 1-click approve version cuts." },
    { step: "06", name: "Pay", tag: "<24h Disbursement", icon: Wallet, summary: "Automated payouts directly to creator bank accounts via Stripe Connect." },
    { step: "07", name: "Measure", tag: "Audited ROI", icon: BarChart3, summary: "Track real-time impressions, link conversions, and return on ad spend." },
  ];

  return (
    <section id="workflow" className="py-24 sm:py-32 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>Canonical Workflow</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            The 7-step operating system.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans">
            From campaign brief to instant payout in one cohesive flow.
          </p>
        </div>

        {/* 7-Step Visual Pipeline Rail */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 max-w-6xl mx-auto">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                  isActive
                    ? "bg-gradient-to-b from-[#22132b] to-[#140b19] border-[hsl(327,100%,50%)] shadow-lg shadow-pink-500/20 scale-[1.02] text-white"
                    : "bg-[#120c16] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${isActive ? "text-[hsl(327,100%,55%)]" : "text-slate-400"}`}>
                    {s.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? "text-[hsl(327,100%,55%)]" : "text-slate-400"}`} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white font-display">{s.name}</h4>
                  <p className="text-[10px] text-slate-400 font-mono truncate">{s.tag}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Minimal High-Impact Step Focus Box */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#120c16] border border-white/10 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-white"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[hsl(327,100%,55%)] font-bold">STAGE {steps[activeStep].step}</span>
                  <span className="text-white/20">•</span>
                  <span className="text-slate-300 font-bold">{steps[activeStep].tag}</span>
                </div>
                <p className="text-sm text-slate-200 font-sans leading-relaxed">
                  {steps[activeStep].summary}
                </p>
              </div>

              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="px-5 py-2.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono font-bold text-white transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>Next ({steps[(activeStep + 1) % steps.length].name})</span>
                <ArrowRight className="w-3.5 h-3.5 text-pink-400" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
