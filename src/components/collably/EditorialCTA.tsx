"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Lock } from "lucide-react";

export function EditorialCTA() {
  return (
    <section className="py-24 sm:py-36 bg-[#FAFAF8] border-t border-[#E7E7E4] relative overflow-hidden text-center select-none text-[#111111]">
      {/* Signature Ambient Chrome & Micro-Accent Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[450px] pointer-events-none opacity-60"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(183, 255, 60, 0.12) 0%, transparent 40%),
            radial-gradient(circle at 70% 70%, rgba(217, 217, 214, 0.4) 0%, transparent 40%)
          `,
        }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-[11px] font-sans font-semibold uppercase tracking-wider text-[#111111] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#B7FF3C] animate-pulse" />
          <span>FOUNDING CREATOR COHORT &amp; BRAND BETA OPEN</span>
        </div>

        <div className="space-y-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-extrabold text-[#111111] tracking-tight leading-[1.02] uppercase">
            Create great content. <br />
            <span className="font-serif italic font-normal text-[#6B6B6B] normal-case text-5xl sm:text-7xl md:text-8xl lg:text-9xl">
              Never chase an invoice.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#6B6B6B] font-sans font-normal leading-relaxed max-w-xl mx-auto">
            Join vetted creators and ambitious brands moving collaboration milestones through one trusted workspace.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3 font-sans font-semibold text-sm">
          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-8 py-3.5 rounded-[9px] bg-[#111111] hover:bg-[#262626] active:bg-[#000000] text-[#FAFAF8] shadow-xs transition-all flex items-center justify-center gap-2 group"
          >
            <span>Start a Campaign</span>
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C] group-hover:scale-125 transition-transform" />
          </Link>

          <Link
            href="/creator/register"
            className="w-full sm:w-auto px-7 py-3.5 rounded-[9px] bg-[#FFFFFF] hover:bg-[#F4F4F0] border border-[#E7E7E4] text-[#111111] shadow-xs transition-all flex items-center justify-center gap-2"
          >
            <span>Join as a Creator</span>
            <ArrowRight className="w-4 h-4 text-[#111111]" />
          </Link>
        </div>

        {/* Verified Trust Strip */}
        <div className="pt-8 sm:pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-sans text-[#6B6B6B] border-t border-[#E7E7E4] max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
            <span className="text-[#111111] font-semibold">100% Milestone Protection</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#111111]" />
            <span className="text-[#111111] font-semibold">&lt; 24h Creator Payouts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#111111]" />
            <span className="text-[#111111] font-semibold">10% Transparent Fee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
