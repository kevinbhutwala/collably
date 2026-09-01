"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Sparkles,
  Users,
  Video,
  Wallet,
  LayoutDashboard,
  Check,
  TrendingUp,
  Clock,
} from "lucide-react";
import confetti from "canvas-confetti";
import { CENTRAL_CREATORS } from "@/data/creators";
import { formatCurrency, calculateMilestoneFeeBreakdown } from "@/core/utils/currency";

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<"overview" | "creators" | "content" | "payments">("overview");
  const [isApproved, setIsApproved] = useState(false);
  const [currencyMode, setCurrencyMode] = useState<"INR" | "USD">("INR");

  const amount = currencyMode === "INR" ? 18500 : 3500;
  const feeBreakdown = calculateMilestoneFeeBreakdown(amount, 0.1, currencyMode);
  const topCreators = CENTRAL_CREATORS.slice(0, 3);

  const handleApprove = () => {
    setIsApproved(true);
    try {
      confetti({
        particleCount: 75,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#087F5B", "#075E45", "#4EC296", "#EAF8F2", "#101310"],
      });
    } catch {
      // fallback
    }
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center pt-28 sm:pt-36 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FCFCFA] select-none text-[#101310]">
      {/* Subtle Environmental Hero Lighting */}
      <div
        className="absolute top-0 right-1/4 w-[750px] h-[550px] pointer-events-none -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at 60% 25%, rgba(172, 235, 210, 0.75) 0%, rgba(235, 248, 241, 0.45) 30%, rgba(252, 252, 250, 0) 68%)",
        }}
      />

      <div className="max-w-5xl mx-auto text-center space-y-8 sm:space-y-10 relative z-10 w-full">
        {/* Small Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF8F2] border border-[#C3EBDA] text-xs font-mono font-semibold text-[#087F5B]"
        >
          <span className="w-2 h-2 rounded-full bg-[#087F5B] animate-pulse" />
          <span>COLLABLY / CREATOR COMMERCE</span>
        </motion.div>

        {/* Large Editorial Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#101310] tracking-tight leading-[1.08] font-display"
          >
            Create great content. <br className="hidden sm:inline" />
            <span className="font-serif italic font-normal text-[#075E45]">Never chase an invoice.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#626862] max-w-2xl mx-auto font-sans leading-relaxed font-normal"
          >
            Discover creators, manage campaigns, review content and move payments through one trusted workspace.
          </motion.p>
        </div>

        {/* Solid Action Buttons (No Gradients) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-1"
        >
          <Link
            href="/for-brands"
            className="w-full sm:w-auto px-7 py-3.5 rounded-[9px] bg-[#087F5B] hover:bg-[#075E45] active:bg-[#064B39] text-white font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 font-sans"
          >
            <span>Start a Campaign</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/creator/register"
            className="w-full sm:w-auto px-7 py-3.5 rounded-[9px] bg-[#FFFFFF] hover:bg-[#F4F6F3] border border-[#E2E6E1] text-[#101310] font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 font-sans"
          >
            <span>Join as a Creator</span>
          </Link>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════
            FINANCIAL TRANSACTION FLOW VISUALIZATION (Section 7)
            CREATOR → CONTENT SUBMITTED → APPROVED → ₹18,500 PAID
            ════════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full max-w-4xl mx-auto p-4 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E2E6E1] shadow-fintech"
        >
          <div className="flex items-center justify-between pb-4 border-b border-[#E2E6E1] text-xs font-mono">
            <span className="text-[#626862] font-semibold uppercase tracking-wider">
              Protected Settlement Pipeline
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setCurrencyMode(currencyMode === "INR" ? "USD" : "INR")}
                className="px-2 py-0.5 rounded bg-[#F1F2EE] hover:bg-[#E2E6E1] text-[11px] font-bold text-[#101310] transition-colors"
              >
                {currencyMode === "INR" ? "Switch to USD ($)" : "Switch to INR (₹)"}
              </button>
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAF8F2] text-[#087F5B] font-bold text-[11px] border border-[#C3EBDA]">
                Milestone Protected
              </span>
            </div>
          </div>

          {/* 4-Step Financial Flow Rail */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 text-left">
            {/* Step 1 */}
            <div className="p-3.5 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] relative">
              <span className="text-[10px] font-mono font-bold text-[#087F5B] block mb-1">01 • CREATOR</span>
              <h4 className="text-xs font-bold text-[#101310] font-display">Elena Rostova</h4>
              <p className="text-[11px] text-[#626862] font-mono mt-0.5">Matched (98%)</p>
              <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-[#087F5B]" />
            </div>

            {/* Step 2 */}
            <div className="p-3.5 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] relative">
              <span className="text-[10px] font-mono font-bold text-[#087F5B] block mb-1">02 • CONTENT</span>
              <h4 className="text-xs font-bold text-[#101310] font-display">4K Video Cut v2</h4>
              <p className="text-[11px] text-[#626862] font-mono mt-0.5">Submitted</p>
              <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-[#087F5B]" />
            </div>

            {/* Step 3 */}
            <div className="p-3.5 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] relative">
              <span className="text-[10px] font-mono font-bold text-[#087F5B] block mb-1">03 • APPROVAL</span>
              <h4 className="text-xs font-bold text-[#101310] font-display">Timecodes Verified</h4>
              <p className="text-[11px] text-[#087F5B] font-mono mt-0.5 font-bold">✓ Approved</p>
              <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-[#087F5B]" />
            </div>

            {/* Step 4 */}
            <div className="p-3.5 rounded-xl bg-[#EAF8F2] border border-[#C3EBDA] relative">
              <span className="text-[10px] font-mono font-bold text-[#087F5B] block mb-1">04 • PAYMENT</span>
              <h4 className="text-xs font-bold text-[#075E45] font-display">{formatCurrency(feeBreakdown.grossAmount, currencyMode)}</h4>
              <p className="text-[11px] text-[#087F5B] font-mono mt-0.5 font-bold">Disbursed (100%)</p>
              <div className="absolute right-3 top-3 w-2 h-2 rounded-full bg-[#087F5B] animate-ping" />
            </div>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════════════════════
            PREMIUM PRODUCT WORKSPACE PREVIEW (Section 14)
            ════════════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-5xl mx-auto rounded-2xl bg-[#FFFFFF] border border-[#E2E6E1] shadow-fintech p-4 sm:p-7 space-y-6 text-left relative overflow-hidden"
        >
          {/* Top Bar with Workspace Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E6E1]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EAF8F2] border border-[#C3EBDA] flex items-center justify-center text-[#087F5B]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#101310] font-sans">Fitness &amp; Tech Product Launch</h3>
                <p className="text-[11px] text-[#626862] font-mono">Campaign ID: CP-8492 • Budget: {formatCurrency(amount, currencyMode)} Protected</p>
              </div>
            </div>

            {/* Interactive Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
              {[
                { id: "overview", label: "Overview", icon: LayoutDashboard },
                { id: "creators", label: "Creators (3)", icon: Users },
                { id: "content", label: "4K Video QA", icon: Video },
                { id: "payments", label: "Payments", icon: Wallet },
              ].map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    className={`px-3.5 py-1.5 rounded-[9px] text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isActive
                        ? "bg-[#087F5B] text-white shadow-xs"
                        : "bg-[#F6F7F3] hover:bg-[#E2E6E1] text-[#626862] border border-[#E2E6E1]"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dynamic Tab Body */}
          <div className="min-h-[220px]">
            <AnimatePresence mode="wait">
              {/* TAB 1: OVERVIEW */}
              {activeTab === "overview" && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                >
                  <div className="p-4 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] space-y-1">
                    <span className="text-[11px] font-mono text-[#626862]">TOTAL CAMPAIGN BUDGET</span>
                    <p className="text-2xl font-bold text-[#101310] font-display">{formatCurrency(amount, currencyMode)}</p>
                    <span className="text-[10px] text-[#087F5B] font-mono font-semibold flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> 100% In Protected Custody
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] space-y-1">
                    <span className="text-[11px] font-mono text-[#626862]">MATCHED CREATORS</span>
                    <p className="text-2xl font-bold text-[#101310] font-display">3 Selected</p>
                    <span className="text-[10px] text-[#087F5B] font-mono font-semibold">
                      98% Average Compatibility
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] space-y-1">
                    <span className="text-[11px] font-mono text-[#626862]">DELIVERABLE STATUS</span>
                    <p className="text-2xl font-bold text-[#087F5B] font-display">Cut v2 Ready</p>
                    <span className="text-[10px] text-[#626862] font-mono">
                      4K 60FPS Review Complete
                    </span>
                  </div>
                </motion.div>
              )}

              {/* TAB 2: CREATORS */}
              {activeTab === "creators" && (
                <motion.div
                  key="creators"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-3"
                >
                  {topCreators.map((c) => (
                    <div
                      key={c.handle}
                      className="p-4 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] flex items-center justify-between gap-3 hover:border-[#087F5B] transition-all"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden">
                        <img
                          src={c.avatarUrl}
                          alt={c.fullName}
                          className="w-10 h-10 rounded-full object-cover border border-[#E2E6E1] shrink-0"
                        />
                        <div className="overflow-hidden">
                          <h4 className="text-xs font-bold text-[#101310] font-sans truncate flex items-center gap-1">
                            {c.fullName}
                            <CheckCircle2 className="w-3 h-3 text-[#087F5B] shrink-0" />
                          </h4>
                          <p className="text-[11px] text-[#626862] font-mono truncate">{c.primaryCategory}</p>
                        </div>
                      </div>
                      <span className="px-2 py-1 rounded bg-[#EAF8F2] text-[#087F5B] font-mono text-[10px] font-bold shrink-0 border border-[#C3EBDA]">
                        {c.matchScore}%
                      </span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* TAB 3: CONTENT QA */}
              {activeTab === "content" && (
                <motion.div
                  key="content"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#087F5B] animate-pulse" />
                      <h4 className="text-xs font-bold text-[#101310] font-sans">Elena Rostova • AI Smartwatch Review</h4>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#EAF8F2] text-[#087F5B] text-[10px] font-mono font-bold border border-[#C3EBDA]">
                      00:14 / 00:60
                    </span>
                  </div>

                  <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2E6E1] text-xs font-mono flex items-center justify-between">
                    <span className="text-[#626862]">@00:14 &ldquo;Great logo placement in second frame.&rdquo;</span>
                    <span className="text-[#087F5B] font-bold">✓ Verified</span>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: PAYMENTS */}
              {activeTab === "payments" && (
                <motion.div
                  key="payments"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  className="p-5 rounded-xl bg-[#FCFCFA] border border-[#E2E6E1] space-y-4"
                >
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                    <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2E6E1]">
                      <span className="text-[#626862] text-[10px] block">GROSS BUDGET</span>
                      <span className="font-bold text-[#101310] text-sm">{formatCurrency(feeBreakdown.grossAmount, currencyMode)}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2E6E1]">
                      <span className="text-[#626862] text-[10px] block">PLATFORM FEE (10%)</span>
                      <span className="font-bold text-[#626862] text-sm">{formatCurrency(feeBreakdown.platformFeeAmount, currencyMode)}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#FFFFFF] border border-[#E2E6E1]">
                      <span className="text-[#626862] text-[10px] block">CREATOR NET (90%)</span>
                      <span className="font-bold text-[#087F5B] text-sm">{formatCurrency(feeBreakdown.creatorNetAmount, currencyMode)}</span>
                    </div>
                    <div className="p-3 rounded-lg bg-[#EAF8F2] border border-[#C3EBDA]">
                      <span className="text-[#075E45] text-[10px] block">SETTLEMENT TIME</span>
                      <span className="font-bold text-[#087F5B] text-sm">&lt; 24 Hours</span>
                    </div>
                  </div>

                  {/* 1-Click Milestone Approval Demo */}
                  <div className="pt-2 flex items-center justify-between border-t border-[#E2E6E1]">
                    <span className="text-xs text-[#626862] font-sans">
                      {isApproved ? "✓ Deliverable approved • Milestone ready for payment" : "Ready to sign off deliverable?"}
                    </span>

                    <button
                      type="button"
                      onClick={handleApprove}
                      className="px-4 py-2 rounded-[9px] bg-[#087F5B] hover:bg-[#075E45] text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-all font-sans"
                    >
                      {isApproved ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Approved</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve Deliverable</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
