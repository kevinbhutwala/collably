"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Lock, Building2 } from "lucide-react";

export function CollablyCTA() {
  return (
    <section className="py-32 bg-[#05070D] relative overflow-hidden text-center select-none">
      {/* Central Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-gradient-radial from-brand-accent/20 via-orange-600/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
          <span>Founding Creator Cohort &amp; Brand Beta Open</span>
        </div>

        <h2 className="text-4xl sm:text-7xl font-black text-white tracking-tight leading-[1.05] font-sans">
          Create great content.{" "}
          <span className="bg-gradient-to-r from-brand-accent via-orange-400 to-amber-300 bg-clip-text text-transparent">
            Never chase an invoice.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-sans">
          Join the founding cohort of vetted creators and ambitious brands scaling high-performing video partnerships with 100% milestone protection.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/creator/register"
            className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-orange-500 to-amber-500 text-white font-bold text-base shadow-2xl shadow-brand-accent/25 hover:shadow-brand-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group font-sans"
            data-cursor="JOIN"
          >
            <span>Apply to Join Founding Cohort</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-slate-200 font-semibold text-base hover:bg-white/[0.08] hover:text-white transition-all flex items-center justify-center gap-2 backdrop-blur-xl font-sans"
            data-cursor="BRANDS"
          >
            <Building2 className="w-4 h-4 text-slate-400" />
            <span>Launch Brand Campaign</span>
          </Link>
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-slate-400 border-t border-white/[0.08] max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Milestone-Protected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-brand-accent" />
            <span>0-Day Invoice Turnaround</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-amber-400" />
            <span>W-9 &amp; 1099-K Automated</span>
          </div>
        </div>
      </div>
    </section>
  );
}
