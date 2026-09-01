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
      setContacts(data);
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
    <div className="space-y-8 text-white select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-white/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Talent Operations
            </span>
            <span className="text-white/20">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#FFD21F] font-mono text-[10px] font-bold">
              Creator Pipeline CRM
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Creator Relationship Management
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
            Track talent across discovery, outreach, contract stages, and record private agency evaluation notes.
          </p>
        </div>

        {/* Stage Filter */}
        <div className="flex items-center gap-1.5 p-1 bg-white/[0.04] rounded-full border border-white/10 text-xs font-semibold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setSelectedStage("all")}
            className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
              selectedStage === "all"
                ? "bg-[#FFD21F] text-[#0A0A0E] shadow-[0_0_12px_rgba(255,210,31,0.45)] font-bold border border-white/40"
                : "text-white/60 hover:text-white"
            }`}
          >
            All ({contacts.length})
          </button>
          {stages.map((s) => (
            <button
              key={s.key}
              onClick={() => setSelectedStage(s.key)}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all whitespace-nowrap ${
                selectedStage === s.key
                  ? "bg-[#FFD21F] text-[#0A0A0E] shadow-[0_0_12px_rgba(255,210,31,0.45)] font-bold border border-white/40"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* CRM Contact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((c) => (
          <div
            key={c.id}
            className="p-6 rounded-3xl bg-[#101018] border border-white/10 hover:border-[#FFD21F]/40 transition-all space-y-4 flex flex-col justify-between shadow-2xl backdrop-blur-xl"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                    <SafeImage
                      src={c.creator.avatarUrl}
                      alt={c.creator.fullName}
                      fallbackType="creator"
                      fallbackName={c.creator.fullName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white font-display">{c.creator.fullName}</h3>
                    <p className="text-xs text-white/50 font-mono">@{c.creator.handle}</p>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 text-[10px] font-mono font-bold uppercase">
                  {c.creator.primaryCategory}
                </span>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono">
                <div>
                  <span className="text-[10px] text-white/40 block">Audience Reach</span>
                  <span className="font-bold text-white text-sm">{formatNumber(c.creator.totalFollowers)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block">Starting Rate</span>
                  <span className="font-bold text-[#FFD21F] text-sm">{formatCurrency(c.creator.startingPrice)}</span>
                </div>
              </div>

              {/* Stage Selector */}
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-white/80 font-mono">Pipeline Stage:</label>
                <select
                  value={c.stage}
                  onChange={(e) => handleStageChange(c.id, e.target.value as CRMStage)}
                  className="w-full bg-white/[0.05] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  {stages.map((s) => (
                    <option key={s.key} value={s.key} className="bg-[#101018]">
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recent Internal Notes */}
              {c.privateNotes.length > 0 && (
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs text-white/60 space-y-1">
                  <span className="font-bold text-[#FFD21F] flex items-center gap-1 text-[11px]">
                    <FileText className="w-3.5 h-3.5 text-[#FFD21F]" />
                    Latest Note:
                  </span>
                  <p className="line-clamp-2 italic font-sans">&quot;{c.privateNotes[0].content}&quot;</p>
                </div>
              )}
            </div>

            <div className="pt-2 flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedContact(c);
                  setIsNoteModalOpen(true);
                }}
                className="flex-1 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Note</span>
              </button>
              <Link href="/app/messages" className="flex-1">
                <button className="w-full py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-md">
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
        <form onSubmit={handleAddNote} className="space-y-4 text-white">
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
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-bold shadow-[0_0_15px_rgba(255,210,31,0.4)]"
          >
            Save Internal Note
          </button>
        </form>
      </Modal>
    </div>
  );
}
