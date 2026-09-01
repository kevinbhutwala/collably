"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Lock, Building2 } from "lucide-react";

export function EditorialCTA() {
  return (
    <section className="py-24 sm:py-36 bg-[#FFFFFF] border-t border-[#E6E6E8] relative overflow-hidden text-center select-none text-[#08090C]">
      {/* Signature Dual Studio Lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[450px] pointer-events-none opacity-70"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(48, 71, 255, 0.18) 0%, transparent 40%),
            radial-gradient(circle at 70% 70%, rgba(255, 59, 48, 0.12) 0%, transparent 40%)
          `,
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF0FF] border border-[#C8CEFF] text-xs font-mono font-bold text-[#3047FF]">
          <span className="w-2 h-2 rounded-full bg-[#3047FF] animate-pulse" />
          <span>FOUNDING CREATOR COHORT &amp; BRAND BETA OPEN</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#08090C] tracking-tight leading-[1.04] font-display">
            Create great content. <br />
            <span className="font-serif italic font-normal text-[#1726C7]">Never chase an invoice.</span>
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-[#6B7280] font-normal leading-relaxed max-w-xl mx-auto font-sans">
            Join vetted creators and ambitious brands moving collaboration milestones through one trusted workspace.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-8 py-3.5 rounded-[9px] bg-[#3047FF] hover:bg-[#1726C7] active:bg-[#0E1A9E] text-white font-semibold text-sm shadow-ultramarine-glow transition-all flex items-center justify-center gap-2 font-sans"
          >
            <span>Start a Campaign</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/creator/register"
            className="w-full sm:w-auto px-7 py-3.5 rounded-[9px] bg-[#FFFFFF] hover:bg-[#F6F7F9] border border-[#E6E6E8] text-[#08090C] font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 font-sans"
          >
            <span>Join as a Creator</span>
            <span className="text-[#3047FF] font-bold">→</span>
          </Link>
        </div>

        {/* Verified Trust Strip */}
        <div className="pt-8 sm:pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-[#6B7280] border-t border-[#E6E6E8] max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#3047FF]" />
            <span className="text-[#08090C] font-semibold">100% Milestone Protection</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#FF3B30]" />
            <span className="text-[#08090C] font-semibold">&lt; 24h Creator Payouts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#3047FF]" />
            <span className="text-[#08090C] font-semibold">10% Transparent Fee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
