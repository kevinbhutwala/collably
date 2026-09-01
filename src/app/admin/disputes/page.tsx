"use client";

import React, { useState, useEffect } from "react";
import { disputeService } from "@/services/dispute.service";
import { DisputeRecord } from "@/core/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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
      setDisputes(data);
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
    <div className="space-y-8 text-[#111111]">
      <div className="pb-6 border-b border-[#E7E7E4]">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
            Arbitration
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
          Escrow Dispute Arbitration &amp; Mediation
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
          Review evidence from brands and creators, issue legal arbitration findings, and unfreeze escrow funds.
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
        <div className="divide-y divide-[#E7E7E4] font-mono text-xs">
          {disputes.map((d) => (
            <div key={d.id} className="py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-2 flex-1 font-sans">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-[#111111] font-display">{d.campaignTitle}</h4>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                    d.status === "Resolved" ? "bg-[#B7FF3C] text-[#111111]" : "bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A]"
                  }`}>
                    {d.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-xs text-[#6B6B6B]">
                  Brand: <strong className="text-[#111111]">{d.brandName}</strong> • Creator: <strong className="text-[#111111]">{d.creatorName}</strong>
                </p>
                <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-xs text-[#6B6B6B]">
                  <strong className="block mb-0.5 text-[#111111] font-display">Dispute Reason ({d.reason.replace(/_/g, " ")}):</strong>
                  {d.description}
                </div>
                {d.adminArbitrationNotes && (
                  <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] text-xs">
                    <strong>Official Ruling:</strong> {d.adminArbitrationNotes}
                  </div>
                )}
              </div>

              <div className="flex lg:flex-col items-center lg:items-end justify-between gap-4 shrink-0 font-mono">
                <div>
                  <span className="text-[#6B6B6B] block text-[10px]">Frozen Escrow</span>
                  <span className="text-base font-extrabold text-[#111111]">
                    {formatCurrency(d.amountInDispute)}
                  </span>
                </div>

                {d.status !== "Resolved" && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setSelectedDispute(d);
                      setIsResolveModalOpen(true);
                    }}
                    leftIcon={<Scale className="w-3.5 h-3.5 text-[#B7FF3C]" />}
                    className="rounded-[9px]"
                  >
                    Issue Arbitration Ruling
                  </Button>
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
        <form onSubmit={handleResolve} className="space-y-4 text-[#111111]">
          <Textarea
            label="Arbitration Finding & Resolution Terms"
            value={resolutionNotes}
            onChange={(e) => setResolutionNotes(e.target.value)}
            placeholder="e.g. Creator submitted deliverables with minor delay; 10% fee reduction applied with $2,520 released to creator..."
            rows={4}
            required
          />
          <Button variant="primary" size="md" type="submit" className="w-full rounded-[9px]">
            Log Ruling &amp; Release Escrow
          </Button>
        </form>
      </Modal>
    </div>
  );
}
