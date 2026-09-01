"use client";

import React, { useState, useEffect } from "react";
import { campaignService } from "@/services/campaign.service";
import { Campaign, CreatorCategory } from "@/core/types";
import { CATEGORIES } from "@/core/constants";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { Badge } from "@/components/ui/Badge";
import { Search, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AppCampaignsPage() {
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
    <div className="space-y-8 text-[#111111]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E7E7E4]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
              Creator Marketplace
            </span>
            <span className="text-[#E7E7E4]">•</span>
            <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
              Escrow Backed
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-display tracking-tight">
            Discover Campaign Briefs
          </h1>
          <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-sans font-medium">
            Apply to verified brand briefs with customized creative pitches and guaranteed escrow milestones.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
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
          {CATEGORIES.slice(0, 5).map((cat) => (
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
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns, brands..."
            className="w-full bg-[#FFFFFF] border border-[#E7E7E4] rounded-xl pl-9 pr-4 py-2 text-xs text-[#111111] placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#111111] transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="py-24 text-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#111111] border-t-transparent animate-spin mx-auto" />
        </div>
      ) : campaigns.length === 0 ? (
        <div className="py-24 text-center rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] p-8 space-y-3 shadow-xs">
          <Compass className="w-8 h-8 text-[#6B6B6B] mx-auto" />
          <h3 className="text-base font-bold text-[#111111] font-display">No campaigns found</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((camp) => (
            <CampaignCard key={camp.id} campaign={camp} />
          ))}
        </div>
      )}
    </div>
  );
}
