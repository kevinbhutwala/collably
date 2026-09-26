"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { creatorService } from "@/services/creator.service";
import { CreatorProfile } from "@/core/types";
import { useFilterStore } from "@/stores/filter.store";
import { CATEGORIES } from "@/core/constants";
import {
  Sparkles,
  Users,
  Star,
  CheckCircle2,
  ArrowRight,
  Play,
  Search,
  ShieldCheck,
  Camera,
  Check,
  Clock,
  UserCheck,
  Send,
  Video,
} from "lucide-react";
import { EditorialCreatorCard } from "@/components/creators/EditorialCreatorCard";
import { CreatorQuickViewModal, CreatorQuickViewData } from "@/components/creators/CreatorQuickViewModal";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { AnimatedBrandSlider } from "@/components/visual/AnimatedBrandSlider";
import { CreativeLoader } from "@/components/ui/CreativeLoader";
import { useUIStore } from "@/stores/ui.store";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingShowcase } from "@/components/marketplace/TrendingShowcase";
import { NaturalLanguageMatchSearch } from "@/components/marketplace/NaturalLanguageMatchSearch";
import { MarketplaceLeaderboards } from "@/components/marketplace/MarketplaceLeaderboards";
import { getCategoryVisual } from "@/core/utils/titleMedia";
import { useShortlistStore } from "@/stores/shortlist.store";

export function CreatorsDirectoryClient() {
  const [viewMode, setViewMode] = useState<"directory" | "trending" | "match" | "leaderboards">("directory");
  const [talentRosterFilter, setTalentRosterFilter] = useState<"cohort" | "all">("cohort");
  const [creators, setCreators] = useState<CreatorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const [quickViewCreator, setQuickViewCreator] = useState<CreatorQuickViewData | null>(null);
  const [intakeModalOpen, setIntakeModalOpen] = useState(false);
  const [intakeForm, setIntakeForm] = useState({
    fullName: "",
    handle: "",
    category: "Technology & AI",
    cameraRig: "",
    portfolioUrl: "",
    turnaroundDays: "5",
  });

  const { isSaved, toggleSaveCreator } = useShortlistStore();
  const { addToast } = useUIStore();

  const {
    creatorCategory,
    creatorPlatform,
    creatorMinFollowers,
    creatorMinEngagement,
    creatorSearchQuery,
    creatorVerifiedOnly,
    setCreatorCategory,
    setCreatorSearchQuery,
  } = useFilterStore();
  const [creatorRegion, setCreatorRegion] = useState<string>("all");

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      const data = await creatorService.getCreators({
        category: creatorCategory,
        platform: creatorPlatform,
        region: creatorRegion !== "all" ? creatorRegion : undefined,
        minFollowers: creatorMinFollowers || undefined,
        minEngagement: creatorMinEngagement || undefined,
        searchQuery: creatorSearchQuery || undefined,
        verifiedOnly: creatorVerifiedOnly || undefined,
      });
      setCreators(data || []);
      setLoading(false);
    };

    fetchCreators();
  }, [
    creatorCategory,
    creatorPlatform,
    creatorRegion,
    creatorMinFollowers,
    creatorMinEngagement,
    creatorSearchQuery,
    creatorVerifiedOnly,
  ]);

  const handleBookmarkToggle = async (creatorId: string) => {
    const creator = creators.find((c) => c.id === creatorId);
    if (!creator) return;
    const nowSaved = await toggleSaveCreator(creator);
    addToast({
      type: "success",
      title: nowSaved ? "Saved to Talent Roster" : "Removed from Saved",
      message: `${creator.fullName} has been ${nowSaved ? "added to" : "removed from"} your active brand talent shortlist.`,
    });
  };

  const handleIntakeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!intakeForm.fullName || !intakeForm.handle || !intakeForm.portfolioUrl) {
      addToast({
        type: "error",
        title: "Required Fields Missing",
        message: "Please provide your name, handle, and showreel URL.",
      });
      return;
    }

    addToast({
      type: "success",
      title: "Pilot Application Submitted",
      message: "Our talent curators will review your portfolio reel within 24 hours.",
    });
    setIntakeModalOpen(false);
    setIntakeForm({
      fullName: "",
      handle: "",
      category: "Technology & AI",
      cameraRig: "",
      portfolioUrl: "",
      turnaroundDays: "5",
    });
  };

  const transformToQuickView = (c: CreatorProfile): CreatorQuickViewData => {
    const cleanHandle = (c.handle || "").replace(/^@/, "");
    const deliverables = c.rateCards && c.rateCards.length > 0
      ? c.rateCards.map((rc) => ({
          title: rc.title,
          specs: rc.deliverableType,
          imageUrl: c.coverImageUrl || c.avatarUrl,
        }))
      : [
          {
            title: "60s Master Product Reel",
            specs: "4K Master Production",
            imageUrl: c.coverImageUrl || c.avatarUrl || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
          },
          {
            title: "Story / Carousel Integration",
            specs: "Multi-Asset Feed Cut",
            imageUrl: c.avatarUrl || "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
          },
        ];

    return {
      id: c.id,
      name: c.fullName || "Verified Creator",
      handle: `@${cleanHandle}`,
      avatarUrl: c.avatarUrl || "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800",
      heroImage: c.coverImageUrl || c.avatarUrl,
      niche: c.headline || c.primaryCategory || "Technology & AI",
      category: c.primaryCategory || "Technology & AI",
      reach: c.totalFollowers
        ? c.totalFollowers >= 1000000
          ? `${(c.totalFollowers / 1000000).toFixed(1)}M`
          : `${(c.totalFollowers / 1000).toFixed(0)}K`
        : undefined,
      engagementRate: c.avgEngagementRate,
      startingPrice: c.startingPrice || c.rateCards?.[0]?.basePrice,
      currency: (c as any).currency || (c as any).rateCards?.[0]?.currency || "USD",
      matchScore: c.qualityScore,
      bio: c.bio,
      tags: [
        c.primaryCategory,
        c.isSignedTalent ? "Founding Cohort '26" : "Market Benchmark",
      ],
      sampleDeliverables: deliverables,
      location: c.location,
      profileSource: c.profileSource || (c.isSignedTalent ? "abeycollab_verified" : "market_benchmark"),
      isSignedTalent: c.isSignedTalent !== false && (c.isSignedTalent || c.isAbeyCollabVerified || c.availableForHire),
      cohortBadge: c.cohortBadge || (c.isSignedTalent ? "Founding Cohort '26" : undefined),
      turnaroundDays: c.turnaroundGuaranteedDays || 5,
      isInstagramVerified: c.isInstagramVerified ?? true,
      isAbeyCollabVerified: c.isAbeyCollabVerified ?? false,
      isClaimedOnAbeyCollab: c.isClaimedOnAbeyCollab ?? false,
      instagramUrl: c.instagramUrl || `https://www.instagram.com/${cleanHandle}/`,
      isSampleRate: !c.isSignedTalent,
    };
  };

  const displayedCreators =
    talentRosterFilter === "cohort"
      ? creators.filter(
          (c) =>
            c.isSignedTalent !== false &&
            (c.isSignedTalent || c.isAbeyCollabVerified || c.availableForHire)
        )
      : creators;

  return (
    <div className="pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 bg-white dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8] min-h-screen select-none space-y-8 sm:space-y-10 font-sans">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-3.5 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-xs font-mono font-bold text-[#0A0A0E] dark:text-[#FFD21F]">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
            <span>FOUNDING CREATOR COHORT &bull; PRE-LAUNCH TALENT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0E] dark:text-white tracking-tight font-display">
            Discover Verified Creators
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#8E8EA4] font-sans max-w-xl leading-relaxed">
            Direct access to active mid-tier creators and professional videographers with signed pilot representation agreements, guaranteed 5-day delivery SLAs, and 100% escrow protection.
          </p>
        </div>

        {/* Mode Selector Tabs (Sleek Segmented Pill Rail) */}
        <div className="p-1.5 rounded-2xl bg-neutral-100 dark:bg-white/[0.04] border border-black/6 dark:border-white/10 inline-flex flex-wrap items-center gap-1.5 max-w-full">
          <button
            onClick={() => setViewMode("directory")}
            className={cn(
              "px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer",
              viewMode === "directory"
                ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
            )}
          >
            <span>👥</span> Talent Directory
          </button>
          <button
            onClick={() => setViewMode("trending")}
            className={cn(
              "px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer",
              viewMode === "trending"
                ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
            )}
          >
            <span>🔥</span> Trending Hub
          </button>
          <button
            onClick={() => setViewMode("match")}
            className={cn(
              "px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer",
              viewMode === "match"
                ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
            )}
          >
            <span>🎯</span> AI Brief Match
          </button>
          <button
            onClick={() => setViewMode("leaderboards")}
            className={cn(
              "px-3.5 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 shrink-0 cursor-pointer",
              viewMode === "leaderboards"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white"
            )}
          >
            <span>🏆</span> Leaderboards
          </button>
        </div>

        {viewMode === "trending" && <TrendingShowcase />}
        {viewMode === "match" && <NaturalLanguageMatchSearch />}
        {viewMode === "leaderboards" && <MarketplaceLeaderboards />}

        {viewMode === "directory" && (
          <div className="space-y-5 pt-2">
            {/* Primary Roster Sub-Filter: Founding Cohort vs All Talent */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#FAFAF8] dark:bg-[#101018] border border-black/8 dark:border-white/10 shadow-xs">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTalentRosterFilter("cohort")}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer",
                    talentRosterFilter === "cohort"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-white dark:bg-[#181824] text-[#5A5A68] dark:text-[#A0A0B4] border border-black/8 dark:border-white/10"
                  )}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
                  <span>Founding Cohort &apos;26 (14 Signed)</span>
                </button>

                <button
                  onClick={() => setTalentRosterFilter("all")}
                  className={cn(
                    "px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                    talentRosterFilter === "all"
                      ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-xs"
                      : "bg-white dark:bg-[#181824] text-[#5A5A68] dark:text-[#A0A0B4] border border-black/8 dark:border-white/10"
                  )}
                >
                  <span>All Talent &amp; Benchmarks</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden md:inline-flex text-xs font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
                  5-Day Turnaround SLA Guaranteed
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIntakeModalOpen(true)}
                  className="rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Apply to Join Cohort</span>
                </Button>
              </div>
            </div>

            {/* Cohort Reassurance Banner */}
            {talentRosterFilter === "cohort" && (
              <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/25 border border-emerald-200 dark:border-emerald-800/40 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <p className="text-xs text-emerald-950 dark:text-emerald-200 leading-relaxed font-sans">
                    <strong>Founding Roster Verified:</strong> Every creator in this cohort has signed pilot agreements, verified fixed rate cards, and guaranteed 5-day content delivery under automated milestone escrow.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono text-emerald-800 dark:text-emerald-300 font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>14/14 Available for Q4 Deals</span>
                </div>
              </div>
            )}

            {/* Search Input Bar */}
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A9A] dark:text-[#6A6A78]" />
              <input
                type="text"
                placeholder="Search by creator name, niche, camera gear, or handle..."
                value={creatorSearchQuery}
                onChange={(e) => setCreatorSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white dark:bg-[#14141E] border border-black/10 dark:border-white/15 text-xs text-[#0A0A0E] dark:text-white placeholder:text-[#8A8A9A] dark:placeholder:text-[#6A6A78] focus:outline-none focus:border-[#FFD21F] shadow-xs"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setCreatorCategory("all")}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer",
                  creatorCategory === "all"
                    ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-xs"
                    : "bg-white dark:bg-[#14141E] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/8 dark:border-white/10"
                )}
              >
                All Niches
              </button>
              {CATEGORIES.map((cat) => {
                const visual = getCategoryVisual(cat);
                const CatIcon = visual.icon;
                const isSelected = creatorCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setCreatorCategory(cat)}
                    className={cn(
                      "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer",
                      isSelected
                        ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-xs"
                        : "bg-white dark:bg-[#14141E] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/8 dark:border-white/10"
                    )}
                  >
                    <CatIcon className="w-3.5 h-3.5" />
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Directory Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="py-24 text-center">
            <CreativeLoader size="lg" label="Filtering Creators" subtext="Fetching audited metrics and portfolios..." />
          </div>
        ) : displayedCreators.length === 0 ? (
          <div className="py-24 text-center rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-8 space-y-3">
            <Users className="w-8 h-8 text-[#8A8A9A] mx-auto opacity-50" />
            <h3 className="text-base font-bold text-[#0A0A0E] dark:text-white font-display">No creators match your filter</h3>
            <p className="text-xs text-[#5A5A68] dark:text-[#8E8EA4] max-w-sm mx-auto">
              Try clearing your search query or selecting &ldquo;All Niches&rdquo; to browse our full talent roster.
            </p>
            <button
              onClick={() => {
                setCreatorCategory("all");
                setCreatorRegion("all");
                setCreatorSearchQuery("");
                setTalentRosterFilter("cohort");
              }}
              className="px-4 py-2 rounded-full bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {displayedCreators.map((c) => {
                const item = transformToQuickView(c);
                return (
                  <motion.div
                    layout
                    key={c.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                  >
                    <EditorialCreatorCard
                      creator={item}
                      onQuickView={(creatorData) => setQuickViewCreator(creatorData)}
                      onBookmarkToggle={handleBookmarkToggle}
                      isBookmarked={isSaved(c.id)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Creator Quick View Modal */}
      {quickViewCreator && (
        <CreatorQuickViewModal
          creator={quickViewCreator}
          isOpen={!!quickViewCreator}
          onClose={() => setQuickViewCreator(null)}
          onBookmarkToggle={handleBookmarkToggle}
          isBookmarked={isSaved(quickViewCreator.id)}
        />
      )}

      {/* Creator Intake Application Modal */}
      <Modal
        isOpen={intakeModalOpen}
        onClose={() => setIntakeModalOpen(false)}
        title="Apply for Founding Creator Cohort"
        maxWidth="xl"
      >
        <form onSubmit={handleIntakeSubmit} className="space-y-4 text-xs font-sans text-[#111111] dark:text-white">
          <p className="text-xs text-[#6B6B6B] dark:text-[#A0A0B0] leading-relaxed">
            We are onboarding 10&ndash;20 specialized videographers and creators across tech, design, wellness, and lifestyle. Cohort members receive pre-negotiated briefs, 5-day SLA guarantees, and instant escrow payouts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#6B6B6B] dark:text-[#A0A0B0]">Full Name *</label>
              <input
                type="text"
                required
                value={intakeForm.fullName}
                onChange={(e) => setIntakeForm({ ...intakeForm, fullName: e.target.value })}
                placeholder="e.g. Alex Morgan"
                className="w-full px-3 py-2 rounded-lg border border-[#E7E7E4] dark:border-white/15 bg-[#FAFAF8] dark:bg-white/5 text-xs text-[#111111] dark:text-white focus:outline-none focus:border-[#111111]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#6B6B6B] dark:text-[#A0A0B0]">Channel / IG Handle *</label>
              <input
                type="text"
                required
                value={intakeForm.handle}
                onChange={(e) => setIntakeForm({ ...intakeForm, handle: e.target.value })}
                placeholder="@alexvisuals"
                className="w-full px-3 py-2 rounded-lg border border-[#E7E7E4] dark:border-white/15 bg-[#FAFAF8] dark:bg-white/5 text-xs text-[#111111] dark:text-white focus:outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#6B6B6B] dark:text-[#A0A0B0]">Primary Category *</label>
              <select
                value={intakeForm.category}
                onChange={(e) => setIntakeForm({ ...intakeForm, category: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-[#E7E7E4] dark:border-white/15 bg-[#FAFAF8] dark:bg-white/5 text-xs text-[#111111] dark:text-white focus:outline-none focus:border-[#111111]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#6B6B6B] dark:text-[#A0A0B0]">Primary Camera Rig *</label>
              <input
                type="text"
                required
                value={intakeForm.cameraRig}
                onChange={(e) => setIntakeForm({ ...intakeForm, cameraRig: e.target.value })}
                placeholder="e.g. Sony FX3 / 35mm GM / DaVinci"
                className="w-full px-3 py-2 rounded-lg border border-[#E7E7E4] dark:border-white/15 bg-[#FAFAF8] dark:bg-white/5 text-xs text-[#111111] dark:text-white focus:outline-none focus:border-[#111111]"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[11px] font-bold text-[#6B6B6B] dark:text-[#A0A0B0]">Showreel / Portfolio Link *</label>
            <input
              type="url"
              required
              value={intakeForm.portfolioUrl}
              onChange={(e) => setIntakeForm({ ...intakeForm, portfolioUrl: e.target.value })}
              placeholder="https://vimeo.com/... or https://instagram.com/..."
              className="w-full px-3 py-2 rounded-lg border border-[#E7E7E4] dark:border-white/15 bg-[#FAFAF8] dark:bg-white/5 text-xs text-[#111111] dark:text-white focus:outline-none focus:border-[#111111]"
            />
          </div>

          <div className="p-3 rounded-xl bg-[#FAFAF8] dark:bg-white/5 border border-[#E7E7E4] dark:border-white/10 flex items-center justify-between text-xs font-mono">
            <span>Guaranteed Turnaround SLA:</span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400">5-Day Production Delivery</span>
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t border-[#E7E7E4] dark:border-white/10">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIntakeModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 flex items-center gap-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit Cohort Application</span>
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
