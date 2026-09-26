"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trophy,
  Flame,
  Star,
  ShieldCheck,
  ArrowRight,
  RotateCcw,
  LayoutGrid,
  ListFilter,
  Sparkles,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import { LeaderboardEntry, TimeframeWindow, PlatformType } from "@/core/types";
import { ReputationBadgeBar } from "./ReputationBadgeBar";
import { GLOBAL_HUBS } from "@/core/constants";
import { CategoryBadge } from "@/components/ui/TitleIconBadge";

export function MarketplaceLeaderboards() {
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [timeframe, setTimeframe] = useState<TimeframeWindow>("7d");
  const [tier, setTier] = useState("All");
  const [platform, setPlatform] = useState<PlatformType | "">("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileDisplayMode, setMobileDisplayMode] = useState<"cards" | "table">("cards");

  const hasActiveFilters =
    category !== "All" || location !== "All" || tier !== "All" || platform !== "";

  const resetFilters = () => {
    setCategory("All");
    setLocation("All");
    setTier("All");
    setPlatform("");
  };

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const params = new URLSearchParams();
    if (category !== "All") params.append("category", category);
    if (location !== "All") params.append("location", location);
    if (tier !== "All") params.append("tier", tier);
    if (platform) params.append("platform", platform);
    params.append("timeframe", timeframe);
    params.append("limit", "25");

    fetch(`/api/marketplace/leaderboards?${params.toString()}`)
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data.leaderboard) setLeaderboard(data.leaderboard);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Leaderboard fetch error:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [category, location, timeframe, tier, platform]);

  const CATEGORIES = [
    "All",
    "Technology & AI",
    "Design & Creative",
    "Fashion & Style",
    "Fitness & Wellness",
    "Finance & Business",
    "Gaming & Esports",
  ];

  const LOCATIONS = ["All", ...GLOBAL_HUBS];
  const TIERS = ["All", "Nano", "Micro", "Mid-Tier", "Macro", "Elite"];

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <span className="text-xl">🥇</span>;
    if (rank === 2) return <span className="text-xl">🥈</span>;
    if (rank === 3) return <span className="text-xl">🥉</span>;
    return <span className="text-xs font-bold text-neutral-400">#{rank}</span>;
  };

  // Top 3 creators for podium showcase
  const top1 = leaderboard.find((item) => item.rank === 1);
  const top2 = leaderboard.find((item) => item.rank === 2);
  const top3 = leaderboard.find((item) => item.rank === 3);

  return (
    <div className="w-full rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#12121A] p-4 sm:p-6 lg:p-8 shadow-sm dark:shadow-2xl backdrop-blur-xl transition-colors">
      {/* ══════════════════════════════════════════════════════════════════════
          01. RESPONSIVE HEADER & TIMEFRAME CONTROLS
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-black/10 dark:border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-[#8A6500] dark:text-[#FFD21F]">
            <Trophy className="w-3.5 h-3.5" />
            <span>Performance &amp; Growth Index</span>
          </div>
          <h2 className="mt-2 text-xl sm:text-2xl font-bold text-[#0A0A0E] dark:text-white tracking-tight">
            Creator Marketplace Leaderboards
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-1 max-w-xl">
            Real-time rankings across verified engagement, escrow completion rates, and market velocity.
          </p>
        </div>

        {/* Timeframe & View Mode Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Timeframe pills */}
          <div className="flex items-center gap-1 rounded-xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-white/5 p-1">
            {(["7d", "30d", "90d"] as TimeframeWindow[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`rounded-lg px-2.5 sm:px-3 py-1 text-xs font-semibold transition-all ${
                  timeframe === tf
                    ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-[#0A0A0E] dark:hover:text-white"
                }`}
              >
                {tf === "7d" ? "7 Days" : tf === "30d" ? "30 Days" : "90 Days"}
              </button>
            ))}
          </div>

          {/* Mobile Display Toggle (Cards vs Table) */}
          <div className="flex sm:hidden items-center gap-1 rounded-xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-white/5 p-1">
            <button
              onClick={() => setMobileDisplayMode("cards")}
              aria-label="Card View"
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                mobileDisplayMode === "cards"
                  ? "bg-white dark:bg-white/20 text-[#0A0A0E] dark:text-white shadow-xs"
                  : "text-neutral-500 hover:text-black dark:hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileDisplayMode("table")}
              aria-label="Table View"
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                mobileDisplayMode === "table"
                  ? "bg-white dark:bg-white/20 text-[#0A0A0E] dark:text-white shadow-xs"
                  : "text-neutral-500 hover:text-black dark:hover:text-white"
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          02. TOP 3 PODIUM SPOTLIGHT (Rendered when data is ready)
          ══════════════════════════════════════════════════════════════════════ */}
      {!loading && leaderboard.length >= 3 && (
        <div className="py-6 sm:py-8 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F]" />
              <span>Current Podium Leaders</span>
            </div>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs font-mono text-[#A37F00] dark:text-[#FFD21F] hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 items-end max-w-2xl mx-auto pt-2">
            {/* Rank 2 (Silver) */}
            {top2 && (
              <Link
                href={`/creators/${top2.creator.id}`}
                className="flex flex-col items-center text-center p-2.5 sm:p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 hover:border-slate-400 dark:hover:border-slate-400 transition-all group hover:-translate-y-1"
              >
                <span className="text-xl sm:text-2xl mb-1 sm:mb-2">🥈</span>
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-slate-300 dark:border-slate-400 bg-neutral-200 dark:bg-neutral-800 shadow-md">
                  {top2.creator.avatarUrl ? (
                    <Image
                      src={top2.creator.avatarUrl}
                      alt={top2.creator.fullName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-bold text-xs">
                      {top2.creator.fullName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="mt-2 w-full truncate">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0A0A0E] dark:text-white truncate group-hover:text-[#FFD21F] transition-colors">
                    {top2.creator.fullName}
                  </h4>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                    @{top2.creator.handle}
                  </p>
                </div>
                <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-[10px] font-mono font-bold text-neutral-700 dark:text-neutral-300">
                  <span>Score:</span>
                  <span className="text-slate-900 dark:text-white">{top2.trendingScore}</span>
                </div>
              </Link>
            )}

            {/* Rank 1 (Gold - Elevated Center) */}
            {top1 && (
              <Link
                href={`/creators/${top1.creator.id}`}
                className="flex flex-col items-center text-center p-3 sm:p-5 rounded-2xl bg-gradient-to-b from-[#FFFDF0] to-[#FFF9DB] dark:from-[#221F10] dark:to-[#16140B] border-2 border-[#FFD21F] shadow-[0_8px_30px_rgba(255,210,31,0.25)] transition-all group hover:-translate-y-1.5 -mt-3 sm:-mt-5"
              >
                <div className="flex items-center gap-1 text-2xl sm:text-3xl mb-1">
                  <span>👑</span>
                  <span className="text-lg sm:text-xl">🥇</span>
                </div>
                <div className="relative w-14 h-14 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 sm:border-3 border-[#FFD21F] bg-neutral-200 dark:bg-neutral-800 shadow-xl ring-4 ring-[#FFD21F]/20">
                  {top1.creator.avatarUrl ? (
                    <Image
                      src={top1.creator.avatarUrl}
                      alt={top1.creator.fullName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-bold text-xs">
                      {top1.creator.fullName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="mt-2 w-full truncate">
                  <div className="flex items-center justify-center gap-1">
                    <h4 className="text-xs sm:text-base font-extrabold text-[#0A0A0E] dark:text-white truncate group-hover:text-[#A37F00] dark:group-hover:text-[#FFD21F] transition-colors">
                      {top1.creator.fullName}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] shrink-0" />
                  </div>
                  <p className="text-[10px] text-neutral-600 dark:text-neutral-400 truncate">
                    @{top1.creator.handle}
                  </p>
                </div>
                <div className="mt-1.5 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFD21F] text-[10px] font-mono font-extrabold text-[#0A0A0E] shadow-xs">
                  <Flame className="w-3 h-3 fill-[#0A0A0E]" />
                  <span>{top1.trendingScore}</span>
                </div>
              </Link>
            )}

            {/* Rank 3 (Bronze) */}
            {top3 && (
              <Link
                href={`/creators/${top3.creator.id}`}
                className="flex flex-col items-center text-center p-2.5 sm:p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 hover:border-amber-600 dark:hover:border-amber-600 transition-all group hover:-translate-y-1"
              >
                <span className="text-xl sm:text-2xl mb-1 sm:mb-2">🥉</span>
                <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-amber-600/50 bg-neutral-200 dark:bg-neutral-800 shadow-md">
                  {top3.creator.avatarUrl ? (
                    <Image
                      src={top3.creator.avatarUrl}
                      alt={top3.creator.fullName}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-bold text-xs">
                      {top3.creator.fullName.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="mt-2 w-full truncate">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0A0A0E] dark:text-white truncate group-hover:text-[#FFD21F] transition-colors">
                    {top3.creator.fullName}
                  </h4>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                    @{top3.creator.handle}
                  </p>
                </div>
                <div className="mt-1.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-white/10 text-[10px] font-mono font-bold text-amber-800 dark:text-amber-300">
                  <span>Score:</span>
                  <span>{top3.trendingScore}</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          03. RESPONSIVE FILTER MATRIX
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="mt-5 grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-4 pb-5 border-b border-black/5 dark:border-white/5">
        {/* Category */}
        <div>
          <label className="text-[10px] uppercase font-bold text-neutral-500 dark:text-neutral-400 tracking-wider">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-white/5 px-2.5 py-1.5 text-xs text-[#0A0A0E] dark:text-white focus:border-[#FFD21F] focus:outline-none transition-colors"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-white dark:bg-[#12121A] text-[#0A0A0E] dark:text-white">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="text-[10px] uppercase font-bold text-neutral-500 dark:text-neutral-400 tracking-wider">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-white/5 px-2.5 py-1.5 text-xs text-[#0A0A0E] dark:text-white focus:border-[#FFD21F] focus:outline-none transition-colors"
          >
            {LOCATIONS.map((l) => (
              <option key={l} value={l} className="bg-white dark:bg-[#12121A] text-[#0A0A0E] dark:text-white">
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Follower Tier */}
        <div>
          <label className="text-[10px] uppercase font-bold text-neutral-500 dark:text-neutral-400 tracking-wider">
            Follower Tier
          </label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-white/5 px-2.5 py-1.5 text-xs text-[#0A0A0E] dark:text-white focus:border-[#FFD21F] focus:outline-none transition-colors"
          >
            {TIERS.map((t) => (
              <option key={t} value={t} className="bg-white dark:bg-[#12121A] text-[#0A0A0E] dark:text-white">
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="text-[10px] uppercase font-bold text-neutral-500 dark:text-neutral-400 tracking-wider">
            Platform
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as PlatformType | "")}
            className="mt-1 w-full rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50 dark:bg-white/5 px-2.5 py-1.5 text-xs text-[#0A0A0E] dark:text-white focus:border-[#FFD21F] focus:outline-none transition-colors"
          >
            <option value="" className="bg-white dark:bg-[#12121A] text-[#0A0A0E] dark:text-white">All Platforms</option>
            <option value="youtube" className="bg-white dark:bg-[#12121A] text-[#0A0A0E] dark:text-white">YouTube</option>
            <option value="instagram" className="bg-white dark:bg-[#12121A] text-[#0A0A0E] dark:text-white">Instagram</option>
            <option value="x" className="bg-white dark:bg-[#12121A] text-[#0A0A0E] dark:text-white">X (Twitter)</option>
            <option value="linkedin" className="bg-white dark:bg-[#12121A] text-[#0A0A0E] dark:text-white">LinkedIn</option>
          </select>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          04. LEADERBOARD LIST / TABLE (DUAL RESPONSIVE DISPLAY)
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="mt-4">
        {loading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 sm:h-18 w-full animate-pulse rounded-2xl bg-black/5 dark:bg-white/[0.03]" />
            ))}
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center mx-auto text-xl">
              🔍
            </div>
            <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              No creators found matching this filter combination.
            </p>
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#FFD21F] text-[#0A0A0E] shadow-sm hover:scale-105 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        ) : (
          <>
            {/* ── MOBILE CARD VIEW (Default on phones, zero horizontal scroll) ── */}
            <div className={mobileDisplayMode === "cards" ? "block md:hidden space-y-3" : "hidden"}>
              {leaderboard.map((item) => {
                const creator = item.creator;
                const isPodium = item.rank <= 3;
                return (
                  <div
                    key={creator.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isPodium
                        ? "border-[#FFD21F]/40 bg-gradient-to-r from-[#FFFDF2] to-white dark:from-[#1A180E] dark:to-[#12121A] shadow-xs"
                        : "border-black/6 dark:border-white/10 bg-neutral-50/60 dark:bg-white/[0.02]"
                    }`}
                  >
                    {/* Top Identity Line */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Rank Badge */}
                        <div className="w-7 h-7 rounded-lg bg-neutral-100 dark:bg-white/10 flex items-center justify-center shrink-0">
                          {getRankBadge(item.rank)}
                        </div>

                        {/* Avatar */}
                        <div className="relative w-9 h-9 rounded-full overflow-hidden border border-black/10 dark:border-white/20 bg-neutral-200 dark:bg-neutral-800 shrink-0">
                          {creator.avatarUrl ? (
                            <Image
                              src={creator.avatarUrl}
                              alt={creator.fullName}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center font-bold text-xs">
                              {creator.fullName.charAt(0)}
                            </div>
                          )}
                        </div>

                        {/* Name & Handle */}
                        <div className="min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="font-bold text-xs text-[#0A0A0E] dark:text-white truncate">
                              {creator.fullName}
                            </span>
                            {creator.verified && (
                              <CheckCircle2 className="w-3 h-3 text-[#087F5B] shrink-0" />
                            )}
                          </div>
                          <span className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate block">
                            @{creator.handle} · {creator.location}
                          </span>
                        </div>
                      </div>

                      {/* Trending Score Flame */}
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#FFD21F]/40 bg-[#FFD21F]/15 px-2 py-0.5 text-xs font-mono font-extrabold text-[#8A6500] dark:text-[#FFD21F] shrink-0">
                        🔥 {item.trendingScore}
                      </span>
                    </div>

                    {/* Middle Badges Line */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                      <CategoryBadge category={creator.primaryCategory} size="xs" showIcon={true} />
                      <ReputationBadgeBar badges={item.badges} maxVisible={1} size="sm" />
                    </div>

                    {/* Bottom Stats Grid & Action */}
                    <div className="mt-3 pt-2.5 border-t border-black/5 dark:border-white/5 flex items-center justify-between gap-2 text-[11px] font-mono">
                      <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-400">
                        <div>
                          <span className="text-[9px] uppercase block text-neutral-400">Engage</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {item.engagementRate}%
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase block text-neutral-400">Deals</span>
                          <span className="font-bold text-[#0A0A0E] dark:text-white">
                            {item.completedDeals}
                          </span>
                        </div>
                        <div>
                          <span className="text-[9px] uppercase block text-neutral-400">Rating</span>
                          <span className="font-bold text-amber-500 dark:text-amber-400">
                            {item.rating} ★
                          </span>
                        </div>
                      </div>

                      <Link
                        href={`/creators/${creator.id}`}
                        className="px-3 py-1.5 rounded-lg bg-[#FFD21F] hover:bg-[#FFE052] text-[#0A0A0E] font-bold text-xs flex items-center gap-1 shadow-xs shrink-0 transition-transform active:scale-95"
                      >
                        <span>Profile</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ── DESKTOP & WIDESCREEN TABLE VIEW ── */}
            <div className={mobileDisplayMode === "table" ? "block overflow-x-auto" : "hidden md:block overflow-x-auto"}>
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-black/10 dark:border-white/10 text-[11px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                    <th className="pb-3 pl-3 w-14">Rank</th>
                    <th className="pb-3">Creator</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3 text-center">Score</th>
                    <th className="pb-3 text-center">Engagement</th>
                    <th className="pb-3 text-center">Deals</th>
                    <th className="pb-3 text-center">Rating</th>
                    <th className="pb-3 text-right pr-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5 dark:divide-white/5 text-xs font-sans">
                  {leaderboard.map((item) => {
                    const creator = item.creator;
                    const isPodium = item.rank <= 3;
                    return (
                      <tr
                        key={creator.id}
                        className={`transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.02] ${
                          isPodium ? "bg-amber-500/[0.02] dark:bg-white/[0.01]" : ""
                        }`}
                      >
                        {/* Rank */}
                        <td className="py-3.5 pl-3">
                          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100 dark:bg-white/5 font-mono">
                            {getRankBadge(item.rank)}
                          </div>
                        </td>

                        {/* Creator Identity */}
                        <td className="py-3.5">
                          <div className="flex items-center gap-3">
                            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-black/10 dark:border-white/20 bg-neutral-200 dark:bg-neutral-800">
                              {creator.avatarUrl ? (
                                <Image
                                  src={creator.avatarUrl}
                                  alt={creator.fullName}
                                  fill
                                  className="object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center font-bold text-[#0A0A0E] dark:text-white text-xs">
                                  {creator.fullName.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-[#0A0A0E] dark:text-white truncate">
                                  {creator.fullName}
                                </span>
                                {creator.verified && (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B] shrink-0" />
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-neutral-500 dark:text-neutral-400 text-[11px] truncate">
                                  @{creator.handle} · {creator.location}
                                </span>
                                <ReputationBadgeBar badges={item.badges} maxVisible={1} size="sm" />
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className="py-3.5">
                          <CategoryBadge category={creator.primaryCategory} size="xs" showIcon={true} />
                        </td>

                        {/* Trending Score */}
                        <td className="py-3.5 text-center font-mono">
                          <span className="inline-flex items-center gap-1 rounded-full border border-[#FFD21F]/30 bg-[#FFD21F]/15 px-2.5 py-0.5 font-extrabold text-[#8A6500] dark:text-[#FFD21F]">
                            🔥 {item.trendingScore}
                          </span>
                        </td>

                        {/* Engagement */}
                        <td className="py-3.5 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                          {item.engagementRate}%
                        </td>

                        {/* Deals */}
                        <td className="py-3.5 text-center font-mono font-bold text-[#0A0A0E] dark:text-white">
                          {item.completedDeals}
                        </td>

                        {/* Rating */}
                        <td className="py-3.5 text-center font-mono font-bold text-amber-500 dark:text-amber-400">
                          {item.rating} ★
                        </td>

                        {/* Action */}
                        <td className="py-3.5 pr-3 text-right">
                          <Link
                            href={`/creators/${creator.id}`}
                            className="inline-flex items-center gap-1 rounded-xl border border-black/10 dark:border-white/10 bg-neutral-100 dark:bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#0A0A0E] dark:text-white hover:bg-[#FFD21F] hover:text-[#0A0A0E] dark:hover:bg-[#FFD21F] dark:hover:text-[#0A0A0E] transition-all shadow-2xs"
                          >
                            <span>Profile</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
