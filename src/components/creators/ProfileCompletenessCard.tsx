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
    <div className="p-5 sm:p-6 rounded-3xl bg-white border border-black/8 shadow-xs space-y-4 text-[#0A0A0E] select-none relative overflow-hidden">
      {/* Background Ambient Aura */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#FFD21F]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header with Radial Gauge */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-black/8 relative z-10">
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-pulse" />
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E]">
              Profile Strength
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-extrabold text-[#0A0A0E] font-display tracking-tight">
            Discovery Score
          </h3>
          <p className="text-[11px] text-[#5A5A68]">
            Higher score improves ranking in search.
          </p>
        </div>

        {/* Circular Radial Gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 96 96">
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="#F0F0F5"
              strokeWidth="7"
              fill="transparent"
            />
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="url(#goldGaugeGradientLight)"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="goldGaugeGradientLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFD21F" />
                <stop offset="60%" stopColor="#FFE052" />
                <stop offset="100%" stopColor="#FFC700" />
              </linearGradient>
            </defs>
          </svg>

          {/* Centered Score */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className="text-base font-black text-[#0A0A0E] font-mono tracking-tight numeric-tabular">
              {score}%
            </span>
            <span className="text-[8px] font-mono font-bold text-[#0A0A0E] uppercase tracking-widest -mt-0.5">
              Rank
            </span>
          </div>
        </div>
      </div>

      {/* Verification Checklist */}
      <div className="space-y-1.5 relative z-10">
        <div className="p-3 rounded-2xl bg-[#F8F8FC] border border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD21F] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#0A0A0E]">Social Channels</p>
              <p className="text-[10px] text-[#6A6A78] font-mono">Connected &amp; verified</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#0A0A0E]">+35 pts</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#F8F8FC] border border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD21F] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#0A0A0E]">Rate Card</p>
              <p className="text-[10px] text-[#6A6A78] font-mono">Starting rate set</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#0A0A0E]">+25 pts</span>
        </div>

        <div className="p-3 rounded-2xl bg-[#F8F8FC] border border-black/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-3.5 h-3.5 text-[#7A7A8A] shrink-0" />
            <div>
              <p className="text-xs font-bold text-[#0A0A0E]">Portfolio Samples</p>
              <p className="text-[10px] text-[#6A6A78] font-mono">Add 2 past deliverables</p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold text-[#5A5A68]">+20 pts</span>
        </div>
      </div>

      {/* CTA Button */}
      <Link href="/app/profile" className="block pt-0.5">
        <button className="w-full py-2.5 px-4 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all shadow-xs border border-black/10 flex items-center justify-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-[#0A0A0E] fill-[#0A0A0E]" />
          <span>Update Profile</span>
          <ArrowRight className="w-3 h-3" />
        </button>
      </Link>
    </div>
  );
}
