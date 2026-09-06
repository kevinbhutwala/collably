"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { LeaderboardEntry, TimeframeWindow, PlatformType } from "@/core/types";
import { ReputationBadgeBar } from "./ReputationBadgeBar";

export function MarketplaceLeaderboards() {
  const [category, setCategory] = useState("All");
  const [location, setLocation] = useState("All");
  const [timeframe, setTimeframe] = useState<TimeframeWindow>("7d");
  const [tier, setTier] = useState("All");
  const [platform, setPlatform] = useState<PlatformType | "">("");
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const params = new URLSearchParams();
    if (category !== "All") params.append("category", category);
    if (location !== "All") params.append("location", location);
    if (tier !== "All") params.append("tier", tier);
    if (platform) params.append("platform", platform);
    params.append("timeframe", timeframe);
    params.append("limit", "20");

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

  const LOCATIONS = [
    "All",
    "San Francisco",
    "London",
    "Mumbai",
    "New York",
    "Berlin",
    "Worldwide",
  ];

  const TIERS = ["All", "Nano", "Micro", "Mid-Tier", "Macro", "Elite"];

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <span className="text-xl">🥇</span>;
    if (rank === 2) return <span className="text-xl">🥈</span>;
    if (rank === 3) return <span className="text-xl">🥉</span>;
    return <span className="text-xs font-bold text-neutral-400">#{rank}</span>;
  };

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#12121A] p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      {/* Header & Description */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-6 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-3 py-1 text-xs font-semibold text-[#FFD21F]">
            <span>🏆</span> Performance & Growth Index
          </div>
          <h2 className="mt-2 text-2xl font-bold text-white">
            Creator Marketplace Leaderboards
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Real-time rankings across verified engagement, escrow completion rates, and market velocity.
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/5 p-1 self-start sm:self-auto">
          {(["7d", "30d", "90d"] as TimeframeWindow[]).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`rounded-lg px-3 py-1 text-xs font-medium transition-all ${
                timeframe === tf
                  ? "bg-[#FFD21F] text-black font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {tf === "7d" ? "7 Days" : tf === "30d" ? "30 Days" : "90 Days"}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Matrix Bar */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4 pb-6 border-b border-white/5">
        {/* Category */}
        <div>
          <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white focus:border-[#FFD21F] focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-[#12121A] text-white">
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white focus:border-[#FFD21F] focus:outline-none"
          >
            {LOCATIONS.map((l) => (
              <option key={l} value={l} className="bg-[#12121A] text-white">
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Follower Tier */}
        <div>
          <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
            Follower Tier
          </label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white focus:border-[#FFD21F] focus:outline-none"
          >
            {TIERS.map((t) => (
              <option key={t} value={t} className="bg-[#12121A] text-white">
                {t}
              </option>
            ))}
          </select>
        </div>

        {/* Platform */}
        <div>
          <label className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">
            Platform
          </label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as PlatformType | "")}
            className="mt-1 w-full rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-white focus:border-[#FFD21F] focus:outline-none"
          >
            <option value="" className="bg-[#12121A] text-white">All Platforms</option>
            <option value="youtube" className="bg-[#12121A] text-white">YouTube</option>
            <option value="instagram" className="bg-[#12121A] text-white">Instagram</option>
            <option value="x" className="bg-[#12121A] text-white">X (Twitter)</option>
            <option value="linkedin" className="bg-[#12121A] text-white">LinkedIn</option>
          </select>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="mt-6 overflow-x-auto">
        {loading ? (
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 w-full animate-pulse rounded-xl bg-white/[0.02]" />
            ))}
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="py-12 text-center text-sm text-neutral-400">
            No creators found matching this filter combination.
          </div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-[11px] font-semibold uppercase tracking-wider text-neutral-400">
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
            <tbody className="divide-y divide-white/5 text-xs">
              {leaderboard.map((item) => {
                const creator = item.creator;
                const isPodium = item.rank <= 3;
                return (
                  <tr
                    key={creator.id}
                    className={`transition-colors hover:bg-white/[0.02] ${
                      isPodium ? "bg-white/[0.01]" : ""
                    }`}
                  >
                    {/* Rank */}
                    <td className="py-3.5 pl-3">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5">
                        {getRankBadge(item.rank)}
                      </div>
                    </td>

                    {/* Creator Identity */}
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-white/20 bg-neutral-800">
                          {creator.avatarUrl ? (
                            <Image
                              src={creator.avatarUrl}
                              alt={creator.fullName}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center font-bold text-white text-xs">
                              {creator.fullName.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-white truncate">
                              {creator.fullName}
                            </span>
                            {creator.verified && (
                              <span className="text-blue-400 text-xs">✓</span>
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-neutral-400 text-[11px]">
                              @{creator.handle} · {creator.location}
                            </span>
                            <ReputationBadgeBar badges={item.badges} maxVisible={2} size="sm" />
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 text-neutral-300">
                      {creator.primaryCategory}
                    </td>

                    {/* Trending Score */}
                    <td className="py-3.5 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#FFD21F]/30 bg-[#FFD21F]/10 px-2 py-0.5 font-bold text-[#FFD21F]">
                        🔥 {item.trendingScore}
                      </span>
                    </td>

                    {/* Engagement */}
                    <td className="py-3.5 text-center font-semibold text-emerald-400">
                      {item.engagementRate}%
                    </td>

                    {/* Deals */}
                    <td className="py-3.5 text-center font-semibold text-white">
                      {item.completedDeals}
                    </td>

                    {/* Rating */}
                    <td className="py-3.5 text-center font-semibold text-purple-400">
                      {item.rating} ★
                    </td>

                    {/* Action */}
                    <td className="py-3.5 pr-3 text-right">
                      <Link
                        href={`/creators/${creator.id}`}
                        className="rounded-lg bg-white/10 px-3 py-1 text-[11px] font-medium text-white hover:bg-[#FFD21F] hover:text-black transition-all"
                      >
                        Profile →
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
