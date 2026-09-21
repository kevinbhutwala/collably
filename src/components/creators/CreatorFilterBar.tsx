"use client";

import React, { useState, useRef, useEffect } from "react";
import { useFilterStore } from "@/stores/filter.store";
import { CATEGORIES, PLATFORMS, GLOBAL_HUBS } from "@/core/constants";
import { CreatorCategory } from "@/core/types";
import {
  Search,
  ChevronDown,
  RotateCcw,
  Check,
  X,
  ShieldCheck,
  Flame,
  Users,
  Sparkles,
  SlidersHorizontal,
  MapPin,
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
    creatorLocation,
    setCreatorCategory,
    setCreatorPlatform,
    setCreatorMinFollowers,
    setCreatorMinEngagement,
    setCreatorSearchQuery,
    setCreatorVerifiedOnly,
    setCreatorLocation,
    resetCreatorFilters,
  } = useFilterStore();

  const [openDropdown, setOpenDropdown] = useState<"category" | "platform" | "reach" | "engagement" | "location" | null>(null);
  const barContainerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (barContainerRef.current && !barContainerRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const followerTiers = [
    { label: "All Audience Sizes", subtext: "No minimum follower reach", val: 0 },
    { label: "10K+ Followers", subtext: "Micro-tier creators", val: 10000 },
    { label: "50K+ Followers", subtext: "Mid-tier creators", val: 50000 },
    { label: "100K+ Followers", subtext: "Macro-tier creators", val: 100000 },
    { label: "500K+ Followers", subtext: "Mega / Celebrity creators", val: 500000 },
  ];

  const engagementTiers = [
    { label: "All Engagement Rates", subtext: "Standard telemetry", val: 0 },
    { label: "> 2.5% Engagement", subtext: "Healthy baseline engagement", val: 2.5 },
    { label: "> 4.0% Engagement", subtext: "High viral audience retention", val: 4.0 },
    { label: "> 6.0% Engagement", subtext: "Elite top 1% community loyalty", val: 6.0 },
  ];

  let activeFilterCount = 0;
  if (creatorCategory !== "all") activeFilterCount++;
  if (creatorPlatform !== "all") activeFilterCount++;
  if (creatorMinFollowers > 0) activeFilterCount++;
  if (creatorMinEngagement > 0) activeFilterCount++;
  if (creatorLocation !== "all" && creatorLocation) activeFilterCount++;
  if (creatorVerifiedOnly) activeFilterCount++;

  return (
    <div className="space-y-3 font-sans select-none relative z-30" ref={barContainerRef}>
      {/* ── TOP LUXURY DROPDOWN FILTER COMMAND DOCK ── */}
      <div className="p-3 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        {/* Search Omnibox */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7A8A] dark:text-[#8E8EA4]" />
          <input
            type="text"
            value={creatorSearchQuery}
            onChange={(e) => setCreatorSearchQuery(e.target.value)}
            placeholder="Search creators by name, handle, bio..."
            className="w-full bg-[#F5F5F9] dark:bg-[#181824] border border-black/8 dark:border-white/10 rounded-2xl pl-9 pr-7 py-2.5 text-xs font-medium text-[#0A0A0E] dark:text-white placeholder:text-[#8A8A9A] dark:placeholder:text-[#6E6E80] focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/20 focus:bg-white dark:focus:bg-[#181824] transition-all shadow-2xs"
          />
          {creatorSearchQuery && (
            <button
              onClick={() => setCreatorSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Custom Interactive Dropdowns Cluster */}
        <div className="flex flex-wrap items-center gap-2">
          {/* 1. Category Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
              className={cn(
                "px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border shadow-2xs",
                creatorCategory !== "all"
                  ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] border-black dark:border-[#FFD21F]"
                  : openDropdown === "category"
                  ? "bg-white dark:bg-[#181824] border-[#FFD21F] text-[#0A0A0E] dark:text-white ring-2 ring-[#FFD21F]/20"
                  : "bg-[#F8F8FC] dark:bg-[#181824] border-black/8 dark:border-white/10 text-[#4A4A58] dark:text-[#B0B0C4] hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#0A0A0E] dark:hover:text-white"
              )}
            >
              <Sparkles className={cn("w-3.5 h-3.5", creatorCategory !== "all" ? "text-[#FFD21F] dark:text-[#0A0A0E]" : "text-[#7A7A8A] dark:text-[#8E8EA4]")} />
              <span className="truncate max-w-[130px]">
                {creatorCategory === "all" ? "Category" : creatorCategory}
              </span>
              <ChevronDown
                className={cn(
                  "w-3 h-3 transition-transform duration-200 text-[#7A7A8A] dark:text-[#8E8EA4]",
                  openDropdown === "category" ? "rotate-180 text-[#0A0A0E] dark:text-white" : ""
                )}
              />
            </button>

            {openDropdown === "category" && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#151522] border border-black/10 dark:border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-72 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => {
                    setCreatorCategory("all");
                    setOpenDropdown(null);
                  }}
                  className={cn(
                    "w-full px-3 py-2.5 rounded-xl text-xs text-left transition-colors flex items-center justify-between font-semibold",
                    creatorCategory === "all"
                      ? "bg-[#FFFDF5] dark:bg-[#FFD21F]/15 text-[#0A0A0E] dark:text-[#FFD21F] font-bold border border-[#FFD21F]/40"
                      : "hover:bg-black/5 dark:hover:bg-white/10 text-[#5A5A68] dark:text-[#B0B0C4]"
                  )}
                >
                  <span>All Categories</span>
                  {creatorCategory === "all" && <Check className="w-3.5 h-3.5 text-[#8A7000] dark:text-[#FFD21F]" />}
                </button>

                <div className="my-1 border-t border-black/5 dark:border-white/10" />

                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setCreatorCategory(cat);
                      setOpenDropdown(null);
                    }}
                    className={cn(
                      "w-full px-3 py-2 rounded-xl text-xs text-left transition-colors flex items-center justify-between",
                      creatorCategory === cat
                        ? "bg-[#FFFDF5] dark:bg-[#FFD21F]/15 text-[#0A0A0E] dark:text-[#FFD21F] font-bold border border-[#FFD21F]/40"
                        : "hover:bg-black/5 dark:hover:bg-white/10 text-[#4A4A58] dark:text-[#B0B0C4]"
                    )}
                  >
                    <span className="truncate">{cat}</span>
                    {creatorCategory === cat && <Check className="w-3.5 h-3.5 text-[#8A7000] dark:text-[#FFD21F]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Platform Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "platform" ? null : "platform")}
              className={cn(
                "px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border shadow-2xs",
                creatorPlatform !== "all"
                  ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] border-black dark:border-[#FFD21F]"
                  : openDropdown === "platform"
                  ? "bg-white dark:bg-[#181824] border-[#FFD21F] text-[#0A0A0E] dark:text-white ring-2 ring-[#FFD21F]/20"
                  : "bg-[#F8F8FC] dark:bg-[#181824] border-black/8 dark:border-white/10 text-[#4A4A58] dark:text-[#B0B0C4] hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#0A0A0E] dark:hover:text-white"
              )}
            >
              {creatorPlatform !== "all" ? (
                <SocialIcon platform={creatorPlatform as any} className="w-3.5 h-3.5" />
              ) : (
                <Users className="w-3.5 h-3.5 text-[#7A7A8A] dark:text-[#8E8EA4]" />
              )}
              <span className="capitalize truncate max-w-[110px]">
                {creatorPlatform === "all" ? "Platform" : creatorPlatform}
              </span>
              <ChevronDown
                className={cn(
                  "w-3 h-3 transition-transform duration-200 text-[#7A7A8A] dark:text-[#8E8EA4]",
                  openDropdown === "platform" ? "rotate-180 text-[#0A0A0E] dark:text-white" : ""
                )}
              />
            </button>

            {openDropdown === "platform" && (
              <div className="absolute top-full left-0 mt-2 w-60 rounded-2xl bg-white dark:bg-[#151522] border border-black/10 dark:border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <button
                  type="button"
                  onClick={() => {
                    setCreatorPlatform("all");
                    setOpenDropdown(null);
                  }}
                  className={cn(
                    "w-full px-3 py-2.5 rounded-xl text-xs text-left transition-colors flex items-center justify-between font-semibold",
                    creatorPlatform === "all"
                      ? "bg-[#FFFDF5] dark:bg-[#FFD21F]/15 text-[#0A0A0E] dark:text-[#FFD21F] font-bold border border-[#FFD21F]/40"
                      : "hover:bg-black/5 dark:hover:bg-white/10 text-[#5A5A68] dark:text-[#B0B0C4]"
                  )}
                >
                  <span>All Platforms</span>
                  {creatorPlatform === "all" && <Check className="w-3.5 h-3.5 text-[#8A7000] dark:text-[#FFD21F]" />}
                </button>

                <div className="my-1 border-t border-black/5 dark:border-white/10" />

                {PLATFORMS.map((plat) => (
                  <button
                    key={plat.id}
                    type="button"
                    onClick={() => {
                      setCreatorPlatform(plat.id);
                      setOpenDropdown(null);
                    }}
                    className={cn(
                      "w-full px-3 py-2 rounded-xl text-xs text-left transition-colors flex items-center justify-between gap-2",
                      creatorPlatform === plat.id
                        ? "bg-[#FFFDF5] dark:bg-[#FFD21F]/15 text-[#0A0A0E] dark:text-[#FFD21F] font-bold border border-[#FFD21F]/40"
                        : "hover:bg-black/5 dark:hover:bg-white/10 text-[#4A4A58] dark:text-[#B0B0C4]"
                    )}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-5 h-5 rounded-lg bg-black/5 dark:bg-white/10 flex items-center justify-center shrink-0">
                        <SocialIcon platform={plat.id as any} className="w-3.5 h-3.5" />
                      </div>
                      <span className="capitalize font-medium">{plat.name}</span>
                    </div>
                    {creatorPlatform === plat.id && <Check className="w-3.5 h-3.5 text-[#8A7000] dark:text-[#FFD21F]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 3. Follower Reach Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "reach" ? null : "reach")}
              className={cn(
                "px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border shadow-2xs font-mono",
                creatorMinFollowers > 0
                  ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] border-black dark:border-[#FFD21F]"
                  : openDropdown === "reach"
                  ? "bg-white dark:bg-[#181824] border-[#FFD21F] text-[#0A0A0E] dark:text-white ring-2 ring-[#FFD21F]/20"
                  : "bg-[#F8F8FC] dark:bg-[#181824] border-black/8 dark:border-white/10 text-[#4A4A58] dark:text-[#B0B0C4] hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#0A0A0E] dark:hover:text-white"
              )}
            >
              <SlidersHorizontal className={cn("w-3.5 h-3.5", creatorMinFollowers > 0 ? "text-[#FFD21F] dark:text-[#0A0A0E]" : "text-[#7A7A8A] dark:text-[#8E8EA4]")} />
              <span>
                {creatorMinFollowers > 0 ? `${creatorMinFollowers / 1000}K+ Reach` : "Audience Reach"}
              </span>
              <ChevronDown
                className={cn(
                  "w-3 h-3 transition-transform duration-200 text-[#7A7A8A] dark:text-[#8E8EA4]",
                  openDropdown === "reach" ? "rotate-180 text-[#0A0A0E] dark:text-white" : ""
                )}
              />
            </button>

            {openDropdown === "reach" && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#151522] border border-black/10 dark:border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                {followerTiers.map((tier) => (
                  <button
                    key={tier.val}
                    type="button"
                    onClick={() => {
                      setCreatorMinFollowers(tier.val);
                      setOpenDropdown(null);
                    }}
                    className={cn(
                      "w-full px-3 py-2.5 rounded-xl text-left transition-colors flex items-center justify-between gap-2",
                      creatorMinFollowers === tier.val
                        ? "bg-[#FFFDF5] dark:bg-[#FFD21F]/15 text-[#0A0A0E] dark:text-[#FFD21F] font-bold border border-[#FFD21F]/40"
                        : "hover:bg-black/5 dark:hover:bg-white/10 text-[#4A4A58] dark:text-[#B0B0C4]"
                    )}
                  >
                    <div>
                      <span className="block text-xs font-mono font-bold">{tier.label}</span>
                      <span className="block text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] font-sans font-normal">{tier.subtext}</span>
                    </div>
                    {creatorMinFollowers === tier.val && <Check className="w-3.5 h-3.5 text-[#8A7000] dark:text-[#FFD21F] shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Engagement Rate Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "engagement" ? null : "engagement")}
              className={cn(
                "px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border shadow-2xs font-mono",
                creatorMinEngagement > 0
                  ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] border-black dark:border-[#FFD21F]"
                  : openDropdown === "engagement"
                  ? "bg-white dark:bg-[#181824] border-[#FFD21F] text-[#0A0A0E] dark:text-white ring-2 ring-[#FFD21F]/20"
                  : "bg-[#F8F8FC] dark:bg-[#181824] border-black/8 dark:border-white/10 text-[#4A4A58] dark:text-[#B0B0C4] hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#0A0A0E] dark:hover:text-white"
              )}
            >
              <Flame className={cn("w-3.5 h-3.5 text-amber-500", creatorMinEngagement > 0 ? "fill-amber-400" : "")} />
              <span>
                {creatorMinEngagement > 0 ? `>${creatorMinEngagement}% ER` : "Engagement Rate"}
              </span>
              <ChevronDown
                className={cn(
                  "w-3 h-3 transition-transform duration-200 text-[#7A7A8A] dark:text-[#8E8EA4]",
                  openDropdown === "engagement" ? "rotate-180 text-[#0A0A0E] dark:text-white" : ""
                )}
              />
            </button>

            {openDropdown === "engagement" && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#151522] border border-black/10 dark:border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                {engagementTiers.map((tier) => (
                  <button
                    key={tier.val}
                    type="button"
                    onClick={() => {
                      setCreatorMinEngagement(tier.val);
                      setOpenDropdown(null);
                    }}
                    className={cn(
                      "w-full px-3 py-2.5 rounded-xl text-left transition-colors flex items-center justify-between gap-2",
                      creatorMinEngagement === tier.val
                        ? "bg-[#FFFDF5] dark:bg-[#FFD21F]/15 text-[#0A0A0E] dark:text-[#FFD21F] font-bold border border-[#FFD21F]/40"
                        : "hover:bg-black/5 dark:hover:bg-white/10 text-[#4A4A58] dark:text-[#B0B0C4]"
                    )}
                  >
                    <div>
                      <span className="block text-xs font-mono font-bold">{tier.label}</span>
                      <span className="block text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] font-sans font-normal">{tier.subtext}</span>
                    </div>
                    {creatorMinEngagement === tier.val && <Check className="w-3.5 h-3.5 text-[#8A7000] dark:text-[#FFD21F] shrink-0" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 5. Worldwide Hub / Location Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === "location" ? null : "location")}
              className={cn(
                "px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 border shadow-2xs",
                creatorLocation !== "all" && creatorLocation && creatorLocation !== "Worldwide"
                  ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] border-black dark:border-[#FFD21F]"
                  : openDropdown === "location"
                  ? "bg-white dark:bg-[#181824] border-[#FFD21F] text-[#0A0A0E] dark:text-white ring-2 ring-[#FFD21F]/20"
                  : "bg-[#F8F8FC] dark:bg-[#181824] border-black/8 dark:border-white/10 text-[#4A4A58] dark:text-[#B0B0C4] hover:bg-black/5 dark:hover:bg-white/10 hover:text-[#0A0A0E] dark:hover:text-white"
              )}
            >
              <MapPin className={cn("w-3.5 h-3.5", creatorLocation !== "all" && creatorLocation && creatorLocation !== "Worldwide" ? "text-[#FFD21F] dark:text-[#0A0A0E]" : "text-[#7A7A8A] dark:text-[#8E8EA4]")} />
              <span className="truncate max-w-[120px]">
                {creatorLocation === "all" || !creatorLocation || creatorLocation === "Worldwide" ? "Worldwide Hub" : creatorLocation}
              </span>
              <ChevronDown
                className={cn(
                  "w-3 h-3 transition-transform duration-200 text-[#7A7A8A] dark:text-[#8E8EA4]",
                  openDropdown === "location" ? "rotate-180 text-[#0A0A0E] dark:text-white" : ""
                )}
              />
            </button>

            {openDropdown === "location" && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-white dark:bg-[#151522] border border-black/10 dark:border-white/10 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100 max-h-72 overflow-y-auto">
                <button
                  type="button"
                  onClick={() => {
                    setCreatorLocation("all");
                    setOpenDropdown(null);
                  }}
                  className={cn(
                    "w-full px-3 py-2.5 rounded-xl text-xs text-left transition-colors flex items-center justify-between font-semibold",
                    creatorLocation === "all" || !creatorLocation
                      ? "bg-[#FFFDF5] dark:bg-[#FFD21F]/15 text-[#0A0A0E] dark:text-[#FFD21F] font-bold border border-[#FFD21F]/40"
                      : "hover:bg-black/5 dark:hover:bg-white/10 text-[#5A5A68] dark:text-[#B0B0C4]"
                  )}
                >
                  <span>Worldwide (All Locations)</span>
                  {(creatorLocation === "all" || !creatorLocation) && <Check className="w-3.5 h-3.5 text-[#8A7000] dark:text-[#FFD21F]" />}
                </button>

                <div className="my-1 border-t border-black/5 dark:border-white/10" />

                {GLOBAL_HUBS.filter(h => h !== "Worldwide").map((hub) => (
                  <button
                    key={hub}
                    type="button"
                    onClick={() => {
                      setCreatorLocation(hub);
                      setOpenDropdown(null);
                    }}
                    className={cn(
                      "w-full px-3 py-2 rounded-xl text-xs text-left transition-colors flex items-center justify-between",
                      creatorLocation === hub
                        ? "bg-[#FFFDF5] dark:bg-[#FFD21F]/15 text-[#0A0A0E] dark:text-[#FFD21F] font-bold border border-[#FFD21F]/40"
                        : "hover:bg-black/5 dark:hover:bg-white/10 text-[#4A4A58] dark:text-[#B0B0C4]"
                    )}
                  >
                    <span className="truncate">{hub}</span>
                    {creatorLocation === hub && <Check className="w-3.5 h-3.5 text-[#8A7000] dark:text-[#FFD21F]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 6. Verified Talent Toggle Button */}
          <button
            type="button"
            onClick={() => setCreatorVerifiedOnly(!creatorVerifiedOnly)}
            className={cn(
              "px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-2xs shrink-0",
              creatorVerifiedOnly
                ? "bg-[#FFFDF5] dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 border-emerald-400 dark:border-emerald-600 font-black shadow-xs"
                : "bg-[#F8F8FC] dark:bg-[#181824] border-black/8 dark:border-white/10 text-[#4A4A58] dark:text-[#B0B0C4] hover:text-[#0A0A0E] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
            )}
          >
            <ShieldCheck className={cn("w-3.5 h-3.5", creatorVerifiedOnly ? "text-emerald-600 dark:text-emerald-400" : "text-[#7A7A8A] dark:text-[#8E8EA4]")} />
            <span>Verified Only</span>
            {creatorVerifiedOnly && <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />}
          </button>

          {/* 6. Reset Filters Button */}
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={resetCreatorFilters}
              className="px-3.5 py-2.5 rounded-2xl text-xs font-bold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 border border-red-200 dark:border-red-900/50 transition-colors flex items-center gap-1 shrink-0 font-mono"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset ({activeFilterCount})</span>
            </button>
          )}
        </div>
      </div>

      {/* ── ACTIVE REMOVABLE PILLS BAR (If any active) ── */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 px-1">
          <span className="text-[11px] font-bold text-[#7A7A8A] dark:text-[#8E8EA4] font-mono mr-1">Active:</span>

          {creatorCategory !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#181824] border border-black/10 dark:border-white/10 text-xs font-bold text-[#0A0A0E] dark:text-white shadow-2xs">
              <Sparkles className="w-3 h-3 text-[#8A7000] dark:text-[#FFD21F]" />
              <span>{creatorCategory}</span>
              <button onClick={() => setCreatorCategory("all")} className="hover:text-red-600 dark:hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {creatorPlatform !== "all" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#181824] border border-black/10 dark:border-white/10 text-xs font-bold text-[#0A0A0E] dark:text-white capitalize shadow-2xs">
              <SocialIcon platform={creatorPlatform as any} className="w-3 h-3" />
              <span>{creatorPlatform}</span>
              <button onClick={() => setCreatorPlatform("all")} className="hover:text-red-600 dark:hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {creatorMinFollowers > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#181824] border border-black/10 dark:border-white/10 text-xs font-bold text-[#0A0A0E] dark:text-white font-mono shadow-2xs">
              <Users className="w-3 h-3 text-[#7A7A8A] dark:text-[#8E8EA4]" />
              <span>{creatorMinFollowers / 1000}K+ Reach</span>
              <button onClick={() => setCreatorMinFollowers(0)} className="hover:text-red-600 dark:hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {creatorMinEngagement > 0 && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#181824] border border-black/10 dark:border-white/10 text-xs font-bold text-[#0A0A0E] dark:text-white font-mono shadow-2xs">
              <Flame className="w-3 h-3 text-amber-500" />
              <span>&gt; {creatorMinEngagement}% ER</span>
              <button onClick={() => setCreatorMinEngagement(0)} className="hover:text-red-600 dark:hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {creatorLocation !== "all" && creatorLocation && creatorLocation !== "Worldwide" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#181824] border border-black/10 dark:border-white/10 text-xs font-bold text-[#0A0A0E] dark:text-white shadow-2xs">
              <MapPin className="w-3 h-3 text-[#8A7000] dark:text-[#FFD21F]" />
              <span>{creatorLocation}</span>
              <button onClick={() => setCreatorLocation("all")} className="hover:text-red-600 dark:hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {creatorVerifiedOnly && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white dark:bg-[#181824] border border-black/10 dark:border-white/10 text-xs font-bold text-emerald-800 dark:text-emerald-300 shadow-2xs">
              <ShieldCheck className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
              <span>Verified Only</span>
              <button onClick={() => setCreatorVerifiedOnly(false)} className="hover:text-red-600 dark:hover:text-red-400">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
}
