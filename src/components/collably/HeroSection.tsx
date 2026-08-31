"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Building2, CheckCircle2, ArrowUpRight } from "lucide-react";
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
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center pt-24 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      {/* Background Multi-Color Radiant Sunset Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1200px] h-[550px] bg-gradient-radial from-orange-300/40 via-rose-300/30 to-pink-200/20 blur-[150px] pointer-events-none -z-10" />

      {/* Floating Vibrant Accent Badges */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [-2, 2, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden xl:flex absolute left-8 top-36 items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/90 border border-orange-200 shadow-lg backdrop-blur-md z-10"
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
        className="hidden xl:flex absolute right-8 top-44 items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/90 border border-pink-200 shadow-lg backdrop-blur-md z-10"
      >
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
          ⚡
        </div>
        <div className="text-left font-mono">
          <span className="text-[10px] text-slate-400 block font-bold">INSTANT PAYOUT</span>
          <span className="text-xs font-black text-emerald-600">Disbursed in &lt;24h</span>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        {/* Top Cohort Pill with Orange/Pink Gradient Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-50 via-rose-50 to-pink-50 border border-orange-200/90 text-xs font-mono text-slate-700 shadow-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-ping" />
          <span className="font-bold text-slate-900 tracking-wide">Collably</span>
          <span className="text-slate-300">•</span>
          <span className="text-rose-700 font-semibold">Founding Creator Cohort Open</span>
        </motion.div>

        {/* Dynamic Animated Cycling Headline */}
        <div className="space-y-3 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12] select-none font-sans">
            <span>Where World-Class </span>
            <span className="inline-flex relative h-[1.15em] overflow-hidden align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={creatorIndex}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block bg-gradient-to-r from-brand-accent via-rose-500 to-pink-500 bg-clip-text text-transparent px-1 pb-1"
                >
                  {creatorNiches[creatorIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            <span>and </span>
            <span className="inline-flex relative h-[1.15em] overflow-hidden align-baseline">
              <AnimatePresence mode="wait">
                <motion.span
                  key={brandIndex}
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "-100%", opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent px-1 pb-1"
                >
                  {brandTypes[brandIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span> Collaborate.</span>
          </h1>
        </div>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Pre-funded milestone payment protection, 4K frame-accurate video review, and instant payouts. Create unforgettable campaigns without ever chasing an invoice.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link
            href="/creator/register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 text-white font-bold text-base shadow-xl shadow-brand-accent/25 hover:shadow-brand-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group select-none font-sans"
          >
            <span>Apply to Join Founding Cohort</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white border border-slate-200/90 text-slate-700 font-semibold text-base hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-sm transition-all flex items-center justify-center gap-2 select-none"
          >
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>I&apos;m Hiring Creators</span>
          </Link>
        </motion.div>

        {/* Sublink for Brand Marketers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="text-xs text-slate-500 font-medium"
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
          transition={{ duration: 0.5, delay: 0.5 }}
          className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-600 border-t border-slate-200/80 max-w-3xl mx-auto"
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
              Creators Keep <AnimatedCounter to={90} suffix="%" className="font-bold text-slate-900" /> of Earnings
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
