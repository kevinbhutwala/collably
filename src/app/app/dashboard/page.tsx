"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { useUIStore } from "@/stores/ui.store";
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
import { CreatorMarketPulseWidget } from "@/components/marketplace/CreatorMarketPulseWidget";
import { BrandMarketIntelligenceWidget } from "@/components/marketplace/BrandMarketIntelligenceWidget";
import { CreativeLoader } from "@/components/ui/CreativeLoader";
import { formatCurrency } from "@/core/utils/formatters";
import { useGlobalCurrency } from "@/core/hooks/useGlobalCurrency";


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
  CheckCircle2,
  HelpCircle,
  X,
  Star,
  Layers,
  FolderGit2,
  BarChart3,
  ChevronRight,
  Send,
} from "lucide-react";

function DashboardContent() {
  const { format } = useGlobalCurrency();
  const { user, role, currentCreator, currentBrand } = useAuthStore();
  const searchParams = useSearchParams();
  const { addToast } = useUIStore();

  useEffect(() => {
    const errorParam = searchParams.get("error");
    if (errorParam === "admin_required") {
      addToast({
        type: "error",
        title: "Access Restricted",
        message: "You must be signed in as an Agency Administrator to view the Admin Command Center.",
      });
    } else if (errorParam === "brand_access_denied") {
      addToast({
        type: "warning",
        title: "Workspace Restricted",
        message: "The requested route is reserved exclusively for Brand partner accounts.",
      });
    }
  }, [searchParams, addToast]);

  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [featuredCreators, setFeaturedCreators] = useState<CreatorProfile[]>([]);
  const [recentPayouts, setRecentPayouts] = useState<PayoutRecord[]>([]);
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showQuickStart, setShowQuickStart] = useState(true);

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
    <div className="space-y-8 text-[#0A0A0E] dark:text-[#F4F4F8] font-sans select-none">
      {/* ── Welcome Banner ── */}
      <div className="rounded-3xl bg-gradient-to-br from-[#FFFDF5] via-white to-[#FFF9E6] dark:from-[#181826] dark:via-[#14141E] dark:to-[#1A1A28] border border-[#FFD21F]/30 dark:border-[#FFD21F]/40 p-5 sm:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD21F]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 relative z-10 max-w-xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[10px] font-mono font-bold text-[#0A0A0E] dark:text-[#FFD21F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-pulse" />
              Live
            </span>
            <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/8 dark:border-white/10 text-[#0A0A0E] dark:text-[#F4F4F8] text-[10px] font-mono font-bold uppercase">
              {role.replace(/_/g, " ")}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display">
            Welcome back, <span className="font-black">{user?.name || "Collaborator"}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4]">
            {role === "creator"
              ? "Here is your hub for active projects, earnings, and open campaigns."
              : "Here is your hub for campaigns, creator discovery, and escrow payments."}
          </p>
        </div>

        {/* Quick Action CTAs */}
        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          {role === "creator" ? (
            <>
              <Link href="/app/campaigns">
                <button className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs border border-black/10">
                  <Compass className="w-3.5 h-3.5 text-[#0A0A0E]" />
                  <span>Find Campaigns</span>
                </button>
              </Link>
              <Link href="/app/profile">
                <button className="px-4 py-2.5 rounded-full bg-white hover:bg-[#F8F8FC] dark:bg-[#1C1C28] dark:hover:bg-[#252535] border border-black/10 dark:border-white/10 text-[#0A0A0E] dark:text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#8A7000] dark:text-[#FFD21F]" />
                  <span>My Media Kit</span>
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link href="/app/brand/campaigns/create">
                <button className="px-4 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs border border-black/10">
                  <FolderPlus className="w-3.5 h-3.5 text-[#0A0A0E]" />
                  <span>Post Campaign</span>
                </button>
              </Link>
              <Link href="/app/brand/creators">
                <button className="px-4 py-2.5 rounded-full bg-white hover:bg-[#F8F8FC] dark:bg-[#1C1C28] dark:hover:bg-[#252535] border border-black/10 dark:border-white/10 text-[#0A0A0E] dark:text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-xs">
                  <Users className="w-3.5 h-3.5 text-[#8A7000] dark:text-[#FFD21F]" />
                  <span>Find Creators</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── Quick Start: How AbeyCollab Works ── */}
      {showQuickStart && (
        <div className="rounded-3xl bg-white dark:bg-[#12121A] border-2 border-[#FFD21F]/50 p-5 sm:p-6 shadow-[0_6px_24px_rgba(255,210,31,0.08)] relative overflow-hidden transition-all">
          <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-black/8 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
              <h2 className="text-sm sm:text-base font-bold text-[#0A0A0E] dark:text-white font-display flex items-center gap-1.5">
                <span>Quick Start Guide</span>
                <span className="text-xs font-mono font-normal text-[#6A6A78] dark:text-[#8E8EA4]">
                  • 3 Simple Steps as a {role === "creator" ? "Creator" : "Brand"}
                </span>
              </h2>
            </div>

            <button
              onClick={() => setShowQuickStart(false)}
              className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#6A6A78] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors text-xs flex items-center gap-1"
              title="Dismiss guide"
            >
              <span className="text-[11px] font-mono hidden sm:inline">Got it, dismiss</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            {role === "creator" ? (
              <>
                <div className="p-4 rounded-2xl bg-[#FFFDF5] dark:bg-[#181826] border border-[#FFD21F]/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white font-display">
                    <span className="w-6 h-6 rounded-full bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center text-xs font-black shrink-0">1</span>
                    <span>Set Up Your Media Kit</span>
                  </div>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                    Add your social links, past content examples, and standard pricing so brands can hire you directly.
                  </p>
                  <Link href="/app/profile" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8A7000] dark:text-[#FFD21F] hover:underline pt-1">
                    Edit Media Kit <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFFDF5] dark:bg-[#181826] border border-[#FFD21F]/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white font-display">
                    <span className="w-6 h-6 rounded-full bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center text-xs font-black shrink-0">2</span>
                    <span>Pitch to Paid Campaigns</span>
                  </div>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                    Browse open brand briefs with guaranteed payments. Send your creative idea and custom quote.
                  </p>
                  <Link href="/app/campaigns" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8A7000] dark:text-[#FFD21F] hover:underline pt-1">
                    Explore Campaigns <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFFDF5] dark:bg-[#181826] border border-[#FFD21F]/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white font-display">
                    <span className="w-6 h-6 rounded-full bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center text-xs font-black shrink-0">3</span>
                    <span>Submit Work &amp; Get Paid</span>
                  </div>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                    Upload your drafts to the project workspace. Once approved, payment is sent with 120-hour automatic protection.
                  </p>
                  <Link href="/app/collaborations" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8A7000] dark:text-[#FFD21F] hover:underline pt-1">
                    My Deals <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="p-4 rounded-2xl bg-[#FFFDF5] dark:bg-[#181826] border border-[#FFD21F]/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white font-display">
                    <span className="w-6 h-6 rounded-full bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center text-xs font-black shrink-0">1</span>
                    <span>Post a Campaign</span>
                  </div>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                    Describe what you need (e.g. YouTube video, Instagram Reel) and set your budget and deadlines.
                  </p>
                  <Link href="/app/brand/campaigns/create" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8A7000] dark:text-[#FFD21F] hover:underline pt-1">
                    Create Campaign <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFFDF5] dark:bg-[#181826] border border-[#FFD21F]/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white font-display">
                    <span className="w-6 h-6 rounded-full bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center text-xs font-black shrink-0">2</span>
                    <span>Find &amp; Save Creators</span>
                  </div>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                    Search vetted creators by topic, follower count, and engagement. Save favorites to your contact list.
                  </p>
                  <Link href="/app/brand/creators" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8A7000] dark:text-[#FFD21F] hover:underline pt-1">
                    Find Creators <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFFDF5] dark:bg-[#181826] border border-[#FFD21F]/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0A0A0E] dark:text-white font-display">
                    <span className="w-6 h-6 rounded-full bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center text-xs font-black shrink-0">3</span>
                    <span>Approve Content &amp; Pay</span>
                  </div>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                    Your budget stays locked and safe in escrow while the creator works. You only release money when satisfied.
                  </p>
                  <Link href="/app/collaborations" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8A7000] dark:text-[#FFD21F] hover:underline pt-1">
                    Review Content <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {role === "creator" ? (
          <>
            <StatsCard
              title="Secured Payments"
              value={format(totalEscrowInTransit, "USD")}
              change={totalEscrowInTransit > 0 ? "Secured" : "—"}
              trend="up"
              subtitle="Held safely in escrow"
              icon={<ShieldCheck className="w-4 h-4 text-[#8A7000]" />}
            />
            <StatsCard
              title="Active Projects"
              value={String(activeCollabsCount)}
              change={activeCollabsCount > 0 ? "Active" : "—"}
              trend="up"
              subtitle="Content in progress"
              icon={<Clock className="w-4 h-4 text-[#0A0A0E]" />}
            />
            <StatsCard
              title="Engagement Rate"
              value={currentCreator?.avgEngagementRate ? `${currentCreator.avgEngagementRate}%` : "—"}
              change={currentCreator?.avgEngagementRate ? "Audited" : "No data"}
              trend="up"
              subtitle="Audience score"
              icon={<TrendingUp className="w-4 h-4 text-[#8A7000]" />}
            />
            <StatsCard
              title="Total Earned"
              value={format(lifetimeEarned, "USD")}
              change={lifetimeEarned > 0 ? "Paid out" : "—"}
              trend="up"
              subtitle="Paid out to date"
              icon={<Wallet className="w-4 h-4 text-[#0A0A0E]" />}
            />
          </>
        ) : (
          <>
            <StatsCard
              title="Protected Budget"
              value={format(brandTotalBudget, "USD")}
              change={brandTotalBudget > 0 ? "Funded" : "—"}
              trend="up"
              subtitle="Locked safely in escrow"
              icon={<ShieldCheck className="w-4 h-4 text-[#8A7000]" />}
            />
            <StatsCard
              title="Creators in Roster"
              value={String(featuredCreators.length)}
              change={featuredCreators.length > 0 ? "Active" : "—"}
              trend="up"
              subtitle="Audited creators available"
              icon={<Users className="w-4 h-4 text-[#0A0A0E]" />}
            />
            <StatsCard
              title="Active Campaigns"
              value={String(activeCampaigns.length)}
              change={activeCampaigns.length > 0 ? "Active" : "—"}
              trend="up"
              subtitle="Sponsorship briefs running"
              icon={<Building2 className="w-4 h-4 text-[#8A7000]" />}
            />
            <StatsCard
              title="Active Deals"
              value={String(activeCollabsCount)}
              change={activeCollabsCount > 0 ? "In progress" : "—"}
              trend="up"
              subtitle="Projects being created now"
              icon={<TrendingUp className="w-4 h-4 text-[#0A0A0E]" />}
            />
          </>
        )}
      </div>

      {/* ── Role-Specific Market Pulse & Pricing Intelligence ── */}
      {role === "creator" ? (
        <CreatorMarketPulseWidget creatorId={currentCreator?.id} />
      ) : (
        <BrandMarketIntelligenceWidget initialCategory={currentBrand?.industry} />
      )}

      {/* ── Subscription Status & Usage Limits Widget ── */}
      <SubscriptionUsageCard />


      {/* ── Main Two-Column Stage ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Column: Active Pipelines & Opportunities */}
        <div className="lg:col-span-8 space-y-6">
          {/* Active Collaborations Pipeline */}
          <div className="rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-5 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
              <div>
                <h2 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">
                  {role === "creator" ? "Active Projects & Content" : "Content Review & Approvals"}
                </h2>
                <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4]">
                  {role === "creator"
                    ? "Track drafts, revisions, and approval progress."
                    : "Review creator submissions and approve payments."}
                </p>
              </div>

              <Link
                href="/app/collaborations"
                className="text-xs font-mono font-bold text-[#0A0A0E] dark:text-[#FFD21F] hover:text-[#8A7000] dark:hover:text-[#FFE052] transition-colors flex items-center gap-1 shrink-0"
              >
                <span>View all ({collaborations.length})</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {isLoading ? (
              <div className="py-8 text-center text-xs font-mono text-[#7A7A8A] dark:text-[#8E8EA4]">
                Loading projects...
              </div>
            ) : collaborations.length === 0 ? (
              <AnimatedEmptyState
                icon={<FolderPlus className="w-7 h-7 text-[#0A0A0E] dark:text-white" />}
                badgeText="Escrow"
                title={role === "creator" ? "No Active Projects Yet" : "No Active Deals Yet"}
                description={
                  role === "creator"
                    ? "Apply to open campaigns to start working with brands."
                    : "Post a campaign or find creators to start collaborating."
                }
                actionText={role === "creator" ? "Find Campaigns" : "Post Campaign"}
                actionHref={role === "creator" ? "/app/campaigns" : "/app/brand/campaigns/create"}
              />
            ) : (
              <div className="space-y-3">
                {collaborations.map((collab) => (
                  <div
                    key={collab.id}
                    className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 hover:border-[#FFD21F] hover:bg-white dark:hover:bg-[#1E1E30] transition-all space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#222234] border border-black/8 dark:border-white/10 flex items-center justify-center shrink-0 shadow-2xs">
                          <BrandIcon
                            name={collab.brand?.companyName || "Linear"}
                            className="w-4 h-4 text-[#0A0A0E] dark:text-white"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-xs sm:text-sm text-[#0A0A0E] dark:text-white line-clamp-1">
                            {collab.campaignTitle}
                          </h3>
                          <p className="text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
                            {collab.brand?.companyName} • {format(collab.totalAgreedBudget, collab.currency || "USD")}
                          </p>
                        </div>
                      </div>

                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase self-start sm:self-auto bg-[#FFD21F]/20 text-[#0A0A0E] dark:text-[#FFD21F] border border-[#FFD21F]/40">
                        {collab.status.replace(/_/g, " ")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/6 dark:border-white/10 text-xs font-mono">
                      <span className="text-[#5A5A68] dark:text-[#8E8EA4] text-[11px]">
                        Draft: <strong className="text-[#0A0A0E] dark:text-white">{collab.deliverables?.[0]?.title || "Draft #1"}</strong>
                      </span>
                      <Link
                        href="/app/collaborations"
                        className="text-[#0A0A0E] dark:text-[#FFD21F] hover:text-[#8A7000] dark:hover:text-[#FFE052] font-bold flex items-center gap-1 transition-colors text-[11px]"
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

          {/* Discovery Section (Adaptive: Briefs for Creators, Talent for Brands) */}
          {role === "creator" ? (
            <div className="rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-5 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
                <div>
                  <h2 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">
                    Open Paid Campaigns
                  </h2>
                  <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4]">
                    Sponsorship briefs with guaranteed payments held in escrow.
                  </p>
                </div>

                <Link
                  href="/app/campaigns"
                  className="text-xs font-mono font-bold text-[#0A0A0E] dark:text-[#FFD21F] hover:text-[#8A7000] dark:hover:text-[#FFE052] transition-colors flex items-center gap-1 shrink-0"
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
                    className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 hover:border-[#FFD21F] hover:bg-white dark:hover:bg-[#1E1E30] transition-all group flex flex-col justify-between space-y-2.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] dark:text-[#FFD21F] text-[10px] font-mono font-bold uppercase border border-[#FFD21F]/30">
                          {c.category}
                        </span>
                        <span className="text-[11px] font-mono text-[#0A0A0E] dark:text-white font-bold">
                          {format(c.budget?.totalBudget ?? 0, c.budget?.currency || "USD")}
                        </span>
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-[#0A0A0E] dark:text-white group-hover:text-[#8A7000] dark:group-hover:text-[#FFD21F] transition-colors line-clamp-1">
                        {c.title}
                      </h3>
                      <p className="text-[11px] text-[#5A5A68] dark:text-[#8E8EA4] line-clamp-1 mt-0.5">
                        {c.tagline}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/6 dark:border-white/10 text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
                      <span>{c.acceptedCount}/{c.maxCreators} filled</span>
                      <span className="text-[#0A0A0E] dark:text-[#FFD21F] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        Apply <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-5 sm:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10">
                <div>
                  <h2 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">
                    Recommended Creators for You
                  </h2>
                  <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4]">
                    Vetted creators matched to your industry and brand niche.
                  </p>
                </div>

                <Link
                  href="/app/brand/creators"
                  className="text-xs font-mono font-bold text-[#0A0A0E] dark:text-[#FFD21F] hover:text-[#8A7000] dark:hover:text-[#FFE052] transition-colors flex items-center gap-1 shrink-0"
                >
                  <span>Explore all ({featuredCreators.length})</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {featuredCreators.slice(0, 4).map((creator) => (
                  <Link
                    key={creator.id}
                    href={`/creators/${creator.id}`}
                    className="p-4 rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 hover:border-[#FFD21F] hover:bg-white dark:hover:bg-[#1E1E30] transition-all group flex flex-col justify-between space-y-2.5"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] dark:text-[#FFD21F] text-[10px] font-mono font-bold uppercase border border-[#FFD21F]/30">
                          {creator.primaryCategory}
                        </span>
                        <span className="text-[11px] font-mono text-[#0A0A0E] dark:text-white font-bold">
                          From {format(creator.startingPrice || 500, (creator as any).currency || "USD")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-white dark:bg-[#222234] border border-black/8 dark:border-white/10 overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs text-[#0A0A0E] dark:text-white shadow-2xs">
                          {creator.avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={creator.avatarUrl} alt={creator.fullName} className="w-full h-full object-cover" />
                          ) : (
                            creator.fullName.charAt(0)
                          )}
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-bold text-xs sm:text-sm text-[#0A0A0E] dark:text-white group-hover:text-[#8A7000] dark:group-hover:text-[#FFD21F] transition-colors truncate">
                            {creator.fullName}
                          </h3>
                          <p className="text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4] truncate">
                            {creator.handle} • {((creator.totalFollowers || 0) / 1000).toFixed(0)}k reach
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/6 dark:border-white/10 text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
                      <span>{creator.avgEngagementRate}% avg engagement</span>
                      <span className="text-[#0A0A0E] dark:text-[#FFD21F] font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        Profile <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Profile & Financial Ledger */}
        <div className="lg:col-span-4 space-y-6">
          {role === "creator" ? (
            <ProfileCompletenessCard />
          ) : (
            <div className="rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4">
              <div className="flex items-center justify-between pb-2.5 border-b border-black/8 dark:border-white/10">
                <div>
                  <h3 className="text-sm font-bold text-[#0A0A0E] dark:text-white font-display">
                    Brand Quick Actions
                  </h3>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#8E8EA4]">
                    Fast shortcuts to manage your campaigns
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 text-[#0A0A0E] dark:text-[#FFD21F] text-[10px] font-mono font-bold">
                  {currentBrand?.companyName || "Brand"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                <Link
                  href="/app/brand/campaigns/create"
                  className="p-3 rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 hover:border-[#FFD21F] hover:bg-white dark:hover:bg-[#1E1E30] transition-all flex flex-col items-center text-center gap-1.5"
                >
                  <FolderPlus className="w-5 h-5 text-[#8A7000] dark:text-[#FFD21F]" />
                  <span className="font-bold text-[#0A0A0E] dark:text-white text-[11px]">Post Campaign</span>
                </Link>
                <Link
                  href="/app/brand/creators"
                  className="p-3 rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 hover:border-[#FFD21F] hover:bg-white dark:hover:bg-[#1E1E30] transition-all flex flex-col items-center text-center gap-1.5"
                >
                  <Users className="w-5 h-5 text-[#0A0A0E] dark:text-white" />
                  <span className="font-bold text-[#0A0A0E] dark:text-white text-[11px]">Find Creators</span>
                </Link>
                <Link
                  href="/app/brand/crm"
                  className="p-3 rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 hover:border-[#FFD21F] hover:bg-white dark:hover:bg-[#1E1E30] transition-all flex flex-col items-center text-center gap-1.5"
                >
                  <FolderGit2 className="w-5 h-5 text-[#0A0A0E] dark:text-white" />
                  <span className="font-bold text-[#0A0A0E] dark:text-white text-[11px]">Saved Contacts</span>
                </Link>
                <Link
                  href="/app/brand/shortlists"
                  className="p-3 rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 hover:border-[#FFD21F] hover:bg-white dark:hover:bg-[#1E1E30] transition-all flex flex-col items-center text-center gap-1.5"
                >
                  <Layers className="w-5 h-5 text-[#8A7000] dark:text-[#FFD21F]" />
                  <span className="font-bold text-[#0A0A0E] dark:text-white text-[11px]">Shortlisted Talent</span>
                </Link>
              </div>
            </div>
          )}

          {/* Quick Payout / Escrow Activity Ledger */}
          <div className="rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3.5">
            <div className="flex items-center justify-between pb-2.5 border-b border-black/8 dark:border-white/10">
              <h3 className="text-sm font-bold text-[#0A0A0E] dark:text-white font-display">
                {role === "creator" ? "Recent Payouts" : "Recent Escrow Payments"}
              </h3>
              <Link
                href={role === "creator" ? "/app/earnings" : "/app/collaborations"}
                className="text-[11px] font-mono text-[#0A0A0E] dark:text-[#FFD21F] hover:text-[#8A7000] dark:hover:text-[#FFE052] font-bold"
              >
                View all
              </Link>
            </div>

            {recentPayouts.length === 0 ? (
              <p className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] font-mono py-3 text-center">
                No recent transactions.
              </p>
            ) : (
              <div className="divide-y divide-black/5 dark:divide-white/5 font-mono text-xs">
                {recentPayouts.slice(0, 3).map((p) => (
                  <div key={p.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#0A0A0E] dark:text-white block truncate max-w-[130px] font-sans text-xs">
                        {p.campaignTitle}
                      </span>
                      <span className="text-[10px] text-[#6A6A78] dark:text-[#8E8EA4]">{p.brandName}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#0A0A0E] dark:text-white block text-xs">
                        {role === "creator" ? `+${format(p.netAmount, (p as any).currency || "USD")}` : format(p.netAmount, (p as any).currency || "USD")}
                      </span>
                      <span className="text-[9px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold">{p.status}</span>
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

export default function DashboardPage() {
  return (
    <Suspense fallback={<CreativeLoader size="lg" label="Loading Workspace" />}>
      <DashboardContent />
    </Suspense>
  );
}
