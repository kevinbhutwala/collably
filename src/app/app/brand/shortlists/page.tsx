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
      setShortlists(data || []);
      if (data && data.length > 0) setActiveShortlistId(data[0].id);
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
    <div className="space-y-6 text-[#0A0A0E] select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 sm:pb-5 border-b border-black/8">
        <div className="hidden lg:block">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Talent Curation
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Shortlists
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] font-display tracking-tight">
            Creator Shortlists
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            Curate talent rosters and compare metrics side-by-side.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10 flex items-center gap-1.5 self-start sm:self-center"
          >
            <Plus className="w-3.5 h-3.5 text-[#0A0A0E]" />
            <span>New Shortlist</span>
          </button>
        </div>
      </div>

      {/* Tabs for Shortlists */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1.5">
        {shortlists.map((s) => {
          const isActive = s.id === activeShortlistId;
          return (
            <button
              key={s.id}
              onClick={() => setActiveShortlistId(s.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold transition-all select-none whitespace-nowrap flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs font-bold border border-black/10"
                  : "bg-white text-[#6A6A78] hover:text-[#0A0A0E] border border-black/8"
              }`}
            >
              <span>{s.name}</span>
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                isActive ? "bg-[#0A0A0E] text-white font-bold" : "bg-black/5 text-[#5A5A68]"
              }`}>
                {s.creators.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Shortlist Details & Grid */}
      {activeShortlist ? (
        <div className="space-y-5">
          <div className="p-4 sm:p-5 rounded-3xl bg-white border border-black/8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-[#0A0A0E] font-display">{activeShortlist.name}</h2>
              <p className="text-xs text-[#5A5A68] mt-0.5">{activeShortlist.description}</p>
            </div>

            {activeShortlist.creators.length > 1 && (
              <button
                onClick={() => setIsCompareOpen(true)}
                className="px-3.5 py-1.5 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-semibold transition-all flex items-center gap-1.5 border border-black/10 shrink-0 self-start sm:self-center"
              >
                <Scale className="w-3.5 h-3.5 text-[#0A0A0E]" />
                <span>Compare Metrics</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeShortlist.creators.map((c) => (
              <div
                key={c.id}
                className="p-6 rounded-3xl bg-white border border-black/8 hover:border-[#FFD21F] transition-all space-y-4 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-[#F5F5F9] border border-black/8 shrink-0">
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
                        <h3 className="font-bold text-base text-[#0A0A0E] font-display">{c.fullName}</h3>
                        <p className="text-xs text-[#7A7A8A] font-mono">@{c.handle}</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-black/5 text-[#0A0A0E] text-[10px] font-mono font-bold uppercase">
                      {c.primaryCategory}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#F8F8FC] border border-black/5 text-xs font-mono">
                    <div>
                      <span className="text-[10px] text-[#7A7A8A] block">Audience Reach</span>
                      <span className="font-bold text-[#0A0A0E] text-sm">{formatNumber(c.totalFollowers)}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7A7A8A] block">Engagement</span>
                      <span className="font-bold text-[#0A0A0E] text-sm">{c.avgEngagementRate}% ER</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <Link href={`/creators/${c.id}`} className="flex-1">
                    <button className="w-full py-2 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-bold transition-all border border-black/10">
                      Media Kit
                    </button>
                  </Link>
                  <Link href="/app/brand/campaigns/create" className="flex-1">
                    <button className="w-full py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs">
                      Invite
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-24 text-center rounded-3xl bg-white border border-black/8 p-8 space-y-3 shadow-xs">
          <Users className="w-8 h-8 text-[#7A7A8A] mx-auto" />
          <h3 className="text-base font-bold text-[#0A0A0E] font-display">No shortlists available</h3>
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
        <form onSubmit={handleCreate} className="space-y-4 text-[#0A0A0E]">
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
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-bold shadow-xs border border-black/10"
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
