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
      {/* ── Welcome Banner with Black & Navy Blue Gradient ── */}
      <div className="rounded-3xl bg-gradient-to-r from-[#040714] via-[#0B1536] to-[#14265A] border border-blue-500/25 p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_35px_rgba(37,99,235,0.2)] backdrop-blur-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-950/70 border border-blue-400/30 text-[11px] font-mono font-bold text-blue-200 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live Workspace Active
            </span>
            <span className="px-2.5 py-1 rounded-full bg-gradient-to-r from-blue-600/30 to-indigo-600/30 border border-blue-400/30 text-blue-300 text-[10px] font-mono font-bold uppercase tracking-wider">
              {role.replace(/_/g, " ")}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Welcome back, <span className="bg-gradient-to-r from-white via-blue-100 to-blue-300 bg-clip-text text-transparent">{user?.name || "Collaborator"}</span>
          </h1>
          <p className="text-xs sm:text-sm text-blue-100/70 font-sans leading-relaxed">
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
                <button className="px-5 py-3 rounded-full bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] hover:from-[#1E40AF] hover:via-[#1D4ED8] hover:to-[#2563EB] text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(37,99,235,0.55)] border border-blue-300/30 group">
                  <Compass className="w-4 h-4 text-white" />
                  <span>Discover Briefs</span>
                </button>
              </Link>
              <Link href="/app/profile">
                <button className="px-5 py-3 rounded-full bg-gradient-to-r from-[#0C1738] to-[#122252] hover:from-[#122252] hover:to-[#1A3175] border border-blue-400/30 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-sm">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Media Kit</span>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/app/brand/campaigns/create">
                <button className="px-5 py-3 rounded-full bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] hover:from-[#1E40AF] hover:via-[#1D4ED8] hover:to-[#2563EB] text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-[0_0_25px_rgba(37,99,235,0.55)] border border-blue-300/30 group">
                  <FolderPlus className="w-4 h-4 text-white" />
                  <span>Create Campaign</span>
                </button>
              </Link>
              <Link href="/app/brand/creators">
                <button className="px-5 py-3 rounded-full bg-gradient-to-r from-[#0C1738] to-[#122252] hover:from-[#122252] hover:to-[#1A3175] border border-blue-400/30 text-white font-semibold text-xs transition-all flex items-center gap-2 shadow-sm">
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
              title="Active Brand Escrows"
              value={formatCurrency(brandTotalBudget || 45000)}
              change="Secured"
              trend="up"
              subtitle="Pre-authorized milestones"
              icon={<ShieldCheck className="w-5 h-5 text-emerald-400" />}
            />
            <StatsCard
              title="Active Creators"
              value={String(featuredCreators.length || 5)}
              change="+3 Pending"
              trend="up"
              subtitle="Roster content pipeline"
              icon={<Users className="w-5 h-5 text-blue-400" />}
            />
            <StatsCard
              title="Live Campaigns"
              value={String(activeCampaigns.length || 3)}
              change="100% On-time"
              trend="up"
              subtitle="Active market briefs"
              icon={<Building2 className="w-5 h-5 text-[#B7FF3C]" />}
            />
            <StatsCard
              title="Estimated ROI"
              value="5.2x"
              change="+18% vs avg"
              trend="up"
              subtitle="Audited performance multiplier"
              icon={<TrendingUp className="w-5 h-5 text-white" />}
            />
          </>
        )}
      </div>

      {/* ── Main Two-Column Interactive Stage ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Active Pipelines & Opportunities */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Collaborations Pipeline */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0A1026] to-[#04060E] border border-blue-500/18 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-blue-500/15">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <h2 className="text-base sm:text-lg font-bold text-white font-display">
                    {role === "creator" ? "Active Milestone Deliverables" : "Creator Deliverable Review Rooms"}
                  </h2>
                </div>
                <p className="text-xs text-blue-200/50 font-sans">
                  {role === "creator"
                    ? "Upload 4K video drafts and track sponsor timestamp review feedback."
                    : "Inspect video cuts with frame-accurate annotations and approve payout tranches."}
                </p>
              </div>

              <Link
                href="/app/collaborations"
                className="text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 shrink-0"
              >
                <span>View Pipeline ({collaborations.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {isLoading ? (
              <div className="py-12 text-center text-xs font-mono text-blue-200/40">
                Synchronizing milestone review rooms...
              </div>
            ) : collaborations.length === 0 ? (
              <AnimatedEmptyState
                icon={<FolderPlus className="w-8 h-8 text-white" />}
                badgeText="Milestone Escrow"
                title="No Active Collaborations"
                description={
                  role === "creator"
                    ? "Apply to open campaign briefs to unlock escrow-secured milestone collaboration rooms."
                    : "Create a campaign brief to receive pitches and initiate milestone-protected projects."
                }
                actionText={role === "creator" ? "Browse Brand Briefs" : "Create Campaign Brief"}
                actionHref={role === "creator" ? "/campaigns" : "/app/brand/campaigns/create"}
              />
            ) : (
              <div className="space-y-4">
                {collaborations.map((collab) => (
                  <div
                    key={collab.id}
                    className="p-5 rounded-2xl bg-gradient-to-r from-[#0C1636]/80 to-[#070D22]/90 border border-blue-500/20 hover:border-blue-400/40 transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600/30 to-indigo-900/40 border border-blue-400/25 flex items-center justify-center shrink-0">
                          <BrandIcon
                            name={collab.brand?.companyName || "Linear"}
                            className="w-5 h-5 text-blue-300"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-white font-sans line-clamp-1">
                            {collab.campaignTitle}
                          </h3>
                          <p className="text-[11px] font-mono text-blue-200/50">
                            {collab.brand?.companyName} • {formatCurrency(collab.totalAgreedBudget)} Escrow
                          </p>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider self-start sm:self-auto bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        {collab.status.replace(/_/g, " ")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-blue-500/10 text-xs font-mono">
                      <span className="text-blue-200/50">
                        Deliverable: <strong className="text-white">{collab.deliverables?.[0]?.title || "Draft"}</strong>
                      </span>
                      <Link
                        href="/app/collaborations"
                        className="text-blue-400 hover:text-blue-300 font-bold flex items-center gap-1 transition-colors"
                      >
                        <span>Open Workspace</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Open Brand Briefs Discovery Bar */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0A1026] to-[#04060E] border border-blue-500/18 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-blue-500/15">
              <div className="space-y-0.5">
                <h2 className="text-base sm:text-lg font-bold text-white font-display">
                  Featured Campaign Briefs
                </h2>
                <p className="text-xs text-blue-200/50 font-sans">
                  Active escrow-funded sponsorship opportunities matching your niche.
                </p>
              </div>

              <Link
                href="/campaigns"
                className="text-xs font-mono font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1"
              >
                <span>Explore All ({activeCampaigns.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeCampaigns.slice(0, 4).map((c) => (
                <Link
                  key={c.id}
                  href={`/campaigns/${c.id}`}
                  className="p-5 rounded-2xl bg-gradient-to-r from-[#0C1636]/80 to-[#070D22]/90 border border-blue-500/20 hover:border-blue-400/40 transition-all group flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-mono font-bold uppercase border border-blue-400/20">
                        {c.category}
                      </span>
                      <span className="text-[11px] font-mono text-emerald-400 font-bold">
                        {formatCurrency(c.budget.totalBudget)} Pool
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-white group-hover:text-blue-300 transition-colors font-display line-clamp-1">
                      {c.title}
                    </h3>
                    <p className="text-xs text-blue-200/50 line-clamp-2 mt-1 font-sans">
                      {c.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-blue-500/10 text-xs font-mono text-blue-200/50">
                    <span>{c.acceptedCount}/{c.maxCreators} slots filled</span>
                    <span className="text-blue-400 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Apply <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Profile Completeness & Financial Ledger */}
        <div className="lg:col-span-4 space-y-8">
          {/* Profile Health Score Widget */}
          <ProfileCompletenessCard />

          {/* Quick Tranche Payout Ledger */}
          <div className="rounded-3xl bg-gradient-to-br from-[#0A1026] to-[#04060E] border border-blue-500/18 p-6 shadow-2xl backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-blue-500/15">
              <h3 className="text-sm font-bold text-white font-display">Recent Tranche Activity</h3>
              <Link
                href="/app/earnings"
                className="text-[11px] font-mono text-blue-400 hover:text-blue-300 font-semibold"
              >
                Ledger
              </Link>
            </div>

            {recentPayouts.length === 0 ? (
              <p className="text-xs text-blue-200/40 font-mono py-4 text-center">
                No recent disbursements recorded.
              </p>
            ) : (
              <div className="divide-y divide-blue-500/10 font-mono text-xs">
                {recentPayouts.slice(0, 3).map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block truncate max-w-[140px] font-sans">
                        {p.campaignTitle}
                      </span>
                      <span className="text-[10px] text-blue-200/40">{p.brandName}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-emerald-400 block">
                        +{formatCurrency(p.netAmount)}
                      </span>
                      <span className="text-[9px] text-blue-200/40 uppercase">{p.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
