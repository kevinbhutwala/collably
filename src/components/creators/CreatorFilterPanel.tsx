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
    <div className="p-6 rounded-3xl bg-[#120c16] border border-white/10 shadow-card space-y-6 text-white">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div className="flex items-center gap-2 text-white font-bold text-sm font-display">
          <Filter className="w-4 h-4 text-[hsl(327,100%,55%)]" />
          <span>Filter Creators</span>
        </div>
        <button
          onClick={resetCreatorFilters}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 transition-colors font-medium font-mono"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-200">Keyword / Handle</label>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={creatorSearchQuery}
            onChange={(e) => setCreatorSearchQuery(e.target.value)}
            placeholder="Search AI, fashion, photography..."
            className="w-full bg-white/[0.05] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[hsl(327,100%,50%)]/50 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Primary Category */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-200">Category &amp; Niche</label>
        <select
          value={creatorCategory}
          onChange={(e) => setCreatorCategory(e.target.value as CreatorCategory | 'all')}
          className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[hsl(327,100%,50%)]/50 shadow-xs"
        >
          <option value="all" className="bg-[#120c16] text-white">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c} className="bg-[#120c16] text-white">{c}</option>
          ))}
        </select>
      </div>

      {/* Platform */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-200">Primary Platform</label>
        <div className="grid grid-cols-2 gap-1.5 font-mono text-xs">
          <button
            onClick={() => setCreatorPlatform('all')}
            className={`px-3 py-1.5 rounded-lg border text-left transition-colors ${
              creatorPlatform === 'all'
                ? 'bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold border-transparent shadow-xs'
                : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08]'
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
                  ? 'bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold border-transparent shadow-xs'
                  : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08]'
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
          <span className="font-bold text-slate-200 font-sans">Min. Engagement Rate</span>
          <span className="text-emerald-400 font-extrabold">{creatorMinEngagement}%+</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={creatorMinEngagement}
          onChange={(e) => setCreatorMinEngagement(parseFloat(e.target.value))}
          className="w-full accent-[hsl(327,100%,50%)] cursor-pointer"
        />
      </div>

      {/* Minimum Followers */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-mono">
          <span className="font-bold text-slate-200 font-sans">Min. Total Reach</span>
          <span className="text-white font-extrabold">
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
          className="w-full accent-[hsl(327,100%,50%)] cursor-pointer"
        />
      </div>

      {/* Verified toggle */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-200">Verified Badge Only</span>
        <button
          onClick={() => setCreatorVerifiedOnly(!creatorVerifiedOnly)}
          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
            creatorVerifiedOnly
              ? 'bg-[hsl(327,100%,50%)] border-[hsl(327,100%,50%)] text-white'
              : 'border-white/20 bg-white/[0.05]'
          }`}
        >
          {creatorVerifiedOnly && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>
      </div>
    </div>
  );
}
