"use client";

import React, { useState, useEffect } from "react";
import { campaignService } from "@/services/campaign.service";
import { Campaign, CreatorCategory } from "@/core/types";
import { CATEGORIES } from "@/core/constants";
import { CampaignCard } from "@/components/campaigns/CampaignCard";
import { CreativeLoader } from "@/components/ui/CreativeLoader";
import { Search, Compass, Sparkles, Filter, Lock, AlertTriangle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAuthStore } from "@/stores/auth.store";
import { checkCreatorProfileStatus } from "@/core/utils/profileCompleteness";

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

  const { role, currentCreator } = useAuthStore();
  const profileStatus = checkCreatorProfileStatus(currentCreator);
  const isCreatorBlocked = role === "creator" && !profileStatus.canApplyToCampaigns;

  return (
    <div className="space-y-6 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
      {/* Desktop Header */}
      <div className="hidden lg:flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/8 dark:border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] dark:text-[#EAEAEF] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Campaign Marketplace
            </span>
            <span className="text-[#8A8A9A] dark:text-[#6A6A7E]">•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] dark:text-yellow-400 font-mono text-[10px] font-bold">
              Protected Brand Payments
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-[#0A0A0E] dark:text-white font-display tracking-tight">
            Discover Campaigns
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#A0A0B4]">
            Browse active brand projects with upfront funding and send your pitch.
          </p>
        </div>
      </div>

      {/* Profile Incomplete Application Lock Notice */}
      {isCreatorBlocked && (
        <div className="rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
              <Lock className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            </div>
            <div className="space-y-0.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200 font-display">
                  Campaign Applications Locked ({profileStatus.score}% Complete)
                </span>
                <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-800 dark:text-amber-300">
                  Profile Details Required
                </span>
              </div>
              <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] leading-relaxed">
                {profileStatus.unverifiedSocials.length > 0
                  ? `You have ${profileStatus.unverifiedSocials.length} connected channel(s) pending verification. Until all channels are verified, you cannot apply to campaigns.`
                  : "You must complete your creator profile (bio, rates, category, and connected channels) before you can apply to brand briefs."}
              </p>
            </div>
          </div>
          <Link href="/app/profile" className="shrink-0">
            <button className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-xs border border-black/10 transition-all cursor-pointer">
              <span>Complete Profile Details</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      )}

      {/* Redesigned Clean Segmented Category Tabs & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Segmented Scrollable Strip */}
        <div className="flex items-center gap-1 p-1 bg-[#F4F4F8] dark:bg-[#12121A] rounded-2xl border border-black/8 dark:border-white/10 overflow-x-auto no-scrollbar shadow-xs">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5",
              selectedCategory === "all"
                ? "bg-white dark:bg-[#1E1E2C] text-[#0A0A0E] dark:text-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-black/8 dark:border-white/10"
                : "text-[#5A5A68] dark:text-[#A0A0B4] hover:text-[#0A0A0E] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
            )}
          >
            <Sparkles className={cn("w-3.5 h-3.5", selectedCategory === "all" ? "text-[#8A7000] dark:text-[#FFD21F]" : "text-[#7A7A8A] dark:text-[#8E8EA4]")} />
            <span>All Campaigns</span>
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
                    ? "bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] font-bold shadow-xs"
                    : "text-[#5A5A68] dark:text-[#A0A0B4] hover:text-[#0A0A0E] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7A8A] dark:text-[#8E8EA4]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search campaigns, brands, or topics..."
            className="w-full bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 rounded-2xl pl-9 pr-3 py-2 text-xs font-medium text-[#0A0A0E] dark:text-white placeholder:text-[#8A8A9A] dark:placeholder:text-[#6A6A7E] focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/20 shadow-xs transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <CreativeLoader
          size="md"
          label="Loading Campaigns"
          subtext="Finding the latest brand campaigns..."
        />
      ) : campaigns.length === 0 ? (
        <div className="py-16 text-center rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-6 space-y-2 shadow-xs">
          <Compass className="w-7 h-7 text-[#7A7A8A] dark:text-[#8E8EA4] mx-auto" />
          <h3 className="text-sm font-bold text-[#0A0A0E] dark:text-white font-display">No campaigns found</h3>
          <p className="text-xs text-[#6A6A78] dark:text-[#A0A0B4]">Try selecting another category or typing different search terms.</p>
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
