"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { crmService } from "@/services/crm.service";
import { CRMContact, CRMStage } from "@/core/types";
import { Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";
import { FeatureGate } from "@/components/subscriptions/FeatureGate";
import { Plus, FileText } from "lucide-react";


export default function BrandCRMPage() {
  const { addToast } = useUIStore();
  const [contacts, setContacts] = useState<CRMContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<CRMContact | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [selectedStage, setSelectedStage] = useState<CRMStage | "all">("all");

  useEffect(() => {
    const fetch = async () => {
      const data = await crmService.getContacts("brand-1");
      setContacts(data || []);
    };
    fetch();
  }, []);

  const handleStageChange = async (contactId: string, stage: CRMStage) => {
    await crmService.updateStage(contactId, stage);
    setContacts((prev) =>
      prev.map((c) => (c.id === contactId ? { ...c, stage } : c))
    );
    addToast({
      type: "success",
      title: "CRM Stage Updated",
      message: `Creator moved to ${stage.replace(/_/g, " ")}.`,
    });
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedContact || !newNote.trim()) return;

    await crmService.addNote(selectedContact.id, "Sarah (Growth Lead)", newNote);
    const updatedNotes = [
      {
        id: `note-${Date.now()}`,
        authorName: "Sarah (Growth Lead)",
        content: newNote,
        createdAt: "Just now",
      },
      ...selectedContact.privateNotes,
    ];

    setContacts((prev) =>
      prev.map((c) => (c.id === selectedContact.id ? { ...c, privateNotes: updatedNotes } : c))
    );
    setSelectedContact((prev) => (prev ? { ...prev, privateNotes: updatedNotes } : null));
    setNewNote("");
    setIsNoteModalOpen(false);
    addToast({
      type: "success",
      title: "Private Note Saved",
      message: "Internal team evaluation logged to creator record.",
    });
  };

  const stages: { key: CRMStage; label: string }[] = [
    { key: "Prospect", label: "Discovery Leads" },
    { key: "Outreach", label: "Outreach Sent" },
    { key: "Negotiating", label: "Brief Negotiation" },
    { key: "Active_Partner", label: "Escrow Locked" },
    { key: "Preferred", label: "Preferred Partner" },
  ];

  const filtered = selectedStage === "all" ? contacts : contacts.filter((c) => c.stage === selectedStage);

  return (
    <FeatureGate
      feature="crmPipeline"
      requiredPlanId="brand_growth"
      title="Creator CRM Pipeline"
      description="Track talent pipelines across discovery, outreach, and escrow stages with private team notes."
    >
      <div className="space-y-6 text-[#0A0A0E] select-none">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Talent Operations
              </span>
              <span className="text-[#8A8A9A]">•</span>
              <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
                Pipeline CRM
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
              Creator CRM
            </h1>
            <p className="text-xs sm:text-sm text-[#5A5A68]">
              Manage creator relationships, pipeline stages, and private notes.
            </p>
          </div>
        </div>

        {/* Pipeline Stage Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 no-scrollbar">
          <button
            onClick={() => setSelectedStage("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all shrink-0 ${
              selectedStage === "all"
                ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs border border-black/10"
                : "bg-white border border-black/8 text-[#5A5A68] hover:text-[#0A0A0E]"
            }`}
          >
            All ({contacts.length})
          </button>
          {stages.map((st) => {
            const count = contacts.filter((c) => c.stage === st.key).length;
            return (
              <button
                key={st.key}
                onClick={() => setSelectedStage(st.key)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedStage === st.key
                    ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs border border-black/10"
                    : "bg-white border border-black/8 text-[#5A5A68] hover:text-[#0A0A0E]"
                }`}
              >
                <span>{st.label}</span>
                <span className="text-[10px] opacity-75">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <div
              key={c.id}
              className="rounded-3xl bg-white border border-black/8 p-6 shadow-xs space-y-4 flex flex-col justify-between hover:border-black/15 transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <SafeImage
                      src={c.creator.avatarUrl}
                      alt={c.creator.fullName}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-2xl object-cover border border-black/10"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-[#0A0A0E] font-display">
                        {c.creator.fullName}
                      </h3>
                      <p className="text-xs text-[#7A7A8A] font-mono">{c.creator.handle}</p>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] border border-[#FFD21F]/40 uppercase">
                    {c.stage.replace(/_/g, " ")}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-black/5">
                  <div>
                    <span className="text-[#8A8A9A] text-[10px] block">Total Paid</span>
                    <span className="font-bold text-[#0A0A0E]">{formatCurrency(c.creator.startingPrice)}</span>
                  </div>
                  <div>
                    <span className="text-[#8A8A9A] text-[10px] block">Audience Reach</span>
                    <span className="font-bold text-[#0A0A0E]">{formatNumber(c.creator.totalFollowers)}</span>
                  </div>
                </div>

                {/* Stage Select */}
                <div className="space-y-1 pt-1">
                  <label className="text-[10px] font-mono text-[#7A7A8A] uppercase font-bold">
                    Move Stage
                  </label>
                  <select
                    value={c.stage}
                    onChange={(e) => handleStageChange(c.id, e.target.value as CRMStage)}
                    className="w-full text-xs font-sans rounded-xl border border-black/10 px-3 py-2 bg-[#F8F8FC] text-[#0A0A0E] focus:outline-none focus:border-black"
                  >
                    {stages.map((st) => (
                      <option key={st.key} value={st.key}>
                        {st.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Private Notes Preview */}
                {c.privateNotes && c.privateNotes.length > 0 && (
                  <div className="p-3 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-1">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#7A7A8A] font-bold uppercase">
                      <FileText className="w-3 h-3 text-[#FFD21F]" />
                      <span>Latest Private Note</span>
                    </div>
                    <p className="text-xs text-[#4A4A58] italic line-clamp-2">
                      &ldquo;{c.privateNotes[0].content}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedContact(c);
                    setIsNoteModalOpen(true);
                  }}
                  className="flex-1 py-2 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-black/5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Note</span>
                </button>
                <Link href="/app/messages" className="flex-1">
                  <button className="w-full py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs">
                    Message
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Note Modal */}
        <Modal
          isOpen={isNoteModalOpen}
          onClose={() => setIsNoteModalOpen(false)}
          title={`Internal Notes: ${selectedContact?.creator.fullName}`}
          description="Private notes visible only to your team and account executives."
          maxWidth="md"
        >
          <form onSubmit={handleAddNote} className="space-y-4 text-[#0A0A0E]">
            <Textarea
              label="Note Content"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Add internal evaluation feedback, past performance records, or negotiation status..."
              rows={4}
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-bold shadow-xs border border-black/10"
            >
              Save Internal Note
            </button>
          </form>
        </Modal>
      </div>
    </FeatureGate>
  );
}
