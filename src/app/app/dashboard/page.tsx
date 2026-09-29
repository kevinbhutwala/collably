"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
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
import { ProfileCompletionBanner } from "@/components/dashboard/ProfileCompletionBanner";
import { SubscriptionUsageCard } from "@/components/subscriptions/SubscriptionUsageCard";
import { CreatorMarketPulseWidget } from "@/components/marketplace/CreatorMarketPulseWidget";
import { BrandMarketIntelligenceWidget } from "@/components/marketplace/BrandMarketIntelligenceWidget";
import { CreativeLoader } from "@/components/ui/CreativeLoader";
import { DashboardSkeleton } from "@/components/skeletons";
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
  FileCheck2,
  Clapperboard,
  Lock,
  AlertTriangle,
} from "lucide-react";
import { checkCreatorProfileStatus } from "@/core/utils/profileCompleteness";

function DashboardContent() {
  const { format, currency: userCurrency, convert } = useGlobalCurrency();
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
  const [showQuickStart, setShowQuickStart] = useState(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("abeycollab_quickstart_dismissed");
      if (!dismissed) {
        setShowQuickStart(true);
      }
    }
  }, []);

  const handleDismissQuickStart = () => {
    setShowQuickStart(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("abeycollab_quickstart_dismissed", "true");
    }
  };

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      // Only show full loading skeleton on initial mount when no data is present yet
      if (!hasLoadedRef.current) {
        setIsLoading(true);
      }
      try {
        const [camps, creators, payouts, collabs] = await Promise.all([
          campaignService.getCampaigns(),
          creatorService.getCreators(),
          paymentService.getPayouts(role === "creator" ? currentCreator?.id : undefined),
          collaborationService.getCollaborations(
            role === "creator" ? "creator" : "brand",
            role === "creator" ? currentCreator?.id : currentBrand?.id
          ),
        ]);

        if (!isCancelled) {
          setActiveCampaigns(camps || []);
          setFeaturedCreators(creators || []);
          setRecentPayouts(payouts || []);
          setCollaborations(collabs || []);
          hasLoadedRef.current = true;
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };
    fetchData();
    return () => {
      isCancelled = true;
    };
  }, [role, currentCreator?.id, currentBrand?.id]);

  // Compute dynamic stats from actual state normalized to active display currency
  const totalEscrowInTransit = collaborations.reduce(
    (acc, c) => acc + convert(c.totalAgreedBudget || 0, (c as any).currency || "USD"),
    0
  );
  const activeCollabsCount = collaborations.filter(
    (c) =>
      c.status === "work_in_progress" ||
      c.status === "submitted_for_review" ||
      c.status === "payment_secured" ||
      c.status === "revision_requested" ||
      (c.status as string) === "active" ||
      (c.status as string) === "in_production" ||
      (c.status as string) === "in_review"
  ).length;
  const lifetimeEarned = role === "creator"
    ? recentPayouts.reduce(
        (acc, p) => acc + convert(p.netAmount || 0, (p as any).currency || "USD"),
        0
      )
    : 0;
  const brandCampaigns = activeCampaigns.filter(
    (c) => c.brandId === currentBrand?.id || c.brand?.companyName?.toLowerCase() === currentBrand?.companyName?.toLowerCase()
  );
  const brandTotalBudget = brandCampaigns.reduce(
    (acc, c) => acc + convert(c.budget?.totalBudget || 0, c.budget?.currency || "USD"),
    0
  ) || convert(currentBrand?.totalSpent || 350000, "USD");

  const profileStatus = checkCreatorProfileStatus(currentCreator);

  return (
    <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-[#0B0A14] dark:text-[#F4F4F8] font-sans select-none">
      {/* ── Welcome Banner ── */}
      <div className="rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/5 via-white to-primary/10 dark:from-[#161622] dark:via-[#12121A] dark:to-[#181824] border border-primary/30 dark:border-white/10 p-4 sm:p-6 lg:p-7 shadow-[0_10px_30px_rgba(0,0,0,0.04)] relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-5">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/15 dark:bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 relative z-10 max-w-xl">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-primary/20 border border-primary/40 text-[10px] font-mono font-bold text-primary dark:text-accent dark:text-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Live
            </span>
            <span className="px-2 py-0.5 rounded-full bg-black/5 dark:bg-white/10 border border-black/8 dark:border-white/10 text-[#0B0A14] dark:text-[#F4F4F8] text-[10px] font-mono font-bold uppercase">
              {role.replace(/_/g, " ")}
            </span>

            {/* Profile Confirmation & Status Pill */}
            {role === "creator" && (
              <Link
                href="/app/profile"
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold transition-all border ${
                  profileStatus.canApplyToCampaigns
                    ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/25"
                    : "bg-amber-500/12 border-amber-500/30 text-amber-900 dark:text-amber-200 hover:bg-amber-500/20"
                }`}
                title={
                  profileStatus.canApplyToCampaigns
                    ? "Profile is confirmed and verified. You can apply for open campaigns."
                    : "Profile setup in progress. Complete details to unlock 1-click pitches."
                }
              >
                {profileStatus.canApplyToCampaigns ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <span className="hidden sm:inline">Profile Verified (100%) • Ready to Pitch</span>
                    <span className="sm:hidden">Verified (100%)</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3 text-amber-500 dark:text-amber-300 shrink-0" />
                    <span className="hidden sm:inline">{profileStatus.score}% Setup • Unlock 1-Click Pitches</span>
                    <span className="sm:hidden">{profileStatus.score}% Setup • Tap to Finish</span>
                  </>
                )}
              </Link>
            )}
          </div>

          <h1 className="text-lg sm:text-2xl font-extrabold text-[#0B0A14] dark:text-white tracking-tight font-display">
            Welcome back, <span className="font-black">{user?.name || "Collaborator"}</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4]">
            {role === "creator"
              ? profileStatus.canApplyToCampaigns
                ? "Here is your hub for active projects, earnings, and open campaigns."
                : "Explore open brand briefs and complete verification to pitch directly."
              : "Here is your hub for campaigns, creator discovery, and escrow payments."}
          </p>
        </div>

        {/* Quick Action CTAs */}
        <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 relative z-10 w-full sm:w-auto">
          {role === "creator" ? (
            profileStatus.canApplyToCampaigns ? (
              <>
                <Link href="/app/campaigns" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs border border-black/10 cursor-pointer">
                    <Compass className="w-3.5 h-3.5 text-[#0B0A14] shrink-0" />
                    <span className="truncate">Find Campaigns</span>
                  </button>
                </Link>
                <Link href="/app/profile" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-4 py-2 sm:py-2.5 rounded-full bg-white hover:bg-[#F8F8FC] dark:bg-[#1C1C28] dark:hover:bg-[#252535] border border-black/10 dark:border-white/10 text-[#0B0A14] dark:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer">
                    <Sparkles className="w-3.5 h-3.5 text-[#0B0A14] dark:text-accent shrink-0" />
                    <span className="truncate">My Media Kit</span>
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link href="/app/campaigns" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-extrabold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs border border-black/10 cursor-pointer">
                    <Compass className="w-3.5 h-3.5 text-[#0B0A14] shrink-0" />
                    <span className="truncate">Browse Briefs</span>
                  </button>
                </Link>
                <Link href="/app/profile" className="w-full sm:w-auto">
                  <button className="w-full sm:w-auto px-4 py-2 sm:py-2.5 rounded-full bg-white hover:bg-[#F8F8FC] dark:bg-[#1C1C28] dark:hover:bg-[#252535] border border-black/10 dark:border-white/10 text-[#0B0A14] dark:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer">
                    <Sparkles className="w-3.5 h-3.5 text-[#0B0A14] dark:text-accent shrink-0" />
                    <span className="truncate">Finish Setup ({profileStatus.score}%)</span>
                  </button>
                </Link>
              </>
            )
          ) : (
            <>
              <Link href="/app/brand/campaigns/create" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-4 py-2 sm:py-2.5 rounded-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs border border-black/10">
                  <FolderPlus className="w-3.5 h-3.5 text-[#0B0A14] shrink-0" />
                  <span className="truncate">Post Campaign</span>
                </button>
              </Link>
              <Link href="/app/brand/creators" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-4 py-2 sm:py-2.5 rounded-full bg-white hover:bg-[#F8F8FC] dark:bg-[#1C1C28] dark:hover:bg-[#252535] border border-black/10 dark:border-white/10 text-[#0B0A14] dark:text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs">
                  <Users className="w-3.5 h-3.5 text-[#0B0A14] dark:text-accent shrink-0" />
                  <span className="truncate">Find Creators</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ── Creator Profile Incomplete Warning Banner ── */}
      {role === "creator" && (
        <ProfileCompletionBanner creator={currentCreator || undefined} />
      )}

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {role === "creator" ? (
          <>
            <StatsCard
              title="Secured Payments"
              value={format(totalEscrowInTransit, "INR")}
              change={totalEscrowInTransit > 0 ? "Secured" : "—"}
              trend="up"
              subtitle="Held safely in escrow"
              icon={<ShieldCheck className="w-4 h-4 text-emerald-600" />}
            />
            <StatsCard
              title="Active Projects"
              value={String(activeCollabsCount)}
              change={activeCollabsCount > 0 ? "Active" : "—"}
              trend="up"
              subtitle="Content in progress"
              icon={<FileCheck2 className="w-4 h-4 text-[#0B0A14] dark:text-accent" />}
            />
            <StatsCard
              title="Engagement Rate"
              value={currentCreator?.avgEngagementRate ? `${currentCreator.avgEngagementRate}%` : "—"}
              change={currentCreator?.avgEngagementRate ? "Audited" : "No data"}
              trend="up"
              subtitle="Audience score"
              icon={<TrendingUp className="w-4 h-4 text-amber-600" />}
            />
            <StatsCard
              title="Total Earned"
              value={format(lifetimeEarned, "INR")}
              change={lifetimeEarned > 0 ? "Paid out" : "—"}
              trend="up"
              subtitle="Paid out to date"
              icon={<Wallet className="w-4 h-4 text-[#0B0A14] dark:text-white" />}
            />
          </>
        ) : (
          <>
            <StatsCard
              title="Protected Escrow"
              value={format(brandTotalBudget, "INR")}
              change={brandTotalBudget > 0 ? "100% Funded" : "—"}
              trend="up"
              subtitle="Locked safely in vault"
              icon={<ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
            />
            <StatsCard
              title="Creators in Roster"
              value={String(featuredCreators.length)}
              change={featuredCreators.length > 0 ? "Audited" : "—"}
              trend="up"
              subtitle="Verified talent ready"
              icon={<Users className="w-4 h-4 text-[#0B0A14] dark:text-white" />}
            />
            <StatsCard
              title="Active Campaigns"
              value={String(brandCampaigns.length > 0 ? brandCampaigns.length : 2)}
              change="Live Briefs"
              trend="up"
              subtitle="Sponsorship campaigns"
              icon={<Building2 className="w-4 h-4 text-[#0B0A14] dark:text-accent" />}
            />
            <StatsCard
              title="Active Deals"
              value={String(activeCollabsCount > 0 ? activeCollabsCount : 1)}
              change="In Production"
              trend="up"
              subtitle="Deliverables in flight"
              icon={<TrendingUp className="w-4 h-4 text-[#0B0A14] dark:text-white" />}
            />
          </>
        )}
      </div>

      {/* ── Quick Start: How AbeyCollab Works ── */}
      {showQuickStart && (
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-primary/40 dark:border-white/10 p-4 sm:p-6 shadow-[0_6px_24px_rgba(0,0,0,0.06)] relative overflow-hidden transition-all">
          <div className="flex items-center justify-between gap-3 pb-3 border-b border-black/8 dark:border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <h2 className="text-xs sm:text-base font-bold text-[#0B0A14] dark:text-white font-display flex items-center gap-1.5">
                <span>Quick Start Guide</span>
                <span className="text-[11px] font-mono font-normal text-[#6A6A78] dark:text-[#8E8EA4] hidden sm:inline">
                  • 3 Simple Steps as a {role === "creator" ? "Creator" : "Brand"}
                </span>
              </h2>
            </div>

            <button
              onClick={handleDismissQuickStart}
              className="p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-[#6A6A78] dark:text-[#8E8EA4] hover:text-[#0B0A14] dark:hover:text-white transition-colors text-xs flex items-center gap-1 cursor-pointer"
              title="Dismiss guide"
            >
              <span className="text-[11px] font-mono hidden sm:inline">Got it, dismiss</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex md:grid md:grid-cols-3 gap-2.5 sm:gap-3 pt-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-none">
            {role === "creator" ? (
              <>
                <div className="min-w-[240px] sm:min-w-0 snap-center flex-1 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/[0.07] dark:border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-white flex items-center justify-center text-[11px] sm:text-xs font-black shrink-0">1</span>
                    <span>Set Up Your Media Kit</span>
                  </div>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                    Add social links, past examples, and standard pricing so brands hire you directly.
                  </p>
                  <Link href="/app/profile" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B0A14] dark:text-accent hover:text-amber-600 dark:hover:text-accent pt-1 transition-colors">
                    Edit Media Kit <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="min-w-[240px] sm:min-w-0 snap-center flex-1 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/[0.07] dark:border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-white flex items-center justify-center text-[11px] sm:text-xs font-black shrink-0">2</span>
                    <span>Pitch to Paid Campaigns</span>
                  </div>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                    Browse open brand briefs with guaranteed payments. Send your creative idea and quote.
                  </p>
                  <Link href="/app/campaigns" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B0A14] dark:text-accent hover:text-amber-600 dark:hover:text-accent pt-1 transition-colors">
                    Explore Campaigns <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="min-w-[240px] sm:min-w-0 snap-center flex-1 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/[0.07] dark:border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-white flex items-center justify-center text-[11px] sm:text-xs font-black shrink-0">3</span>
                    <span>Submit Work &amp; Get Paid</span>
                  </div>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                    Upload drafts to workspace. Once approved, payment releases with 24-hour protection.
                  </p>
                  <Link href="/app/collaborations" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B0A14] dark:text-accent hover:text-amber-600 dark:hover:text-accent pt-1 transition-colors">
                    My Deals <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="min-w-[240px] sm:min-w-0 snap-center flex-1 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/[0.07] dark:border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-white flex items-center justify-center text-[11px] sm:text-xs font-black shrink-0">1</span>
                    <span>Post a Campaign</span>
                  </div>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                    Describe requirements (Reels, Videos) and set budgets and deadlines.
                  </p>
                  <Link href="/app/brand/campaigns/create" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B0A14] dark:text-accent hover:text-amber-600 dark:hover:text-accent pt-1 transition-colors">
                    Create Campaign <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="min-w-[240px] sm:min-w-0 snap-center flex-1 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/[0.07] dark:border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-white flex items-center justify-center text-[11px] sm:text-xs font-black shrink-0">2</span>
                    <span>Find &amp; Save Creators</span>
                  </div>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                    Search vetted creators by niche, reach, and engagement. Save to roster.
                  </p>
                  <Link href="/app/brand/creators" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B0A14] dark:text-accent hover:text-amber-600 dark:hover:text-accent pt-1 transition-colors">
                    Find Creators <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="min-w-[240px] sm:min-w-0 snap-center flex-1 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/[0.07] dark:border-white/10 space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0B0A14] dark:text-white font-display">
                    <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-primary text-white flex items-center justify-center text-[11px] sm:text-xs font-black shrink-0">3</span>
                    <span>Approve &amp; Release Pay</span>
                  </div>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                    Funds stay locked in escrow until you approve the creator deliverable.
                  </p>
                  <Link href="/app/collaborations" className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0B0A14] dark:text-accent hover:text-amber-600 dark:hover:text-accent pt-1 transition-colors">
                    Review Content <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}

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
        <div className="lg:col-span-8 space-y-4 sm:space-y-6">
          {/* Active Collaborations Pipeline */}
          <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-4 sm:p-6 lg:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4 sm:space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10 gap-2">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-primary/15 dark:bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <FileCheck2 className="w-4 h-4 text-[#0B0A14] dark:text-accent" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-bold text-[#0B0A14] dark:text-white font-display truncate">
                    {role === "creator" ? "Active Projects & Content" : "Content Review & Approvals"}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#5A5A68] dark:text-[#8E8EA4] truncate">
                    {role === "creator"
                      ? "Track drafts, revisions, and approval progress."
                      : "Review creator submissions and approve payments."}
                  </p>
                </div>
              </div>

              <Link
                href="/app/collaborations"
                className="text-xs font-mono font-bold text-[#0B0A14] dark:text-accent hover:text-amber-600 dark:hover:text-accent transition-colors flex items-center gap-1 shrink-0"
              >
                <span className="hidden sm:inline">View all ({collaborations.length})</span>
                <span className="sm:hidden">All ({collaborations.length})</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {isLoading ? (
              <div className="space-y-2.5 sm:space-y-3">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 animate-pulse space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-black/6 dark:bg-white/10 shrink-0" />
                        <div className="space-y-1.5">
                          <div className="w-32 sm:w-48 h-3.5 rounded bg-black/6 dark:bg-white/10" />
                          <div className="w-24 sm:w-36 h-2.5 rounded bg-black/6 dark:bg-white/10" />
                        </div>
                      </div>
                      <div className="w-16 h-5 rounded-full bg-black/6 dark:bg-white/10 shrink-0" />
                    </div>
                    <div className="pt-2 border-t border-black/6 dark:border-white/10 flex items-center justify-between">
                      <div className="w-28 h-2.5 rounded bg-black/6 dark:bg-white/10" />
                      <div className="w-16 h-2.5 rounded bg-black/6 dark:bg-white/10" />
                    </div>
                  </div>
                ))}
              </div>
            ) : collaborations.length === 0 ? (
              <AnimatedEmptyState
                icon={<FolderPlus className="w-7 h-7 text-[#0B0A14] dark:text-white" />}
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
              <div className="space-y-2.5 sm:space-y-3">
                {collaborations.map((collab) => (
                  <div
                    key={collab.id}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 hover:border-primary hover:bg-white dark:hover:bg-[#1E1E30] transition-all space-y-2"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white dark:bg-[#222234] border border-black/8 dark:border-white/10 flex items-center justify-center shrink-0 shadow-2xs overflow-hidden">
                          {role === "brand" ? (
                            collab.creator?.avatarUrl ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={collab.creator.avatarUrl} alt={collab.creator.fullName || "Creator"} className="w-full h-full object-cover" />
                            ) : (
                              <Users className="w-4 h-4 text-[#0B0A14] dark:text-accent" />
                            )
                          ) : (
                            <BrandIcon
                              name={collab.brand?.companyName || "Linear"}
                              className="w-4 h-4 text-[#0B0A14] dark:text-white"
                            />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-xs sm:text-sm text-[#0B0A14] dark:text-white truncate">
                            {collab.campaignTitle}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4] truncate">
                            {role === "brand" ? (collab.creator?.fullName || "Assigned Creator") : collab.brand?.companyName} • {format(collab.totalAgreedBudget, collab.currency || "INR")}
                          </p>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] font-mono font-bold uppercase shrink-0 bg-primary/20 text-primary dark:text-accent dark:text-accent border border-primary/40">
                        {collab.status.replace(/_/g, " ")}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-black/6 dark:border-white/10 text-xs font-mono gap-2">
                      <span className="text-[#5A5A68] dark:text-[#8E8EA4] text-[10px] sm:text-[11px] flex items-center gap-1.5 min-w-0">
                        <Clapperboard className="w-3.5 h-3.5 text-[#0B0A14] dark:text-accent shrink-0" />
                        <span className="truncate">Content: <strong className="text-[#0B0A14] dark:text-white">{collab.deliverables?.[0]?.title || "Draft #1"}</strong></span>
                      </span>
                      <Link
                        href="/app/collaborations"
                        className="text-[#0B0A14] dark:text-accent hover:text-amber-600 dark:hover:text-accent font-bold flex items-center gap-1 transition-colors text-[10px] sm:text-[11px] shrink-0"
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
            <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-4 sm:p-6 lg:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10 gap-2">
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-bold text-[#0B0A14] dark:text-white font-display truncate">
                    Open Paid Campaigns
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#5A5A68] dark:text-[#8E8EA4] truncate">
                    Sponsorship briefs with guaranteed payments in escrow.
                  </p>
                </div>

                <Link
                  href="/app/campaigns"
                  className="text-xs font-mono font-bold text-[#0B0A14] dark:text-accent hover:text-amber-600 dark:hover:text-accent transition-colors flex items-center gap-1 shrink-0"
                >
                  <span className="hidden sm:inline">View all ({activeCampaigns.length})</span>
                  <span className="sm:hidden">All ({activeCampaigns.length})</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                {activeCampaigns.slice(0, 4).map((c) => (
                  <Link
                    key={c.id}
                    href={`/campaigns/${c.id}`}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 hover:border-primary hover:bg-white dark:hover:bg-[#1E1E30] transition-all group flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5 gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary dark:text-accent dark:text-accent text-[9.5px] sm:text-[10px] font-mono font-bold uppercase border border-primary/30 truncate">
                          {c.category}
                        </span>
                        <span className="text-[11px] font-mono text-[#0B0A14] dark:text-white font-bold shrink-0">
                          {format(c.budget?.totalBudget ?? 0, c.budget?.currency || "INR")}
                        </span>
                      </div>
                      <h3 className="font-bold text-xs sm:text-sm text-[#0B0A14] dark:text-white group-hover:text-amber-600 dark:group-hover:text-accent transition-colors line-clamp-1">
                        {c.title}
                      </h3>
                      <p className="text-[11px] text-[#5A5A68] dark:text-[#8E8EA4] line-clamp-1 mt-0.5">
                        {c.tagline}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-black/6 dark:border-white/10 text-[10.5px] sm:text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
                      <span>{c.acceptedCount}/{c.maxCreators} filled</span>
                      <span className="text-[#0B0A14] dark:text-accent font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
                        Apply <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-4 sm:p-6 lg:p-7 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-4 sm:space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-black/8 dark:border-white/10 gap-2">
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-bold text-[#0B0A14] dark:text-white font-display truncate">
                    Recommended Creators for You
                  </h2>
                  <p className="text-[11px] sm:text-xs text-[#5A5A68] dark:text-[#8E8EA4] truncate">
                    Vetted creators matched to your industry and brand niche.
                  </p>
                </div>

                <Link
                  href="/app/brand/creators"
                  className="text-xs font-mono font-bold text-[#0B0A14] dark:text-accent hover:text-amber-600 dark:hover:text-accent transition-colors flex items-center gap-1 shrink-0"
                >
                  <span className="hidden sm:inline">Explore all ({featuredCreators.length})</span>
                  <span className="sm:hidden">All ({featuredCreators.length})</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                {featuredCreators.slice(0, 4).map((creator) => (
                  <Link
                    key={creator.id}
                    href={`/creators/${creator.id}`}
                    className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 hover:border-primary hover:bg-white dark:hover:bg-[#1E1E30] transition-all group flex flex-col justify-between space-y-2"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary dark:text-accent dark:text-accent text-[9.5px] sm:text-[10px] font-mono font-bold uppercase border border-primary/30 truncate">
                          {creator.primaryCategory}
                        </span>
                        <span className="text-[11px] font-mono text-[#0B0A14] dark:text-white font-bold shrink-0">
                          From {format(creator.startingPrice || 500, (creator as any).currency || "INR")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white dark:bg-[#222234] border border-black/8 dark:border-white/10 overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs text-[#0B0A14] dark:text-white shadow-2xs">
                          {creator.avatarUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={creator.avatarUrl} alt={creator.fullName} className="w-full h-full object-cover" />
                          ) : (
                            creator.fullName.charAt(0)
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-xs sm:text-sm text-[#0B0A14] dark:text-white group-hover:text-amber-600 dark:group-hover:text-accent transition-colors truncate">
                            {creator.fullName}
                          </h3>
                          <p className="text-[10px] sm:text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4] truncate">
                            {creator.handle} • {((creator.totalFollowers || 0) / 1000).toFixed(0)}k reach
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1.5 sm:pt-2 border-t border-black/6 dark:border-white/10 text-[10.5px] sm:text-[11px] font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
                      <span>{creator.avgEngagementRate}% engagement</span>
                      <span className="text-[#0B0A14] dark:text-accent font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-0.5">
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
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          {role === "creator" ? (
            <ProfileCompletenessCard creator={currentCreator || undefined} />
          ) : (
            <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3.5 sm:space-y-4">
              <div className="flex items-center justify-between pb-2.5 border-b border-black/8 dark:border-white/10 gap-2">
                <div className="min-w-0">
                  <h3 className="text-sm font-bold text-[#0B0A14] dark:text-white font-display truncate">
                    Brand Quick Actions
                  </h3>
                  <p className="text-[11px] text-[#5A5A68] dark:text-[#8E8EA4] truncate">
                    Shortcuts to manage campaigns
                  </p>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary dark:text-accent dark:text-accent text-[10px] font-mono font-bold shrink-0 truncate max-w-[120px]">
                  {currentBrand?.companyName || "Brand"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-medium">
                <Link
                  href="/app/brand/campaigns/create"
                  className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 hover:border-primary hover:bg-white dark:hover:bg-[#1E1E30] transition-all flex flex-col items-center text-center gap-1.5"
                >
                  <FolderPlus className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B0A14] dark:text-accent" />
                  <span className="font-bold text-[#0B0A14] dark:text-white text-[11px]">Post Campaign</span>
                </Link>
                <Link
                  href="/app/brand/creators"
                  className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 hover:border-primary hover:bg-white dark:hover:bg-[#1E1E30] transition-all flex flex-col items-center text-center gap-1.5"
                >
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B0A14] dark:text-white" />
                  <span className="font-bold text-[#0B0A14] dark:text-white text-[11px]">Find Creators</span>
                </Link>
                <Link
                  href="/app/brand/crm"
                  className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 hover:border-primary hover:bg-white dark:hover:bg-[#1E1E30] transition-all flex flex-col items-center text-center gap-1.5"
                >
                  <FolderGit2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B0A14] dark:text-white" />
                  <span className="font-bold text-[#0B0A14] dark:text-white text-[11px]">Contacts</span>
                </Link>
                <Link
                  href="/app/brand/shortlists"
                  className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[#F8F8FC] dark:bg-[#181826] border border-black/6 dark:border-white/10 hover:border-primary hover:bg-white dark:hover:bg-[#1E1E30] transition-all flex flex-col items-center text-center gap-1.5"
                >
                  <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B0A14] dark:text-accent" />
                  <span className="font-bold text-[#0B0A14] dark:text-white text-[11px]">Shortlists</span>
                </Link>
              </div>
            </div>
          )}

          {/* Quick Payout / Escrow Activity Ledger */}
          <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-4 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)] space-y-3 sm:space-y-3.5">
            <div className="flex items-center justify-between pb-2.5 border-b border-black/8 dark:border-white/10">
              <h3 className="text-sm font-bold text-[#0B0A14] dark:text-white font-display">
                {role === "creator" ? "Recent Payouts" : "Recent Escrow Payments"}
              </h3>
              <Link
                href={role === "creator" ? "/app/earnings" : "/app/collaborations"}
                className="text-[11px] font-mono text-[#0B0A14] dark:text-accent hover:text-amber-600 dark:hover:text-accent font-bold"
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
                  <div key={p.id} className="py-2.5 flex items-center justify-between gap-2.5">
                    <div className="min-w-0 flex-1">
                      <span className="font-bold text-[#0B0A14] dark:text-white block truncate font-sans text-xs">
                        {p.campaignTitle}
                      </span>
                      <span className="text-[10px] text-[#6A6A78] dark:text-[#8E8EA4] block truncate">{p.brandName}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-[#0B0A14] dark:text-white block text-xs">
                        {role === "creator" ? `+${format(p.netAmount, (p as any).currency || "INR")}` : format(p.netAmount, (p as any).currency || "INR")}
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
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}
