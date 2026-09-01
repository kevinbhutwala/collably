"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
import { campaignService } from "@/services/campaign.service";
import { creatorService } from "@/services/creator.service";
import { paymentService } from "@/services/payment.service";
import { collaborationService } from "@/services/collaboration.service";
import { Campaign, CreatorProfile, PayoutRecord, Collaboration } from "@/core/types";
import { EDITORIAL_PORTRAITS } from "@/data/editorialPortraits";
import { BrandIcon } from "@/components/ui/BrandLogos";
import { ProfileCompletenessCard } from "@/components/creators/ProfileCompletenessCard";
import { formatCurrency } from "@/core/utils/formatters";
import {
  Wallet,
  TrendingUp,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Users,
  CheckCircle2,
  FolderPlus,
  Compass,
  Play,
  Pause,
  FileCheck2,
  Lock,
  Zap,
  Sliders,
  DollarSign,
  Activity,
  ChevronRight,
  Maximize2,
  MessageSquare,
} from "lucide-react";

export default function DashboardPage() {
  const { user, role, setRole, currentCreator, currentBrand } = useAuthStore();
  const { addToast } = useUIStore();

  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [featuredCreators, setFeaturedCreators] = useState<CreatorProfile[]>([]);
  const [recentPayouts, setRecentPayouts] = useState<PayoutRecord[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "in_review" | "active">("all");
  const [isLoading, setIsLoading] = useState(true);

  // Interactive 4K Video Player State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [activeTimestamp, setActiveTimestamp] = useState<number>(42);
  const [isApproved, setIsApproved] = useState<boolean>(false);
  const [payoutWithdrawn, setPayoutWithdrawn] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [camps, creators, payouts, collabs] = await Promise.all([
          campaignService.getCampaigns(),
          creatorService.getCreators(),
          paymentService.getPayouts(),
          collaborationService.getCollaborations(
            role === "creator" ? "creator" : "brand",
            role === "creator" ? currentCreator?.id : currentBrand?.id
          ),
        ]);

        setActiveCampaigns(camps || []);
        setFeaturedCreators(creators || []);
        setRecentPayouts(payouts || []);
        setCollaborations(collabs || []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [role, currentCreator?.id, currentBrand?.id]);

  const handleWithdraw = () => {
    setPayoutWithdrawn(true);
    addToast({
      type: "success",
      title: "Escrow Disbursed",
      message: "₹35,000 successfully routed to your verified bank account via Stripe Connect.",
    });
  };

  const maleHero = EDITORIAL_PORTRAITS.heroMaleMain;
  const femaleHero = EDITORIAL_PORTRAITS.heroFemaleMain;
  const supportingFemale = EDITORIAL_PORTRAITS.supportingFemale1;

  return (
    <div className="space-y-10 text-[#101010] font-sans select-none pb-12">
      {/* ══════════════════════════════════════════════════════════════════════
          01. AWWWARDS-GRADE STUDIO COMMAND HERO
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] p-6 sm:p-10 shadow-editorial-lg overflow-hidden">
        {/* Subtle Watermark Branding */}
        <div className="absolute top-2 right-4 text-[7rem] sm:text-[9rem] font-black text-[#101010]/[0.02] pointer-events-none font-display leading-none select-none">
          STUDIO
        </div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            {/* Live Telemetry Bar */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] text-[11px] font-mono font-bold text-[#101010] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#B7FF3C] animate-pulse" />
                <span>VAULT ACTIVE • 100% ESCROW PROTECTED</span>
              </span>

              <span className="text-xs font-mono text-[#626262] hidden sm:inline">•</span>

              <span className="px-2.5 py-1 rounded-full bg-[#101010] text-[#FAFAF8] text-[10px] font-mono font-bold uppercase tracking-wider">
                {role.replace(/_/g, " ")} WORKSPACE
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#101010] tracking-tight font-display">
              {user?.name ? `Hello, ${user.name.split(" ")[0]}.` : "Creator Command Studio."}
              <span className="font-serif italic font-normal text-[#626262] block sm:inline sm:ml-2">
                Pipeline is live.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-[#626262] font-sans leading-relaxed max-w-xl">
              {role === "creator"
                ? "Manage frame-by-frame 4K deliverables, review timecoded brand feedback, and initiate instant milestone settlements."
                : "Recruit vetted creators, inspect timecoded video cuts, and release milestone funds with 1-click escrow sign-off."}
            </p>
          </div>

          {/* Persona Switcher & Fast Actions */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 relative z-10 shrink-0 font-sans">
            {/* Quick Switch Persona Pill */}
            <div className="flex items-center p-1 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E4] text-xs font-semibold">
              <button
                onClick={() => {
                  setRole("creator");
                  addToast({ type: "info", title: "Mode Changed", message: "Switched to Creator Workspace" });
                }}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl transition-all ${
                  role === "creator" ? "bg-[#101010] text-[#FAFAF8] shadow-xs font-bold" : "text-[#626262] hover:text-[#101010]"
                }`}
              >
                Creator
              </button>
              <button
                onClick={() => {
                  setRole("brand");
                  addToast({ type: "info", title: "Mode Changed", message: "Switched to Brand Marketer" });
                }}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl transition-all ${
                  role === "brand" ? "bg-[#101010] text-[#FAFAF8] shadow-xs font-bold" : "text-[#626262] hover:text-[#101010]"
                }`}
              >
                Brand
              </button>
              <button
                onClick={() => {
                  setRole("agency_admin");
                  addToast({ type: "info", title: "Mode Changed", message: "Switched to Agency Admin OS" });
                }}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl transition-all ${
                  role === "agency_admin" ? "bg-[#101010] text-[#FAFAF8] shadow-xs font-bold" : "text-[#626262] hover:text-[#101010]"
                }`}
              >
                Admin
              </button>
            </div>

            {/* Main Action Launchers */}
            <div className="flex items-center gap-2.5">
              {role === "creator" ? (
                <>
                  <Link href="/campaigns" className="flex-1">
                    <button className="w-full px-5 py-3 rounded-[9px] bg-[#101010] hover:bg-[#262626] active:bg-[#000000] text-[#FAFAF8] font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs group">
                      <Compass className="w-4 h-4 text-[#B7FF3C]" />
                      <span>Find Brand Briefs</span>
                    </button>
                  </Link>
                  <Link href="/app/profile">
                    <button className="px-4 py-3 rounded-[9px] bg-[#FFFFFF] hover:bg-[#FAFAF8] border border-[#E7E7E4] text-[#101010] font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#101010]" />
                      <span>Media Kit</span>
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/app/brand/campaigns/create" className="flex-1">
                    <button className="w-full px-5 py-3 rounded-[9px] bg-[#101010] hover:bg-[#262626] active:bg-[#000000] text-[#FAFAF8] font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs group">
                      <FolderPlus className="w-4 h-4 text-[#B7FF3C]" />
                      <span>Create Campaign</span>
                    </button>
                  </Link>
                  <Link href="/app/brand/creators">
                    <button className="px-4 py-3 rounded-[9px] bg-[#FFFFFF] hover:bg-[#FAFAF8] border border-[#E7E7E4] text-[#101010] font-semibold text-xs transition-all shadow-xs flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#101010]" />
                      <span>Roster</span>
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          02. CREATIVE ASYMMETRIC BENTO COMMAND HUB
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── CARD A: 4K VIDEO QA STAGE & LIVE SCRUBBER (Cols 1-7) ── */}
        <div className="lg:col-span-7 rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] p-6 sm:p-8 shadow-editorial hover:border-[#101010] transition-all flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] text-[10px] font-mono font-bold uppercase text-[#101010]">
                Live Milestone Studio
              </span>
              <span className="flex items-center gap-1.5 text-xs font-mono text-[#626262]">
                <span className="w-2 h-2 rounded-full bg-[#B7FF3C] animate-pulse" />
                4K QA Active
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#101010] tracking-tight">
              Vertex Pro AI — 4K Workflow Cut V2
            </h3>
            <p className="text-xs text-[#626262] font-sans">
              Frame-accurate deliverable submitted by Elena Rostova (@elenatech). Annotations pinned to video timeline.
            </p>
          </div>

          {/* Simulated 4K Player Surface */}
          <div className="rounded-2xl bg-[#101010] p-4 sm:p-5 text-white space-y-4 border border-[#262626] shadow-editorial relative overflow-hidden">
            {/* Top Video Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF3B30]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                <span className="ml-2 font-bold text-white/90">Cut_02_ColorGraded_4K.mp4</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px]">
                00:{activeTimestamp < 10 ? `0${activeTimestamp}` : activeTimestamp} / 01:30
              </span>
            </div>

            {/* Visual Audio Waveform & Scrubber */}
            <div className="space-y-2">
              <div className="h-10 sm:h-12 rounded-xl bg-white/[0.04] border border-white/10 flex items-center px-3 gap-1 relative overflow-hidden">
                {[35, 60, 85, 50, 95, 100, 80, 65, 40, 90, 95, 75, 55, 65, 90, 45, 100, 85, 65, 50, 75, 90, 95, 55].map((h, i) => (
                  <div
                    key={i}
                    style={{ height: `${h}%` }}
                    className={`flex-1 rounded-full transition-colors ${
                      i * 4 <= activeTimestamp ? "bg-[#B7FF3C]" : "bg-white/20"
                    }`}
                  />
                ))}
                {/* Playhead */}
                <div
                  style={{ left: `${(activeTimestamp / 90) * 100}%` }}
                  className="absolute top-0 bottom-0 w-0.5 bg-[#FAFAF8] shadow-lg pointer-events-none"
                />
              </div>

              {/* Timecoded Annotation Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pt-1 font-mono text-[10px]">
                {[
                  { sec: 14, text: "Hook Transition" },
                  { sec: 42, text: "Product Placement Callout" },
                  { sec: 78, text: "CTA & Promo Code Display" },
                ].map((t) => (
                  <button
                    key={t.sec}
                    onClick={() => setActiveTimestamp(t.sec)}
                    className={`px-2.5 py-1 rounded-md border transition-all ${
                      activeTimestamp === t.sec
                        ? "bg-[#B7FF3C] text-[#101010] border-[#B7FF3C] font-bold"
                        : "bg-white/10 text-white/70 border-white/10 hover:bg-white/20"
                    }`}
                  >
                    00:{t.sec} • {t.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
              <span className="text-[11px] font-mono text-white/60">
                Milestone Escrow: <strong className="text-white numeric-tabular">₹35,000 Locked</strong>
              </span>

              <button
                onClick={() => {
                  setIsApproved(!isApproved);
                  addToast({
                    type: "success",
                    title: isApproved ? "Approval Revoked" : "Milestone Approved",
                    message: isApproved
                      ? "Deliverable reverted to review state."
                      : "Deliverable approved! ₹35,000 unlocked for instant creator disbursement.",
                  });
                }}
                className={`px-4 py-2 rounded-lg font-mono text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isApproved
                    ? "bg-[#B7FF3C] text-[#101010]"
                    : "bg-white text-[#101010] hover:bg-[#FAFAF8]"
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{isApproved ? "Approved & Disbursed ✓" : "1-Click Approve & Disburse"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* ── CARD B: ESCROW VAULT & FINANCIAL FLOW (Cols 8-12) ── */}
        <div className="lg:col-span-5 rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] p-6 sm:p-8 shadow-editorial hover:border-[#101010] transition-all flex flex-col justify-between space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] text-[10px] font-mono font-bold uppercase text-[#101010]">
                Escrow Vault Health
              </span>
              <Lock className="w-4 h-4 text-[#101010]" />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-[#101010] tracking-tight">
              Real-Time Capital Custody
            </h3>
            <p className="text-xs text-[#626262] font-sans">
              100% of deal balances held in FDIC-insured Stripe Connect and Razorpay trust accounts.
            </p>
          </div>

          {/* Visual Escrow Vault Gauge */}
          <div className="p-5 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-4">
            <div className="flex items-baseline justify-between font-display">
              <div>
                <span className="text-[10px] text-[#626262] font-mono uppercase font-bold block">TOTAL CUSTODY VOLUME</span>
                <span className="text-3xl font-extrabold text-[#101010] numeric-tabular">₹2,48,500</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-[#B7FF3C] text-[#101010] text-[10px] font-mono font-bold">
                100% SECURE
              </span>
            </div>

            {/* Segmented Volume Bar */}
            <div className="space-y-1.5">
              <div className="h-3 w-full rounded-full bg-[#E7E7E4] flex overflow-hidden">
                <div className="h-full bg-[#101010] w-[65%]" title="Disbursed (65%)" />
                <div className="h-full bg-[#3047FF] w-[20%]" title="In Review (20%)" />
                <div className="h-full bg-[#B7FF3C] w-[15%]" title="In Production (15%)" />
              </div>
              <div className="flex items-center justify-between text-[10px] font-mono text-[#626262] pt-1">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#101010]" /> ₹1.68L Settled
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#3047FF]" /> ₹35K In QA
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" /> ₹45K Active
                </span>
              </div>
            </div>

            {/* Quick Withdraw CTA */}
            <div className="pt-2">
              <button
                onClick={handleWithdraw}
                disabled={payoutWithdrawn}
                className={`w-full py-3 rounded-[9px] text-xs font-semibold font-sans transition-all flex items-center justify-center gap-2 ${
                  payoutWithdrawn
                    ? "bg-[#FAFAF8] text-[#626262] border border-[#E7E7E4] cursor-not-allowed"
                    : "bg-[#101010] hover:bg-[#262626] text-[#FAFAF8] shadow-xs"
                }`}
              >
                <Zap className="w-3.5 h-3.5 text-[#B7FF3C]" />
                <span>{payoutWithdrawn ? "Disbursement Queued to Bank ✓" : "Withdraw Ready Escrow (₹35,000)"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          03. ACTIVE COLLABORATION PIPELINES (STORYBOARD FORMAT)
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#E7E7E4]">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-[#101010] font-display tracking-tight">
              Active Collaboration Storyboards
            </h2>
            <p className="text-xs text-[#626262] font-sans">
              Track progress from creative brief dispatch to frame approval and instant milestone payout.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/app/collaborations"
              className="text-xs text-[#101010] font-bold hover:underline font-mono flex items-center gap-1"
            >
              <span>View All 3 Deals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3 Storyboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Vertex Pro AI */}
          <div className="rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] p-6 shadow-editorial hover:border-[#101010] transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] text-[10px] font-mono font-bold text-[#101010]">
                  YOUTUBE 60S
                </span>
                <span className="px-2 py-0.5 rounded bg-[#B7FF3C] text-[#101010] text-[10px] font-mono font-bold">
                  QA REVIEW
                </span>
              </div>

              {/* Creator Thumbnail */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#101010] border border-[#E7E7E4]">
                <img
                  src={femaleHero.imageUrl}
                  alt={femaleHero.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                  <span className="font-bold">{femaleHero.name}</span>
                  <span className="text-[#B7FF3C] font-bold">98% MATCH</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#101010] font-display">Vertex Pro AI — 4K Workflow Cut</h3>
                <p className="text-xs text-[#626262] font-sans">Milestone 02 of 03 in review</p>
              </div>

              {/* Milestones */}
              <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#E7E7E4]">
                <span className="text-[#626262]">Budget Locked:</span>
                <span className="font-bold text-[#101010] numeric-tabular">₹35,000</span>
              </div>
            </div>

            <Link href="/app/collaborations" className="block pt-2">
              <button className="w-full py-2.5 rounded-[9px] bg-[#101010] hover:bg-[#262626] text-[#FAFAF8] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs">
                <span>Open 4K Player</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#B7FF3C]" />
              </button>
            </Link>
          </div>

          {/* Card 2: Figma Design Systems */}
          <div className="rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] p-6 shadow-editorial hover:border-[#101010] transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] text-[10px] font-mono font-bold text-[#101010]">
                  DEDICATED TUTORIAL
                </span>
                <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#101010] text-[10px] font-mono font-bold">
                  BRIEF FUNDED
                </span>
              </div>

              {/* Creator Thumbnail */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#101010] border border-[#E7E7E4]">
                <img
                  src={maleHero.imageUrl}
                  alt={maleHero.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                  <span className="font-bold">{maleHero.name}</span>
                  <span className="text-[#FAFAF8] font-bold">₹28K / POST</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#101010] font-display">Figma — Design Systems Deep Dive</h3>
                <p className="text-xs text-[#626262] font-sans">Milestone 01: Script outline due in 2 days</p>
              </div>

              {/* Milestones */}
              <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#E7E7E4]">
                <span className="text-[#626262]">Budget Locked:</span>
                <span className="font-bold text-[#101010] numeric-tabular">₹45,000</span>
              </div>
            </div>

            <Link href="/app/collaborations" className="block pt-2">
              <button className="w-full py-2.5 rounded-[9px] bg-[#FAFAF8] hover:bg-[#FFFFFF] border border-[#E7E7E4] text-[#101010] font-semibold text-xs transition-all flex items-center justify-center gap-1.5">
                <span>View Storyboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>

          {/* Card 3: Raycast Workflow Reel */}
          <div className="rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] p-6 shadow-editorial hover:border-[#101010] transition-all space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] text-[10px] font-mono font-bold text-[#101010]">
                  INSTAGRAM 4K REEL
                </span>
                <span className="px-2 py-0.5 rounded bg-[#101010] text-[#FAFAF8] text-[10px] font-mono font-bold">
                  PUBLISHED ✓
                </span>
              </div>

              {/* Creator Thumbnail */}
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-[#101010] border border-[#E7E7E4]">
                <img
                  src={supportingFemale.imageUrl}
                  alt={supportingFemale.name}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                  <span className="font-bold">{supportingFemale.name}</span>
                  <span className="text-[#B7FF3C] font-bold">5.2× ROAS</span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-base text-[#101010] font-display">Raycast — Developer Productivity</h3>
                <p className="text-xs text-[#626262] font-sans">Campaign completed &amp; fully settled</p>
              </div>

              {/* Milestones */}
              <div className="flex items-center justify-between text-xs font-mono pt-2 border-t border-[#E7E7E4]">
                <span className="text-[#626262]">Total Disbursed:</span>
                <span className="font-bold text-[#101010] numeric-tabular">₹22,000</span>
              </div>
            </div>

            <Link href="/app/collaborations" className="block pt-2">
              <button className="w-full py-2.5 rounded-[9px] bg-[#FAFAF8] hover:bg-[#FFFFFF] border border-[#E7E7E4] text-[#101010] font-semibold text-xs transition-all flex items-center justify-center gap-1.5">
                <span>View Analytics</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
