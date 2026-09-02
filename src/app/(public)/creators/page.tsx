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

export default function CreatorsDirectoryPage() {
  const [creators, setCreators] = useState<CreatorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [quickViewCreator, setQuickViewCreator] = useState<CreatorQuickViewData | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
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

  const handleBookmarkToggle = (creatorId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(creatorId)) {
        next.delete(creatorId);
        addToast({ type: "info", title: "Removed from Saved", message: "Creator removed from your saved talent list." });
      } else {
        next.add(creatorId);
        addToast({ type: "success", title: "Saved to Talent Roster", message: "Creator bookmarked for upcoming campaign briefs." });
      }
      return next;
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
    reach: c.totalFollowers ? `${(c.totalFollowers / 1000).toFixed(0)}K` : "250K",
    engagementRate: c.avgEngagementRate || 5.8,
    startingPrice: c.startingPrice || c.rateCards?.[0]?.basePrice || 2500,
    matchScore: c.qualityScore || 98.4,
    bio: c.bio,
    tags: ["4K Master", "RED V-Raptor", "ProRes HQ"],
    sampleDeliverables: [
      {
        title: "4K Master Product Reel",
        specs: "RED 8K • 60fps",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "60s Dedicated Mid-roll Integration",
        specs: "Sony FX3 • S-Log3 ProRes",
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
            Direct access to 50,000+ audited video creators, complete with verified audience demographics, 4K production reels, and 1-click booking.
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setCreatorCategory("all")}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all select-none whitespace-nowrap shrink-0",
                creatorCategory === "all"
                  ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs font-bold border border-black/10"
                  : "bg-white text-[#6A6A78] hover:text-[#0A0A0E] border border-black/8"
              )}
            >
              All Talent
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCreatorCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all select-none whitespace-nowrap shrink-0",
                  creatorCategory === cat
                    ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs font-bold border border-black/10"
                    : "bg-white text-[#6A6A78] hover:text-[#0A0A0E] border border-black/8"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7A8A]" />
            <input
              type="text"
              value={creatorSearchQuery}
              onChange={(e) => setCreatorSearchQuery(e.target.value)}
              placeholder="Search creators by niche, name..."
              className="w-full bg-white border border-black/8 rounded-full pl-9 pr-4 py-2 text-xs text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none focus:border-[#FFD21F] shadow-xs transition-all font-sans"
            />
          </div>
        </div>
      </div>

      {/* Creator Grid & Loading State */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <CreativeLoader
            size="lg"
            label="Syncing Creator Roster"
            subtext="Fetching audited media kits and verified production reels..."
          />
        ) : creators.length === 0 ? (
          <div className="py-24 text-center rounded-3xl bg-white border border-black/8 p-8 space-y-3 shadow-xs">
            <Users className="w-8 h-8 text-[#7A7A8A] mx-auto" />
            <h3 className="text-base font-bold text-[#0A0A0E] font-display">No creators match your filters</h3>
            <p className="text-xs text-[#6A6A78]">Try resetting your category or search query.</p>
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
                      isBookmarked={bookmarkedIds.has(c.id)}
                    />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
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
        isBookmarked={quickViewCreator ? bookmarkedIds.has(quickViewCreator.id) : false}
      />
    </div>
  );
}
