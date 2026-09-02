"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CreatorProfile } from "@/core/types";
import { SafeImage } from "@/components/ui/SafeImage";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { CheckCircle2, ArrowRight, Bookmark, Sparkles, Star, Users } from "lucide-react";
import { useUIStore } from "@/stores/ui.store";
import { cn } from "@/lib/utils";

export function CreatorCard({ creator }: { creator: CreatorProfile }) {
  const { addToast } = useUIStore();
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSaved(!isSaved);
    addToast({
      type: "success",
      title: isSaved ? "Removed from Shortlist" : "Saved to Shortlist",
      message: `${creator.fullName} has been ${isSaved ? "removed from" : "added to"} your active brand talent shortlist.`,
    });
  };

  return (
    <div className="group rounded-3xl bg-white border border-black/8 hover:border-[#FFD21F] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-[#0A0A0E] relative overflow-hidden select-none font-sans">
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-black/10 bg-[#F5F5F9] shrink-0 shadow-xs">
              <SafeImage
                src={creator.avatarUrl}
                alt={creator.fullName}
                fallbackType="creator"
                fallbackName={creator.fullName}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm sm:text-base text-[#0A0A0E] group-hover:text-[#A37F00] transition-colors font-display truncate">
                  {creator.fullName}
                </h3>
                {creator.verified && (
                  <CheckCircle2 className="w-4 h-4 text-[#FFD21F] shrink-0 fill-[#0A0A0E]" />
                )}
              </div>
              <p className="text-xs text-[#7A7A8A] font-mono truncate">@{creator.handle}</p>
            </div>
          </div>

          {/* Category Tag & Save Bookmark */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="px-2.5 py-1 rounded-full bg-[#F4F4F8] border border-black/5 text-[#0A0A0E] font-sans text-[10px] font-extrabold uppercase tracking-wider">
              {creator.primaryCategory}
            </span>
            <button
              type="button"
              onClick={handleSave}
              title={isSaved ? "Saved in Shortlist" : "Save to Shortlist"}
              className={cn(
                "p-1.5 rounded-xl border transition-colors",
                isSaved
                  ? "bg-[#FFD21F] text-[#0A0A0E] border-black/10"
                  : "bg-white text-[#7A7A8A] hover:text-[#0A0A0E] border-black/8 hover:bg-black/5"
              )}
            >
              <Bookmark className={cn("w-3.5 h-3.5", isSaved ? "fill-[#0A0A0E]" : "")} />
            </button>
          </div>
        </div>

        {/* Headline & Bio */}
        <p className="text-xs text-[#0A0A0E] font-bold line-clamp-1 mb-1">
          {creator.headline}
        </p>
        <p className="text-xs text-[#5A5A68] line-clamp-2 leading-relaxed mb-3.5 font-medium">
          {creator.bio}
        </p>

        {/* Social Accounts Badge Strip */}
        {creator.socialAccounts && creator.socialAccounts.length > 0 && (
          <div className="flex items-center gap-1.5 mb-4 overflow-x-auto no-scrollbar">
            {creator.socialAccounts.map((sa) => (
              <span
                key={sa.id}
                title={`${sa.platform.toUpperCase()}: ${formatNumber(sa.followers)} followers`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#F8F8FC] border border-black/6 text-xs text-[#5A5A68] hover:text-[#0A0A0E] transition-colors shrink-0"
              >
                <SocialIcon platform={sa.platform} className="w-3.5 h-3.5" />
                <span className="text-[11px] font-mono font-bold">{formatNumber(sa.followers)}</span>
              </span>
            ))}
          </div>
        )}

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#FAFAFC] border border-black/5 mb-2">
          <div>
            <span className="text-[10px] text-[#7A7A8A] uppercase font-bold block">Total Audience</span>
            <span className="font-black text-[#0A0A0E] text-sm font-mono numeric-tabular">
              {formatNumber(creator.totalFollowers)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#7A7A8A] uppercase font-bold block">Avg Engagement</span>
            <span className="font-black text-emerald-700 text-sm font-mono numeric-tabular flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {creator.avgEngagementRate}% ER
            </span>
          </div>
        </div>
      </div>

      {/* Footer Pricing & CTA */}
      <div className="mt-3 pt-3 border-t border-black/6 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#7A7A8A] uppercase font-bold block">Starting Rate</span>
          <span className="text-sm font-black text-[#0A0A0E] font-mono numeric-tabular">
            {formatCurrency(creator.startingPrice)}
          </span>
        </div>

        <Link href={`/creators/${creator.id}`}>
          <button className="px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-2xs border border-black/10">
            <span>View Media Kit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
