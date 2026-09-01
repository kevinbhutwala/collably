"use client";

import React, { useEffect, useState } from "react";
import { campaignService } from "@/services/campaign.service";
import { Campaign, CreatorCategory } from "@/core/types";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { CATEGORIES } from "@/core/constants";
import { Badge } from "@/components/ui/Badge";
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
    <div className="py-12 sm:py-16 bg-[#FAFAF8] text-[#111111] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-xs font-mono font-bold text-[#111111] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
            <span>Pre-Funded Escrow Briefs</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight font-display">
            Live Campaign Briefs
          </h1>
          <p className="text-base text-[#6B6B6B] font-sans font-medium">
            Discover opportunities from premier verified brands. Pitch custom creative angles and receive guaranteed milestone payouts.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all select-none whitespace-nowrap",
                selectedCategory === "all"
                  ? "bg-[#111111] text-[#FAFAF8] shadow-xs"
                  : "bg-[#FFFFFF] text-[#6B6B6B] hover:text-[#111111] border border-[#E7E7E4]"
              )}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all select-none whitespace-nowrap",
                  selectedCategory === cat
                    ? "bg-[#111111] text-[#FAFAF8] shadow-xs"
                    : "bg-[#FFFFFF] text-[#6B6B6B] hover:text-[#111111] border border-[#E7E7E4]"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
            <input
              type="text"
              placeholder="Search briefs or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FFFFFF] border border-[#E7E7E4] rounded-xl pl-9 pr-4 py-2 text-xs text-[#111111] placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#111111] transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-[#6B6B6B] font-mono">
            <span>Showing {campaigns.length} live campaign briefs</span>
            <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-bold">
              Pre-Funded Escrow
            </span>
          </div>

          {loading ? (
            <div className="py-24 text-center">
              <div className="w-8 h-8 rounded-full border-2 border-[#111111] border-t-transparent animate-spin mx-auto" />
            </div>
          ) : campaigns.length === 0 ? (
            <div className="py-24 text-center rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] p-8 space-y-3 shadow-xs text-[#111111]">
              <Sparkles className="w-8 h-8 text-[#111111] mx-auto" />
              <h3 className="text-base font-bold text-[#111111] font-display">No campaigns match your search</h3>
              <p className="text-xs text-[#6B6B6B] font-sans">Check back shortly or browse all categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {campaigns.map((c) => (
                <CampaignCard key={c.id} campaign={c} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
