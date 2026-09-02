"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { campaignService } from "@/services/campaign.service";
import { Campaign } from "@/core/types";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import {
  PlusCircle,
  Search,
  Layers,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Briefcase,
  SlidersHorizontal,
} from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { cn } from "@/lib/utils";

export default function BrandCampaignsManagementPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "recruiting" | "active" | "completed">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await campaignService.getCampaigns();
      setCampaigns(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (statusFilter === "recruiting") return (c.acceptedCount || 0) < c.maxCreators;
    if (statusFilter === "active") return (c.acceptedCount || 0) > 0 && (c.acceptedCount || 0) <= c.maxCreators;
    if (statusFilter === "completed") return false;
    return true;
  });

  const totalEscrowPool = campaigns.reduce((acc, c) => acc + (c.budget?.totalBudget || 0), 0);
  const totalApplicants = campaigns.reduce((acc, c) => acc + (c.applicantsCount || 0), 0);

  const tabs = [
    { key: "all" as const, label: "All Briefs", count: campaigns.length, icon: Layers },
    { key: "recruiting" as const, label: "Recruiting", count: campaigns.filter((c) => (c.acceptedCount || 0) < c.maxCreators).length, icon: Users },
    { key: "active" as const, label: "In Production", count: campaigns.filter((c) => (c.acceptedCount || 0) > 0).length, icon: Clock },
  ];

  return (
    <div className="space-y-6 text-[#0A0A0E] select-none font-sans">
      {/* Desktop Header */}
      <div className="hidden lg:flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Brand Workspace
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Active Campaigns
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-display tracking-tight">
            Active Campaigns &amp; Briefs
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            Manage open sponsorship briefs, approve proposals, and track video deliverables.
          </p>
        </div>

        <Link href="/app/brand/campaigns/create">
          <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-[0_2px_12px_rgba(255,210,31,0.35)] border border-black/10 flex items-center gap-2">
            <PlusCircle className="w-4 h-4 text-[#0A0A0E]" />
            <span>Create Campaign Brief</span>
          </button>
        </Link>
      </div>

      {/* Top Performance Telemetry Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-3xl bg-white border border-black/8 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#7A7A8A] uppercase font-mono">Active Briefs</span>
          <p className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-display">{campaigns.length}</p>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Live in marketplace
          </span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-black/8 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#7A7A8A] uppercase font-mono">Total Escrow Vault</span>
          <p className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-mono">{formatCurrency(totalEscrowPool || 45000)}</p>
          <span className="text-[11px] text-[#5A5A68] font-medium flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-[#FFD21F]" /> 100% Pre-funded
          </span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-black/8 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#7A7A8A] uppercase font-mono">Creator Pitches</span>
          <p className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-display">{totalApplicants}</p>
          <span className="text-[11px] text-[#5A5A68] font-medium">Ready for review</span>
        </div>

        <div className="p-4 rounded-3xl bg-white border border-black/8 shadow-xs space-y-1">
          <span className="text-[10px] font-bold text-[#7A7A8A] uppercase font-mono">Milestone Rate</span>
          <p className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-mono">98.4%</p>
          <span className="text-[11px] text-emerald-600 font-semibold">On-time delivery</span>
        </div>
      </div>

      {/* Redesigned Search & Segmented Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pt-1">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#F4F4F8] rounded-2xl border border-black/8 overflow-x-auto no-scrollbar shadow-xs">
          {tabs.map((tab) => {
            const isActive = statusFilter === tab.key;
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setStatusFilter(tab.key)}
                className={cn(
                  "px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-2",
                  isActive
                    ? "bg-white text-[#0A0A0E] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-black/8"
                    : "text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-black/5"
                )}
              >
                <Icon className={cn("w-3.5 h-3.5", isActive ? "text-[#8A7000]" : "text-[#7A7A8A]")} />
                <span>{tab.label}</span>
                <span
                  className={cn(
                    "px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold",
                    isActive ? "bg-[#0A0A0E] text-white" : "bg-black/5 text-[#5A5A68]"
                  )}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7A8A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns, tags..."
            className="w-full bg-white border border-black/8 rounded-2xl pl-9 pr-3 py-2 text-xs font-medium text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/20 shadow-xs transition-all"
          />
        </div>
      </div>

      {/* Campaigns Grid */}
      {filteredCampaigns.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-black/8 p-8 space-y-3 shadow-xs">
          <Briefcase className="w-8 h-8 text-[#8A8A9A] mx-auto" />
          <p className="text-sm font-bold text-[#0A0A0E]">No campaigns found</p>
          <p className="text-xs text-[#6A6A78]">Try clearing filters or create a new campaign brief.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCampaigns.map((c) => {
            const cohortPercentage = Math.round(((c.acceptedCount || 0) / (c.maxCreators || 1)) * 100);
            return (
              <div
                key={c.id}
                className="group rounded-3xl bg-white border border-black/8 hover:border-[#FFD21F] hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between shadow-xs relative overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Card Cover Banner & Badge */}
                  <div className="relative h-36 rounded-2xl overflow-hidden bg-[#F5F5F9] border border-black/5">
                    <SafeImage
                      src={c.coverImage || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80"}
                      alt={c.title}
                      fallbackType="campaign"
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/40 text-[#0A0A0E] text-[10px] font-sans font-extrabold uppercase tracking-wider shadow-xs">
                        {c.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md text-[#FFD21F] text-xs font-mono font-black border border-[#FFD21F]/30">
                        {formatCurrency(c.budget.totalBudget)}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <h3 className="font-extrabold text-sm sm:text-base line-clamp-1 font-display drop-shadow-sm text-white">
                        {c.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-xs text-[#5A5A68] line-clamp-2 leading-relaxed font-medium">
                    {c.tagline}
                  </p>

                  {/* Cohort Progress & Key Metrics */}
                  <div className="p-3.5 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-2.5 text-xs">
                    <div className="flex justify-between items-center text-[#5A5A68]">
                      <span className="font-semibold">Creator Roster</span>
                      <span className="font-black text-[#0A0A0E] font-mono">
                        {c.acceptedCount || 0} / {c.maxCreators} accepted
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-1.5 rounded-full bg-[#EAEAEF] overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#FFD21F] to-[#FFAE00]"
                        style={{ width: `${Math.min(100, Math.max(10, cohortPercentage))}%` }}
                      />
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[11px] text-[#6A6A78] font-sans border-t border-black/5">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-[#7A7A8A]" />
                        <strong>{c.applicantsCount}</strong> proposals
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#7A7A8A]" />
                        Due {c.timeline.contentSubmissionDeadline}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-4 flex items-center gap-2">
                  <Link href={`/campaigns/${c.id}`} className="flex-1">
                    <button className="w-full py-2.5 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-bold transition-all border border-black/8">
                      Public Brief
                    </button>
                  </Link>

                  <Link href="/app/applications" className="flex-1">
                    <button className="w-full py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-extrabold transition-all shadow-xs border border-black/10 flex items-center justify-center gap-1">
                      <span>Proposals ({c.applicantsCount})</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
