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
  Sparkles,
  ExternalLink,
  Send,
  ListChecks,
  TrendingUp,
  BadgeCheck,
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
    addToast({ type: "success", title: "Shortlist Created", message: `"${newTitle}" is ready to fill with talent.` });
  };

  const totalReach = activeShortlist?.creators.reduce((s, c) => s + c.totalFollowers, 0) ?? 0;
  const avgER =
    activeShortlist && activeShortlist.creators.length > 0
      ? (activeShortlist.creators.reduce((s, c) => s + c.avgEngagementRate, 0) / activeShortlist.creators.length).toFixed(1)
      : "—";
  const avgRate =
    activeShortlist && activeShortlist.creators.length > 0
      ? activeShortlist.creators.reduce((s, c) => s + c.startingPrice, 0) / activeShortlist.creators.length
      : 0;

  return (
    <div className="space-y-6 text-[#0A0A0E] select-none">

      {/* ── PAGE HEADER ── */}
      <div className="flex items-center justify-between gap-4 pb-5 border-b border-black/8">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase text-[#5A5A68] tracking-widest">
              Talent Curation
            </span>
            <span className="text-[#C5C5D0]">·</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Shortlists
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-[#0A0A0E] tracking-tight">Creator Shortlists</h1>
          <p className="text-xs text-[#5A5A68]">Curate talent rosters and compare metrics side‑by‑side.</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="shrink-0 px-4 py-2.5 rounded-2xl bg-[#0A0A0E] text-white text-xs font-bold transition-all flex items-center gap-1.5 hover:bg-[#1A1A28] shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          New Shortlist
        </button>
      </div>

      {/* ── EMPTY STATE ── */}
      {shortlists.length === 0 ? (
        <div className="py-32 text-center rounded-3xl bg-white border border-dashed border-black/12 space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-[#F5F5F9] border border-black/8 flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6 text-[#7A7A8A]" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-base font-bold text-[#0A0A0E]">No shortlists yet</h3>
            <p className="text-xs text-[#7A7A8A] max-w-xs mx-auto leading-relaxed">
              Create your first shortlist to start curating and comparing creator talent for your campaigns.
            </p>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="mx-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#FFD21F] to-[#FFC700] text-[#0A0A0E] text-xs font-bold border border-black/10 inline-flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Create First Shortlist
          </button>
        </div>
      ) : (
        <div className="flex gap-5 items-start">

          {/* ── LEFT SIDEBAR ── */}
          <div className="w-60 shrink-0 space-y-1.5">
            <p className="text-[10px] font-mono font-bold uppercase text-[#9A9AA8] tracking-widest px-2 pb-1">
              Your Lists · {shortlists.length}
            </p>

            {shortlists.map((s) => {
              const isActive = s.id === activeShortlistId;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveShortlistId(s.id)}
                  className={`w-full text-left px-3.5 py-3 rounded-2xl border transition-all flex items-center gap-3 group ${
                    isActive
                      ? "bg-[#0A0A0E] border-[#0A0A0E] shadow-sm"
                      : "bg-white border-black/8 hover:border-black/18 hover:bg-[#FAFAFA]"
                  }`}
                >
                  {/* Icon */}
                  <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${isActive ? "bg-white/12" : "bg-[#F5F5F9]"}`}>
                    <ListChecks className={`w-3.5 h-3.5 ${isActive ? "text-[#FFD21F]" : "text-[#7A7A8A]"}`} />
                  </div>
                  {/* Label */}
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-bold truncate ${isActive ? "text-white" : "text-[#0A0A0E]"}`}>
                      {s.name}
                    </p>
                    <p className={`text-[10px] font-mono mt-0.5 ${isActive ? "text-white/50" : "text-[#7A7A8A]"}`}>
                      {s.creators.length} creator{s.creators.length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  {/* Count pill */}
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full shrink-0 ${isActive ? "bg-[#FFD21F] text-[#0A0A0E]" : "bg-black/6 text-[#5A5A68]"}`}>
                    {s.creators.length}
                  </span>
                </button>
              );
            })}

            {/* Add new */}
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="w-full px-3.5 py-3 rounded-2xl border border-dashed border-black/15 text-[#7A7A8A] hover:text-[#0A0A0E] hover:border-black/25 hover:bg-black/2 transition-all flex items-center gap-2.5 text-xs font-semibold"
            >
              <Plus className="w-3.5 h-3.5" />
              New Shortlist
            </button>
          </div>

          {/* ── RIGHT PANEL ── */}
          {activeShortlist && (
            <div className="flex-1 min-w-0 space-y-4">

              {/* Shortlist info + stats card */}
              <div className="bg-white border border-black/8 rounded-3xl p-5 shadow-xs">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2.5">
                      <h2 className="text-base font-extrabold text-[#0A0A0E]">{activeShortlist.name}</h2>
                      <span className="px-2 py-0.5 rounded-full bg-[#F5F5F9] border border-black/8 text-[10px] font-mono font-bold text-[#5A5A68]">
                        {activeShortlist.creators.length} creators
                      </span>
                    </div>
                    {activeShortlist.description && (
                      <p className="text-xs text-[#6A6A78]">{activeShortlist.description}</p>
                    )}
                  </div>
                  {activeShortlist.creators.length > 1 && (
                    <button
                      onClick={() => setIsCompareOpen(true)}
                      className="shrink-0 px-3.5 py-2 rounded-2xl bg-black/5 hover:bg-black/10 border border-black/8 text-[#0A0A0E] text-xs font-bold flex items-center gap-1.5 transition-all"
                    >
                      <Scale className="w-3.5 h-3.5" />
                      Compare
                    </button>
                  )}
                </div>

                {/* Aggregate metrics row */}
                {activeShortlist.creators.length > 0 && (
                  <div className="grid grid-cols-3 gap-px bg-black/6 rounded-2xl overflow-hidden border border-black/6">
                    {[
                      { label: "Combined Reach", value: formatNumber(totalReach), color: "text-[#0A0A0E]" },
                      { label: "Avg. Engagement", value: `${avgER}%`, color: "text-emerald-600" },
                      { label: "Avg. Base Rate", value: avgRate > 0 ? formatCurrency(avgRate) : "—", color: "text-[#0A0A0E]" },
                    ].map((m) => (
                      <div key={m.label} className="bg-[#FAFAFA] px-5 py-3.5 text-center">
                        <p className="text-[10px] font-mono text-[#7A7A8A] uppercase tracking-wider">{m.label}</p>
                        <p className={`text-xl font-extrabold mt-0.5 ${m.color}`}>{m.value}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Creator Listing — empty */}
              {activeShortlist.creators.length === 0 ? (
                <div className="py-20 text-center rounded-3xl bg-white border border-dashed border-black/12 space-y-4">
                  <Users className="w-8 h-8 text-[#7A7A8A] mx-auto" />
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-[#0A0A0E]">This shortlist is empty</h3>
                    <p className="text-xs text-[#7A7A8A]">Browse the creator directory and bookmark talent here.</p>
                  </div>
                  <Link href="/app/brand/creators">
                    <button className="mx-auto px-4 py-2 rounded-2xl bg-[#F5F5F9] border border-black/8 text-[#0A0A0E] text-xs font-bold inline-flex items-center gap-1.5 hover:bg-black/5 transition-all">
                      <Sparkles className="w-3.5 h-3.5 text-[#8A7000]" />
                      Discover Creators
                    </button>
                  </Link>
                </div>
              ) : (
                /* ── CREATOR TABLE LIST ── */
                <div className="bg-white border border-black/8 rounded-3xl overflow-hidden shadow-xs">
                  {/* Table header */}
                  <div className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 px-5 py-3 bg-[#FAFAFA] border-b border-black/6 text-[10px] font-mono font-bold uppercase tracking-widest text-[#8A8A9A]">
                    <span>Creator</span>
                    <span className="text-right">Reach</span>
                    <span className="text-right">Eng. Rate</span>
                    <span className="text-right">Rate From</span>
                    <span className="text-right">Actions</span>
                  </div>

                  {/* Table rows */}
                  <div className="divide-y divide-black/5">
                    {activeShortlist.creators.map((c, idx) => (
                      <div
                        key={c.id}
                        className="grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center px-5 py-4 hover:bg-[#FAFAFA] transition-colors group"
                      >
                        {/* Creator identity */}
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Rank */}
                          <span className="w-5 text-[10px] font-mono font-bold text-[#9A9AA8] shrink-0 text-center">
                            {idx + 1}
                          </span>
                          {/* Avatar */}
                          <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-[#F5F5F9] border border-black/6 shrink-0">
                            <SafeImage
                              src={c.avatarUrl}
                              alt={c.fullName}
                              fallbackType="creator"
                              fallbackName={c.fullName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          {/* Name + handle + tags */}
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-sm font-bold text-[#0A0A0E] truncate">{c.fullName}</span>
                              {c.verified && (
                                <BadgeCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                              )}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[11px] text-[#7A7A8A] font-mono truncate">@{c.handle}</span>
                              <span className="px-1.5 py-px rounded-md bg-[#F5F5F9] border border-black/6 text-[9px] font-mono font-bold text-[#5A5A68] shrink-0 truncate max-w-[90px]">
                                {c.primaryCategory}
                              </span>
                            </div>
                            <div className="flex items-center gap-1.5 mt-1">
                              <Star className="w-2.5 h-2.5 fill-[#FFD21F] text-[#FFD21F]" />
                              <span className="text-[10px] font-bold text-[#0A0A0E]">{c.rating}</span>
                              <span className="text-[#D0D0DA]">·</span>
                              <TrendingUp className="w-2.5 h-2.5 text-[#7A7A8A]" />
                              <span className="text-[10px] text-[#7A7A8A]">{c.completedCampaignsCount} campaigns</span>
                            </div>
                          </div>
                        </div>

                        {/* Reach */}
                        <div className="text-right">
                          <span className="text-sm font-extrabold text-[#0A0A0E]">{formatNumber(c.totalFollowers)}</span>
                        </div>

                        {/* Engagement rate */}
                        <div className="text-right">
                          <span className={`text-sm font-extrabold ${c.avgEngagementRate >= 4 ? "text-emerald-600" : c.avgEngagementRate >= 2 ? "text-amber-600" : "text-[#0A0A0E]"}`}>
                            {c.avgEngagementRate}%
                          </span>
                        </div>

                        {/* Base rate */}
                        <div className="text-right">
                          <span className="text-sm font-bold text-[#0A0A0E]">{formatCurrency(c.startingPrice)}</span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 shrink-0">
                          <Link href={`/creators/${c.id}`}>
                            <button className="px-3 py-1.5 rounded-xl bg-[#F5F5F9] hover:bg-black/8 border border-black/8 text-[#0A0A0E] text-[11px] font-bold transition-all flex items-center gap-1">
                              <ExternalLink className="w-3 h-3" />
                              Kit
                            </button>
                          </Link>
                          <Link href="/app/brand/campaigns/create">
                            <button className="px-3 py-1.5 rounded-xl bg-[#FFD21F] hover:bg-[#FFE052] border border-black/10 text-[#0A0A0E] text-[11px] font-bold transition-all flex items-center gap-1 shadow-xs">
                              <Send className="w-3 h-3" />
                              Invite
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ── CREATE MODAL ── */}
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
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-bold shadow-xs border border-black/10 flex items-center justify-center gap-1.5"
          >
            <ListChecks className="w-3.5 h-3.5" />
            Create Shortlist
          </button>
        </form>
      </Modal>

      {/* ── COMPARE MODAL ── */}
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
