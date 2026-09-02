"use client";

import React from "react";
import { useFilterStore } from "@/stores/filter.store";
import { CATEGORIES, PLATFORMS } from "@/core/constants";
import { CreatorCategory } from "@/core/types";
import {
  Search,
  ChevronDown,
  RotateCcw,
  X,
  ShieldCheck,
  Flame,
  Users,
  Sparkles,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function CreatorFilterBar() {
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
    { label: "All Reach", val: 0 },
    { label: "10K+ Followers", val: 10000 },
    { label: "50K+ Followers", val: 50000 },
    { label: "100K+ Followers", val: 100000 },
    { label: "500K+ Followers", val: 500000 },
  ];

  const engagementTiers = [
    { label: "All Engagement", val: 0 },
    { label: "> 2.5% ER", val: 2.5 },
    { label: "> 4.0% ER", val: 4.0 },
    { label: "> 6.0% ER", val: 6.0 },
  ];

  let activeFilterCount = 0;
  if (creatorCategory !== "all") activeFilterCount++;
  if (creatorPlatform !== "all") activeFilterCount++;
  if (creatorMinFollowers > 0) activeFilterCount++;
  if (creatorMinEngagement > 0) activeFilterCount++;
  if (creatorVerifiedOnly) activeFilterCount++;

  return (
    <div className="space-y-3 font-sans select-none">
      {/* ── TOP DROPDOWN FILTER COMMAND DOCK ── */}
      <div className="p-3 rounded-3xl bg-white border border-black/8 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Keyword Search Omnibox */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7A8A]" />
          <input
            type="text"
            value={creatorSearchQuery}
            onChange={(e) => setCreatorSearchQuery(e.target.value)}
            placeholder="Search creators by name, handle, bio..."
            className="w-full bg-[#F5F5F9] border border-black/8 rounded-2xl pl-9 pr-7 py-2 text-xs font-medium text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/20 focus:bg-white transition-all shadow-2xs"
          />
          {creatorSearchQuery && (
            <button
              onClick={() => setCreatorSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7A7A8A] hover:text-[#0A0A0E]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Dropdowns Control Cluster */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 1. Category Dropdown */}
          <div className="relative inline-flex items-center">
            <div className="absolute left-3 pointer-events-none text-[#7A7A8A]">
              <Sparkles className="w-3 h-3" />
            </div>
            <select
              value={creatorCategory || "all"}
              onChange={(e) => setCreatorCategory(e.target.value as CreatorCategory | "all")}
              className={cn(
                "appearance-none pl-8 pr-7 py-2 rounded-2xl text-xs font-bold transition-all border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFD21F]/30 shadow-2xs",
                creatorCategory !== "all"
                  ? "bg-[#0A0A0E] text-white border-black"
                  : "bg-[#F8F8FC] border-black/8 text-[#4A4A58] hover:bg-black/5 hover:text-[#0A0A0E]"
              )}
            >
              <option value="all" className="bg-white text-[#0A0A0E]">
                All Categories
              </option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-white text-[#0A0A0E]">
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 absolute right-2.5 pointer-events-none text-[#7A7A8A]" />
          </div>

          {/* 2. Platform Dropdown */}
          <div className="relative inline-flex items-center">
            <div className="absolute left-3 pointer-events-none text-[#7A7A8A]">
              <Users className="w-3 h-3" />
            </div>
            <select
              value={creatorPlatform || "all"}
              onChange={(e) => setCreatorPlatform(e.target.value as any)}
              className={cn(
                "appearance-none pl-8 pr-7 py-2 rounded-2xl text-xs font-bold transition-all border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFD21F]/30 shadow-2xs",
                creatorPlatform !== "all"
                  ? "bg-[#0A0A0E] text-white border-black"
                  : "bg-[#F8F8FC] border-black/8 text-[#4A4A58] hover:bg-black/5 hover:text-[#0A0A0E]"
              )}
            >
              <option value="all" className="bg-white text-[#0A0A0E]">
                All Platforms
              </option>
              {PLATFORMS.map((plat) => (
                <option key={plat.id} value={plat.id} className="bg-white text-[#0A0A0E] capitalize">
                  {plat.name}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 absolute right-2.5 pointer-events-none text-[#7A7A8A]" />
          </div>

          {/* 3. Follower Reach Dropdown */}
          <div className="relative inline-flex items-center">
            <div className="absolute left-3 pointer-events-none text-[#7A7A8A]">
              <SlidersHorizontal className="w-3 h-3" />
            </div>
            <select
              value={creatorMinFollowers}
              onChange={(e) => setCreatorMinFollowers(parseInt(e.target.value) || 0)}
              className={cn(
                "appearance-none pl-8 pr-7 py-2 rounded-2xl text-xs font-bold transition-all border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFD21F]/30 shadow-2xs font-mono",
                creatorMinFollowers > 0
                  ? "bg-[#0A0A0E] text-white border-black"
                  : "bg-[#F8F8FC] border-black/8 text-[#4A4A58] hover:bg-black/5 hover:text-[#0A0A0E]"
              )}
            >
              {followerTiers.map((tier) => (
                <option key={tier.val} value={tier.val} className="bg-white text-[#0A0A0E]">
                  {tier.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 absolute right-2.5 pointer-events-none text-[#7A7A8A]" />
          </div>

          {/* 4. Engagement Rate Dropdown */}
          <div className="relative inline-flex items-center">
            <div className="absolute left-3 pointer-events-none text-[#7A7A8A]">
              <Flame className="w-3 h-3 text-amber-500" />
            </div>
            <select
              value={creatorMinEngagement}
              onChange={(e) => setCreatorMinEngagement(parseFloat(e.target.value) || 0)}
              className={cn(
                "appearance-none pl-8 pr-7 py-2 rounded-2xl text-xs font-bold transition-all border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FFD21F]/30 shadow-2xs font-mono",
                creatorMinEngagement > 0
                  ? "bg-[#0A0A0E] text-white border-black"
                  : "bg-[#F8F8FC] border-black/8 text-[#4A4A58] hover:bg-black/5 hover:text-[#0A0A0E]"
              )}
            >
              {engagementTiers.map((tier) => (
                <option key={tier.val} value={tier.val} className="bg-white text-[#0A0A0E]">
                  {tier.label}
                </option>
              ))}
            </select>
            <ChevronDown className="w-3 h-3 absolute right-2.5 pointer-events-none text-[#7A7A8A]" />
          </div>

          {/* 5. Verified Talent Toggle Button */}
          <button
            type="button"
            onClick={() => setCreatorVerifiedOnly(!creatorVerifiedOnly)}
            className={cn(
              "px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-2xs shrink-0",
              creatorVerifiedOnly
                ? "bg-[#FFFDF5] text-emerald-900 border-emerald-400 font-black"
                : "bg-[#F8F8FC] border-black/8 text-[#4A4A58] hover:text-[#0A0A0E] hover:bg-black/5"
            )}
          >
            <ShieldCheck className={cn("w-3.5 h-3.5", creatorVerifiedOnly ? "text-emerald-600" : "text-[#7A7A8A]")} />
            <span>Verified Only</span>
          </button>

          {/* 6. Reset Filters Button */}
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetCreatorFilters}
              className="px-3 py-2 rounded-2xl text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors flex items-center gap-1 shrink-0 font-mono"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* ── ACTIVE REMOVABLE PILLS BAR (If any active) ── */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 px-1">
          <span className="text-[11px] font-bold text-[#7A7A8A] font-mono mr-1">Active:</span>

          {creatorCategory !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-black/10 text-xs font-bold text-[#0A0A0E] shadow-2xs">
              <span>{creatorCategory}</span>
              <button onClick={() => setCreatorCategory("all")} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {creatorPlatform !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-black/10 text-xs font-bold text-[#0A0A0E] capitalize shadow-2xs">
              <span>{creatorPlatform}</span>
              <button onClick={() => setCreatorPlatform("all")} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {creatorMinFollowers > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-black/10 text-xs font-bold text-[#0A0A0E] font-mono shadow-2xs">
              <span>{creatorMinFollowers / 1000}K+ Reach</span>
              <button onClick={() => setCreatorMinFollowers(0)} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {creatorMinEngagement > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-black/10 text-xs font-bold text-[#0A0A0E] font-mono shadow-2xs">
              <span>&gt; {creatorMinEngagement}% ER</span>
              <button onClick={() => setCreatorMinEngagement(0)} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {creatorVerifiedOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white border border-black/10 text-xs font-bold text-emerald-800 shadow-2xs">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>Verified Only</span>
              <button onClick={() => setCreatorVerifiedOnly(false)} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
