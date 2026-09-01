"use client";

import React from "react";
import { useFilterStore } from "@/stores/filter.store";
import { CATEGORIES, PLATFORMS } from "@/core/constants";
import { CreatorCategory } from "@/core/types";
import { Search, Filter, RotateCcw, Check } from "lucide-react";

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

  return (
    <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6 text-[#111111]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E4]">
        <div className="flex items-center gap-2 text-[#111111] font-bold text-sm font-display">
          <Filter className="w-4 h-4 text-[#111111]" />
          <span>Filter Creators</span>
        </div>
        <button
          onClick={resetCreatorFilters}
          className="text-xs text-[#6B6B6B] hover:text-[#111111] flex items-center gap-1 transition-colors font-medium font-mono"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#111111]">Keyword / Handle</label>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6B6B]" />
          <input
            type="text"
            value={creatorSearchQuery}
            onChange={(e) => setCreatorSearchQuery(e.target.value)}
            placeholder="Search AI, fashion, photography..."
            className="w-full bg-[#FAFAF8] border border-[#E7E7E4] rounded-xl pl-9 pr-3 py-2 text-xs text-[#111111] placeholder:text-[#6B6B6B] focus:outline-none focus:border-[#111111] transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Primary Category */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#111111]">Category &amp; Niche</label>
        <select
          value={creatorCategory}
          onChange={(e) => setCreatorCategory(e.target.value as CreatorCategory | 'all')}
          className="w-full bg-[#FAFAF8] border border-[#E7E7E4] rounded-xl px-3 py-2 text-xs text-[#111111] focus:outline-none focus:border-[#111111] shadow-xs"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Platform */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-[#111111]">Primary Platform</label>
        <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
          <button
            onClick={() => setCreatorPlatform('all')}
            className={`px-3 py-1.5 rounded-lg border text-left transition-colors ${
              creatorPlatform === 'all'
                ? 'bg-[#111111] text-[#FAFAF8] font-bold border-transparent shadow-xs'
                : 'bg-[#FAFAF8] border-[#E7E7E4] text-[#6B6B6B] hover:text-[#111111]'
            }`}
          >
            All Platforms
          </button>
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => setCreatorPlatform(p.id)}
              className={`px-3 py-1.5 rounded-lg border text-left transition-colors ${
                creatorPlatform === p.id
                  ? 'bg-[#111111] text-[#FAFAF8] font-bold border-transparent shadow-xs'
                  : 'bg-[#FAFAF8] border-[#E7E7E4] text-[#6B6B6B] hover:text-[#111111]'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Engagement */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono">
          <span className="font-bold text-[#111111] font-sans">Min. Engagement Rate</span>
          <span className="text-[#111111] font-extrabold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
            {creatorMinEngagement}%+
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={creatorMinEngagement}
          onChange={(e) => setCreatorMinEngagement(parseFloat(e.target.value))}
          className="w-full accent-[#111111] cursor-pointer"
        />
      </div>

      {/* Minimum Followers */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono">
          <span className="font-bold text-[#111111] font-sans">Min. Total Reach</span>
          <span className="text-[#111111] font-extrabold">
            {creatorMinFollowers === 0 ? "Any size" : `${creatorMinFollowers / 1000}k+`}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="500000"
          step="25000"
          value={creatorMinFollowers}
          onChange={(e) => setCreatorMinFollowers(parseInt(e.target.value))}
          className="w-full accent-[#111111] cursor-pointer"
        />
      </div>

      {/* Verified toggle */}
      <div className="pt-2 border-t border-[#E7E7E4] flex items-center justify-between">
        <span className="text-xs font-bold text-[#111111]">Verified Badge Only</span>
        <button
          onClick={() => setCreatorVerifiedOnly(!creatorVerifiedOnly)}
          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
            creatorVerifiedOnly
              ? 'bg-[#111111] border-[#111111] text-[#FAFAF8]'
              : 'border-[#E7E7E4] bg-[#FAFAF8]'
          }`}
        >
          {creatorVerifiedOnly && <Check className="w-3.5 h-3.5 stroke-[3] text-[#B7FF3C]" />}
        </button>
      </div>
    </div>
  );
}
