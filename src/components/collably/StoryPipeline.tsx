"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FileCheck,
  PlayCircle,
  Lock,
  Zap,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function StoryPipeline() {
  const [activePanel, setActivePanel] = useState(0);

  const panels = [
    {
      num: "01",
      title: "Vetted Creator Discovery",
      tagline: "Direct API audience telemetry across YouTube, Instagram, and TikTok.",
      description:
        "Filter by verified engagement rates, past brand performance scores, niche authority, and starting rate cards. Zero fake follower inflation.",
      metrics: "YouTube Data API • Instagram Graph API • TikTok Devs",
      icon: Search,
      gradient: "from-orange-50 to-amber-50",
      accent: "text-brand-accent border-orange-200 bg-orange-50",
      uiPreview: (
        <div className="space-y-3 p-5 rounded-2xl bg-white border border-slate-200 text-xs font-mono text-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-900">Elena Rostova (@elenatech)</span>
            <span className="text-emerald-600 font-bold">485k Followers</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-500 block font-semibold">Avg Reel Views</span>
              <span className="text-slate-900 font-extrabold">142k / post</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] text-slate-500 block font-semibold">Engagement</span>
              <span className="text-emerald-600 font-extrabold">6.4%</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: "02",
      title: "Structured Briefs & Contracts",
      tagline: "Crystal clear deliverables, commercial licensing, and deadlines.",
      description:
        "Generate bulletproof campaign agreements in 60 seconds with our AI Brief Builder. Lock in deliverable formats, revisions included, and ad usage rights.",
      metrics: "Standardized IP Terms • Auto-Generated Contracts",
      icon: FileCheck,
      gradient: "from-rose-50 to-pink-50",
      accent: "text-rose-600 border-rose-200 bg-rose-50",
      uiPreview: (
        <div className="space-y-3 p-5 rounded-2xl bg-white border border-slate-200 text-xs font-mono text-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-900">Deliverables: 1x YouTube 60s + 1x Reel</span>
            <span className="text-rose-600 font-bold">$3,200</span>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-800 text-[11px] font-medium">
            ✓ 6-Month Paid Digital Ad Usage Rights Included
          </div>
        </div>
      ),
    },
    {
      num: "03",
      title: "4K Frame-Accurate Video Review",
      tagline: "Timecoded feedback directly on the video player without messy email threads.",
      description:
        "Leave comments at exact seconds (e.g. 00:42:15). Creators view annotations directly over the timeline and upload revisions with full version history.",
      metrics: "4K Direct Streaming • Frame Scrubber • Version Control",
      icon: PlayCircle,
      gradient: "from-amber-50 to-orange-50",
      accent: "text-amber-700 border-amber-200 bg-amber-50",
      uiPreview: (
        <div className="space-y-3 p-5 rounded-2xl bg-white border border-slate-200 text-xs font-mono text-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-900">Video Review • Cut v2.mp4 (4K)</span>
            <span className="text-amber-600 font-bold">00:42:15</span>
          </div>
          <p className="text-slate-700 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100 font-sans">
            &quot;Brand logo at 00:42 looks great! Cut approved for final publishing.&quot;
          </p>
        </div>
      ),
    },
    {
      num: "04",
      title: "Milestone-Locked Funds",
      tagline: "Zero release risk for brands. Zero non-payment risk for creators.",
      description:
        "Funds are securely held in Stripe Connect milestone custody before filming starts. Brands maintain 100% control until content meets all guidelines.",
      metrics: "Stripe Connect Custody • 7-Day Review SLA",
      icon: Lock,
      gradient: "from-orange-50 to-rose-50",
      accent: "text-brand-accent border-orange-200 bg-orange-50",
      uiPreview: (
        <div className="space-y-3 p-5 rounded-2xl bg-white border border-slate-200 text-xs font-mono text-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-900">Milestone Vault #M-9021</span>
            <span className="text-emerald-600 font-bold">$3,200 HELD</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-800 text-[11px] font-medium">
            🔒 Funds guaranteed for creator upon deliverable approval
          </div>
        </div>
      ),
    },
    {
      num: "05",
      title: "Instant Creator Payouts",
      tagline: "Automated direct bank deposit within 24 hours. Zero invoice waiting.",
      description:
        "When the brand clicks Approve, funds are instantly disbursed to the creator’s bank account. Automatic 1099-K, W-9, and TDS 194R tax tracking included.",
      metrics: "0-Day Payout SLA • W-9 & 1099-K Automated",
      icon: Zap,
      gradient: "from-emerald-50 to-teal-50",
      accent: "text-emerald-700 border-emerald-200 bg-emerald-50",
      uiPreview: (
        <div className="space-y-3 p-5 rounded-2xl bg-white border border-slate-200 text-xs font-mono text-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-[11px] text-slate-500 pb-2 border-b border-slate-100">
            <span className="font-bold text-slate-900">Payout Disbursed (Stripe Direct)</span>
            <span className="text-emerald-600 font-bold">+$2,880.00</span>
          </div>
          <div className="text-[10px] text-slate-500 flex items-center justify-between">
            <span>Collably Fee (10%): $320</span>
            <span className="text-emerald-600 font-bold">Status: PAID</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-28 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/80 text-xs font-mono text-brand-accent font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The 5-Stage Collaboration Pipeline</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans">
              From discovery to instant payout.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-sans">
              How Collably delivers structure, transparency, and speed to every creator partnership.
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="font-mono text-3xl font-black text-slate-900 flex items-center gap-2">
            <span className="text-brand-accent">0{activePanel + 1}</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400">05</span>
          </div>
        </div>

        {/* Step Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {panels.map((p, idx) => (
            <button
              key={p.num}
              onClick={() => setActivePanel(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 select-none whitespace-nowrap flex items-center gap-2 ${
                activePanel === idx
                  ? "bg-slate-900 text-white shadow-md scale-[1.02]"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200"
              }`}
            >
              <span>{p.num}</span>
              <span>{p.title}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePanel}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold ${panels[activePanel].accent}`}>
                  <span>STAGE {panels[activePanel].num}</span>
                  <span>•</span>
                  <span>{panels[activePanel].metrics}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
                  {panels[activePanel].tagline}
                </h3>

                <p className="text-base text-slate-600 leading-relaxed max-w-xl font-sans">
                  {panels[activePanel].description}
                </p>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => setActivePanel((prev) => (prev + 1) % panels.length)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-mono font-bold text-slate-900 hover:bg-slate-200/80 transition-all shadow-xs"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-accent" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePanel}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${panels[activePanel].gradient} border border-slate-200/80 shadow-card`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                    <span className="text-slate-900 font-bold uppercase">Collably Pipeline Telemetry</span>
                    <span className="text-emerald-600 font-bold">● VERIFIED</span>
                  </div>
                  {panels[activePanel].uiPreview}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
