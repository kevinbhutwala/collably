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
    { step: "01", name: "Brief", tag: "Vetted Creator Talent", icon: Compass, summary: "Find creators by verified engagement, audience geography, and transparent rate cards." },
    { step: "02", name: "Match", tag: "AI Compatibility", icon: Sparkles, summary: "Match creators by audience demographics and niche relevance with AI match scores." },
    { step: "03", name: "Collaborate", tag: "Pre-Funded Milestones", icon: FileCheck2, summary: "Secure campaign budgets in milestone custody before filming starts." },
    { step: "04", name: "Create", tag: "4K Master Drafts", icon: Video, summary: "Creators film and upload high-res video drafts directly to the platform." },
    { step: "05", name: "Approve", tag: "Timecoded QA", icon: CheckCircle2, summary: "Drop frame-by-frame comments and 1-click approve version cuts." },
    { step: "06", name: "Pay", tag: "<24h Disbursement", icon: Wallet, summary: "Automated payouts directly to creator bank accounts via Stripe Connect." },
    { step: "07", name: "Measure", tag: "Audited ROI", icon: BarChart3, summary: "Track real-time impressions, link conversions, and return on ad spend." },
  ];

  return (
    <section id="workflow" className="py-20 sm:py-28 bg-[#FCFCFA] border-b border-[#E2E6E1] relative overflow-hidden select-none text-[#101310]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF8F2] border border-[#C3EBDA] text-xs font-mono font-semibold text-[#087F5B]">
            <Layers className="w-3.5 h-3.5" />
            <span>Workflow Timeline</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#101310] tracking-tight font-display">
            The 7-step operating system.
          </h2>
          <p className="text-sm sm:text-base text-[#626862] font-sans">
            From brief deposit to creator disbursement in one seamless flow.
          </p>
        </div>

        {/* 7-Step Visual Pipeline Rail (Section 15) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 max-w-5xl mx-auto">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === idx;
            const isCompleted = idx < activeStep;

            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between space-y-3 ${
                  isActive
                    ? "bg-[#EAF8F2] border-[#087F5B] shadow-xs text-[#087F5B] scale-[1.01]"
                    : isCompleted
                    ? "bg-[#FCFCFA] border-[#C3EBDA] text-[#087F5B]"
                    : "bg-[#FFFFFF] border-[#E2E6E1] text-[#626862] hover:bg-[#F6F7F3]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-mono font-bold ${isActive || isCompleted ? "text-[#087F5B]" : "text-[#8A908B]"}`}>
                    {s.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive || isCompleted ? "text-[#087F5B]" : "text-[#8A908B]"}`} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#101310] font-sans">{s.name}</h4>
                  <p className="text-[10px] text-[#626862] font-mono truncate">{s.tag}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* High-Impact Step Focus Box */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
              className="p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border border-[#E2E6E1] shadow-fintech flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-[#101310]"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#087F5B] font-bold">STAGE {steps[activeStep].step}</span>
                  <span className="text-[#8A908B]">•</span>
                  <span className="text-[#101310] font-semibold">{steps[activeStep].tag}</span>
                </div>
                <p className="text-sm text-[#626862] font-sans leading-relaxed">
                  {steps[activeStep].summary}
                </p>
              </div>

              <button
                onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                className="px-4 py-2 rounded-[9px] bg-[#F6F7F3] hover:bg-[#E2E6E1] border border-[#E2E6E1] text-xs font-semibold text-[#101310] transition-colors flex items-center gap-1.5 shrink-0 font-sans"
              >
                <span>Next ({steps[(activeStep + 1) % steps.length].name})</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#087F5B]" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
