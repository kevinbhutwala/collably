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
    <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0A1026] to-[#04060E] border border-blue-500/20 shadow-2xl backdrop-blur-xl space-y-5 text-white select-none relative overflow-hidden">
      {/* Background Ambient Aura */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Radial Gauge */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-blue-500/15 relative z-10">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-200/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Sponsor Quality Grade
            </span>
          </div>
          <h3 className="text-base font-extrabold text-white font-display tracking-tight">
            Profile Health &amp; Discovery
          </h3>
          <p className="text-xs text-blue-200/50 font-sans">
            Score determines ranking in AI brand discovery search.
          </p>
        </div>

        {/* Circular Radial Gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="rgba(59, 130, 246, 0.15)"
              strokeWidth="7"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="url(#navyBlueGaugeGradient)"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="navyBlueGaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1D4ED8" />
                <stop offset="50%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
          </svg>

          {/* Centered Score */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-lg font-black text-white font-mono tracking-tight numeric-tabular">
              {score}%
            </span>
            <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest -mt-0.5">
              A+ Rank
            </span>
          </div>
        </div>
      </div>

      {/* Verification Checklist */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-blue-200/60 pb-1">
          <span>CRITICAL DATA POINTS</span>
          <span>WEIGHT</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0C1738]/80 to-[#081026]/90 border border-blue-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white font-sans">Social Audience Channels</p>
              <p className="text-[10px] text-blue-200/50 font-mono">YouTube &amp; Instagram verified</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-400">+35 pts</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0C1738]/80 to-[#081026]/90 border border-blue-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white font-sans">Rate Card &amp; Sponsorship Pricing</p>
              <p className="text-[10px] text-blue-200/50 font-mono">Starting rate active</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-emerald-400">+25 pts</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0C1738]/80 to-[#081026]/90 border border-blue-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-blue-400 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white font-sans">Video Reel &amp; 4K Portfolio</p>
              <p className="text-[10px] text-blue-200/50 font-mono">Upload 2 sample past deliverables</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-blue-300">+20 pts</span>
        </div>
      </div>

      {/* CTA Button */}
      <Link href="/app/profile" className="block pt-1">
        <button className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#1D4ED8] via-[#2563EB] to-[#3B82F6] hover:from-[#1E40AF] hover:via-[#1D4ED8] hover:to-[#2563EB] text-white font-semibold text-xs transition-all shadow-[0_0_25px_rgba(37,99,235,0.55)] border border-blue-300/30 flex items-center justify-center gap-2">
          <Zap className="w-3.5 h-3.5 text-blue-200 fill-blue-200" />
          <span>Optimize Media Kit &amp; Score</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Link>
    </div>
  );
}
