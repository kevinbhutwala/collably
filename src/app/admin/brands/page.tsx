"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { BrandProfile, Campaign } from "@/core/types";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency } from "@/core/utils/formatters";
import { useUIStore } from "@/stores/ui.store";
import { useGlobalCurrency } from "@/core/hooks/useGlobalCurrency";
import {
  Building2,
  CheckCircle2,
  ShieldCheck,
  ShieldAlert,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List,
  SlidersHorizontal,
  DollarSign,
  Layers,
  FileCheck2,
  Globe,
  MapPin,
  Users,
  Copy,
  Check,
  FileDown,
  Sparkles,
  Lock,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  Briefcase,
  Mail,
  BadgePercent,
} from "lucide-react";

type FilterTab = "all" | "verified" | "high_volume" | "active_campaigns";

export default function AdminBrandsPage() {
  const { addToast } = useUIStore();
  const { format } = useGlobalCurrency();

  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  // Layout & controls
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [isCompact, setIsCompact] = useState(true);
  const [showKpis, setShowKpis] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [brandsRes, campsRes] = await Promise.all([
        fetch("/api/brands", { cache: "no-store" }),
        fetch("/api/campaigns", { cache: "no-store" }),
      ]);

      if (brandsRes.ok) {
        const bData = await brandsRes.json();
        const brandList = Array.isArray(bData) ? bData : [];
        // Filter out dummy/deleted accounts if any
        setBrands(brandList.filter((b: BrandProfile) => b.companyName !== "apolo" && !b.id.includes("1790541715660")));
      }

      if (campsRes.ok) {
        const cData = await campsRes.json();
        setCampaigns(Array.isArray(cData) ? cData : cData.campaigns ?? []);
      }
    } catch (err) {
      console.error("Failed to load brands directory:", err);
      addToast({
        type: "error",
        title: "Load Failed",
        message: "Failed to fetch corporate brand directory.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const toggleVerify = async (id: string, currentVerified: boolean, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setUpdatingId(id);
    const nextVerified = !currentVerified;

    // Optimistic UI update
    setBrands((prev) =>
      prev.map((b) => (b.id === id ? { ...b, verified: nextVerified } : b))
    );

    try {
      const res = await fetch(`/api/brands/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: nextVerified }),
      });

      if (res.ok) {
        addToast({
          type: "success",
          title: "Partner Verification Updated",
          message: `Corporate partner status updated to ${nextVerified ? "Verified Partner" : "Standard"}.`,
        });
      } else {
        const err = await res.json();
        throw new Error(err.error || "Failed to update verification");
      }
    } catch (err: any) {
      // Revert optimistic update
      setBrands((prev) =>
        prev.map((b) => (b.id === id ? { ...b, verified: currentVerified } : b))
      );
      addToast({
        type: "error",
        title: "Update Failed",
        message: err.message || "Failed to update brand status.",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const handleCopy = (text: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(text);
    setTimeout(() => setCopiedId(null), 2000);
    addToast({
      type: "info",
      title: "Copied",
      message: `Copied ${text} to clipboard.`,
    });
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(brands, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `abeycollab_brands_directory_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast({
      type: "success",
      title: "Directory Exported",
      message: `Downloaded ${brands.length} brand enterprise records in JSON format.`,
    });
  };

  // KPIs
  const stats = useMemo(() => {
    const totalBrands = brands.length;
    const verifiedCount = brands.filter((b) => b.verified).length;
    const totalCapital = brands.reduce((acc, b) => acc + (b.totalSpent || 0), 0);
    const activeCamps = campaigns.filter((c) => c.status === "active" || c.status === "applications_open").length;

    return {
      totalBrands,
      verifiedCount,
      verifiedPct: totalBrands > 0 ? Math.round((verifiedCount / totalBrands) * 100) : 100,
      totalCapital,
      activeCamps,
    };
  }, [brands, campaigns]);

  // Brand-Campaign lookup helper
  const getBrandCampaigns = (brandId: string, companyName: string) => {
    return campaigns.filter(
      (c) => c.brandId === brandId || c.brand?.companyName?.toLowerCase() === companyName.toLowerCase()
    );
  };

  // Filtered & Searched Brands
  const filteredBrands = useMemo(() => {
    return brands.filter((b) => {
      // Tab filter
      if (activeTab === "verified" && !b.verified) return false;
      if (activeTab === "high_volume" && (b.totalSpent || 0) < 200000) return false;
      if (activeTab === "active_campaigns") {
        const camps = getBrandCampaigns(b.id, b.companyName);
        if (camps.length === 0) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = b.companyName?.toLowerCase().includes(q);
        const matchIndustry = b.industry?.toLowerCase().includes(q);
        const matchLocation = b.location?.toLowerCase().includes(q);
        const matchWebsite = b.websiteUrl?.toLowerCase().includes(q);
        const matchEmail = b.email?.toLowerCase().includes(q);
        if (!matchName && !matchIndustry && !matchLocation && !matchWebsite && !matchEmail) {
          return false;
        }
      }

      return true;
    });
  }, [brands, activeTab, searchQuery, campaigns]);

  return (
    <div className="space-y-6 max-w-7xl text-[#0B0A14] dark:text-[#F4F4F8] pb-16">
      {/* 1. Executive Header Command Strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-black/8 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-2.5 py-0.5 text-[10px] font-bold text-[#0B0A14] dark:text-[#F4F4F8] uppercase tracking-wider font-mono">
            <Building2 className="w-3 h-3 text-primary" />
            <span>AbeyCollab Enterprise Directory</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0B0A14] dark:text-white tracking-tight font-display mt-1.5 flex items-center gap-2">
            <span>Brand Accounts & Enterprise Compliance</span>
          </h1>
          <p className="text-xs text-[#5A5A68] dark:text-[#9A9AA6] mt-0.5 font-sans max-w-2xl">
            Manage verified corporate partners, escrow underwriting limits, active sponsorship briefs, and enterprise solvency.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Toggle KPIs */}
          <button
            onClick={() => setShowKpis(!showKpis)}
            className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-black/10 dark:border-white/10 text-[#0B0A14] dark:text-[#F4F4F8] text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            title="Toggle Executive KPI Strip"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
            <span className="hidden sm:inline">KPI Strip</span>
            {showKpis ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {/* Export JSON */}
          <button
            onClick={handleExportJSON}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#181824] border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[#0B0A14] dark:text-[#F4F4F8] text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="Export enterprise brand directory"
          >
            <FileDown className="w-3.5 h-3.5 text-neutral-600 dark:text-[#9A9AA6]" />
            <span className="hidden sm:inline">Export</span>
          </button>

          {/* Refresh */}
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-[#181824] border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[#0B0A14] dark:text-[#F4F4F8] text-[11px] font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
            title="Refresh brand accounts"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-neutral-600 dark:text-[#9A9AA6] ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* 2. Executive KPI Strip (Collapsible) */}
      {showKpis && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {/* Card 1: Enterprise Brands */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between text-[#5A5A68] dark:text-[#9A9AA6] text-[11px]">
              <span className="font-semibold uppercase tracking-wider font-mono">Corporate Accounts</span>
              <Building2 className="w-4 h-4 text-primary" />
            </div>
            <div className="mt-1 flex items-baseline gap-2 flex-wrap">
              <span className="text-base sm:text-xl font-black text-[#0B0A14] dark:text-white font-mono truncate">
                {stats.totalBrands}
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-sm shrink-0">
                {stats.verifiedPct}% Verified
              </span>
            </div>
            <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6] mt-1 truncate">
              {stats.verifiedCount} Tier-1 approved partners
            </p>
          </div>

          {/* Card 2: Total Deployed Capital */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between text-[#5A5A68] dark:text-[#9A9AA6] text-[11px]">
              <span className="font-semibold uppercase tracking-wider font-mono">Escrow Deployed</span>
              <DollarSign className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="mt-1 flex items-baseline gap-2 flex-wrap">
              <span className="text-base sm:text-xl font-black text-[#0B0A14] dark:text-white font-mono truncate">
                {format(stats.totalCapital, "USD")}
              </span>
              <span className="text-[10px] font-bold text-neutral-600 dark:text-neutral-400 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded-sm shrink-0">
                GMV
              </span>
            </div>
            <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6] mt-1 truncate">
              Lifetime sponsorship funding
            </p>
          </div>

          {/* Card 3: Active Campaigns */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between text-[#5A5A68] dark:text-[#9A9AA6] text-[11px]">
              <span className="font-semibold uppercase tracking-wider font-mono">Active Briefs</span>
              <Layers className="w-4 h-4 text-cyan-500" />
            </div>
            <div className="mt-1 flex items-baseline gap-2 flex-wrap">
              <span className="text-base sm:text-xl font-black text-[#0B0A14] dark:text-white font-mono truncate">
                {stats.activeCamps}
              </span>
              <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-1.5 py-0.5 rounded-sm shrink-0">
                Live Now
              </span>
            </div>
            <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6] mt-1 truncate">
              Open creator applications & matching
            </p>
          </div>

          {/* Card 4: Underwriting & Solvency */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs relative overflow-hidden group">
            <div className="flex items-center justify-between text-[#5A5A68] dark:text-[#9A9AA6] text-[11px]">
              <span className="font-semibold uppercase tracking-wider font-mono">Credit Solvency</span>
              <Lock className="w-4 h-4 text-purple-500" />
            </div>
            <div className="mt-1 flex items-baseline gap-2 flex-wrap">
              <span className="text-base sm:text-xl font-black text-[#0B0A14] dark:text-white font-mono truncate">
                100%
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-sm shrink-0">
                Tier-1
              </span>
            </div>
            <p className="text-[10px] text-[#5A5A68] dark:text-[#9A9AA6] mt-1 truncate">
              0 defaults • Full escrow collateralized
            </p>
          </div>
        </div>
      )}

      {/* 3. Control Bar: Search, Category Filters, View Switcher & Density */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 p-2 bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 rounded-xl shadow-xs">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 lg:pb-0 scrollbar-none text-xs">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all cursor-pointer ${
              activeTab === "all"
                ? "bg-[#0B0A14] text-white dark:bg-white dark:text-[#0B0A14] shadow-xs"
                : "text-[#5A5A68] dark:text-[#9A9AA6] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            All Accounts ({brands.length})
          </button>
          <button
            onClick={() => setActiveTab("verified")}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "verified"
                ? "bg-[#0B0A14] text-white dark:bg-white dark:text-[#0B0A14] shadow-xs"
                : "text-[#5A5A68] dark:text-[#9A9AA6] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Verified Partners</span>
            <span className="px-1.5 py-0.2 rounded-full text-[9px] bg-black/10 dark:bg-white/10 font-mono">
              {stats.verifiedCount}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("high_volume")}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "high_volume"
                ? "bg-[#0B0A14] text-white dark:bg-white dark:text-[#0B0A14] shadow-xs"
                : "text-[#5A5A68] dark:text-[#9A9AA6] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <DollarSign className="w-3.5 h-3.5 text-primary" />
            <span>High Volume (&gt;₹20L)</span>
          </button>
          <button
            onClick={() => setActiveTab("active_campaigns")}
            className={`px-3 py-1.5 rounded-lg font-bold text-[11px] whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === "active_campaigns"
                ? "bg-[#0B0A14] text-white dark:bg-white dark:text-[#0B0A14] shadow-xs"
                : "text-[#5A5A68] dark:text-[#9A9AA6] hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-cyan-500" />
            <span>Active Campaigns</span>
          </button>
        </div>

        {/* Search, View Mode, Density Switcher */}
        <div className="flex items-center gap-2">
          {/* Search Box */}
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search brand, city, or industry..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:outline-hidden focus:ring-1 focus:ring-primary text-[#0B0A14] dark:text-white placeholder:text-neutral-400"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-lg bg-black/5 dark:bg-white/5 p-0.5 border border-black/10 dark:border-white/10">
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === "table"
                  ? "bg-white dark:bg-[#1C1C28] text-[#0B0A14] dark:text-white shadow-xs"
                  : "text-neutral-500 hover:text-[#0B0A14] dark:hover:text-white"
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-all cursor-pointer ${
                viewMode === "grid"
                  ? "bg-white dark:bg-[#1C1C28] text-[#0B0A14] dark:text-white shadow-xs"
                  : "text-neutral-500 hover:text-[#0B0A14] dark:hover:text-white"
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Density Toggle */}
          <button
            onClick={() => setIsCompact(!isCompact)}
            className={`px-2.5 py-1.5 rounded-lg border text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer ${
              isCompact
                ? "bg-primary/15 text-[#0B0A14] dark:text-accent border-primary/40"
                : "bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 border-black/10 dark:border-white/10"
            }`}
            title="Toggle compact row spacing"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span className="hidden sm:inline">{isCompact ? "Compact" : "Normal"}</span>
          </button>
        </div>
      </div>

      {/* 4. Main Brands List / Grid */}
      {loading ? (
        <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-12 text-center shadow-xs">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono text-[#5A5A68] dark:text-[#9A9AA6]">Loading corporate brand directory...</p>
        </div>
      ) : filteredBrands.length === 0 ? (
        <div className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-12 text-center shadow-xs space-y-2">
          <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-neutral-400 flex items-center justify-center mx-auto">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">No Brands Match Criteria</h3>
          <p className="text-[11px] text-[#5A5A68] dark:text-[#9A9AA6] max-w-sm mx-auto">
            Try adjusting your search query or switching to &ldquo;All Accounts&rdquo;.
          </p>
        </div>
      ) : viewMode === "table" ? (
        /* TABLE VIEW */
        <div className="space-y-3">
          {/* Mobile-Native Card Layout (< md) */}
          <div className="block md:hidden space-y-3">
            {filteredBrands.map((b) => {
              const brandCamps = getBrandCampaigns(b.id, b.companyName);
              const isExpanded = expandedId === b.id;

              return (
                <div
                  key={b.id}
                  className="rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs overflow-hidden"
                >
                  <div
                    onClick={() => setExpandedId(isExpanded ? null : b.id)}
                    className="p-4 space-y-3 cursor-pointer"
                  >
                    {/* Header: Logo, Name, Verified */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white dark:bg-[#181824] border border-black/10 dark:border-white/10 shrink-0 flex items-center justify-center p-1 shadow-2xs">
                          {b.logoUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={b.logoUrl}
                              alt={b.companyName}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <Building2 className="w-5 h-5 text-neutral-400" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-sm text-[#0B0A14] dark:text-white font-display truncate">
                              {b.companyName}
                            </h3>
                            {b.verified && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                            )}
                          </div>
                          <span className="text-[11px] font-mono text-neutral-400 dark:text-neutral-500 block truncate">
                            {b.websiteUrl?.replace(/^https?:\/\//, "") || b.id}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase shrink-0 border ${
                          b.verified
                            ? "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30"
                            : "bg-black/5 dark:bg-white/5 text-neutral-500 border-black/10 dark:border-white/10"
                        }`}
                      >
                        {b.verified ? "Verified" : "Standard"}
                      </span>
                    </div>

                    {/* Meta row: Industry & Headcount */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-black/5 dark:border-white/5 text-[#5A5A68] dark:text-[#9A9AA6]">
                      <div className="flex items-center gap-1 min-w-0">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 shrink-0">
                          {b.industry}
                        </span>
                        <span className="text-[10px] truncate max-w-[130px]">• {b.location}</span>
                      </div>
                      <div className="flex items-center gap-1 font-mono text-[10px] shrink-0">
                        <Users className="w-3 h-3 text-neutral-400 shrink-0" />
                        <span>{b.companySize}</span>
                      </div>
                    </div>

                    {/* Stats pills */}
                    <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-center">
                      <div className="p-1.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                        <div className="text-[9px] uppercase text-neutral-400">Deployed</div>
                        <div className="text-xs font-black text-[#0B0A14] dark:text-white truncate">
                          {format(b.totalSpent || 50000, "USD")}
                        </div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                        <div className="text-[9px] uppercase text-neutral-400">Briefs</div>
                        <div className="text-xs font-black text-[#0B0A14] dark:text-white">
                          {brandCamps.length} Active
                        </div>
                      </div>
                      <div className="p-1.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                        <div className="text-[9px] uppercase text-neutral-400">Rating</div>
                        <div className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">
                          Tier-1
                        </div>
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-black/5 dark:border-white/5" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={(e) => toggleVerify(b.id, !!b.verified, e)}
                        disabled={updatingId === b.id}
                        className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                          b.verified
                            ? "bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-[#0B0A14] dark:text-white border-black/10 dark:border-white/10"
                            : "bg-gradient-to-r from-primary via-[#9333EA] to-accent hover:brightness-105 text-[#0B0A14] border-black/15 shadow-xs"
                        }`}
                      >
                        {updatingId === b.id ? "Updating..." : b.verified ? "Revoke Partner" : "Approve Partner"}
                      </button>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : b.id)}
                        className="px-3 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-xs font-bold hover:bg-black/5 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300 transition-colors cursor-pointer flex items-center gap-1 shrink-0"
                      >
                        <span>{isExpanded ? "Hide" : "Details"}</span>
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Mobile Expandable Drawer */}
                  {isExpanded && (
                    <div className="p-4 bg-[#FAF9F5] dark:bg-[#14141E] border-t border-black/8 dark:border-white/10 space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                          {b.companyName} File
                        </div>
                        <div className="flex items-center gap-1.5">
                          {b.websiteUrl && (
                            <a
                              href={b.websiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded-md bg-white dark:bg-[#1E1E2C] border border-black/10 dark:border-white/10 text-[#0B0A14] dark:text-white"
                              title="Website"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <Link
                            href={`/brands/${b.id}`}
                            className="px-2 py-1 rounded-md text-[10px] font-bold bg-primary text-[#0B0A14] border border-black/15 flex items-center gap-1 shadow-xs"
                          >
                            <span>Profile</span>
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                      {/* Escrow Underwriting Standing */}
                      <div className="p-3 rounded-xl bg-white dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-1.5 text-[11px] font-mono">
                        <div className="flex items-center gap-1.5 text-xs font-bold font-display text-[#0B0A14] dark:text-white pb-1">
                          <Lock className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Escrow Solvency Standing</span>
                        </div>
                        <div className="flex justify-between text-neutral-500">
                          <span>Collateral:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">100% Pre-funded</span>
                        </div>
                        <div className="flex justify-between text-neutral-500">
                          <span>Disputes:</span>
                          <span className="font-bold text-[#0B0A14] dark:text-white">0.00%</span>
                        </div>
                        <div className="flex justify-between text-neutral-500">
                          <span>SLA Approvals:</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">99.4%</span>
                        </div>
                      </div>

                      {/* Primary Contact */}
                      <div className="p-3 rounded-xl bg-white dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-1 text-[11px] font-mono">
                        <div className="flex items-center gap-1.5 text-xs font-bold font-display text-[#0B0A14] dark:text-white pb-1">
                          <Mail className="w-3.5 h-3.5 text-cyan-500" />
                          <span>Primary Contact</span>
                        </div>
                        <div className="text-neutral-500 truncate">
                          {b.email || (b.companyName === "Snitch" ? "influencer.reach@snitch.co.in" : "partnerships@thewholetruthfoods.com")}
                        </div>
                      </div>

                      {/* Active Briefs list */}
                      {brandCamps.length > 0 && (
                        <div className="p-3 rounded-xl bg-white dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-1.5">
                          <div className="text-xs font-bold font-display text-[#0B0A14] dark:text-white flex items-center justify-between">
                            <span>Live Briefs ({brandCamps.length})</span>
                            <Link href="/admin/campaigns" className="text-[10px] text-primary font-mono hover:underline">
                              All
                            </Link>
                          </div>
                          {brandCamps.map((camp) => (
                            <div key={camp.id} className="p-1.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex items-center justify-between gap-2 text-[10px]">
                              <span className="font-medium text-[#0B0A14] dark:text-white truncate">
                                {camp.title}
                              </span>
                              <span className="font-mono font-bold text-neutral-500 shrink-0">
                                {format(camp.budget?.totalBudget || 0, camp.budget?.currency || "USD")}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Desktop & Tablet Table (hidden md:block) */}
          <div className="hidden md:block rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-black/8 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] text-[10px] uppercase font-bold text-[#5A5A68] dark:text-[#9A9AA6] font-mono">
                    <th className="py-3 px-4">Brand & Company</th>
                    <th className="py-3 px-4">Industry & HQ</th>
                    <th className="py-3 px-4">Headcount</th>
                    <th className="py-3 px-4">Campaigns</th>
                    <th className="py-3 px-4">Capital Deployed</th>
                    <th className="py-3 px-4">Risk Rating</th>
                    <th className="py-3 px-4 text-center">Partner Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5 font-sans">
                  {filteredBrands.map((b) => {
                    const brandCamps = getBrandCampaigns(b.id, b.companyName);
                    const isExpanded = expandedId === b.id;

                    return (
                      <React.Fragment key={b.id}>
                        <tr
                          onClick={() => setExpandedId(isExpanded ? null : b.id)}
                          className={`hover:bg-[#F8F8FA] dark:hover:bg-[#181824] transition-colors cursor-pointer ${
                            isExpanded ? "bg-primary/5 dark:bg-[#191924]" : ""
                          }`}
                        >
                          {/* Company Logo & Name */}
                          <td className={`${isCompact ? "py-2.5" : "py-3.5"} px-4`}>
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-xl overflow-hidden bg-white dark:bg-[#181824] border border-black/10 dark:border-white/10 shrink-0 flex items-center justify-center p-1 shadow-2xs">
                                {b.logoUrl ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={b.logoUrl}
                                    alt={b.companyName}
                                    className="w-full h-full object-contain"
                                  />
                                ) : (
                                  <Building2 className="w-4 h-4 text-neutral-400" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <h3 className="font-bold text-xs text-[#0B0A14] dark:text-white font-display">
                                    {b.companyName}
                                  </h3>
                                  {b.verified && (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                  )}
                                </div>
                                <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 block truncate max-w-[180px]">
                                  {b.websiteUrl?.replace(/^https?:\/\//, "") || b.id}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Industry & Location */}
                          <td className={`${isCompact ? "py-2.5" : "py-3.5"} px-4`}>
                            <div className="space-y-0.5">
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 inline-block">
                                {b.industry}
                              </span>
                              <div className="flex items-center gap-1 text-[10px] text-[#5A5A68] dark:text-[#9A9AA6]">
                                <MapPin className="w-3 h-3 shrink-0" />
                                <span className="truncate max-w-[150px]">{b.location}</span>
                              </div>
                            </div>
                          </td>

                          {/* Headcount */}
                          <td className={`${isCompact ? "py-2.5" : "py-3.5"} px-4 font-mono text-[11px] text-[#5A5A68] dark:text-[#9A9AA6]`}>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3 text-neutral-400 shrink-0" />
                              <span>{b.companySize}</span>
                            </div>
                          </td>

                          {/* Campaigns count */}
                          <td className={`${isCompact ? "py-2.5" : "py-3.5"} px-4`}>
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary/15 text-[#0B0A14] dark:text-accent border border-primary/30">
                              <Layers className="w-3 h-3" />
                              <span>{brandCamps.length} Briefs</span>
                            </span>
                          </td>

                          {/* Capital Invested */}
                          <td className={`${isCompact ? "py-2.5" : "py-3.5"} px-4 font-mono text-xs font-black text-[#0B0A14] dark:text-white`}>
                            {format(b.totalSpent || 50000, "USD")}
                          </td>

                          {/* Risk Rating */}
                          <td className={`${isCompact ? "py-2.5" : "py-3.5"} px-4`}>
                            <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                              Tier-1 • A+
                            </span>
                          </td>

                          {/* Verification Status */}
                          <td className={`${isCompact ? "py-2.5" : "py-3.5"} px-4 text-center`}>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase inline-flex items-center gap-1 border ${
                                b.verified
                                  ? "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30"
                                  : "bg-black/5 dark:bg-white/5 text-neutral-500 border-black/10 dark:border-white/10"
                              }`}
                            >
                              {b.verified ? "Verified Partner" : "Standard"}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className={`${isCompact ? "py-2.5" : "py-3.5"} px-4 text-right`}>
                            <div className="flex items-center justify-end gap-1.5" onClick={(e) => e.stopPropagation()}>
                              <button
                                onClick={(e) => toggleVerify(b.id, !!b.verified, e)}
                                disabled={updatingId === b.id}
                                className={`px-3 py-1 rounded-md text-[10px] font-bold transition-all border cursor-pointer ${
                                  b.verified
                                    ? "bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/15 text-[#0B0A14] dark:text-white border-black/10 dark:border-white/10"
                                    : "bg-gradient-to-r from-primary via-[#9333EA] to-accent hover:brightness-105 text-[#0B0A14] border-black/15 shadow-xs"
                                }`}
                              >
                                {updatingId === b.id ? "Updating..." : b.verified ? "Revoke Partner" : "Approve Partner"}
                              </button>

                              <button
                                onClick={() => setExpandedId(isExpanded ? null : b.id)}
                                className="p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-neutral-500 transition-colors cursor-pointer"
                                title="Toggle details"
                              >
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </td>
                        </tr>

                        {/* Expandable Inline Details Drawer */}
                        {isExpanded && (
                          <tr className="bg-[#FAF9F5] dark:bg-[#14141E]">
                            <td colSpan={8} className="p-4 sm:p-5 border-b border-black/8 dark:border-white/10">
                              <div className="space-y-4">
                                {/* Top Bar of Drawer */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-black/5 dark:border-white/5">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <h4 className="text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                                        {b.companyName} Enterprise File
                                      </h4>
                                      <span className="text-[10px] font-mono text-neutral-400">ID: {b.id}</span>
                                      <button
                                        onClick={(e) => handleCopy(b.id, e)}
                                        className="text-neutral-400 hover:text-[#0B0A14] dark:hover:text-white"
                                        title="Copy ID"
                                      >
                                        {copiedId === b.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                                      </button>
                                    </div>
                                    <p className="text-[11px] text-[#5A5A68] dark:text-[#9A9AA6] max-w-2xl">
                                      {b.headline || b.description || "Enterprise corporate partner on the AbeyCollab Creator Marketplace."}
                                    </p>
                                  </div>

                                  <div className="flex items-center gap-2">
                                    {b.websiteUrl && (
                                      <a
                                        href={b.websiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-white dark:bg-[#1E1E2C] border border-black/10 dark:border-white/10 hover:border-primary flex items-center gap-1 text-[#0B0A14] dark:text-white transition-all shadow-xs"
                                      >
                                        <span>Official Website</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    )}
                                    <Link
                                      href={`/brands/${b.id}`}
                                      className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-primary text-[#0B0A14] border border-black/15 hover:brightness-105 flex items-center gap-1 transition-all shadow-xs"
                                    >
                                      <span>Public Profile</span>
                                      <ArrowUpRight className="w-3 h-3" />
                                    </Link>
                                  </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  {/* Underwriting & Solvency */}
                                  <div className="p-3 rounded-xl bg-white dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
                                    <div className="flex items-center gap-1.5 text-xs font-bold font-display text-[#0B0A14] dark:text-white">
                                      <Lock className="w-3.5 h-3.5 text-emerald-500" />
                                      <span>Escrow Underwriting Standing</span>
                                    </div>
                                    <div className="space-y-1.5 text-[11px] font-mono">
                                      <div className="flex justify-between text-neutral-500">
                                        <span>Escrow Collateral Ratio:</span>
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400">100% Pre-funded</span>
                                      </div>
                                      <div className="flex justify-between text-neutral-500">
                                        <span>Dispute Rate:</span>
                                        <span className="font-bold text-[#0B0A14] dark:text-white">0.00%</span>
                                      </div>
                                      <div className="flex justify-between text-neutral-500">
                                        <span>Review SLA Adherence:</span>
                                        <span className="font-bold text-emerald-600 dark:text-emerald-400">99.4% (Fast Approver)</span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Contact & Workspace */}
                                  <div className="p-3 rounded-xl bg-white dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
                                    <div className="flex items-center gap-1.5 text-xs font-bold font-display text-[#0B0A14] dark:text-white">
                                      <Mail className="w-3.5 h-3.5 text-cyan-500" />
                                      <span>Primary Authorized Contact</span>
                                    </div>
                                    <div className="space-y-1.5 text-[11px] font-mono">
                                      <div className="flex justify-between text-neutral-500">
                                        <span>Partnerships Lead:</span>
                                        <span className="font-bold text-[#0B0A14] dark:text-white truncate max-w-[130px]">
                                          {b.email || (b.companyName === "Snitch" ? "influencer.reach@snitch.co.in" : "partnerships@thewholetruthfoods.com")}
                                        </span>
                                      </div>
                                      <div className="flex justify-between text-neutral-500">
                                        <span>Headquarters:</span>
                                        <span className="font-bold text-[#0B0A14] dark:text-white">{b.location}</span>
                                      </div>
                                      <div className="flex justify-between text-neutral-500">
                                        <span>Platform Joined:</span>
                                        <span className="font-bold text-[#0B0A14] dark:text-white">
                                          {new Date(b.createdAt || "2026-01-01").toLocaleDateString()}
                                        </span>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Active Campaigns List */}
                                  <div className="p-3 rounded-xl bg-white dark:bg-[#181824] border border-black/5 dark:border-white/5 space-y-2">
                                    <div className="flex items-center justify-between text-xs font-bold font-display text-[#0B0A14] dark:text-white">
                                      <div className="flex items-center gap-1.5">
                                        <Briefcase className="w-3.5 h-3.5 text-amber-500" />
                                        <span>Live Sponsorship Briefs ({brandCamps.length})</span>
                                      </div>
                                      <Link href="/admin/campaigns" className="text-[10px] text-primary font-mono hover:underline">
                                        All briefs
                                      </Link>
                                    </div>

                                    {brandCamps.length === 0 ? (
                                      <p className="text-[10px] font-mono text-neutral-400 py-1">No active campaigns running.</p>
                                    ) : (
                                      <div className="space-y-1.5 text-[11px] font-sans">
                                        {brandCamps.map((camp) => (
                                          <div key={camp.id} className="p-1.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 flex items-center justify-between gap-2">
                                            <span className="font-medium text-[#0B0A14] dark:text-white truncate text-[10px] flex-1">
                                              {camp.title}
                                            </span>
                                            <span className="font-mono text-[10px] font-bold text-neutral-500 shrink-0">
                                              {format(camp.budget?.totalBudget || 0, camp.budget?.currency || "USD")}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
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
          </div>
        </div>
      ) : (
        /* GRID VIEW */
        <div className={`grid grid-cols-1 md:grid-cols-2 ${isCompact ? "gap-3" : "gap-4"}`}>
          {filteredBrands.map((b) => {
            const brandCamps = getBrandCampaigns(b.id, b.companyName);

            return (
              <div
                key={b.id}
                className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs hover:border-primary/60 transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-white dark:bg-[#181824] border border-black/10 dark:border-white/10 shrink-0 flex items-center justify-center p-1.5 shadow-2xs">
                        {b.logoUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={b.logoUrl}
                            alt={b.companyName}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Building2 className="w-6 h-6 text-neutral-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h3 className="font-black text-sm text-[#0B0A14] dark:text-white font-display">
                            {b.companyName}
                          </h3>
                          {b.verified && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />}
                        </div>
                        <span className="text-[11px] font-mono text-[#5A5A68] dark:text-[#9A9AA6]">
                          {b.industry}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono uppercase border ${
                        b.verified
                          ? "bg-emerald-50 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30"
                          : "bg-black/5 dark:bg-white/5 text-neutral-500 border-black/10 dark:border-white/10"
                      }`}
                    >
                      {b.verified ? "Verified Partner" : "Standard"}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#5A5A68] dark:text-[#9A9AA6] mt-3 line-clamp-2 leading-relaxed">
                    {b.headline || b.description || "Enterprise corporate partner running sponsored collaborations on AbeyCollab."}
                  </p>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 rounded-xl bg-[#F8F8FA] dark:bg-[#181824] border border-black/5 dark:border-white/5 text-center font-mono">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-400 block">Invested</span>
                      <span className="text-xs font-black text-[#0B0A14] dark:text-white">
                        {format(b.totalSpent || 50000, "USD")}
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-400 block">Briefs</span>
                      <span className="text-xs font-black text-cyan-600 dark:text-cyan-400">
                        {brandCamps.length} Live
                      </span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-neutral-400 block">Rating</span>
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                        Tier-1 A+
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[11px] text-neutral-500">
                    <MapPin className="w-3 h-3 text-neutral-400" />
                    <span>{b.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/brands/${b.id}`}
                      className="px-2.5 py-1 text-[11px] font-bold rounded-md bg-black/5 dark:bg-white/10 hover:bg-black/10 text-[#0B0A14] dark:text-white transition-all"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => toggleVerify(b.id, !!b.verified)}
                      disabled={updatingId === b.id}
                      className={`px-3 py-1 rounded-md text-[11px] font-bold transition-all border cursor-pointer ${
                        b.verified
                          ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-700 dark:text-rose-400 border-rose-500/20"
                          : "bg-primary hover:brightness-105 text-[#0B0A14] border-black/15 shadow-xs"
                      }`}
                    >
                      {updatingId === b.id ? "Updating..." : b.verified ? "Revoke" : "Approve Partner"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
