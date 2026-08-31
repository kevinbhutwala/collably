"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { campaignService } from "@/services/campaign.service";
import { Campaign, CreatorCategory } from "@/core/types";
import { useAuthStore } from "@/stores/auth.store";
import { CATEGORIES } from "@/core/constants";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Search, Compass } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AppCampaignsPage() {
  const { currentCreator } = useAuthStore();
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-brand-accent">
              Creator Marketplace
            </span>
            <span className="text-slate-300">•</span>
            <Badge variant="glow" size="sm">Escrow Backed</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Discover Campaign Briefs
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Apply to verified brand briefs with customized creative pitches and guaranteed escrow milestones.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
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
  );
}
