"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { crmService } from "@/services/crm.service";
import { creatorService } from "@/services/creator.service";
import { CRMContact, CRMStage, CreatorProfile } from "@/core/types";
import { Textarea } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";
import { useAuthStore } from "@/stores/auth.store";
import { FeatureGate } from "@/components/subscriptions/FeatureGate";
import { Plus, FileText, Trash2, UserPlus, Users, MessageSquare } from "lucide-react";

export default function BrandCRMPage() {
  const { addToast } = useUIStore();
  const { currentBrand } = useAuthStore();
  const [contacts, setContacts] = useState<CRMContact[]>([]);
  const [allCreators, setAllCreators] = useState<CreatorProfile[]>([]);
  const [selectedContact, setSelectedContact] = useState<CRMContact | null>(null);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [selectedStage, setSelectedStage] = useState<CRMStage | "all">("all");

  // New Contact form state
  const [selectedCreatorId, setSelectedCreatorId] = useState("");
  const [newContactStage, setNewContactStage] = useState<CRMStage>("Prospect");
  const [newContactNote, setNewContactNote] = useState("");

  const brandId = currentBrand?.id || "brand-demo";

  useEffect(() => {
    const fetch = async () => {
      const [contactsData, creatorsData] = await Promise.all([
        crmService.getContacts(brandId),
        creatorService.getCreators(),
      ]);
      setContacts(contactsData || []);
      setAllCreators(creatorsData || []);
      if (creatorsData && creatorsData.length > 0) {
        setSelectedCreatorId(creatorsData[0].id);
      }
    };
    fetch();
  }, [brandId]);

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

  const handleRemoveContact = async (contactId: string, creatorName: string) => {
    const ok = await crmService.removeContact(contactId);
    if (ok) {
      setContacts((prev) => prev.filter((c) => c.id !== contactId));
      addToast({
        type: "success",
        title: "Contact Removed",
        message: `${creatorName} has been removed from your pipeline.`,
      });
    }
  };

  const handleCreateContact = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCreatorId) return;

    const newC = await crmService.addContact(
      selectedCreatorId,
      newContactStage,
      newContactNote || undefined,
      brandId
    );

    if (newC) {
      setContacts((prev) => [newC, ...prev.filter((c) => c.id !== newC.id)]);
      setIsAddModalOpen(false);
      setNewContactNote("");
      addToast({
        type: "success",
        title: "Creator Added to Pipeline",
        message: `${newC.creator?.fullName || "Creator"} added to ${newContactStage.replace(/_/g, " ")} stage.`,
      });
    }
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

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="shrink-0 px-4 py-2.5 rounded-2xl bg-[#0A0A0E] text-white text-xs font-bold transition-all flex items-center gap-1.5 hover:bg-[#1A1A28] shadow-sm"
          >
            <UserPlus className="w-3.5 h-3.5" />
            Add Creator to Pipeline
          </button>
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

        {/* Empty State */}
        {filtered.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-white border border-dashed border-black/15 space-y-4 p-8">
            <div className="w-12 h-12 rounded-2xl bg-[#F5F5F9] border border-black/8 flex items-center justify-center mx-auto text-[#7A7A8A]">
              <Users className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-[#0A0A0E]">No creators in this pipeline stage</h3>
              <p className="text-xs text-[#5A5A68]">
                Add talent from the creator directory or import directly into your CRM.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#0A0A0E] text-white text-xs font-bold transition-all hover:bg-black/80"
              >
                Add Creator Now
              </button>
              <Link href="/app/brand/creators">
                <button className="px-4 py-2 rounded-xl border border-black/10 bg-white text-[#0A0A0E] text-xs font-bold hover:bg-black/5">
                  Browse Creators
                </button>
              </Link>
            </div>
          </div>
        ) : (
          /* Contacts Grid */
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
                        src={c.creator?.avatarUrl}
                        alt={c.creator?.fullName || "Creator"}
                        width={48}
                        height={48}
                        className="w-12 h-12 rounded-2xl object-cover border border-black/10"
                      />
                      <div>
                        <h3 className="text-sm font-bold text-[#0A0A0E] font-display">
                          {c.creator?.fullName}
                        </h3>
                        <p className="text-xs text-[#7A7A8A] font-mono">{c.creator?.handle}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] border border-[#FFD21F]/40 uppercase">
                        {c.stage.replace(/_/g, " ")}
                      </span>
                      <button
                        onClick={() => handleRemoveContact(c.id, c.creator?.fullName || "Creator")}
                        title="Remove from CRM"
                        className="p-1 rounded-lg text-[#8A8A9A] hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-black/5">
                    <div>
                      <span className="text-[#8A8A9A] text-[10px] block">Starting Rate</span>
                      <span className="font-bold text-[#0A0A0E]">{formatCurrency(c.creator?.startingPrice || 1500)}</span>
                    </div>
                    <div>
                      <span className="text-[#8A8A9A] text-[10px] block">Audience Reach</span>
                      <span className="font-bold text-[#0A0A0E]">{formatNumber(c.creator?.totalFollowers || 100000)}</span>
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
                      className="w-full text-xs font-sans rounded-xl border border-black/10 px-3 py-2 bg-[#F8F8FC] text-[#0A0A0E] focus:outline-none focus:border-black cursor-pointer"
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
                    className="flex-1 py-2 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-semibold transition-all flex items-center justify-center gap-1.5 border border-black/5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Note</span>
                  </button>
                  <Link href="/app/messages" className="flex-1">
                    <button className="w-full py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs cursor-pointer">
                      Message
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Note Modal */}
        <Modal
          isOpen={isNoteModalOpen}
          onClose={() => setIsNoteModalOpen(false)}
          title={`Internal Notes: ${selectedContact?.creator?.fullName}`}
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
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-bold shadow-xs border border-black/10 cursor-pointer"
            >
              Save Internal Note
            </button>
          </form>
        </Modal>

        {/* Add Creator Modal */}
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add Talent to CRM Pipeline"
          description="Track promising creators and organize them into operational stages."
          maxWidth="md"
        >
          <form onSubmit={handleCreateContact} className="space-y-4 text-[#0A0A0E]">
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0A0A0E]">Select Creator</label>
              <select
                value={selectedCreatorId}
                onChange={(e) => setSelectedCreatorId(e.target.value)}
                className="w-full text-xs font-sans rounded-xl border border-black/10 px-3 py-2.5 bg-[#F8F8FC] text-[#0A0A0E] focus:outline-none focus:border-black cursor-pointer"
                required
              >
                {allCreators.map((cr) => (
                  <option key={cr.id} value={cr.id}>
                    {cr.fullName} ({cr.handle}) — {cr.primaryCategory}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-[#0A0A0E]">Initial Pipeline Stage</label>
              <select
                value={newContactStage}
                onChange={(e) => setNewContactStage(e.target.value as CRMStage)}
                className="w-full text-xs font-sans rounded-xl border border-black/10 px-3 py-2.5 bg-[#F8F8FC] text-[#0A0A0E] focus:outline-none focus:border-black cursor-pointer"
              >
                {stages.map((st) => (
                  <option key={st.key} value={st.key}>
                    {st.label}
                  </option>
                ))}
              </select>
            </div>

            <Textarea
              label="Internal Note (Optional)"
              value={newContactNote}
              onChange={(e) => setNewContactNote(e.target.value)}
              placeholder="E.g., Scouted from trending tech list, great fit for upcoming Q4 campaign..."
              rows={3}
            />

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-[#0A0A0E] text-white text-xs font-bold shadow-xs hover:bg-[#1A1A28] cursor-pointer"
            >
              Add to Pipeline
            </button>
          </form>
        </Modal>
      </div>
    </FeatureGate>
  );
}
