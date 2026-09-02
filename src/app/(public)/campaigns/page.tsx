"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { campaignService } from "@/services/campaign.service";
import { Campaign, CreatorCategory } from "@/core/types";
import { CATEGORIES } from "@/core/constants";
import { formatCurrency } from "@/core/utils/formatters";
import { Sparkles, Search, ArrowRight, ShieldCheck, DollarSign, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedBrandSlider } from "@/components/visual/AnimatedBrandSlider";
import { InteractiveTiltCard } from "@/components/ui/InteractiveTiltCard";
import { CreativeLoader } from "@/components/ui/CreativeLoader";

export default function CampaignsDirectoryPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CreatorCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampaigns = async () => {
      setLoading(true);
      const data = await campaignService.getCampaigns({
        category: selectedCategory,
        searchQuery: searchQuery || undefined,
      });
      setCampaigns(data || []);
      setLoading(false);
    };

    fetchCampaigns();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-12 sm:py-16 bg-[#FAFAFC] text-[#0A0A0E] min-h-screen select-none space-y-12 font-sans">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-xs font-mono font-bold text-[#0A0A0E]">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
            <span>PRE-FUNDED ESCROW BRIEFS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0E] tracking-tight font-display">
            Live Campaign Briefs
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] font-sans max-w-xl leading-relaxed">
            Discover active production opportunities from premier verified brands. Pitch custom creative concepts and receive guaranteed milestone payouts.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all select-none whitespace-nowrap shrink-0",
                selectedCategory === "all"
                  ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs font-bold border border-black/10"
                  : "bg-white text-[#6A6A78] hover:text-[#0A0A0E] border border-black/8"
              )}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all select-none whitespace-nowrap shrink-0",
                  selectedCategory === cat
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
              placeholder="Search briefs or brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-black/8 text-xs focus:outline-hidden focus:border-[#FFD21F] transition-colors shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Sliding Animated Brand Marquee */}
      <AnimatedBrandSlider speed={26} direction="left" />

      {/* Campaign Cards Grid with 3D Tilt */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <CreativeLoader
            size="lg"
            label="Loading Live Briefs"
            subtext="Connecting to pre-funded escrow campaign vaults..."
          />
        ) : campaigns.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-black/8 space-y-3 shadow-xs">
            <Sparkles className="w-8 h-8 text-[#FFD21F] mx-auto" />
            <h3 className="text-lg font-bold font-display">No Briefs Match Your Filter</h3>
            <p className="text-xs text-[#6A6A78]">Try selecting a different category or clearing your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((camp) => {
              const budgetVal =
                camp.budget?.totalBudget ||
                (typeof camp.budget === "number" ? camp.budget : 5000);

              return (
                <InteractiveTiltCard
                  key={camp.id}
                  maxTilt={7}
                  glowColor="rgba(255, 210, 31, 0.25)"
                  className="rounded-3xl bg-white border border-black/8 hover:border-black/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all p-6 flex flex-col justify-between group relative hover-lift select-none"
                >
                  <div className="space-y-4">
                    {/* Top Bar with Brand and Budget */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-2xl bg-[#0A0A0E] text-white flex items-center justify-center font-mono font-extrabold text-xs shadow-xs">
                          {camp.title.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-[#888898] uppercase block">
                            Verified Brand
                          </span>
                          <span className="text-xs font-bold text-[#0A0A0E] font-display">
                            {camp.category}
                          </span>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-xs font-mono font-extrabold shadow-2xs">
                        {formatCurrency(budgetVal)}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-1.5">
                      <h3 className="text-base font-bold font-display text-[#0A0A0E] group-hover:text-[#8A7000] transition-colors line-clamp-1">
                        {camp.title}
                      </h3>
                      <p className="text-xs text-[#5A5A68] font-sans line-clamp-2 leading-relaxed">
                        {camp.description}
                      </p>
                    </div>

                    {/* Deliverables Chip Bar */}
                    <div className="flex items-center gap-2 pt-2 border-t border-black/6 text-[11px] font-mono text-[#5A5A68]">
                      <div className="flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#087F5B]" />
                        <span>100% Escrow</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#FFD21F]" />
                        <span>{camp.deliverables?.length || 2} Deliverables</span>
                      </div>
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="pt-4 mt-2">
                    <Link
                      href={`/campaigns/${camp.id}`}
                      className="w-full py-2.5 rounded-full bg-[#FAF9F5] hover:bg-[#FFD21F] text-[#0A0A0E] font-sans font-bold text-xs transition-colors flex items-center justify-center gap-1.5 border border-black/8 shadow-2xs hover-lift"
                    >
                      <span>View Brief &amp; Pitch</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </InteractiveTiltCard>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
