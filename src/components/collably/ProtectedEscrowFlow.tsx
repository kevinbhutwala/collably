"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  Zap,
  ArrowRight,
  Sparkles,
  DollarSign,
  Clock,
  FileCheck2,
  Building2,
  Users,
} from "lucide-react";
import { formatCurrency } from "@/core/utils/formatters";

interface EscrowStage {
  id: number;
  phase: string;
  title: string;
  badge: string;
  description: string;
  brandAssurance: string;
  creatorAssurance: string;
}

const ESCROW_STAGES: EscrowStage[] = [
  {
    id: 0,
    phase: "PHASE 01",
    title: "100% Pre-Funded Escrow Deposit",
    badge: "FUNDS IN CUSTODY",
    description: "Brand deposits agreed brief budget ($3,500) into Stripe Connect escrow custody before production begins.",
    brandAssurance: "Budget remains locked safely. Zero funds leave escrow without formal milestone sign-off.",
    creatorAssurance: "100% payout certainty guaranteed. Never record content on unverified payment promises.",
  },
  {
    id: 1,
    phase: "PHASE 02",
    title: "4K Master Draft Submission",
    badge: "MILESTONE DELIVERED",
    description: "Creator uploads uncompressed 4K master ProRes cut and clean audio stems directly into the QA workspace.",
    brandAssurance: "Automatic frame indexing, audio waveform analysis, and script requirement verification.",
    creatorAssurance: "Timestamped delivery certificate logged to immutable audit trail, meeting turnaround SLA.",
  },
  {
    id: 2,
    phase: "PHASE 03",
    title: "Frame-Accurate QA & Revisions",
    badge: "IN REVIEW",
    description: "Brand inspects video with timecoded annotations (e.g. 00:14) and requests capped minor revisions if needed.",
    brandAssurance: "Ensure every deliverable matches brief specs and commercial guidelines before release.",
    creatorAssurance: "Revision caps prevent scope creep; feedback is specific and actionable with exact timestamps.",
  },
  {
    id: 3,
    phase: "PHASE 04",
    title: "1-Click Commercial Sign-off",
    badge: "APPROVED",
    description: "Brand clicks Approve. Perpetual commercial licensing and raw 4K asset download rights transfer instantly.",
    brandAssurance: "Immediate legal IP clearance and high-speed raw ProRes master download links.",
    creatorAssurance: "Escrow lock releases automatically upon brand sign-off with zero invoice chasing.",
  },
  {
    id: 4,
    phase: "PHASE 05",
    title: "Instant Sub-2-Hour Bank Payout",
    badge: "DISBURSED & PAID",
    description: "Stripe Connect disburses $3,150 (90% net earnings) directly to creator bank account within 2 hours.",
    brandAssurance: "Complete financial receipt and tax documentation delivered automatically to accounting.",
    creatorAssurance: "Fastest payout SLA in the industry. Keep 90% of verified partnership earnings.",
  },
];

export function ProtectedEscrowFlow() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const activeStage = ESCROW_STAGES[activeStageIdx];

  return (
    <section className="py-20 sm:py-28 bg-[#FAFAFC] text-[#0A0A0E] select-none border-t border-black/8 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF5] border border-[#FFD21F]/50 text-xs font-mono font-bold text-[#0A0A0E] shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0A0A0E]" />
            <span>FINANCIAL TRUST ARCHITECTURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0E] tracking-tight font-display">
            Protected Milestone Escrow. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD21F] via-[#FFAE00] to-[#FFD21F]">
              Fair for Both Sides.
            </span>
          </h2>

          <p className="text-xs sm:text-base text-[#5A5A68] leading-relaxed">
            Replacing traditional 90-day invoice delays and unverified payment promises with automated milestone escrow custody.
          </p>
        </div>

        {/* Interactive Escrow Journey Canvas */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white border-2 border-black/8 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 sm:p-10 space-y-8 relative overflow-hidden">
          {/* Top Live Escrow Proof Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#FFFDF5] border border-[#FFD21F]/40 shadow-2xs">
            <div className="space-y-1 font-mono">
              <span className="text-[10px] uppercase text-[#7A7A8A] font-bold block">
                VERIFIED ESCROW ALLOCATION
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-[#0A0A0E] font-display">$3,500.00</span>
                <span className="text-xs text-[#6A6A78] font-sans font-medium">Held in Stripe Connect Custody</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-mono font-bold flex items-center gap-1.5 border border-emerald-300">
                <Lock className="w-3.5 h-3.5 text-emerald-700" /> 100% Pre-Funded Guarantee
              </span>
            </div>
          </div>

          {/* 5-Phase Horizontal Step Rail */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {ESCROW_STAGES.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setActiveStageIdx(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all font-mono space-y-1 ${
                  activeStageIdx === idx
                    ? "bg-[#0A0A0E] text-white border-[#0A0A0E] shadow-sm"
                    : "bg-[#F8F8FC] border-black/6 text-[#5A5A68] hover:bg-white hover:text-[#0A0A0E]"
                }`}
              >
                <span
                  className={`text-[9px] block uppercase font-bold ${
                    activeStageIdx === idx ? "text-[#FFD21F]" : "text-[#7A7A8A]"
                  }`}
                >
                  {st.phase}
                </span>
                <span className="text-xs font-bold font-sans block truncate">{st.title.split(" ")[0]} {st.title.split(" ")[1]}</span>
              </button>
            ))}
          </div>

          {/* Active Phase Card Details with Dual Assurances */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F8F8FC] border border-black/8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-black/6">
              <div>
                <span className="text-xs font-mono font-bold text-[#8A7000] block uppercase">
                  {activeStage.phase} • {activeStage.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] font-display">
                  {activeStage.title}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-xs font-mono font-extrabold shadow-2xs self-start sm:self-center">
                {activeStage.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#4A4A58] leading-relaxed font-sans">
              {activeStage.description}
            </p>

            {/* Dual Brand vs Creator Protection Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white border border-black/8 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E]">
                  <Building2 className="w-4 h-4 text-[#FFD21F]" />
                  <span>For Brands: Zero Upfront Risk</span>
                </div>
                <p className="text-xs text-[#5A5A68] leading-relaxed font-sans">
                  {activeStage.brandAssurance}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-black/8 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E]">
                  <Users className="w-4 h-4 text-[#087F5B]" />
                  <span>For Creators: Guaranteed Payout</span>
                </div>
                <p className="text-xs text-[#5A5A68] leading-relaxed font-sans">
                  {activeStage.creatorAssurance}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Financial Transparency Strip */}
          <div className="p-4 rounded-2xl bg-[#FAF9F5] border border-black/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3 text-[#5A5A68]">
              <span className="font-bold text-[#0A0A0E]">10% Flat Fee:</span>
              <span>Keep 90% net • Zero hidden credit card markups • Direct ACH / Wire</span>
            </div>
            <span className="text-[#087F5B] font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Escrow Guarantee SLA
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
