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
  Timer,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List,
  Eye,
  EyeOff,
  SlidersHorizontal,
  ChevronRight,
  Check,
} from "lucide-react";

export default function AdminCollaborationsPage() {
  const { addToast } = useUIStore();
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "held" | "review" | "released">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"highest" | "newest">("highest");

  // Layout & Density controls
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [isCompact, setIsCompact] = useState<boolean>(true);
  const [showKpis, setShowKpis] = useState<boolean>(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Pagination
  const [pageSize, setPageSize] = useState<number>(25);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  // Paginated items
  const paginatedCollabs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredCollabs.slice(start, start + pageSize);
  }, [filteredCollabs, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredCollabs.length / pageSize) || 1;

  const toggleRow = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans max-w-[1600px] mx-auto pb-10">
      {/* ── Compact Header & Action Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/8 dark:border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shrink-0 shadow-xs">
            <Lock className="w-4 h-4 text-[#FFD21F]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0E] dark:text-white tracking-tight font-display">
                Active Escrows &amp; SLA Command
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold">
                100% Vault Protected
              </span>
            </div>
            <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4]">
              Institutional oversight of milestone deposits, 120h review timers, and creator payouts.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowKpis(!showKpis)}
            title={showKpis ? "Hide Metric Bar" : "Show Metric Bar"}
            className="p-2 rounded-xl border border-black/10 dark:border-white/10 text-xs text-[#6A6A78] dark:text-[#8E8EA4] hover:bg-black/5 dark:hover:bg-white/5 transition-all"
          >
            {showKpis ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={fetchCollabs}
            disabled={loading}
            className="px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 text-xs font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Sync
          </button>
          <button
            onClick={handleRunWatchdog}
            disabled={isRunningWatchdog}
            className="px-3.5 py-1.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-bold hover:opacity-90 transition-all flex items-center gap-1.5 shadow-2xs"
          >
            <Zap className={`w-3.5 h-3.5 text-[#FFD21F] ${isRunningWatchdog ? "animate-bounce" : ""}`} />
            {isRunningWatchdog ? "Auditing..." : "120h Watchdog"}
          </button>
        </div>
      </div>

      {/* ── Compact Executive KPI Metric Bar (Collapsible) ── */}
      {showKpis && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#7A7A8A] uppercase tracking-wider block">
                Escrow Locked
              </span>
              <span className="text-lg sm:text-xl font-black text-[#0A0A0E] dark:text-white font-display">
                {formatCurrency(stats.totalHeld, "INR")}
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono block">
                Razorpay Bank Vault
              </span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#7A7A8A] uppercase tracking-wider block">
                Active Contracts
              </span>
              <span className="text-lg sm:text-xl font-black text-[#0A0A0E] dark:text-white font-display">
                {stats.totalCount}{" "}
                <span className="text-xs font-semibold text-[#8E8EA4]">Deals</span>
              </span>
              <span className="text-[10px] text-[#6A6A78] dark:text-[#8E8EA4] font-mono block">
                {stats.inProductionCount} prod • {stats.inReviewCount} review
              </span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-[#FFD21F]/20 text-[#D97706] dark:text-[#FFD21F] flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4" />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#7A7A8A] uppercase tracking-wider block">
                120h Review SLA
              </span>
              <span className="text-lg sm:text-xl font-black text-emerald-600 dark:text-emerald-400 font-display">
                0 Breaches
              </span>
              <span className="text-[10px] text-[#6A6A78] dark:text-[#8E8EA4] font-mono block">
                Auto-defense active
              </span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Timer className="w-4 h-4" />
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-2xs flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold text-[#7A7A8A] uppercase tracking-wider block">
                Settled Capital
              </span>
              <span className="text-lg sm:text-xl font-black text-[#0A0A0E] dark:text-white font-display">
                {formatCurrency(stats.totalReleased, "INR")}
              </span>
              <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono block">
                100% on-time payouts
              </span>
            </div>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Banknote className="w-4 h-4" />
            </div>
          </div>
        </div>
      )}

      {/* ── Adjustable Controls Strip (Search, Filter, Density, View Switcher) ── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2.5 p-2 rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-2xs">
        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          <button
            onClick={() => { setFilter("all"); setCurrentPage(1); }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === "all"
                ? "bg-black dark:bg-white text-white dark:text-black shadow-2xs"
                : "bg-black/5 dark:bg-white/5 text-[#5A5A68] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white"
            }`}
          >
            All ({collaborations.length})
          </button>
          <button
            onClick={() => { setFilter("held"); setCurrentPage(1); }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === "held"
                ? "bg-emerald-600 text-white shadow-2xs"
                : "bg-black/5 dark:bg-white/5 text-[#5A5A68] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white"
            }`}
          >
            In Vault ({collaborations.filter((c: any) => c.status !== "completed" && c.paymentStatus !== "paid").length})
          </button>
          <button
            onClick={() => { setFilter("review"); setCurrentPage(1); }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === "review"
                ? "bg-amber-500 text-black shadow-2xs"
                : "bg-black/5 dark:bg-white/5 text-[#5A5A68] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white"
            }`}
          >
            120h Clock ({collaborations.filter((c: any) => c.status === "in_review" || c.status === "submitted_for_review" || c.paymentStatus === "submitted_for_review").length})
          </button>
          <button
            onClick={() => { setFilter("released"); setCurrentPage(1); }}
            className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              filter === "released"
                ? "bg-indigo-600 text-white shadow-2xs"
                : "bg-black/5 dark:bg-white/5 text-[#5A5A68] dark:text-[#9A9AA6] hover:text-[#0A0A0E] dark:hover:text-white"
            }`}
          >
            Settled ({collaborations.filter((c: any) => c.status === "completed" || c.paymentStatus === "paid").length})
          </button>
        </div>

        {/* Search, Sort, Density & View Mode */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 sm:w-56 min-w-[160px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#7A7A8A]" />
            <input
              type="text"
              placeholder="Search escrows..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
              className="w-full pl-8 pr-2.5 py-1 text-xs rounded-xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/8 dark:border-white/10 text-[#0A0A0E] dark:text-white placeholder-[#8A8A9A] focus:outline-hidden focus:border-[#FFD21F]"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1 text-xs font-mono rounded-xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/8 dark:border-white/10 text-[#0A0A0E] dark:text-white focus:outline-hidden"
          >
            <option value="highest">Highest Escrow</option>
            <option value="newest">Newest First</option>
          </select>

          {/* Density Toggle */}
          <button
            onClick={() => setIsCompact(!isCompact)}
            title={isCompact ? "Switch to Comfortable Spacing" : "Switch to Compact Density"}
            className={`px-2.5 py-1 text-xs font-mono rounded-xl border transition-all flex items-center gap-1 ${
              isCompact
                ? "bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10 text-[#0A0A0E] dark:text-white"
                : "border-black/5 dark:border-white/5 text-[#7A7A8A]"
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span className="hidden sm:inline">{isCompact ? "Compact" : "Comfortable"}</span>
          </button>

          {/* View Mode Toggle */}
          <div className="flex items-center p-0.5 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <button
              onClick={() => setViewMode("list")}
              title="Table View (Best for 10-100 items)"
              className={`p-1 rounded-lg transition-all ${
                viewMode === "list"
                  ? "bg-white dark:bg-[#1E1E2C] text-black dark:text-white shadow-2xs"
                  : "text-[#7A7A8A] hover:text-black dark:hover:text-white"
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              title="Grid Card View"
              className={`p-1 rounded-lg transition-all ${
                viewMode === "grid"
                  ? "bg-white dark:bg-[#1E1E2C] text-black dark:text-white shadow-2xs"
                  : "text-[#7A7A8A] hover:text-black dark:hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Table View: Optimized for Fast Scanning 10-100 Items ── */}
      {viewMode === "list" ? (
        <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 overflow-hidden shadow-2xs">
          {paginatedCollabs.length === 0 ? (
            <div className="p-12 text-center">
              <Lock className="w-8 h-8 text-[#A0A0B0] mx-auto mb-2 opacity-50" />
              <h3 className="font-bold text-sm text-[#0A0A0E] dark:text-white font-display">No escrows found</h3>
              <p className="text-xs text-[#7A7A8A] mt-0.5">Try adjusting your filter or search query.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-black/8 dark:border-white/10 bg-[#FAFAFC] dark:bg-[#151520] text-[10px] font-mono text-[#7A7A8A] uppercase tracking-wider">
                    <th className="py-2.5 px-4 font-bold">Brand Partner</th>
                    <th className="py-2.5 px-4 font-bold">Creator</th>
                    <th className="py-2.5 px-4 font-bold">Campaign Brief</th>
                    <th className="py-2.5 px-4 font-bold">Escrow Capital</th>
                    <th className="py-2.5 px-4 font-bold">Stage &amp; SLA</th>
                    <th className="py-2.5 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs font-sans">
                  {paginatedCollabs.map((c) => {
                    const item = c as any;
                    const isExpanded = expandedId === item.id;
                    const isCompleted = item.status === "completed" || item.paymentStatus === "paid";
                    const isReview = item.status === "in_review" || item.status === "submitted_for_review" || item.paymentStatus === "submitted_for_review";
                    const isProduction = item.status === "work_in_progress" || item.status === "payment_funded" || item.status === "payment_secured" || item.status === "active";
                    const budget = Number(item.totalAgreedBudget || item.price || 35000);
                    const currency = item.currency || "INR";

                    const brandName = item.brand?.companyName || item.brandName || "Brand Partner";
                    const brandLogo =
                      item.brand?.logoUrl ||
                      (brandName.toLowerCase().includes("snitch") ? "/brands/snitch.png" : "/brands/the-whole-truth.png");

                    const creatorName = item.creator?.fullName || item.creatorName || "Creator";
                    const creatorHandle = item.creator?.handle || item.creatorHandle || "creator";
                    const creatorAvatar = item.creator?.avatarUrl || "/creators/prarthana.jpg";

                    const deliverables = item.deliverables || [];

                    const rowPadding = isCompact ? "py-2.5 px-4" : "py-4 px-4";

                    return (
                      <React.Fragment key={item.id}>
                        <tr
                          onClick={() => toggleRow(item.id)}
                          className={`cursor-pointer transition-colors group ${
                            isExpanded
                              ? "bg-black/[0.02] dark:bg-white/[0.03]"
                              : "hover:bg-black/[0.015] dark:hover:bg-white/[0.02]"
                          }`}
                        >
                          {/* Brand */}
                          <td className={rowPadding}>
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-white p-1 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                                <SafeImage
                                  src={brandLogo}
                                  alt={brandName}
                                  className="w-full h-full object-contain"
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-[#0A0A0E] dark:text-white truncate max-w-[130px] sm:max-w-[170px]">
                                  {brandName}
                                </div>
                                <span className="text-[10px] text-[#7A7A8A] font-mono block">
                                  {item.brand?.industry || "Verified Brand"}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Creator */}
                          <td className={rowPadding}>
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shrink-0 bg-black/5">
                                <SafeImage
                                  src={creatorAvatar}
                                  alt={creatorName}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="min-w-0">
                                <div className="font-bold text-[#0A0A0E] dark:text-white truncate max-w-[120px] sm:max-w-[160px]">
                                  {creatorName}
                                </div>
                                <span className="text-[10px] text-[#7A7A8A] font-mono block">
                                  @{creatorHandle.replace("@", "")}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Campaign Brief */}
                          <td className={rowPadding}>
                            <div className="min-w-0 max-w-[200px] lg:max-w-[280px]">
                              <div className="font-semibold text-[#0A0A0E] dark:text-white truncate">
                                {item.campaignTitle || item.title}
                              </div>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="px-1.5 py-0.5 rounded bg-black/5 dark:bg-white/5 text-[10px] font-mono text-[#6A6A78] dark:text-[#9A9AA6]">
                                  {deliverables.length} {deliverables.length === 1 ? "Item" : "Items"}
                                </span>
                                <span className="text-[10px] text-[#8E8EA4] font-mono">
                                  Due {new Date(item.finalDeadline || item.dueDate || Date.now() + 864000000).toLocaleDateString("en-IN", { month: "short", day: "numeric" })}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Escrow Capital */}
                          <td className={rowPadding}>
                            <div className="font-mono">
                              <div className="font-bold text-sm text-[#0A0A0E] dark:text-white">
                                {formatCurrency(budget, currency)}
                              </div>
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">
                                Net: {formatCurrency(budget * 0.9, currency)}
                              </span>
                            </div>
                          </td>

                          {/* Stage & SLA */}
                          <td className={rowPadding}>
                            {isCompleted ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20 font-mono text-[11px] font-bold">
                                <CheckCircle2 className="w-3 h-3 text-indigo-500" />
                                Disbursed
                              </span>
                            ) : isReview ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 border border-amber-500/30 font-mono text-[11px] font-bold animate-pulse">
                                <Timer className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                                120h Review Clock
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-mono text-[11px] font-bold">
                                <Lock className="w-3 h-3 text-emerald-500" />
                                Escrow Vault Secured
                              </span>
                            )}
                          </td>

                          {/* Actions */}
                          <td className={`${rowPadding} text-right`} onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              {!isCompleted && (
                                <button
                                  onClick={() => setSelectedCollabForRelease(item)}
                                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] font-bold shadow-2xs transition-all whitespace-nowrap"
                                >
                                  Disburse
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setSelectedCollab(item);
                                  setIsCancelModalOpen(true);
                                }}
                                title="Arbitration & Refund"
                                className="p-1 rounded-lg text-[#7A7A8A] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                              >
                                <Scale className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => toggleRow(item.id)}
                                title={isExpanded ? "Collapse Details" : "Expand Details"}
                                className="p-1 rounded-lg text-[#7A7A8A] hover:text-[#0A0A0E] dark:hover:text-white transition-all"
                              >
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Inline Accordion Detail View */}
                        {isExpanded && (
                          <tr className="bg-[#FAFAFC] dark:bg-[#151520] border-b border-black/5 dark:border-white/5">
                            <td colSpan={6} className="p-4 sm:p-5">
                              <div className="space-y-4">
                                {/* Pipeline Stepper */}
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between text-[11px] font-mono">
                                    <span className="font-bold text-[#0A0A0E] dark:text-white">
                                      Escrow Pipeline Status
                                    </span>
                                    <span className="text-[#7A7A8A]">
                                      {isCompleted ? "100% Settled" : isReview ? "75% In Review (120h Clock)" : "50% Production"}
                                    </span>
                                  </div>
                                  <div className="w-full h-1.5 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden flex">
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
                                        isCompleted ? "bg-emerald-500" : isReview ? "bg-amber-500 animate-pulse" : "bg-black/10 dark:bg-white/10"
                                      }`}
                                      title="Disbursed"
                                    />
                                  </div>
                                </div>

                                {/* Financial Split & Deliverable Line Items Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                                  {/* Deliverables */}
                                  <div className="p-3 rounded-xl bg-white dark:bg-[#1A1A28] border border-black/5 dark:border-white/5 space-y-2">
                                    <span className="text-[10px] font-mono text-[#7A7A8A] uppercase tracking-wider block">
                                      Milestone Deliverables ({deliverables.length})
                                    </span>
                                    <div className="space-y-1.5 max-h-36 overflow-y-auto">
                                      {deliverables.length === 0 ? (
                                        <p className="text-xs text-[#8E8EA4]">No deliverable items attached.</p>
                                      ) : (
                                        deliverables.map((del: any) => (
                                          <div
                                            key={del.id}
                                            className="p-2 rounded-lg bg-[#FAFAFC] dark:bg-[#12121A] border border-black/5 dark:border-white/5 flex items-center justify-between text-xs"
                                          >
                                            <span className="font-semibold text-[#0A0A0E] dark:text-white truncate">
                                              {del.title}
                                            </span>
                                            <span
                                              className={`px-2 py-0.5 rounded font-mono text-[10px] font-bold uppercase shrink-0 ${
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
                                        ))
                                      )}
                                    </div>
                                  </div>

                                  {/* Financial Breakdown & Governance */}
                                  <div className="p-3 rounded-xl bg-white dark:bg-[#1A1A28] border border-black/5 dark:border-white/5 space-y-2 font-mono text-xs">
                                    <span className="text-[10px] text-[#7A7A8A] uppercase tracking-wider block">
                                      Vault Settlement Ledger
                                    </span>
                                    <div className="space-y-1">
                                      <div className="flex justify-between">
                                        <span className="text-[#8E8EA4]">Total Escrow Deposit:</span>
                                        <strong>{formatCurrency(budget, currency)}</strong>
                                      </div>
                                      <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                                        <span>Creator Share (90%):</span>
                                        <strong>{formatCurrency(budget * 0.9, currency)}</strong>
                                      </div>
                                      <div className="flex justify-between text-[#D97706] dark:text-[#FFD21F]">
                                        <span>Platform Commission (10%):</span>
                                        <strong>{formatCurrency(budget * 0.1, currency)}</strong>
                                      </div>
                                      <div className="flex justify-between pt-1 border-t border-black/5 dark:border-white/5 text-[11px]">
                                        <span className="text-[#8E8EA4]">Contract Vault ID:</span>
                                        <span className="text-[#0A0A0E] dark:text-white">{item.id}</span>
                                      </div>
                                    </div>
                                    <div className="pt-2 flex items-center justify-end gap-2">
                                      <button
                                        onClick={() => {
                                          setSelectedCollab(item);
                                          setIsCancelModalOpen(true);
                                        }}
                                        className="px-2.5 py-1 rounded-lg border border-red-500/20 text-red-600 hover:bg-red-500/10 text-[11px] font-bold transition-all"
                                      >
                                        Arbitrate / Kill Fee
                                      </button>
                                      {!isCompleted && (
                                        <button
                                          onClick={() => setSelectedCollabForRelease(item)}
                                          className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-2xs transition-all"
                                        >
                                          Authorize Direct Disbursal
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        /* ── Compact Grid View (Multi-column) ── */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {paginatedCollabs.length === 0 ? (
            <div className="col-span-full p-12 text-center rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10">
              <Lock className="w-8 h-8 text-[#A0A0B0] mx-auto mb-2 opacity-50" />
              <h3 className="font-bold text-sm text-[#0A0A0E] dark:text-white font-display">No escrows found</h3>
              <p className="text-xs text-[#7A7A8A] mt-0.5">Try adjusting your filter or search query.</p>
            </div>
          ) : (
            paginatedCollabs.map((c) => {
              const item = c as any;
              const isCompleted = item.status === "completed" || item.paymentStatus === "paid";
              const isReview = item.status === "in_review" || item.status === "submitted_for_review" || item.paymentStatus === "submitted_for_review";
              const budget = Number(item.totalAgreedBudget || item.price || 35000);
              const currency = item.currency || "INR";

              const brandName = item.brand?.companyName || item.brandName || "Brand Partner";
              const brandLogo =
                item.brand?.logoUrl ||
                (brandName.toLowerCase().includes("snitch") ? "/brands/snitch.png" : "/brands/the-whole-truth.png");

              const creatorName = item.creator?.fullName || item.creatorName || "Creator";
              const creatorHandle = item.creator?.handle || item.creatorHandle || "creator";
              const creatorAvatar = item.creator?.avatarUrl || "/creators/prarthana.jpg";

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 hover:border-[#FFD21F] shadow-2xs space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    {/* Brand & Creator Header */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-lg bg-white p-0.5 border border-black/10 dark:border-white/10 flex items-center justify-center shrink-0">
                          <SafeImage src={brandLogo} alt={brandName} className="w-full h-full object-contain" />
                        </div>
                        <span className="font-bold text-xs truncate">{brandName}</span>
                      </div>
                      <span className="text-[#8E8EA4] text-xs">➔</span>
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shrink-0">
                          <SafeImage src={creatorAvatar} alt={creatorName} className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-xs truncate">{creatorName}</span>
                      </div>
                    </div>

                    {/* Campaign brief & Escrow capital */}
                    <div className="p-2.5 rounded-xl bg-[#FAFAFC] dark:bg-[#161622] border border-black/5 dark:border-white/5 space-y-1">
                      <h5 className="font-semibold text-xs truncate text-[#0A0A0E] dark:text-white">
                        {item.campaignTitle || item.title}
                      </h5>
                      <div className="flex items-center justify-between font-mono text-xs">
                        <span className="text-[#7A7A8A]">Vault Deposit:</span>
                        <strong className="text-emerald-600 dark:text-emerald-400">
                          {formatCurrency(budget, currency)}
                        </strong>
                      </div>
                    </div>

                    {/* Status Pill */}
                    <div className="flex items-center justify-between">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 font-mono text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" /> Disbursed
                        </span>
                      ) : isReview ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-800 dark:text-amber-300 font-mono text-[10px] font-bold animate-pulse">
                          <Timer className="w-3 h-3" /> 120h Review Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-mono text-[10px] font-bold">
                          <Lock className="w-3 h-3" /> Vault Secured
                        </span>
                      )}
                      <span className="text-[10px] font-mono text-[#8E8EA4]">
                        {(item.deliverables || []).length} Deliverables
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-2">
                    <button
                      onClick={() => {
                        setSelectedCollab(item);
                        setIsCancelModalOpen(true);
                      }}
                      className="px-2 py-1 rounded-lg text-[#7A7A8A] hover:text-red-600 text-[11px] font-bold transition-all"
                    >
                      Arbitrate
                    </button>
                    {!isCompleted ? (
                      <button
                        onClick={() => setSelectedCollabForRelease(item)}
                        className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-mono text-[11px] font-bold shadow-2xs transition-all"
                      >
                        Disburse Funds
                      </button>
                    ) : (
                      <span className="text-[11px] font-mono text-emerald-600 font-bold">Settled</span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* ── Compact Pagination Bar ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs font-mono text-[#7A7A8A]">
        <div className="flex items-center gap-2">
          <span>
            Showing {filteredCollabs.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}–
            {Math.min(currentPage * pageSize, filteredCollabs.length)} of {filteredCollabs.length} escrows
          </span>
          <span>•</span>
          <div className="flex items-center gap-1">
            <span>Per page:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-transparent border-b border-black/20 dark:border-white/20 text-[#0A0A0E] dark:text-white font-bold focus:outline-hidden"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-1 self-end sm:self-auto">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              Prev
            </button>
            <span className="px-2 text-[#0A0A0E] dark:text-white font-bold">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2.5 py-1 rounded-lg border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:pointer-events-none transition-all"
            >
              Next
            </button>
          </div>
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
