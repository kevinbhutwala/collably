"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Lock, Building2 } from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function CollablyCTA() {
  return (
    <section className="py-20 sm:py-32 bg-transparent border-t border-white/10 relative overflow-hidden text-center select-none text-white">
      {/* Central Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[700px] lg:w-[1000px] h-[300px] sm:h-[500px] bg-gradient-radial from-[hsl(327,100%,50%)]/20 via-[hsl(300,100%,42%)]/15 to-transparent blur-[100px] sm:blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/15 border border-pink-500/30 text-[11px] sm:text-xs font-mono text-white shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[hsl(327,100%,50%)] animate-ping shrink-0" />
          <span className="font-bold text-white truncate font-display">Founding Creator Cohort &amp; Brand Beta Open</span>
        </div>

        <div className="max-w-4xl mx-auto">
          <ScrollRevealText
            as="h2"
            gradientWords={["never", "chase", "invoice", "great", "content"]}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight leading-[1.08] font-display px-2"
          >
            Create great content. Never chase an invoice.
          </ScrollRevealText>
        </div>

        <div className="max-w-2xl mx-auto">
          <ScrollRevealText
            as="p"
            gradientWords={["founding", "vetted", "creators", "milestone", "protection"]}
            className="text-sm sm:text-lg md:text-xl text-slate-300 font-medium leading-relaxed px-2 font-sans"
          >
            Join the founding cohort of vetted creators and ambitious brands scaling high-performing video partnerships with 100% milestone protection.
          </ScrollRevealText>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 px-2">
          <Link
            href="/creator/register"
            className="w-full sm:w-auto px-8 sm:px-9 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-sm sm:text-base shadow-2xl shadow-pink-500/30 hover:shadow-pink-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group font-display"
          >
            <span>Apply to Join Founding Cohort</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-gold" />
          </Link>

          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/[0.06] border border-white/10 text-white font-semibold text-sm sm:text-base hover:bg-white/10 hover:border-white/20 shadow-xs transition-all flex items-center justify-center gap-2 font-display"
          >
            <Building2 className="w-4 h-4 text-pink-400" />
            <span>Launch Brand Campaign</span>
          </Link>
        </div>

        <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs font-mono text-slate-400 border-t border-white/10 max-w-2xl mx-auto px-2">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>100% Milestone-Protected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[hsl(327,100%,55%)] shrink-0" />
            <span>0-Day Turnaround</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>W-9 &amp; 1099-K Automated</span>
          </div>
        </div>
      </div>
    </section>
  );
}
