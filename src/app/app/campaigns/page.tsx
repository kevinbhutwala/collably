"use client";

import React, { useState, useEffect } from "react";
import { campaignService } from "@/services/campaign.service";
import { Campaign, CreatorCategory } from "@/core/types";
import { CATEGORIES } from "@/core/constants";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { CreativeLoader } from "@/components/ui/CreativeLoader";
import { Search, Compass, Sparkles, Filter } from "lucide-react";
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
      setCampaigns(data || []);
      setLoading(false);
    };
    fetchCampaigns();
  }, [selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 text-[#0A0A0E] select-none font-sans">
      {/* Desktop Header */}
      <div className="hidden lg:flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Campaign Marketplace
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Escrow Secured
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-display tracking-tight">
            Discover Campaigns
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            Browse active sponsor briefs and submit creative pitches.
          </p>
        </div>
      </div>

      {/* Redesigned Clean Segmented Category Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Segmented Scrollable Strip */}
        <div className="flex items-center gap-1 p-1 bg-[#F4F4F8] rounded-2xl border border-black/8 overflow-x-auto no-scrollbar shadow-xs">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5",
              selectedCategory === "all"
                ? "bg-white text-[#0A0A0E] shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-black/8"
                : "text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-black/5"
            )}
          >
            <Sparkles className={cn("w-3.5 h-3.5", selectedCategory === "all" ? "text-[#8A7000]" : "text-[#7A7A8A]")} />
            <span>All Briefs</span>
          </button>

          {CATEGORIES.slice(0, 6).map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5",
                  isSelected
                    ? "bg-[#0A0A0E] text-white font-bold shadow-xs"
                    : "text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-black/5"
                )}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7A8A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search briefs, brands, or niches..."
            className="w-full bg-white border border-black/8 rounded-2xl pl-9 pr-3 py-2 text-xs font-medium text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/20 shadow-xs transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <CreativeLoader
          size="md"
          label="Loading Campaigns"
          subtext="Fetching open sponsorship briefs..."
        />
      ) : campaigns.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-black/8 p-6 space-y-2 shadow-xs">
          <Compass className="w-7 h-7 text-[#7A7A8A] mx-auto" />
          <h3 className="text-sm font-bold text-[#0A0A0E] font-display">No campaigns found</h3>
          <p className="text-xs text-[#6A6A78]">Try selecting a different category or clearing search filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {campaigns.map((camp) => (
            <CampaignCard key={camp.id} campaign={camp} />
          ))}
        </div>
      )}
    </div>
  );
}
