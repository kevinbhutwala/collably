"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import { campaignService } from "@/services/campaign.service";
import { creatorService } from "@/services/creator.service";
import { paymentService } from "@/services/payment.service";
import { Campaign, CreatorProfile, PayoutRecord } from "@/core/types";
import { StatsCard } from "@/components/ui/StatsCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { ProfileCompletenessCard } from "@/components/creators/ProfileCompletenessCard";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
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
  Bell,
} from "lucide-react";

export default function DashboardPage() {
  const { user, role, currentCreator, currentBrand } = useAuthStore();
  const [activeCampaigns, setActiveCampaigns] = useState<Campaign[]>([]);
  const [featuredCreators, setFeaturedCreators] = useState<CreatorProfile[]>([]);
  const [recentPayouts, setRecentPayouts] = useState<PayoutRecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const camps = await campaignService.getCampaigns();
      setActiveCampaigns(camps.slice(0, 3));

      const creators = await creatorService.getCreators();
      setFeaturedCreators(creators.slice(0, 3));

      const payouts = await paymentService.getPayouts();
      setRecentPayouts(payouts.slice(0, 3));
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-10">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-brand-accent">
              Live Session
            </span>
            <span className="text-slate-300">•</span>
            <Badge variant="glow" size="sm">Role: {role.replace(/_/g, " ").toUpperCase()}</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Welcome back, {user?.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
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

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-mono">
        {role === "creator" ? (
          <>
            <StatsCard
              title="Escrow In Transit"
              value={formatCurrency(6300)}
              change="+$2,200 this week"
              subtitle="Guaranteed upon delivery"
              icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
            />
            <StatsCard
              title="Active Campaigns"
              value="3"
              subtitle="2 videos due this week"
              icon={<Clock className="w-5 h-5 text-amber-500" />}
            />
            <StatsCard
              title="Avg Engagement Rate"
              value={`${currentCreator?.avgEngagementRate || 6.4}%`}
              change="+0.8% MoM"
              subtitle="Top 5% in category"
              icon={<TrendingUp className="w-5 h-5 text-sky-600" />}
            />
            <StatsCard
              title="Lifetime Earned"
              value={formatCurrency(48500)}
              subtitle="Across 42 partnerships"
              icon={<Wallet className="w-5 h-5 text-purple-600" />}
            />
          </>
        ) : (
          <>
            <StatsCard
              title="Active Escrow Pool"
              value={formatCurrency(45000)}
              subtitle="Secured for creators"
              icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />}
            />
            <StatsCard
              title="Active Campaigns"
              value={currentBrand?.activeCampaignsCount.toString() || "3"}
              subtitle="12 creators assigned"
              icon={<Building2 className="w-5 h-5 text-sky-600" />}
            />
            <StatsCard
              title="Pending Reviews"
              value="2"
              subtitle="Drafts awaiting approval"
              icon={<Clock className="w-5 h-5 text-amber-500" />}
            />
            <StatsCard
              title="Delivered Reach"
              value="1.2M+"
              change="+24% vs benchmark"
              subtitle="Cross-platform impressions"
              icon={<Users className="w-5 h-5 text-purple-600" />}
            />
          </>
        )}
      </div>

      {/* Creator Profile Completeness Widget for Creators */}
      {role === "creator" && currentCreator && (
        <ProfileCompletenessCard creator={currentCreator} />
      )}

      {/* Main Grid: Active Campaigns & Pipeline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Active Campaigns */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Active Campaign Pipelines</h3>
                <p className="text-xs text-slate-500">Live deliverables, timeline milestones, and escrow status.</p>
              </div>
              <Link href="/app/campaigns">
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {activeCampaigns.map((camp) => (
                <div key={camp.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0 shadow-sm">
                      <SafeImage
                        src={camp.coverImage}
                        alt={camp.title}
                        fallbackType="campaign"
                        fallbackName={camp.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{camp.title}</h4>
                      <p className="text-xs text-slate-500 font-mono">
                        Brand: {camp.brand.companyName} • Due {camp.timeline.contentSubmissionDeadline}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-xs">
                    <span className="font-extrabold text-emerald-600">
                      {formatCurrency(camp.budget.perCreatorBudget)}
                    </span>
                    <Link href={`/app/collaborations`}>
                      <Button variant="secondary" size="sm">
                        Workspace
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Quick Recommendations & AI Insights */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-orange-500/10 via-amber-500/5 to-transparent border border-orange-200/80 shadow-card space-y-4">
            <div className="flex items-center gap-2 text-brand-accent font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              <span>AI Opportunity Radar</span>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              Based on verified engagement metrics, 3 new high-ticket developer tool campaigns match your audience with an estimated 94% fit score.
            </p>
            <Link href="/campaigns" className="block pt-2">
              <Button variant="accent" size="sm" className="w-full" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                View Matched Briefs
              </Button>
            </Link>
          </div>

          {/* Quick Shortcuts for Brands */}
          {role === "brand" && (
            <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-3">
              <h4 className="text-xs font-bold uppercase text-slate-500 font-mono">Brand Quick Links</h4>
              <div className="space-y-2 text-xs">
                <Link href="/app/brand/shortlists" className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors">
                  <span className="font-semibold text-slate-800">Creator Shortlists</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
                <Link href="/app/brand/crm" className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 flex items-center justify-between transition-colors">
                  <span className="font-semibold text-slate-800">Creator CRM & Private Notes</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
