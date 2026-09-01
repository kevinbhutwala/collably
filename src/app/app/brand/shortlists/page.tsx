"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { crmService } from "@/services/crm.service";
import { CreatorShortlist } from "@/core/types";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import { SafeImage } from "@/components/ui/SafeImage";
import { CreatorComparisonModal } from "@/components/creators/CreatorComparisonModal";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";
import {
  Plus,
  Scale,
  Users,
} from "lucide-react";

export default function BrandShortlistsPage() {
  const { addToast } = useUIStore();
  const [shortlists, setShortlists] = useState<CreatorShortlist[]>([]);
  const [activeShortlistId, setActiveShortlistId] = useState<string>("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const data = await crmService.getShortlists("brand-1");
      setShortlists(data);
      if (data.length > 0) setActiveShortlistId(data[0].id);
    };
    fetch();
  }, []);

  const activeShortlist = shortlists.find((s) => s.id === activeShortlistId);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newSl = await crmService.createShortlist("brand-1", newTitle, newDesc);
    setShortlists((prev) => [newSl, ...prev]);
    setActiveShortlistId(newSl.id);
    setNewTitle("");
    setNewDesc("");
    setIsCreateModalOpen(false);
    addToast({
      type: "success",
      title: "Shortlist Created",
      message: `Created list "${newTitle}"`,
    });
  };

  return (
    <div className="space-y-8 text-white select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-white/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Talent Curation
            </span>
            <span className="text-white/20">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold">
              Team Shortlists
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Creator Shortlists &amp; Side-by-Side Comparison
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
            Curate collections for upcoming launches and benchmark creator metrics side-by-side.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,210,31,0.4)] border border-white/40 flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-[#0A0A0E]" />
            <span>Create Shortlist</span>
          </button>
        </div>
      </div>

      {/* Tabs for Shortlists */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        {shortlists.map((s) => {
          const isActive = s.id === activeShortlistId;
          return (
            <button
              key={s.id}
              onClick={() => setActiveShortlistId(s.id)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all select-none whitespace-nowrap flex items-center gap-2 ${
                isActive
                  ? "bg-[#FFD21F] text-[#0A0A0E] shadow-[0_0_12px_rgba(255,210,31,0.45)] font-bold border border-white/40"
                  : "bg-white/[0.04] text-white/60 hover:text-white border border-white/10"
              }`}
            >
              <span>{s.name}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                isActive ? "bg-[#0A0A0E] text-[#FFD21F] font-bold" : "bg-white/10 text-white/70"
              }`}>
                {s.creators.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Shortlist Details & Grid */}
      {activeShortlist ? (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-[#101018] border border-white/10 shadow-2xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-white font-display">{activeShortlist.name}</h2>
              <p className="text-xs text-white/50 font-sans mt-0.5">{activeShortlist.description}</p>
            </div>

            {activeShortlist.creators.length > 1 && (
              <button
                onClick={() => setIsCompareOpen(true)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all flex items-center gap-1.5 border border-white/15"
              >
                <Scale className="w-4 h-4 text-[#FFD21F]" />
                <span>Side-by-Side Compare</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeShortlist.creators.map((c) => (
              <div
                key={c.id}
                className="p-6 rounded-3xl bg-[#101018] border border-white/10 hover:border-[#FFD21F]/40 transition-all space-y-4 flex flex-col justify-between shadow-2xl backdrop-blur-xl"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
                        <SafeImage
                          src={c.avatarUrl}
                          alt={c.fullName}
                          fallbackType="creator"
                          fallbackName={c.fullName}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-base text-white font-display">{c.fullName}</h3>
                        <p className="text-xs text-white/50 font-mono">@{c.handle}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-white/80 text-[10px] font-mono font-bold uppercase">
                      {c.primaryCategory}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-white/40 block">Audience Reach</span>
                      <span className="font-bold text-white text-sm">{formatNumber(c.totalFollowers)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-white/40 block">Engagement</span>
                      <span className="font-bold text-[#FFD21F] text-sm">{c.avgEngagementRate}% ER</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <Link href={`/creators/${c.id}`} className="flex-1">
                    <button className="w-full py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all">
                      Media Kit
                    </button>
                  </Link>
                  <Link href="/app/brand/campaigns/create" className="flex-1">
                    <button className="w-full py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-md">
                      Invite
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-24 text-center rounded-3xl bg-[#101018] border border-white/10 p-8 space-y-3">
          <Users className="w-8 h-8 text-white/30 mx-auto" />
          <h3 className="text-base font-bold text-white font-display">No shortlists available</h3>
        </div>
      )}

      {/* Create Shortlist Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create Talent Shortlist"
        description="Organize creators into campaign cohorts for internal review."
        maxWidth="md"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-white">
          <Input
            label="Shortlist Name"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Q4 AI DevTools Influencer Campaign"
            required
          />
          <Textarea
            label="Description / Campaign Objectives"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Outline target demographics, required formats, and timelines..."
            rows={3}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-bold shadow-[0_0_15px_rgba(255,210,31,0.4)]"
          >
            Create Shortlist
          </button>
        </form>
      </Modal>

      {/* Comparison Modal */}
      {isCompareOpen && activeShortlist && (
        <CreatorComparisonModal
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          creators={activeShortlist.creators}
        />
      )}
    </div>
  );
}
