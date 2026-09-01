"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  CheckCircle2,
  Lock,
  RotateCcw,
  Check,
  Video,
} from "lucide-react";
import confetti from "canvas-confetti";
import { AnimatedCounter } from "@/components/collably/AnimatedCounter";

export function HeroSection() {
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
          avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80",
        },
      ],
      videoTimecode: "00:42.18",
      videoNote: "Ensure the biometric pulse sensor close-up is color graded to match the brand guide.",
    },
    {
      id: "dev-tools",
      tag: "⚡ SaaS & Developer AI",
      title: "Developer Evangelist Campaign: 60s Integration for Next.js AI SDK",
      budget: "$45,000",
      budgetInr: "₹37,00,000",
      payout: "$40,500",
      creators: [
        {
          name: "Alex Chen",
          handle: "@alexchen.dev",
          niche: "Full-Stack & Systems",
          followers: "650K",
          er: "5.9%",
          rate: "$3,500",
          match: 99,
          avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=160&auto=format&fit=crop&q=80",
        },
        {
          name: "Elena Rostova",
          handle: "@elena.creative",
          niche: "AI Tool Architecture",
          followers: "485K",
          er: "6.4%",
          rate: "$2,800",
          match: 97,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
        },
        {
          name: "Marcus Vance",
          handle: "@marcuscodes",
          niche: "Cloud & DevSecOps",
          followers: "310K",
          er: "8.1%",
          rate: "$2,000",
          match: 95,
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
        },
      ],
      videoTimecode: "00:18.04",
      videoNote: "The terminal code completion looks crisp! Add the affiliate discount link on screen overlay.",
    },
    {
      id: "luxury",
      tag: "✨ Luxury & Timepieces",
      title: "Cinematic Showcase for Swiss Automatic Skeleton Collection",
      budget: "$36,000",
      budgetInr: "₹29,80,000",
      payout: "$32,400",
      creators: [
        {
          name: "Chloe Dupont",
          handle: "@chloedupont",
          niche: "Horology & Minimalism",
          followers: "520K",
          er: "6.2%",
          rate: "$3,200",
          match: 98,
          avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=160&auto=format&fit=crop&q=80",
        },
        {
          name: "Liam O'Connor",
          handle: "@liam.craft",
          niche: "Industrial Design",
          followers: "340K",
          er: "7.5%",
          rate: "$2,500",
          match: 96,
          avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80",
        },
        {
          name: "Aanya Verma",
          handle: "@aanya.aesthetics",
          niche: "High Fashion & Macro",
          followers: "410K",
          er: "6.9%",
          rate: "$2,600",
          match: 93,
          avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
        },
      ],
      videoTimecode: "01:05.12",
      videoNote: "Macro lens movement on the escapement wheel is breathtaking. 100% approved.",
    },
  ];

  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [isEscrowApproved, setIsEscrowApproved] = useState(false);
  const activePreset = campaignPresets[activePresetIndex];

  const handleApproveEscrow = () => {
    setIsEscrowApproved(true);
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff007f", "#b300b3", "#d4af37", "#10b981", "#ffffff"],
      });
    } catch {
      // fallback if canvas-confetti is not loaded
    }
  };

  const handleResetStage = () => {
    setIsEscrowApproved(false);
  };

  return (
    <section className="relative min-h-[96vh] flex flex-col justify-center items-center pt-24 sm:pt-32 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent select-none text-white">
      {/* Radiant Multi-Stop Sunset Mesh Aura */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[950px] lg:w-[1350px] h-[350px] sm:h-[680px] bg-gradient-radial from-[hsl(327,100%,50%)]/20 via-[hsl(300,100%,42%)]/15 to-transparent blur-[140px] pointer-events-none -z-10" />

      {/* Floating Satellite Card (Left - Escrow Protection) */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden 2xl:flex absolute left-8 top-40 items-center gap-3.5 px-4 py-3 rounded-3xl bg-[#120c16]/95 border border-white/10 shadow-2xl backdrop-blur-xl z-20 text-white"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] flex items-center justify-center text-white font-bold text-sm shadow-md shadow-pink-500/25">
          <ShieldCheck className="w-5 h-5 text-gold" />
        </div>
        <div className="text-left font-mono">
          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">
            STRIPE ESCROW CUSTODY
          </span>
          <span className="text-xs font-black text-white">
            {activePreset.budget} Pre-Funded
          </span>
        </div>
      </motion.div>

      {/* Floating Satellite Card (Right - Automated Disbursement) */}
      <motion.div
        animate={{ y: [8, -8, 8], rotate: [1.5, -1.5, 1.5] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden 2xl:flex absolute right-8 top-48 items-center gap-3.5 px-4 py-3 rounded-3xl bg-[#120c16]/95 border border-white/10 shadow-2xl backdrop-blur-xl z-20 text-white"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-pink-500/25">
          <Zap className="w-5 h-5 text-amber-300" />
        </div>
        <div className="text-left font-mono">
          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">
            AUTOMATED DISBURSEMENT
          </span>
          <span className="text-xs font-black text-emerald-400">
            &lt;24h Net Payout
          </span>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-10 relative z-10 w-full">
        {/* Top Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono text-white shadow-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-[hsl(327,100%,50%)] animate-ping shrink-0" />
          <span className="font-bold text-white tracking-wide font-display">Collably</span>
          <span className="text-white/20">•</span>
          <span className="text-pink-300 font-semibold font-sans">Creator × Brand Collaboration Platform</span>
          <span className="hidden sm:inline text-white/20">•</span>
          <span className="hidden sm:inline text-emerald-300 font-bold bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[10px] font-mono">
            Founding Cohort Open
          </span>
        </motion.div>

        {/* Master Editorial Headline with Outfit Display Typography */}
        <div className="space-y-2 max-w-4xl mx-auto px-2">
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] text-white leading-[1.03] font-display"
          >
            <span className="block text-white">
              Create great content.
            </span>
            <span className="block bg-gradient-to-r from-[hsl(327,100%,50%)] via-pink-400 to-[hsl(300,100%,42%)] bg-clip-text text-transparent mt-1 sm:mt-2">
              Never chase an invoice.
            </span>
          </motion.h1>
        </div>

        {/* Narrative Subtitle with Plus Jakarta Sans */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed px-2 font-sans"
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
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-base shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group font-display tracking-tight"
          >
            <span>Apply to Join Founding Cohort</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold" />
          </Link>

          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.06] border border-white/10 text-white font-semibold text-base hover:bg-white/10 hover:border-white/20 shadow-xs transition-all flex items-center justify-center gap-2 font-display tracking-tight"
          >
            <Building2 className="w-4 h-4 text-pink-400" />
            <span>I&apos;m Hiring Creators</span>
          </Link>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════
            INTERACTIVE HERO COMMAND CENTER (LIVE ECOSYSTEM STAGE)
            ════════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mx-auto rounded-3xl bg-[#120c16] border border-white/10 shadow-elevated p-5 sm:p-8 space-y-6 text-left relative overflow-hidden text-white"
        >
          {/* Top Multi-Color Gradient Rail */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[hsl(327,100%,50%)] via-pink-400 to-[hsl(300,100%,42%)]" />

          {/* Header Bar with Live Interactive Brief Selector Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white uppercase font-display">COLLABLY LIVE WORKSPACE</span>
              <span className="text-white/20">•</span>
              <span className="text-slate-400 hidden sm:inline font-mono">Interactive Command Engine</span>
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
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all ${
                    activePresetIndex === idx
                      ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white shadow-md shadow-pink-500/25 scale-102"
                      : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/5"
                  }`}
                >
                  {preset.tag}
                </button>
              ))}
            </div>
          </div>

          {/* Active Brief Summary Card */}
          <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] flex items-center justify-center shrink-0 font-mono text-xs font-black">
                B
              </div>
              <div className="overflow-hidden">
                <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                  ACTIVE CAMPAIGN BRIEF
                </span>
                <p className="text-xs sm:text-sm font-bold text-white truncate font-sans">
                  &ldquo;{activePreset.title}&rdquo;
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs shrink-0">
              <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-extrabold">
                {activePreset.budget} Escrow Locked
              </span>
            </div>
          </div>

          {/* Live Matched Creator Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activePreset.creators.map((c) => (
              <div
                key={c.name}
                className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-pink-500/40 transition-all shadow-xs hover:shadow-card space-y-3 group"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-10 h-10 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform"
                    />
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-bold text-white font-display truncate">{c.name}</h4>
                      <span className="text-[10px] text-slate-400 font-mono block truncate">{c.handle}</span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] font-mono font-black text-[10px] shrink-0">
                    {c.match}% FIT
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-1 py-2 border-y border-white/10 text-[10px] font-mono">
                  <div>
                    <span className="text-slate-400 block text-[9px]">AUDIENCE</span>
                    <span className="font-bold text-white">{c.followers}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[9px]">ENGAGEMENT</span>
                    <span className="font-bold text-emerald-400">{c.er}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] text-slate-400 font-medium font-sans">{c.niche}</span>
                  <span className="font-black text-white">{c.rate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive 4K Video Review & Instant Escrow Release Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-black/40 border border-white/10 text-white shadow-xl space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10 text-xs font-mono">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-pink-400" />
                <span className="font-bold text-white uppercase font-display">4K Timecoded Video Review</span>
                <span className="text-white/20">•</span>
                <span className="text-emerald-400 font-bold">Cut v2 (Ready for Approval)</span>
              </div>

              <span className="text-slate-400 font-mono text-[11px]">
                Timecode: <strong className="text-white">{activePreset.videoTimecode}</strong> / 01:30
              </span>
            </div>

            {/* Video Annotation Strip */}
            <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3 text-xs font-sans">
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-300 flex items-center justify-center font-mono font-bold text-[10px]">
                  QA
                </div>
                <p className="text-slate-200 text-xs leading-snug">
                  &ldquo;{activePreset.videoNote}&rdquo;
                </p>
              </div>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-white/10 text-slate-300 font-mono text-[10px]">
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
                  <div className="px-4 py-2.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Approved! {activePreset.payout} Disbursed via Stripe</span>
                  </div>
                  <button
                    onClick={handleResetStage}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white transition-colors"
                    title="Reset simulation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleApproveEscrow}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] hover:brightness-110 text-white font-bold text-xs sm:text-sm font-display tracking-tight shadow-lg shadow-pink-500/25 active:scale-95 transition-all flex items-center justify-center gap-2"
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
          className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-slate-400 border-t border-white/10 max-w-3xl mx-auto px-2"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <AnimatedCounter to={100} suffix="%" className="font-bold text-white" /> Milestone-Locked Before Filming
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[hsl(327,100%,55%)] shrink-0" />
            <span>
              <AnimatedCounter to={0} prefix="< " suffix=" Days" className="font-bold text-[hsl(327,100%,55%)]" /> Invoice Waiting
            </span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Keep <AnimatedCounter to={90} suffix="%" className="font-bold text-white" /> Earnings
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
