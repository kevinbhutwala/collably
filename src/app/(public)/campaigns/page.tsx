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
    <div className="py-12 sm:py-16 bg-[#0a070a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] text-xs font-semibold font-mono">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Pre-Funded Escrow Briefs</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Live Campaign Briefs
          </h1>
          <p className="text-base text-slate-300 font-sans">
            Discover opportunities from premier verified brands. Pitch custom creative angles and receive guaranteed milestone payouts.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 no-scrollbar">
            <button
              onClick={() => setSelectedCategory("all")}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-medium transition-all select-none whitespace-nowrap font-display",
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold shadow-md shadow-pink-500/25"
                  : "bg-white/[0.05] text-slate-300 hover:text-white border border-white/10"
              )}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-full text-xs font-medium transition-all select-none whitespace-nowrap font-display",
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold shadow-md shadow-pink-500/25"
                    : "bg-white/[0.05] text-slate-300 hover:text-white border border-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search briefs or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.05] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[hsl(327,100%,50%)]/50 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Showing {campaigns.length} live campaign briefs</span>
            <Badge variant="glow" size="sm">Pre-Funded Escrow</Badge>
          </div>

          {loading ? (
            <div className="py-24 text-center">
              <div className="w-8 h-8 rounded-full border-2 border-[hsl(327,100%,50%)] border-t-transparent animate-spin mx-auto" />
            </div>
          ) : campaigns.length === 0 ? (
            <div className="py-24 text-center rounded-3xl bg-[#120c16] border border-white/10 p-8 space-y-3 shadow-card text-white">
              <Sparkles className="w-8 h-8 text-[hsl(327,100%,55%)] mx-auto" />
              <h3 className="text-base font-bold text-white font-display">No campaigns match your search</h3>
              <p className="text-xs text-slate-400 font-sans">Check back shortly or browse all categories.</p>
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
