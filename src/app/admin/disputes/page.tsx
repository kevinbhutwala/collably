"use client";

import React, { useState, useEffect } from "react";
import { disputeService } from "@/services/dispute.service";
import { DisputeRecord } from "@/core/types";
import { Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";
import { Scale } from "lucide-react";

export default function AdminDisputesArbitrationPage() {
  const { addToast } = useUIStore();
  const [disputes, setDisputes] = useState<DisputeRecord[]>([]);
  const [selectedDispute, setSelectedDispute] = useState<DisputeRecord | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [isResolveModalOpen, setIsResolveModalOpen] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const data = await disputeService.getDisputes();
      setDisputes(data || []);
    };
    fetch();
  }, []);

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDispute) return;

    await disputeService.resolveDispute(selectedDispute.id, resolutionNotes);
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === selectedDispute.id
          ? { ...d, status: "Resolved", adminArbitrationNotes: resolutionNotes }
          : d
      )
    );

    addToast({
      type: "success",
      title: "Dispute Arbitrated",
      message: "Arbitration decision logged and escrow split executed.",
    });
    setIsResolveModalOpen(false);
    setResolutionNotes("");
  };

  return (
    <div className="space-y-8 text-[#0A0A0E] select-none">
      <div className="pb-6 border-b border-black/8">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Arbitration
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
          Escrow Dispute Arbitration &amp; Mediation
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
          Review evidence from brands and creators, issue legal arbitration findings, and unfreeze escrow funds.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
        <div className="divide-y divide-black/5 font-mono text-xs">
          {disputes.map((d) => (
            <div key={d.id} className="py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2 flex-1 font-sans">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#0A0A0E] font-display">{d.campaignTitle}</h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    d.status === "Resolved" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-amber-50 text-amber-800 border border-amber-200"
                  }`}>
                    {d.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-xs text-[#5A5A68]">
                  Brand: <strong className="text-[#0A0A0E]">{d.brandName}</strong> • Creator: <strong className="text-[#0A0A0E]">{d.creatorName}</strong>
                </p>
                <div className="p-3.5 rounded-2xl bg-[#F8F8FC] border border-black/5 text-xs text-[#5A5A68]">
                  <strong className="block mb-0.5 text-[#0A0A0E] font-display">Dispute Reason ({d.reason.replace(/_/g, " ")}):</strong>
                  {d.description}
                </div>
                {d.adminArbitrationNotes && (
                  <div className="p-3.5 rounded-2xl bg-white border border-black/8 text-[#0A0A0E] text-xs shadow-xs">
                    <strong className="text-[#0A0A0E]">Official Ruling:</strong> {d.adminArbitrationNotes}
                  </div>
                )}
              </div>

              <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 shrink-0 font-mono">
                <div>
                  <span className="text-[#7A7A8A] block text-[10px]">Frozen Escrow</span>
                  <span className="text-base font-extrabold text-[#0A0A0E]">
                    {formatCurrency(d.amountInDispute)}
                  </span>
                </div>

                {d.status !== "Resolved" && (
                  <button
                    onClick={() => {
                      setSelectedDispute(d);
                      setIsResolveModalOpen(true);
                    }}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10 flex items-center gap-1.5"
                  >
                    <Scale className="w-3.5 h-3.5 text-[#0A0A0E]" />
                    <span>Issue Arbitration Ruling</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={isResolveModalOpen}
        onClose={() => setIsResolveModalOpen(false)}
        title="Issue Official Arbitration Decision"
        description="This decision unfreezes escrow balances and updates platform trust scores."
        maxWidth="md"
      >
        <form onSubmit={handleResolve} className="space-y-4 text-[#0A0A0E]">
          <Textarea
            label="Arbitration Finding & Resolution Terms"
            value={resolutionNotes}
            onChange={(e) => setResolutionNotes(e.target.value)}
            placeholder="e.g. Creator submitted deliverables with minor delay; 10% fee reduction applied with $2,520 released to creator..."
            rows={4}
            required
          />
          <button type="submit" className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-bold shadow-xs border border-black/10">
            Log Ruling &amp; Release Escrow
          </button>
        </form>
      </Modal>
    </div>
  );
}
