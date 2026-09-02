"use client";

import React from "react";
import { useFilterStore } from "@/stores/filter.store";
import { CATEGORIES, PLATFORMS } from "@/core/constants";
import { CreatorCategory } from "@/core/types";
import { Search, RotateCcw, Check, Sparkles, SlidersHorizontal, X, ShieldCheck, Flame, Users } from "lucide-react";
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
    { label: "Any Reach", val: 0 },
    { label: "10K+", val: 10000 },
    { label: "50K+", val: 50000 },
    { label: "100K+", val: 100000 },
    { label: "500K+", val: 500000 },
  ];

  const engagementTiers = [
    { label: "Any ER", val: 0 },
    { label: "> 2.5%", val: 2.5 },
    { label: "> 4.0%", val: 4.0 },
    { label: "> 6.0%", val: 6.0 },
  ];

  // Calculate total active filters count
  let activeFilterCount = 0;
  if (creatorSearchQuery) activeFilterCount++;
  if (creatorCategory !== "all") activeFilterCount++;
  if (creatorPlatform !== "all") activeFilterCount++;
  if (creatorMinFollowers > 0) activeFilterCount++;
  if (creatorMinEngagement > 0) activeFilterCount++;
  if (creatorVerifiedOnly) activeFilterCount++;

  return (
    <div className="p-6 rounded-3xl bg-white border border-black/8 shadow-xs space-y-6 text-[#0A0A0E] select-none font-sans">
      {/* Panel Header */}
      <div className="flex items-center justify-between pb-4 border-b border-black/8">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-xl bg-[#FFD21F]/20 flex items-center justify-center text-[#0A0A0E]">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#0A0A0E]" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-[#0A0A0E] font-display leading-tight">
              Talent Filters
            </h3>
            <span className="text-[10px] text-[#7A7A8A] font-medium">
              Refine creator match
            </span>
          </div>
        </div>

        {activeFilterCount > 0 ? (
          <button
            onClick={resetCreatorFilters}
            className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors font-bold font-mono px-2.5 py-1 rounded-full bg-red-50 hover:bg-red-100"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Clear ({activeFilterCount})</span>
          </button>
        ) : (
          <span className="text-[10px] font-mono font-bold text-[#7A7A8A] px-2 py-0.5 rounded-full bg-[#F4F4F8]">
            Default
          </span>
        )}
      </div>

      {/* Active Filter Chips (Removable) */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1 pb-2 border-b border-black/5">
          {creatorCategory !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#FFFDF5] border border-[#FFD21F]/50 text-[11px] font-bold text-[#0A0A0E] shadow-2xs">
              <span>{creatorCategory}</span>
              <button onClick={() => setCreatorCategory("all")} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {creatorPlatform !== "all" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#FFFDF5] border border-[#FFD21F]/50 text-[11px] font-bold text-[#0A0A0E] capitalize shadow-2xs">
              <span>{creatorPlatform}</span>
              <button onClick={() => setCreatorPlatform("all")} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {creatorMinFollowers > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#FFFDF5] border border-[#FFD21F]/50 text-[11px] font-bold text-[#0A0A0E] shadow-2xs">
              <span>{creatorMinFollowers / 1000}K+ Reach</span>
              <button onClick={() => setCreatorMinFollowers(0)} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {creatorMinEngagement > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#FFFDF5] border border-[#FFD21F]/50 text-[11px] font-bold text-[#0A0A0E] shadow-2xs">
              <span>{creatorMinEngagement}%+ ER</span>
              <button onClick={() => setCreatorMinEngagement(0)} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {creatorVerifiedOnly && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#FFFDF5] border border-[#FFD21F]/50 text-[11px] font-bold text-[#0A0A0E] shadow-2xs">
              <span>Verified Only</span>
              <button onClick={() => setCreatorVerifiedOnly(false)} className="hover:text-red-600">
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}

      {/* Keyword Search Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#0A0A0E]">Search Talent</label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A7A8A]" />
          <input
            type="text"
            value={creatorSearchQuery}
            onChange={(e) => setCreatorSearchQuery(e.target.value)}
            placeholder="Search name, @handle, keywords..."
            className="w-full bg-[#F5F5F9] border border-black/8 rounded-2xl pl-9 pr-7 py-2.5 text-xs font-medium text-[#0A0A0E] placeholder:text-[#8A8A9A] focus:outline-none focus:border-[#FFD21F] focus:ring-2 focus:ring-[#FFD21F]/20 focus:bg-white transition-all shadow-2xs"
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
      </div>

      {/* Content Category Dropdown */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-[#0A0A0E]">Niche &amp; Content Category</label>
        <select
          value={creatorCategory || "all"}
          onChange={(e) =>
            setCreatorCategory(e.target.value as CreatorCategory | "all")
          }
          className="w-full bg-[#F5F5F9] border border-black/8 rounded-2xl px-3.5 py-2.5 text-xs font-semibold text-[#0A0A0E] focus:outline-none focus:border-[#FFD21F] focus:bg-white transition-all shadow-2xs"
        >
          <option value="all" className="bg-white text-[#0A0A0E]">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-white text-[#0A0A0E]">
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Social Platform Channels */}
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

      {/* Audience Reach Range */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#0A0A0E]">Minimum Audience</label>
          {creatorMinFollowers > 0 && (
            <span className="text-[10px] font-mono font-bold text-emerald-700">
              {creatorMinFollowers.toLocaleString()}+
            </span>
          )}
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {followerTiers.map((tier) => {
            const isSelected = creatorMinFollowers === tier.val;
            return (
              <button
                key={tier.val}
                onClick={() => setCreatorMinFollowers(tier.val)}
                className={cn(
                  "py-2 px-2 rounded-xl border text-[11px] font-mono font-bold transition-all text-center",
                  isSelected
                    ? "bg-[#FFD21F] text-[#0A0A0E] border-black/10 shadow-xs font-black"
                    : "bg-[#F8F8FC] border-black/5 text-[#5A5A68] hover:bg-black/5 hover:text-[#0A0A0E]"
                )}
              >
                {tier.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Engagement Rate Minimum */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-[#0A0A0E] flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>Engagement Rate</span>
          </label>
          {creatorMinEngagement > 0 && (
            <span className="text-[10px] font-mono font-bold text-amber-700">
              {creatorMinEngagement}%+
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-1.5">
          {engagementTiers.map((tier) => {
            const isSelected = creatorMinEngagement === tier.val;
            return (
              <button
                key={tier.val}
                onClick={() => setCreatorMinEngagement(tier.val)}
                className={cn(
                  "py-2 px-2.5 rounded-xl border text-[11px] font-mono font-bold transition-all text-center",
                  isSelected
                    ? "bg-[#FFD21F] text-[#0A0A0E] border-black/10 shadow-xs font-black"
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
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#0A0A0E]">Verified Talent Only</p>
            <p className="text-[10px] text-[#7A7A8A]">Audited media kit &amp; reach</p>
          </div>
        </div>

        <button
          type="button"
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
