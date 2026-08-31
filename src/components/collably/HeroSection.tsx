"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Building2, CheckCircle2, ArrowUpRight } from "lucide-react";
import { AnimatedCounter } from "@/components/collably/AnimatedCounter";

export function HeroSection() {
  const creatorNiches = ["Creators", "Videographers", "Influencers", "Storytellers", "Talent"];
  const brandTypes = ["Brands", "Startups", "Agencies", "Sponsors", "Founders"];

  const [creatorIndex, setCreatorIndex] = useState(0);
  const [brandIndex, setBrandIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCreatorIndex((prev) => (prev + 1) % creatorNiches.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [creatorNiches.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      setBrandIndex((prev) => (prev + 1) % brandTypes.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [brandTypes.length]);

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center items-center pt-20 sm:pt-28 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      {/* Background Multi-Color Radiant Sunset Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] lg:w-[1200px] h-[350px] sm:h-[550px] bg-gradient-radial from-orange-300/40 via-rose-300/30 to-pink-200/20 blur-[100px] sm:blur-[150px] pointer-events-none -z-10" />

      {/* Floating Accent Badges (Desktop Only) */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden 2xl:flex absolute left-8 top-36 items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/90 border border-orange-200 shadow-lg backdrop-blur-md z-10"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-accent to-pink-500 flex items-center justify-center text-white font-bold text-xs">
          🔒
        </div>
        <div className="text-left font-mono">
          <span className="text-[10px] text-slate-400 block font-bold">MILESTONE PROTECTED</span>
          <span className="text-xs font-black text-slate-900">$3,200 Pre-Funded</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [8, -8, 8], rotate: [2, -2, 2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden 2xl:flex absolute right-8 top-44 items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/90 border border-pink-200 shadow-lg backdrop-blur-md z-10"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
          ⚡
        </div>
        <div className="text-left font-mono">
          <span className="text-[10px] text-slate-400 block font-bold">INSTANT PAYOUT</span>
          <span className="text-xs font-black text-emerald-600">Disbursed in &lt;24h</span>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto text-center space-y-6 sm:space-y-8 relative z-10 w-full">
        {/* Top Cohort Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-50 via-rose-50 to-pink-50 border border-orange-200/90 text-[11px] sm:text-xs font-mono text-slate-700 shadow-xs"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-ping shrink-0" />
          <span className="font-bold text-slate-900 tracking-wide">Collably</span>
          <span className="text-slate-300">•</span>
          <span className="text-rose-700 font-semibold truncate">Founding Creator Cohort Open</span>
        </motion.div>

        {/* Dynamic Animated Cycling Headline with Baseline Alignment */}
        <div className="max-w-4xl mx-auto px-2">
          <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.18] select-none font-sans text-center">
            <span className="inline-block align-baseline">Where World-Class</span>{" "}
            <span className="inline-block relative overflow-hidden align-baseline min-w-[4ch] sm:min-w-[4.8ch] text-left">
              <span className="invisible select-none opacity-0 pointer-events-none">Videographers</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={creatorIndex}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-110%", opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center bg-gradient-to-r from-brand-accent via-rose-500 to-pink-500 bg-clip-text text-transparent"
                >
                  {creatorNiches[creatorIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br className="hidden xs:inline" />
            <span className="inline-block align-baseline">and</span>{" "}
            <span className="inline-block relative overflow-hidden align-baseline min-w-[3.2ch] sm:min-w-[3.8ch] text-left">
              <span className="invisible select-none opacity-0 pointer-events-none">Startups</span>
              <AnimatePresence mode="wait">
                <motion.span
                  key={brandIndex}
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-110%", opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent"
                >
                  {brandTypes[brandIndex]}
                </motion.span>
              </AnimatePresence>
            </span>{" "}
            <span className="inline-block align-baseline">Collaborate.</span>
          </h1>
        </div>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-sm sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed px-2"
        >
          Pre-funded milestone payment protection, 4K frame-accurate video review, and instant payouts. Create unforgettable campaigns without ever chasing an invoice.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 px-2"
        >
          <Link
            href="/creator/register"
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-brand-accent/25 hover:shadow-brand-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group select-none font-sans"
          >
            <span>Apply to Join Founding Cohort</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl bg-white border border-slate-200/90 text-slate-700 font-semibold text-sm sm:text-base hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-xs transition-all flex items-center justify-center gap-2 select-none"
          >
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>I&apos;m Hiring Creators</span>
          </Link>
        </motion.div>

        {/* Sublink for Brand Marketers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-xs text-slate-500 font-medium px-2"
        >
          Looking to scale creator marketing campaigns?{" "}
          <Link
            href="/for-brands"
            className="text-brand-accent font-bold hover:underline inline-flex items-center gap-0.5"
          >
            Explore Collably for Brands <ArrowUpRight className="w-3 h-3" />
          </Link>
        </motion.div>

        {/* Trust Badges Bar with Animated Numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-slate-600 border-t border-slate-200/80 max-w-3xl mx-auto px-2"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <AnimatedCounter to={100} suffix="%" className="font-bold text-slate-900" /> Milestone-Locked
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
