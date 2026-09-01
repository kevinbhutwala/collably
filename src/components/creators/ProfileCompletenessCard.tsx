"use client";

import React from "react";
import Link from "next/link";
import { CreatorProfile } from "@/core/types";
import { calculateProfileCompleteness } from "@/core/utils/scoring";
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

export function ProfileCompletenessCard({ creator }: { creator?: CreatorProfile | null }) {
  const defaultCreator: CreatorProfile = creator || {
    id: "temp",
    userId: "temp",
    fullName: "Creator",
    handle: "@creator",
    headline: "",
    bio: "",
    avatarUrl: "",
    coverImageUrl: "",
    location: "Global",
    languages: ["English"],
    primaryCategory: "Technology & AI",
    secondaryCategories: [],
    verified: false,
    featured: false,
    tier: "Rising",
    rating: 5.0,
    completedCampaignsCount: 0,
    totalFollowers: 0,
    avgEngagementRate: 0,
    startingPrice: 500,
    availableForHire: true,
    socialAccounts: [],
    rateCards: [],
    portfolio: [],
    audience: {
      topCountries: [],
      ageDistribution: [],
      genderSplit: [],
      interests: [],
    },
  };
  const breakdown = calculateProfileCompleteness(defaultCreator);

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0C15]/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6 text-white select-none">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-white/90 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Profile Health &amp; Quality
            </span>
            <span className="text-white/20">•</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 font-mono text-[10px] font-bold">
              {breakdown.grade}
            </span>
          </div>
          <h3 className="text-lg font-bold text-white font-display">
            Creator Profile Completeness
          </h3>
          <p className="text-xs text-white/50">
            Higher scores boost your algorithmic match ranking in brand campaign radar.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <div className="text-right">
            <span className="text-xs text-white/50 block">Score</span>
            <span className="text-3xl font-extrabold text-white">
              {breakdown.totalScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#2A5CFF] to-[#3B73FF] rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(42,92,255,0.6)]"
          style={{ width: `${breakdown.totalScore}%` }}
        />
      </div>

      {/* 4 Dimension Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        {breakdown.sections.map((sec, idx) => (
          <div key={idx} className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-white">{sec.name}</span>
              {sec.completed ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <AlertCircle className="w-4 h-4 text-white/30" />
              )}
            </div>
            <div className="flex justify-between text-[11px] text-white/50">
              <span>Weight: {sec.score}/{sec.maxScore} pts</span>
              <span className={sec.completed ? "text-emerald-400 font-bold" : "text-white/40 font-bold"}>
                {sec.completed ? "Verified" : "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Missing Actionable items if any */}
      {breakdown.missingItems.length > 0 && (
        <div className="pt-2 border-t border-white/10 space-y-2">
          <span className="text-xs font-bold text-white block font-sans">
            Recommended Action to reach 100%:
          </span>
          <div className="space-y-1.5">
            {breakdown.missingItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs font-sans"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="text-white font-medium">{item.label}</span>
                  <span className="text-[10px] font-mono font-bold text-blue-400">+{item.points} pts</span>
                </div>
                <Link href={item.actionUrl}>
                  <button className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all flex items-center gap-1">
                    <span>Fix Now</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
