"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { crmService } from "@/services/crm.service";
import { CreatorShortlist } from "@/core/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import { SafeImage } from "@/components/ui/SafeImage";
import { CreatorComparisonModal } from "@/components/creators/CreatorComparisonModal";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";
import {
  Plus,
  ArrowUpRight,
  Scale,
  Users,
  CheckCircle2,
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
    <div className="space-y-10 text-white">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[hsl(327,100%,55%)]">
              Talent Organization
            </span>
            <span className="text-white/20">•</span>
            <Badge variant="glow" size="sm">Creator Lists</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Campaign Shortlists &amp; Cohort Comparison
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-sans">
            Group creator candidates by campaign topic, compare side-by-side metrics, and batch invite.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={() => setIsCompareOpen(true)}
            leftIcon={<Scale className="w-4 h-4 text-purple-400" />}
            disabled={!activeShortlist || activeShortlist.creators.length < 2}
            className="rounded-full font-display"
          >
            Compare Creators
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={() => setIsCreateModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
            className="rounded-full font-display font-bold"
          >
            New Shortlist
          </Button>
        </div>
      </div>

      {/* Main Layout: Left Shortlists Sidebar, Right Creator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Shortlist Categories */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-[#120c16] border border-white/10 shadow-card space-y-3">
          <h3 className="text-sm font-bold text-white uppercase font-mono tracking-wider mb-2">
            My Campaign Lists ({shortlists.length})
          </h3>

          <div className="space-y-2">
            {shortlists.map((sl) => {
              const isSelected = sl.id === activeShortlistId;
              return (
                <button
                  key={sl.id}
                  onClick={() => setActiveShortlistId(sl.id)}
                  className={`w-full p-4 rounded-2xl text-left transition-all flex items-start justify-between gap-3 ${
                    isSelected
                      ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white shadow-md shadow-pink-500/25"
                      : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] border border-white/10"
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-xs font-display">{sl.name}</h4>
                    <p className={`text-[11px] mt-0.5 line-clamp-1 font-sans ${isSelected ? "text-pink-100" : "text-slate-400"}`}>
                      {sl.description}
                    </p>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg ${isSelected ? "bg-white/20 text-white" : "bg-white/10 text-slate-300"}`}>
                    {sl.creators.length}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Creators inside Active Shortlist */}
        <div className="lg:col-span-8 space-y-6">
          {activeShortlist && (
            <div className="p-6 sm:p-8 rounded-3xl bg-[#120c16] border border-white/10 shadow-card space-y-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold text-white font-display">{activeShortlist.name}</h3>
                  <p className="text-xs text-slate-400 font-sans">{activeShortlist.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link href="/app/brand/campaigns/create">
                    <Button variant="primary" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />} className="rounded-full font-display font-bold">
                      Batch Invite All
                    </Button>
                  </Link>
                </div>
              </div>

              {activeShortlist.creators.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <Users className="w-8 h-8 text-slate-500 mx-auto" />
                  <p className="text-xs text-slate-400 font-medium font-sans">No creators added to this list yet.</p>
                  <Link href="/creators">
                    <Button variant="secondary" size="sm" className="rounded-full">
                      Browse Creator Directory
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {activeShortlist.creators.map((c) => (
                    <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-white/[0.05] border border-white/10 shrink-0">
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
                          <h4 className="font-bold text-sm text-white flex items-center gap-1.5 font-display">
                            {c.fullName}
                            {c.verified && <CheckCircle2 className="w-4 h-4 fill-sky-400 text-[#0a070a]" />}
                          </h4>
                          <p className="text-xs text-slate-400 font-mono">
                            @{c.handle} • {c.primaryCategory} • {formatNumber(c.totalFollowers)} Reach
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 font-mono text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Engagement</span>
                          <span className="text-emerald-400 font-bold">{c.avgEngagementRate}%</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Base Rate</span>
                          <span className="text-white font-bold">{formatCurrency(c.startingPrice)}</span>
                        </div>
                        <Link href={`/creators/${c.id}`}>
                          <Button variant="secondary" size="sm" className="rounded-full font-display">
                            Media Kit
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Shortlist Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Creator Shortlist"
        description="Group creators by marketing initiative, seasonal drop, or audience demographic."
        maxWidth="md"
      >
        <form onSubmit={handleCreate} className="space-y-4">
          <Input
            label="Shortlist Name"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Q4 Black Friday UGC Cohort"
            required
          />
          <Textarea
            label="Description / Objective"
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
            placeholder="Describe target creator criteria or brief notes..."
            rows={3}
          />
          <Button variant="primary" size="md" type="submit" className="w-full rounded-full font-display font-bold">
            Create List
          </Button>
        </form>
      </Modal>

      {/* Comparison Modal */}
      {activeShortlist && (
        <CreatorComparisonModal
          isOpen={isCompareOpen}
          onClose={() => setIsCompareOpen(false)}
          creators={activeShortlist.creators}
        />
      )}
    </div>
  );
}
