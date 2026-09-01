"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  Play,
  Video,
  Sparkles,
  Users,
  Wallet,
  LayoutDashboard,
  Star,
  Check,
  RotateCcw,
} from "lucide-react";
import confetti from "canvas-confetti";
import { CENTRAL_CREATORS } from "@/data/creators";
import { formatCurrency, calculateMilestoneFeeBreakdown } from "@/core/utils/currency";

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<"overview" | "creators" | "content" | "payments">("overview");
  const [isApproved, setIsApproved] = useState(false);

  const feeBreakdown = calculateMilestoneFeeBreakdown(3500, 0.1, "USD");
  const topCreators = CENTRAL_CREATORS.slice(0, 3);

  const handleApprove = () => {
    setIsApproved(true);
    try {
      confetti({
        particleCount: 80,
        spread: 65,
        origin: { y: 0.6 },
        colors: ["#ff007f", "#b300b3", "#d4af37", "#10b981", "#ffffff"],
      });
    } catch {
      // fallback
    }
  };

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-center items-center pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent select-none text-white">
      {/* Ambient Spotlight Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[850px] lg:w-[1200px] h-[350px] sm:h-[600px] bg-gradient-radial from-[hsl(327,100%,50%)]/25 via-[hsl(300,100%,42%)]/15 to-transparent blur-[130px] pointer-events-none -z-10" />

      {/* Subtle Floating Star / Flare Accents */}
      <div className="absolute top-20 left-[10%] w-72 h-72 bg-pink-500/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 right-[10%] w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto text-center space-y-8 sm:space-y-10 relative z-10 w-full">
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono backdrop-blur-xl text-white shadow-xl hover:border-pink-500/40 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-[hsl(327,100%,50%)] animate-pulse" />
          <span className="font-bold text-white tracking-wide font-display">COLLABLY</span>
          <span className="text-white/20">•</span>
          <span className="text-pink-300 font-medium">The Creator Collaboration OS</span>
        </motion.div>

        {/* Master Punchy Headline */}
        <div className="space-y-4 max-w-5xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl xs:text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-black tracking-[-0.035em] text-white leading-[0.98] font-display"
          >
            <span className="block">Create great content.</span>
            <span className="block bg-gradient-to-r from-[hsl(327,100%,55%)] via-pink-400 to-[hsl(300,100%,48%)] bg-clip-text text-transparent mt-1">
              Never chase an invoice.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-sans font-normal leading-relaxed"
          >
            The milestone-protected workspace connecting vetted creators with high-growth brands.
          </motion.p>
        </div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2"
        >
          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-sm sm:text-base shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group font-display"
          >
            <span>Start a Campaign</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold" />
          </Link>

          <Link
            href="/creator/register"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-white font-semibold text-sm sm:text-base backdrop-blur-xl shadow-xs transition-all flex items-center justify-center gap-2 font-display"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>Join as a Creator</span>
          </Link>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════
            CINEMATIC INTERACTIVE WORKSPACE PREVIEW
            ════════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mx-auto rounded-3xl bg-[#120c16]/90 backdrop-blur-2xl border border-white/10 shadow-2xl p-4 sm:p-7 space-y-6 text-left relative overflow-hidden text-white"
        >
          {/* Luminous Top Rail */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(327,100%,50%)] via-pink-400 to-[hsl(300,100%,42%)]" />

          {/* Navigation Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white font-display">AI Developer SDK Video Launch</h3>
                <p className="text-[11px] text-slate-400 font-mono">Sponsor: Linear Dynamics • $3,500 Protected</p>
              </div>
            </div>

            {/* Interactive Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "creators", label: "Creators (3)", icon: Users },
                { id: "content", label: "4K Video QA", icon: Video },
                { id: "payments", label: "Milestones", icon: Wallet },
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
          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Visual Card 1 */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3 relative overflow-hidden group">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400 font-semibold uppercase text-[10px]">CREATOR TALENT</span>
                        <span className="text-emerald-400 font-bold">3 ACCEPTED</span>
                      </div>
                      <div className="flex items-center -space-x-2 pt-1">
                        {topCreators.map((c) => (
                          <img
                            key={c.id}
                            src={c.avatarUrl}
                            alt={c.fullName}
                            className="w-10 h-10 rounded-full object-cover border-2 border-[#120c16]"
                          />
                        ))}
                      </div>
                      <p className="text-xs text-slate-300 font-sans">
                        Elena Rostova, Devon Thorne, Marcus Vance
                      </p>
                    </div>

                    {/* Visual Card 2 */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400 font-semibold uppercase text-[10px]">DELIVERABLES QA</span>
                        <span className="text-pink-300 font-bold">2 OF 3 READY</span>
                      </div>
                      <div className="space-y-1.5 font-mono text-xs">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-300">Production Cut v2</span>
                          <span className="text-emerald-400 font-bold">Approved</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-gradient-to-r from-pink-500 to-emerald-400 h-full w-[66%]" />
                        </div>
                      </div>
                      <p className="text-xs text-slate-400 font-sans">Final 4K reel awaiting brand sign-off</p>
                    </div>

                    {/* Visual Card 3 */}
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400 font-semibold uppercase text-[10px]">ESCROW CUSTODY</span>
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> SECURED
                        </span>
                      </div>
                      <div className="text-2xl font-black text-white font-mono">{formatCurrency(3500)}</div>
                      <p className="text-[11px] text-slate-400 font-sans">
                        {formatCurrency(feeBreakdown.creatorNetAmount)} net to creator • 10% platform fee
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: CREATORS */}
              {activeTab === "creators" && (
                <motion.div
                  key="creators"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  {topCreators.map((c) => (
                    <div
                      key={c.id}
                      className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={c.avatarUrl}
                          alt={c.fullName}
                          className="w-11 h-11 rounded-xl object-cover border border-white/10"
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-white font-display truncate">{c.fullName}</h4>
                          <span className="text-[10px] text-slate-400 font-mono block">@{c.handle}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] font-mono border-t border-white/10 pt-2 text-slate-300">
                        <span>{c.totalFollowers.toLocaleString()} reach</span>
                        <span className="text-emerald-400 font-bold">{c.avgEngagementRate}% ER</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* TAB 3: CONTENT */}
              {activeTab === "content" && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-4"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-bold text-white">4K Master Video Review • Timecode 00:18</span>
                    <span className="text-emerald-400 font-bold">Cut v2</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between gap-3 text-xs font-sans">
                    <span className="text-slate-200">
                      &ldquo;Terminal code integration is crisp. Add custom promo link in top comment.&rdquo;
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-slate-300 font-mono text-[10px]">
                      @00:18
                    </span>
                  </div>

                  <div className="flex items-center justify-end pt-1">
                    {isApproved ? (
                      <span className="px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Deliverable Approved • Payout Released</span>
                      </span>
                    ) : (
                      <button
                        onClick={handleApprove}
                        className="px-5 py-2 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] hover:brightness-110 text-white font-bold text-xs font-display flex items-center gap-1.5 shadow-md shadow-pink-500/25 transition-all"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Deliverable ({formatCurrency(3500)})</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {/* TAB 4: PAYMENTS */}
              {activeTab === "payments" && (
                <motion.div
                  key="payments"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs"
                >
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-slate-400 text-[10px] block font-semibold">TOTAL BUDGET</span>
                    <span className="text-xl font-bold text-white">{formatCurrency(feeBreakdown.grossAmount)}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-slate-400 text-[10px] block font-semibold">PLATFORM FEE (10%)</span>
                    <span className="text-xl font-bold text-pink-400">{formatCurrency(feeBreakdown.platformFeeAmount)}</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                    <span className="text-slate-400 text-[10px] block font-semibold">CREATOR PAYOUT (90%)</span>
                    <span className="text-xl font-bold text-emerald-400">{formatCurrency(feeBreakdown.creatorNetAmount)}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Minimal High-Impact Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-xs font-mono text-slate-400 border-t border-white/10 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Pre-Funded Milestones</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-[hsl(327,100%,55%)]" />
            <span>&lt;24h Automated Payouts</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Zero Invoice Chasing</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
