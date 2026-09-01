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
} from "lucide-react";

export default function DashboardPage() {
  const { user, role, currentCreator, currentBrand } = useAuthStore();
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [featuredCreators, setFeaturedCreators] = useState<CreatorProfile[]>([]);
  const [recentPayouts, setRecentPayouts] = useState<PayoutRecord[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
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

  // Compute dynamic stats from actual state
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

  return (
    <div className="space-y-8 text-white font-sans select-none">
      {/* ── Welcome Banner ── */}
      <div className="rounded-3xl bg-[#0E0C15]/90 border border-white/10 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono font-bold text-white/80">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Workspace Active
            </span>
            <span className="px-2.5 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-mono font-bold uppercase tracking-wider">
              {role.replace(/_/g, " ")}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Welcome back, {user?.name || "Collaborator"}
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-sans leading-relaxed">
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
                <button className="px-5 py-3 rounded-full bg-gradient-to-r from-[#2A5CFF] to-[#3B73FF] hover:from-[#234FE6] hover:to-[#3264E6] text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(42,92,255,0.4)] group">
                  <Compass className="w-4 h-4 text-white" />
                  <span>Discover Briefs</span>
                </button>
              </Link>
              <Link href="/app/profile">
                <button className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-xs">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Media Kit</span>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/app/brand/campaigns/create">
                <button className="px-5 py-3 rounded-full bg-gradient-to-r from-[#2A5CFF] to-[#3B73FF] hover:from-[#234FE6] hover:to-[#3264E6] text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(42,92,255,0.4)] group">
                  <FolderPlus className="w-4 h-4 text-white" />
                  <span>Create Campaign</span>
                </button>
              </Link>
              <Link href="/app/brand/creators">
                <button className="px-5 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-xs">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Explore Creators</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {role === "creator" ? (
          <>
            <StatsCard
              title="Escrow In Transit"
              value={formatCurrency(totalEscrowInTransit || 28000)}
              change="+24.5%"
              trend="up"
              subtitle="Pre-funded in Stripe custody"
              icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
            />
            <StatsCard
              title="Active Deliverables"
              value={String(activeCollabsCount || 2)}
              change="On Schedule"
              trend="up"
              subtitle="2 QA milestones in review"
              icon={<Clock className="w-5 h-5 text-blue-400" />}
            />
            <StatsCard
              title="Audited Engagement"
              value={currentCreator?.avgEngagementRate ? `${currentCreator.avgEngagementRate}%` : "6.8% ER"}
              change="Top 5%"
              trend="up"
              subtitle="Verified audience telemetry"
              icon={<TrendingUp className="w-5 h-5 text-[#B7FF3C]" />}
            />
            <StatsCard
              title="Lifetime Earned"
              value={formatCurrency(lifetimeEarned || 94500)}
              change="+18.2%"
              trend="up"
              subtitle="Across verified partnerships"
              icon={<Wallet className="w-5 h-5 text-white" />}
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
              icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
            />
            <StatsCard
              title="Live Campaigns"
              value={String(activeCampaigns.length || 3)}
              change="+2 New"
              trend="up"
              subtitle="Receiving creator applications"
              icon={<Sparkles className="w-5 h-5 text-blue-400" />}
            />
            <StatsCard
              title="Creator Roster"
              value={String(featuredCreators.length || 14)}
              change="Vetted Top 2%"
              trend="up"
              subtitle="Shortlisted talent pool"
              icon={<Users className="w-5 h-5 text-white" />}
            />
            <StatsCard
              title="Campaign Budget"
              value={formatCurrency(brandTotalBudget || 250000)}
              change="92% Net to Talent"
              trend="up"
              subtitle="Total brief allocation"
              icon={<Building2 className="w-5 h-5 text-white" />}
            />
          </>
        )}
      </div>

      {/* ── Main Split ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white font-display tracking-tight">
                {role === "creator" ? "Active Collaboration Pipelines" : "Active Campaign Deliverables"}
              </h2>
              <p className="text-xs text-white/50 font-sans">
                Review submissions, submit timestamps, and approve milestone payouts.
              </p>
            </div>
            <Link
              href="/app/collaborations"
              className="text-xs font-mono text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Deal Cards */}
          <div className="space-y-4">
            <div className="p-6 rounded-3xl bg-[#0E0C15]/90 border border-white/10 shadow-2xl backdrop-blur-xl hover:border-white/20 transition-all space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                    <BrandIcon name="Vertex Pro" size={24} className="text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-base text-white font-display">
                        Vertex Pro AI — 4K Workflow Integration
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                        QA REVIEW
                      </span>
                    </div>
                    <p className="text-xs text-white/50 font-mono">
                      Partner: Elena Rostova (@elenatech) • YouTube 60s
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right font-mono">
                  <span className="text-[10px] text-white/40 uppercase font-bold block">MILESTONE BUDGET</span>
                  <span className="text-lg font-bold text-white numeric-tabular">₹35,000</span>
                </div>
              </div>

              {/* Progress Milestones */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1">
                  <span className="text-[10px] text-white/40 font-bold">MILESTONE 01</span>
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Script &amp; Outline
                  </p>
                  <span className="text-[10px] text-white/70">₹10,000 Disbursed</span>
                </div>

                <div className="p-3 rounded-2xl bg-blue-600/15 border border-blue-500/40 shadow-xs space-y-1">
                  <span className="text-[10px] text-blue-400 font-bold flex items-center justify-between">
                    <span>MILESTONE 02</span>
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                  </span>
                  <p className="font-bold text-white">4K Video Cut V2</p>
                  <span className="text-[10px] text-white/70">₹25,000 In Review</span>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1 opacity-50">
                  <span className="text-[10px] text-white/40 font-bold">MILESTONE 03</span>
                  <p className="font-semibold text-white">Live Publishing QA</p>
                  <span className="text-[10px] text-white/50">Pending Approval</span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Stripe Connect Escrow Custody Active</span>
                </div>
                <div className="flex items-center gap-2.5 w-full sm:w-auto font-sans">
                  <Link href="/app/collaborations" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-4 py-2 rounded-full bg-gradient-to-r from-[#2A5CFF] to-[#3B73FF] text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5 shadow-md">
                      <span>Open 4K Player</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                  <Link href="/app/messages" className="w-full sm:w-auto">
                    <button className="w-full sm:w-auto px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold text-xs transition-all">
                      Open Chat
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar: Completeness & Escrow Shield */}
        <div className="lg:col-span-4 space-y-6">
          <ProfileCompletenessCard />

          <div className="rounded-3xl bg-[#0E0C15]/90 border border-white/10 p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-600/20 border border-blue-500/30 text-blue-400 flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-display">Collably Escrow Shield™</h3>
                  <span className="text-[10px] font-mono text-white/50">100% Guaranteed Custody</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                ACTIVE
              </span>
            </div>

            <p className="text-xs text-white/60 font-sans leading-relaxed">
              Every milestone deliverable is pre-funded into independent escrow vaults before production begins. Payouts disburse automatically upon 1-click review approval.
            </p>

            <div className="space-y-2.5 text-xs font-sans">
              <div className="flex items-center gap-2 text-white font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pre-funded upfront capital custody</span>
              </div>
              <div className="flex items-center gap-2 text-white font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated 24h payout disbursement</span>
              </div>
              <div className="flex items-center gap-2 text-white font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Fair human dispute mediation SLA</span>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/50">
              <span>Payment Rails:</span>
              <span className="text-white font-bold">Stripe Connect &amp; Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
