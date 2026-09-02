"use client";

import React, { useState, useRef, useEffect } from "react";
import { useFilterStore } from "@/stores/filter.store";
import { CATEGORIES, PLATFORMS } from "@/core/constants";
import { CreatorCategory } from "@/core/types";
import {
  Search,
  ChevronDown,
  SlidersHorizontal,
  RotateCcw,
  Check,
  X,
  ShieldCheck,
  Flame,
  Users,
  Sparkles,
} from "lucide-react";
import { SocialIcon } from "@/components/ui/SocialIcons";
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

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (barRef.current && !barRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const followerTiers = [
    { label: "Any Audience", val: 0 },
    { label: "10K+ Followers", val: 10000 },
    { label: "50K+ Followers", val: 50000 },
    { label: "100K+ Followers", val: 100000 },
    { label: "500K+ Followers", val: 500000 },
  ];

  const engagementTiers = [
    { label: "Any Engagement", val: 0 },
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
    <div className="space-y-3 font-sans select-none" ref={barRef}>
      {/* ── TOP INTERACTIVE DROPDOWN FILTER COMMAND DOCK ── */}
      <div className="p-2 sm:p-2.5 rounded-3xl bg-white border border-black/8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-2.5">
        {/* Search Omnibox */}
        <div className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7A8A]" />
          <input
            type="text"
            value={creatorSearchQuery}
            onChange={(e) => setCreatorSearchQuery(e.target.value)}
            placeholder="Search creators by name, handle, bio..."
            className="w-full bg-[#F5F5F9] border border-black/8 rounded-2xl pl-9 pr-7 py-2 text-xs font-medium text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/20 focus:bg-white transition-all"
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

        {/* Dropdown Filters Strip */}
        <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto no-scrollbar">
          {/* 1. Category Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown(activeDropdown === "category" ? null : "category")
              }
              className={cn(
                "px-3 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 border shrink-0",
                creatorCategory !== "all"
                  ? "bg-[#0A0A0E] text-white border-black shadow-xs"
                  : "bg-[#F8F8FC] border-black/8 text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-black/5"
              )}
            >
              <Sparkles className={cn("w-3 h-3", creatorCategory !== "all" ? "text-[#FFD21F]" : "text-[#7A7A8A]")} />
              <span className="truncate max-w-[120px]">
                {creatorCategory === "all" ? "Category" : creatorCategory}
              </span>
              <ChevronDown className={cn("w-3 h-3 transition-transform", activeDropdown === "category" ? "rotate-180" : "")} />
            </button>

            {activeDropdown === "category" && (
              <div className="absolute top-full left-0 mt-1.5 w-60 rounded-2xl bg-white border border-black/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-64 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => {
                    setCreatorCategory("all");
                    setActiveDropdown(null);
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-xl text-xs text-left transition-colors flex items-center justify-between",
                    creatorCategory === "all" ? "bg-[#FFFDF5] font-bold text-[#0A0A0E]" : "hover:bg-black/5 text-[#5A5A68]"
                  )}
                >
                  <span>All Categories</span>
                  {creatorCategory === "all" && <Check className="w-3.5 h-3.5 text-[#8A7000]" />}
                </button>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCreatorCategory(cat);
                      setActiveDropdown(null);
                    }}
                    className={cn(
                      "w-full px-3 py-2 rounded-xl text-xs text-left transition-colors flex items-center justify-between",
                      creatorCategory === cat ? "bg-[#FFFDF5] font-bold text-[#0A0A0E]" : "hover:bg-black/5 text-[#5A5A68]"
                    )}
                  >
                    <span className="truncate">{cat}</span>
                    {creatorCategory === cat && <Check className="w-3.5 h-3.5 text-[#8A7000]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Platform Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown(activeDropdown === "platform" ? null : "platform")
              }
              className={cn(
                "px-3 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 border shrink-0",
                creatorPlatform !== "all"
                  ? "bg-[#0A0A0E] text-white border-black shadow-xs"
                  : "bg-[#F8F8FC] border-black/8 text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-black/5"
              )}
            >
              {creatorPlatform !== "all" ? (
                <SocialIcon platform={creatorPlatform as any} className="w-3 h-3" />
              ) : (
                <Users className="w-3 h-3 text-[#7A7A8A]" />
              )}
              <span className="capitalize truncate max-w-[100px]">
                {creatorPlatform === "all" ? "Platform" : creatorPlatform}
              </span>
              <ChevronDown className={cn("w-3 h-3 transition-transform", activeDropdown === "platform" ? "rotate-180" : "")} />
            </button>

            {activeDropdown === "platform" && (
              <div className="absolute top-full left-0 mt-1.5 w-56 rounded-2xl bg-white border border-black/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <button
                  type="button"
                  onClick={() => {
                    setCreatorPlatform("all");
                    setActiveDropdown(null);
                  }}
                  className={cn(
                    "w-full px-3 py-2 rounded-xl text-xs text-left transition-colors flex items-center justify-between",
                    creatorPlatform === "all" ? "bg-[#FFFDF5] font-bold text-[#0A0A0E]" : "hover:bg-black/5 text-[#5A5A68]"
                  )}
                >
                  <span>All Platforms</span>
                  {creatorPlatform === "all" && <Check className="w-3.5 h-3.5 text-[#8A7000]" />}
                </button>
                {PLATFORMS.map((plat) => (
                  <button
                    key={plat.id}
                    type="button"
                    onClick={() => {
                      setCreatorPlatform(plat.id);
                      setActiveDropdown(null);
                    }}
                    className={cn(
                      "w-full px-3 py-2 rounded-xl text-xs text-left transition-colors flex items-center justify-between gap-2",
                      creatorPlatform === plat.id ? "bg-[#FFFDF5] font-bold text-[#0A0A0E]" : "hover:bg-black/5 text-[#5A5A68]"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <SocialIcon platform={plat.id as any} className="w-3.5 h-3.5" />
                      <span className="capitalize">{plat.name}</span>
                    </div>
                    {creatorPlatform === plat.id && <Check className="w-3.5 h-3.5 text-[#8A7000]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Follower Reach Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown(activeDropdown === "reach" ? null : "reach")
              }
              className={cn(
                "px-3 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 border shrink-0",
                creatorMinFollowers > 0
                  ? "bg-[#0A0A0E] text-white border-black shadow-xs"
                  : "bg-[#F8F8FC] border-black/8 text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-black/5"
              )}
            >
              <Users className={cn("w-3 h-3", creatorMinFollowers > 0 ? "text-[#FFD21F]" : "text-[#7A7A8A]")} />
              <span>
                {creatorMinFollowers > 0 ? `${creatorMinFollowers / 1000}K+ Reach` : "Reach"}
              </span>
              <ChevronDown className={cn("w-3 h-3 transition-transform", activeDropdown === "reach" ? "rotate-180" : "")} />
            </button>

            {activeDropdown === "reach" && (
              <div className="absolute top-full left-0 mt-1.5 w-52 rounded-2xl bg-white border border-black/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                {followerTiers.map((tier) => (
                  <button
                    key={tier.val}
                    type="button"
                    onClick={() => {
                      setCreatorMinFollowers(tier.val);
                      setActiveDropdown(null);
                    }}
                    className={cn(
                      "w-full px-3 py-2 rounded-xl text-xs text-left font-mono font-bold transition-colors flex items-center justify-between",
                      creatorMinFollowers === tier.val ? "bg-[#FFFDF5] text-[#0A0A0E]" : "hover:bg-black/5 text-[#5A5A68]"
                    )}
                  >
                    <span>{tier.label}</span>
                    {creatorMinFollowers === tier.val && <Check className="w-3.5 h-3.5 text-[#8A7000]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Engagement Rate Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown(activeDropdown === "engagement" ? null : "engagement")
              }
              className={cn(
                "px-3 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 border shrink-0",
                creatorMinEngagement > 0
                  ? "bg-[#0A0A0E] text-white border-black shadow-xs"
                  : "bg-[#F8F8FC] border-black/8 text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-black/5"
              )}
            >
              <Flame className={cn("w-3 h-3", creatorMinEngagement > 0 ? "text-amber-400" : "text-[#7A7A8A]")} />
              <span>
                {creatorMinEngagement > 0 ? `>${creatorMinEngagement}% ER` : "Engagement"}
              </span>
              <ChevronDown className={cn("w-3 h-3 transition-transform", activeDropdown === "engagement" ? "rotate-180" : "")} />
            </button>

            {activeDropdown === "engagement" && (
              <div className="absolute top-full left-0 mt-1.5 w-48 rounded-2xl bg-white border border-black/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                {engagementTiers.map((tier) => (
                  <button
                    key={tier.val}
                    type="button"
                    onClick={() => {
                      setCreatorMinEngagement(tier.val);
                      setActiveDropdown(null);
                    }}
                    className={cn(
                      "w-full px-3 py-2 rounded-xl text-xs text-left font-mono font-bold transition-colors flex items-center justify-between",
                      creatorMinEngagement === tier.val ? "bg-[#FFFDF5] text-[#0A0A0E]" : "hover:bg-black/5 text-[#5A5A68]"
                    )}
                  >
                    <span>{tier.label}</span>
                    {creatorMinEngagement === tier.val && <Check className="w-3.5 h-3.5 text-[#8A7000]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. Verified Only Toggle Button */}
          <button
            type="button"
            onClick={() => setCreatorVerifiedOnly(!creatorVerifiedOnly)}
            className={cn(
              "px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 border shrink-0",
              creatorVerifiedOnly
                ? "bg-[#FFFDF5] text-emerald-800 border-emerald-300 shadow-2xs"
                : "bg-[#F8F8FC] border-black/8 text-[#5A5A68] hover:text-[#0A0A0E] hover:bg-black/5"
            )}
          >
            <ShieldCheck className={cn("w-3.5 h-3.5", creatorVerifiedOnly ? "text-emerald-600" : "text-[#7A7A8A]")} />
            <span>Verified</span>
            {creatorVerifiedOnly && <Check className="w-3 h-3 text-emerald-700" />}
          </button>

          {/* Reset All Filters Button (when active) */}
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
              <SocialIcon platform={creatorPlatform as any} className="w-3 h-3" />
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
