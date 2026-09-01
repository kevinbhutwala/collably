"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { crmService } from "@/services/crm.service";
import { CRMContact, CRMStage } from "@/core/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";
import {
  Plus,
  FileText,
} from "lucide-react";

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

    setSelectedContact({ ...selectedContact, privateNotes: updatedNotes });
    setContacts((prev) =>
      prev.map((c) =>
        c.id === selectedContact.id ? { ...c, privateNotes: updatedNotes } : c
      )
    );
    setNewNote("");
    addToast({
      type: "success",
      title: "Private Note Logged",
      message: "Encrypted internal note added to creator profile.",
    });
  };

  const filteredContacts =
    selectedStage === "all"
      ? contacts
      : contacts.filter((c) => c.stage === selectedStage);

  return (
    <div className="space-y-8 text-[#111111]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
              Creator Relationship Management
            </span>
            <span className="text-[#E7E7E4]">•</span>
            <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
              Brand CRM
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
            Creator Roster CRM &amp; Private Notes
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
            Manage your brand&apos;s proprietary talent relationships, private team performance notes, and pipeline stages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/creators">
            <Button variant="primary" size="md" rightIcon={<Plus className="w-4 h-4 text-[#B7FF3C]" />} className="rounded-[9px]">
              Add Creator to CRM
            </Button>
          </Link>
        </div>
      </div>

      {/* Pipeline Stage Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono text-xs">
        {(["all", "Prospect", "Outreach", "Negotiating", "Active_Partner", "Preferred", "Dormant"] as const).map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStage(st)}
            className={`px-3.5 py-1.5 rounded-lg capitalize font-sans text-xs transition-all whitespace-nowrap ${
              selectedStage === st
                ? "bg-[#111111] text-[#FAFAF8] font-bold shadow-xs"
                : "bg-[#FFFFFF] text-[#6B6B6B] border border-[#E7E7E4] hover:text-[#111111]"
            }`}
          >
            {st.replace(/_/g, " ")}
          </button>
        ))}
      </div>

      {/* CRM Contact Cards */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => (
          <div
            key={contact.id}
            className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6 text-[#111111]"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Creator Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-[#FAFAF8] border border-[#E7E7E4] shrink-0 shadow-xs">
                  <SafeImage
                    src={contact.creator.avatarUrl}
                    alt={contact.creator.fullName}
                    fallbackType="creator"
                    fallbackName={contact.creator.fullName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-base text-[#111111] font-display">
                      {contact.creator.fullName}
                    </h3>
                    <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
                      {contact.creator.primaryCategory}
                    </span>
                  </div>
                  <p className="text-xs text-[#6B6B6B] font-mono">
                    @{contact.creator.handle} • Reach: {formatNumber(contact.creator.totalFollowers)} • Engagement: {contact.creator.avgEngagementRate}%
                  </p>
                </div>
              </div>

              {/* Stage Selector & Stats */}
              <div className="flex items-center gap-4 font-mono text-xs">
                <div>
                  <span className="text-[#6B6B6B] block text-[10px]">Past Spend</span>
                  <span className="text-[#111111] font-extrabold text-sm">
                    {formatCurrency(contact.totalPaid)}
                  </span>
                </div>

                <div className="space-y-1 text-left">
                  <span className="text-[#6B6B6B] block text-[10px]">Stage</span>
                  <select
                    value={contact.stage}
                    onChange={(e) => handleStageChange(contact.id, e.target.value as CRMStage)}
                    className="bg-[#FAFAF8] border border-[#E7E7E4] rounded-xl px-2.5 py-1 text-xs text-[#111111] font-sans font-bold focus:outline-none focus:border-[#111111]"
                  >
                    <option value="Prospect">Prospect</option>
                    <option value="Outreach">Outreach</option>
                    <option value="Negotiating">Negotiating</option>
                    <option value="Active_Partner">Active Partner</option>
                    <option value="Preferred">Preferred Tier</option>
                    <option value="Dormant">Dormant</option>
                  </select>
                </div>

                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setSelectedContact(contact);
                    setIsNoteModalOpen(true);
                  }}
                  leftIcon={<FileText className="w-3.5 h-3.5" />}
                  className="rounded-[9px]"
                >
                  Internal Notes ({contact.privateNotes.length})
                </Button>
              </div>
            </div>

            {/* Tags & Internal Notes Summary */}
            <div className="pt-4 border-t border-[#E7E7E4] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[#6B6B6B] font-mono text-[11px] mr-1">Tags:</span>
                {contact.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 rounded-full bg-[#FAFAF8] text-[#111111] font-mono text-[11px] border border-[#E7E7E4]"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {contact.privateNotes[0] && (
                <div className="p-2.5 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] text-[11px] max-w-lg font-sans">
                  <strong className="text-[#111111]">Latest Note ({contact.privateNotes[0].authorName}):</strong> {contact.privateNotes[0].content}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Private Note Modal */}
      <Modal
        isOpen={isNoteModalOpen}
        onClose={() => setIsNoteModalOpen(false)}
        title={`Internal CRM Notes for ${selectedContact?.creator.fullName}`}
        description="Private notes are strictly confidential to your brand team and invisible to creators."
        maxWidth="lg"
      >
        <div className="space-y-6 text-[#111111]">
          <form onSubmit={handleAddNote} className="space-y-3">
            <Textarea
              label="Add New Confidential Note"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="e.g. Creator exceeded ROI goals on Sprint campaign, recommended for Q4 retainer..."
              rows={3}
              required
            />
            <Button variant="primary" size="sm" type="submit" className="rounded-[9px]">
              Save Private Note
            </Button>
          </form>

          <div className="space-y-3 pt-4 border-t border-[#E7E7E4]">
            <h4 className="text-xs font-bold uppercase text-[#6B6B6B] font-mono">Note History</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {selectedContact?.privateNotes.map((note) => (
                <div key={note.id} className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-xs space-y-1">
                  <div className="flex justify-between text-[10px] text-[#6B6B6B] font-mono">
                    <strong className="text-[#111111] font-sans">{note.authorName}</strong>
                    <span>{note.createdAt}</span>
                  </div>
                  <p className="text-[#6B6B6B] leading-relaxed font-sans">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
