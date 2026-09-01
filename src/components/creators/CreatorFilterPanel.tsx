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
    <div className="p-6 rounded-3xl bg-[#0E0C15]/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6 text-white select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-white font-bold text-sm font-display">
          <Filter className="w-4 h-4 text-blue-400" />
          <span>Filter Creators</span>
        </div>
        <button
          onClick={resetCreatorFilters}
          className="text-xs text-white/50 hover:text-white flex items-center gap-1 transition-colors font-medium font-mono"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-white/80">Keyword / Handle</label>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
          <input
            type="text"
            value={creatorSearchQuery}
            onChange={(e) => setCreatorSearchQuery(e.target.value)}
            placeholder="Search AI, fashion, photography..."
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Primary Category */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-white/80">Category &amp; Niche</label>
        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setCreatorCategory("all")}
            className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
              creatorCategory === "all"
                ? "bg-[#2A5CFF] text-white font-bold shadow-[0_0_12px_rgba(42,92,255,0.4)]"
                : "bg-white/[0.04] text-white/60 hover:text-white border border-white/5"
            }`}
          >
            All Niches
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCreatorCategory(cat as CreatorCategory)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all ${
                creatorCategory === cat
                  ? "bg-[#2A5CFF] text-white font-bold shadow-[0_0_12px_rgba(42,92,255,0.4)]"
                  : "bg-white/[0.04] text-white/60 hover:text-white border border-white/5"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Platforms & Verified Checkbox */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
        <div className="flex items-center gap-2">
          <label className="text-xs font-bold text-white/80 mr-2">Platform:</label>
          {["all", "youtube", "tiktok", "instagram"].map((p) => (
            <button
              key={p}
              onClick={() => setCreatorPlatform(p as any)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-mono capitalize transition-all ${
                creatorPlatform === p
                  ? "bg-white text-[#07070B] font-bold"
                  : "bg-white/[0.04] text-white/60 hover:text-white border border-white/5"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none text-xs text-white/80">
          <input
            type="checkbox"
            checked={creatorVerifiedOnly}
            onChange={(e) => setCreatorVerifiedOnly(e.target.checked)}
            className="w-4 h-4 rounded bg-white/10 border-white/20 text-[#2A5CFF] focus:ring-0"
          />
          <span>Verified Creators Only</span>
        </label>
      </div>
    </div>
  );
}
