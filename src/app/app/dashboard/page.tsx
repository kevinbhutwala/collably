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
import { SafeImage } from "@/components/ui/SafeImage";
import { AnimatedEmptyState } from "@/components/ui/AnimatedEmptyState";
import { ProfileCompletenessCard } from "@/components/creators/ProfileCompletenessCard";
import { formatCurrency } from "@/core/utils/formatters";
import {
  Wallet,
  TrendingUp,
  Clock,
  Sparkles,
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
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-brand-accent">
              Active Session
            </span>
            <span className="text-slate-300">•</span>
            <Badge variant="glow" size="sm">
              Role: {role.replace(/_/g, " ").toUpperCase()}
            </Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
            Welcome back, {user?.name || "Collaborator"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 font-sans">
            Here is your live campaign pipeline, escrow balances, and pending actions today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {role === "creator" ? (
            <Link href="/campaigns">
              <Button variant="accent" size="md" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                Find Brand Briefs
              </Button>
            </Link>
          ) : (
            <Link href="/app/brand/campaigns/create">
              <Button variant="accent" size="md" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                Create New Brief
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* 4 Dynamic Computed Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        {role === "creator" ? (
          <>
            <StatsCard
              title="Escrow In Transit"
              value={formatCurrency(totalEscrowInTransit)}
              subtitle={totalEscrowInTransit > 0 ? "Guaranteed upon delivery" : "No funds currently locked"}
              icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
            />
            <StatsCard
              title="Active Campaigns"
              value={String(activeCollabsCount)}
              subtitle={activeCollabsCount > 0 ? `${activeCollabsCount} active deliverables` : "Ready for opportunities"}
              icon={<Clock className="w-5 h-5 text-amber-500" />}
            />
            <StatsCard
              title="Engagement Rate"
              value={currentCreator?.avgEngagementRate ? `${currentCreator.avgEngagementRate}%` : "Auditing..."}
              subtitle="Social verification active"
              icon={<TrendingUp className="w-5 h-5 text-sky-600" />}
            />
            <StatsCard
              title="Lifetime Earned"
              value={formatCurrency(lifetimeEarned)}
              subtitle={`Across ${currentCreator?.completedCampaignsCount || collaborations.length || 0} partnerships`}
              icon={<Wallet className="w-5 h-5 text-purple-600" />}
            />
          </>
        ) : (
          <>
            <StatsCard
              title="Active Escrow Pool"
              value={formatCurrency(totalEscrowInTransit)}
              subtitle={totalEscrowInTransit > 0 ? "Funded in Stripe custody" : "Pre-funded on brief launch"}
              icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
            />
            <StatsCard
              title="Live Campaigns"
              value={String(activeCampaigns.filter((c) => c.brandId === currentBrand?.id).length)}
              subtitle="Receiving creator pitches"
              icon={<Sparkles className="w-5 h-5 text-brand-accent" />}
            />
            <StatsCard
              title="Creators In Roster"
              value={String(featuredCreators.length)}
              subtitle="Verified talent roster"
              icon={<Users className="w-5 h-5 text-sky-600" />}
            />
            <StatsCard
              title="Campaign Budget"
              value={formatCurrency(brandTotalBudget)}
              subtitle="Total brief allocation"
              icon={<Building2 className="w-5 h-5 text-purple-600" />}
            />
          </>
        )}
      </div>

      {/* Main Split Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Campaigns / Pipeline */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 tracking-tight font-display">
              {role === "creator" ? "Your Active Collaborations" : "Your Active Campaign Briefs"}
            </h2>
            <Link
              href={role === "creator" ? "/app/collaborations" : "/app/brand/campaigns"}
              className="text-xs text-brand-accent font-bold hover:underline font-mono"
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
                  className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-card hover:shadow-elevated transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 font-display text-sm sm:text-base">
                        {c.title}
                      </span>
                      <Badge variant="glow" size="sm">
                        {c.category}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 font-sans line-clamp-1">
                      {c.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 font-mono">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block">BUDGET</span>
                      <span className="text-sm font-extrabold text-slate-900">
                        {formatCurrency(c.budget?.totalBudget || 0)}
                      </span>
                    </div>
                    <Link href={`/campaigns/${c.id}`}>
                      <Button variant="outline" size="sm">
                        View Brief
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Profile Status & Quick Info */}
        <div className="lg:col-span-4 space-y-6">
          <ProfileCompletenessCard />

          {/* Escrow Trust Assurance Box */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl space-y-4 font-mono">
            <div className="flex items-center gap-2.5 text-xs text-brand-accent font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>COLLABLY ESCROW SHIELD</span>
            </div>
            <p className="text-xs text-slate-300 font-sans leading-relaxed">
              Every deliverable is pre-funded into Stripe custody before recording begins. Zero payment chasing.
            </p>
            <div className="pt-2 border-t border-slate-800 flex justify-between text-[11px] text-slate-400">
              <span>Custody Provider:</span>
              <span className="text-emerald-400 font-bold">Stripe Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
