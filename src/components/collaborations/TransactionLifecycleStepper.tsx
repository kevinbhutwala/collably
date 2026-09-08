"use client";

import React from "react";
import { Collaboration } from "@/core/types";
import { formatCurrency } from "@/core/utils/formatters";
import {
  ShieldCheck,
  Clock,
  CheckCircle2,
  DollarSign,
  Send,
  Eye,
  FileCheck2,
  ArrowRight,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionLifecycleStepperProps {
  collaboration: Collaboration;
  role: "creator" | "brand" | "agency_admin";
}

const CORE_PHASES = [
  { id: "agreement", stepNumber: 1, label: "Agreement", description: "Terms Confirmed" },
  { id: "escrow", stepNumber: 2, label: "Escrow Vault", description: "Funds Pre-Locked" },
  { id: "creation", stepNumber: 3, label: "Content Draft", description: "In Production" },
  { id: "review", stepNumber: 4, label: "Brand Review", description: "Feedback & Sign-off" },
  { id: "payout", stepNumber: 5, label: "Live & Paid", description: "Payment Released" },
];

export function TransactionLifecycleStepper({
  collaboration,
  role,
}: TransactionLifecycleStepperProps) {
  // Map collaboration state to 0..4 phase index
  const getCurrentPhaseIndex = (): number => {
    if (collaboration.status === "completed" || collaboration.paymentStatus === "paid") {
      return 4; // Phase 5: Live & Paid
    }
    if (collaboration.verificationProof?.status === "verified" || collaboration.verificationProof?.postUrl) {
      return 4; // Phase 5: Live & Paid
    }
    if (
      collaboration.paymentStatus === "approved" ||
      collaboration.status === "approved" ||
      collaboration.deliverables?.some((d) => d.status === "approved")
    ) {
      return 3; // Phase 4: Brand Review (Approved/Finalizing)
    }
    if (
      collaboration.paymentStatus === "submitted_for_review" ||
      collaboration.status === "in_review" ||
      collaboration.deliverables?.some((d) => d.status === "submitted" || d.status === "under_review" || d.status === "revision_requested")
    ) {
      return 3; // Phase 4: Brand Review
    }
    if (collaboration.isFunded && collaboration.paymentStatus === "payment_secured") {
      return 2; // Phase 3: Content Draft in creation
    }
    if (collaboration.isFunded) {
      return 2; // Phase 3: Draft creation
    }
    if (collaboration.status === "active" && !collaboration.isFunded) {
      return 1; // Phase 2: Escrow deposit pending
    }
    return 0; // Phase 1: Agreement
  };

  const currentPhase = getCurrentPhaseIndex();
  const currentStep = CORE_PHASES[currentPhase];
  const progressPercent = Math.min(100, Math.round(((currentPhase + 1) / CORE_PHASES.length) * 100));

  return (
    <div className="p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-xs space-y-4 sm:space-y-5 select-none font-sans">
      {/* ── Top Header Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-black/6 dark:border-white/6">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7A7A8A] dark:text-[#8E8EA4] block">
            Project Milestone Tracker
          </span>
          <h4 className="text-sm font-bold text-[#0A0A0E] dark:text-white flex items-center gap-2">
            <span>Current Stage:</span>
            <span className="text-[#8A6500] dark:text-[#FFD21F] font-mono font-bold">
              {currentStep.label} ({currentPhase + 1} of {CORE_PHASES.length})
            </span>
          </h4>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="px-2.5 sm:px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-mono text-[11px] sm:text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Escrow Protected: {formatCurrency(collaboration.totalAgreedBudget)}</span>
          </span>
        </div>
      </div>

      {/* ── Desktop View: 5-Phase Horizontal Stepper Track (Hidden on Mobile) ── */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-5 gap-2 relative">
          {CORE_PHASES.map((phase, idx) => {
            const isCompleted = idx < currentPhase;
            const isCurrent = idx === currentPhase;

            return (
              <div key={phase.id} className="flex flex-col items-center text-center relative group">
                {/* Connecting Line */}
                {idx < CORE_PHASES.length - 1 && (
                  <div
                    className={cn(
                      "absolute top-4 left-1/2 w-full h-0.5 -z-0 transition-colors",
                      idx < currentPhase ? "bg-emerald-500" : "bg-black/10 dark:bg-white/10"
                    )}
                  />
                )}

                {/* Circle Icon Badge */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-black z-10 transition-all shadow-2xs",
                    isCurrent
                      ? "bg-gradient-to-r from-[#FFD21F] to-[#FFE052] text-[#0A0A0E] ring-4 ring-[#FFD21F]/20 scale-105"
                      : isCompleted
                      ? "bg-emerald-500 text-white"
                      : "bg-[#F4F4F8] dark:bg-white/5 text-[#8A8A9A] dark:text-[#6A6A78] border border-black/8 dark:border-white/8"
                  )}
                >
                  {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : phase.stepNumber}
                </div>

                {/* Text Labels */}
                <div className="mt-2 space-y-0.5">
                  <span
                    className={cn(
                      "text-xs font-bold block leading-tight",
                      isCurrent
                        ? "text-[#0A0A0E] dark:text-white"
                        : isCompleted
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-[#8A8A9A] dark:text-[#6A6A78]"
                    )}
                  >
                    {phase.label}
                  </span>
                  <span className="text-[10px] font-mono text-[#7A7A8A] dark:text-[#8E8EA4] block">
                    {phase.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Mobile View: Compact Progress Bar (Shown only on Mobile <640px) ── */}
      <div className="block sm:hidden space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-bold text-[#0A0A0E] dark:text-white">
            Step {currentPhase + 1} of 5: {currentStep.label}
          </span>
          <span className="text-emerald-700 dark:text-emerald-400 font-bold">{progressPercent}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-black/6 dark:bg-white/10 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FFD21F] to-emerald-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] pt-0.5">
          {currentStep.description}
        </p>
      </div>

      {/* ── Distinct Role Status Clarity Callouts ── */}
      {role === "creator" ? (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF5] dark:bg-[#1A1A28] border border-[#FFD21F]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] flex items-center justify-center font-bold shrink-0 shadow-2xs border border-black/10">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#0A0A0E] dark:text-white font-display">
                When will I get paid?
              </h5>
              <p className="text-xs text-[#5A5A68] dark:text-[#C8C8DC] mt-0.5 leading-relaxed font-sans">
                Your payment of <strong className="text-[#0A0A0E] dark:text-white">{formatCurrency(collaboration.totalAgreedBudget)}</strong> is pre-funded in platform escrow custody. Once the brand reviews and approves your submission and live post is verified, funds release automatically to your account within 24 hours.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-left sm:text-right sm:self-center font-mono pt-1 sm:pt-0 border-t sm:border-t-0 border-black/6">
            <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] block uppercase font-bold">Release Guarantee</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              24h Post Verification
            </span>
          </div>
        </div>
      ) : (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FFFDF5] dark:bg-[#1A1A28] border border-[#FFD21F]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] flex items-center justify-center font-bold shrink-0 shadow-2xs">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#0A0A0E] dark:text-white font-display">
                What happens next?
              </h5>
              <p className="text-xs text-[#5A5A68] dark:text-[#C8C8DC] mt-0.5 leading-relaxed font-sans">
                {currentPhase <= 1
                  ? "Escrow deposit is needed so the creator can begin producing your deliverable draft."
                  : currentPhase === 2
                  ? "Creator is currently producing your initial deliverable draft. You will receive an instant notification once uploaded for inspection."
                  : currentPhase === 3
                  ? "A deliverable draft is awaiting your review! Open the Review Studio to annotate frames or sign off on approval."
                  : "Content is approved. The creator is publishing live. Once live URL is submitted, automated verification confirms live status."}
              </p>
            </div>
          </div>
          <div className="shrink-0 text-left sm:text-right sm:self-center font-mono pt-1 sm:pt-0 border-t sm:border-t-0 border-black/6">
            <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] block uppercase font-bold">Next Action</span>
            <span className="text-xs font-bold text-[#8A6500] dark:text-[#FFD21F]">
              {currentPhase <= 1 ? "Fund Escrow" : currentPhase === 2 ? "Awaiting Draft" : currentPhase === 3 ? "Review Draft" : "Verify Live"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
