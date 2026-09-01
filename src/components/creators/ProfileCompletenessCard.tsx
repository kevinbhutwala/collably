"use client";

import React from "react";
import Link from "next/link";
import { CreatorProfile } from "@/core/types";
import { calculateProfileCompleteness } from "@/core/utils/scoring";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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
    <div className="p-6 sm:p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6 text-[#111111]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#111111] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
              Profile Health &amp; Quality
            </span>
            <span className="text-[#E7E7E4]">•</span>
            <span className="px-2 py-0.5 rounded bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] font-mono text-[10px] font-bold">
              {breakdown.grade}
            </span>
          </div>
          <h3 className="text-lg font-bold text-[#111111] font-display">
            Creator Profile Completeness
          </h3>
          <p className="text-xs text-[#6B6B6B]">
            Higher scores boost your algorithmic match ranking in brand campaign radar.
          </p>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <div className="text-right">
            <span className="text-xs text-[#6B6B6B] block">Score</span>
            <span className="text-3xl font-extrabold text-[#111111]">
              {breakdown.totalScore}%
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 rounded-full bg-[#E7E7E4] overflow-hidden">
        <div
          className="h-full bg-[#111111] rounded-full transition-all duration-500"
          style={{ width: `${breakdown.totalScore}%` }}
        />
      </div>

      {/* 4 Dimension Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        {breakdown.sections.map((sec, idx) => (
          <div key={idx} className="p-3.5 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="font-sans font-bold text-[#111111]">{sec.name}</span>
              {sec.completed ? (
                <CheckCircle2 className="w-4 h-4 text-[#111111]" />
              ) : (
                <AlertCircle className="w-4 h-4 text-[#6B6B6B]" />
              )}
            </div>
            <div className="flex justify-between text-[11px] text-[#6B6B6B]">
              <span>Weight: {sec.score}/{sec.maxScore} pts</span>
              <span className={sec.completed ? "text-[#111111] font-bold" : "text-[#6B6B6B] font-bold"}>
                {sec.completed ? "Verified" : "Pending"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Missing Actionable items if any */}
      {breakdown.missingItems.length > 0 && (
        <div className="pt-2 border-t border-[#E7E7E4] space-y-2">
          <span className="text-xs font-bold text-[#111111] block font-sans">
            Recommended Action to reach 100%:
          </span>
          <div className="space-y-1.5">
            {breakdown.missingItems.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-between text-xs font-sans"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                  <span className="text-[#111111] font-medium">{item.label}</span>
                  <span className="text-[10px] font-mono font-bold text-[#111111]">+{item.points} pts</span>
                </div>
                <Link href={item.actionUrl}>
                  <Button variant="secondary" size="sm" rightIcon={<ArrowRight className="w-3 h-3" />} className="rounded-[9px]">
                    Fix Now
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
