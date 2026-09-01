"use client";

import React from "react";
import Link from "next/link";
import { Building2, Sparkles, ArrowRight, ShieldCheck, Zap, Lock } from "lucide-react";

export function BrandCreatorSplit() {
  return (
    <section className="py-24 sm:py-32 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Dedicated Portals</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Built for both sides.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans">
            Whether you&apos;re deploying a growth campaign or earning as an independent creator.
          </p>
        </div>

        {/* 2 Visual Split Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* FOR BRANDS */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/40 shadow-2xl flex flex-col justify-between space-y-8 relative overflow-hidden group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-[hsl(327,100%,55%)]">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-pink-500/15 text-pink-300 font-mono text-xs font-bold border border-pink-500/30">
                  FOR BRANDS
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                  Scale creator campaigns without the chaos.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Discover vetted creators, protect budgets with pre-funded custody, and review 4K video drafts with frame-accurate timecodes.
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Pre-Funded Milestone Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[hsl(327,100%,55%)]" />
                  <span>AI Compatibility &amp; Roster Management</span>
                </div>
              </div>
            </div>

            <Link
              href="/for-brands"
              className="w-full py-4 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-sm text-center shadow-lg shadow-pink-500/25 hover:brightness-110 transition-all flex items-center justify-center gap-2 font-display"
            >
              <span>Explore for Brands</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* FOR CREATORS */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/40 shadow-card hover:shadow-2xl flex flex-col justify-between space-y-8 relative overflow-hidden group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/30">
                  FOR CREATORS
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl sm:text-3xl font-black text-white font-display">
                  Get paid for creating great work.
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                  Never chase an invoice again. Every collaboration is pre-funded before filming starts, with 90% net earnings disbursed within 24h.
                </p>
              </div>

              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Guaranteed Payout on Approval</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>Keep 90% Flat Net Earnings</span>
                </div>
              </div>
            </div>

            <Link
              href="/creator/register"
              className="w-full py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-sm text-center border border-white/10 transition-all flex items-center justify-center gap-2 font-display"
            >
              <span>Join as a Creator</span>
              <ArrowRight className="w-4 h-4 text-[hsl(327,100%,55%)]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
