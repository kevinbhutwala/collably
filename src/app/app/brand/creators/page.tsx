"use client";

import React, { useState, useEffect, useMemo } from "react";
import { creatorService } from "@/services/creator.service";
import { CreatorProfile } from "@/core/types";
import { CreatorCard } from "@/components/creators/CreatorCard";
import { CreatorFilterBar } from "@/components/creators/CreatorFilterBar";
import { useFilterStore } from "@/stores/filter.store";
import { Users, Sparkles, SlidersHorizontal } from "lucide-react";
import { CATEGORIES } from "@/core/constants";
import { cn } from "@/lib/utils";
import { NaturalLanguageMatchSearch } from "@/components/marketplace/NaturalLanguageMatchSearch";
import { TrendingShowcase } from "@/components/marketplace/TrendingShowcase";


export default function BrandCreatorDiscoveryPage() {
  const [tabMode, setTabMode] = useState<"directory" | "match" | "trending">("directory");
  const [creators, setCreators] = useState<CreatorProfile[]>([]);
  const [loading, setLoading] = useState(true);


  const {
    creatorCategory,
    creatorPlatform,
    creatorMinFollowers,
    creatorMinEngagement,
    creatorSearchQuery,
    creatorVerifiedOnly,
    creatorLocation,
    creatorMaxBudget,
    creatorTrendingOnly,
    creatorRisingOnly,
    creatorMinRating,
    creatorMinCollabs,
    creatorSortBy,
    setCreatorCategory,
    setCreatorLocation,
    setCreatorMaxBudget,
    setCreatorTrendingOnly,
    setCreatorRisingOnly,
    setCreatorSortBy,
    resetCreatorFilters,
  } = useFilterStore();

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await creatorService.getCreators();
      setCreators(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const filteredCreators = useMemo(() => {
    const list = creators.filter((c) => {
      // Search
      if (creatorSearchQuery) {
        const q = creatorSearchQuery.toLowerCase();
        const match =
          c.fullName.toLowerCase().includes(q) ||
          c.handle.toLowerCase().includes(q) ||
          c.headline.toLowerCase().includes(q) ||
          c.primaryCategory.toLowerCase().includes(q) ||
          (c.location && c.location.toLowerCase().includes(q));
        if (!match) return false;
      }

      // Category
      if (creatorCategory !== "all") {
        if (c.primaryCategory !== creatorCategory) return false;
      }

      // Platform
      if (creatorPlatform !== "all") {
        const hasPlatform = c.socialAccounts?.some((sa) => sa.platform === creatorPlatform);
        if (!hasPlatform) return false;
      }

      // Location
      if (creatorLocation !== "all" && creatorLocation !== "Worldwide" && creatorLocation) {
        if (!c.location?.toLowerCase().includes(creatorLocation.toLowerCase())) return false;
      }

      // Followers
      if (creatorMinFollowers > 0) {
        if (c.totalFollowers < creatorMinFollowers) return false;
      }

      // Engagement Rate
      if (creatorMinEngagement > 0) {
        if (c.avgEngagementRate < creatorMinEngagement) return false;
      }

      // Max Budget / Starting Rate
      if (creatorMaxBudget > 0) {
        if ((c.startingPrice || 1000) > creatorMaxBudget) return false;
      }

      // Min Rating
      if (creatorMinRating > 0) {
        if ((c.rating || 4.8) < creatorMinRating) return false;
      }

      // Min Successful Collabs
      if (creatorMinCollabs > 0) {
        if ((c.completedCampaignsCount || 0) < creatorMinCollabs) return false;
      }

      // Trending Only filter
      if (creatorTrendingOnly) {
        if (c.avgEngagementRate < 4.5 && (c.completedCampaignsCount || 0) < 5) return false;
      }

      // Rising Only filter
      if (creatorRisingOnly) {
        if (c.totalFollowers > 120000 || c.avgEngagementRate < 4.5) return false;
      }

      // Verified Only
      if (creatorVerifiedOnly && !c.verified) {
        return false;
      }

      return true;
    });

    // Apply Sorting
    return list.sort((a, b) => {
      switch (creatorSortBy) {
        case "trending":
          return (b.avgEngagementRate * 10 + (b.totalFollowers % 1000)) - (a.avgEngagementRate * 10 + (a.totalFollowers % 1000));
        case "rising":
          return (b.avgEngagementRate * 20 - b.totalFollowers / 10000) - (a.avgEngagementRate * 20 - a.totalFollowers / 10000);
        case "top_rated":
          return (b.rating || 4.8) - (a.rating || 4.8);
        case "most_successful":
          return (b.completedCampaignsCount || 0) - (a.completedCampaignsCount || 0);
        case "newest":
          return b.id.localeCompare(a.id);
        case "best_match":
        default:
          return (b.qualityScore || 90) - (a.qualityScore || 90);
      }
    });
  }, [
    creators,
    creatorSearchQuery,
    creatorCategory,
    creatorPlatform,
    creatorLocation,
    creatorMinFollowers,
    creatorMinEngagement,
    creatorMaxBudget,
    creatorMinRating,
    creatorMinCollabs,
    creatorTrendingOnly,
    creatorRisingOnly,
    creatorVerifiedOnly,
    creatorSortBy,
  ]);

  return (
    <div className="space-y-6 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
      {/* Desktop Header */}
      <div className="hidden lg:flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/8 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] dark:text-[#F4F4F8] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Creator Directory
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#0A0A0E] dark:text-[#FFD21F] font-mono text-[10px] font-bold">
              Audited Talent
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0E] dark:text-white font-display tracking-tight">
            Discover Verified Creators
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#8E8EA4]">
            Browse top video creators by niche, verified audience telemetry, and engagement rates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-white dark:bg-[#161622] border border-black/8 dark:border-white/10 text-xs font-bold text-[#0A0A0E] dark:text-white shadow-2xs font-mono">
            {filteredCreators.length} Creators Available
          </span>
        </div>
      </div>

      {/* Discovery Mode Switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-black/8 dark:border-white/10">
        <button
          onClick={() => setTabMode("directory")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0",
            tabMode === "directory"
              ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-sm"
              : "bg-white dark:bg-[#161622] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/6 dark:border-white/8"
          )}
        >
          <span>👥</span> All Verified Creators
        </button>
        <button
          onClick={() => setTabMode("match")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0",
            tabMode === "match"
              ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-sm"
              : "bg-white dark:bg-[#161622] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/6 dark:border-white/8"
          )}
        >
          <span>🎯</span> Natural Language Brief Match
        </button>
        <button
          onClick={() => setTabMode("trending")}
          className={cn(
            "px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shrink-0",
            tabMode === "trending"
              ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-sm"
              : "bg-white dark:bg-[#161622] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/6 dark:border-white/8"
          )}
        >
          <span>🔥</span> Trending Talent Hub
        </button>
      </div>

      {/* Views */}
      {tabMode === "match" && <NaturalLanguageMatchSearch />}
      {tabMode === "trending" && <TrendingShowcase />}

      {tabMode === "directory" && (
        <>
          {/* Modern Top Dropdown Filter Bar */}
          <CreatorFilterBar />

          {/* Sort & Quick Filter Chips Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 rounded-2xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-2xs">
            {/* Quick Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] font-mono text-[#7A7A8A] dark:text-[#8E8EA4] font-bold mr-1">Filter:</span>
              <button
                type="button"
                onClick={() => setCreatorTrendingOnly(!creatorTrendingOnly)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  creatorTrendingOnly
                    ? "bg-[#FFD21F] text-[#0A0A0E] border border-black/10 shadow-xs"
                    : "bg-[#F5F5F9] dark:bg-[#1C1C2A] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/5 dark:border-white/5"
                )}
              >
                <span>🔥</span> Trending
              </button>

              <button
                type="button"
                onClick={() => setCreatorRisingOnly(!creatorRisingOnly)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  creatorRisingOnly
                    ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 shadow-xs font-bold"
                    : "bg-[#F5F5F9] dark:bg-[#1C1C2A] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/5 dark:border-white/5"
                )}
              >
                <span>📈</span> Rising Talent
              </button>

              <button
                type="button"
                onClick={() => setCreatorLocation(creatorLocation === "Worldwide" ? "all" : "Worldwide")}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  creatorLocation === "Worldwide"
                    ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-xs"
                    : "bg-[#F5F5F9] dark:bg-[#1C1C2A] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/5 dark:border-white/5"
                )}
              >
                <span>📍</span> Global Reach
              </button>

              <button
                type="button"
                onClick={() => setCreatorMaxBudget(creatorMaxBudget === 3000 ? 0 : 3000)}
                className={cn(
                  "px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1",
                  creatorMaxBudget === 3000
                    ? "bg-[#FFD21F] text-[#0A0A0E] border border-black/10 shadow-xs"
                    : "bg-[#F5F5F9] dark:bg-[#1C1C2A] text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border border-black/5 dark:border-white/5"
                )}
              >
                <span>💰</span> Under $3,000
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end sm:self-auto font-mono">
              <span className="text-[11px] text-[#7A7A8A] dark:text-[#8E8EA4] font-bold">Sort:</span>
              <select
                value={creatorSortBy}
                onChange={(e) => setCreatorSortBy(e.target.value as any)}
                className="px-3 py-1.5 rounded-xl border border-black/10 dark:border-white/10 bg-[#F5F5F9] dark:bg-[#181824] text-xs font-bold text-[#0A0A0E] dark:text-white focus:outline-none focus:border-[#FFD21F] cursor-pointer"
              >
                <option value="best_match">Best Match</option>
                <option value="trending">🔥 Trending Momentum</option>
                <option value="rising">📈 Rising High Growth</option>
                <option value="top_rated">⭐ Top Rated</option>
                <option value="most_successful">🏆 Most Successful Deals</option>
                <option value="newest">🌱 Newest</option>
              </select>
            </div>
          </div>

          {/* Full-Width Creator Roster Grid */}
          {filteredCreators.length === 0 ? (
            <div className="py-16 text-center rounded-3xl bg-white dark:bg-[#14141E] border border-black/8 dark:border-white/10 p-8 space-y-3 shadow-xs">
              <Users className="w-8 h-8 text-[#8A8A9A] mx-auto" />
              <h3 className="text-sm font-bold text-[#0A0A0E] dark:text-white">No creators match your current filters</h3>
              <p className="text-xs text-[#6A6A78] dark:text-[#8E8EA4]">Try adjusting follower benchmarks, categories, or clearing search terms.</p>
              <button
                onClick={resetCreatorFilters}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold shadow-xs transition-all border border-black/10 cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCreators.map((c) => (
                <CreatorCard key={c.id} creator={c} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

