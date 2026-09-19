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
    phase: "STEP 01",
    title: "Protected Payment Upfront",
    badge: "FUNDS SECURED",
    description: `The brand sets aside the project budget (${formatCurrency(3500)}) safely before content creation starts.`,
    brandAssurance: "Your budget stays protected. Money is only released when you approve the work.",
    creatorAssurance: "Guaranteed payment. You know the funds are already there before you film.",
  },
  {
    id: 1,
    phase: "STEP 02",
    title: "Draft Submission",
    badge: "WORK DELIVERED",
    description: "The creator shares a private preview link to their video draft and includes notes for the brand.",
    brandAssurance: "Review the full draft at your own pace with creator notes right beside it.",
    creatorAssurance: "Your delivery time is recorded and saved directly to the project timeline.",
  },
  {
    id: 2,
    phase: "STEP 03",
    title: "Clear Feedback & Edits",
    badge: "IN REVIEW",
    description: "The brand watches the draft, shares feedback, and can request small tweaks if needed.",
    brandAssurance: "Make sure the content meets your guidelines before you give final approval.",
    creatorAssurance: "Feedback is specific and clear, so you can make fast adjustments without guesswork.",
  },
  {
    id: 3,
    phase: "STEP 04",
    title: "1-Click Approval",
    badge: "APPROVED",
    description: "The brand clicks Approve. Commercial rights and final high-resolution files are unlocked right away.",
    brandAssurance: "Immediate rights to use the video across your marketing channels.",
    creatorAssurance: "Payment unlocks instantly upon approval with zero invoices to track down.",
  },
  {
    id: 4,
    phase: "STEP 05",
    title: "Fast Direct Deposit",
    badge: "PAID",
    description: `Payment of ${formatCurrency(3150)} (90% of the project fee) is sent straight to the creator’s bank account.`,
    brandAssurance: "Automatic receipt and invoice sent straight to your billing receipts.",
    creatorAssurance: "Fast payouts directly to your bank account. Keep 90% of what you earn.",
  },
];


export function ProtectedEscrowFlow() {
  const [activeStageIdx, setActiveStageIdx] = useState(0);
  const activeStage = ESCROW_STAGES[activeStageIdx];

  return (
    <section className="py-20 sm:py-28 bg-[#FAFAFC] dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8] select-none border-t border-black/8 dark:border-white/10 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF5] dark:bg-[#14141E] border border-[#FFD21F]/50 text-xs font-mono font-bold text-[#0A0A0E] dark:text-white shadow-2xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0A0A0E] dark:text-[#FFD21F]" />
            <span>SAFE PAYMENTS FOR BOTH SIDES</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0E] dark:text-white tracking-tight font-display">
            Safe, Guaranteed Payments. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD21F] via-[#FFAE00] to-[#FFD21F]">
              Fair for Everyone.
            </span>
          </h2>

          <p className="text-xs sm:text-base text-[#5A5A68] dark:text-[#8E8EA4] leading-relaxed">
            No more waiting 60–90 days for unpaid invoices or worrying if a partner will follow through. Funds are held safely and paid automatically.
          </p>
        </div>

        {/* Interactive Escrow Journey Canvas */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-white dark:bg-[#12121A] border-2 border-black/8 dark:border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.06)] p-6 sm:p-10 space-y-8 relative overflow-hidden">
          {/* Top Live Escrow Proof Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[#FFFDF5] dark:bg-[#1A1A28] border border-[#FFD21F]/40 shadow-2xs">
            <div className="space-y-1 font-mono">
              <span className="text-[10px] uppercase text-[#7A7A8A] dark:text-[#8E8EA4] font-bold block">
                VERIFIED ESCROW ALLOCATION
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-[#0A0A0E] dark:text-white font-display">{formatCurrency(3500)}</span>
                <span className="text-xs text-[#6A6A78] dark:text-[#8E8EA4] font-sans font-medium">Held in Stripe Connect Custody</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5 border border-emerald-300 dark:border-emerald-800">
                <Lock className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" /> 100% Pre-Funded Guarantee
              </span>
            </div>
          </div>

          {/* 5-Phase Horizontal Step Rail */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:grid sm:grid-cols-5 sm:gap-2.5 -mx-2 px-2 sm:mx-0 sm:px-0">
            {ESCROW_STAGES.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => setActiveStageIdx(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all font-mono space-y-1 shrink-0 min-w-[140px] sm:min-w-0 ${
                  activeStageIdx === idx
                    ? "bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] border-[#0A0A0E] dark:border-[#FFD21F] shadow-sm"
                    : "bg-[#F8F8FC] dark:bg-[#181824] border-black/6 dark:border-white/10 text-[#5A5A68] dark:text-[#8E8EA4] hover:bg-white dark:hover:bg-[#202030] hover:text-[#0A0A0E] dark:hover:text-white"
                }`}
              >
                <span
                  className={`text-[9px] block uppercase font-bold ${
                    activeStageIdx === idx ? "text-[#FFD21F] dark:text-[#0A0A0E]" : "text-[#7A7A8A] dark:text-[#8E8EA4]"
                  }`}
                >
                  {st.phase}
                </span>
                <span className="text-xs font-bold font-sans block truncate">{st.title.split(" ")[0]} {st.title.split(" ")[1]}</span>
              </button>
            ))}
          </div>

          {/* Active Phase Card Details with Dual Assurances */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/8 dark:border-white/10 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-black/6 dark:border-white/10">
              <div>
                <span className="text-xs font-mono font-bold text-[#8A7000] dark:text-[#FFD21F] block uppercase">
                  {activeStage.phase} • {activeStage.badge}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] dark:text-white font-display">
                  {activeStage.title}
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-xs font-mono font-extrabold shadow-2xs self-start sm:self-center">
                {activeStage.badge}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#4A4A58] dark:text-[#C8C8DC] leading-relaxed font-sans">
              {activeStage.description}
            </p>

            {/* Dual Brand vs Creator Protection Split */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white">
                  <Building2 className="w-4 h-4 text-[#FFD21F]" />
                  <span>For Brands: Zero Upfront Risk</span>
                </div>
                <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4] leading-relaxed font-sans">
                  {activeStage.brandAssurance}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white">
                  <Users className="w-4 h-4 text-[#087F5B]" />
                  <span>For Creators: Guaranteed Payout</span>
                </div>
                <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4] leading-relaxed font-sans">
                  {activeStage.creatorAssurance}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Financial Transparency Strip */}
          <div className="p-4 rounded-2xl bg-[#FAF9F5] dark:bg-[#14141E] border border-black/8 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3 text-[#5A5A68] dark:text-[#8E8EA4]">
              <span className="font-bold text-[#0A0A0E] dark:text-white">10% Flat Fee:</span>
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
