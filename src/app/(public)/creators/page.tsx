"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { creatorService } from "@/services/creator.service";
import { CreatorProfile } from "@/core/types";
import { useFilterStore } from "@/stores/filter.store";
import { CATEGORIES } from "@/core/constants";
import { Sparkles, Users, Star, CheckCircle2, ArrowRight, Play, Search } from "lucide-react";
import { InteractiveTiltCard } from "@/components/ui/InteractiveTiltCard";
import { AnimatedBrandSlider } from "@/components/visual/AnimatedBrandSlider";
import { cn } from "@/lib/utils";

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
    <div className="py-12 sm:py-16 bg-[#FAFAFC] text-[#0A0A0E] min-h-screen select-none space-y-12">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-xs font-mono font-bold text-[#0A0A0E]">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
            <span>AUDITED CREATOR TALENT</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0A0A0E] tracking-tight font-display">
            Discover Verified Creators
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] font-sans max-w-xl leading-relaxed">
            Direct access to 50,000+ audited video creators, complete with verified audience demographics, 4K production reels, and 1-click booking.
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 no-scrollbar">
            <button
              onClick={() => setCreatorCategory("all")}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all select-none whitespace-nowrap",
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
                  "px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all select-none whitespace-nowrap",
                  creatorCategory === cat
                    ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs font-bold border border-black/10"
                    : "bg-white text-[#6A6A78] hover:text-[#0A0A0E] border border-black/8"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#888898] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search creators or skills..."
              value={creatorSearchQuery}
              onChange={(e) => setCreatorSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-black/8 text-xs focus:outline-hidden focus:border-[#FFD21F] transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Sliding Animated Brand Marquee */}
      <AnimatedBrandSlider speed={28} direction="right" />

      {/* Creator Roster Overlapping Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="h-80 rounded-3xl bg-white border border-black/6 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {creators.map((c) => (
              <InteractiveTiltCard
                key={c.id}
                maxTilt={8}
                glowColor="rgba(255, 210, 31, 0.25)"
                className="rounded-3xl bg-white border border-black/8 hover:border-black/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all p-4 flex flex-col justify-between group relative"
              >
                <div className="space-y-3">
                  {/* Layered / Overlapping Image Container */}
                  <div className="relative aspect-[4/4.8] w-full rounded-2xl overflow-hidden bg-[#0A0A0E]">
                    <img
                      src={c.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600"}
                      alt={c.fullName}
                      className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                    {/* Top Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white flex items-center gap-1 border border-white/15">
                        <Star className="w-3 h-3 text-[#FFD21F] fill-[#FFD21F]" />
                        <span>{c.rating?.toFixed(1) || "5.0"}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-mono font-extrabold shadow-sm">
                        ${c.startingPrice?.toLocaleString() || "1,500"}
                      </span>
                    </div>

                    {/* Overlapping Floating Video Tag */}
                    <div className="absolute bottom-14 right-3 z-20 w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-lg bg-black/80 flex items-center justify-center">
                      <Play className="w-4 h-4 text-[#FFD21F] fill-[#FFD21F]" />
                    </div>

                    {/* Bottom Portrait Info */}
                    <div className="absolute bottom-3 inset-x-3 z-10 text-white space-y-0.5 max-w-[70%]">
                      <div className="flex items-center gap-1">
                        <h3 className="text-base font-bold font-display truncate">{c.fullName}</h3>
                        {c.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] shrink-0" />}
                      </div>
                      <p className="text-[11px] text-white/80 font-sans truncate">{c.handle}</p>
                    </div>
                  </div>

                  {/* Skills/Tags */}
                  <div className="flex flex-wrap gap-1 font-mono text-[10px] text-[#5A5A68]">
                    <span className="px-2 py-0.5 rounded-md bg-[#FAF9F5] border border-black/5">
                      {c.primaryCategory}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-[#FAF9F5] border border-black/5">
                      {c.totalFollowers ? `${Math.round(c.totalFollowers / 1000)}K Reach` : "450K Reach"}
                    </span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-black/6 flex items-center justify-between text-xs">
                  <span className="font-mono text-[10px] text-[#7A7A8A]">Audited Media Kit</span>
                  <Link
                    href={`/creators/${c.id}`}
                    className="px-3 py-1.5 rounded-full bg-[#FAF9F5] hover:bg-[#FFD21F] text-[#0A0A0E] font-sans font-bold text-xs transition-colors flex items-center gap-1 border border-black/8"
                  >
                    <span>View</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </InteractiveTiltCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
