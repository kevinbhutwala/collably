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
  DollarSign,
  ShieldCheck,
  Zap,
  Play,
  FileCheck,
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
      gradient: "from-orange-500 to-rose-500",
      accentBg: "bg-orange-50 text-brand-accent border-orange-200",
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
      gradient: "from-rose-500 to-pink-500",
      accentBg: "bg-rose-50 text-rose-600 border-rose-200",
      preview: {
        headline: "Multi-Factor Fit Matrix",
        meta: "Compatibility Fit: 96.8% Match",
        highlight: "Audience Overlap: 99.1%",
        metrics: [
          { label: "NICHE ALIGNMENT", value: "98%" },
          { label: "BUDGET MATCH", value: "100%" },
          { label: "DELIVERY SPEED", value: "< 5 Days" },
        ],
      },
    },
    {
      num: "03",
      tag: "COLLABORATE",
      badge: "One Workspace",
      title: "One unified workspace. Zero chaos.",
      desc: "Standard digital creator contracts, mutual NDAs, and commercial IP usage terms negotiated in a crystalline collaborative timeline.",
      icon: Users,
      gradient: "from-pink-500 to-purple-500",
      accentBg: "bg-purple-50 text-purple-600 border-purple-200",
      preview: {
        headline: "Standard Creator Agreement",
        meta: "12-Month Paid Social & Whitelisting Rights",
        highlight: "Digitally Executed & Locked",
        metrics: [
          { label: "REVISIONS INCLUDED", value: "2 Rounds" },
          { label: "IP LICENSE", value: "Commercial" },
          { label: "CONTRACT STATUS", value: "100% Signed" },
        ],
      },
    },
    {
      num: "04",
      tag: "CREATE",
      badge: "4K Master Cuts",
      title: "Briefs, deliverables, and 4K uploads.",
      desc: "Creators upload uncompressed ProRes or 4K master files directly into the project canvas with automatic audio indexing and frame encoding.",
      icon: Video,
      gradient: "from-purple-500 to-indigo-500",
      accentBg: "bg-indigo-50 text-indigo-600 border-indigo-200",
      preview: {
        headline: "4K Master Deliverable Upload",
        meta: "Transcoded in 60fps • 4K Frame Indexed",
        highlight: "Master_Cut_Final_v2.mp4",
        metrics: [
          { label: "RESOLUTION", value: "3840 × 2160" },
          { label: "BITRATE", value: "65 Mbps" },
          { label: "FTC TAGS", value: "Verified #ad" },
        ],
      },
    },
    {
      num: "05",
      tag: "APPROVE",
      badge: "Frame-Accurate QA",
      title: "Review everything in one place.",
      desc: "Leave frame-accurate timecode comments (e.g. 00:42 swap CTA graphic) and give 1-click commercial sign-off without messy email chains.",
      icon: CheckCircle2,
      gradient: "from-indigo-500 to-cyan-500",
      accentBg: "bg-cyan-50 text-cyan-700 border-cyan-200",
      preview: {
        headline: "Timecoded QA Workspace",
        meta: "Timecode 00:42: 'Pacing verified. Lower-third CTA clean.'",
        highlight: "1-Click Commercial Sign-Off",
        metrics: [
          { label: "TIMECODES NOTED", value: "3 Frames" },
          { label: "REVISION SPEED", value: "< 24 Hours" },
          { label: "FINAL STATUS", value: "APPROVED" },
        ],
      },
    },
    {
      num: "06",
      tag: "PAY",
      badge: "Stripe Escrow",
      title: "Milestones protect everyone.",
      desc: "Campaign capital is pre-funded into Stripe Connect escrow before filming starts and disbursed directly to creator bank accounts in <24 hours upon sign-off.",
      icon: Lock,
      gradient: "from-cyan-500 to-emerald-500",
      accentBg: "bg-emerald-50 text-emerald-700 border-emerald-200",
      preview: {
        headline: "Instant Milestone Payout",
        meta: "$2,880.00 Released via Stripe Connect",
        highlight: "Net 90 Delay: 0 Days",
        metrics: [
          { label: "ESCROW STATUS", value: "Disbursed" },
          { label: "CREATOR NET", value: "90% ($2,880)" },
          { label: "PROCESSING TIME", value: "< 12 Hours" },
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
      gradient: "from-emerald-500 via-teal-500 to-brand-accent",
      accentBg: "bg-orange-50 text-brand-accent border-orange-200",
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
    <section className="py-24 sm:py-32 bg-white border-b border-slate-200 relative overflow-hidden select-none">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[900px] h-[350px] sm:h-[550px] bg-gradient-radial from-orange-200/40 via-rose-100/30 to-transparent blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 via-rose-50 to-pink-50 border border-orange-200/80 text-xs font-mono font-bold text-brand-accent shadow-xs">
            <Layers className="w-3.5 h-3.5" />
            <span>05 • The End-To-End Journey</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["brief", "payout", "continuous", "flow"]}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans leading-tight"
          >
            From brief to payout. One continuous flow.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["seven", "stages", "clarity", "collably"]}
            className="text-sm sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed"
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
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all shrink-0 ${
                  isCurrent
                    ? "bg-slate-900 text-white shadow-md scale-105"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200/80"
                }`}
              >
                <span className={`text-[10px] ${isCurrent ? "text-orange-400" : "text-slate-400"}`}>
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
              className="rounded-3xl bg-white border border-slate-200/90 shadow-elevated p-6 sm:p-10 space-y-8 relative overflow-hidden"
            >
              {/* Top Accent Gradient Rail */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${current.gradient}`} />

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                {/* Left Side: Detailed Milestone Story */}
                <div className="space-y-5 max-w-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${current.gradient} flex items-center justify-center text-white shadow-md`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs font-mono font-bold text-slate-400 block uppercase">
                        STAGE {current.num} OF 07 • {current.badge}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-md text-xs font-mono font-bold border inline-block mt-0.5 ${current.accentBg}`}>
                        {current.tag}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans tracking-tight leading-snug">
                    {current.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-sans">
                    {current.desc}
                  </p>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveStep((prev) => (prev === 0 ? stages.length - 1 : prev - 1))}
                      className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                      title="Previous stage"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setActiveStep((prev) => (prev + 1) % stages.length)}
                      className="px-4 py-2.5 rounded-xl bg-slate-900 text-white font-mono text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-2"
                    >
                      <span>Next Stage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Right Side: High-Definition Interactive Telemetry Preview Card */}
                <div className="w-full lg:w-[420px] rounded-2xl bg-slate-900 text-white shadow-2xl p-5 sm:p-6 space-y-4 border border-slate-800">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-bold text-white uppercase">{current.preview.headline}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">LIVE TELEMETRY</span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[11px] text-slate-400 font-mono block">STAGE TELEMETRY</span>
                    <p className="text-xs font-bold text-slate-200 leading-relaxed">
                      &ldquo;{current.preview.meta}&rdquo;
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 font-mono text-xs flex items-center justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className="font-extrabold text-emerald-400">{current.preview.highlight}</span>
                  </div>

                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                    {current.preview.metrics.map((m) => (
                      <div key={m.label} className="p-2.5 rounded-xl bg-slate-800/50 border border-slate-700/50 text-center">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 pt-6 border-t border-slate-200">
          {stages.map((st, i) => (
            <button
              key={st.num}
              onClick={() => setActiveStep(i)}
              className={`p-3.5 rounded-2xl text-left transition-all border ${
                activeStep === i
                  ? "bg-orange-50/70 border-brand-accent shadow-xs scale-102"
                  : "bg-slate-50/50 border-slate-200/80 hover:bg-slate-100/70"
              }`}
            >
              <span className={`text-[10px] font-mono font-bold block mb-1 ${activeStep === i ? "text-brand-accent" : "text-slate-400"}`}>
                {st.num}
              </span>
              <h4 className="text-xs font-black text-slate-900 font-sans tracking-wide">
                {st.tag}
              </h4>
              <p className="text-[10px] text-slate-500 leading-snug mt-1 truncate">
                {st.badge}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
