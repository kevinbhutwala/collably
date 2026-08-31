"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Building2, CheckCircle2, ArrowUpRight } from "lucide-react";

export function HeroSection() {
  const words = [
    "Where",
    "World-Class",
    "Creators",
    "and",
    "Brands",
    "Collaborate.",
  ];

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[450px] bg-gradient-radial from-brand-accent/20 via-orange-600/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
        {/* Top Cohort Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 backdrop-blur-xl shadow-xl"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-ping" />
          <span className="font-bold text-white tracking-wide">Collably</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-400">Founding Creator Cohort Open</span>
        </motion.div>

        {/* Masked Oversized Typography */}
        <div className="space-y-2 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] select-none font-sans">
            {words.map((word, idx) => {
              const isHighlight = word === "Creators" || word === "Collaborate.";
              return (
                <span key={idx} className="inline-block overflow-hidden mr-2.5 sm:mr-4 py-1">
                  <motion.span
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1 + idx * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block ${
                      isHighlight
                        ? "bg-gradient-to-r from-brand-accent via-orange-400 to-amber-300 bg-clip-text text-transparent"
                        : "text-white"
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </h1>
        </div>

        {/* Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          Pre-funded milestone payment protection, 4K frame-accurate video review, and instant payouts. Create unforgettable campaigns without ever chasing an invoice.
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          <Link
            href="/creator/register"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-orange-500 to-amber-500 text-white font-bold text-base shadow-xl shadow-brand-accent/25 hover:shadow-brand-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group select-none font-sans"
            data-cursor="JOIN"
          >
            <span>Apply to Join Founding Cohort</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-slate-200 font-semibold text-base hover:bg-white/[0.08] hover:text-white transition-all flex items-center justify-center gap-2 backdrop-blur-xl select-none"
            data-cursor="BRANDS"
          >
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>I&apos;m Hiring Creators</span>
          </Link>
        </motion.div>

        {/* Sublink for Brand Marketers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-xs text-slate-400 font-medium"
        >
          Looking to scale creator marketing campaigns?{" "}
          <Link
            href="/for-brands"
            className="text-brand-accent font-bold hover:underline inline-flex items-center gap-0.5"
          >
            Explore Collably for Brands <ArrowUpRight className="w-3 h-3" />
          </Link>
        </motion.div>

        {/* Trust Badges Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400 border-t border-white/[0.08] max-w-3xl mx-auto"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Milestone-Locked Before Filming</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-brand-accent" />
            <span>0-Day Invoice Waiting</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Creators Keep 90% of Earnings</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
