"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  DollarSign,
  Users,
  Video,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Clock,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";
import { formatCurrency } from "@/core/utils/currency";

export function InteractiveDashboardShowcase() {
  const [activeMetricTab, setActiveMetricTab] = useState<"revenue" | "creators" | "roas">("revenue");

  const statCards = [
    {
      title: "Total Escrow Disbursed",
      value: "₹24,85,000",
      change: "+34.2%",
      period: "vs last month",
      isPositive: true,
      icon: DollarSign,
    },
    {
      title: "Active Creator Contracts",
      value: "48 Deals",
      change: "+18.6%",
      period: "100% verified",
      isPositive: true,
      icon: Users,
    },
    {
      title: "Average ROAS Multiplier",
      value: "4.8×",
      change: "+1.2×",
      period: "audited attribution",
      isPositive: true,
      icon: TrendingUp,
    },
    {
      title: "Average Turnaround SLA",
      value: "18.4 Hours",
      change: "-6.2h faster",
      period: "from brief to live",
      isPositive: true,
      icon: Clock,
    },
  ];

  const recentTimeline = [
    {
      action: "Milestone Payment Disbursed",
      target: "Devon Thorne (@devoncodes)",
      campaign: "Vertex Pro AI Launch",
      amount: "₹35,000",
      time: "4 mins ago",
      status: "COMPLETED",
      statusBg: "bg-[#FFD21F] text-[#101010]",
    },
    {
      action: "Video Deliverable V2 Submitted",
      target: "Elena Rostova (@elenatech)",
      campaign: "SaaS Workflow 60s Reel",
      amount: "₹28,000",
      time: "22 mins ago",
      status: "IN REVIEW",
      statusBg: "bg-[#FAFAF8] border border-[#E7E7E4] text-[#101010]",
    },
    {
      action: "Brief Escrow Funded",
      target: "Marcus Vance (@marcusvance)",
      campaign: "4K Hardware Deep-Dive",
      amount: "₹45,000",
      time: "1 hour ago",
      status: "LOCKED IN ESCROW",
      statusBg: "bg-[#101010] text-[#FAFAF8]",
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#FAFAF8] border-b border-[#E7E7E4] relative overflow-hidden select-none text-[#101010]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-[11px] font-sans font-semibold uppercase tracking-[0.08em] text-[#101010] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#101010]" />
            <span>04 • Live Command Center</span>
          </div>

          <h2 className="section-headline">
            High data-ink ratio. <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#626262]">
              Total financial observability.
            </span>
          </h2>

          <p className="editorial-body mx-auto text-center">
            A minimalist, high-performance dashboard designed for instant scanning across all active campaigns, video QA pipelines, and milestone disbursements.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            INTERACTIVE DASHBOARD SURFACE (Awwwards / FWA Standard)
            ══════════════════════════════════════════════════════════════════════ */}
        <div className="rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] p-6 sm:p-10 shadow-editorial-lg space-y-8">
          {/* Top Bar / Mode Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E4]">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#FFD21F] animate-pulse" />
              <div>
                <h3 className="text-lg font-bold font-display text-[#101010]">Active Portfolio Telemetry</h3>
                <p className="text-xs text-[#626262] font-sans">Synced in real-time with Stripe Connect &amp; Razorpay Escrow</p>
              </div>
            </div>

            {/* Metric Switcher Pills */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] font-sans text-xs">
              <button
                onClick={() => setActiveMetricTab("revenue")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeMetricTab === "revenue"
                    ? "bg-[#101010] text-[#FAFAF8] shadow-xs"
                    : "text-[#626262] hover:text-[#101010]"
                }`}
              >
                Disbursements
              </button>
              <button
                onClick={() => setActiveMetricTab("creators")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeMetricTab === "creators"
                    ? "bg-[#101010] text-[#FAFAF8] shadow-xs"
                    : "text-[#626262] hover:text-[#101010]"
                }`}
              >
                Active Roster
              </button>
              <button
                onClick={() => setActiveMetricTab("roas")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeMetricTab === "roas"
                    ? "bg-[#101010] text-[#FAFAF8] shadow-xs"
                    : "text-[#626262] hover:text-[#101010]"
                }`}
              >
                ROAS Multiplier
              </button>
            </div>
          </div>

          {/* 4 Clean Metric Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {statCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-2 hover:border-[#101010] transition-colors group"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#626262]">
                    <span>{card.title}</span>
                    <Icon className="w-4 h-4 text-[#101010] group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl sm:text-3xl font-bold font-display text-[#101010] numeric-tabular">
                      {card.value}
                    </p>
                    <div className="flex items-center gap-1.5 text-xs font-mono">
                      <span className="px-1.5 py-0.5 rounded bg-[#FFD21F] text-[#101010] font-bold text-[10px]">
                        {card.change}
                      </span>
                      <span className="text-[#626262] text-[11px]">{card.period}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Sparkline Chart Canvas */}
          <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#101010]">30-Day Escrow Velocity Curve</span>
              <span className="text-[#626262]">Updated Live • 100% On-Chain &amp; Bank Settled</span>
            </div>

            {/* SVG Telemetry Curve */}
            <div className="h-40 sm:h-48 w-full relative">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 150">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#101010" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#101010" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Area Fill */}
                <path
                  d="M 0,130 Q 80,110 140,80 T 260,60 T 380,30 T 500,10 L 500,150 L 0,150 Z"
                  fill="url(#chartGradient)"
                />
                {/* Line Stroke */}
                <path
                  d="M 0,130 Q 80,110 140,80 T 260,60 T 380,30 T 500,10"
                  fill="none"
                  stroke="#101010"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Key Milestone Nodes */}
                <circle cx="140" cy="80" r="4" fill="#101010" />
                <circle cx="260" cy="60" r="4" fill="#3047FF" />
                <circle cx="380" cy="30" r="4" fill="#101010" />
                <circle cx="500" cy="10" r="5" fill="#FFD21F" stroke="#101010" strokeWidth="2" />
              </svg>
            </div>

            {/* Chart X-Axis Labels */}
            <div className="flex items-center justify-between text-[10px] font-mono text-[#626262] pt-2 border-t border-[#E7E7E4]">
              <span>Week 01 (Briefs Launched)</span>
              <span>Week 02 (4K QA Reviews)</span>
              <span>Week 03 (Revision Sign-Offs)</span>
              <span className="font-bold text-[#101010]">Week 04 (Payouts Disbursed)</span>
            </div>
          </div>

          {/* Activity Timeline List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-bold text-[#101010] uppercase tracking-wider">Real-Time Milestone Stream</span>
              <span className="text-[#626262]">3 Events in Queue</span>
            </div>

            <div className="space-y-2 font-sans">
              {recentTimeline.map((item, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#FFFFFF] transition-colors text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#E7E7E4] flex items-center justify-center text-[#101010] font-bold shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-[#101010]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#101010]">{item.action}</h4>
                      <p className="text-[11px] text-[#626262] font-mono">
                        {item.target} • {item.campaign}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 font-mono">
                    <span className="text-xs font-bold text-[#101010] numeric-tabular">{item.amount}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.statusBg}`}>
                      {item.status}
                    </span>
                    <span className="text-[10px] text-[#626262]">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
