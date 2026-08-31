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
  Pause,
  RotateCcw,
  Search,
  Check,
  DollarSign,
  TrendingUp,
  Clock,
  Video,
} from "lucide-react";
import confetti from "canvas-confetti";
import { AnimatedCounter } from "@/components/collably/AnimatedCounter";

export function HeroSection() {
  // Campaign brief presets that users can click to see the whole UI morph live!
  const campaignPresets = [
    {
      id: "fitness",
      tag: "🔥 Fitness & Tech",
      title: "10 Fitness & Calisthenics Creators for Q3 Smartwatch Launch",
      budget: "$28,500",
      budgetInr: "₹23,50,000",
      payout: "$25,650",
      creators: [
        {
          name: "Siddharth Nair",
          handle: "@siddharth.fits",
          niche: "Calisthenics & Strength",
          followers: "420K",
          er: "6.8%",
          rate: "$2,400",
          match: 98,
          avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
        },
        {
          name: "Elena Rostova",
          handle: "@elena.creative",
          niche: "4K Fitness Tech",
          followers: "485K",
          er: "6.4%",
          rate: "$2,200",
          match: 96,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
        },
        {
          name: "Pooja Hegde",
          handle: "@pooja.movement",
          niche: "Mobility & Running",
          followers: "285K",
          er: "7.2%",
          rate: "$1,800",
          match: 94,
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
        },
      ],
      videoTimecode: "00:42",
      videoNote: "Updated lower-third CTA coupon code. Pacing is razor sharp.",
    },
    {
      id: "saas",
      tag: "⚡ AI & Dev Tools",
      title: "6 Developer & Tech Storytellers for AI Copilot Launch",
      budget: "$45,000",
      budgetInr: "₹37,00,000",
      payout: "$40,500",
      creators: [
        {
          name: "Marcus Vance",
          handle: "@marcus.codes",
          niche: "Developer Workflows",
          followers: "890K",
          er: "5.4%",
          rate: "$4,500",
          match: 99,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
        },
        {
          name: "Devon Thorne",
          handle: "@devon.visuals",
          niche: "Product Architecture",
          followers: "620K",
          er: "7.8%",
          rate: "$3,800",
          match: 97,
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80",
        },
        {
          name: "Aria Chen",
          handle: "@aria.tech",
          niche: "AI Engineering",
          followers: "310K",
          er: "5.9%",
          rate: "$2,600",
          match: 95,
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80",
        },
      ],
      videoTimecode: "01:15",
      videoNote: "Live terminal IDE demo verified. Clean syntax transition.",
    },
    {
      id: "beauty",
      tag: "✨ D2C Clean Beauty",
      title: "12 Skincare & Routine Creators for Clean Hydration Launch",
      budget: "$18,500",
      budgetInr: "₹15,20,000",
      payout: "$16,650",
      creators: [
        {
          name: "Chloe Dubois",
          handle: "@chloe.glow",
          niche: "Clean Skincare",
          followers: "340K",
          er: "7.9%",
          rate: "$1,600",
          match: 98,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
        },
        {
          name: "Pooja Hegde",
          handle: "@pooja.movement",
          niche: "Daily Rituals",
          followers: "285K",
          er: "7.2%",
          rate: "$1,400",
          match: 96,
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
        },
        {
          name: "Aria Chen",
          handle: "@aria.lifestyle",
          niche: "Organic Wellness",
          followers: "310K",
          er: "5.9%",
          rate: "$1,500",
          match: 93,
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80",
        },
      ],
      videoTimecode: "00:28",
      videoNote: "Texture macro B-roll approved. Color grade matches brand palette.",
    },
  ];

  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const activePreset = campaignPresets[activePresetIndex];

  // Stage simulation: 0 = Matching, 1 = Ready For Review, 2 = Milestone Approved & Disbursed
  const [activeStage, setActiveStage] = useState(1);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isEscrowApproved, setIsEscrowApproved] = useState(false);

  const handleApproveEscrow = () => {
    setIsEscrowApproved(true);
    setActiveStage(2);
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#FF5E3A", "#F43F5E", "#10B981", "#FBBF24", "#6366F1"],
    });
  };

  const handleResetStage = () => {
    setIsEscrowApproved(false);
    setActiveStage(1);
  };

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-center items-center pt-24 sm:pt-32 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent select-none">
      {/* Radiant Multi-Stop Sunset Mesh Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[900px] lg:w-[1300px] h-[350px] sm:h-[650px] bg-gradient-radial from-orange-300/40 via-rose-300/25 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Floating Satellite Card (Left - Delaware/India Escrow Shield) */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden 2xl:flex absolute left-8 top-40 items-center gap-3.5 px-4 py-3 rounded-3xl bg-white/95 border border-orange-200/90 shadow-2xl backdrop-blur-xl z-20"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-accent to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="text-left font-mono">
          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">
            STRIPE ESCROW CUSTODY
          </span>
          <span className="text-xs font-black text-slate-900">
            {activePreset.budget} Pre-Funded
          </span>
        </div>
      </motion.div>

      {/* Floating Satellite Card (Right - Frame-Accurate QA & Instant Payout) */}
      <motion.div
        animate={{ y: [8, -8, 8], rotate: [1.5, -1.5, 1.5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden 2xl:flex absolute right-8 top-48 items-center gap-3.5 px-4 py-3 rounded-3xl bg-white/95 border border-pink-200/90 shadow-2xl backdrop-blur-xl z-20"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 via-pink-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
          <Zap className="w-5 h-5" />
        </div>
        <div className="text-left font-mono">
          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">
            AUTOMATED DISBURSEMENT
          </span>
          <span className="text-xs font-black text-emerald-600">
            &lt;24h Net Payout
          </span>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-10 relative z-10 w-full">
        {/* Top Glowing Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 via-rose-50 to-pink-50 border border-orange-200/90 text-xs font-mono text-slate-800 shadow-sm"
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
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.04] font-sans"
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
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 text-white font-bold text-base shadow-2xl shadow-brand-accent/25 hover:shadow-brand-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group font-sans"
          >
            <span>Apply to Join Founding Cohort</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white border border-slate-200/90 text-slate-700 font-semibold text-base hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-xs transition-all flex items-center justify-center gap-2 font-sans"
          >
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>I&apos;m Hiring Creators</span>
          </Link>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════
            THE CRAZY INTERACTIVE HERO COMMAND CENTER (LIVE ECOSYSTEM STAGE)
            ════════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mx-auto rounded-3xl bg-white border border-slate-200/90 shadow-elevated p-5 sm:p-8 space-y-6 text-left relative overflow-hidden"
        >
          {/* Top Multi-Color Gradient Rail */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-accent via-rose-500 to-indigo-600" />

          {/* Header Bar with Live Interactive Brief Selector Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="font-bold text-slate-900 uppercase">COLLABLY LIVE WORKSPACE</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 hidden sm:inline">Interactive Command Engine</span>
            </div>

            {/* Interactive Brief Preset Switcher */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {campaignPresets.map((preset, idx) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setActivePresetIndex(idx);
                    handleResetStage();
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all ${
                    activePresetIndex === idx
                      ? "bg-slate-900 text-white shadow-md scale-102"
                      : "bg-slate-100 hover:bg-slate-200/80 text-slate-600"
                  }`}
                >
                  {preset.tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Brief Summary Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 font-mono text-xs font-black">
                B
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                  ACTIVE CAMPAIGN BRIEF
                </span>
                <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                  &ldquo;{activePreset.title}&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs shrink-0">
              <span className="px-3 py-1 rounded-xl bg-emerald-100 text-emerald-800 font-extrabold">
                {activePreset.budget} Escrow Locked
              </span>
            </div>
          </div>

          {/* Live Matched Creator Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activePreset.creators.map((c) => (
              <div
                key={c.name}
                className="p-4 rounded-2xl bg-white border border-slate-200/90 hover:border-orange-300 transition-all shadow-xs hover:shadow-card space-y-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-10 h-10 rounded-xl object-cover border border-slate-200 group-hover:scale-105 transition-transform"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-slate-900 font-sans truncate">{c.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono block truncate">{c.handle}</span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-md bg-orange-100 text-brand-accent font-mono font-black text-[10px] shrink-0">
                    {c.match}% FIT
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1 py-2 border-y border-slate-100 text-[10px] font-mono">
                  <div>
                    <span className="text-slate-400 block text-[9px]">AUDIENCE</span>
                    <span className="font-bold text-slate-800">{c.followers}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">ENGAGEMENT</span>
                    <span className="font-bold text-emerald-600">{c.er}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] text-slate-400 font-medium">{c.niche}</span>
                  <span className="font-black text-slate-900">{c.rate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive 4K Video Review & Instant Escrow Release Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 text-white shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-orange-400" />
                <span className="font-bold text-white uppercase">4K Timecoded Video Review</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-bold">Cut v2 (Ready for Approval)</span>
              </div>

              <span className="text-slate-400 font-mono text-[11px]">
                Timecode: <strong className="text-white">{activePreset.videoTimecode}</strong> / 01:30
              </span>
            </div>

            {/* Video Annotation Strip */}
            <div className="p-3.5 rounded-xl bg-slate-800/90 border border-slate-700/80 flex items-center justify-between gap-3 text-xs font-sans">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-mono font-bold text-[10px]">
                  QA
                </div>
                <p className="text-slate-200 text-xs leading-snug">
                  &ldquo;{activePreset.videoNote}&rdquo;
                </p>
              </div>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-slate-700 text-slate-300 font-mono text-[10px]">
                Timecode {activePreset.videoTimecode}
              </span>
            </div>

            {/* Action Bottom Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div className="space-y-1 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-slate-300">Escrow Balance: <strong className="text-white">{activePreset.budget}</strong></span>
                </div>
                <span className="text-[11px] text-slate-400">Creator Net Payout (90%): <strong className="text-emerald-400">{activePreset.payout}</strong></span>
              </div>

              {/* Instant Approval Button */}
              {isEscrowApproved ? (
                <div className="flex items-center gap-3">
                  <div className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Approved! {activePreset.payout} Disbursed via Stripe</span>
                  </div>
                  <button
                    onClick={handleResetStage}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                    title="Reset simulation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleApproveEscrow}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 hover:opacity-95 text-white font-bold text-xs sm:text-sm font-sans shadow-lg shadow-brand-accent/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>1-Click Approve &amp; Release Payout ({activePreset.budget})</span>
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom Trust Metrics Bar */}
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
