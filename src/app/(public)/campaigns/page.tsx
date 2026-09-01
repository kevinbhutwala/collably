"use client";

import React, { useEffect, useState } from "react";
import { campaignService } from "@/services/campaign.service";
import { Campaign, CreatorCategory } from "@/core/types";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { CATEGORIES } from "@/core/constants";
import { Sparkles, Search } from "lucide-react";
import { cn } from "@/lib/utils";

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
      setCampaigns(data);
      setLoading(false);
    };

    fetchCampaigns();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-12 sm:py-16 bg-[#07070B] text-white min-h-screen select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-xs font-mono font-bold text-[#FFD21F]">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
            <span>PRE-FUNDED ESCROW BRIEFS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Live Campaign Briefs
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-sans max-w-xl leading-relaxed">
            Discover opportunities from premier verified brands. Pitch custom creative angles and receive guaranteed milestone payouts.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all select-none whitespace-nowrap",
                selectedCategory === "all"
                  ? "bg-[#FFD21F] text-[#0A0A0E] shadow-[0_0_12px_rgba(255,210,31,0.45)] font-bold border border-white/40"
                  : "bg-white/[0.04] text-white/60 hover:text-white border border-white/10"
              )}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat as CreatorCategory)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all select-none whitespace-nowrap",
                  selectedCategory === cat
                    ? "bg-[#FFD21F] text-[#0A0A0E] shadow-[0_0_12px_rgba(255,210,31,0.45)] font-bold border border-white/40"
                    : "bg-white/[0.04] text-white/60 hover:text-white border border-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search briefs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD21F]/50 transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-3xl bg-white/[0.04] border border-white/10 p-6 space-y-4 animate-pulse min-h-[260px]"
              />
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-[#0E0C15]/90 border border-white/10 p-8 space-y-3">
            <Sparkles className="w-10 h-10 text-white/30 mx-auto" />
            <h3 className="text-base font-bold text-white font-display">No campaigns found</h3>
            <p className="text-xs text-white/50">Check back soon or broaden your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {campaigns.map((camp) => (
              <CampaignCard key={camp.id} campaign={camp} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
