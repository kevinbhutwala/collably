"use client";

import React from "react";
import { useFilterStore } from "@/stores/filter.store";
import { CATEGORIES, PLATFORMS, CREATOR_TIERS } from "@/core/constants";
import { CreatorCategory, PlatformType } from "@/core/types";
import { Search, Filter, RotateCcw, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";

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
    <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-card space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
          <Filter className="w-4 h-4 text-brand-accent" />
          <span>Filter Creators</span>
        </div>
        <button
          onClick={resetCreatorFilters}
          className="text-xs text-slate-500 hover:text-slate-900 flex items-center gap-1 transition-colors font-medium"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Search Input */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">Keyword / Handle</label>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={creatorSearchQuery}
            onChange={(e) => setCreatorSearchQuery(e.target.value)}
            placeholder="Search AI, fashion, photography..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:border-slate-400 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Primary Category */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">Category & Niche</label>
        <select
          value={creatorCategory}
          onChange={(e) => setCreatorCategory(e.target.value as CreatorCategory | 'all')}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:bg-white focus:border-slate-400 shadow-sm"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Platform */}
      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-700">Primary Platform</label>
        <div className="grid grid-cols-2 gap-1.5">
          <button
            onClick={() => setCreatorPlatform('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border text-left transition-colors ${
              creatorPlatform === 'all'
                ? 'bg-slate-900 text-white font-bold border-slate-900 shadow-sm'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            All Platforms
          </button>
          {PLATFORMS.map((p) => (
            <button
              key={p.id}
              onClick={() => setCreatorPlatform(p.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border text-left transition-colors ${
                creatorPlatform === p.id
                  ? 'bg-slate-900 text-white font-bold border-slate-900 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Engagement */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="font-bold text-slate-700">Min. Engagement Rate</span>
          <span className="font-mono text-emerald-600 font-extrabold">{creatorMinEngagement}%+</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={creatorMinEngagement}
          onChange={(e) => setCreatorMinEngagement(parseFloat(e.target.value))}
          className="w-full accent-brand-accent cursor-pointer"
        />
      </div>

      {/* Minimum Followers */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs">
          <span className="font-bold text-slate-700">Min. Total Reach</span>
          <span className="font-mono text-slate-900 font-extrabold">
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
          className="w-full accent-brand-accent cursor-pointer"
        />
      </div>

      {/* Verified toggle */}
      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs font-bold text-slate-700">Verified Badge Only</span>
        <button
          onClick={() => setCreatorVerifiedOnly(!creatorVerifiedOnly)}
          className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
            creatorVerifiedOnly
              ? 'bg-brand-accent border-brand-accent text-white'
              : 'border-slate-300 bg-white'
          }`}
        >
          {creatorVerifiedOnly && <Check className="w-3.5 h-3.5 stroke-[3]" />}
        </button>
      </div>
    </div>
  );
}
