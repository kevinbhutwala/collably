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

export default function BrandCreatorDiscoveryPage() {
  const [creators, setCreators] = useState<CreatorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    creatorCategory,
    creatorPlatform,
    creatorMinFollowers,
    creatorMinEngagement,
    creatorSearchQuery,
    creatorVerifiedOnly,
    setCreatorCategory,
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
    return creators.filter((c) => {
      // Search
      if (creatorSearchQuery) {
        const q = creatorSearchQuery.toLowerCase();
        const match =
          c.fullName.toLowerCase().includes(q) ||
          c.handle.toLowerCase().includes(q) ||
          c.headline.toLowerCase().includes(q) ||
          c.primaryCategory.toLowerCase().includes(q);
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

      // Min Followers
      if (creatorMinFollowers > 0) {
        if (c.totalFollowers < creatorMinFollowers) return false;
      }

      // Min Engagement Rate
      if (creatorMinEngagement > 0) {
        if (c.avgEngagementRate < creatorMinEngagement) return false;
      }

      // Verified Only
      if (creatorVerifiedOnly && !c.verified) {
        return false;
      }

      return true;
    });
  }, [creators, creatorSearchQuery, creatorCategory, creatorPlatform, creatorMinFollowers, creatorMinEngagement, creatorVerifiedOnly]);

  return (
    <div className="space-y-6 text-[#0A0A0E] select-none font-sans">
      {/* Desktop Header */}
      <div className="hidden lg:flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Creator Directory
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Audited Talent
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-display tracking-tight">
            Discover Verified Creators
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            Browse top video creators by niche, verified audience telemetry, and engagement rates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-xs font-bold text-[#0A0A0E] shadow-2xs">
            {filteredCreators.length} Creators Available
          </span>
        </div>
      </div>

      {/* Modern Top Dropdown Filter Bar */}
      <CreatorFilterBar />

      {/* Full-Width Creator Roster Grid */}
      {filteredCreators.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-black/8 p-8 space-y-3 shadow-xs">
          <Users className="w-8 h-8 text-[#8A8A9A] mx-auto" />
          <h3 className="text-sm font-bold text-[#0A0A0E]">No creators match your current filters</h3>
          <p className="text-xs text-[#6A6A78]">Try adjusting follower benchmarks, categories, or clearing search terms.</p>
          <button
            onClick={resetCreatorFilters}
            className="px-4 py-2 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-xs font-bold shadow-xs hover:bg-[#FFE052] transition-colors"
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
    </div>
  );
}
