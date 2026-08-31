"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, Video, ArrowRight, ShieldCheck, Zap, Lock, Sparkles } from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function BrandCreatorSplit() {
  const [hoveredSide, setHoveredSide] = useState<"brand" | "creator" | null>(null);

  return (
    <section className="py-24 sm:py-28 bg-white border-b border-slate-200 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/80 text-xs font-mono font-bold text-brand-accent shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>13 • Two Tailored Portals</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["purpose-built", "brands", "creators"]}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans leading-tight"
          >
            Purpose-built for both sides of the deal.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["enterprise", "speed", "creator", "security"]}
            className="text-sm sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Whether you&apos;re deploying a \$250K growth campaign or earning \$10K/month as an independent creator.
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
            className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white shadow-2xl flex flex-col justify-between space-y-8 relative overflow-hidden group border border-slate-800"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
                  <Building2 className="w-6 h-6 text-orange-400" />
                </div>
                <span className="px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 font-mono text-xs font-bold border border-orange-500/30">
                  FOR BRANDS &amp; AGENCIES
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-sans">
                  Build campaigns without the chaos.
                </h3>
                <p className="text-xs sm:text-base text-slate-300 font-sans leading-relaxed">
                  Discover 50,000+ verified creators, lock milestones in Stripe Connect escrow, and approve 4K video drafts with frame-accurate timecodes.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Milestone-Protected Capital</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-400" />
                  <span>AI Creator Compatibility Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-sky-400" />
                  <span>Full Commercial IP Transfer Automations</span>
                </div>
              </div>
            </div>

            <Link
              href="/for-brands"
              data-cursor="EXPLORE"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 text-white font-bold text-sm text-center shadow-lg shadow-brand-accent/25 hover:shadow-brand-accent/40 transition-all flex items-center justify-center gap-2 group/btn font-sans"
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
            className="p-8 sm:p-12 rounded-3xl bg-white border border-slate-200/90 shadow-card hover:shadow-elevated flex flex-col justify-between space-y-8 relative overflow-hidden group"
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center text-brand-accent">
                  <Video className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 font-mono text-xs font-bold border border-emerald-200">
                  FOR VERIFIED CREATORS
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight font-sans">
                  Get paid for creating great work.
                </h3>
                <p className="text-xs sm:text-base text-slate-600 font-sans leading-relaxed">
                  Never chase an invoice again. Every collaboration is pre-funded before you film, with 90% net earnings disbursed directly in &lt;24 hours.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 text-xs font-mono text-slate-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Funds Guaranteed Before Filming Starts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-brand-accent" />
                  <span>Disbursed &lt;24h via Stripe Connect</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>Automated W-9 &amp; 1099-K Tax Compliance</span>
                </div>
              </div>
            </div>

            <Link
              href="/creator/register"
              data-cursor="JOIN"
              className="w-full py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm text-center shadow-md transition-all flex items-center justify-center gap-2 group/btn font-sans"
            >
              <span>Apply as a Founding Creator</span>
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
