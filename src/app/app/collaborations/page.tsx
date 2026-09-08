"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { collaborationService } from "@/services/collaboration.service";
import { Collaboration } from "@/core/types";
import { useAuthStore } from "@/stores/auth.store";
import { DeliverablesPipeline } from "@/components/collaborations/DeliverablesPipeline";
import { AnimatedEmptyState } from "@/components/ui/AnimatedEmptyState";
import { CreativeLoader } from "@/components/ui/CreativeLoader";
import { formatCurrency } from "@/core/utils/formatters";
import {
  FolderGit2,
  Search,
  X,
  ShieldCheck,
  CheckCircle2,
  Clock,
  DollarSign,
  Compass,
  Plus,
  Filter,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function CollaborationsWorkspacePage() {
  const { role, currentCreator, currentBrand } = useAuthStore();
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "needs_action" | "in_progress" | "completed">("all");
  const [showHowItWorks, setShowHowItWorks] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await collaborationService.getCollaborations(
          role === "creator" ? "creator" : "brand",
          role === "creator" ? currentCreator?.id : currentBrand?.id
        );
        setCollaborations(data || []);
      } catch {
        setCollaborations([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [role, currentCreator?.id, currentBrand?.id]);

  // Executive Overview Summary Metrics
  const stats = useMemo(() => {
    const total = collaborations.length;
    let inEscrowDollars = 0;
    let completedCount = 0;
    let needsActionCount = 0;

    collaborations.forEach((c) => {
      const isComplete = c.status === "completed" || c.paymentStatus === "paid";
      if (isComplete) {
        completedCount++;
      } else {
        if (c.isFunded) {
          inEscrowDollars += c.totalAgreedBudget || 0;
        }
      }

      // Check if project needs user attention
      const hasPendingDraft = c.deliverables?.some(
        (d) => d.status === "submitted" || d.status === "under_review"
      );
      const hasRevision = c.deliverables?.some((d) => d.status === "revision_requested");
      const isUnfunded = !c.isFunded && c.status !== "cancelled";

      if (role === "brand" && (isUnfunded || hasPendingDraft)) {
        needsActionCount++;
      } else if (role === "creator" && (hasRevision || (c.isFunded && !hasPendingDraft && !isComplete))) {
        needsActionCount++;
      }
    });

    const activeCount = collaborations.filter(
      (c) => c.status !== "cancelled" && c.status !== "completed" && c.paymentStatus !== "paid"
    ).length;

    return { total, activeCount, inEscrowDollars, completedCount, needsActionCount };
  }, [collaborations, role]);

  // Filtered collaborations list
  const filteredCollaborations = useMemo(() => {
    return collaborations.filter((collab) => {
      // 1. Status Filter
      if (activeFilter === "needs_action") {
        const isUnfunded = !collab.isFunded && collab.status !== "cancelled";
        const hasPendingDraft = collab.deliverables?.some(
          (d) => d.status === "submitted" || d.status === "under_review"
        );
        const hasRevision = collab.deliverables?.some((d) => d.status === "revision_requested");

        if (role === "brand") {
          if (!isUnfunded && !hasPendingDraft) return false;
        } else {
          if (!hasRevision && !collab.isFunded) return false;
        }
      } else if (activeFilter === "in_progress") {
        const isFinished = collab.status === "completed" || collab.paymentStatus === "paid" || collab.status === "cancelled";
        if (isFinished) return false;
      } else if (activeFilter === "completed") {
        const isFinished = collab.status === "completed" || collab.paymentStatus === "paid";
        if (!isFinished) return false;
      }

      // 2. Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const campaignMatch = collab.campaignTitle?.toLowerCase().includes(query);
        const creatorMatch =
          collab.creator?.fullName?.toLowerCase().includes(query) ||
          collab.creator?.handle?.toLowerCase().includes(query);
        const brandMatch = collab.brand?.companyName?.toLowerCase().includes(query);
        const deliverableMatch = collab.deliverables?.some((d) => d.title?.toLowerCase().includes(query));

        if (!campaignMatch && !creatorMatch && !brandMatch && !deliverableMatch) {
          return false;
        }
      }

      return true;
    });
  }, [collaborations, activeFilter, searchQuery, role]);

  return (
    <div className="space-y-6 text-[#0A0A0E] select-none font-sans">
      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Projects
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              100% Protected Escrow
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0E] tracking-tight font-display">
            Active Collaborations &amp; Deals
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            Submit content drafts, review feedback, and approve secured payments in one place.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-center">
          {role === "creator" ? (
            <Link href="/app/campaigns">
              <button className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-1.5 shadow-[0_4px_14px_rgba(255,210,31,0.35)] border border-black/10 active:scale-98">
                <Compass className="w-3.5 h-3.5" />
                <span>Find Campaigns</span>
              </button>
            </Link>
          ) : (
            <Link href="/app/brand/campaigns/create">
              <button className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-1.5 shadow-[0_4px_14px_rgba(255,210,31,0.35)] border border-black/10 active:scale-98">
                <Plus className="w-3.5 h-3.5" />
                <span>Post Campaign</span>
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* ── Executive Summary Metric Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/8 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#6A6A78]">
            <span className="font-medium">Active Deals</span>
            <FolderGit2 className="w-4 h-4 text-[#8A8A9A]" />
          </div>
          <span className="text-2xl font-black text-[#0A0A0E] font-display block">
            {stats.activeCount}
          </span>
          <span className="text-[11px] font-mono text-[#8A8A9A] block">
            {stats.total} total recorded
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/8 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#6A6A78]">
            <span className="font-medium">Needs Action</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <span className="text-2xl font-black text-amber-700 font-display block">
            {stats.needsActionCount}
          </span>
          <span className="text-[11px] font-mono text-amber-800/80 block">
            {role === "brand" ? "Awaiting review or deposit" : "Awaiting draft or revisions"}
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/8 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#6A6A78]">
            <span className="font-medium">Protected in Escrow</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <span className="text-2xl font-black text-emerald-700 font-display block">
            {formatCurrency(stats.inEscrowDollars)}
          </span>
          <span className="text-[11px] font-mono text-emerald-800/80 block">
            Safe in platform custody
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-2xl bg-white border border-black/8 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-[#6A6A78]">
            <span className="font-medium">Completed Deals</span>
            <CheckCircle2 className="w-4 h-4 text-[#FFD21F]" />
          </div>
          <span className="text-2xl font-black text-[#0A0A0E] font-display block">
            {stats.completedCount}
          </span>
          <span className="text-[11px] font-mono text-[#8A8A9A] block">
            100% payout released
          </span>
        </div>
      </div>

      {/* ── How It Works Quick Explainer ── */}
      {showHowItWorks && (
        <div className="p-5 rounded-3xl bg-[#FFFDF5] border border-[#FFD21F]/40 shadow-xs relative space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#0A0A0E] font-mono">
                How Deals &amp; Escrow Payments Work
              </h3>
            </div>
            <button
              onClick={() => setShowHowItWorks(false)}
              className="text-[#8A8A9A] hover:text-[#0A0A0E] text-xs font-bold p-1"
              title="Dismiss"
            >
              ✕
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                1
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#0A0A0E] block">Funds Deposited Safely</span>
                <p className="text-[11px] text-[#5A5A68] leading-relaxed">
                  The brand deposits project money upfront into the secure platform vault before the creator begins work.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                2
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#0A0A0E] block">Submit Drafts &amp; Feedback</span>
                <p className="text-[11px] text-[#5A5A68] leading-relaxed">
                  Creators upload preview links. Brands review, give feedback, and have a 120-hour window to review.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                3
              </div>
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-[#0A0A0E] block">Guaranteed Payout Release</span>
                <p className="text-[11px] text-[#5A5A68] leading-relaxed">
                  Once the draft is approved and public post is confirmed, funds release automatically to the creator.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Search & Filter Controls ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setActiveFilter("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeFilter === "all"
                ? "bg-[#0A0A0E] text-white shadow-xs"
                : "bg-white text-[#5A5A68] hover:text-[#0A0A0E] border border-black/8"
            }`}
          >
            All Deals ({collaborations.length})
          </button>
          <button
            onClick={() => setActiveFilter("needs_action")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
              activeFilter === "needs_action"
                ? "bg-amber-600 text-white shadow-xs"
                : "bg-white text-[#5A5A68] hover:text-amber-800 border border-black/8"
            }`}
          >
            <Clock className="w-3 h-3" />
            <span>Needs Action ({stats.needsActionCount})</span>
          </button>
          <button
            onClick={() => setActiveFilter("in_progress")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeFilter === "in_progress"
                ? "bg-[#0A0A0E] text-white shadow-xs"
                : "bg-white text-[#5A5A68] hover:text-[#0A0A0E] border border-black/8"
            }`}
          >
            In Progress ({stats.activeCount})
          </button>
          <button
            onClick={() => setActiveFilter("completed")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
              activeFilter === "completed"
                ? "bg-[#0A0A0E] text-white shadow-xs"
                : "bg-white text-[#5A5A68] hover:text-[#0A0A0E] border border-black/8"
            }`}
          >
            Completed ({stats.completedCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative max-w-xs w-full">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8A8A9A]" />
          <input
            type="text"
            placeholder="Search projects or partners..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-8 py-1.5 rounded-full bg-white border border-black/10 text-xs font-sans placeholder:text-[#8A8A9A] focus:outline-none focus:border-black/30 transition-all shadow-2xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8A8A9A] hover:text-[#0A0A0E] text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ── Main Projects List ── */}
      {loading ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-black/8 p-6 text-[#0A0A0E] shadow-xs">
          <CreativeLoader
            size="md"
            label="Loading Deals &amp; Projects"
            subtext="Fetching deliverables, review status, and escrow balances..."
          />
        </div>
      ) : collaborations.length === 0 ? (
        <AnimatedEmptyState
          icon={<FolderGit2 className="w-7 h-7 text-[#0A0A0E]" />}
          badgeText="Projects"
          title="No Active Deals Yet"
          description={
            role === "creator"
              ? "Your accepted pitches and ongoing brand projects will appear here once approved."
              : "Creators you hire and active content deliverables will appear here."
          }
          actionText={role === "creator" ? "Find Campaigns" : "Post Campaign"}
          actionHref={role === "creator" ? "/app/campaigns" : "/app/brand/campaigns/create"}
          secondaryText="Go to Dashboard"
          secondaryHref="/app/dashboard"
        />
      ) : filteredCollaborations.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-black/8 p-8 text-[#0A0A0E] shadow-xs space-y-3">
          <Filter className="w-8 h-8 text-[#8A8A9A] mx-auto opacity-50" />
          <h3 className="text-base font-bold text-[#0A0A0E] font-display">No Deals Found</h3>
          <p className="text-xs text-[#5A5A68] max-w-sm mx-auto">
            No projects matched your current search or filter. Try clearing the filter to see all your deals.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setActiveFilter("all");
            }}
            className="px-4 py-2 rounded-full bg-[#0A0A0E] text-white text-xs font-bold transition-all shadow-xs"
          >
            Show All Deals
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredCollaborations.map((collab) => (
            <DeliverablesPipeline key={collab.id} collaboration={collab} />
          ))}
        </div>
      )}
    </div>
  );
}
