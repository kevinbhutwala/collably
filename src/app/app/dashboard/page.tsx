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
import { SubscriptionUsageCard } from "@/components/subscriptions/SubscriptionUsageCard";
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
    <div className="space-y-8 text-[#0A0A0E] font-sans select-none">
      {/* ── Welcome Banner with #FFD21F & Pure White Aesthetic ── */}
      <div className="rounded-3xl bg-white border border-black/8 p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Subtle Gold Flare Background Accent */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD21F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[11px] font-mono font-bold text-[#0A0A0E]">
              <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
              Live Workspace Active
            </span>
            <span className="px-2.5 py-1 rounded-full bg-black/5 border border-black/10 text-[#0A0A0E] text-[10px] font-mono font-bold uppercase tracking-wider">
              {role.replace(/_/g, " ")}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Welcome back, <span className="text-[#0A0A0E] font-black">{user?.name || "Collaborator"}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] font-sans leading-relaxed">
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
                <button className="px-5 py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-2 shadow-[0_4px_14px_rgba(255,210,31,0.4)] border border-black/10 group">
                  <Compass className="w-4 h-4 text-[#0A0A0E]" />
                  <span>Discover Briefs</span>
                </button>
              </Link>
              <Link href="/app/profile">
                <button className="px-5 py-3 rounded-full bg-white hover:bg-[#F8F8FC] border border-black/10 text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-2 shadow-xs">
                  <Sparkles className="w-4 h-4 text-[#FFD21F]" />
                  <span>Media Kit</span>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/app/brand/campaigns/create">
                <button className="px-5 py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-2 shadow-[0_4px_14px_rgba(255,210,31,0.4)] border border-black/10 group">
                  <FolderPlus className="w-4 h-4 text-[#0A0A0E]" />
                  <span>Create Campaign</span>
                </button>
              </Link>
              <Link href="/app/brand/creators">
                <button className="px-5 py-3 rounded-full bg-white hover:bg-[#F8F8FC] border border-black/10 text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-2 shadow-xs">
                  <Users className="w-4 h-4 text-[#FFD21F]" />
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
              icon={<ShieldCheck className="w-5 h-5 text-[#FFD21F]" />}
            />
            <StatsCard
              title="Active Deliverables"
              value={String(activeCollabsCount || 2)}
              change="On Schedule"
              trend="up"
              subtitle="2 QA milestones in review"
              icon={<Clock className="w-5 h-5 text-[#0A0A0E]" />}
            />
            <StatsCard
              title="Audited Engagement"
              value={currentCreator?.avgEngagementRate ? `${currentCreator.avgEngagementRate}%` : "6.8% ER"}
              change="Top 5%"
              trend="up"
              subtitle="Verified audience telemetry"
              icon={<TrendingUp className="w-5 h-5 text-[#FFD21F]" />}
            />
            <StatsCard
              title="Lifetime Earned"
              value={formatCurrency(lifetimeEarned || 94500)}
              change="+18.2%"
              trend="up"
              subtitle="Across verified partnerships"
              icon={<Wallet className="w-5 h-5 text-[#0A0A0E]" />}
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
              icon={<ShieldCheck className="w-5 h-5 text-[#FFD21F]" />}
            />
            <StatsCard
              title="Active Creators"
              value={String(featuredCreators.length || 5)}
              change="+3 Pending"
              trend="up"
              subtitle="Roster content pipeline"
              icon={<Users className="w-5 h-5 text-[#0A0A0E]" />}
            />
            <StatsCard
              title="Live Campaigns"
              value={String(activeCampaigns.length || 3)}
              change="100% On-time"
              trend="up"
              subtitle="Active market briefs"
              icon={<Building2 className="w-5 h-5 text-[#FFD21F]" />}
            />
            <StatsCard
              title="Estimated ROI"
              value="5.2x"
              change="+18% vs avg"
              trend="up"
              subtitle="Audited performance multiplier"
              icon={<TrendingUp className="w-5 h-5 text-[#0A0A0E]" />}
            />
          </>
        )}
      </div>

      {/* ── Subscription Status & Usage Limits Widget ── */}
      <SubscriptionUsageCard />

      {/* ── Main Two-Column Interactive Stage ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Left Column: Active Pipelines & Opportunities */}
        <div className="lg:col-span-8 space-y-8">
          {/* Active Collaborations Pipeline */}
          <div className="rounded-3xl bg-white border border-black/8 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-black/8">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-ping" />
                  <h2 className="text-base sm:text-lg font-bold text-[#0A0A0E] font-display">
                    {role === "creator" ? "Active Milestone Deliverables" : "Creator Deliverable Review Rooms"}
                  </h2>
                </div>
                <p className="text-xs text-[#5A5A68] font-sans">
                  {role === "creator"
                    ? "Upload 4K video drafts and track sponsor timestamp review feedback."
                    : "Inspect video cuts with frame-accurate annotations and approve payout tranches."}
                </p>
              </div>

              <Link
                href="/app/collaborations"
                className="text-xs font-mono font-bold text-[#0A0A0E] hover:text-[#A37F00] transition-colors flex items-center gap-1 shrink-0"
              >
                <span>View Pipeline ({collaborations.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {isLoading ? (
              <div className="py-12 text-center text-xs font-mono text-[#7A7A8A]">
                Synchronizing milestone review rooms...
              </div>
            ) : collaborations.length === 0 ? (
              <AnimatedEmptyState
                icon={<FolderPlus className="w-8 h-8 text-[#0A0A0E]" />}
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
                    className="p-5 rounded-2xl bg-[#F8F8FC] border border-black/8 hover:border-[#FFD21F] transition-all space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white border border-black/10 flex items-center justify-center shrink-0 shadow-xs">
                          <BrandIcon
                            name={collab.brand?.companyName || "Linear"}
                            className="w-5 h-5 text-[#0A0A0E]"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-[#0A0A0E] font-sans line-clamp-1">
                            {collab.campaignTitle}
                          </h3>
                          <p className="text-[11px] font-mono text-[#6A6A78]">
                            {collab.brand?.companyName} • {formatCurrency(collab.totalAgreedBudget)} Escrow
                          </p>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider self-start sm:self-auto bg-[#FFD21F]/20 text-[#0A0A0E] border border-[#FFD21F]/40">
                        {collab.status.replace(/_/g, " ")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/8 text-xs font-mono">
                      <span className="text-[#5A5A68]">
                        Deliverable: <strong className="text-[#0A0A0E]">{collab.deliverables?.[0]?.title || "Draft"}</strong>
                      </span>
                      <Link
                        href="/app/collaborations"
                        className="text-[#0A0A0E] hover:text-[#A37F00] font-bold flex items-center gap-1 transition-colors"
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
          <div className="rounded-3xl bg-white border border-black/8 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-black/8">
              <div className="space-y-0.5">
                <h2 className="text-base sm:text-lg font-bold text-[#0A0A0E] font-display">
                  Featured Campaign Briefs
                </h2>
                <p className="text-xs text-[#5A5A68] font-sans">
                  Active escrow-funded sponsorship opportunities matching your niche.
                </p>
              </div>

              <Link
                href="/campaigns"
                className="text-xs font-mono font-bold text-[#0A0A0E] hover:text-[#A37F00] transition-colors flex items-center gap-1"
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
                  className="p-5 rounded-2xl bg-[#F8F8FC] border border-black/8 hover:border-[#FFD21F] transition-all group flex flex-col justify-between space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] text-[10px] font-mono font-bold uppercase border border-[#FFD21F]/30">
                        {c.category}
                      </span>
                      <span className="text-[11px] font-mono text-[#0A0A0E] font-extrabold">
                        {formatCurrency(c.budget.totalBudget)} Pool
                      </span>
                    </div>
                    <h3 className="font-bold text-sm text-[#0A0A0E] group-hover:text-[#A37F00] transition-colors font-display line-clamp-1">
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#5A5A68] line-clamp-2 mt-1 font-sans">
                      {c.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-black/8 text-xs font-mono text-[#6A6A78]">
                    <span>{c.acceptedCount}/{c.maxCreators} slots filled</span>
                    <span className="text-[#0A0A0E] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
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
          <div className="rounded-3xl bg-white border border-black/8 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/8">
              <h3 className="text-sm font-bold text-[#0A0A0E] font-display">Recent Tranche Activity</h3>
              <Link
                href="/app/earnings"
                className="text-[11px] font-mono text-[#0A0A0E] hover:text-[#A37F00] font-bold"
              >
                Ledger
              </Link>
            </div>

            {recentPayouts.length === 0 ? (
              <p className="text-xs text-[#7A7A8A] font-mono py-4 text-center">
                No recent disbursements recorded.
              </p>
            ) : (
              <div className="divide-y divide-black/5 font-mono text-xs">
                {recentPayouts.slice(0, 3).map((p) => (
                  <div key={p.id} className="py-3 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#0A0A0E] block truncate max-w-[140px] font-sans">
                        {p.campaignTitle}
                      </span>
                      <span className="text-[10px] text-[#6A6A78]">{p.brandName}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#0A0A0E] block">
                        +{formatCurrency(p.netAmount)}
                      </span>
                      <span className="text-[9px] text-[#7A7A8A] uppercase font-bold">{p.status}</span>
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
