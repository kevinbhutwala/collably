"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  Sparkles,
  CheckCircle2,
  Lock,
  Play,
  RotateCcw,
  Search,
  Check,
} from "lucide-react";
import { AnimatedCounter } from "@/components/collably/AnimatedCounter";

export function HeroSection() {
  // Live Miniature Collably Ecosystem States: 0 = Request, 1 = Analyzing, 2 = Matched, 3 = Active
  const [simStep, setSimStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSimStep((prev) => (prev + 1) % 4);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const matchedCreators = [
    {
      name: "Elena Rostova",
      handle: "@elena.creative",
      niche: "Tech & Fitness",
      followers: "485K",
      er: "6.4%",
      rate: "$2,200",
      match: 96,
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    },
    {
      name: "Devon Thorne",
      handle: "@devon.visuals",
      niche: "4K Videography",
      followers: "620K",
      er: "7.8%",
      rate: "$3,200",
      match: 94,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    },
    {
      name: "Aria Chen",
      handle: "@aria.chen",
      niche: "D2C Lifestyle",
      followers: "310K",
      er: "5.9%",
      rate: "$1,800",
      match: 91,
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent select-none">
      {/* Radiant Sunset Background Ambient Field */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[800px] lg:w-[1200px] h-[350px] sm:h-[600px] bg-gradient-radial from-orange-300/35 via-rose-300/25 to-transparent blur-[120px] pointer-events-none -z-10" />

      {/* Floating Telemetry Badges */}
      <motion.div
        animate={{ y: [-6, 6, -6], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden 2xl:flex absolute left-8 top-36 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 border border-orange-200/90 shadow-xl backdrop-blur-md z-10"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-accent to-pink-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
          🔒
        </div>
        <div className="text-left font-mono">
          <span className="text-[10px] text-slate-400 block font-bold">ESCROW CUSTODY</span>
          <span className="text-xs font-black text-slate-900">$28,500 Locked</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [6, -6, 6], rotate: [1.5, -1.5, 1.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden 2xl:flex absolute right-8 top-44 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 border border-pink-200/90 shadow-xl backdrop-blur-md z-10"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-sm">
          ⚡
        </div>
        <div className="text-left font-mono">
          <span className="text-[10px] text-slate-400 block font-bold">AUTOMATED PAYOUT</span>
          <span className="text-xs font-black text-emerald-600">Disbursed in &lt;24h</span>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10 w-full">
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 via-rose-50 to-pink-50 border border-orange-200/90 text-xs font-mono text-slate-800 shadow-xs"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-ping shrink-0" />
          <span className="font-bold text-slate-900 tracking-wide">Collably</span>
          <span className="text-slate-300">•</span>
          <span className="text-rose-700 font-semibold">Creator × Brand Collaboration Platform</span>
          <span className="hidden sm:inline text-slate-300">•</span>
          <span className="hidden sm:inline text-emerald-700 font-bold bg-emerald-100/70 px-2 py-0.5 rounded-full text-[10px]">
            Founding Cohort Open
          </span>
        </motion.div>

        {/* Master Masked Editorial Headline */}
        <div className="space-y-2 max-w-4xl mx-auto px-2">
          <motion.h1
            initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.05] font-sans"
          >
            <span className="block text-slate-900">
              Create great content.
            </span>
            <span className="block bg-gradient-to-r from-brand-accent via-rose-500 to-pink-500 bg-clip-text text-transparent mt-1 sm:mt-2">
              Never chase an invoice.
            </span>
          </motion.h1>
        </div>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed px-2 font-sans"
        >
          Pre-funded milestone payment protection, 4K frame-accurate video review, and instant payouts. Built for creators and brands who ship at the highest standard.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 px-2"
        >
          <Link
            href="/creator/register"
            data-cursor="JOIN"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 text-white font-bold text-base shadow-xl shadow-brand-accent/25 hover:shadow-brand-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group font-sans"
          >
            <span>Apply to Join Founding Cohort</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/for-brands"
            data-cursor="EXPLORE"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white border border-slate-200/90 text-slate-700 font-semibold text-base hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-xs transition-all flex items-center justify-center gap-2 font-sans"
          >
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>I&apos;m Hiring Creators</span>
          </Link>
        </motion.div>

        {/* SECTION 03 — HERO LIVE MINIATURE COLLABLY ECOSYSTEM */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-elevated p-5 sm:p-7 space-y-5 text-left relative overflow-hidden"
        >
          {/* Subtle Stage Gradient Line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500" />

          {/* Miniature OS Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-bold text-slate-900">COLLABLY MATCHING ENGINE</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500">Live Campaign Simulation</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                <span className="font-bold text-brand-accent">Step 0{simStep + 1}</span> / 04
              </div>
              <button
                onClick={() => setSimStep((prev) => (prev + 1) % 4)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                title="Next simulation step"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Simulation Stage Display */}
          <div className="space-y-4">
            {/* 1. Brand Request Prompt */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 font-mono text-xs font-bold">
                  B
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">BRAND CAMPAIGN BRIEF</span>
                  <p className="text-xs sm:text-sm font-semibold text-slate-900">
                    &ldquo;Need 10 fitness &amp; lifestyle creators for our Q3 product launch (₹15K - ₹35K per Reel).&rdquo;
                  </p>
                </div>
              </div>
              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                $28,500 Budget
              </span>
            </div>

            {/* 2. Processing & Results Matrix */}
            <AnimatePresence mode="wait">
              {simStep === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-6 rounded-2xl bg-orange-50/50 border border-orange-200/80 text-center space-y-2"
                >
                  <Search className="w-6 h-6 text-brand-accent mx-auto animate-bounce" />
                  <p className="text-xs font-mono font-bold text-slate-800">
                    ANALYZING 50,000+ VERIFIED CREATOR PROFILES...
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Scoring engagement authenticity, audience location, commercial rate match, and brand safety.
                  </p>
                </motion.div>
              )}

              {(simStep === 1 || simStep === 2 || simStep === 3) && (
                <motion.div
                  key="step-results"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {matchedCreators.map((creator, i) => (
                    <div
                      key={creator.name}
                      className={`p-3.5 rounded-2xl border transition-all duration-300 ${
                        simStep >= 2
                          ? "bg-white border-brand-accent/50 shadow-md shadow-brand-accent/10"
                          : "bg-white border-slate-200 shadow-xs"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-2.5">
                        <img
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-slate-900 truncate">{creator.name}</h4>
                          <span className="text-[10px] text-slate-500 font-mono block truncate">{creator.handle}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 py-2 border-y border-slate-100 text-[10px] font-mono">
                        <div>
                          <span className="text-slate-400 block">FOLLOWERS</span>
                          <span className="font-bold text-slate-800">{creator.followers}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block">ENGAGEMENT</span>
                          <span className="font-bold text-emerald-600">{creator.er}</span>
                        </div>
                      </div>

                      <div className="mt-2.5 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded-md bg-orange-100 text-brand-accent font-mono font-bold text-[10px]">
                          {creator.match}% MATCH
                        </span>
                        <span className="text-[11px] font-bold font-mono text-slate-900">{creator.rate}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* 3. Action / Status Footer */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                {simStep === 3 ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-600" /> 10 Invites Accepted • Campaign Live &amp; Pre-Funded
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-bold">
                    <Sparkles className="w-3.5 h-3.5 text-brand-accent" /> AI Match Precision: 94.8% Average Fit
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 font-bold text-slate-800">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Stripe Milestone Lock</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-slate-600 border-t border-slate-200/80 max-w-3xl mx-auto px-2"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <AnimatedCounter to={100} suffix="%" className="font-bold text-slate-900" /> Milestone-Locked Before Filming
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-accent shrink-0" />
            <span>
              <AnimatedCounter to={0} prefix="< " suffix=" Days" className="font-bold text-brand-accent" /> Invoice Waiting
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              Keep <AnimatedCounter to={90} suffix="%" className="font-bold text-slate-900" /> Earnings
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
