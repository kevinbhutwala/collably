"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Video, ArrowRight, ShieldCheck, Zap, Lock, Sparkles } from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function BrandCreatorSplit() {
  const [hoveredSide, setHoveredSide] = useState<"brand" | "creator" | null>(null);

  return (
    <section className="py-24 sm:py-28 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>08 • Dedicated Portals</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["purpose-built", "brands", "creators"]}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-tight"
          >
            Purpose-built for both sides of the deal.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["enterprise", "speed", "creator", "security"]}
            className="text-sm sm:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Whether you&apos;re deploying a targeted growth campaign or earning as an independent creator.
          </ScrollRevealText>
        </div>

        {/* Split Screen Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* FOR BRANDS */}
          <motion.div
            onMouseEnter={() => setHoveredSide("brand")}
            onMouseLeave={() => setHoveredSide(null)}
            animate={{
              scale: hoveredSide === "brand" ? 1.02 : hoveredSide === "creator" ? 0.98 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#120c16] text-white shadow-2xl flex flex-col justify-between space-y-8 relative overflow-hidden group border border-white/10 hover:border-pink-500/40"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white">
                  <Building2 className="w-6 h-6 text-pink-400" />
                </div>
                <span className="px-3 py-1 rounded-full bg-pink-500/15 text-pink-300 font-mono text-xs font-bold border border-pink-500/30">
                  FOR BRANDS &amp; AGENCIES
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display">
                  Build campaigns without the chaos.
                </h3>
                <p className="text-xs sm:text-base text-slate-300 font-sans leading-relaxed">
                  Discover vetted creators, protect campaign milestones with pre-funded custody, and review 4K video drafts with frame-accurate timecodes.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Protected Milestone Payments</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[hsl(327,100%,55%)]" />
                  <span>Natural Language Creator Discovery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-sky-400" />
                  <span>Standardized Commercial Usage Rights</span>
                </div>
              </div>
            </div>

            <Link
              href="/for-brands"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-sm text-center shadow-lg shadow-pink-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2 group/btn font-display"
            >
              <span>Explore Collably for Brands</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          {/* FOR CREATORS */}
          <motion.div
            onMouseEnter={() => setHoveredSide("creator")}
            onMouseLeave={() => setHoveredSide(null)}
            animate={{
              scale: hoveredSide === "creator" ? 1.02 : hoveredSide === "brand" ? 0.98 : 1,
            }}
            transition={{ duration: 0.3 }}
            className="p-8 sm:p-12 rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/40 shadow-card hover:shadow-elevated flex flex-col justify-between space-y-8 relative overflow-hidden group text-white"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[hsl(327,100%,55%)]">
                  <Video className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                  FOR CREATORS
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-display">
                  Get paid for creating great work.
                </h3>
                <p className="text-xs sm:text-base text-slate-300 font-sans leading-relaxed">
                  Never chase an invoice again. Every collaboration is funded before you film, with 90% net earnings disbursed within 24 hours of approval.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Protected Milestone Custody</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[hsl(327,100%,55%)]" />
                  <span>Direct Bank Payouts via Stripe Connect</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Transparent 10% Flat Platform Fee</span>
                </div>
              </div>
            </div>

            <Link
              href="/creator/register"
              className="w-full py-4 rounded-full bg-white/[0.06] hover:bg-white/10 text-white font-bold text-sm text-center border border-white/10 transition-all flex items-center justify-center gap-2 group/btn font-display"
            >
              <span>Apply as a Founding Creator</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-[hsl(327,100%,55%)]" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
