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
    <div className="py-12 sm:py-16 bg-[#FAFAFC] text-[#0A0A0E] min-h-screen select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-xs font-mono font-bold text-[#0A0A0E]">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
            <span>PRE-FUNDED ESCROW BRIEFS</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-[#0A0A0E] tracking-tight font-display">
            Live Campaign Briefs
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] font-sans max-w-xl leading-relaxed">
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
                  ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs font-bold border border-black/10"
                  : "bg-white text-[#6A6A78] hover:text-[#0A0A0E] border border-black/8"
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
                    ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs font-bold border border-black/10"
                    : "bg-white text-[#6A6A78] hover:text-[#0A0A0E] border border-black/8"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7A8A]" />
            <input
              type="text"
              placeholder="Search briefs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-white border border-black/10 text-xs text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none focus:border-[#FFD21F] shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-3xl bg-white border border-black/8 p-6 space-y-4 animate-pulse min-h-[260px] shadow-xs"
              />
            ))}
          </div>
        ) : campaigns.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-white border border-black/8 p-8 space-y-3 shadow-xs">
            <Sparkles className="w-10 h-10 text-[#7A7A8A] mx-auto" />
            <h3 className="text-base font-bold text-[#0A0A0E] font-display">No campaigns found</h3>
            <p className="text-xs text-[#6A6A78]">Check back soon or broaden your search criteria.</p>
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
