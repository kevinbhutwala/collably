"use client";

import React, { useState, useEffect } from "react";
import { disputeService } from "@/services/dispute.service";
import { DisputeRecord, DisputeResolutionOutcome } from "@/core/types";
import { Textarea, Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";
import {
  Scale,
  ShieldAlert,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  FileText,
  AlertTriangle,
} from "lucide-react";

export default function AdminDisputesArbitrationPage() {
  const { addToast } = useUIStore();
  const [disputes, setDisputes] = useState<DisputeRecord[]>([]);
  const [selectedDispute, setSelectedDispute] = useState<DisputeRecord | null>(null);

  // Resolution Modal State
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);
  const [resolutionOutcome, setResolutionOutcome] = useState<DisputeResolutionOutcome>("FULL_CREATOR_PAYOUT");
  const [brandRefundAmount, setBrandRefundAmount] = useState<number>(0);
  const [creatorPayoutAmount, setCreatorPayoutAmount] = useState<number>(0);
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchDisputes = async () => {
    try {
      const res = await fetch("/api/disputes", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setDisputes(data || []);
      }
    } catch {
      const fallback = await disputeService.getDisputes();
      setDisputes(fallback || []);
    }
  };

  useEffect(() => {
    fetchDisputes();
  }, []);

  const handleOutcomeChange = (outcome: DisputeResolutionOutcome) => {
    setResolutionOutcome(outcome);
    if (!selectedDispute) return;
    const total = selectedDispute.amountInDispute || 3500;

    switch (outcome) {
      case "FULL_CREATOR_PAYOUT":
        setCreatorPayoutAmount(total);
        setBrandRefundAmount(0);
        break;
      case "FULL_BRAND_REFUND":
      case "CANCELLATION_WITHOUT_PAYOUT":
        setCreatorPayoutAmount(0);
        setBrandRefundAmount(total);
        break;
      case "SPLIT_SETTLEMENT":
        setCreatorPayoutAmount(total / 2);
        setBrandRefundAmount(total / 2);
        break;
      case "PARTIAL_CREATOR_PAYOUT":
        setCreatorPayoutAmount(total * 0.7);
        setBrandRefundAmount(total * 0.3);
        break;
      case "ADDITIONAL_REVISION":
        setCreatorPayoutAmount(0);
        setBrandRefundAmount(0);
        break;
    }
  };

  const handleAdvanceStage = async (disputeId: string, nextStage: string) => {
    try {
      const res = await fetch("/api/disputes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "advance_stage",
          id: disputeId,
          stage: nextStage,
          adminNotes: `Stage advanced to ${nextStage} by administrator`,
        }),
      });
      if (!res.ok) throw new Error("Failed to advance stage");

      setDisputes((prev) =>
        prev.map((d) => (d.id === disputeId ? { ...d, stage: nextStage as any, status: nextStage as any } : d))
      );
      addToast({ type: "success", title: "Dispute Stage Advanced", message: `Stage set to ${nextStage}` });
    } catch (err: any) {
      addToast({ type: "error", title: "Stage Update Failed", message: err.message });
    }
  };

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDispute) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/disputes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "resolve",
          id: selectedDispute.id,
          outcome: resolutionOutcome,
          adminNotes: resolutionNotes,
          brandRefundDollars: brandRefundAmount,
          creatorPayoutDollars: creatorPayoutAmount,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to arbitrate dispute");

      addToast({
        type: "success",
        title: "Dispute Arbitrated & Settled",
        message: `Ruling issued (${resolutionOutcome}). Ledger balanced: Transaction ${json.transactionId || "complete"}.`,
      });
      setIsResolveModalOpen(false);
      setResolutionNotes("");
      fetchDisputes();
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Arbitration Failed",
        message: err.message || "Failed to execute dispute settlement.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const STAGES = ["Open", "Under_Review", "Evidence_Requested", "Decision", "Resolved"];

  return (
    <div className="space-y-8 text-[#0A0A0E] select-none">
      <div className="pb-6 border-b border-black/8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Tribunal &amp; Arbitration Desk
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
          5-Stage Dispute Arbitration Court
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
          Review claims, inspect evidence attachments, mandate revisions, and execute binding double-entry escrow settlements.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
        <div className="divide-y divide-black/5 font-mono text-xs">
          {disputes.length === 0 ? (
            <div className="py-12 text-center text-[#8A8A9A]">
              <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
              <p className="text-sm font-bold text-[#0A0A0E]">Zero Active Disputes</p>
              <p className="text-xs">All collaborations are operating within acceptable terms.</p>
            </div>
          ) : (
            disputes.map((d) => {
              const currentStage = d.stage || d.status;
              const isResolved = currentStage === "Resolved" || d.status === "Resolved";

              return (
                <div key={d.id} className="py-6 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="space-y-3 flex-1 font-sans">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-bold text-sm text-[#0A0A0E] font-display">{d.campaignTitle}</h4>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                        isResolved
                          ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                          : "bg-amber-50 text-amber-900 border-amber-300"
                      }`}>
                        Stage: {String(currentStage).replace(/_/g, " ")}
                      </span>
                      <span className="text-[10px] font-mono text-[#8A8A9A]">ID: {d.id}</span>
                    </div>

                    {/* 5-Stage Stepper Bar */}
                    <div className="flex items-center gap-1.5 pt-1">
                      {STAGES.map((s, idx) => {
                        const activeIdx = STAGES.indexOf(currentStage as string);
                        const isPastOrCurrent = activeIdx >= idx;
                        return (
                          <div key={s} className="flex items-center gap-1.5">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold ${
                              isPastOrCurrent
                                ? "bg-[#0A0A0E] text-white"
                                : "bg-black/5 text-[#8A8A9A]"
                            }`}>
                              {s.replace(/_/g, " ")}
                            </span>
                            {idx < STAGES.length - 1 && (
                              <ArrowRight className="w-2.5 h-2.5 text-[#8A8A9A]" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <p className="text-xs text-[#5A5A68]">
                      Brand: <strong className="text-[#0A0A0E]">{d.brandName}</strong> • Creator: <strong className="text-[#0A0A0E]">{d.creatorName}</strong>
                    </p>

                    <div className="p-3.5 rounded-2xl bg-[#F8F8FC] border border-black/5 text-xs text-[#5A5A68] space-y-1">
                      <strong className="block text-[#0A0A0E] font-display">Dispute Reason: {d.reason.replace(/_/g, " ")}</strong>
                      <p>{d.description}</p>
                    </div>

                    {/* Evidence links / attachments */}
                    {d.evidenceLinks && d.evidenceLinks.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono font-bold text-[#6A6A78] uppercase">Evidence Links</span>
                        <div className="flex flex-wrap gap-2">
                          {d.evidenceLinks.map((link, i) => (
                            <a
                              key={i}
                              href={link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 py-1 rounded-md bg-[#F8F8FC] border border-black/10 text-[11px] font-mono hover:underline flex items-center gap-1"
                            >
                              <span>Evidence #{i + 1}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {d.resolutionDetails && (
                      <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                        <strong className="block font-bold">Official Ruling ({d.resolutionDetails.outcome}):</strong>
                        <p>{d.resolutionDetails.notes}</p>
                        <div className="text-[10px] font-mono text-emerald-800 pt-1">
                          Brand Refund: {formatCurrency(d.resolutionDetails.brandRefundDollars)} • Creator Payout: {formatCurrency(d.resolutionDetails.creatorPayoutDollars)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Column */}
                  <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 shrink-0 font-mono">
                    <div>
                      <span className="text-[#7A7A8A] block text-[10px]">Frozen Escrow</span>
                      <span className="text-base font-extrabold text-[#0A0A0E]">
                        {formatCurrency(d.amountInDispute)}
                      </span>
                    </div>

                    {!isResolved && (
                      <div className="space-y-2">
                        {currentStage !== "Decision" && (
                          <button
                            onClick={() => {
                              const currentIdx = STAGES.indexOf(currentStage as string);
                              const nextStage = STAGES[Math.min(STAGES.length - 2, currentIdx + 1)];
                              handleAdvanceStage(d.id, nextStage);
                            }}
                            className="w-full px-3 py-1.5 rounded-full bg-[#F8F8FC] hover:bg-black/5 text-[#0A0A0E] border border-black/10 text-xs font-bold transition-all"
                          >
                            Advance Stage
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setSelectedDispute(d);
                            handleOutcomeChange("FULL_CREATOR_PAYOUT");
                            setIsResolveModalOpen(true);
                          }}
                          className="w-full px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10 flex items-center justify-center gap-1.5"
                        >
                          <Scale className="w-3.5 h-3.5 text-[#0A0A0E]" />
                          <span>Issue Ruling</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 6-Outcome Arbitration Modal */}
      <Modal
        isOpen={isResolveModalOpen}
        onClose={() => setIsResolveModalOpen(false)}
        title="Issue Binding Arbitration Ruling"
        description="Select from 6 standardized legal outcomes and execute automated double-entry ledger settlement."
      >
        <form onSubmit={handleResolve} className="space-y-4 text-[#0A0A0E]">
          {selectedDispute && (
            <div className="p-3.5 rounded-xl bg-[#F8F8FC] border border-black/10 text-xs space-y-1">
              <div>Campaign: <strong>{selectedDispute.campaignTitle}</strong></div>
              <div>Escrow in Dispute: <strong>{formatCurrency(selectedDispute.amountInDispute)}</strong></div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-mono font-bold text-[#6A6A78]">Resolution Outcome</label>
            <select
              value={resolutionOutcome}
              onChange={(e) => handleOutcomeChange(e.target.value as DisputeResolutionOutcome)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-black/15 text-xs font-sans text-[#0A0A0E] font-medium"
            >
              <option value="FULL_CREATOR_PAYOUT">1. Full Creator Payout (100% to creator, 0% to brand)</option>
              <option value="PARTIAL_CREATOR_PAYOUT">2. Partial Creator Payout (e.g. 70% to creator, 30% to brand)</option>
              <option value="FULL_BRAND_REFUND">3. Full Brand Refund (100% refund to brand, 0% to creator)</option>
              <option value="SPLIT_SETTLEMENT">4. Split Settlement (50/50 mutual split)</option>
              <option value="ADDITIONAL_REVISION">5. Mandate Additional Revision (Return to production)</option>
              <option value="CANCELLATION_WITHOUT_PAYOUT">6. Cancellation Without Payout (Breach penalty on creator)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#F8F8FC] border border-black/10 text-xs font-mono">
            <div>
              <span className="text-[#6A6A78] block">Brand Refund</span>
              <span className="font-extrabold text-[#0A0A0E]">{formatCurrency(brandRefundAmount)}</span>
            </div>
            <div>
              <span className="text-[#6A6A78] block">Creator Payout</span>
              <span className="font-extrabold text-emerald-700">{formatCurrency(creatorPayoutAmount)}</span>
            </div>
          </div>

          <Textarea
            label="Official Finding & Legal Explanation"
            value={resolutionNotes}
            onChange={(e) => setResolutionNotes(e.target.value)}
            placeholder="Detail the rationale for this finding based on contract terms, delivery logs, and platform policies..."
            rows={4}
            required
          />

          <button
            type="submit"
            disabled={isSubmitting || !resolutionNotes.trim()}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-black transition-all shadow-xs border border-black/10 disabled:opacity-50"
          >
            {isSubmitting ? "Executing Settlement..." : "Sign Ruling & Execute Ledger Settlement"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
