"use client";

import React, { useEffect, useState } from "react";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import {
  Download,
  Users,
  Building2,
  Briefcase,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Scale,
  ShieldCheck,
  RefreshCw,
  Zap,
} from "lucide-react";
import { StatsCard } from "@/components/ui/StatsCard";

export default function AdminReportsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = () => {
    setLoading(true);
    fetch("/api/admin/analytics")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.analytics) {
          setData(resData.analytics);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load analytics:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-8 text-[#0A0A0E] select-none font-sans">
      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Telemetry Analytics
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="text-[10px] font-mono text-[#6A6A78]">
              Direct Database Aggregates
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Agency Analytics &amp; GMV Platform Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
            Real-time transaction volume, creator payouts, campaign conversion velocity, and platform retention.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchAnalytics}
            className="p-2.5 rounded-full bg-white hover:bg-black/5 border border-black/10 text-[#0A0A0E] transition-all"
            title="Refresh Real Analytics"
          >
            <RefreshCw className="w-4 h-4 text-[#0A0A0E]" />
          </button>
          <button className="px-5 py-2.5 rounded-full bg-black/5 hover:bg-black/10 text-[#0A0A0E] text-xs font-semibold transition-all flex items-center gap-1.5 border border-black/10">
            <Download className="w-4 h-4 text-[#0A0A0E]" />
            <span>Export Financial Audit</span>
          </button>
        </div>
      </div>

      {loading || !data ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 mx-auto rounded-full border-2 border-[#FFD21F] border-t-transparent animate-spin mb-3" />
          <p className="text-xs font-mono text-[#7A7A8A]">Aggregating platform database records...</p>
        </div>
      ) : (
        <>
          {/* ── 4-Column Primary Metric Cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard
              title="Active Creators"
              value={String(data.activeCreators)}
              change="Verified"
              trend="up"
              subtitle="Active roster"
              icon={<Users className="w-4 h-4 text-[#0A0A0E]" />}
            />
            <StatsCard
              title="Active Brands"
              value={String(data.activeBrands)}
              change="Verified"
              trend="up"
              subtitle="Registered sponsors"
              icon={<Building2 className="w-4 h-4 text-[#8A7000]" />}
            />
            <StatsCard
              title="Total Escrow GMV"
              value={formatCurrency(data.gmv)}
              change="Secured"
              trend="up"
              subtitle="Escrow custody"
              icon={<ShieldCheck className="w-4 h-4 text-[#0A0A0E]" />}
            />
            <StatsCard
              title="Creator Payouts"
              value={formatCurrency(data.totalPayoutsDisbursed)}
              change="Disbursed"
              trend="up"
              subtitle="Released to creators"
              icon={<DollarSign className="w-4 h-4 text-[#8A7000]" />}
            />
          </div>

          {/* ── Secondary Marketplace Metrics Strip ── */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-black/8 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-[#7A7A8A] uppercase block">
                Total Campaigns
              </span>
              <span className="text-lg font-black font-display text-[#0A0A0E]">
                {data.totalCampaigns}
              </span>
              <span className="text-[10px] font-mono text-emerald-600 block mt-0.5">
                {data.activeCampaigns} live briefs
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-black/8 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-[#7A7A8A] uppercase block">
                Applications
              </span>
              <span className="text-lg font-black font-display text-[#0A0A0E]">
                {data.totalApplications}
              </span>
              <span className="text-[10px] font-mono text-[#5A5A68] block mt-0.5">
                Submitted to date
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-black/8 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-[#7A7A8A] uppercase block">
                Completed Collabs
              </span>
              <span className="text-lg font-black font-display text-emerald-600">
                {data.successfulCollabs}
              </span>
              <span className="text-[10px] font-mono text-[#5A5A68] block mt-0.5">
                {data.activeCollabs} active deals
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-black/8 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-[#7A7A8A] uppercase block">
                Conversion Rate
              </span>
              <span className="text-lg font-black font-display text-[#0A0A0E]">
                {data.conversionRate}%
              </span>
              <span className="text-[10px] font-mono text-emerald-600 block mt-0.5">
                Application to collab
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-black/8 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-[#7A7A8A] uppercase block">
                Match Success Rate
              </span>
              <span className="text-lg font-black font-display text-[#0A0A0E]">
                {data.matchSuccessRate}%
              </span>
              <span className="text-[10px] font-mono text-emerald-600 block mt-0.5">
                Algorithmic fit
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-black/8 shadow-2xs">
              <span className="text-[10px] font-mono font-bold text-[#7A7A8A] uppercase block">
                Platform Retention
              </span>
              <span className="text-lg font-black font-display text-emerald-600">
                {data.platformRetention}%
              </span>
              <span className="text-[10px] font-mono text-[#5A5A68] block mt-0.5">
                90-day repeat rate
              </span>
            </div>
          </div>

          {/* ── Disputes & Refunds Assurance Box ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-3xl bg-white border border-black/8 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#7A7A8A] uppercase block">
                  Disputes Filed / Resolved
                </span>
                <span className="text-xl font-black font-display text-[#0A0A0E]">
                  {data.totalDisputes} / {data.resolvedDisputes}
                </span>
                <span className="text-[11px] font-mono text-emerald-600 block">
                  {data.totalDisputes === 0 ? "Zero unresolved disputes" : "Arbitration desk active"}
                </span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-[#0A0A0E]">
                <Scale className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-black/8 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#7A7A8A] uppercase block">
                  Dispute Refunds Issued
                </span>
                <span className="text-xl font-black font-display text-[#0A0A0E]">
                  {formatCurrency(data.totalRefunds)}
                </span>
                <span className="text-[11px] font-mono text-[#5A5A68] block">
                  Guaranteed escrow refunds
                </span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-white border border-black/8 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#7A7A8A] uppercase block">
                  Trending Activity Telemetry
                </span>
                <span className="text-xl font-black font-display text-[#0A0A0E]">
                  {data.trendingActivityEvents} Events
                </span>
                <span className="text-[11px] font-mono text-amber-600 block">
                  Anti-gaming verified views &amp; saves
                </span>
              </div>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* ── Monthly GMV & Payout Pacing Table ── */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0A0A0E] font-display">
                  Monthly Platform GMV &amp; Payout Release Pacing
                </h3>
                <p className="text-xs text-[#5A5A68]">
                  Derived from live platform database contracts and Stripe custody ledger.
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] text-[10px] font-mono font-bold border border-[#FFD21F]/30">
                100% Real Database State
              </span>
            </div>

            <div className="divide-y divide-black/5 font-mono text-xs">
              {data.monthlyData?.map((m: any) => (
                <div key={m.month} className="py-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-[#0A0A0E] font-sans text-sm w-20">
                      {m.month} 2026
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-black/5 text-[#5A5A68] text-[10px]">
                      {m.collabs} Collabs
                    </span>
                  </div>
                  <div className="flex items-center gap-8">
                    <div>
                      <span className="text-[#7A7A8A] block text-[10px]">Gross Escrow GMV</span>
                      <span className="text-[#0A0A0E] font-bold text-sm">
                        {formatCurrency(m.gmv)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#7A7A8A] block text-[10px]">Creator Payouts Released</span>
                      <span className="text-emerald-700 font-extrabold text-sm flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {formatCurrency(m.payouts)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
