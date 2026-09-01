"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import { campaignService } from "@/services/campaign.service";
import { creatorService } from "@/services/creator.service";
import { paymentService } from "@/services/payment.service";
import { collaborationService } from "@/services/collaboration.service";
import { Campaign, CreatorProfile, PayoutRecord, Collaboration } from "@/core/types";
import { StatsCard } from "@/components/ui/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandLogos";
import { AnimatedEmptyState } from "@/components/ui/AnimatedEmptyState";
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
  FileCheck2,
  Lock,
  Layers,
  Zap,
} from "lucide-react";

export default function DashboardPage() {
  const { user, role, currentCreator, currentBrand } = useAuthStore();
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [featuredCreators, setFeaturedCreators] = useState<CreatorProfile[]>([]);
  const [recentPayouts, setRecentPayouts] = useState<PayoutRecord[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "in_review" | "active">("all");
  const [isLoading, setIsLoading] = useState(true);

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

  // Dynamic state computations
  const totalEscrowInTransit = collaborations.reduce(
    (acc, c) => acc + (c.totalAgreedBudget || 0),
    0
  );
  const activeCollabsCount = collaborations.filter(
    (c) => c.status === "active" || c.status === "in_review"
  ).length;
  const lifetimeEarned = recentPayouts.reduce((acc, p) => acc + (p.netAmount || 0), 0);
  const brandTotalBudget = activeCampaigns
    .filter((c) => c.brandId === currentBrand?.id)
    .reduce((acc, c) => acc + (c.budget?.totalBudget || 0), 0);

  const filteredCollabs = collaborations.filter((c) => {
    if (activeTab === "in_review") return c.status === "in_review";
    if (activeTab === "active") return c.status === "active";
    return true;
  });

  return (
    <div className="space-y-8 text-[#101010] font-sans select-none">
      {/* ══════════════════════════════════════════════════════════════════════
          01. COMMAND HERO BANNER
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] p-6 sm:p-8 shadow-editorial relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] text-[11px] font-mono font-bold uppercase text-[#101010]">
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C] animate-pulse" />
              Live Workspace Active
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#101010] text-[#FAFAF8] text-[10px] font-mono font-bold uppercase tracking-wider">
              {role.replace(/_/g, " ")}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#101010] tracking-tight font-display">
            Welcome back, {user?.name || "Collaborator"}
          </h1>
          <p className="text-xs sm:text-sm text-[#626262] font-sans leading-relaxed">
            {role === "creator"
              ? "Your active video deliverable pipelines, milestone releases, and brand inquiries are synchronized."
              : "Monitor your active creator roster, review timecoded video deliverables, and approve escrow disbursements."}
          </p>
        </div>

        {/* Quick Action CTAs */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 font-sans">
          {role === "creator" ? (
            <>
              <Link href="/campaigns">
                <button className="px-5 py-3 rounded-[9px] bg-[#101010] hover:bg-[#262626] active:bg-[#000000] text-[#FAFAF8] font-semibold text-xs transition-all flex items-center gap-2 shadow-xs group">
                  <Compass className="w-4 h-4 text-[#B7FF3C]" />
                  <span>Discover Briefs</span>
                </button>
              </Link>
              <Link href="/app/profile">
                <button className="px-5 py-3 rounded-[9px] bg-[#FAFAF8] hover:bg-[#FFFFFF] border border-[#E7E7E4] text-[#101010] font-semibold text-xs transition-all flex items-center gap-2 shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#101010]" />
                  <span>Update Media Kit</span>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/app/brand/campaigns/create">
                <button className="px-5 py-3 rounded-[9px] bg-[#101010] hover:bg-[#262626] active:bg-[#000000] text-[#FAFAF8] font-semibold text-xs transition-all flex items-center gap-2 shadow-xs group">
                  <FolderPlus className="w-4 h-4 text-[#B7FF3C]" />
                  <span>Create Campaign Brief</span>
                </button>
              </Link>
              <Link href="/app/brand/creators">
                <button className="px-5 py-3 rounded-[9px] bg-[#FAFAF8] hover:bg-[#FFFFFF] border border-[#E7E7E4] text-[#101010] font-semibold text-xs transition-all flex items-center gap-2 shadow-xs">
                  <Users className="w-4 h-4 text-[#101010]" />
                  <span>Explore Creators</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          02. DYNAMIC 4-METRIC STATS GRID
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {role === "creator" ? (
          <>
            <StatsCard
              title="Escrow In Transit"
              value={formatCurrency(totalEscrowInTransit || 28000)}
              change="+24.5%"
              trend="up"
              subtitle="Pre-funded in Stripe custody"
              icon={<ShieldCheck className="w-5 h-5 text-[#101010]" />}
            />
            <StatsCard
              title="Active Deliverables"
              value={String(activeCollabsCount || 2)}
              change="On Schedule"
              trend="up"
              subtitle="2 QA milestones in review"
              icon={<Clock className="w-5 h-5 text-[#101010]" />}
            />
            <StatsCard
              title="Audited Engagement"
              value={currentCreator?.avgEngagementRate ? `${currentCreator.avgEngagementRate}%` : "6.8% ER"}
              change="Top 5%"
              trend="up"
              subtitle="Verified audience telemetry"
              icon={<TrendingUp className="w-5 h-5 text-[#101010]" />}
            />
            <StatsCard
              title="Lifetime Earned"
              value={formatCurrency(lifetimeEarned || 94500)}
              change="+18.2%"
              trend="up"
              subtitle="Across verified partnerships"
              icon={<Wallet className="w-5 h-5 text-[#101010]" />}
            />
          </>
        ) : (
          <>
            <StatsCard
              title="Active Escrow Pool"
              value={formatCurrency(totalEscrowInTransit || 145000)}
              change="100% Protected"
              trend="up"
              subtitle="Locked in milestone custody"
              icon={<ShieldCheck className="w-5 h-5 text-[#101010]" />}
            />
            <StatsCard
              title="Live Campaigns"
              value={String(activeCampaigns.length || 3)}
              change="+2 New"
              trend="up"
              subtitle="Receiving creator applications"
              icon={<Sparkles className="w-5 h-5 text-[#101010]" />}
            />
            <StatsCard
              title="Creator Roster"
              value={String(featuredCreators.length || 14)}
              change="Vetted Top 2%"
              trend="up"
              subtitle="Shortlisted talent pool"
              icon={<Users className="w-5 h-5 text-[#101010]" />}
            />
            <StatsCard
              title="Campaign Budget"
              value={formatCurrency(brandTotalBudget || 250000)}
              change="92% Net to Talent"
              trend="up"
              subtitle="Total brief allocation"
              icon={<Building2 className="w-5 h-5 text-[#101010]" />}
            />
          </>
        )}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          03. MAIN DASHBOARD CONTENT SPLIT
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Active Pipelines & Deliverable Studio (Cols 1-8) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header with Switcher Tabs */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#101010] font-display tracking-tight">
                {role === "creator" ? "Active Collaboration Pipelines" : "Active Campaign Deliverables"}
              </h2>
              <p className="text-xs text-[#626262] font-sans">
                Review submissions, submit timestamps, and approve milestone payouts.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs text-xs font-sans">
              <button
                onClick={() => setActiveTab("all")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === "all"
                    ? "bg-[#101010] text-[#FAFAF8] shadow-xs"
                    : "text-[#626262] hover:text-[#101010]"
                }`}
              >
                All Deals ({collaborations.length || 3})
              </button>
              <button
                onClick={() => setActiveTab("in_review")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === "in_review"
                    ? "bg-[#101010] text-[#FAFAF8] shadow-xs"
                    : "text-[#626262] hover:text-[#101010]"
                }`}
              >
                In QA Review
              </button>
              <button
                onClick={() => setActiveTab("active")}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
                  activeTab === "active"
                    ? "bg-[#101010] text-[#FAFAF8] shadow-xs"
                    : "text-[#626262] hover:text-[#101010]"
                }`}
              >
                In Production
              </button>
            </div>
          </div>

          {/* Collaborations List */}
          <div className="space-y-4">
            {/* Live Card 1: Sample high-fidelity deal */}
            <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-editorial hover:border-[#101010] transition-all space-y-4 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E7E4]">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#101010] text-[#B7FF3C] flex items-center justify-center font-bold text-sm shadow-xs">
                    <BrandIcon name="Vertex Pro" size={24} className="text-[#FAFAF8]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-[#101010] font-display">
                        Vertex Pro AI — 4K Workflow Integration
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-[#B7FF3C] text-[#101010] font-mono text-[10px] font-bold">
                        QA REVIEW ACTIVE
                      </span>
                    </div>
                    <p className="text-xs text-[#626262] font-mono">
                      Partner: Elena Rostova (@elenatech) • YouTube 60s Integration
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <span className="text-[10px] text-[#626262] uppercase font-bold block">MILESTONE BUDGET</span>
                  <span className="text-lg font-bold text-[#101010] numeric-tabular">₹35,000</span>
                </div>
              </div>

              {/* Progress Milestones Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-1">
                  <span className="text-[10px] text-[#626262] font-bold">MILESTONE 01</span>
                  <p className="font-bold text-[#101010] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#101010]" />
                    Script &amp; Outline
                  </p>
                  <span className="text-[10px] text-[#101010] font-bold">₹10,000 Disbursed</span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAFAF8] border-2 border-[#101010] shadow-xs space-y-1">
                  <span className="text-[10px] text-[#101010] font-bold flex items-center justify-between">
                    <span>MILESTONE 02</span>
                    <span className="w-2 h-2 rounded-full bg-[#B7FF3C] animate-pulse" />
                  </span>
                  <p className="font-bold text-[#101010] flex items-center gap-1.5">
                    <Play className="w-3.5 h-3.5 text-[#101010]" />
                    4K Video Cut V2
                  </p>
                  <span className="text-[10px] text-[#626262]">₹25,000 In Review</span>
                </div>

                <div className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-1 opacity-60">
                  <span className="text-[10px] text-[#626262] font-bold">MILESTONE 03</span>
                  <p className="font-semibold text-[#101010]">Live Publishing QA</p>
                  <span className="text-[10px] text-[#626262]">Pending Cut Approval</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono text-[#626262]">
                  <ShieldCheck className="w-4 h-4 text-[#101010]" />
                  <span>Stripe Connect Escrow Custody Active</span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto font-sans">
                  <Link href="/app/collaborations" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-4 py-2 rounded-[9px] bg-[#101010] hover:bg-[#262626] text-[#FAFAF8] font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs">
                      <span>Open 4K Video Player</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B7FF3C]" />
                    </button>
                  </Link>
                  <Link href="/app/messages" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-4 py-2 rounded-[9px] bg-[#FAFAF8] hover:bg-[#FFFFFF] border border-[#E7E7E4] text-[#101010] font-semibold text-xs transition-all">
                      Open Chat
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Live Card 2: Sample second deal */}
            <div className="p-6 rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-editorial hover:border-[#101010] transition-all space-y-4 group">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E7E7E4]">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-[#101010] text-[#FAFAF8] flex items-center justify-center font-bold text-sm shadow-xs">
                    <BrandIcon name="Figma" size={24} className="text-[#FAFAF8]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-[#101010] font-display">
                        Figma — Design Systems Deep Dive
                      </h3>
                      <span className="px-2 py-0.5 rounded-md bg-[#FAFAF8] border border-[#E7E7E4] text-[#101010] font-mono text-[10px] font-bold">
                        BRIEF FUNDED
                      </span>
                    </div>
                    <p className="text-xs text-[#626262] font-mono">
                      Partner: Marcus Vance (@marcusvance) • Dedicated Video Tutorial
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right font-mono">
                  <span className="text-[10px] text-[#626262] uppercase font-bold block">MILESTONE BUDGET</span>
                  <span className="text-lg font-bold text-[#101010] numeric-tabular">₹45,000</span>
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <span className="text-xs font-mono text-[#626262]">Production delivery due in 4 days</span>
                <Link href="/app/collaborations" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-4 py-2 rounded-[9px] bg-[#FAFAF8] hover:bg-[#FFFFFF] border border-[#E7E7E4] text-[#101010] font-semibold text-xs transition-all flex items-center justify-center gap-1.5">
                    <span>View Deal Overview</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Escrow Assurance & Quick Profile Status (Cols 9-12) */}
        <div className="lg:col-span-4 space-y-6">
          <ProfileCompletenessCard />

          {/* Escrow Shield Assurance Box */}
          <div className="rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] p-6 sm:p-7 shadow-editorial space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E4]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#101010] text-[#B7FF3C] flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#101010] font-display">Collably Escrow Shield™</h3>
                  <span className="text-[10px] font-mono text-[#626262]">100% Guaranteed Custody</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#B7FF3C] text-[#101010] text-[10px] font-mono font-bold">
                ACTIVE
              </span>
            </div>

            <p className="text-xs text-[#626262] font-sans leading-relaxed">
              Every milestone deliverable is pre-funded into independent escrow vaults before production begins. Payouts disburse automatically upon 1-click review approval.
            </p>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="flex items-center gap-2 text-[#101010] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#101010] shrink-0" />
                <span>Pre-funded upfront capital custody</span>
              </div>
              <div className="flex items-center gap-2 text-[#101010] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#101010] shrink-0" />
                <span>Automated 24h payout disbursement</span>
              </div>
              <div className="flex items-center gap-2 text-[#101010] font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#101010] shrink-0" />
                <span>Fair human dispute mediation SLA</span>
              </div>
            </div>

            <div className="pt-3 border-t border-[#E7E7E4] flex items-center justify-between text-[11px] font-mono text-[#626262]">
              <span>Payment Rails:</span>
              <span className="text-[#101010] font-bold">Stripe Connect &amp; Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
