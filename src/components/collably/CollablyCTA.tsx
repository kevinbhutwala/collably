"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Lock, Building2 } from "lucide-react";

export function AbeyCollabCTA() {
  return (
    <section className="py-20 sm:py-32 bg-[#FCFCFA] border-t border-[#E2E6E1] relative overflow-hidden text-center select-none text-[#101310]">
      {/* Soft Ambient Mint Aura */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[400px] pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(172, 235, 210, 0.6) 0%, rgba(234, 248, 242, 0.4) 40%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF8F2] border border-[#C3EBDA] text-xs font-mono font-semibold text-[#087F5B]">
          <span className="w-2 h-2 rounded-full bg-[#087F5B] animate-pulse" />
          <span>Founding Creator Cohort &amp; Brand Beta Open</span>
        </div>

        <div className="space-y-3">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#101310] tracking-tight leading-[1.08] font-display">
            Create great content. <br />
            <span className="font-serif italic font-normal text-[#075E45]">Never chase an invoice.</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#626862] font-normal leading-relaxed max-w-xl mx-auto font-sans">
            Join vetted creators and ambitious brands moving collaboration milestones through one trusted workspace.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
          <Link
            href="/creator/register"
            className="w-full sm:w-auto px-8 py-3.5 rounded-[9px] bg-[#087F5B] hover:bg-[#075E45] active:bg-[#064B39] text-white font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 font-sans"
          >
            <span>Apply as a Creator</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-7 py-3.5 rounded-[9px] bg-[#FFFFFF] hover:bg-[#F4F6F3] border border-[#E2E6E1] text-[#101310] font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 font-sans"
          >
            <Building2 className="w-4 h-4 text-[#087F5B]" />
            <span>Launch Brand Campaign</span>
          </Link>
        </div>

        {/* Verified Trust Strip */}
        <div className="pt-6 sm:pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-[#626862] border-t border-[#E2E6E1] max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#087F5B]" />
            <span className="text-[#101310] font-semibold">100% Milestone-Protected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#087F5B]" />
            <span className="text-[#101310] font-semibold">&lt; 24h Creator Payouts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#087F5B]" />
            <span className="text-[#101310] font-semibold">10% Transparent Fee</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export const CollablyCTA = AbeyCollabCTA;
