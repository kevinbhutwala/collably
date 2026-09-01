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
  ArrowRight,
  Layers,
} from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function SevenStepWorkflow() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: "01",
      name: "Discover",
      tagline: "Explore vetted creator talent",
      icon: Compass,
      description: "Search verified creators across YouTube, Instagram, TikTok, and X filtered by authentic engagement, audience geography, and transparent rate cards.",
      deliverable: "Verified Media Kits & Public Rate Cards",
      forRole: "Brand & Creator",
    },
    {
      step: "02",
      name: "Match",
      tagline: "Precision AI brief matching",
      icon: Sparkles,
      description: "Describe your campaign requirements in natural language. Match algorithms calculate multi-factor compatibility scores across audience demographics, niche relevance, and budget.",
      deliverable: "Compatibility Breakdown & Pitch Invites",
      forRole: "AI Discovery Engine",
    },
    {
      step: "03",
      name: "Collaborate",
      tagline: "Pre-fund protected milestones",
      icon: FileCheck2,
      description: "Agree on deliverable scopes and timelines. Brands deposit campaign budgets into milestone holding before filming begins—giving creators 100% payment assurance.",
      deliverable: "Standardized Digital Contract & Protected Escrow",
      forRole: "Milestone Security",
    },
    {
      step: "04",
      name: "Create",
      tagline: "Produce authentic video content",
      icon: Video,
      description: "Creators film, edit, and upload 4K video drafts directly to the platform. Automated frame indexing prepares footage for collaborative review.",
      deliverable: "4K Master Drafts & B-Roll Assets",
      forRole: "Creator Studio",
    },
    {
      step: "05",
      name: "Approve",
      tagline: "Frame-accurate timecoded review",
      icon: CheckCircle2,
      description: "Brands scrub video drafts and drop frame-by-frame annotations. Creators see timestamped revision notes in one unified thread—eliminating lost emails and vague feedback.",
      deliverable: "Timecoded QA Annotations & Version Sign-Off",
      forRole: "Review Workspace",
    },
    {
      step: "06",
      name: "Pay",
      tagline: "Automated 24-hour disbursement",
      icon: Wallet,
      description: "Upon deliverable sign-off, milestone payouts disburse automatically to creator bank accounts via Stripe Connect. Creators keep 90% net earnings with zero invoice chasing.",
      deliverable: "Direct Bank Transfer & Tax Compliance Receipts",
      forRole: "Stripe Connect Rails",
    },
    {
      step: "07",
      name: "Measure",
      tagline: "Attribution & conversion analytics",
      icon: BarChart3,
      description: "Track live post metrics, UTM link clicks, coupon code redemption rates, and verified return on ad spend in one centralized telemetry dashboard.",
      deliverable: "Real-Time Conversion Telemetry & ROI Reports",
      forRole: "Attribution Dashboard",
    },
  ];

  return (
    <section id="workflow" className="py-24 sm:py-32 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>The Collably Seven-Stage Lifecycle</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["canonical", "workflow", "brief", "payout"]}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-tight"
          >
            From campaign brief to instant payout in 7 steps.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["unified", "operating", "system", "replaces", "chaos"]}
            className="text-sm sm:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            One unified collaboration operating system that standardizes how brands and creators work together.
          </ScrollRevealText>
        </div>

        {/* 7-Step Navigation Rail */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isActive = activeStep === idx;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStep(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between space-y-3 ${
                  isActive
                    ? "bg-gradient-to-b from-[#22132b] to-[#140b19] border-[hsl(327,100%,50%)]/70 shadow-lg shadow-pink-500/20 scale-[1.02] text-white"
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
                  <p className="text-[10px] text-slate-400 font-sans truncate">{s.tagline}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detailed Stage Showcase Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="p-6 sm:p-10 rounded-3xl bg-[#120c16] border border-white/10 shadow-elevated space-y-6 text-white relative overflow-hidden"
            >
              {/* Top Step Pill */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className="px-3 py-1 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] font-bold">
                    STAGE {steps[activeStep].step} OF 07
                  </span>
                  <span className="text-slate-400 hidden sm:inline">•</span>
                  <span className="text-slate-300 hidden sm:inline">{steps[activeStep].forRole}</span>
                </div>
                <span className="text-xs text-emerald-400 font-mono font-bold">Verified Workflow</span>
              </div>

              {/* Body */}
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
                  {steps[activeStep].name}: {steps[activeStep].tagline}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed">
                  {steps[activeStep].description}
                </p>
              </div>

              {/* Deliverable Box */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 font-bold uppercase">KEY OUTPUT:</span>
                  <span className="text-white font-bold">{steps[activeStep].deliverable}</span>
                </div>
                <button
                  onClick={() => setActiveStep((prev) => (prev + 1) % steps.length)}
                  className="inline-flex items-center gap-1 text-[hsl(327,100%,55%)] hover:text-pink-300 font-bold transition-colors"
                >
                  <span>Next Stage ({steps[(activeStep + 1) % steps.length].name})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
