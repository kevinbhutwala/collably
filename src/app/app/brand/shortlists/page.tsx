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
  Bookmark,
  ChevronRight,
  Star,
  BarChart3,
  Sparkles,
  ExternalLink,
  Send,
  ListChecks,
  TrendingUp,
  Trash2,
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
    const fetchData = async () => {
      const data = await crmService.getShortlists("brand-1");
      setShortlists(data || []);
      if (data && data.length > 0) setActiveShortlistId(data[0].id);
    };
    fetchData();
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
      message: `"${newTitle}" is ready to fill with talent.`,
    });
  };

  // Aggregate metrics for active shortlist
  const totalReach = activeShortlist?.creators.reduce((s, c) => s + c.totalFollowers, 0) ?? 0;
  const avgER =
    activeShortlist && activeShortlist.creators.length > 0
      ? (
          activeShortlist.creators.reduce((s, c) => s + c.avgEngagementRate, 0) /
          activeShortlist.creators.length
        ).toFixed(1)
      : "—";
  const avgRate =
    activeShortlist && activeShortlist.creators.length > 0
      ? activeShortlist.creators.reduce((s, c) => s + c.startingPrice, 0) /
        activeShortlist.creators.length
      : 0;

  return (
    <div className="space-y-6 text-[#0A0A0E] select-none">
      {/* ── PAGE HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/8">
        <div className="hidden lg:block space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase text-[#5A5A68] tracking-widest">
              Talent Curation
            </span>
            <span className="text-[#8A8A9A]">·</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Shortlists
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0A0A0E] font-display tracking-tight">
            Creator Shortlists
          </h1>
          <p className="text-sm text-[#5A5A68]">
            Curate talent rosters and compare metrics side‑by‑side before committing to campaigns.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="self-start sm:self-center px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10 flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Shortlist</span>
        </button>
      </div>

      {/* ── EMPTY STATE ── */}
      {shortlists.length === 0 ? (
        <div className="py-32 text-center rounded-3xl bg-white border border-black/8 shadow-xs space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-[#F5F5F9] border border-black/8 flex items-center justify-center mx-auto">
            <Bookmark className="w-7 h-7 text-[#7A7A8A]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0A0A0E] font-display">No shortlists yet</h3>
            <p className="text-xs text-[#7A7A8A] mt-1 max-w-xs mx-auto">
              Create your first shortlist to start curating and comparing creator talent for your campaigns.
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mx-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] to-[#FFC700] text-[#0A0A0E] text-xs font-bold border border-black/10 flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Create First Shortlist
          </button>
        </div>
      ) : (
        <div className="flex gap-6 items-start">
          {/* ── LEFT: SHORTLIST SIDEBAR ── */}
          <div className="w-64 shrink-0 space-y-2">
            <p className="text-[10px] font-mono font-bold uppercase text-[#7A7A8A] tracking-widest px-1 mb-3">
              Your Lists ({shortlists.length})
            </p>
            {shortlists.map((s) => {
              const isActive = s.id === activeShortlistId;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveShortlistId(s.id)}
                  className={`w-full text-left px-4 py-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 group ${
                    isActive
                      ? "bg-[#0A0A0E] text-white border-black shadow-md"
                      : "bg-white text-[#4A4A58] border-black/8 hover:border-black/20 hover:bg-black/2"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                        isActive ? "bg-white/15" : "bg-[#F5F5F9]"
                      }`}
                    >
                      <ListChecks className={`w-3.5 h-3.5 ${isActive ? "text-[#FFD21F]" : "text-[#7A7A8A]"}`} />
                    </div>
                    <div className="min-w-0">
                      <span className={`block text-xs font-bold truncate ${isActive ? "text-white" : "text-[#0A0A0E]"}`}>
                        {s.name}
                      </span>
                      <span className={`block text-[10px] font-mono mt-0.5 ${isActive ? "text-white/60" : "text-[#7A7A8A]"}`}>
                        {s.creators.length} creator{s.creators.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span
                      className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isActive ? "bg-[#FFD21F] text-[#0A0A0E]" : "bg-black/8 text-[#5A5A68]"
                      }`}
                    >
                      {s.creators.length}
                    </span>
                    <ChevronRight className={`w-3 h-3 ${isActive ? "text-white/60" : "text-[#9A9AA8] opacity-0 group-hover:opacity-100"} transition-opacity`} />
                  </div>
                </button>
              );
            })}

            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full text-left px-4 py-3 rounded-2xl border border-dashed border-black/15 text-[#7A7A8A] hover:text-[#0A0A0E] hover:border-black/30 hover:bg-black/3 transition-all flex items-center gap-2.5 text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Shortlist</span>
            </button>
          </div>

          {/* ── RIGHT: ACTIVE SHORTLIST CONTENT ── */}
          {activeShortlist && (
            <div className="flex-1 min-w-0 space-y-5">
              {/* Shortlist header card */}
              <div className="p-5 rounded-3xl bg-white border border-black/8 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-extrabold text-[#0A0A0E] font-display">
                        {activeShortlist.name}
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/50 text-[10px] font-mono font-bold text-[#0A0A0E]">
                        {activeShortlist.creators.length} creators
                      </span>
                    </div>
                    {activeShortlist.description && (
                      <p className="text-xs text-[#5A5A68] max-w-xl">{activeShortlist.description}</p>
                    )}
                  </div>

                  {activeShortlist.creators.length > 1 && (
                    <button
                      onClick={() => setIsCompareOpen(true)}
                      className="self-start shrink-0 px-4 py-2.5 rounded-full bg-[#0A0A0E] text-white text-xs font-bold transition-all flex items-center gap-1.5 hover:bg-[#1A1A2E] shadow-xs"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>Compare Metrics</span>
                    </button>
                  )}
                </div>

                {/* Aggregate telemetry row */}
                {activeShortlist.creators.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-black/5 grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-[10px] font-mono text-[#7A7A8A] uppercase tracking-wider">Combined Reach</p>
                      <p className="text-xl font-extrabold text-[#0A0A0E] font-display mt-0.5">
                        {formatNumber(totalReach)}
                      </p>
                    </div>
                    <div className="text-center border-x border-black/5">
                      <p className="text-[10px] font-mono text-[#7A7A8A] uppercase tracking-wider">Avg. Engagement</p>
                      <p className="text-xl font-extrabold text-[#0A0A0E] font-display mt-0.5">{avgER}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] font-mono text-[#7A7A8A] uppercase tracking-wider">Avg. Base Rate</p>
                      <p className="text-xl font-extrabold text-[#0A0A0E] font-display mt-0.5">
                        {avgRate > 0 ? formatCurrency(avgRate) : "—"}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Creator Grid */}
              {activeShortlist.creators.length === 0 ? (
                <div className="py-20 text-center rounded-3xl bg-white border border-dashed border-black/15 space-y-3">
                  <Users className="w-8 h-8 text-[#7A7A8A] mx-auto" />
                  <div>
                    <h3 className="text-sm font-bold text-[#0A0A0E]">This shortlist is empty</h3>
                    <p className="text-xs text-[#7A7A8A] mt-1">
                      Browse the creator directory and bookmark talent to this list.
                    </p>
                  </div>
                  <Link href="/app/brand/creators">
                    <button className="mx-auto px-4 py-2 rounded-full bg-[#F5F5F9] border border-black/8 text-[#0A0A0E] text-xs font-bold flex items-center gap-1.5 hover:bg-black/5 transition-all">
                      <Sparkles className="w-3.5 h-3.5 text-[#8A7000]" />
                      Discover Creators
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {activeShortlist.creators.map((c, idx) => (
                    <div
                      key={c.id}
                      className="group relative bg-white border border-black/8 rounded-3xl overflow-hidden hover:border-[#FFD21F] hover:shadow-md transition-all duration-200 flex flex-col"
                    >
                      {/* Cover / rank badge */}
                      <div className="relative h-20 bg-gradient-to-br from-[#F5F5F9] via-[#EEEEF5] to-[#E8E8F0] overflow-hidden">
                        {c.coverImageUrl && (
                          <SafeImage
                            src={c.coverImageUrl}
                            alt=""
                            fill
                            className="object-cover opacity-40"
                            fallbackType="brand"
                            fallbackName={c.fullName}
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        {/* Rank pill */}
                        <span className="absolute top-2.5 left-3 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-mono font-bold backdrop-blur-sm">
                          #{idx + 1}
                        </span>
                        {/* Verified badge */}
                        {c.verified && (
                          <span className="absolute top-2.5 right-3 px-2 py-0.5 rounded-full bg-emerald-500/90 text-white text-[10px] font-bold flex items-center gap-1 backdrop-blur-sm">
                            <Star className="w-2.5 h-2.5 fill-white" />
                            Verified
                          </span>
                        )}
                      </div>

                      {/* Avatar — overlapping cover */}
                      <div className="px-4 -mt-7 mb-1 flex items-end justify-between">
                        <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-sm bg-[#F5F5F9] shrink-0">
                          <SafeImage
                            src={c.avatarUrl}
                            alt={c.fullName}
                            fallbackType="creator"
                            fallbackName={c.fullName}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="mb-1 px-2.5 py-1 rounded-full bg-black/5 border border-black/8 text-[10px] font-mono font-bold text-[#5A5A68] max-w-[120px] truncate">
                          {c.primaryCategory}
                        </span>
                      </div>

                      {/* Creator info */}
                      <div className="px-4 pb-2 space-y-1">
                        <h3 className="font-extrabold text-sm text-[#0A0A0E] font-display leading-tight">
                          {c.fullName}
                        </h3>
                        <p className="text-[11px] text-[#7A7A8A] font-mono">@{c.handle}</p>
                        <p className="text-[11px] text-[#5A5A68] line-clamp-2 leading-relaxed">
                          {c.headline}
                        </p>
                      </div>

                      {/* Metrics block */}
                      <div className="mx-4 mb-3 p-3 rounded-2xl bg-[#F8F8FC] border border-black/5 grid grid-cols-3 gap-2 text-center">
                        <div>
                          <p className="text-[9px] font-mono text-[#7A7A8A] uppercase tracking-wider">Reach</p>
                          <p className="text-sm font-extrabold text-[#0A0A0E] font-display mt-0.5">
                            {formatNumber(c.totalFollowers)}
                          </p>
                        </div>
                        <div className="border-x border-black/5">
                          <p className="text-[9px] font-mono text-[#7A7A8A] uppercase tracking-wider">Eng. Rate</p>
                          <p className="text-sm font-extrabold text-emerald-600 font-display mt-0.5">
                            {c.avgEngagementRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] font-mono text-[#7A7A8A] uppercase tracking-wider">From</p>
                          <p className="text-sm font-extrabold text-[#0A0A0E] font-display mt-0.5">
                            {formatCurrency(c.startingPrice)}
                          </p>
                        </div>
                      </div>

                      {/* Rating & campaigns */}
                      <div className="mx-4 mb-3 flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-[#FFD21F] text-[#FFD21F]" />
                          <span className="text-xs font-bold text-[#0A0A0E]">{c.rating}</span>
                        </div>
                        <span className="text-[#C5C5D0]">·</span>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3 text-[#7A7A8A]" />
                          <span className="text-xs text-[#5A5A68]">{c.completedCampaignsCount} campaigns</span>
                        </div>
                      </div>

                      {/* CTA buttons */}
                      <div className="mt-auto px-4 pb-4 flex gap-2">
                        <Link href={`/creators/${c.id}`} className="flex-1">
                          <button className="w-full py-2 rounded-full bg-[#F5F5F9] hover:bg-black/8 text-[#0A0A0E] text-xs font-bold transition-all border border-black/8 flex items-center justify-center gap-1.5">
                            <ExternalLink className="w-3 h-3" />
                            Media Kit
                          </button>
                        </Link>
                        <Link href="/app/brand/campaigns/create" className="flex-1">
                          <button className="w-full py-2 rounded-full bg-gradient-to-r from-[#FFD21F] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10 flex items-center justify-center gap-1.5">
                            <Send className="w-3 h-3" />
                            Invite
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── CREATE SHORTLIST MODAL ── */}
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
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-bold shadow-xs border border-black/10 flex items-center justify-center gap-1.5"
          >
            <ListChecks className="w-3.5 h-3.5" />
            Create Shortlist
          </button>
        </form>
      </Modal>

      {/* ── CREATOR COMPARISON MODAL ── */}
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
