"use client";

import React from "react";
import { useFilterStore } from "@/stores/filter.store";
import { CATEGORIES, PLATFORMS } from "@/core/constants";
import { CreatorCategory } from "@/core/types";
import { Search, Filter, RotateCcw, Check, Sparkles, SlidersHorizontal } from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { cn } from "@/lib/utils";

export function CreatorFilterPanel() {
  const {
    creatorCategory,
    creatorPlatform,
    creatorMinFollowers,
    creatorMinEngagement,
    creatorSearchQuery,
    creatorVerifiedOnly,
    setCreatorCategory,
    setCreatorPlatform,
    setCreatorMinFollowers,
    setCreatorMinEngagement,
    setCreatorSearchQuery,
    setCreatorVerifiedOnly,
    resetCreatorFilters,
  } = useFilterStore();

  const followerTiers = [
    { label: "All Tiers", val: 0 },
    { label: "10K+", val: 10000 },
    { label: "50K+", val: 50000 },
    { label: "100K+", val: 10000 },
    { label: "500K+", val: 500000 },
  ];

  return (
    <div className="p-6 rounded-3xl bg-white border border-black/8 shadow-xs space-y-5 text-[#0A0A0E] select-none font-sans">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-black/8">
        <div className="flex items-center gap-2 text-[#0A0A0E] font-bold text-sm font-display">
          <SlidersHorizontal className="w-4 h-4 text-[#8A7000]" />
          <span>Talent Filters</span>
        </div>
        <button
          onClick={resetCreatorFilters}
          className="text-xs text-[#7A7A8A] hover:text-[#0A0A0E] flex items-center gap-1 transition-colors font-bold"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#0A0A0E]">Search Creators</label>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7A8A]" />
          <input
            type="text"
            value={creatorSearchQuery}
            onChange={(e) => setCreatorSearchQuery(e.target.value)}
            placeholder="Search by name, handle, niche..."
            className="w-full bg-[#F5F5F9] border border-black/8 rounded-2xl pl-9 pr-3 py-2 text-xs font-medium text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/20 focus:bg-white transition-all shadow-2xs"
          />
        </div>
      </div>

      {/* Primary Category Dropdown */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#0A0A0E]">Content Category</label>
        <select
          value={creatorCategory || "all"}
          onChange={(e) =>
            setCreatorCategory(e.target.value as CreatorCategory | "all")
          }
          className="w-full bg-[#F5F5F9] border border-black/8 rounded-2xl px-3.5 py-2 text-xs font-semibold text-[#0A0A0E] focus:outline-none focus:border-[#FFD21F] focus:bg-white transition-all shadow-2xs"
        >
          <option value="all" className="bg-white text-[#0A0A0E]">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-white text-[#0A0A0E]">
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Primary Social Channel Selector */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#0A0A0E]">Primary Platform</label>
        <div className="grid grid-cols-2 gap-1.5">
          {PLATFORMS.map((p) => {
            const isSelected = creatorPlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setCreatorPlatform(isSelected ? "all" : p.id)}
                className={cn(
                  "py-2 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between gap-1.5",
                  isSelected
                    ? "bg-[#0A0A0E] text-white border-black shadow-xs"
                    : "bg-[#F8F8FC] border-black/6 text-[#5A5A68] hover:bg-black/5 hover:text-[#0A0A0E]"
                )}
              >
                <div className="flex items-center gap-1.5">
                  <SocialIcon platform={p.id as any} className="w-3.5 h-3.5" />
                  <span className="capitalize text-[11px]">{p.name}</span>
                </div>
                {isSelected && <Check className="w-3 h-3 text-[#FFD21F]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Follower Minimum Reach */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#0A0A0E]">Minimum Follower Reach</label>
        <div className="flex flex-wrap gap-1.5">
          {followerTiers.map((tier) => {
            const isSelected = creatorMinFollowers === tier.val;
            return (
              <button
                key={tier.val}
                onClick={() => setCreatorMinFollowers(tier.val)}
                className={cn(
                  "px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all",
                  isSelected
                    ? "bg-[#FFD21F] text-[#0A0A0E] border-black/10 shadow-xs"
                    : "bg-[#F8F8FC] border-black/5 text-[#5A5A68] hover:bg-black/5 hover:text-[#0A0A0E]"
                )}
              >
                {tier.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Verified Only Toggle */}
      <div className="pt-3 border-t border-black/8 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-[#0A0A0E]">Verified Talent Only</p>
          <p className="text-[10px] text-[#7A7A8A]">Audited media kit &amp; analytics</p>
        </div>
        <button
          onClick={() => setCreatorVerifiedOnly(!creatorVerifiedOnly)}
          className={cn(
            "w-11 h-6 rounded-full transition-colors relative",
            creatorVerifiedOnly ? "bg-[#FFD21F]" : "bg-black/15"
          )}
        >
          <div
            className={cn(
              "w-4 h-4 rounded-full bg-white transition-transform absolute top-1 shadow-xs",
              creatorVerifiedOnly ? "right-1" : "left-1"
            )}
          />
        </button>
      </div>
    </div>
  );
}
