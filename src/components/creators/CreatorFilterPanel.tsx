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
    <div className="p-6 rounded-3xl bg-[#101018] border border-white/10 shadow-2xl backdrop-blur-xl space-y-6 text-white select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-white font-bold text-sm font-display">
          <Filter className="w-4 h-4 text-[#FFD21F]" />
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
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-white/30 focus:outline-none focus:border-[#FFD21F]/50 transition-all"
          />
        </div>
      </div>

      {/* Primary Category */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-white/80">Category &amp; Niche</label>
        <select
          value={creatorCategory || "all"}
          onChange={(e) =>
            setCreatorCategory(e.target.value as CreatorCategory | "all")
          }
          className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#FFD21F]/50 transition-all"
        >
          <option value="all" className="bg-[#101018]">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-[#101018]">
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Primary Platform */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-white/80">Primary Social Channel</label>
        <div className="grid grid-cols-2 gap-2">
          {PLATFORMS.map((p) => {
            const isSelected = creatorPlatform === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setCreatorPlatform(isSelected ? "all" : p.id)}
                className={`py-2 px-3 rounded-xl border text-xs font-mono transition-all flex items-center justify-between ${
                  isSelected
                    ? "bg-[#FFD21F] text-[#0A0A0E] font-bold border-white/40 shadow-sm"
                    : "bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.08]"
                }`}
              >
                <span className="capitalize">{p.name}</span>
                {isSelected && <Check className="w-3 h-3 text-[#0A0A0E]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Verified Only Toggle */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-white font-sans">Verified Profiles Only</p>
          <p className="text-[10px] text-white/50">Show audited identity badge</p>
        </div>
        <button
          onClick={() => setCreatorVerifiedOnly(!creatorVerifiedOnly)}
          className={`w-11 h-6 rounded-full transition-colors relative ${
            creatorVerifiedOnly ? "bg-[#FFD21F]" : "bg-white/15"
          }`}
        >
          <div
            className={`w-4 h-4 rounded-full bg-white transition-transform absolute top-1 ${
              creatorVerifiedOnly ? "right-1" : "left-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
