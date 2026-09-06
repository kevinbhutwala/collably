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

const LIFECYCLE_STEPS = [
  { id: "discover", label: "Discover" },
  { id: "match", label: "Match" },
  { id: "invite_apply", label: "Invite/Apply" },
  { id: "agreement", label: "Agreement" },
  { id: "fund", label: "Fund" },
  { id: "create", label: "Create" },
  { id: "submit", label: "Submit" },
  { id: "review", label: "Review" },
  { id: "approve", label: "Approve" },
  { id: "publish", label: "Publish" },
  { id: "verify", label: "Verify" },
  { id: "payout", label: "Payout" },
  { id: "feedback", label: "Review" },
];

export function TransactionLifecycleStepper({
  collaboration,
  role,
}: TransactionLifecycleStepperProps) {
  // Map collaboration state to 0-12 index
  const getCurrentStepIndex = (): number => {
    if (collaboration.status === "completed" || collaboration.paymentStatus === "paid") {
      return 12; // Completed & reviewed
    }
    if (collaboration.verificationProof?.verifiedAt) {
      return 11; // Payout in progress
    }
    if (collaboration.verificationProof?.postUrl) {
      return 10; // Verify live post
    }
    if (
      collaboration.paymentStatus === "approved" ||
      collaboration.status === "approved" ||
      collaboration.deliverables?.some((d) => d.status === "approved")
    ) {
      return 9; // Publish to live channel
    }
    if (
      collaboration.paymentStatus === "submitted_for_review" ||
      collaboration.status === "in_review"
    ) {
      return 7; // Reviewing submissions
    }
    if (collaboration.deliverables?.some((d) => d.status === "submitted")) {
      return 6; // Submitted
    }
    if (collaboration.isFunded && collaboration.paymentStatus === "payment_secured") {
      return 5; // Create in progress
    }
    if (collaboration.status === "active") {
      return 4; // Escrow funding
    }
    return 3; // Agreement signed
  };

  const currentIndex = getCurrentStepIndex();

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-[#F8F8FC] dark:bg-[#151520] border border-black/8 dark:border-white/10 space-y-5 select-none font-sans">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/6 dark:border-white/6">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#7A7A8A]">
            Transaction Lifecycle Engine
          </span>
          <h4 className="text-sm font-bold text-[#0A0A0E] dark:text-white flex items-center gap-2">
            <span>Milestone Status:</span>
            <span className="text-[#FFD21F] font-mono capitalize">
              {LIFECYCLE_STEPS[currentIndex]?.label} Stage ({currentIndex + 1}/13)
            </span>
          </h4>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-xs font-bold flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Escrow Protected: {formatCurrency(collaboration.totalAgreedBudget)}</span>
          </span>
        </div>
      </div>

      {/* ── 13-Stage Horizontal Stepper Track ── */}
      <div className="overflow-x-auto pb-2 scrollbar-none">
        <div className="flex items-center gap-1 min-w-[760px]">
          {LIFECYCLE_STEPS.map((step, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <React.Fragment key={step.id}>
                <div
                  className={cn(
                    "flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-xl transition-all shrink-0 text-center",
                    isCurrent
                      ? "bg-[#FFD21F] text-[#0A0A0E] font-black shadow-xs"
                      : isCompleted
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                      : "bg-white/50 dark:bg-white/5 text-[#8A8A9A] font-medium"
                  )}
                >
                  <span className="text-[9px] font-mono uppercase">
                    {idx + 1}. {step.label}
                  </span>
                </div>
                {idx < LIFECYCLE_STEPS.length - 1 && (
                  <div
                    className={cn(
                      "h-0.5 w-3 shrink-0 rounded-full",
                      idx < currentIndex ? "bg-emerald-500" : "bg-black/10 dark:bg-white/10"
                    )}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Distinct Role Status Clarity Callouts ── */}
      {role === "creator" ? (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center font-bold shrink-0 shadow-2xs">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#0A0A0E] dark:text-white font-display">
                When will I get paid?
              </h5>
              <p className="text-xs text-[#5A5A68] dark:text-[#C8C8DC] mt-0.5 leading-relaxed">
                Your payment of <strong className="text-[#0A0A0E] dark:text-white">{formatCurrency(collaboration.totalAgreedBudget)}</strong> is pre-funded in platform escrow custody. Once the brand reviews and approves your submission and live post is verified, funds release automatically to your account within 24 hours.
              </p>
            </div>
          </div>
          <div className="shrink-0 text-right sm:self-center">
            <span className="text-[10px] font-mono text-[#7A7A8A] block uppercase">Est. Release</span>
            <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              &le; 24h Post Verification
            </span>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold shrink-0 shadow-2xs">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#0A0A0E] dark:text-white font-display">
                What happens next?
              </h5>
              <p className="text-xs text-[#5A5A68] dark:text-[#C8C8DC] mt-0.5 leading-relaxed">
                {currentIndex <= 5
                  ? "Creator is currently producing your initial deliverable draft. You will receive an instant notification once uploaded for inspection."
                  : currentIndex === 6 || currentIndex === 7
                  ? "A deliverable draft is awaiting your review! Open the Review Studio to annotate frames or sign off on approval."
                  : "Content is approved. The creator is publishing live. Once live URL is submitted, automated verification confirms live status."}
              </p>
            </div>
          </div>
          <div className="shrink-0 text-right sm:self-center">
            <span className="text-[10px] font-mono text-[#7A7A8A] block uppercase">Next Action</span>
            <span className="text-xs font-mono font-bold text-blue-600 dark:text-blue-400">
              {currentIndex <= 5 ? "Awaiting Draft" : currentIndex <= 7 ? "Review Draft" : "Verify Live"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
