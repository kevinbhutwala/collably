"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Lock, Building2 } from "lucide-react";

export function CollablyCTA() {
  return (
    <section className="py-20 sm:py-32 bg-slate-50/70 border-t border-slate-200 relative overflow-hidden text-center select-none">
      {/* Central Warm Sunset Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[700px] lg:w-[1000px] h-[300px] sm:h-[500px] bg-gradient-radial from-orange-200/60 via-rose-200/40 to-transparent blur-[100px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/80 text-[11px] sm:text-xs font-mono text-slate-800 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping shrink-0" />
          <span className="font-bold text-slate-900 truncate">Founding Creator Cohort &amp; Brand Beta Open</span>
        </div>

        <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.08] font-sans px-2">
          Create great content.{" "}
          <span className="bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 bg-clip-text text-transparent">
            Never chase an invoice.
          </span>
        </h2>

        <p className="text-sm sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans px-2">
          Join the founding cohort of vetted creators and ambitious brands scaling high-performing video partnerships with 100% milestone protection.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 px-2">
          <Link
            href="/creator/register"
            className="w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 text-white font-bold text-sm sm:text-base shadow-2xl shadow-brand-accent/25 hover:shadow-brand-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group font-sans"
          >
            <span>Apply to Join Founding Cohort</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-2xl bg-white border border-slate-200/90 text-slate-700 font-semibold text-sm sm:text-base hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-xs transition-all flex items-center justify-center gap-2 font-sans"
          >
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>Launch Brand Campaign</span>
          </Link>
        </div>

        <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-slate-600 border-t border-slate-200/80 max-w-2xl mx-auto px-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>100% Milestone-Protected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-brand-accent shrink-0" />
            <span>0-Day Turnaround</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-amber-600 shrink-0" />
            <span>W-9 &amp; 1099-K Automated</span>
          </div>
        </div>
      </div>
    </section>
  );
}
