"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  Building2,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-transparent text-white">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-radial from-[hsl(327,100%,50%)]/20 via-[hsl(300,100%,42%)]/15 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs text-white shadow-sm font-mono">
              <span className="flex h-2 w-2 rounded-full bg-[hsl(327,100%,50%)] animate-ping" />
              <span className="font-bold text-white font-display">Collably</span>
              <span className="text-white/20">•</span>
              <span className="text-slate-300">Founding Creator Cohort Open</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Headlines */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-display"
          >
            Create great content.{" "}
            <span className="bg-gradient-to-r from-[hsl(327,100%,50%)] via-pink-400 to-[hsl(300,100%,42%)] bg-clip-text text-transparent">
              Never chase an invoice.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed font-sans"
          >
            Pre-funded milestone payment protection, 4K timecoded video review, and automated payouts. Designed for high-growth brands and world-class creators.
          </motion.p>

          {/* Dual CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4"
          >
            <Link
              href="/creator/register"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-sm sm:text-base shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group font-display"
            >
              <span>Apply to Join Founding Cohort</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold" />
            </Link>

            <Link
              href="/for-brands"
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/[0.05] border border-white/10 text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 font-display"
            >
              <Building2 className="w-4 h-4 text-pink-400" />
              <span>I&apos;m Hiring Creators</span>
            </Link>
          </motion.div>

          {/* Value Props Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400 border-t border-white/10"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Pre-Funded Escrow</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-[hsl(327,100%,55%)]" />
              <span>Instant Payouts &lt;24h</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Keep 90% Net Earnings</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-amber-400" />
              <span>Auto 1099-K &amp; W-9 Compliance</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
