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
  SlidersHorizontal,
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
    <div className="w-full rounded-2xl sm:rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#12121A] p-5 sm:p-8 shadow-sm dark:shadow-2xl backdrop-blur-xl transition-colors space-y-7 sm:space-y-9">
      {/* ══════════════════════════════════════════════════════════════════════
          01. CLEAN & PROPERLY ALIGNED HEADER SECTION
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b border-black/8 dark:border-white/10">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3.5 py-1 text-xs font-semibold text-[#8A6500] dark:text-[#FFD21F]">
            <Trophy className="w-3.5 h-3.5" />
            <span>Performance &amp; Growth Index</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-pulse" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0A0A0E] dark:text-white tracking-tight font-display">
            Creator Marketplace Leaderboards
          </h2>

          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
            Real-time rankings based on verified engagement, escrow completion rates, and market transaction velocity across India&apos;s leading D2C creators.
          </p>
        </div>

        {/* Timeframe & Display Controls */}
        <div className="flex flex-wrap items-center gap-2.5 self-start lg:self-end shrink-0">
          {/* Timeframe segmented switch */}
          <div className="inline-flex items-center gap-1 rounded-xl border border-black/8 dark:border-white/10 bg-neutral-100 dark:bg-white/5 p-1">
            {(["7d", "30d", "90d"] as TimeframeWindow[]).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  timeframe === tf
                    ? "bg-[#FFD21F] text-[#0A0A0E] shadow-xs"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-[#0A0A0E] dark:hover:text-white"
                }`}
              >
                {tf === "7d" ? "7 Days" : tf === "30d" ? "30 Days" : "90 Days"}
              </button>
            ))}
          </div>

          {/* Mobile Display Toggle */}
          <div className="flex sm:hidden items-center gap-1 rounded-xl border border-black/8 dark:border-white/10 bg-neutral-100 dark:bg-white/5 p-1">
            <button
              onClick={() => setMobileDisplayMode("cards")}
              aria-label="Card View"
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                mobileDisplayMode === "cards"
                  ? "bg-white dark:bg-white/20 text-[#0A0A0E] dark:text-white shadow-xs"
                  : "text-neutral-500 hover:text-black dark:hover:text-white"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
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
              <ListFilter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          02. UNIFIED FILTER TOOLBAR (Clean, Spacious & Aligned)
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/6 dark:border-white/8 flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400 shrink-0">
          <SlidersHorizontal className="w-3.5 h-3.5 text-[#FFD21F]" />
          <span>Filters:</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 w-full lg:w-auto flex-1">
          {/* Category */}
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full appearance-none rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#181824] px-3 py-2 pr-7 text-xs font-semibold text-[#0A0A0E] dark:text-white focus:border-[#FFD21F] focus:outline-none transition-colors cursor-pointer"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Categories" : c}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-neutral-400">▼</span>
          </div>

          {/* Location */}
          <div className="relative">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full appearance-none rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#181824] px-3 py-2 pr-7 text-xs font-semibold text-[#0A0A0E] dark:text-white focus:border-[#FFD21F] focus:outline-none transition-colors cursor-pointer"
            >
              {LOCATIONS.map((l) => (
                <option key={l} value={l}>
                  {l === "All" ? "All Locations" : l}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-neutral-400">▼</span>
          </div>

          {/* Follower Tier */}
          <div className="relative">
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className="w-full appearance-none rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#181824] px-3 py-2 pr-7 text-xs font-semibold text-[#0A0A0E] dark:text-white focus:border-[#FFD21F] focus:outline-none transition-colors cursor-pointer"
            >
              {TIERS.map((t) => (
                <option key={t} value={t}>
                  {t === "All" ? "All Tiers" : t}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-neutral-400">▼</span>
          </div>

          {/* Platform */}
          <div className="relative">
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as PlatformType | "")}
              className="w-full appearance-none rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#181824] px-3 py-2 pr-7 text-xs font-semibold text-[#0A0A0E] dark:text-white focus:border-[#FFD21F] focus:outline-none transition-colors cursor-pointer"
            >
              <option value="">All Platforms</option>
              <option value="youtube">YouTube</option>
              <option value="instagram">Instagram</option>
              <option value="x">X (Twitter)</option>
              <option value="linkedin">LinkedIn</option>
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[9px] text-neutral-400">▼</span>
          </div>
        </div>

        {/* Results Counter & Reset Pill */}
        <div className="flex items-center justify-between lg:justify-end gap-3 pt-2 lg:pt-0 border-t lg:border-t-0 border-black/5 dark:border-white/5 text-xs font-mono text-neutral-500 shrink-0">
          <span>{leaderboard.length} ranked creators</span>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-neutral-200 dark:bg-white/10 text-[#0A0A0E] dark:text-white font-bold hover:bg-[#FFD21F] hover:text-[#0A0A0E] transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          03. TOP 3 PODIUM SPOTLIGHT (Generous Padding & Elevated Layout)
          ══════════════════════════════════════════════════════════════════════ */}
      {!loading && leaderboard.length >= 3 && (
        <div className="pt-2 pb-4">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-xs font-mono font-bold text-[#8A6500] dark:text-[#FFD21F]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>TOP PERFORMERS THIS WEEK</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:gap-6 items-end max-w-2xl mx-auto">
            {/* Rank 2 (Silver) */}
            {top2 && (
              <Link
                href={`/creators/${top2.creator.id}`}
                className="flex flex-col items-center text-center p-3 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 hover:border-slate-400 dark:hover:border-slate-400 transition-all group hover:-translate-y-1"
              >
                <span className="text-xl sm:text-2xl mb-1.5 sm:mb-2">🥈</span>
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
                <div className="mt-2.5 w-full truncate">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0A0A0E] dark:text-white truncate group-hover:text-[#FFD21F] transition-colors">
                    {top2.creator.fullName}
                  </h4>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                    @{top2.creator.handle}
                  </p>
                </div>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-[10px] font-mono font-bold text-neutral-700 dark:text-neutral-300">
                  <span>Score:</span>
                  <span className="text-slate-900 dark:text-white">{top2.trendingScore}</span>
                </div>
              </Link>
            )}

            {/* Rank 1 (Gold - Elevated Center) */}
            {top1 && (
              <div className="relative group -mt-4 sm:-mt-6">
                {/* Ambient Golden Halo Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFB800] rounded-3xl blur-md opacity-35 group-hover:opacity-75 transition duration-500 group-hover:duration-200 animate-pulse pointer-events-none" />

                <Link
                  href={`/creators/${top1.creator.id}`}
                  className="relative flex flex-col items-center text-center p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#FFFDF0] via-[#FFFBE6] to-[#FFF6C8] dark:from-[#221F10] dark:via-[#1C1A0D] dark:to-[#141208] border-2 border-[#FFD21F] shadow-[0_12px_40px_rgba(255,210,31,0.32)] transition-all group-hover:-translate-y-1.5 active:scale-[0.98] block"
                >
                  {/* Luxury Corner Tag */}
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#FFD21F]/30 border border-[#FFD21F]/60 text-[9px] font-mono font-black text-[#8A6500] dark:text-[#FFD21F] tracking-wider uppercase">
                    #1 Leader
                  </div>

                  <div className="flex items-center gap-1 text-2xl sm:text-3xl mb-1.5">
                    <span>👑</span>
                    <span className="text-lg sm:text-xl">🥇</span>
                  </div>
                  <div className="relative w-15 h-15 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 sm:border-3 border-[#FFD21F] bg-neutral-200 dark:bg-neutral-800 shadow-xl ring-4 ring-[#FFD21F]/30 group-hover:ring-[#FFD21F]/60 transition-all">
                    {top1.creator.avatarUrl ? (
                      <Image
                        src={top1.creator.avatarUrl}
                        alt={top1.creator.fullName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-bold text-xs">
                        {top1.creator.fullName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="mt-2.5 w-full truncate">
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
                  <div className="mt-2 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-gradient-to-r from-[#FFD21F] to-[#FFC700] text-[10px] font-mono font-extrabold text-[#0A0A0E] shadow-sm">
                    <Flame className="w-3 h-3 fill-[#0A0A0E]" />
                    <span>Score: {top1.trendingScore}</span>
                  </div>
                </Link>
              </div>
            )}

            {/* Rank 3 (Bronze) */}
            {top3 && (
              <Link
                href={`/creators/${top3.creator.id}`}
                className="flex flex-col items-center text-center p-3 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 hover:border-amber-600 dark:hover:border-amber-600 transition-all group hover:-translate-y-1"
              >
                <span className="text-xl sm:text-2xl mb-1.5 sm:mb-2">🥉</span>
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
                <div className="mt-2.5 w-full truncate">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0A0A0E] dark:text-white truncate group-hover:text-[#FFD21F] transition-colors">
                    {top3.creator.fullName}
                  </h4>
                  <p className="text-[10px] text-neutral-500 dark:text-neutral-400 truncate">
                    @{top3.creator.handle}
                  </p>
                </div>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-white/10 text-[10px] font-mono font-bold text-amber-800 dark:text-amber-300">
                  <span>Score:</span>
                  <span>{top3.trendingScore}</span>
                </div>
              </Link>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          04. LEADERBOARD LIST / TABLE (DUAL RESPONSIVE DISPLAY)
          ══════════════════════════════════════════════════════════════════════ */}
      <div>
        {loading ? (
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 sm:h-18 w-full animate-pulse rounded-2xl bg-black/5 dark:bg-white/[0.03]" />
            ))}
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="py-14 text-center space-y-3">
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
