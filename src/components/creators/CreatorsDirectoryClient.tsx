"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { creatorService } from "@/services/creator.service";
import { CreatorProfile } from "@/core/types";
import { useFilterStore } from "@/stores/filter.store";
import { CATEGORIES } from "@/core/constants";
import { Sparkles, Users, Star, CheckCircle2, ArrowRight, Play, Search } from "lucide-react";
import { EditorialCreatorCard } from "@/components/creators/EditorialCreatorCard";
import { CreatorQuickViewModal, CreatorQuickViewData } from "@/components/creators/CreatorQuickViewModal";
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
  const [creators, setCreators] = useState<CreatorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const [quickViewCreator, setQuickViewCreator] = useState<CreatorQuickViewData | null>(null);
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

  useEffect(() => {
    const fetchCreators = async () => {
      setLoading(true);
      const data = await creatorService.getCreators({
        category: creatorCategory,
        platform: creatorPlatform,
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

  const transformToQuickView = (c: CreatorProfile): CreatorQuickViewData => ({
    id: c.id,
    name: c.fullName || "Verified Creator",
    handle: c.handle || "@creator",
    avatarUrl: c.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
    heroImage: c.coverImageUrl || c.avatarUrl,
    niche: c.headline || c.primaryCategory || "Technology & AI",
    category: c.primaryCategory || "tech",
    reach: c.totalFollowers ? `${(c.totalFollowers / 1000).toFixed(0)}K` : undefined,
    engagementRate: c.avgEngagementRate,
    startingPrice: c.startingPrice || c.rateCards?.[0]?.basePrice,
    currency: (c as any).currency || (c as any).rateCards?.[0]?.currency || "USD",
    matchScore: c.qualityScore,
    bio: c.bio,
    tags: c.primaryCategory ? [c.primaryCategory] : [],
    sampleDeliverables: [
      {
        title: "4K Master Product Reel",
        specs: "4K Production",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "60s Dedicated Integration",
        specs: "Short-form Content",
        imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
      },
    ],
  });

  return (
    <div className="py-12 sm:py-16 bg-[#FAFAFC] text-[#0A0A0E] min-h-screen select-none space-y-12 font-sans">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-xs font-mono font-bold text-[#0A0A0E]">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
            <span>AUDITED CREATOR TALENT DIRECTORY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0E] tracking-tight font-display">
            Discover Verified Creators
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] font-sans max-w-xl leading-relaxed">
            Direct access to audited video creators, complete with verified audience demographics, 4K production reels, and 1-click booking.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-black/8 pt-2">
          <button
            onClick={() => setViewMode("directory")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer",
              viewMode === "directory"
                ? "bg-[#0A0A0E] text-white shadow-sm"
                : "bg-white text-neutral-600 hover:text-black border border-black/5"
            )}
          >
            <span>👥</span> All Talent Directory
          </button>
          <button
            onClick={() => setViewMode("trending")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer",
              viewMode === "trending"
                ? "bg-[#FFD21F] text-[#0A0A0E] shadow-sm border border-black/10"
                : "bg-white text-neutral-600 hover:text-black border border-black/5"
            )}
          >
            <span>🔥</span> Trending Hub
          </button>
          <button
            onClick={() => setViewMode("match")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer",
              viewMode === "match"
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-white text-neutral-600 hover:text-black border border-black/5"
            )}
          >
            <span>🎯</span> AI Brief Match
          </button>
          <button
            onClick={() => setViewMode("leaderboards")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer",
              viewMode === "leaderboards"
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-white text-neutral-600 hover:text-black border border-black/5"
            )}
          >
            <span>🏆</span> Leaderboards
          </button>
        </div>

        {viewMode === "trending" && <TrendingShowcase />}
        {viewMode === "match" && <NaturalLanguageMatchSearch />}
        {viewMode === "leaderboards" && <MarketplaceLeaderboards />}

        {viewMode === "directory" && (
          <div className="space-y-4 pt-2">
            {/* Search Input Bar */}
            <div className="relative max-w-xl">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#8A8A9A]" />
              <input
                type="text"
                placeholder="Search by creator name, niche, handle, or bio keywords..."
                value={creatorSearchQuery}
                onChange={(e) => setCreatorSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-black/10 text-xs text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none focus:border-black/30 shadow-xs"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setCreatorCategory("all")}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 cursor-pointer",
                  creatorCategory === "all"
                    ? "bg-[#0A0A0E] text-white shadow-xs"
                    : "bg-white text-[#5A5A68] hover:text-[#0A0A0E] border border-black/8"
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
                        ? "bg-[#0A0A0E] text-white shadow-xs"
                        : "bg-white text-[#5A5A68] hover:text-[#0A0A0E] border border-black/8"
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
        ) : (
          creators.length === 0 ? (
            <div className="py-24 text-center rounded-3xl bg-white border border-black/8 p-8 space-y-3">
              <Users className="w-8 h-8 text-[#8A8A9A] mx-auto opacity-50" />
              <h3 className="text-base font-bold text-[#0A0A0E] font-display">No creators match your filter</h3>
              <p className="text-xs text-[#5A5A68] max-w-sm mx-auto">
                Try clearing your search query or selecting &ldquo;All Niches&rdquo; to browse our full talent roster.
              </p>
              <button
                onClick={() => {
                  setCreatorCategory("all");
                  setCreatorSearchQuery("");
                }}
                className="px-4 py-2 rounded-full bg-[#0A0A0E] text-white text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatePresence>
                {creators.map((c) => {
                  const item = transformToQuickView(c);
                  return (
                    <motion.div
                      layout
                      key={c.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 16 }}
                      transition={{ duration: 0.3 }}
                    >
                      <EditorialCreatorCard
                        creator={item}
                        onQuickView={(cd) => setQuickViewCreator(cd)}
                        onBookmarkToggle={handleBookmarkToggle}
                        isBookmarked={isSaved(c.id)}
                      />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )
        )}
      </div>

      {/* Infinite Brand Marquee */}
      <AnimatedBrandSlider speed={28} direction="left" />

      {/* Quick View Modal */}
      <CreatorQuickViewModal
        creator={quickViewCreator}
        isOpen={!!quickViewCreator}
        onClose={() => setQuickViewCreator(null)}
        onBookmarkToggle={handleBookmarkToggle}
        isBookmarked={quickViewCreator ? isSaved(quickViewCreator.id) : false}
      />
    </div>
  );
}
