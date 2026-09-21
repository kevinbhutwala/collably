"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CreatorProfile } from "@/core/types";
import { SafeImage } from "@/components/ui/SafeImage";
import { SocialIcon } from "@/components/ui/SocialIcons";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { useGlobalCurrency } from "@/core/hooks/useGlobalCurrency";
import { CheckCircle2, ArrowRight, Bookmark, Sparkles, Star, Users, MapPin } from "lucide-react";
import { useUIStore } from "@/stores/ui.store";
import { cn } from "@/lib/utils";
import { ReputationBadgeBar } from "@/components/marketplace/ReputationBadgeBar";
import { getClientCreatorBadges } from "@/core/utils/badge.utils";


import { useShortlistStore } from "@/stores/shortlist.store";

export function CreatorCard({ creator }: { creator: CreatorProfile }) {
  const { format } = useGlobalCurrency();
  const { addToast } = useUIStore();
  const { isSaved, toggleSaveCreator } = useShortlistStore();
  const saved = isSaved(creator.id);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = await toggleSaveCreator(creator);
    addToast({
      type: "success",
      title: nowSaved ? "Saved to Shortlist" : "Removed from Shortlist",
      message: `${creator.fullName} has been ${nowSaved ? "added to" : "removed from"} your active brand talent shortlist.`,
    });
  };

  return (
    <div className="group rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 hover:border-[#FFD21F] dark:hover:border-[#FFD21F] p-5 sm:p-6 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-[#0A0A0E] dark:text-[#F4F4F8] relative overflow-hidden select-none font-sans">
      <div>
        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-[#F5F5F9] dark:bg-[#181824] shrink-0 shadow-xs">
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
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3 className="font-extrabold text-sm sm:text-base text-[#0A0A0E] dark:text-white group-hover:text-[#A37F00] dark:group-hover:text-[#FFD21F] transition-colors font-display truncate">
                  {creator.fullName}
                </h3>
                {creator.isInstagramVerified && (
                  <span title="Verified on Instagram">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0095F6] fill-[#0095F6] text-white shrink-0" />
                  </span>
                )}
                {creator.verified && (
                  <span title="AbeyCollab Verified Member">
                    <CheckCircle2 className="w-4 h-4 text-[#FFD21F] shrink-0 fill-[#0A0A0E]" />
                  </span>
                )}
              </div>
              <a
                href={creator.instagramUrl || `https://www.instagram.com/${(creator.handle || "").replace(/^@/, "")}/`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white font-mono truncate flex items-center gap-1 transition-colors"
                title="View on Instagram"
              >
                <span>@{creator.handle.replace(/^@/, "")}</span>
                <span className="text-[9px] text-[#A0A0B0]">↗</span>
              </a>
            </div>
          </div>

          {/* Category Tag & Save Bookmark */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="px-2.5 py-1 rounded-full bg-[#F4F4F8] dark:bg-white/10 border border-black/5 dark:border-white/10 text-[#0A0A0E] dark:text-[#EAEAEF] font-sans text-[10px] font-extrabold uppercase tracking-wider">
              {creator.primaryCategory}
            </span>
            <button
              type="button"
              onClick={handleSave}
              title={saved ? "Saved in Shortlist" : "Save to Shortlist"}
              className={cn(
                "p-1.5 rounded-xl border transition-colors",
                saved
                  ? "bg-[#FFD21F] text-[#0A0A0E] border-black/10 dark:border-transparent shadow-xs"
                  : "bg-white dark:bg-[#181824] text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white border-black/8 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/10"
              )}
            >
              <Bookmark className={cn("w-3.5 h-3.5", saved ? "fill-[#0A0A0E]" : "")} />
            </button>
          </div>
        </div>

        {/* Regional Hub & Location Pill */}
        <div className="flex items-center gap-1.5 flex-wrap mb-2.5">
          {creator.location && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#F4F4F8] dark:bg-[#181824] border border-black/8 dark:border-white/10 text-[11px] font-mono font-semibold text-[#3A3A48] dark:text-[#B0B0C4]">
              <span className="text-xs">{creator.countryFlag || (creator.location.includes("India") ? "🇮🇳" : creator.location.includes("United States") ? "🇺🇸" : "🇦🇪")}</span>
              <span>{creator.location}</span>
            </div>
          )}
          {creator.profileSource === "instagram_public" && (
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono font-medium text-amber-800 dark:text-amber-400">
              <SocialIcon platform="instagram" colored={true} size={11} />
              <span>IG Sourced</span>
            </div>
          )}
        </div>

        {/* Headline & Bio */}
        <p className="text-xs text-[#0A0A0E] dark:text-white font-bold line-clamp-1 mb-1">
          {creator.headline}
        </p>
        <p className="text-xs text-[#5A5A68] dark:text-[#9A9AA8] line-clamp-2 leading-relaxed mb-3.5 font-medium">
          {creator.bio}
        </p>

        {/* Reputation Badges Strip */}
        <div className="mb-3">
          <ReputationBadgeBar badges={getClientCreatorBadges(creator)} maxVisible={3} size="sm" />
        </div>

        {/* Social Accounts Badge Strip */}
        {creator.socialAccounts && creator.socialAccounts.length > 0 && (
          <div className="flex items-center gap-1.5 mb-4 overflow-x-auto no-scrollbar">
            {creator.socialAccounts.map((sa) => (
              <a
                key={sa.id}
                href={sa.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                title={`${sa.platform.toUpperCase()}: ${formatNumber(sa.followers)} followers`}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#F8F8FC] dark:bg-[#181824] border border-black/6 dark:border-white/10 text-xs text-[#5A5A68] dark:text-[#9A9AA8] hover:text-[#0A0A0E] dark:hover:text-white transition-colors shrink-0"
              >
                <SocialIcon platform={sa.platform} size={13} />
                <span className="text-[11px] font-mono font-bold">{formatNumber(sa.followers)}</span>
              </a>
            ))}
          </div>
        )}

        {/* Key Metrics Strip */}
        <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#FAFAFC] dark:bg-[#181824] border border-black/5 dark:border-white/10 mb-2">
          <div>
            <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold block">IG Followers</span>
            <span className="font-black text-[#0A0A0E] dark:text-white text-sm font-mono numeric-tabular">
              {formatNumber(creator.totalFollowers)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold block">Avg Engagement</span>
            <span className="font-black text-emerald-700 dark:text-emerald-400 text-sm font-mono numeric-tabular flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              {creator.avgEngagementRate}% ER
            </span>
          </div>
        </div>
      </div>

      {/* Footer Pricing & CTA */}
      <div className="mt-3 pt-3 border-t border-black/6 dark:border-white/10 flex items-center justify-between gap-3">
        <div>
          <span className="text-[10px] text-[#7A7A8A] dark:text-[#8E8EA4] uppercase font-bold block">
            {creator.isSignedTalent ? "Starting At" : "Market Benchmark"}
          </span>
          <span className="text-sm font-black text-[#0A0A0E] dark:text-white font-mono numeric-tabular">
            <span className="text-[10px] font-normal text-[#7A7A8A] dark:text-[#8E8EA4] mr-0.5">Est.</span>
            {format(creator.startingPrice, (creator as any).currency || "USD")}
          </span>
        </div>

        <Link
          href={`/creators/${creator.id}`}
          className="px-4 py-2 rounded-full bg-[#FFD21F] hover:bg-[#FFE052] dark:bg-[#FFD21F] dark:hover:bg-[#FFE052] border border-black/10 text-xs font-bold text-[#0A0A0E] dark:text-[#0A0A0E] transition-all flex items-center gap-1 shadow-xs hover-lift"
        >
          <span className="text-[#0A0A0E] dark:text-[#0A0A0E] font-bold">Media Kit</span>
          <ArrowRight className="w-3 h-3 text-[#0A0A0E] dark:text-[#0A0A0E]" />
        </Link>
      </div>
    </div>
  );
}
