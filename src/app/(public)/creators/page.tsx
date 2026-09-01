"use client";

import React, { useEffect, useState } from "react";
import { creatorService } from "@/services/creator.service";
import { CreatorProfile } from "@/core/types";
import { useFilterStore } from "@/stores/filter.store";
import { CreatorCard } from "@/components/creators/CreatorCard";
import { CreatorFilterPanel } from "@/components/creators/CreatorFilterPanel";
import { Sparkles, Users } from "lucide-react";

export default function CreatorsDirectoryPage() {
  const [creators, setCreators] = useState<CreatorProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const {
    creatorCategory,
    creatorPlatform,
    creatorMinFollowers,
    creatorMinEngagement,
    creatorSearchQuery,
    creatorVerifiedOnly,
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
      setCreators(data);
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

  return (
    <div className="py-12 sm:py-16 bg-[#FAFAFC] text-[#0A0A0E] min-h-screen select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-xs font-mono font-bold text-[#0A0A0E]">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
            <span>AUDITED CREATOR TALENT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0A0A0E] tracking-tight font-display">
            Discover Verified Creators
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] font-sans max-w-2xl leading-relaxed">
            Connect with top video creators across YouTube, TikTok, and Instagram with audited demographic stats and instant escrow protection.
          </p>
        </div>

        {/* Filter Panel & Results Grid */}
        <div className="space-y-8">
          <CreatorFilterPanel />

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-white border border-black/8 p-6 space-y-4 animate-pulse min-h-[340px] shadow-xs"
                />
              ))}
            </div>
          ) : creators.length === 0 ? (
            <div className="py-20 text-center rounded-3xl bg-white border border-black/8 p-8 space-y-3 shadow-xs">
              <Users className="w-10 h-10 text-[#7A7A8A] mx-auto" />
              <h3 className="text-base font-bold text-[#0A0A0E] font-display">No creators match your filters</h3>
              <p className="text-xs text-[#6A6A78]">Try broadening your search criteria or resetting filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {creators.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
