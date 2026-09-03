"use client";

import React, { useState, useEffect, useCallback } from "react";
import { StatsCard } from "@/components/ui/StatsCard";
import { SafeImage } from "@/components/ui/SafeImage";
import { AnimatedEmptyState } from "@/components/ui/AnimatedEmptyState";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import { CreatorProfile, Campaign } from "@/core/types";
import { useUIStore } from "@/stores/ui.store";
import {
  Wallet,
  Users,
  Building2,
  CheckCircle2,
  Sparkles,
  Loader2,
  RefreshCw,
} from "lucide-react";

export default function AgencyAdminCommandCenter() {
  const { addToast } = useUIStore();
  const [creators, setCreators] = useState<CreatorProfile[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [verifyingId, setVerifyingId] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [creatorsRes, campaignsRes] = await Promise.all([
        fetch("/api/creators"),
        fetch("/api/campaigns"),
      ]);
      if (creatorsRes.ok) {
        const data = await creatorsRes.json();
        setCreators(Array.isArray(data) ? data : data.creators ?? []);
      }
      if (campaignsRes.ok) {
        const data = await campaignsRes.json();
        setCampaigns(Array.isArray(data) ? data : data.campaigns ?? []);
      }
    } catch (err) {
      console.error("Admin dashboard fetch error:", err);
      addToast({ type: "error", title: "Data Load Error", message: "Failed to load platform data." });
    } finally {
      setIsLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleVerifyCreator = async (id: string, currentlyVerified: boolean) => {
    setVerifyingId(id);
    try {
      const res = await fetch(`/api/creators/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verified: !currentlyVerified }),
      });
      if (!res.ok) throw new Error("Failed to update creator");
      const updated: CreatorProfile = await res.json();
      setCreators((prev) => prev.map((c) => (c.id === id ? updated : c)));
      addToast({
        type: "success",
        title: "Verification Updated",
        message: `${updated.fullName} is now ${updated.verified ? "verified" : "unverified"}.`,
      });
    } catch (err: any) {
      addToast({ type: "error", title: "Update Failed", message: err.message });
    } finally {
      setVerifyingId(null);
    }
  };

  // Computed stats from live data
  const totalEscrowGMV = campaigns.reduce((acc, c) => acc + (c.budget?.totalBudget ?? 0), 0);
  const verifiedCreatorsCount = creators.filter((c) => c.verified).length;
  const activeCampaignsCount = campaigns.filter(
    (c) => c.status === "active" || c.status === "applications_open"
  ).length;

  return (
    <div className="space-y-8 text-[#0A0A0E] select-none">
      {/* Header */}
      <div className="hidden lg:flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Agency Master Operations
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Live Data
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Agency Admin Command Center
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
            Realtime platform gross volume, creator roster verification, and escrow settlement control.
          </p>
        </div>
        <button
          onClick={fetchData}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-black/5 hover:bg-black/10 border border-black/8 text-xs font-bold transition-all disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Global System Telemetry — computed from live data */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        <StatsCard
          title="Gross Escrow Volume (GMV)"
          value={isLoading ? "…" : formatCurrency(totalEscrowGMV)}
          change="Live platform data"
          trend="up"
          subtitle="Pre-funded across campaigns"
          icon={<Wallet className="w-5 h-5 text-[#FFD21F]" />}
        />
        <StatsCard
          title="Net Platform Take-Rate (10%)"
          value={isLoading ? "…" : formatCurrency(totalEscrowGMV * 0.1)}
          change="10% commission rate"
          trend="up"
          subtitle="Realized transaction fees"
          icon={<Sparkles className="w-5 h-5 text-[#FFD21F]" />}
        />
        <StatsCard
          title="Verified Creator Roster"
          value={isLoading ? "…" : String(verifiedCreatorsCount)}
          change={isLoading ? "…" : `${creators.length} total registered`}
          trend="up"
          subtitle="Audited demographics"
          icon={<Users className="w-5 h-5 text-[#0A0A0E]" />}
        />
        <StatsCard
          title="Active Campaigns"
          value={isLoading ? "…" : String(activeCampaignsCount)}
          change={isLoading ? "…" : `${campaigns.length} total campaigns`}
          trend="up"
          subtitle="Open for applications"
          icon={<Building2 className="w-5 h-5 text-[#0A0A0E]" />}
        />
      </div>

      {/* 2-Column Admin Control Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Creator Verification Approval Queue */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-black/8">
            <div>
              <h3 className="text-lg font-bold text-[#0A0A0E] font-display">Creator Verification &amp; Badge Control</h3>
              <p className="text-xs text-[#5A5A68] font-sans">Toggle verified checkmarks for algorithmic spotlight ranking.</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-bold">
              {verifiedCreatorsCount} Verified
            </span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-[#8A8A9A]" />
            </div>
          ) : creators.length === 0 ? (
            <AnimatedEmptyState
              icon={<Users className="w-7 h-7 text-[#0A0A0E]" />}
              badgeText="Creators"
              title="No creators yet"
              description="Creator profiles will appear here once users register."
            />
          ) : (
            <div role="table" aria-label="Creator Verification List" className="admin-list divide-y divide-black/5 space-y-3">
              {creators.map((creator) => (
                <div
                  key={creator.id}
                  className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-11 h-11 rounded-2xl overflow-hidden bg-[#F5F5F9] border border-black/8 shrink-0">
                      <SafeImage
                        src={creator.avatarUrl}
                        alt={creator.fullName}
                        fallbackType="creator"
                        fallbackName={creator.fullName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-sm text-[#0A0A0E] font-display">{creator.fullName}</h4>
                        {creator.verified && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-[#7A7A8A] font-mono">
                        @{creator.handle} • {creator.primaryCategory} • {formatNumber(creator.totalFollowers)} Reach
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleVerifyCreator(creator.id, !!creator.verified)}
                    disabled={verifyingId === creator.id}
                    className={`px-4 py-2 rounded-full text-xs font-semibold font-mono transition-all border flex items-center gap-1.5 ${
                      creator.verified
                        ? "bg-black/5 text-[#5A5A68] hover:text-[#0A0A0E] border-black/10"
                        : "bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] font-bold shadow-xs border-black/10"
                    }`}
                  >
                    {verifyingId === creator.id ? (
                      <><Loader2 className="w-3 h-3 animate-spin" /><span>Updating...</span></>
                    ) : (
                      creator.verified ? "Revoke Badge" : "Grant Verified"
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Live Campaign Escrow Rail */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-black/8">
            <div>
              <h3 className="text-lg font-bold text-[#0A0A0E] font-display">Active Campaign Escrows</h3>
              <p className="text-xs text-[#5A5A68] font-sans">Milestone custody status across deals.</p>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] border border-[#FFD21F]/40 text-xs font-mono font-bold">
              {activeCampaignsCount} Active
            </span>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-[#8A8A9A]" />
            </div>
          ) : campaigns.length === 0 ? (
            <AnimatedEmptyState
              icon={<Building2 className="w-7 h-7 text-[#0A0A0E]" />}
              badgeText="Campaigns"
              title="No campaigns yet"
              description="Campaign escrows will appear here once brands create briefs."
            />
          ) : (
            <div className="space-y-4 font-mono text-xs">
              {campaigns.slice(0, 8).map((camp) => (
                <div
                  key={camp.id}
                  className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/5 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-sm text-[#0A0A0E] font-sans truncate max-w-[200px]">
                      {camp.title}
                    </h4>
                    <span className="text-[#0A0A0E] font-extrabold text-sm">
                      {formatCurrency(camp.budget?.totalBudget ?? 0)}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#6A6A78] text-[11px]">
                    <span>Sponsor: {camp.brand?.companyName ?? "—"}</span>
                    <span className="text-[#0A0A0E] font-bold">
                      {camp.acceptedCount ?? 0}/{camp.maxCreators} Creators
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-black/10 overflow-hidden">
                    <div
                      className="h-full bg-[#FFD21F] rounded-full"
                      style={{
                        width: `${Math.min(100, ((camp.acceptedCount ?? 0) / Math.max(1, camp.maxCreators)) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
