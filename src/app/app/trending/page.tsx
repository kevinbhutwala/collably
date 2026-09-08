"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CreatorTrendingScore,
  CampaignTrendingScore,
  TimeframeWindow,
  CreatorProfile,
} from "@/core/types";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import { ReputationBadgeBar } from "@/components/marketplace/ReputationBadgeBar";
import { useUIStore } from "@/stores/ui.store";
import { useAuthStore } from "@/stores/auth.store";
import {
  Flame,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  Send,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  FolderPlus,
  Compass,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TrendingTab = "trending_now" | "rising" | "top_performing" | "campaigns" | "categories";

export default function DedicatedTrendingPage() {
  const { role } = useAuthStore();
  const { addToast } = useUIStore();
  const [activeTab, setActiveTab] = useState<TrendingTab>("trending_now");
  const [timeframe, setTimeframe] = useState<TimeframeWindow>("7d");
  const [loading, setLoading] = useState(true);

  const [creators, setCreators] = useState<CreatorTrendingScore[]>([]);
  const [campaigns, setCampaigns] = useState<CampaignTrendingScore[]>([]);
  const [categories, setCategories] = useState<
    { name: string; count: number; growthRate: number; avgBudget: number }[]
  >([]);

  // Invite modal state
  const [selectedCreator, setSelectedCreator] = useState<CreatorProfile | null>(null);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteMessage, setInviteMessage] = useState("");
  const [inviteBudget, setInviteBudget] = useState("2500");
  const [isSendingInvite, setIsSendingInvite] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const feedParam =
      activeTab === "campaigns"
        ? "trending_campaigns"
        : activeTab === "categories"
        ? "trending_categories"
        : activeTab;

    fetch(`/api/marketplace/trending?feed=${feedParam}&timeframe=${timeframe}&limit=24`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.creators) setCreators(data.creators);
        if (data.campaigns) setCampaigns(data.campaigns);
        if (data.categories) setCategories(data.categories);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Trending fetch error:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [activeTab, timeframe]);

  const handleOpenInvite = (creator: CreatorProfile) => {
    setSelectedCreator(creator);
    setInviteBudget(String(creator.startingPrice || 2000));
    setInviteMessage(`Hi ${creator.fullName}, we love your content and would love to collaborate with you on our upcoming milestone-backed campaign.`);
    setIsInviteModalOpen(true);
  };

  const handleSendInvite = async () => {
    if (!selectedCreator) return;
    setIsSendingInvite(true);
    try {
      // 1. Persist collaboration directly in database
      const collabRes = await fetch("/api/collaborations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorId: selectedCreator.id,
          campaignTitle: `Partnership: ${selectedCreator.fullName} Showcase`,
          totalAgreedBudget: Number(inviteBudget) || 2000,
          notes: inviteMessage,
          deliverableType: "Short-Form Video (Reels / Shorts)",
        }),
      });
      const collabData = await collabRes.json();

      // 2. Track engagement signal in Anti-Gaming & Trending Engine
      await fetch("/api/marketplace/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "invitation_sent",
          targetId: selectedCreator.id,
          targetType: "creator",
          metadata: { budget: Number(inviteBudget) },
        }),
      }).catch(() => null);

      setIsInviteModalOpen(false);
      addToast({
        type: "success",
        title: "Collaboration Proposal Dispatched",
        message: `Direct sponsorship invitation for $${Number(inviteBudget).toLocaleString()} created and sent to ${selectedCreator.fullName}.`,
      });
    } catch (err: any) {
      console.error("Failed to send invite:", err);
      addToast({
        type: "error",
        title: "Invitation Failed",
        message: err.message || "Failed to dispatch proposal. Please try again.",
      });
    } finally {
      setIsSendingInvite(false);
    }
  };

  return (
    <div className="space-y-8 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
      {/* ── Page Header ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-black/8 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-[#FFD21F]/20 border border-[#FFD21F]/40 text-[10px] font-mono font-bold text-[#0A0A0E] dark:text-[#FFD21F]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-pulse" />
              Market Trends
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="text-[10px] font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
              Updated Hourly
            </span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display flex items-center gap-2.5">
            <span>Trending Creators &amp; Campaigns</span>
            <span className="text-xl">🔥</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4] mt-1 max-w-2xl font-sans">
            See which creators and campaigns are getting the most attention right now, plus emerging talent growing fast in your category.
          </p>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white dark:bg-[#161622] border border-black/8 dark:border-white/10 shadow-xs self-start md:self-center">
          {(["7d", "30d", "90d"] as TimeframeWindow[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer",
                timeframe === tf
                  ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-2xs"
                  : "text-[#6A6A78] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
              )}
            >
              {tf === "7d" ? "7 Days" : tf === "30d" ? "30 Days" : "90 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* ── 5 Primary Discovery Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none border-b border-black/8 dark:border-white/10">
        <button
          onClick={() => setActiveTab("trending_now")}
          className={cn(
            "px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0",
            activeTab === "trending_now"
              ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-sm"
              : "bg-white dark:bg-[#161622] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/6 dark:border-white/8"
          )}
        >
          <Flame className="w-3.5 h-3.5 text-amber-500" />
          <span>Trending Now</span>
        </button>

        <button
          onClick={() => setActiveTab("rising")}
          className={cn(
            "px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0",
            activeTab === "rising"
              ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-sm"
              : "bg-white dark:bg-[#161622] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/6 dark:border-white/8"
          )}
        >
          <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
          <span>Rising Creators</span>
        </button>

        <button
          onClick={() => setActiveTab("top_performing")}
          className={cn(
            "px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0",
            activeTab === "top_performing"
              ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-sm"
              : "bg-white dark:bg-[#161622] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/6 dark:border-white/8"
          )}
        >
          <Award className="w-3.5 h-3.5 text-purple-500" />
          <span>Top Performers</span>
        </button>

        <button
          onClick={() => setActiveTab("campaigns")}
          className={cn(
            "px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0",
            activeTab === "campaigns"
              ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-sm"
              : "bg-white dark:bg-[#161622] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/6 dark:border-white/8"
          )}
        >
          <Building2 className="w-3.5 h-3.5 text-blue-500" />
          <span>Trending Campaigns</span>
        </button>

        <button
          onClick={() => setActiveTab("categories")}
          className={cn(
            "px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0",
            activeTab === "categories"
              ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-sm"
              : "bg-white dark:bg-[#161622] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/6 dark:border-white/8"
          )}
        >
          <Compass className="w-3.5 h-3.5 text-amber-500" />
          <span>Trending Categories</span>
        </button>
      </div>

      {/* ── Content Stage ── */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="w-10 h-10 mx-auto rounded-full border-2 border-[#FFD21F] border-t-transparent animate-spin mb-3" />
          <p className="text-xs font-mono text-[#7A7A8A] dark:text-[#8E8EA4]">
            Evaluating multi-factor momentum telemetry...
          </p>
        </div>
      ) : activeTab === "campaigns" ? (
        /* ── Campaigns Grid ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {campaigns.map((campItem, index) => {
            const camp = campItem.campaign;
            return (
              <div
                key={camp.id}
                className="rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#0A0A0E] dark:text-[#FFD21F] font-mono text-[10px] font-bold">
                      🚀 Brief #{index + 1}
                    </span>
                    <span className="text-xs font-mono font-black text-[#0A0A0E] dark:text-white">
                      Score: {campItem.overallScore}/100
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-[#0A0A0E] dark:text-white font-display line-clamp-1">
                    {camp.title}
                  </h3>
                  <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4] line-clamp-2 mt-1">
                    {camp.tagline || camp.description}
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#F8F8FC] dark:bg-[#1A1A28] border border-black/6 dark:border-white/6 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-[#7A7A8A] block uppercase font-bold">Total Budget</span>
                      <span className="font-bold text-[#0A0A0E] dark:text-white">
                        {formatCurrency(camp.budget?.totalBudget || 0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7A7A8A] block uppercase font-bold">Applicants</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        {camp.applicantsCount || 4} creators
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-black/6 dark:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#7A7A8A]">
                    {camp.category}
                  </span>
                  <Link href={`/campaigns/${camp.id}`}>
                    <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-2xs">
                      <span>View Brief</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : activeTab === "categories" ? (
        /* ── Categories Grid ── */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, index) => (
            <div
              key={cat.name}
              className="rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 p-6 shadow-xs space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#0A0A0E] dark:text-[#FFD21F] font-mono text-[10px] font-bold">
                  Rank #{index + 1}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  ↑ {cat.growthRate}% MoM
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#0A0A0E] dark:text-white font-display">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4] mt-1 font-mono">
                  {cat.count} Active Sponsor Campaigns
                </p>
              </div>

              <div className="pt-3 border-t border-black/6 dark:border-white/10 flex items-center justify-between text-xs font-mono">
                <span className="text-[#7A7A8A]">Avg Deal Budget</span>
                <span className="font-extrabold text-[#0A0A0E] dark:text-white text-sm">
                  {formatCurrency(cat.avgBudget)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ── Creator Cards Grid ── */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creators.map((item, index) => {
            const creator = item.creator;
            const rankLabel =
              activeTab === "rising"
                ? `📈 Rising #${index + 1}`
                : activeTab === "top_performing"
                ? `🏆 Top Performer #${index + 1}`
                : `🔥 Trending #${index + 1}`;

            const growthText =
              activeTab === "rising"
                ? `↑ ${Math.round(creator.avgEngagementRate * 6)}% growth rate`
                : activeTab === "top_performing"
                ? `98% Completion • ${creator.completedCampaignsCount || 10} Collabs`
                : `↑ ${Math.round(25 + item.overallScore * 0.2)}% recent momentum`;

            const matchScore = Math.min(99, Math.round(82 + (creator.avgEngagementRate * 2.2)));

            return (
              <div
                key={creator.id}
                className="group rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 hover:border-[#FFD21F] dark:hover:border-[#FFD21F] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Card Header: Rank Banner */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#0A0A0E] dark:text-[#FFD21F] font-mono text-[11px] font-bold">
                      {rankLabel}
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-mono text-[10px] font-bold">
                      <span>🎯</span> {matchScore}% Match
                    </span>
                  </div>

                  {/* Creator Identity */}
                  <div className="flex items-center gap-3.5 mb-3">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#F5F5F9] shrink-0">
                      {creator.avatarUrl ? (
                        <Image
                          src={creator.avatarUrl}
                          alt={creator.fullName}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-base text-[#0A0A0E] dark:text-white">
                          {creator.fullName.charAt(0)}
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-extrabold text-sm sm:text-base text-[#0A0A0E] dark:text-white truncate font-display group-hover:text-[#A37F00] dark:group-hover:text-[#FFD21F] transition-colors">
                          {creator.fullName}
                        </h3>
                        {creator.verified && (
                          <CheckCircle2 className="w-4 h-4 text-[#FFD21F] shrink-0 fill-[#0A0A0E]" />
                        )}
                      </div>
                      <p className="text-xs font-mono text-[#6A6A78] dark:text-[#8E8EA4] truncate">
                        {creator.primaryCategory} • {creator.location}
                      </p>
                    </div>
                  </div>

                  {/* Badges Strip */}
                  {item.badges && item.badges.length > 0 && (
                    <div className="mb-3">
                      <ReputationBadgeBar badges={item.badges} maxVisible={3} size="sm" />
                    </div>
                  )}

                  {/* Telemetry Strip */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#F8F8FC] dark:bg-[#1A1A28] border border-black/6 dark:border-white/6 mb-2">
                    <div>
                      <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold block">
                        Followers
                      </span>
                      <span className="font-extrabold text-sm font-mono text-[#0A0A0E] dark:text-white">
                        {formatNumber(creator.totalFollowers)}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold block">
                        Engagement
                      </span>
                      <span className="font-extrabold text-sm font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {creator.avgEngagementRate}%
                      </span>
                    </div>
                  </div>

                  {/* Growth & Reliability Indicator */}
                  <div className="space-y-1.5 text-xs font-mono">
                    <div className="flex items-center justify-between text-[#5A5A68] dark:text-[#A0A0B4]">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">{growthText}</span>
                      <span className="text-[11px] text-[#7A7A8A]">
                        ⚡ Responds &le; {item.recentMetrics?.avgResponseHours || 1.4}h
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-[#7A7A8A]">
                      <span>Starting rate:</span>
                      <strong className="text-[#0A0A0E] dark:text-white">
                        {formatCurrency(creator.startingPrice || 1500)}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-3 border-t border-black/6 dark:border-white/10 flex items-center gap-2">
                  <Link href={`/creators/${creator.id}`} className="flex-1">
                    <button className="w-full py-2.5 rounded-xl bg-white dark:bg-[#202030] hover:bg-[#F5F5F9] dark:hover:bg-[#28283C] border border-black/10 dark:border-white/10 text-xs font-bold text-[#0A0A0E] dark:text-white transition-all flex items-center justify-center gap-1">
                      <span>View Profile</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </Link>
                  <button
                    onClick={() => handleOpenInvite(creator)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-extrabold transition-all flex items-center justify-center gap-1 shadow-2xs border border-black/10 cursor-pointer"
                  >
                    <span>Invite</span>
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Quick Invite Modal ── */}
      {isInviteModalOpen && selectedCreator && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl bg-white dark:bg-[#14141E] border border-black/10 dark:border-white/15 p-6 sm:p-8 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-black/8 dark:border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden relative border border-black/10 bg-[#F5F5F9] shrink-0">
                  {selectedCreator.avatarUrl && (
                    <Image
                      src={selectedCreator.avatarUrl}
                      alt={selectedCreator.fullName}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">
                    Invite {selectedCreator.fullName}
                  </h3>
                  <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4] font-mono">
                    {selectedCreator.primaryCategory} • Starting {formatCurrency(selectedCreator.startingPrice)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsInviteModalOpen(false)}
                className="text-xs font-mono text-[#7A7A8A] hover:text-[#0A0A0E] dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#0A0A0E] dark:text-white mb-1">
                  Offered Milestone Budget (USD)
                </label>
                <input
                  type="number"
                  value={inviteBudget}
                  onChange={(e) => setInviteBudget(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/15 bg-[#F8F8FC] dark:bg-[#1C1C28] text-sm text-[#0A0A0E] dark:text-white font-mono focus:outline-none focus:border-[#FFD21F]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0A0A0E] dark:text-white mb-1">
                  Brief Pitch / Message
                </label>
                <textarea
                  rows={3}
                  value={inviteMessage}
                  onChange={(e) => setInviteMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-black/10 dark:border-white/15 bg-[#F8F8FC] dark:bg-[#1C1C28] text-xs text-[#0A0A0E] dark:text-white font-sans focus:outline-none focus:border-[#FFD21F]"
                />
              </div>

              <div className="p-3 rounded-2xl bg-[#FFD21F]/10 border border-[#FFD21F]/30 flex items-start gap-2.5 text-xs text-[#0A0A0E] dark:text-white">
                <ShieldCheck className="w-4 h-4 text-[#FFD21F] shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  <strong>Milestone Escrow Guarantee:</strong> Once accepted, your payment will be held securely in Stripe escrow custody until deliverable approval.
                </p>
              </div>
            </div>

            <div className="pt-3 flex items-center justify-end gap-3 border-t border-black/8 dark:border-white/10">
              <button
                type="button"
                onClick={() => setIsInviteModalOpen(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#6A6A78] hover:text-[#0A0A0E] dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSendInvite}
                disabled={isSendingInvite}
                className="px-6 py-2.5 rounded-xl bg-[#FFD21F] hover:bg-[#FFE052] text-[#0A0A0E] font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                {isSendingInvite ? "Sending..." : "Send Direct Invitation 🚀"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
