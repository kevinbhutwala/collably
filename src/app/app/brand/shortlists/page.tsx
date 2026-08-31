"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { crmService } from "@/services/crm.service";
import { CreatorShortlist, CreatorProfile } from "@/core/types";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Input, Textarea } from "@/components/ui/Input";
import { SafeImage } from "@/components/ui/SafeImage";
import { CreatorComparisonModal } from "@/components/creators/CreatorComparisonModal";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";
import {
  Layers,
  Plus,
  ArrowUpRight,
  Scale,
  Sparkles,
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
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-brand-accent">
              Talent Curation & Shortlists
            </span>
            <span className="text-slate-300">•</span>
            <Badge variant="glow" size="sm">Brand Workspace</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Creator Shortlists & Side-by-Side Comparison
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Organize creator talent by campaign initiative, compare engagement rates, and batch invite.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="md"
            onClick={() => setIsCompareOpen(true)}
            disabled={!activeShortlist || activeShortlist.creators.length === 0}
            leftIcon={<Scale className="w-4 h-4 text-purple-600" />}
          >
            Compare Creators
          </Button>

          <Button
            variant="accent"
            size="md"
            onClick={() => setIsCreateModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            New Shortlist
          </Button>
        </div>
      </div>

      {/* Main Layout: Left Shortlists Sidebar, Right Creator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Shortlist Categories */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-3">
          <h3 className="text-sm font-bold text-slate-900 uppercase font-mono tracking-wider mb-2">
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
                      ? "bg-slate-900 text-white shadow-md"
                      : "bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80"
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-xs">{sl.name}</h4>
                    <p className={`text-[11px] mt-0.5 line-clamp-1 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                      {sl.description}
                    </p>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg ${isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"}`}>
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
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{activeShortlist.name}</h3>
                  <p className="text-xs text-slate-500">{activeShortlist.description}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Link href="/app/brand/campaigns/create">
                    <Button variant="accent" size="sm" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                      Batch Invite All
                    </Button>
                  </Link>
                </div>
              </div>

              {activeShortlist.creators.length === 0 ? (
                <div className="py-12 text-center space-y-3">
                  <Users className="w-8 h-8 text-slate-300 mx-auto" />
                  <p className="text-xs text-slate-500 font-medium">No creators added to this list yet.</p>
                  <Link href="/creators">
                    <Button variant="secondary" size="sm">
                      Browse Creator Directory
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {activeShortlist.creators.map((c) => (
                    <div key={c.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5">
                        <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
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
                          <h4 className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                            {c.fullName}
                            {c.verified && <CheckCircle2 className="w-4 h-4 fill-sky-500 text-white" />}
                          </h4>
                          <p className="text-xs text-slate-500 font-mono">
                            @{c.handle} • {c.primaryCategory} • {formatNumber(c.totalFollowers)} Reach
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 font-mono text-xs">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Engagement</span>
                          <span className="text-emerald-600 font-bold">{c.avgEngagementRate}%</span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Base Rate</span>
                          <span className="text-slate-900 font-bold">{formatCurrency(c.startingPrice)}</span>
                        </div>
                        <Link href={`/creators/${c.id}`}>
                          <Button variant="secondary" size="sm">
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
          <Button variant="accent" size="md" type="submit" className="w-full">
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
