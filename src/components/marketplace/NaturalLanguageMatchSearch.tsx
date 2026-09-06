"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CreatorProfile, ExplainableMatchResult, ParsedBriefQuery } from "@/core/types";
import { ReputationBadgeBar } from "./ReputationBadgeBar";

const EXAMPLE_PROMPTS = [
  "Fitness creator from Mumbai with 50K-250K followers and ₹30K budget",
  "Technology & AI YouTube creator with >5% engagement under $2500",
  "Luxury Fashion & Style creator in London with high engagement",
  "Design & Creative specialist in San Francisco with verified reliability",
];

export function NaturalLanguageMatchSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [parsedBrief, setParsedBrief] = useState<ParsedBriefQuery | null>(null);
  const [results, setResults] = useState<{ creator: CreatorProfile; matchResult: ExplainableMatchResult }[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const handleSearch = async (textToSearch?: string) => {
    const q = textToSearch !== undefined ? textToSearch : query;
    if (!q.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/marketplace/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queryText: q, limit: 8 }),
      });
      const data = await res.json();
      if (data.success) {
        setParsedBrief(data.parsedBrief);
        setResults(data.results || []);
      }
    } catch (err) {
      console.error("Match search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const applyExample = (prompt: string) => {
    setQuery(prompt);
    handleSearch(prompt);
  };

  return (
    <div className="w-full rounded-3xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#12121A] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] dark:shadow-2xl text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <div className="inline-flex items-center gap-2 self-start rounded-full border border-[#FFD21F]/40 bg-[#FFD21F]/15 px-3 py-1 text-xs font-semibold text-[#0A0A0E] dark:text-[#FFD21F]">
          <span>🎯</span> Explainable 6-Factor Compatibility Engine
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#0A0A0E] dark:text-white font-display">
          Natural Language Creator Search & Compatibility Match
        </h2>
        <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#8E8EA4]">
          Type your campaign brief in plain English. Our engine automatically parses location, audience size, budget, and niche to find your ideal partners.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="mt-5 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="e.g. Fitness creator from Mumbai with 50K-250K followers and ₹30K budget..."
            className="w-full rounded-2xl border border-black/10 dark:border-white/15 bg-[#F8F8FC] dark:bg-white/5 px-4 py-3.5 text-sm text-[#0A0A0E] dark:text-white placeholder-[#7A7A8A] dark:placeholder-[#8E8EA4] focus:border-[#FFD21F] focus:outline-none focus:ring-1 focus:ring-[#FFD21F] transition-all font-sans"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setParsedBrief(null); setResults([]); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A7A8A] hover:text-[#0A0A0E] dark:hover:text-white text-sm cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>
        <button
          onClick={() => handleSearch()}
          disabled={loading}
          className="flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] px-6 py-3.5 text-sm font-extrabold text-[#0A0A0E] shadow-xs border border-black/10 disabled:opacity-50 transition-all cursor-pointer"
        >
          {loading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#0A0A0E] border-t-transparent" />
          ) : (
            <span>Find Matches ⚡</span>
          )}
        </button>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] font-medium">Try asking:</span>
        {EXAMPLE_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => applyExample(prompt)}
            className="rounded-xl border border-black/6 dark:border-white/10 bg-[#FAFAFC] dark:bg-white/[0.03] px-3 py-1 text-[11px] text-[#5A5A68] dark:text-neutral-300 hover:border-[#FFD21F] hover:text-[#0A0A0E] dark:hover:text-white transition-all text-left cursor-pointer"
          >
            &ldquo;{prompt}&rdquo;
          </button>
        ))}
      </div>

      {/* Parsed Criteria Chips */}
      {parsedBrief && (
        <div className="mt-6 rounded-2xl border border-black/8 dark:border-white/10 bg-[#FAFAFC] dark:bg-[#161622] p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0A0A0E] dark:text-neutral-300">
              Extracted Campaign Parameters:
            </span>
            <span className="text-[11px] text-[#8A6500] dark:text-[#FFD21F] font-mono font-bold">
              Deterministic 6-Factor Parser
            </span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {parsedBrief.category && (
              <span className="inline-flex items-center gap-1 rounded-lg border border-[#FFD21F]/40 bg-[#FFD21F]/15 px-2.5 py-1 text-xs font-bold text-[#0A0A0E] dark:text-[#FFD21F]">
                <span>📁</span> {parsedBrief.category}
              </span>
            )}
            {parsedBrief.location && (
              <span className="inline-flex items-center gap-1 rounded-lg border border-black/8 dark:border-white/10 bg-white dark:bg-white/5 px-2.5 py-1 text-xs font-bold text-[#0A0A0E] dark:text-white">
                <span>📍</span> {parsedBrief.location}
              </span>
            )}
            {parsedBrief.minFollowers !== undefined && (
              <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <span>👥</span> {parsedBrief.minFollowers / 1000}k–{(parsedBrief.maxFollowers || 250000) / 1000}k Followers
              </span>
            )}
            {parsedBrief.maxBudget !== undefined && (
              <span className="inline-flex items-center gap-1 rounded-lg border border-[#FFD21F]/40 bg-[#FFD21F]/15 px-2.5 py-1 text-xs font-bold text-[#0A0A0E] dark:text-[#FFD21F]">
                <span>💰</span> Max {parsedBrief.currency === "INR" ? "₹" : "$"}{parsedBrief.maxBudget.toLocaleString()}
              </span>
            )}
            {parsedBrief.minEngagementRate !== undefined && (
              <span className="inline-flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                <span>⚡</span> ≥ {parsedBrief.minEngagementRate}% Engagement
              </span>
            )}
          </div>
        </div>
      )}

      {/* Results Grid */}
      {results.length > 0 && (
        <div className="mt-6 space-y-4">
          <div className="text-xs font-bold text-[#6A6A78] dark:text-[#8E8EA4] uppercase tracking-wider font-mono">
            Top Matched Creators ({results.length})
          </div>

          <div className="grid grid-cols-1 gap-4">
            {results.map(({ creator, matchResult }) => {
              const isExpanded = expandedId === creator.id;
              return (
                <div
                  key={creator.id}
                  className="rounded-2xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#161622] p-5 shadow-2xs hover:border-[#FFD21F]/50 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Creator Identity */}
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-black/10 dark:border-white/20 bg-[#F5F5F9] dark:bg-neutral-800">
                        {creator.avatarUrl ? (
                          <Image
                            src={creator.avatarUrl}
                            alt={creator.fullName}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-bold text-[#0A0A0E] dark:text-white text-sm">
                            {creator.fullName.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-extrabold text-[#0A0A0E] dark:text-white text-sm sm:text-base truncate font-display">
                            {creator.fullName}
                          </h4>
                          {creator.verified && <span className="text-[#FFD21F] text-xs">✓</span>}
                          <span className="rounded-full bg-[#F4F4F8] dark:bg-white/5 border border-black/6 dark:border-white/10 px-2 py-0.5 text-[10px] font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
                            {creator.primaryCategory}
                          </span>
                        </div>
                        <p className="text-xs font-mono text-[#6A6A78] dark:text-[#8E8EA4] truncate mt-0.5">
                          @{creator.handle} · {creator.location} · {creator.totalFollowers.toLocaleString()} followers · {creator.avgEngagementRate}% eng
                        </p>
                      </div>
                    </div>

                    {/* Match Score & Actions */}
                    <div className="flex items-center gap-3 self-end sm:self-center">
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 shadow-2xs font-mono">
                          <span>🎯</span> {matchResult.overallScore}% Match
                        </div>
                        <div className="text-[10px] text-emerald-700 dark:text-emerald-300 font-bold mt-0.5">
                          {matchResult.overallScore >= 90 ? "Excellent fit for your campaign" : "Strong campaign match"}
                        </div>
                      </div>

                      <button
                        onClick={() => setExpandedId(isExpanded ? null : creator.id)}
                        className="rounded-xl border border-black/10 dark:border-white/10 bg-[#F4F4F8] dark:bg-white/5 px-3 py-2 text-xs font-bold text-[#0A0A0E] dark:text-neutral-300 hover:text-black dark:hover:text-white transition-all cursor-pointer"
                      >
                        {isExpanded ? "Hide Breakdown ▲" : "Explain Why ▼"}
                      </button>

                      <Link
                        href={`/creators/${creator.id}`}
                        className="rounded-xl bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] px-4 py-2 text-xs font-extrabold text-[#0A0A0E] shadow-2xs border border-black/10 transition-all"
                      >
                        Invite to Campaign →
                      </Link>
                    </div>
                  </div>

                  {/* Expandable Factor Breakdown */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-black/8 dark:border-white/10 space-y-3.5 animate-in fade-in">
                      {/* Actionable 6-Factor Checklist */}
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-2xl bg-[#F8F8FC] dark:bg-[#1A1A28] border border-black/6 dark:border-white/8 font-mono text-xs">
                        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                          <span>✓</span> Niche — {matchResult.factors.categoryMatch.score}%
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                          <span>✓</span> Audience — {matchResult.factors.audienceMatch.score}%
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                          <span>✓</span> Budget — {matchResult.factors.budgetMatch.score}%
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                          <span>✓</span> Location — {matchResult.factors.locationMatch.score}%
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                          <span>✓</span> Engagement — {matchResult.factors.engagementMatch.score}%
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
                          <span>✓</span> Reliability — {matchResult.factors.reliabilityMatch.score}%
                        </div>
                      </div>

                      {/* Why this creator? Data-Derived Callout */}
                      <div className="p-4 rounded-2xl bg-[#FFFDF5] dark:bg-[#1E1C14] border border-[#FFD21F]/30 text-xs">
                        <h5 className="font-extrabold text-[#8A6500] dark:text-[#FFD21F] flex items-center gap-1.5 font-display text-xs">
                          <span>💡</span> Why this creator?
                        </h5>
                        <p className="text-[#3A3A48] dark:text-neutral-200 mt-1 leading-relaxed">
                          &ldquo;{matchResult.summary}&rdquo;
                        </p>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono">
                        {Object.entries(matchResult.factors).map(([key, f]) => {
                          const labels: Record<string, string> = {
                            categoryMatch: "Niche & Category",
                            audienceMatch: "Audience & Reach",
                            budgetMatch: "Budget Alignment",
                            locationMatch: "Location Fit",
                            engagementMatch: "Engagement Health",
                            reliabilityMatch: "Reliability History",
                          };
                          return (
                            <div
                              key={key}
                              className="rounded-xl border border-black/6 dark:border-white/5 bg-[#FAFAFC] dark:bg-[#1C1C2A] p-3 shadow-2xs"
                            >
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="text-[#6A6A78] dark:text-[#8E8EA4] font-sans font-medium">{labels[key]}</span>
                                <span className="font-extrabold text-[#0A0A0E] dark:text-white">{f.score}%</span>
                              </div>
                              <div className="mt-1.5 h-1.5 w-full rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] rounded-full"
                                  style={{ width: `${f.score}%` }}
                                />
                              </div>
                              <p className="mt-1.5 text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] line-clamp-2 font-sans">
                                {f.rationale}
                              </p>
                            </div>
                          );
                        })}
                      </div>

                      {matchResult.keyStrengths.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono">
                          <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">Strengths:</span>
                          {matchResult.keyStrengths.map((s, idx) => (
                            <span
                              key={idx}
                              className="rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300"
                            >
                              ✓ {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
