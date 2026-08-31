"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Lock, Building2 } from "lucide-react";

export function CollablyCTA() {
  return (
    <section className="py-32 bg-slate-50/70 border-t border-slate-200 relative overflow-hidden text-center select-none">
      {/* Central Warm Sunset Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-gradient-radial from-orange-200/60 via-rose-200/40 to-transparent blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/80 text-xs font-mono text-slate-800 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
          <span className="font-bold text-slate-900">Founding Creator Cohort &amp; Brand Beta Open</span>
        </div>

        <h2 className="text-4xl sm:text-7xl font-black text-slate-900 tracking-tight leading-[1.05] font-sans">
          Create great content.{" "}
          <span className="bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 bg-clip-text text-transparent">
            Never chase an invoice.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-sans">
          Join the founding cohort of vetted creators and ambitious brands scaling high-performing video partnerships with 100% milestone protection.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/creator/register"
            className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 text-white font-bold text-base shadow-2xl shadow-brand-accent/25 hover:shadow-brand-accent/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group font-sans"
          >
            <span>Apply to Join Founding Cohort</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-slate-200/90 text-slate-700 font-semibold text-base hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-sm transition-all flex items-center justify-center gap-2 font-sans"
          >
            <Building2 className="w-4 h-4 text-slate-500" />
            <span>Launch Brand Campaign</span>
          </Link>
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-slate-600 border-t border-slate-200/80 max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>100% Milestone-Protected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-brand-accent" />
            <span>0-Day Invoice Turnaround</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-amber-600" />
            <span>W-9 &amp; 1099-K Automated</span>
          </div>
        </div>
      </div>
    </section>
  );
}
