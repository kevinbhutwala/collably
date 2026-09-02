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
      {/* ── Welcome Banner ── */}
      <div className="rounded-3xl bg-gradient-to-br from-[#FFFDF5] via-white to-[#FFF9E6] border border-[#FFD21F]/30 p-5 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD21F]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 relative z-10 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[10px] font-mono font-bold text-[#0A0A0E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-pulse" />
              Live
            </span>
            <span className="px-2 py-0.5 rounded-full bg-black/5 border border-black/8 text-[#0A0A0E] text-[10px] font-mono font-bold uppercase">
              {role.replace(/_/g, " ")}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Welcome back, <span className="font-black">{user?.name || "Collaborator"}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            {role === "creator"
              ? "Here is a summary of your active deliverables, earnings, and briefs."
              : "Here is a summary of your campaigns, creators, and escrow milestones."}
          </p>
        </div>

        {/* Quick Action CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          {role === "creator" ? (
            <>
              <Link href="/app/campaigns">
                <button className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs border border-black/10">
                  <Compass className="w-3.5 h-3.5 text-[#0A0A0E]" />
                  <span>Browse Briefs</span>
                </button>
              </Link>
              <Link href="/app/profile">
                <button className="px-4 py-2.5 rounded-full bg-white hover:bg-[#F8F8FC] border border-black/10 text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#8A7000]" />
                  <span>Media Kit</span>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/app/brand/campaigns/create">
                <button className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs border border-black/10">
                  <FolderPlus className="w-3.5 h-3.5 text-[#0A0A0E]" />
                  <span>New Campaign</span>
                </button>
              </Link>
              <Link href="/app/brand/creators">
                <button className="px-4 py-2.5 rounded-full bg-white hover:bg-[#F8F8FC] border border-black/10 text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs">
                  <Users className="w-3.5 h-3.5 text-[#8A7000]" />
                  <span>Find Talent</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {role === "creator" ? (
          <>
            <StatsCard
              title="In Escrow"
              value={formatCurrency(totalEscrowInTransit || 28000)}
              change="+24%"
              trend="up"
              subtitle="Secured by Stripe"
              icon={<ShieldCheck className="w-4 h-4 text-[#8A7000]" />}
            />
            <StatsCard
              title="Deliverables"
              value={String(activeCollabsCount || 2)}
              change="Active"
              trend="up"
              subtitle="Milestones in progress"
              icon={<Clock className="w-4 h-4 text-[#0A0A0E]" />}
            />
            <StatsCard
              title="Avg Engagement"
              value={currentCreator?.avgEngagementRate ? `${currentCreator.avgEngagementRate}%` : "6.8%"}
              change="Top 5%"
              trend="up"
              subtitle="Audience rate"
              icon={<TrendingUp className="w-4 h-4 text-[#8A7000]" />}
            />
            <StatsCard
              title="Total Earned"
              value={formatCurrency(lifetimeEarned || 94500)}
              change="+18%"
              trend="up"
              subtitle="Paid to date"
              icon={<Wallet className="w-4 h-4 text-[#0A0A0E]" />}
            />
          </>
        ) : (
          <>
            <StatsCard
              title="Total Escrow"
              value={formatCurrency(brandTotalBudget || 45000)}
              change="Funded"
              trend="up"
              subtitle="Secured in milestones"
              icon={<ShieldCheck className="w-4 h-4 text-[#8A7000]" />}
            />
            <StatsCard
              title="Creators"
              value={String(featuredCreators.length || 5)}
              change="+3 new"
              trend="up"
              subtitle="In active roster"
              icon={<Users className="w-4 h-4 text-[#0A0A0E]" />}
            />
            <StatsCard
              title="Live Campaigns"
              value={String(activeCampaigns.length || 3)}
              change="Active"
              trend="up"
              subtitle="Running briefs"
              icon={<Building2 className="w-4 h-4 text-[#8A7000]" />}
            />
            <StatsCard
              title="Estimated ROI"
              value="5.2x"
              change="+18%"
              trend="up"
              subtitle="Average return"
              icon={<TrendingUp className="w-4 h-4 text-[#0A0A0E]" />}
            />
          </>
        )}
      </div>

      {/* ── Subscription Status & Usage Limits Widget ── */}
      <SubscriptionUsageCard />

      {/* ── Main Two-Column Stage ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column: Active Pipelines & Opportunities */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Collaborations Pipeline */}
          <div className="rounded-3xl bg-white border border-black/8 p-5 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-black/8">
              <div>
                <h2 className="text-base font-bold text-[#0A0A0E] font-display">
                  {role === "creator" ? "Active Deliverables" : "Deliverable Reviews"}
                </h2>
                <p className="text-xs text-[#5A5A68]">
                  {role === "creator"
                    ? "Track drafts and milestone approvals."
                    : "Review submissions and approve payouts."}
                </p>
              </div>

              <Link
                href="/app/collaborations"
                className="text-xs font-mono font-bold text-[#0A0A0E] hover:text-[#8A7000] transition-colors flex items-center gap-1 shrink-0"
              >
                <span>View all ({collaborations.length})</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {isLoading ? (
              <div className="py-8 text-center text-xs font-mono text-[#7A7A8A]">
                Loading deliverables...
              </div>
            ) : collaborations.length === 0 ? (
              <AnimatedEmptyState
                icon={<FolderPlus className="w-7 h-7 text-[#0A0A0E]" />}
                badgeText="Escrow"
                title="No Active Projects"
                description={
                  role === "creator"
                    ? "Apply to briefs to unlock milestone workspaces."
                    : "Create a brief to begin working with creators."
                }
                actionText={role === "creator" ? "Browse Briefs" : "Create Brief"}
                actionHref={role === "creator" ? "/app/campaigns" : "/app/brand/campaigns/create"}
              />
            ) : (
              <div className="space-y-3">
                {collaborations.map((collab) => (
                  <div
                    key={collab.id}
                    className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/6 hover:border-[#FFD21F] hover:bg-white transition-all space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white border border-black/8 flex items-center justify-center shrink-0 shadow-2xs">
                          <BrandIcon
                            name={collab.brand?.companyName || "Linear"}
                            className="w-4 h-4 text-[#0A0A0E]"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-xs sm:text-sm text-[#0A0A0E] line-clamp-1">
                            {collab.campaignTitle}
                          </h3>
                          <p className="text-[11px] font-mono text-[#6A6A78]">
                            {collab.brand?.companyName} • {formatCurrency(collab.totalAgreedBudget)}
                          </p>
                        </div>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase self-start sm:self-auto bg-[#FFD21F]/20 text-[#0A0A0E] border border-[#FFD21F]/40">
                        {collab.status.replace(/_/g, " ")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/6 text-xs font-mono">
                      <span className="text-[#5A5A68] text-[11px]">
                        Draft: <strong className="text-[#0A0A0E]">{collab.deliverables?.[0]?.title || "Draft #1"}</strong>
                      </span>
                      <Link
                        href="/app/collaborations"
                        className="text-[#0A0A0E] hover:text-[#8A7000] font-bold flex items-center gap-1 transition-colors text-[11px]"
                      >
                        <span>Workspace</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Open Brand Briefs Discovery Bar */}
          <div className="rounded-3xl bg-white border border-black/8 p-5 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-black/8">
              <div>
                <h2 className="text-base font-bold text-[#0A0A0E] font-display">
                  Featured Briefs
                </h2>
                <p className="text-xs text-[#5A5A68]">
                  Open sponsor campaigns with escrow budgets.
                </p>
              </div>

              <Link
                href="/app/campaigns"
                className="text-xs font-mono font-bold text-[#0A0A0E] hover:text-[#8A7000] transition-colors flex items-center gap-1 shrink-0"
              >
                <span>View all ({activeCampaigns.length})</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {activeCampaigns.slice(0, 4).map((c) => (
                <Link
                  key={c.id}
                  href={`/campaigns/${c.id}`}
                  className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/6 hover:border-[#FFD21F] hover:bg-white transition-all group flex flex-col justify-between space-y-2.5"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] text-[10px] font-mono font-bold uppercase border border-[#FFD21F]/30">
                        {c.category}
                      </span>
                      <span className="text-[11px] font-mono text-[#0A0A0E] font-bold">
                        {formatCurrency(c.budget.totalBudget)}
                      </span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-[#0A0A0E] group-hover:text-[#8A7000] transition-colors line-clamp-1">
                      {c.title}
                    </h3>
                    <p className="text-[11px] text-[#5A5A68] line-clamp-1 mt-0.5">
                      {c.tagline}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-black/6 text-[11px] font-mono text-[#6A6A78]">
                    <span>{c.acceptedCount}/{c.maxCreators} filled</span>
                    <span className="text-[#0A0A0E] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                      Apply <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Profile & Financial Ledger */}
        <div className="lg:col-span-4 space-y-6">
          <ProfileCompletenessCard />

          {/* Quick Payout Ledger */}
          <div className="rounded-3xl bg-white border border-black/8 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3.5">
            <div className="flex items-center justify-between pb-2.5 border-b border-black/8">
              <h3 className="text-sm font-bold text-[#0A0A0E] font-display">Recent Payouts</h3>
              <Link
                href="/app/earnings"
                className="text-[11px] font-mono text-[#0A0A0E] hover:text-[#8A7000] font-bold"
              >
                View all
              </Link>
            </div>

            {recentPayouts.length === 0 ? (
              <p className="text-xs text-[#7A7A8A] font-mono py-3 text-center">
                No recent transactions.
              </p>
            ) : (
              <div className="divide-y divide-black/5 font-mono text-xs">
                {recentPayouts.slice(0, 3).map((p) => (
                  <div key={p.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#0A0A0E] block truncate max-w-[130px] font-sans text-xs">
                        {p.campaignTitle}
                      </span>
                      <span className="text-[10px] text-[#6A6A78]">{p.brandName}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#0A0A0E] block text-xs">
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
