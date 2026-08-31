"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Building2,
} from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-white">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-radial from-orange-100/60 via-purple-50/40 to-transparent blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tagline Pill */}
        <div className="flex justify-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-700 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-ping" />
              <span className="font-bold text-slate-900">Collably</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-600">Founding Creator Cohort Open</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Headlines */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08]"
          >
            Create great content.{" "}
            <span className="bg-gradient-to-r from-brand-accent via-orange-600 to-amber-600 bg-clip-text text-transparent">
              Never chase an invoice.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Milestone-locked payments via Stripe Connect, verified brand briefs across YouTube, Instagram, and TikTok, and instant automated payouts upon deliverable approval.
          </motion.p>

          {/* Primary Action Button (Single Primary Flow for Creators) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/creator/register">
              <Button
                variant="accent"
                size="lg"
                rightIcon={<ArrowRight className="w-5 h-5" />}
                className="w-full sm:w-auto text-base shadow-xl shadow-brand-accent/25 px-8"
              >
                Apply to Join Founding Cohort
              </Button>
            </Link>

            <Link href="/for-brands">
              <Button
                variant="outline"
                size="lg"
                leftIcon={<Building2 className="w-4 h-4 text-slate-500" />}
                className="w-full sm:w-auto text-base"
              >
                I&apos;m Hiring Creators
              </Button>
            </Link>
          </motion.div>

          {/* Direct Brand sublink for clarity */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="text-xs text-slate-500 font-medium pt-1"
          >
            Looking to launch a marketing campaign?{" "}
            <Link href="/for-brands" className="text-brand-accent font-bold hover:underline inline-flex items-center gap-0.5">
              Explore Collably for Brands <ArrowUpRight className="w-3 h-3" />
            </Link>
          </motion.div>

          {/* Trust points */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 font-medium border-t border-slate-100 max-w-2xl mx-auto"
          >
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Milestone-Locked Before Filming</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-brand-accent" />
              <span>0-Day Payout Turnaround</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Keep 90% of Earnings</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
