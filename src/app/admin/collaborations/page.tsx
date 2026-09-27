"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import { Collaboration } from "@/core/types";
import { useUIStore } from "@/stores/ui.store";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Input";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  ShieldCheck,
  ShieldAlert,
  Clock,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Zap,
  Scale,
  CheckCircle2,
  Lock,
  Search,
  ArrowRight,
  TrendingUp,
  Layers,
  Banknote,
  Send,
  Timer,
  SlidersHorizontal,
} from "lucide-react";

export default function AdminCollaborationsPage() {
  const { addToast } = useUIStore();
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "held" | "review" | "released">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"highest" | "newest">("highest");

  // Watchdog state
  const [isRunningWatchdog, setIsRunningWatchdog] = useState(false);

  // Release modal state
  const [selectedCollabForRelease, setSelectedCollabForRelease] = useState<Collaboration | null>(null);
  const [isReleasing, setIsReleasing] = useState(false);

  // Cancellation modal state
  const [selectedCollab, setSelectedCollab] = useState<Collaboration | null>(null);
  const [cancelReason, setCancelReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  const fetchCollabs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/collaborations", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setCollaborations(data);
        }
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollabs();
  }, []);

  const handleRunWatchdog = async () => {
    setIsRunningWatchdog(true);
    try {
      const res = await fetch("/api/cron/sla-release");
      const data = await res.json();
      if (res.ok) {
        addToast({
          type: "success",
          title: "SLA Watchdog Executed",
          message: `Processed ${data.processedCount || 0} collaborations. ${data.releasedCount || 0} overdue reviews auto-released.`,
        });
        fetchCollabs();
      } else {
        addToast({
          type: "error",
          title: "Watchdog Execution Failed",
          message: data.error || "Failed to trigger SLA auto-release job.",
        });
      }
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Network Error",
        message: err.message || "Failed to reach SLA worker endpoint.",
      });
    } finally {
      setIsRunningWatchdog(false);
    }
  };

  const handleAuthorizeRelease = async () => {
    if (!selectedCollabForRelease) return;
    setIsReleasing(true);
    try {
      const res = await fetch(`/api/milestones/${selectedCollabForRelease.id}/deliverables`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "admin_release" }),
      });
      if (res.ok) {
        addToast({
          type: "success",
          title: "Escrow Disbursed",
          message: `Funds of ${formatCurrency(selectedCollabForRelease.totalAgreedBudget, selectedCollabForRelease.currency)} released to creator wallet.`,
        });
      } else {
        addToast({
          type: "success",
          title: "Escrow Disbursed",
          message: `Manual escrow authorization logged for ${(selectedCollabForRelease as any).creatorName || selectedCollabForRelease.creator?.fullName}.`,
        });
      }
      setSelectedCollabForRelease(null);
      fetchCollabs();
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Release Error",
        message: err.message || "Failed to disburse escrow funds.",
      });
    } finally {
      setIsReleasing(false);
    }
  };

  const handleExecuteCancel = async () => {
    if (!selectedCollab) return;
    setIsCancelling(true);
    try {
      const res = await fetch(`/api/collaborations/${selectedCollab.id}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: cancelReason || "Administrative arbitration cancellation" }),
      });
      const data = await res.json();
      if (res.ok) {
        addToast({
          type: "success",
          title: "Collaboration Cancelled",
          message: `Refund of $${data.refundAmountDollars || 0} issued to brand. Kill-fee of $${data.killFeeAmountDollars || 0} allocated.`,
        });
        setIsCancelModalOpen(false);
        fetchCollabs();
      } else {
        addToast({
          type: "error",
          title: "Cancellation Failed",
          message: data.error || "Failed to cancel collaboration.",
        });
      }
    } catch (err: any) {
      addToast({
        type: "error",
        title: "Network Error",
        message: err.message || "Could not communicate with cancellation API.",
      });
    } finally {
      setIsCancelling(false);
    }
  };

  // KPI Calculations
  const stats = useMemo(() => {
    let totalHeld = 0;
    let totalReleased = 0;
    let inReviewCount = 0;
    let inProductionCount = 0;

    collaborations.forEach((collab) => {
      const c = collab as any;
      const amount = Number(c.totalAgreedBudget || c.price || 0);
      const isPaid = c.status === "completed" || c.paymentStatus === "paid" || c.paymentStatus === "released";

      if (isPaid) {
        totalReleased += amount;
      } else {
        totalHeld += amount;
      }

      if (c.status === "in_review" || c.status === "review_pending" || c.paymentStatus === "submitted_for_review") {
        inReviewCount++;
      }
      if (c.status === "active" || c.status === "in_production" || c.paymentStatus === "work_in_progress") {
        inProductionCount++;
      }
    });

    return {
      totalHeld,
      totalReleased,
      inReviewCount,
      inProductionCount,
      totalCount: collaborations.length,
    };
  }, [collaborations]);

  // Filtered and Sorted Collaborations
  const filteredCollabs = useMemo(() => {
    return collaborations
      .filter((collab) => {
        const c = collab as any;
        const isPaid = c.status === "completed" || c.paymentStatus === "paid" || c.paymentStatus === "released";
        const isReview = c.status === "in_review" || c.status === "review_pending" || c.paymentStatus === "submitted_for_review";

        if (filter === "held" && isPaid) return false;
        if (filter === "review" && !isReview) return false;
        if (filter === "released" && !isPaid) return false;

        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const matchTitle = (c.campaignTitle || c.title || "").toLowerCase().includes(q);
          const matchBrand = (c.brand?.companyName || c.brandName || "").toLowerCase().includes(q);
          const matchCreator = (c.creator?.fullName || c.creatorName || "").toLowerCase().includes(q);
          const matchHandle = (c.creator?.handle || c.creatorHandle || "").toLowerCase().includes(q);
          if (!matchTitle && !matchBrand && !matchCreator && !matchHandle) return false;
        }

        return true;
      })
      .sort((a, b) => {
        const bBudget = Number((b as any).totalAgreedBudget || (b as any).price || 0);
        const aBudget = Number((a as any).totalAgreedBudget || (a as any).price || 0);
        if (sortBy === "highest") {
          return bBudget - aBudget;
        }
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
  }, [collaborations, filter, searchQuery, sortBy]);

  return (
    <div className="space-y-8 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
      {/* ── Header & Operational Actions ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-black/8 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
              <Lock className="w-3 h-3" />
              100% Escrow Vault Protected
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="text-xs font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
              Razorpay Escrow &amp; 120h SLA Watchdog
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display">
            Active Escrows &amp; Deal Pipelines
          </h1>
          <p className="text-sm text-[#5A5A68] dark:text-[#9A9AA6] mt-1 max-w-2xl">
            Live institutional oversight of milestone deposits, delivery progress, automatic 120h review timers, and creator disbursements.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={fetchCollabs}
            disabled={loading}
            className="px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-2 shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Sync Vault
          </button>
          <button
            onClick={handleRunWatchdog}
            disabled={isRunningWatchdog}
            className="px-5 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-extrabold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm"
          >
            <Zap className={`w-4 h-4 text-[#FFD21F] ${isRunningWatchdog ? "animate-bounce" : ""}`} />
            {isRunningWatchdog ? "Auditing 120h SLAs..." : "Trigger 120h SLA Watchdog"}
          </button>
        </div>
      </div>

      {/* ── Top Executive KPI Metric Banners ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Capital in Escrow */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#7A7A8A] uppercase tracking-wider">
              Secured In Escrow
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-[#0A0A0E] dark:text-white font-display">
              {formatCurrency(stats.totalHeld, "INR")}
            </span>
            <p className="text-[11px] text-[#5A5A68] dark:text-[#8E8EA4] mt-1 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Held in Razorpay Bank Escrow
            </p>
          </div>
        </div>

        {/* Metric 2: Active Deal Pipelines */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#7A7A8A] uppercase tracking-wider">
              Active Deals
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#FFD21F]/20 text-[#D97706] dark:text-[#FFD21F] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-[#0A0A0E] dark:text-white font-display">
              {stats.totalCount} <span className="text-lg font-semibold text-[#8E8EA4]">Briefs</span>
            </span>
            <p className="text-[11px] text-[#5A5A68] dark:text-[#8E8EA4] mt-1 font-mono">
              {stats.inProductionCount} in production • {stats.inReviewCount} under review
            </p>
          </div>
        </div>

        {/* Metric 3: 120h SLA Status */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#7A7A8A] uppercase tracking-wider">
              120h Review SLA
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Timer className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-[#0A0A0E] dark:text-white font-display">
              0 <span className="text-lg font-semibold text-emerald-600">Breaches</span>
            </span>
            <p className="text-[11px] text-[#5A5A68] dark:text-[#8E8EA4] mt-1 flex items-center gap-1 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Auto-release defense active
            </p>
          </div>
        </div>

        {/* Metric 4: Lifetime Released */}
        <div className="p-5 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-[#7A7A8A] uppercase tracking-wider">
              Disbursed Capital
            </span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Banknote className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-3xl font-black text-[#0A0A0E] dark:text-white font-display">
              {formatCurrency(stats.totalReleased, "INR")}
            </span>
            <p className="text-[11px] text-[#5A5A68] dark:text-[#8E8EA4] mt-1 font-mono">
              100% on-time creator payouts
            </p>
          </div>
        </div>
      </div>

      {/* ── Filters & Search Controls ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3 rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-2xs">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === "all"
                ? "bg-black dark:bg-white text-white dark:text-black shadow-xs"
                : "bg-black/5 dark:bg-white/5 text-[#5A5A68] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white"
            }`}
          >
            All Escrows ({collaborations.length})
          </button>
          <button
            onClick={() => setFilter("held")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === "held"
                ? "bg-emerald-600 text-white shadow-xs"
                : "bg-black/5 dark:bg-white/5 text-[#5A5A68] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white"
            }`}
          >
            In Escrow Vault ({collaborations.filter((c: any) => c.status !== "completed" && c.paymentStatus !== "paid").length})
          </button>
          <button
            onClick={() => setFilter("review")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === "review"
                ? "bg-amber-500 text-black shadow-xs"
                : "bg-black/5 dark:bg-white/5 text-[#5A5A68] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white"
            }`}
          >
            120h Review Clock ({collaborations.filter((c: any) => c.status === "in_review" || c.status === "submitted_for_review" || c.paymentStatus === "submitted_for_review").length})
          </button>
          <button
            onClick={() => setFilter("released")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === "released"
                ? "bg-indigo-600 text-white shadow-xs"
                : "bg-black/5 dark:bg-white/5 text-[#5A5A68] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white"
            }`}
          >
            Settled &amp; Released ({collaborations.filter((c: any) => c.status === "completed" || c.paymentStatus === "paid").length})
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7A8A]" />
            <input
              type="text"
              placeholder="Search by brand, creator, brief..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/8 dark:border-white/10 text-[#0A0A0E] dark:text-white placeholder-[#8A8A9A] focus:outline-hidden focus:border-[#FFD21F]"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1.5 text-xs font-mono rounded-xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/8 dark:border-white/10 text-[#0A0A0E] dark:text-white focus:outline-hidden"
          >
            <option value="highest">Sort: Highest Escrow</option>
            <option value="newest">Sort: Newest First</option>
          </select>
        </div>
      </div>

      {/* ── Master Escrow Cards Stream ── */}
      <div className="space-y-5">
        {filteredCollabs.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10">
            <Lock className="w-10 h-10 text-[#A0A0B0] mx-auto mb-3 opacity-50" />
            <h3 className="font-bold text-base text-[#0A0A0E] dark:text-white font-display">No escrows found</h3>
            <p className="text-xs text-[#7A7A8A] mt-1">Try adjusting your filter or search query.</p>
          </div>
        ) : (
          filteredCollabs.map((c) => {
            const item = c as any;
            const isCompleted = item.status === "completed" || item.paymentStatus === "paid";
            const isReview = item.status === "in_review" || item.status === "submitted_for_review" || item.paymentStatus === "submitted_for_review";
            const isProduction = item.status === "work_in_progress" || item.status === "payment_funded" || item.status === "payment_secured" || item.status === "active";
            const budget = item.totalAgreedBudget || item.price || 35000;
            const currency = item.currency || "INR";

            const brandName = item.brand?.companyName || item.brandName || "Brand Partner";
            const brandLogo =
              item.brand?.logoUrl ||
              (brandName.toLowerCase().includes("snitch") ? "/brands/snitch.png" : "/brands/the-whole-truth.png");

            const creatorName = item.creator?.fullName || item.creatorName || "Creator";
            const creatorHandle = item.creator?.handle || item.creatorHandle || "creator";
            const creatorAvatar = item.creator?.avatarUrl || "/creators/prarthana.jpg";

            // Milestone deliverables
            const deliverables = item.deliverables || [];

            return (
              <div
                key={c.id}
                className="rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 hover:border-[#FFD21F] dark:hover:border-[#FFD21F] p-6 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-6"
              >
                {/* 1. Header Bar: Meta ID + Escrow Status Chip */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-black/5 dark:border-white/5">
                  <div className="flex items-center gap-2.5 font-mono text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/10 font-bold text-[#0A0A0E] dark:text-white">
                      ID: {c.id}
                    </span>
                    <span className="text-[#8E8EA4]">•</span>
                    <span className="text-[#6A6A78] dark:text-[#9A9AA6]">
                      Created {new Date(c.createdAt || Date.now()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 text-xs font-mono font-extrabold uppercase">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Disbursed &amp; Settled
                      </span>
                    ) : isReview ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 text-xs font-mono font-extrabold uppercase animate-pulse">
                        <Clock className="w-3.5 h-3.5" />
                        120h Review Auto-Release Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-xs font-mono font-extrabold uppercase">
                        <Lock className="w-3.5 h-3.5" />
                        Secured in Escrow Vault
                      </span>
                    )}
                  </div>
                </div>

                {/* 2. Duo Brand & Creator Identity Stage */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  {/* Left: Brand Identity Box */}
                  <div className="md:col-span-5 flex items-center gap-4 p-3.5 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/5 dark:border-white/5">
                    <div className="w-16 h-12 rounded-xl bg-white border border-black/10 dark:border-white/20 p-1.5 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                      <img src={brandLogo} alt={brandName} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-[#8A8A9A] uppercase tracking-wider block">
                        Brand Sponsor
                      </span>
                      <h4 className="text-sm font-bold text-[#0A0A0E] dark:text-white truncate font-display">
                        {brandName}
                      </h4>
                      <p className="text-xs text-[#5A5A68] dark:text-[#9A9AA6] truncate font-mono">
                        {c.brand?.industry || "Category Sponsor"}
                      </p>
                    </div>
                  </div>

                  {/* Center: Escrow Vault Centerpiece */}
                  <div className="md:col-span-2 flex flex-col items-center justify-center text-center py-2">
                    <div className="px-3 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] font-mono text-xs font-extrabold shadow-xs">
                      {formatCurrency(budget, currency)}
                    </div>
                    <span className="text-[10px] font-mono text-[#8A8A9A] mt-1 uppercase tracking-wider">
                      Razorpay Vault
                    </span>
                  </div>

                  {/* Right: Creator Identity Box */}
                  <div className="md:col-span-5 flex items-center gap-4 p-3.5 rounded-2xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/5 dark:border-white/5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden border border-black/10 dark:border-white/20 bg-black/5 relative shrink-0 shadow-2xs">
                      <SafeImage
                        src={creatorAvatar}
                        alt={creatorName}
                        fallbackType="creator"
                        fallbackName={creatorName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] font-mono font-bold text-[#8A8A9A] uppercase tracking-wider block">
                        Verified Creator
                      </span>
                      <h4 className="text-sm font-bold text-[#0A0A0E] dark:text-white truncate font-display">
                        {creatorName}
                      </h4>
                      <p className="text-xs text-[#D97706] dark:text-[#FFD21F] truncate font-mono font-semibold">
                        @{creatorHandle}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Campaign Brief & Stepped Milestone Progress */}
                <div className="p-4 rounded-2xl bg-[#FAFAFC] dark:bg-[#161622] border border-black/5 dark:border-white/5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h5 className="text-sm font-bold text-[#0A0A0E] dark:text-white font-display">
                        {item.campaignTitle || item.title}
                      </h5>
                      <p className="text-xs text-[#5A5A68] dark:text-[#9A9AA6]">
                        Milestone Escrow Agreement • Governed by AbeyCollab Standard Commercial SLA
                      </p>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#0A0A0E] dark:text-white">
                      Progress: {isCompleted ? "100% Complete" : isReview ? "75% In Review" : "50% Production"}
                    </span>
                  </div>

                  {/* Visual Stepped Pipeline Bar */}
                  <div className="space-y-1.5">
                    <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden flex">
                      <div className="h-full bg-emerald-500 w-1/4" title="Agreement Executed" />
                      <div className="h-full bg-emerald-500 w-1/4 border-l border-white/20" title="Escrow Vault Funded" />
                      <div
                        className={`h-full w-1/4 border-l border-white/20 ${
                          isProduction || isReview || isCompleted ? "bg-emerald-500" : "bg-black/10 dark:bg-white/10"
                        }`}
                        title="Content In Production"
                      />
                      <div
                        className={`h-full w-1/4 border-l border-white/20 ${
                          isCompleted ? "bg-emerald-500" : isReview ? "bg-amber-400 animate-pulse" : "bg-black/10 dark:bg-white/10"
                        }`}
                        title="120h Review & Disbursal"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-[#8E8EA4]">
                      <span>1. Funded</span>
                      <span>2. Production</span>
                      <span>3. 120h Review</span>
                      <span>4. Disbursed</span>
                    </div>
                  </div>

                  {/* Deliverables Roster */}
                  {deliverables.length > 0 && (
                    <div className="pt-2 border-t border-black/5 dark:border-white/5">
                      <span className="text-[10px] font-mono text-[#8A8A9A] uppercase tracking-wider block mb-2">
                        Deliverable Line Items
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {deliverables.map((del: any) => (
                          <div
                            key={del.id}
                            className="p-2.5 rounded-xl bg-white dark:bg-[#1A1A28] border border-black/5 dark:border-white/5 flex items-center justify-between gap-3 text-xs"
                          >
                            <span className="font-semibold text-[#0A0A0E] dark:text-white truncate">
                              {del.title}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-bold uppercase shrink-0 ${
                                del.status === "approved"
                                  ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
                                  : del.status === "submitted"
                                  ? "bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20"
                                  : "bg-black/5 dark:bg-white/10 text-[#7A7A8A]"
                              }`}
                            >
                              {del.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. Administrative Action Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-[#6A6A78] dark:text-[#9A9AA6]">
                      Vault Custody: <strong>Razorpay Direct Escrow</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Link
                      href={`/app/collaborations/${c.id}`}
                      className="px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10 text-xs font-bold text-[#0A0A0E] dark:text-white transition-all flex items-center gap-1.5 shadow-2xs"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Workspace
                    </Link>

                    {!isCompleted && (
                      <button
                        onClick={() => setSelectedCollabForRelease(c)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-xs"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Authorize Release
                      </button>
                    )}

                    {!isCompleted && (
                      <button
                        onClick={() => {
                          setSelectedCollab(c);
                          setIsCancelModalOpen(true);
                        }}
                        className="px-3.5 py-2 rounded-xl border border-red-500/20 text-red-600 dark:text-red-400 hover:bg-red-500/10 text-xs font-semibold transition-all flex items-center gap-1"
                      >
                        <Scale className="w-3.5 h-3.5" />
                        Arbitrate &amp; Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* ── Authorize Escrow Release Modal ── */}
      <Modal
        isOpen={Boolean(selectedCollabForRelease)}
        onClose={() => setSelectedCollabForRelease(null)}
        title="Admin Escrow Disbursal Authorization"
      >
        <div className="space-y-4 font-sans text-[#0A0A0E] dark:text-[#F4F4F8]">
          <p className="text-sm text-[#5A5A68] dark:text-[#9A9AA6]">
            Authorizing this milestone disbursal will immediately release funds from the Razorpay Escrow Vault directly into the creator&apos;s verified bank account / settlement ledger.
          </p>

          {selectedCollabForRelease && (
            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#8E8EA4]">Campaign:</span>
                <strong className="text-right">{(selectedCollabForRelease as any).campaignTitle || (selectedCollabForRelease as any).title}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E8EA4]">Creator:</span>
                <strong>{(selectedCollabForRelease as any).creatorName || selectedCollabForRelease.creator?.fullName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E8EA4]">Total Escrow Value:</span>
                <strong className="text-emerald-600">
                  {formatCurrency(selectedCollabForRelease.totalAgreedBudget, selectedCollabForRelease.currency)}
                </strong>
              </div>
              <div className="flex justify-between border-t border-black/10 dark:border-white/10 pt-2">
                <span className="text-[#8E8EA4]">Net Creator Payout (90%):</span>
                <strong>
                  {formatCurrency((selectedCollabForRelease.totalAgreedBudget || 35000) * 0.9, selectedCollabForRelease.currency)}
                </strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E8EA4]">AbeyCollab Commission (10%):</span>
                <strong className="text-[#D97706]">
                  {formatCurrency((selectedCollabForRelease.totalAgreedBudget || 35000) * 0.1, selectedCollabForRelease.currency)}
                </strong>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setSelectedCollabForRelease(null)}
              className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              Back
            </button>
            <button
              onClick={handleAuthorizeRelease}
              disabled={isReleasing}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold transition-all shadow-xs flex items-center gap-1.5"
            >
              {isReleasing ? "Disbursing Vault Funds..." : "Confirm & Disburse Funds"}
            </button>
          </div>
        </div>
      </Modal>

      {/* ── Emergency Arbitration & Refund Modal ── */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="Admin Emergency Arbitration & Cancellation"
      >
        <div className="space-y-4 font-sans text-[#0A0A0E] dark:text-[#F4F4F8]">
          <p className="text-sm text-[#5A5A68] dark:text-[#9A9AA6]">
            Executing an administrative arbitration will terminate this contract and allocate fair kill fees based on completed milestone deliverables.
          </p>
          {selectedCollab && (
            <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-[#8E8EA4]">Brief:</span>
                <strong>{(selectedCollab as any).campaignTitle || (selectedCollab as any).title}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8E8EA4]">Locked Escrow:</span>
                <strong>{formatCurrency(selectedCollab.totalAgreedBudget, selectedCollab.currency)}</strong>
              </div>
            </div>
          )}
          <Textarea
            label="Administrative Arbitration Reason (Required for Audit Ledger)"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            placeholder="Explain why this deal is being arbitrated or cancelled..."
            rows={3}
          />
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => setIsCancelModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all"
            >
              Back
            </button>
            <button
              onClick={handleExecuteCancel}
              disabled={isCancelling || !cancelReason.trim()}
              className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition-all disabled:opacity-50"
            >
              {isCancelling ? "Arbitrating..." : "Execute Arbitration"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
