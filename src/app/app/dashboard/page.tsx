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
    <div className="space-y-8 text-[#111111]">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
              Active Session
            </span>
            <span className="text-[#E7E7E4]">•</span>
            <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
              ROLE: {role.replace(/_/g, " ").toUpperCase()}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
            Welcome back, {user?.name || "Collaborator"}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
            Here is your live campaign pipeline, escrow balances, and pending actions today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {role === "creator" ? (
            <Link href="/campaigns">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4 text-[#B7FF3C]" />}>
                Find Brand Briefs
              </Button>
            </Link>
          ) : (
            <Link href="/app/brand/campaigns/create">
              <Button variant="primary" size="md" rightIcon={<ArrowRight className="w-4 h-4 text-[#B7FF3C]" />}>
                Create New Brief
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* 4 Dynamic Computed Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 font-mono">
        {role === "creator" ? (
          <>
            <StatsCard
              title="Escrow In Transit"
              value={formatCurrency(totalEscrowInTransit)}
              subtitle={totalEscrowInTransit > 0 ? "Guaranteed upon delivery" : "No funds currently locked"}
              icon={<ShieldCheck className="w-5 h-5 text-[#111111]" />}
            />
            <StatsCard
              title="Active Campaigns"
              value={String(activeCollabsCount)}
              subtitle={activeCollabsCount > 0 ? `${activeCollabsCount} active deliverables` : "Ready for opportunities"}
              icon={<Clock className="w-5 h-5 text-[#111111]" />}
            />
            <StatsCard
              title="Engagement Rate"
              value={currentCreator?.avgEngagementRate ? `${currentCreator.avgEngagementRate}%` : "Auditing..."}
              subtitle="Social verification active"
              icon={<TrendingUp className="w-5 h-5 text-[#111111]" />}
            />
            <StatsCard
              title="Lifetime Earned"
              value={formatCurrency(lifetimeEarned)}
              subtitle={`Across ${currentCreator?.completedCampaignsCount || collaborations.length || 0} partnerships`}
              icon={<Wallet className="w-5 h-5 text-[#111111]" />}
            />
          </>
        ) : (
          <>
            <StatsCard
              title="Active Escrow Pool"
              value={formatCurrency(totalEscrowInTransit)}
              subtitle={totalEscrowInTransit > 0 ? "Funded in Stripe custody" : "Pre-funded on brief launch"}
              icon={<ShieldCheck className="w-5 h-5 text-[#111111]" />}
            />
            <StatsCard
              title="Live Campaigns"
              value={String(activeCampaigns.filter((c) => c.brandId === currentBrand?.id).length)}
              subtitle="Receiving creator pitches"
              icon={<Sparkles className="w-5 h-5 text-[#111111]" />}
            />
            <StatsCard
              title="Creators In Roster"
              value={String(featuredCreators.length)}
              subtitle="Verified talent roster"
              icon={<Users className="w-5 h-5 text-[#111111]" />}
            />
            <StatsCard
              title="Campaign Budget"
              value={formatCurrency(brandTotalBudget)}
              subtitle="Total brief allocation"
              icon={<Building2 className="w-5 h-5 text-[#111111]" />}
            />
          </>
        )}
      </div>

      {/* Main Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
        {/* Left Column: Campaigns / Pipeline */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base sm:text-lg font-bold text-[#111111] tracking-tight">
              {role === "creator" ? "Your Active Collaborations" : "Your Active Campaign Briefs"}
            </h2>
            <Link
              href={role === "creator" ? "/app/collaborations" : "/app/brand/campaigns"}
              className="text-xs text-[#111111] font-bold hover:underline font-mono"
            >
              View all &rarr;
            </Link>
          </div>

          {collaborations.length === 0 && role === "creator" ? (
            <AnimatedEmptyState
              icon={<Compass className="w-8 h-8" />}
              badgeText="Opportunities Open"
              title="No Active Collaborations Yet"
              description="Browse pre-funded brand briefs and submit your pitch to lock in your first milestone escrow contract."
              actionText="Explore Brand Briefs"
              actionHref="/campaigns"
              secondaryText="Complete Media Kit"
              secondaryHref="/app/profile"
            />
          ) : activeCampaigns.filter((c) => role === "brand" ? c.brandId === currentBrand?.id : true).length === 0 && role === "brand" ? (
            <AnimatedEmptyState
              icon={<FolderPlus className="w-8 h-8" />}
              badgeText="Launch Campaign"
              title="No Campaign Briefs Launched"
              description="Create a brief to receive frame-by-frame pitch applications from verified creators in your category."
              actionText="Create Campaign Brief"
              actionHref="/app/brand/campaigns/create"
              secondaryText="Browse Creator Roster"
              secondaryHref="/app/brand/creators"
            />
          ) : (
            <div className="space-y-4">
              {activeCampaigns.slice(0, 3).map((c) => (
                <div
                  key={c.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] hover:border-[#111111] shadow-xs hover:shadow-editorial transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-5 group"
                >
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] flex items-center justify-center shrink-0 shadow-xs">
                      <BrandIcon name={c.brand?.companyName || "Brand"} size={22} className="text-[#111111]" />
                    </div>

                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-[#111111] text-base group-hover:text-black transition-colors truncate">
                          {c.title}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] text-[10px] font-mono font-bold">
                          {c.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B6B6B] font-sans line-clamp-1">
                        {c.tagline || c.description}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] font-mono text-[#6B6B6B] pt-1">
                        <span>{c.brand?.companyName || "Verified Sponsor"}</span>
                        <span>•</span>
                        <span className="text-[#111111] font-bold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
                          Escrow Locked
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 font-mono pt-2 sm:pt-0 border-t sm:border-t-0 border-[#E7E7E4] justify-between sm:justify-end">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] text-[#6B6B6B] block font-bold">PER CREATOR</span>
                      <span className="text-base font-extrabold text-[#111111]">
                        {formatCurrency(c.budget?.perCreatorBudget || c.budget?.totalBudget || 0)}
                      </span>
                    </div>
                    <Link href={`/campaigns/${c.id}`}>
                      <button className="px-4 py-2.5 rounded-[9px] bg-[#111111] hover:bg-[#262626] text-[#FAFAF8] font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs">
                        <span>View Brief</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Profile Status & Escrow Box */}
        <div className="lg:col-span-4 space-y-6">
          <ProfileCompletenessCard />

          {/* Escrow Trust Assurance Box */}
          <div className="rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs p-6 space-y-4 text-[#111111]">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E7E7E4]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#111111] text-[#B7FF3C] flex items-center justify-center shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#6B6B6B] block">
                    FINANCIAL PROTECTION
                  </span>
                  <h3 className="text-sm font-bold text-[#111111] tracking-tight">
                    Collably Escrow Shield™
                  </h3>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#B7FF3C] text-[#111111] text-[10px] font-mono font-bold">
                100% Protected
              </span>
            </div>

            {/* Reassuring copy */}
            <p className="text-xs text-[#6B6B6B] font-medium leading-relaxed font-sans">
              {role === "creator"
                ? "Every deliverable milestone is pre-funded into secure escrow custody before production begins. Payouts release automatically upon review approval."
                : "Your campaign budget is securely held in milestone escrow and only released to creators when you inspect and approve their submitted deliverables."}
            </p>

            {/* Protection Checkpoints */}
            <div className="space-y-2 pt-1 font-sans">
              <div className="flex items-center gap-2 text-xs text-[#111111] font-medium">
                <div className="w-4 h-4 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-[#111111]" />
                </div>
                <span>Pre-funded upfront custody</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#111111] font-medium">
                <div className="w-4 h-4 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-[#111111]" />
                </div>
                <span>Instant automated disbursement</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#111111] font-medium">
                <div className="w-4 h-4 rounded-full bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3 h-3 text-[#111111]" />
                </div>
                <span>Built-in fair arbitration guarantee</span>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-[#E7E7E4] flex items-center justify-between text-[11px] font-mono text-[#6B6B6B]">
              <span>Custody Provider:</span>
              <span className="text-[#111111] font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" /> Stripe Connect &amp; Razorpay
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
