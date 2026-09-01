"use client";

import React, { useState } from "react";
import { NegotiationOffer } from "@/core/types";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { formatCurrency } from "@/core/utils/formatters";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { CheckCircle2, Plus } from "lucide-react";

export function NegotiationTimeline({
  initialOffers = [],
  currentFee = 3500,
  onAcceptOffer,
}: {
  initialOffers?: NegotiationOffer[];
  currentFee?: number;
  onAcceptOffer?: (amount: number) => void;
}) {
  const { user, role } = useAuthStore();
  const { addToast } = useUIStore();

  const [offers, setOffers] = useState<NegotiationOffer[]>(
    initialOffers.length > 0
      ? initialOffers
      : [
          {
            id: "off-1",
            senderRole: "creator",
            senderName: "Elena Rostova",
            amount: 3800,
            deliverableTerms: "1x YouTube 60s + 1x X Thread",
            notes: "My standard rate for high-retention technical audiences.",
            status: "countered",
            createdAt: "2026-08-18 10:00",
          },
          {
            id: "off-2",
            senderRole: "brand",
            senderName: "Linear Marketing",
            amount: 3200,
            deliverableTerms: "1x YouTube 60s + 1x X Thread + 30-Day Paid Usage",
            notes: "We have budget flexibility if 30-day paid ad whitelisting is included.",
            status: "countered",
            createdAt: "2026-08-19 14:30",
          },
          {
            id: "off-3",
            senderRole: "creator",
            senderName: "Elena Rostova",
            amount: 3500,
            deliverableTerms: "1x YouTube 60s + 1x X Thread + 30-Day Organic Rights",
            notes: "Final compromise rate with fast 7-day turnaround delivery.",
            status: "accepted",
            createdAt: "2026-08-20 09:15",
          },
        ]
  );

  const [showCounterForm, setShowCounterForm] = useState(false);
  const [counterAmount, setCounterAmount] = useState(currentFee);
  const [counterTerms, setCounterTerms] = useState("1x YouTube 60s Integration");
  const [counterNotes, setCounterNotes] = useState("");

  const handleSendCounter = (e: React.FormEvent) => {
    e.preventDefault();
    const newOffer: NegotiationOffer = {
      id: `off-${Date.now()}`,
      senderRole: role,
      senderName: user?.name || "Participant",
      amount: counterAmount,
      deliverableTerms: counterTerms,
      notes: counterNotes || "Counter proposal submitted.",
      status: "offered",
      createdAt: "Just now",
    };

    setOffers((prev) => [...prev, newOffer]);
    setShowCounterForm(false);
    addToast({
      type: "success",
      title: "Counter Offer Sent",
      message: `Proposed ${formatCurrency(counterAmount)} with customized terms.`,
    });
  };

  const handleAccept = (offerId: string, amount: number) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, status: "accepted" } : o))
    );
    if (onAcceptOffer) onAcceptOffer(amount);
    addToast({
      type: "success",
      title: "Deal Terms Accepted",
      message: `Escrow adjusted to ${formatCurrency(amount)}.`,
    });
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6 text-[#0A0A0E]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/8">
        <div>
          <h3 className="text-lg font-bold text-[#0A0A0E] font-display">Structured Terms &amp; Negotiation History</h3>
          <p className="text-xs text-[#5A5A68] font-sans">
            Immutable audit record of proposals, counter-offers, and agreed deliverable scope.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowCounterForm(!showCounterForm)}
          leftIcon={<Plus className="w-3.5 h-3.5 text-[#0A0A0E]" />}
          className="rounded-full"
        >
          {showCounterForm ? "Cancel Counter" : "Submit Counter Offer"}
        </Button>
      </div>

      {/* Offer History Cards */}
      <div className="space-y-4">
        {offers.map((off) => {
          const isAccepted = off.status === "accepted";
          return (
            <div
              key={off.id}
              className={`p-5 rounded-2xl border transition-all ${
                isAccepted
                  ? "bg-[#F8F8FC] border-black/8 shadow-xs"
                  : "bg-[#F8F8FC] border-black/5"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-white border border-black/8 text-[#0A0A0E] text-[10px] font-bold">
                    {off.senderRole.toUpperCase()}
                  </span>
                  <strong className="font-sans text-sm text-[#0A0A0E]">{off.senderName}</strong>
                  <span className="text-[#6A6A78]">• {off.createdAt}</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-base font-extrabold text-[#0A0A0E] font-mono">
                    {formatCurrency(off.amount)}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                    isAccepted ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : off.status === "countered" ? "bg-black/5 text-[#5A5A68]" : "bg-amber-50 text-amber-800 border border-amber-200"
                  }`}>
                    {off.status.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#0A0A0E] font-semibold mb-1 font-sans">
                Scope: {off.deliverableTerms}
              </p>
              <p className="text-xs text-[#5A5A68] font-sans leading-relaxed">
                Note: {off.notes}
              </p>

              {off.status === "offered" && off.senderRole !== role && (
                <div className="pt-3 border-t border-black/5 mt-3 flex justify-end gap-2">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAccept(off.id, off.amount)}
                    leftIcon={<CheckCircle2 className="w-3.5 h-3.5 text-[#0A0A0E]" />}
                    className="rounded-full"
                  >
                    Accept Offer
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Counter Form Drawer */}
      {showCounterForm && (
        <form onSubmit={handleSendCounter} className="p-6 rounded-2xl bg-[#F8F8FC] border border-black/8 space-y-4">
          <h4 className="text-sm font-bold text-[#0A0A0E] font-display">Draft Structured Counter Offer</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Proposed Fee ($ USD)"
              type="number"
              value={counterAmount}
              onChange={(e) => setCounterAmount(parseInt(e.target.value) || 0)}
              required
            />
            <Input
              label="Deliverable Scope / Terms"
              value={counterTerms}
              onChange={(e) => setCounterTerms(e.target.value)}
              placeholder="e.g. 1x YouTube 60s + 2x Story Sets"
              required
            />
          </div>

          <Textarea
            label="Negotiation Notes / Rationale"
            value={counterNotes}
            onChange={(e) => setCounterNotes(e.target.value)}
            placeholder="Explain changes in turnaround speed, usage rights, or deliverable adjustments..."
            rows={3}
          />

          <Button variant="primary" size="md" type="submit" className="rounded-full">
            Send Official Counter Offer
          </Button>
        </form>
      )}
    </div>
  );
}
