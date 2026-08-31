"use client";

import React, { useEffect, useState } from "react";
import { campaignService } from "@/services/campaign.service";
import { Campaign, CreatorCategory } from "@/core/types";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { CATEGORIES } from "@/core/constants";
import { Badge } from "@/components/ui/Badge";
import { Sparkles, Search, Compass } from "lucide-react";
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
    <div className="py-12 sm:py-16 bg-slate-50/50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-brand-accent text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pre-Funded Escrow Briefs</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Live Campaign Briefs
          </h1>
          <p className="text-base text-slate-600">
            Discover opportunities from premier verified brands. Pitch custom creative angles and receive guaranteed milestone payouts.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-medium transition-all select-none whitespace-nowrap",
                selectedCategory === "all"
                  ? "bg-slate-900 text-white font-bold shadow-sm"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
              )}
            >
              All Categories
            </button>
            {CATEGORIES.slice(0, 5).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-xs font-medium transition-all select-none whitespace-nowrap",
                  selectedCategory === cat
                    ? "bg-slate-900 text-white font-bold shadow-sm"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search campaigns, brands..."
              className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="py-24 text-center">
            <div className="w-8 h-8 rounded-full border-2 border-brand-accent border-t-transparent animate-spin mx-auto" />
          </div>
        ) : campaigns.length === 0 ? (
          <div className="py-24 text-center rounded-3xl bg-white border border-slate-200 p-8 space-y-3 shadow-card">
            <Compass className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No campaigns found</h3>
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
