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
    <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#101018] to-[#08080C] border border-[#FFD21F]/25 shadow-2xl backdrop-blur-xl space-y-5 text-white select-none relative overflow-hidden">
      {/* Background Ambient Aura */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#FFD21F]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Radial Gauge */}
      <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 relative z-10">
        <div className="space-y-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#FFD21F] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
              Sponsor Quality Grade
            </span>
          </div>
          <h3 className="text-base font-extrabold text-white font-display tracking-tight">
            Profile Health &amp; Discovery
          </h3>
          <p className="text-xs text-white/50 font-sans">
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
              stroke="rgba(255, 255, 255, 0.08)"
              strokeWidth="7"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="url(#goldGaugeGradient)"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="goldGaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD21F" />
                <stop offset="50%" stopColor="#FFE575" />
                <stop offset="100%" stopColor="#FFFFFF" />
              </linearGradient>
            </defs>
          </svg>

          {/* Centered Score */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-lg font-black text-white font-mono tracking-tight numeric-tabular">
              {score}%
            </span>
            <span className="text-[9px] font-mono font-bold text-[#FFD21F] uppercase tracking-widest -mt-0.5">
              A+ Rank
            </span>
          </div>
        </div>
      </div>

      {/* Verification Checklist */}
      <div className="space-y-2 relative z-10">
        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-white/50 pb-1">
          <span>CRITICAL DATA POINTS</span>
          <span>WEIGHT</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#14141E]/90 to-[#0A0A10]/90 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#FFD21F] shrink-0" />
            <div>
              <p className="text-xs font-bold text-white font-sans">Social Audience Channels</p>
              <p className="text-[10px] text-white/50 font-mono">YouTube &amp; Instagram verified</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-extrabold text-[#FFD21F]">+35 pts</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#14141E]/90 to-[#0A0A10]/90 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[#FFD21F] shrink-0" />
            <div>
              <p className="text-xs font-bold text-white font-sans">Rate Card &amp; Sponsorship Pricing</p>
              <p className="text-[10px] text-white/50 font-mono">Starting rate active</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-extrabold text-[#FFD21F]">+25 pts</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-[#14141E]/90 to-[#0A0A10]/90 border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 text-white/60 shrink-0" />
            <div>
              <p className="text-xs font-bold text-white font-sans">Video Reel &amp; 4K Portfolio</p>
              <p className="text-[10px] text-white/50 font-mono">Upload 2 sample past deliverables</p>
            </div>
          </div>
          <span className="text-[11px] font-mono font-bold text-white/70">+20 pts</span>
        </div>
      </div>

      {/* CTA Button */}
      <Link href="/app/profile" className="block pt-1">
        <button className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all shadow-[0_0_25px_rgba(255,210,31,0.45)] border border-white/50 flex items-center justify-center gap-2">
          <Zap className="w-3.5 h-3.5 text-[#0A0A0E] fill-[#0A0A0E]" />
          <span>Optimize Media Kit &amp; Score</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </Link>
    </div>
  );
}
