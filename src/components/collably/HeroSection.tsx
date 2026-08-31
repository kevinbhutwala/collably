"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShieldCheck, Zap, Building2, CheckCircle2, ArrowUpRight, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/components/collably/AnimatedCounter";

export function HeroSection() {
  const dynamicRoles = [
    "YouTube Integrations",
    "Instagram 4K Reels",
    "TikTok Video Launches",
    "Dedicated Sponsorships",
    "Commercial Ad Whitelisting",
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % dynamicRoles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [dynamicRoles.length]);

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center items-center pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-transparent">
      {/* Background Multi-Color Radiant Sunset Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] lg:w-[1200px] h-[350px] sm:h-[550px] bg-gradient-radial from-orange-300/40 via-rose-300/30 to-pink-200/20 blur-[100px] sm:blur-[150px] pointer-events-none -z-10" />

      {/* Floating Accent Badges (Desktop Only) */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [-1.5, 1.5, -1.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="hidden 2xl:flex absolute left-12 top-36 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 border border-orange-200 shadow-xl backdrop-blur-md z-10"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-accent to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
          🔒
        </div>
        <div className="text-left font-mono">
          <span className="text-[10px] text-slate-400 block font-bold">MILESTONE PROTECTED</span>
          <span className="text-xs font-black text-slate-900">$3,200 Pre-Funded</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [8, -8, 8], rotate: [1.5, -1.5, 1.5] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        className="hidden 2xl:flex absolute right-12 top-44 items-center gap-3 px-4 py-2.5 rounded-2xl bg-white/95 border border-pink-200 shadow-xl backdrop-blur-md z-10"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
          ⚡
        </div>
        <div className="text-left font-mono">
          <span className="text-[10px] text-slate-400 block font-bold">INSTANT PAYOUT</span>
          <span className="text-xs font-black text-emerald-600">Disbursed in &lt;24h</span>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10 w-full">
        {/* Top Cohort Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
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

        {/* Master Editorial Headline */}
        <div className="space-y-2 max-w-4xl mx-auto px-2">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-slate-900 leading-[1.06] select-none font-sans text-center">
            <span className="block text-slate-900">
              Where World-Class Creators
            </span>
            <span className="block bg-gradient-to-r from-brand-accent via-rose-500 to-pink-500 bg-clip-text text-transparent mt-1 sm:mt-2">
              &amp; Ambitious Brands Collaborate.
            </span>
          </h1>
        </div>

        {/* Dynamic Rotating Campaign Deliverable Ticker */}
        <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-2xl bg-white border border-slate-200 shadow-xs text-xs sm:text-sm font-mono text-slate-700">
          <span className="text-slate-400 font-medium">Powering:</span>
          <div className="relative h-6 min-w-[200px] sm:min-w-[240px] overflow-hidden text-left flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute inset-0 flex items-center font-bold text-slate-900 bg-gradient-to-r from-orange-600 to-pink-600 bg-clip-text text-transparent"
              >
                {dynamicRoles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed px-2"
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
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 text-white font-bold text-base shadow-xl shadow-brand-accent/25 hover:shadow-brand-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group select-none font-sans"
          >
            <span>Apply to Join Founding Cohort</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white border border-slate-200/90 text-slate-700 font-semibold text-base hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-xs transition-all flex items-center justify-center gap-2 select-none font-sans"
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
