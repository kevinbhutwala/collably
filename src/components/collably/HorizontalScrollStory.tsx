"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  Users,
  Video,
  CheckCircle2,
  Lock,
  BarChart3,
  ArrowRight,
  ArrowLeft,
  Layers,
} from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function HorizontalScrollStory() {
  const [activeStep, setActiveStep] = useState(0);

  const stages = [
    {
      num: "01",
      tag: "DISCOVER",
      badge: "Vetted Roster",
      title: "Find creators who actually fit.",
      desc: "Filter through 50,000+ verified creators by real engagement rates, authentic audience geography, and transparent historical rate cards.",
      icon: Search,
      gradient: "from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)]",
      accentBg: "bg-pink-500/15 text-[hsl(327,100%,55%)] border-pink-500/30",
      preview: {
        headline: "Filtered Talent Search",
        meta: "2,480 Active Tech & SaaS Creators",
        highlight: "98.4% Audience Authenticity",
        metrics: [
          { label: "VERIFIED REACH", value: "24.5M+" },
          { label: "AVG ENGAGEMENT", value: "6.8%" },
          { label: "BASE REEL RATE", value: "$2,200" },
        ],
      },
    },
    {
      num: "02",
      tag: "MATCH",
      badge: "AI Precision",
      title: "AI-powered creator compatibility.",
      desc: "Our neural matching algorithm evaluates audience demographic overlap, past brand safety track record, and delivery velocity to find your 95%+ matches.",
      icon: Sparkles,
      gradient: "from-pink-500 via-rose-500 to-purple-600",
      accentBg: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      preview: {
        headline: "Multi-Factor Fit Matrix",
        meta: "Compatibility Fit: 96.8% Match",
        highlight: "Audience Overlap: 99.1%",
        metrics: [
          { label: "SAFETY SCORE", value: "99/100" },
          { label: "AI FIT RATING", value: "96.8%" },
          { label: "GEO OVERLAP", value: "84.2%" },
        ],
      },
    },
    {
      num: "03",
      tag: "COLLABORATE",
      badge: "Escrow Protection",
      title: "100% funds locked in escrow.",
      desc: "Before any creator records a frame, total campaign capital is locked safely in platform escrow. Zero payment chasing; guaranteed security for both sides.",
      icon: Lock,
      gradient: "from-amber-400 via-pink-500 to-[hsl(327,100%,50%)]",
      accentBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      preview: {
        headline: "Stripe Escrow Custody",
        meta: "$28,500 Locked in Sovereign Vault",
        highlight: "100% Pre-Funded Guarantee",
        metrics: [
          { label: "LOCKED CAPITAL", value: "$28.5K" },
          { label: "CREATOR POOL", value: "10 Roster" },
          { label: "COMMISSION", value: "10% Net" },
        ],
      },
    },
    {
      num: "04",
      tag: "CREATE",
      badge: "Asset Pipeline",
      title: "Streamlined production workflows.",
      desc: "Creators upload multi-round revisions directly into the campaign workspace with automated transcode optimization and thumbnail asset checks.",
      icon: Video,
      gradient: "from-purple-500 to-pink-500",
      accentBg: "bg-pink-500/15 text-pink-300 border-pink-500/30",
      preview: {
        headline: "Asset Submission Stream",
        meta: "4K Master .MOV Transcoded & Ready",
        highlight: "Version 2.0 (Revision Active)",
        metrics: [
          { label: "ASSET RES", value: "4K 60fps" },
          { label: "DELIVERY SLA", value: "3 Days" },
          { label: "REVISIONS LEFT", value: "2 Rounds" },
        ],
      },
    },
    {
      num: "05",
      tag: "APPROVE",
      badge: "Frame-Accurate QA",
      title: "Timecoded feedback on 4K player.",
      desc: "Brand teams click anywhere on the video scrub timeline to leave timestamp-accurate feedback pins. No confusion, no lost email threads.",
      icon: CheckCircle2,
      gradient: "from-emerald-400 to-teal-500",
      accentBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      preview: {
        headline: "Timeline Review Engine",
        meta: "Timecode Annotation: 00:42.18",
        highlight: "All Feedback Resolved",
        metrics: [
          { label: "PINS LOGGED", value: "3 QA Points" },
          { label: "AVG APPROVAL", value: "1.2 Days" },
          { label: "STATUS", value: "Signoff Ready" },
        ],
      },
    },
    {
      num: "06",
      tag: "PAY",
      badge: "Direct Disbursement",
      title: "Instant payout upon approval.",
      desc: "The moment the brand clicks 'Approve Deliverable', escrow unlocks and disburses funds directly to creator bank accounts in under 24 hours.",
      icon: Users,
      gradient: "from-teal-400 via-emerald-400 to-amber-400",
      accentBg: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      preview: {
        headline: "Automated Disbursement",
        meta: "$25,650 Net Disbursed to Creator",
        highlight: "Direct Stripe Bank Transfer",
        metrics: [
          { label: "NET PAYOUT", value: "90% Exact" },
          { label: "PAYOUT SPEED", value: "< 24 Hours" },
          { label: "INVOICE CHASE", value: "0 Days" },
        ],
      },
    },
    {
      num: "07",
      tag: "MEASURE",
      badge: "Live Telemetry",
      title: "Know what actually worked.",
      desc: "Track real-time engagement telemetry, link clicks, promo code conversions, and certified campaign ROI in your analytics ledger.",
      icon: BarChart3,
      gradient: "from-[hsl(327,100%,50%)] via-pink-400 to-[hsl(300,100%,42%)]",
      accentBg: "bg-pink-500/15 text-pink-300 border-pink-500/30",
      preview: {
        headline: "Campaign Attribution Matrix",
        meta: "4.8× Verified Revenue ROI on $28.5K Spend",
        highlight: "14,820 Tracked Promo Conversions",
        metrics: [
          { label: "TOTAL VIEWS", value: "2.4M+" },
          { label: "CLICK-THROUGH", value: "4.2%" },
          { label: "NET ROI", value: "4.8×" },
        ],
      },
    },
  ];

  const current = stages[activeStep];
  const Icon = current.icon;

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [stages.length]);

  return (
    <section className="py-24 sm:py-32 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[900px] h-[350px] sm:h-[550px] bg-gradient-radial from-[hsl(327,100%,50%)]/15 via-[hsl(300,100%,42%)]/10 to-transparent blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>05 • The End-To-End Journey</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["brief", "payout", "continuous", "flow"]}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-tight"
          >
            From brief to payout. One continuous flow.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["seven", "stages", "clarity", "collably"]}
            className="text-sm sm:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Seven choreographed milestones that take collaboration from chaotic back-and-forths to pure execution.
          </ScrollRevealText>
        </div>

        {/* 7-Step Interactive Milestone Selector Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none max-w-5xl mx-auto">
          {stages.map((st, i) => {
            const isCurrent = i === activeStep;
            return (
              <button
                key={st.num}
                onClick={() => setActiveStep(i)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold transition-all shrink-0 ${
                  isCurrent
                    ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white shadow-md shadow-pink-500/25 scale-105"
                    : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10"
                }`}
              >
                <span className={`text-[10px] ${isCurrent ? "text-amber-300" : "text-slate-400"}`}>
                  {st.num}
                </span>
                <span>{st.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Master Active Stage Cinematic Showcase Stage */}
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.num}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl bg-[#120c16] border border-white/10 shadow-elevated p-6 sm:p-10 space-y-8 relative overflow-hidden text-white"
            >
              {/* Top Accent Gradient Rail */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${current.gradient}`} />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                {/* Left Side: Detailed Milestone Story */}
                <div className="space-y-5 max-w-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${current.gradient} flex items-center justify-center text-white shadow-md shadow-pink-500/25`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-400 block uppercase">
                        STAGE {current.num} OF 07 • {current.badge}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border inline-block mt-0.5 ${current.accentBg}`}>
                        {current.tag}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight leading-snug">
                    {current.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
                    {current.desc}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveStep((prev) => (prev === 0 ? stages.length - 1 : prev - 1))}
                      className="p-2.5 rounded-full border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                      title="Previous stage"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveStep((prev) => (prev + 1) % stages.length)}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-mono text-xs font-bold shadow-md shadow-pink-500/25 hover:brightness-110 transition-all flex items-center gap-2"
                    >
                      <span>Next Stage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Side: High-Definition Interactive Telemetry Preview Card */}
                <div className="w-full lg:w-[420px] rounded-2xl bg-black/50 text-white shadow-2xl p-5 sm:p-6 space-y-4 border border-white/10">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-bold text-white uppercase font-display">{current.preview.headline}</span>
                    </div>
                    <span className="text-[10px] text-pink-300 font-mono">LIVE TELEMETRY</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 font-mono block">STAGE TELEMETRY</span>
                    <p className="text-xs font-bold text-slate-200 leading-relaxed font-sans">
                      &ldquo;{current.preview.meta}&rdquo;
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs flex items-center justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-extrabold text-emerald-400">{current.preview.highlight}</span>
                  </div>

                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                    {current.preview.metrics.map((m) => (
                      <div key={m.label} className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 text-center">
                        <span className="text-slate-400 block text-[9px] truncate">{m.label}</span>
                        <span className="font-bold text-white text-xs block mt-0.5">{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* 7-Card Overview Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 pt-6 border-t border-white/10">
          {stages.map((st, i) => (
            <button
              key={st.num}
              onClick={() => setActiveStep(i)}
              className={`p-3.5 rounded-2xl text-left transition-all border ${
                activeStep === i
                  ? "bg-pink-500/15 border-pink-500/50 shadow-md shadow-pink-500/10 scale-102"
                  : "bg-white/[0.03] border-white/10 hover:bg-white/[0.06]"
              }`}
            >
              <span className={`text-[10px] font-mono font-bold block mb-1 ${activeStep === i ? "text-[hsl(327,100%,55%)]" : "text-slate-400"}`}>
                {st.num}
              </span>
              <h4 className="text-xs font-black text-white font-display tracking-wide">
                {st.tag}
              </h4>
              <p className="text-[10px] text-slate-400 leading-snug mt-1 truncate font-sans">
                {st.badge}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
