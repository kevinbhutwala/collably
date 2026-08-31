"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { crmService } from "@/services/crm.service";
import { CRMContact, CRMStage } from "@/core/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";
import {
  Users,
  Star,
  Plus,
  Tag,
  MessageSquare,
  ArrowUpRight,
  Sparkles,
  FileText,
  Clock,
  ShieldCheck,
} from "lucide-react";

export default function BrandCRMPage() {
  const { addToast } = useUIStore();
  const [contacts, setContacts] = useState<CRMContact[]>([]);
  const [selectedContact, setSelectedContact] = useState<CRMContact | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newTag, setNewTag] = useState("");
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
    setContacts((prev) =>
      prev.map((c) =>
        c.id === selectedContact.id
          ? {
              ...c,
              privateNotes: [
                {
                  id: `note-${Date.now()}`,
                  authorName: "Sarah (Growth Lead)",
                  content: newNote,
                  createdAt: new Date().toISOString().split("T")[0],
                },
                ...c.privateNotes,
              ],
            }
          : c
      )
    );

    addToast({
      type: "success",
      title: "Private Note Saved",
      message: "Internal team note added to creator CRM record.",
    });
    setNewNote("");
    setIsNoteModalOpen(false);
  };

  const handleAddTag = async (contactId: string) => {
    if (!newTag.trim()) return;
    await crmService.addTag(contactId, newTag.trim());
    setContacts((prev) =>
      prev.map((c) =>
        c.id === contactId && !c.tags.includes(newTag.trim())
          ? { ...c, tags: [...c.tags, newTag.trim()] }
          : c
      )
    );
    setNewTag("");
    addToast({
      type: "info",
      title: "Tag Added",
      message: `Tagged creator with #${newTag.trim()}`,
    });
  };

  const filteredContacts =
    selectedStage === "all"
      ? contacts
      : contacts.filter((c) => c.stage === selectedStage);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-brand-accent">
              Creator Relationship Management
            </span>
            <span className="text-slate-300">•</span>
            <Badge variant="glow" size="sm">Brand CRM</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Creator Roster CRM & Private Notes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Manage your brand&apos;s proprietary talent relationships, private team performance notes, and pipeline stages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/creators">
            <Button variant="accent" size="md" rightIcon={<Plus className="w-4 h-4" />}>
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
            className={`px-3.5 py-1.5 rounded-xl capitalize font-sans transition-all whitespace-nowrap ${
              selectedStage === st
                ? "bg-slate-900 text-white font-bold shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
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
            className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              {/* Creator Info */}
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-sm">
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
                    <h3 className="font-bold text-base text-slate-900">
                      {contact.creator.fullName}
                    </h3>
                    <Badge variant="glow" size="sm">
                      {contact.creator.primaryCategory}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500 font-mono">
                    @{contact.creator.handle} • Reach: {formatNumber(contact.creator.totalFollowers)} • Engagement: {contact.creator.avgEngagementRate}%
                  </p>
                </div>
              </div>

              {/* Stage Selector & Stats */}
              <div className="flex items-center gap-4 font-mono text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Past Spend</span>
                  <span className="text-emerald-600 font-bold text-sm">
                    {formatCurrency(contact.totalPaid)}
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="text-slate-400 block text-[10px]">Stage</span>
                  <select
                    value={contact.stage}
                    onChange={(e) => handleStageChange(contact.id, e.target.value as CRMStage)}
                    className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1 text-xs text-slate-900 font-sans font-bold focus:outline-none"
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
                >
                  Internal Notes ({contact.privateNotes.length})
                </Button>
              </div>
            </div>

            {/* Tags & Internal Notes Summary */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-slate-400 font-mono text-[11px] mr-1">Tags:</span>
                {contact.tags.map((t) => (
                  <span
                    key={t}
                    className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono text-[11px] border border-slate-200"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {contact.privateNotes[0] && (
                <div className="p-2.5 rounded-xl bg-amber-50/60 border border-amber-200/60 text-slate-800 text-[11px] max-w-lg font-sans">
                  <strong>Latest Note ({contact.privateNotes[0].authorName}):</strong> {contact.privateNotes[0].content}
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
        <div className="space-y-6">
          <form onSubmit={handleAddNote} className="space-y-3">
            <Textarea
              label="Add New Confidential Note"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="e.g. Creator exceeded ROI goals on Sprint campaign, recommended for Q4 retainer..."
              rows={3}
              required
            />
            <Button variant="accent" size="sm" type="submit">
              Save Private Note
            </Button>
          </form>

          <div className="space-y-3 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase text-slate-500 font-mono">Note History</h4>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {selectedContact?.privateNotes.map((note) => (
                <div key={note.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                    <strong className="text-slate-800 font-sans">{note.authorName}</strong>
                    <span>{note.createdAt}</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{note.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
