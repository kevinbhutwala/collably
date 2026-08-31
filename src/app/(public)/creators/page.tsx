"use client";

import React, { useEffect, useState } from "react";
import { creatorService } from "@/services/creator.service";
import { CreatorProfile } from "@/core/types";
import { useFilterStore } from "@/stores/filter.store";
import { CreatorCard } from "@/components/creators/CreatorCard";
import { CreatorFilterPanel } from "@/components/creators/CreatorFilterPanel";
import { Badge } from "@/components/ui/Badge";
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
    <div className="py-12 sm:py-16 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-brand-accent text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Audited Creator Talent</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Discover Verified Creators
          </h1>
          <p className="text-base text-slate-600">
            Explore authentic creators filtered by niche, verified audience engagement, and direct rate cards.
          </p>
        </div>

        {/* 2-Column Directory Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Filter Sidebar */}
          <div className="lg:col-span-4 sticky top-28">
            <CreatorFilterPanel />
          </div>

          {/* Right Results Grid */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Showing {creators.length} audited creators</span>
              <Badge variant="glow" size="sm">Real-time Verified</Badge>
            </div>

            {loading ? (
              <div className="py-24 text-center">
                <div className="w-8 h-8 rounded-full border-2 border-brand-accent border-t-transparent animate-spin mx-auto" />
              </div>
            ) : creators.length === 0 ? (
              <div className="py-24 text-center rounded-3xl bg-white border border-slate-200 p-8 space-y-3 shadow-card">
                <Users className="w-8 h-8 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No creators match your current filters</h3>
                <p className="text-xs text-slate-500">Try loosening your engagement or follower constraints.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {creators.map((c) => (
                  <CreatorCard key={c.id} creator={c} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
