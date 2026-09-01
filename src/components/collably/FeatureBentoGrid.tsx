"use client";

import React, { useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Lock,
  FileCheck2,
  Scale,
} from "lucide-react";

export function FeatureBentoGrid() {
  const [activeTimestamp, setActiveTimestamp] = useState<number>(42);
  const [isApproved, setIsApproved] = useState<boolean>(false);

  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8] border-b border-[#E7E7E4] relative overflow-hidden select-none text-[#101010]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-[11px] font-sans font-semibold uppercase tracking-[0.08em] text-[#101010] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#101010]" />
            <span>02 • Architecture &amp; Capabilities</span>
          </div>

          <h2 className="section-headline">
            Engineered for precision. <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#626262]">
              Built for creative velocity.
            </span>
          </h2>

          <p className="editorial-body mx-auto text-center">
            Every tool required to discover talent, review high-bitrate video deliverables, and disburse milestone payouts safely in one place.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            ASYMMETRIC 5-CARD BENTO GRID (Awwwards / FWA Standard)
            ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
          {/* ── CARD 1: HERO FEATURE CARD (Cols 1-7, Rows 1-2) ── */}
          <div className="lg:col-span-7 rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] p-6 sm:p-8 shadow-editorial hover:border-[#101010] transition-all flex flex-col justify-between group relative overflow-hidden">
            {/* Top Badge & Header */}
            <div className="space-y-2 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] text-[10px] font-mono font-bold uppercase tracking-wider text-[#101010]">
                  Core Feature
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-[#626262]">
                  <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
                  Live QA Studio
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-[#101010] tracking-tight">
                4K Frame-Accurate Video QA Review
              </h3>
              <p className="text-xs sm:text-sm text-[#626262] font-sans leading-relaxed max-w-lg">
                Pinpoint revisions with sub-second timecoded annotations directly onto creator video deliverables. No more endless email threads.
              </p>
            </div>

            {/* Interactive Video QA Interface Simulator */}
            <div className="mt-6 rounded-2xl bg-[#101010] p-4 sm:p-5 text-white space-y-4 border border-[#262626] relative z-10 shadow-editorial">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF3B30]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  <span className="ml-2 font-bold text-white/90">Cut_03_Final_4K_ProRes.mp4</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">
                  00:{activeTimestamp < 10 ? `0${activeTimestamp}` : activeTimestamp} / 01:30
                </span>
              </div>

              {/* Scrubber & Waveform Timeline */}
              <div className="space-y-2">
                <div className="h-10 sm:h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center px-3 gap-1 relative overflow-hidden">
                  {/* Waveform Bars */}
                  {[40, 65, 80, 45, 90, 100, 75, 60, 30, 85, 95, 70, 50, 60, 85, 40, 95, 80, 60, 45, 70, 85, 90, 50].map((h, i) => (
                    <div
                      key={i}
                      style={{ height: `${h}%` }}
                      className={`flex-1 rounded-full transition-colors ${
                        i * 4 <= activeTimestamp ? "bg-[#FFD21F]" : "bg-white/20"
                      }`}
                    />
                  ))}
                  {/* Playhead */}
                  <div
                    style={{ left: `${(activeTimestamp / 90) * 100}%` }}
                    className="absolute top-0 bottom-0 w-0.5 bg-[#FAFAF8] shadow-lg pointer-events-none"
                  />
                </div>

                {/* Interactive Timestamp Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pt-1 font-mono text-[10px]">
                  {[
                    { sec: 14, text: "Hook Transition" },
                    { sec: 42, text: "Product Placement Callout" },
                    { sec: 78, text: "CTA & Promo Code Display" },
                  ].map((t) => (
                    <button
                      key={t.sec}
                      onClick={() => setActiveTimestamp(t.sec)}
                      className={`px-2.5 py-1 rounded-md border transition-all ${
                        activeTimestamp === t.sec
                          ? "bg-[#FFD21F] text-[#101010] border-[#FFD21F] font-bold"
                          : "bg-white/10 text-white/70 border-white/10 hover:bg-white/20"
                      }`}
                    >
                      00:{t.sec} • {t.text}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
                <span className="text-[11px] font-mono text-white/60">
                  Milestone Escrow: <strong className="text-white">₹35,000 Locked</strong>
                </span>
                <button
                  onClick={() => setIsApproved(!isApproved)}
                  className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isApproved
                      ? "bg-[#FFD21F] text-[#101010]"
                      : "bg-[#FFD21F] text-[#0A0A0E] hover:brightness-105"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#0A0A0E]" />
                  <span>{isApproved ? "Milestone Disbursed ✓" : "1-Click Approve & Disburse"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* ── CARD 2: MEDIUM CARD 1 — AI AFFINITY RADAR (Cols 8-12, Row 1) ── */}
          <div className="lg:col-span-5 rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] p-6 sm:p-8 shadow-editorial hover:border-[#101010] transition-all flex flex-col justify-between group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] text-[10px] font-mono font-bold uppercase tracking-wider text-[#101010]">
                  AI Matching
                </span>
                <span className="px-2 py-0.5 rounded bg-[#FFD21F] text-[#101010] font-mono text-[10px] font-bold">
                  98% ACCURACY
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#101010] tracking-tight">
                Audience Demographics &amp; Affinity
              </h3>
              <p className="text-xs sm:text-sm text-[#626262] font-sans leading-relaxed">
                Algorithmic creator matching mapped directly to your exact niche, target CAC, and verified organic engagement.
              </p>
            </div>

            {/* Metric Bars */}
            <div className="space-y-3 pt-6 font-mono text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1 text-[#101010] font-semibold">
                  <span>Tech &amp; Developer Community</span>
                  <span className="font-bold numeric-tabular">94.2%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] overflow-hidden">
                  <div className="h-full bg-[#101010] rounded-full w-[94%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 text-[#101010] font-semibold">
                  <span>Tier-1 Geography (US / IN / UK)</span>
                  <span className="font-bold numeric-tabular">88.7%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] overflow-hidden">
                  <div className="h-full bg-[#3047FF] rounded-full w-[88%]" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 text-[#101010] font-semibold">
                  <span>Verified Buyer Affinity</span>
                  <span className="font-bold numeric-tabular">92.0%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] overflow-hidden">
                  <div className="h-full bg-[#FFD21F] rounded-full w-[92%]" />
                </div>
              </div>
            </div>
          </div>

          {/* ── CARD 3: MEDIUM CARD 2 — MILESTONE ESCROW RAILS (Cols 8-12, Row 2) ── */}
          <div className="lg:col-span-5 rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] p-6 sm:p-8 shadow-editorial hover:border-[#101010] transition-all flex flex-col justify-between group">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] text-[10px] font-mono font-bold uppercase tracking-wider text-[#101010]">
                  Automated Escrow
                </span>
                <Lock className="w-4 h-4 text-[#101010]" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-[#101010] tracking-tight">
                Zero-Risk Milestone Security
              </h3>
              <p className="text-xs sm:text-sm text-[#626262] font-sans leading-relaxed">
                Funds are held in secure escrow upon brief dispatch and released automatically only when contractual milestones pass QA review.
              </p>
            </div>

            {/* Visual Step Tracker */}
            <div className="grid grid-cols-3 gap-2 pt-6 font-mono text-[11px]">
              <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-center space-y-1">
                <span className="text-[9px] text-[#626262] font-bold">STEP 01</span>
                <p className="font-bold text-[#101010]">Brief Funded</p>
              </div>
              <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-center space-y-1">
                <span className="text-[9px] text-[#626262] font-bold">STEP 02</span>
                <p className="font-bold text-[#101010]">QA Review</p>
              </div>
              <div className="p-3 rounded-xl bg-[#FFD21F] border border-[#FFD21F] text-center space-y-1">
                <span className="text-[9px] text-[#101010] font-bold">STEP 03</span>
                <p className="font-bold text-[#101010]">Instant Payout</p>
              </div>
            </div>
          </div>

          {/* ── CARD 4: COMPACT CARD 1 — CONTRACTS & RIGHTS QA (Cols 1-6, Row 3) ── */}
          <div className="lg:col-span-6 rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] p-6 sm:p-8 shadow-editorial hover:border-[#101010] transition-all flex items-start gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-center text-[#101010] shrink-0 group-hover:scale-105 transition-transform">
              <FileCheck2 className="w-6 h-6 text-[#101010]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold font-display text-[#101010] tracking-tight">
                Automated Licensing &amp; Usage Rights
              </h4>
              <p className="text-xs text-[#626262] font-sans leading-relaxed">
                Pre-configured perpetual organic licensing, paid whitelist terms, and FTC compliance tags embedded natively into every agreement.
              </p>
            </div>
          </div>

          {/* ── CARD 5: COMPACT CARD 2 — DISPUTE ARBITRATION (Cols 7-12, Row 3) ── */}
          <div className="lg:col-span-6 rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] p-6 sm:p-8 shadow-editorial hover:border-[#101010] transition-all flex items-start gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-center text-[#101010] shrink-0 group-hover:scale-105 transition-transform">
              <Scale className="w-6 h-6 text-[#101010]" />
            </div>
            <div className="space-y-1">
              <h4 className="text-lg font-bold font-display text-[#101010] tracking-tight">
                24h Human Arbitration Guarantee
              </h4>
              <p className="text-xs text-[#626262] font-sans leading-relaxed">
                If deliverables fail agreed creative briefs or brand delays sign-off, Collably mediators arbitrate funds within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
