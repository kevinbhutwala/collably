"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles,
  Users,
  Wallet,
  LayoutDashboard,
  Layers,
  Clock,
  Play,
  FileCheck2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { CENTRAL_CREATORS } from "@/data/creators";
import { formatCurrency, calculateMilestoneFeeBreakdown } from "@/core/utils/currency";

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<"overview" | "creators" | "content" | "payments">("overview");
  const [isApproved, setIsApproved] = useState(false);

  const sampleCampaign = {
    title: "Q3 AI Developer SDK Video Campaign",
    brandName: "Linear Dynamics",
    totalBudget: 3500,
    status: "In Review (Milestone 2/3)",
    selectedCreatorsCount: 3,
    deliverablesTotal: 3,
    deliverablesApproved: 2,
    escrowStatus: "100% Pre-Funded",
    activeDeliverableTimecode: "00:18.04",
    activeDeliverableNote: "Terminal code integration is crisp. Add the custom promo link in the top description.",
  };

  const feeBreakdown = calculateMilestoneFeeBreakdown(sampleCampaign.totalBudget, 0.1, "USD");
  const previewCreators = CENTRAL_CREATORS.slice(0, 3);

  const handleApproveMilestone = () => {
    setIsApproved(true);
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#ff007f", "#b300b3", "#d4af37", "#10b981", "#ffffff"],
      });
    } catch {
      // fallback
    }
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent select-none text-white">
      {/* Ambient Lighting Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[950px] lg:w-[1300px] h-[350px] sm:h-[650px] bg-gradient-radial from-[hsl(327,100%,50%)]/20 via-[hsl(300,100%,42%)]/15 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-10 relative z-10 w-full">
        {/* Eyebrow Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono text-white shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span className="font-bold text-white tracking-wide font-display">Collably</span>
          <span className="text-white/20">•</span>
          <span className="text-pink-300 font-medium font-sans">Creator × Brand Collaboration Operating System</span>
        </motion.div>

        {/* Master Headline */}
        <div className="space-y-2 max-w-4xl mx-auto px-2">
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.03em] text-white leading-[1.03] font-display"
          >
            <span className="block text-white">Create great content.</span>
            <span className="block bg-gradient-to-r from-[hsl(327,100%,50%)] via-pink-400 to-[hsl(300,100%,42%)] bg-clip-text text-transparent mt-1 sm:mt-2">
              Never chase an invoice.
            </span>
          </motion.h1>
        </div>

        {/* Concise Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-base sm:text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed px-2 font-sans"
        >
          Brands find the right creators. Creators get paid on time. Everything happens in one milestone-protected workspace.
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-1 px-2"
        >
          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-base shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group font-display"
          >
            <span>Start a Campaign</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold" />
          </Link>

          <Link
            href="/creator/register"
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.06] border border-white/10 text-white font-semibold text-base hover:bg-white/10 hover:border-white/20 shadow-xs transition-all flex items-center justify-center gap-2 font-display"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Join as a Creator</span>
          </Link>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════
            INTERACTIVE 4-TAB PRODUCT CAMPAIGN WORKSPACE PREVIEW
            ════════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mx-auto rounded-3xl bg-[#120c16] border border-white/10 shadow-2xl p-5 sm:p-7 space-y-6 text-left relative overflow-hidden text-white"
        >
          {/* Top Rail Gradient */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[hsl(327,100%,50%)] via-pink-400 to-[hsl(300,100%,42%)]" />

          {/* Workspace Header & Tab Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2 text-xs font-mono">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white uppercase font-display">CAMPAIGN WORKSPACE</span>
              <span className="text-white/20">•</span>
              <span className="text-pink-300 font-mono text-[11px] bg-pink-500/15 px-2.5 py-0.5 rounded-full border border-pink-500/30 font-bold">
                Interactive Preview
              </span>
            </div>

            {/* 4 Working Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "creators", label: "Creators (3)", icon: Users },
                { id: "content", label: "Content Review", icon: Video },
                { id: "payments", label: "Payments & Milestones", icon: Wallet },
              ].map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white shadow-md shadow-pink-500/25 scale-102"
                        : "bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/5"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Tab Body */}
          <div className="min-h-[260px]">
            <AnimatePresence mode="wait">
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                        CAMPAIGN BRIEF
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white font-display">
                        {sampleCampaign.title}
                      </h4>
                      <p className="text-xs text-slate-300 font-sans">
                        Sponsor: <strong className="text-white">{sampleCampaign.brandName}</strong> • Target: Software Developers &amp; AI Engineers
                      </p>
                    </div>

                    <div className="flex items-center gap-2 font-mono text-xs shrink-0">
                      <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>{formatCurrency(sampleCampaign.totalBudget)} Protected</span>
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                      <span className="text-slate-400 text-[10px] block font-semibold">CREATOR ROSTER</span>
                      <span className="text-base font-bold text-white">3 Verified Creators</span>
                      <span className="text-[11px] text-emerald-400 block font-sans">All accepted brief scope</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                      <span className="text-slate-400 text-[10px] block font-semibold">DELIVERABLES PROGRESS</span>
                      <span className="text-base font-bold text-white">2 / 3 Approved</span>
                      <span className="text-[11px] text-pink-300 block font-sans">1 draft awaiting brand sign-off</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                      <span className="text-slate-400 text-[10px] block font-semibold">MILESTONE DISBURSEMENT</span>
                      <span className="text-base font-bold text-emerald-400">
                        {formatCurrency(feeBreakdown.creatorNetAmount)} Net
                      </span>
                      <span className="text-[11px] text-slate-400 block font-sans">10% platform fee reconciled</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: CREATORS */}
              {activeTab === "creators" && (
                <motion.div
                  key="creators"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {previewCreators.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={c.avatarUrl}
                            alt={c.fullName}
                            className="w-10 h-10 rounded-xl object-cover border border-white/10"
                          />
                          <div className="overflow-hidden">
                            <h4 className="text-xs font-bold text-white font-display truncate">{c.fullName}</h4>
                            <span className="text-[10px] text-slate-400 font-mono block truncate">@{c.handle}</span>
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] font-mono font-bold text-[10px]">
                          {c.qualityScore}% FIT
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-1 py-1.5 border-y border-white/10 text-[10px] font-mono">
                        <div>
                          <span className="text-slate-400 block text-[9px]">REACH</span>
                          <span className="font-bold text-white">{c.totalFollowers.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[9px]">ENGAGEMENT</span>
                          <span className="font-bold text-emerald-400">{c.avgEngagementRate}%</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[10px] text-slate-400 font-sans">{c.primaryCategory}</span>
                        <span className="font-bold text-white">{formatCurrency(c.startingPrice)}</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* TAB 3: CONTENT REVIEW */}
              {activeTab === "content" && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-white/10 text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-pink-400" />
                      <span className="font-bold text-white">4K Timecoded Video QA</span>
                      <span className="text-white/20">•</span>
                      <span className="text-emerald-400 font-bold">Draft Cut v2</span>
                    </div>
                    <span className="text-slate-400">Timecode: <strong className="text-white">{sampleCampaign.activeDeliverableTimecode}</strong> / 01:30</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3 text-xs font-sans">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-lg bg-pink-500/20 text-pink-300 flex items-center justify-center font-mono font-bold text-[10px]">
                        QA
                      </div>
                      <p className="text-slate-200 text-xs">
                        &ldquo;{sampleCampaign.activeDeliverableNote}&rdquo;
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-slate-300 font-mono text-[10px]">
                      @{sampleCampaign.activeDeliverableTimecode}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-400 font-mono">
                      Milestone Value: <strong className="text-white">{formatCurrency(sampleCampaign.totalBudget)}</strong>
                    </span>
                    {isApproved ? (
                      <div className="flex items-center gap-2">
                        <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Approved &amp; Disbursed</span>
                        </span>
                        <button
                          onClick={() => setIsApproved(false)}
                          className="p-1.5 rounded-full bg-white/10 text-slate-400 hover:text-white"
                          title="Reset"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleApproveMilestone}
                        className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] hover:brightness-110 text-white font-bold text-xs font-display flex items-center gap-1.5 shadow-md shadow-pink-500/25 transition-all"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve &amp; Release Milestone ({formatCurrency(sampleCampaign.totalBudget)})</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB 4: PAYMENTS */}
              {activeTab === "payments" && (
                <motion.div
                  key="payments"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase text-slate-400 font-bold block">PROTECTED MILESTONE ALLOCATION</span>
                      <span className="text-2xl font-black text-white font-display">{formatCurrency(sampleCampaign.totalBudget)}</span>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-bold flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Pre-Funded Milestone Holding</span>
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono text-xs">
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                      <span className="text-slate-400 text-[10px] block">GROSS BUDGET</span>
                      <span className="text-base font-bold text-white">{formatCurrency(feeBreakdown.grossAmount)}</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                      <span className="text-slate-400 text-[10px] block">PLATFORM FEE (10%)</span>
                      <span className="text-base font-bold text-pink-400">{formatCurrency(feeBreakdown.platformFeeAmount)}</span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10">
                      <span className="text-slate-400 text-[10px] block">CREATOR NET DISBURSEMENT</span>
                      <span className="text-base font-bold text-emerald-400">{formatCurrency(feeBreakdown.creatorNetAmount)}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-slate-400 border-t border-white/10 max-w-3xl mx-auto px-2"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Milestone-Protected Capital</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[hsl(327,100%,55%)] shrink-0" />
            <span>0-Day Invoice Delays</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Creators Keep 90% Net Earnings</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
