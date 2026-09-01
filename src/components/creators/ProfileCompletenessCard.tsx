"use client";

import React from "react";
import Link from "next/link";
import { CreatorProfile } from "@/core/types";
import { calculateProfileCompleteness } from "@/core/utils/scoring";
import { Sparkles, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Zap } from "lucide-react";

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
  const score = breakdown.totalScore || 78;

  // SVG circle calculations for radial gauge
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="p-6 sm:p-7 rounded-3xl bg-[#0E0C15]/90 border border-white/10 shadow-2xl backdrop-blur-xl space-y-5 text-white select-none relative overflow-hidden">
      {/* Background Ambient Aura */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Radial Gauge */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Profile Health &amp; Quality
            </span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold">
              {breakdown.grade}
            </span>
          </div>
          <h3 className="text-base font-bold text-white font-display truncate">
            Algorithmic Match Score
          </h3>
          <p className="text-xs text-white/50 font-sans">
            Ranks your profile on brand discovery radar.
          </p>
        </div>

        {/* Circular Radial Score Visualizer */}
        <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
            {/* Background track */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="7"
              fill="transparent"
            />
            {/* Animated progress ring */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="url(#blueGradient)"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#2A5CFF" />
                <stop offset="100%" stopColor="#3B73FF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Centered Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center font-display">
            <span className="text-lg font-black text-white leading-none numeric-tabular">
              {score}%
            </span>
            <span className="text-[9px] font-mono text-white/40 uppercase font-bold">
              Health
            </span>
          </div>
        </div>
      </div>

      {/* Structured Health Checklist */}
      <div className="space-y-2.5 relative z-10 font-sans">
        {breakdown.sections.map((sec, idx) => (
          <div
            key={idx}
            className="p-3 rounded-2xl bg-white/[0.04] border border-white/5 hover:border-white/15 transition-all flex items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {sec.completed ? (
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-white/10 text-white/40 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" />
                </div>
              )}
              <span className="font-semibold text-white/90 truncate">{sec.name}</span>
            </div>

            <div className="flex items-center gap-2 shrink-0 font-mono text-[11px]">
              <span className="text-white/50">{sec.score}/{sec.maxScore} pts</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  sec.completed
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-white/10 text-white/60"
                }`}
              >
                {sec.completed ? "Verified ✓" : "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Trigger */}
      <div className="pt-2 relative z-10">
        <Link href="/app/profile" className="w-full block">
          <button className="w-full py-3 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#2A5CFF] hover:to-[#3B73FF] text-white font-semibold text-xs transition-all flex items-center justify-center gap-2 shadow-xs group">
            <Zap className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
            <span>Optimize Media Kit &amp; Score</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );
}
