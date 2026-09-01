"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Zap, Lock } from "lucide-react";

export function EditorialCTA() {
  return (
    <section className="py-24 sm:py-36 bg-[#FAFAF8] border-t border-[#E7E7E4] relative overflow-hidden text-center select-none text-[#101010]">
      {/* Signature Ambient Chrome & Micro-Accent Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[450px] pointer-events-none opacity-60"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(255, 210, 31, 0.15) 0%, transparent 40%),
            radial-gradient(circle at 70% 70%, rgba(217, 217, 214, 0.4) 0%, transparent 40%)
          `,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-[11px] font-sans font-semibold uppercase tracking-[0.1em] text-[#101010] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
          <span>FOUNDING CREATOR COHORT &amp; BRAND BETA OPEN</span>
        </div>

        <div className="space-y-4">
          <h2 className="section-headline text-center uppercase tracking-tight">
            Create great content. <br />
            <span className="font-serif italic font-normal text-[#626262] normal-case text-[clamp(3.25rem,7.5vw,7.5rem)]">
              Never chase an invoice.
            </span>
          </h2>

          <p className="editorial-body mx-auto text-center">
            Join vetted creators and ambitious brands moving collaboration milestones through one trusted workspace.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3 font-sans font-semibold text-sm">
          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold shadow-xs transition-all flex items-center justify-center gap-2 group tracking-tight border border-black/10"
          >
            <span>Start a Campaign</span>
            <ArrowRight className="w-4 h-4 text-[#0A0A0E] group-hover:translate-x-0.5 transition-transform" />
          </Link>

          <Link
            href="/creator/register"
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#FFFFFF] hover:bg-[#F4F4F0] border border-[#E7E7E4] text-[#101010] font-bold shadow-xs transition-all flex items-center justify-center gap-2 tracking-tight"
          >
            <span>Join as a Creator</span>
            <ArrowRight className="w-4 h-4 text-[#101010]" />
          </Link>
        </div>

        {/* Verified Trust Strip */}
        <div className="pt-8 sm:pt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-sans text-[#626262] border-t border-[#E7E7E4] max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F]" />
            <span className="text-[#101010] font-semibold">100% Milestone Protection</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#101010]" />
            <span className="text-[#101010] font-semibold">&lt; 24h Creator Payouts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-[#101010]" />
            <span className="text-[#101010] font-semibold">10% Transparent Fee</span>
          </div>
        </div>
      </div>
    </section>
  );
}
