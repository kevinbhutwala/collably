"use client";

import React from "react";
import Link from "next/link";
import { Campaign } from "@/core/types";
import { SafeImage } from "@/components/ui/SafeImage";
import { BrandIcon } from "@/components/ui/BrandLogos";
import { formatCurrency } from "@/core/utils/formatters";
import { useGlobalCurrency } from "@/core/hooks/useGlobalCurrency";
import { Users, Calendar, ArrowRight } from "lucide-react";
import { CategoryBadge, TitleIcon } from "@/components/ui/TitleIconBadge";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const { currency: displayCurrency, convertAndFormat } = useGlobalCurrency();
  const budgetAmount = campaign.budget?.perCreatorBudget || (campaign.budget as any) || 2500;
  const originalCurrency = (campaign.budget?.currency || "INR").toUpperCase();
  const isDifferentCurrency = originalCurrency !== displayCurrency.toUpperCase();
  const maxCreators = campaign.maxCreators || 10;
  const acceptedCount = campaign.acceptedCount || 0;
  const progressPercent = Math.min(100, Math.round((acceptedCount / maxCreators) * 100));

  return (
    <Link
      href={`/campaigns/${campaign.id}`}
      className="group rounded-2xl sm:rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 hover:border-primary dark:hover:border-primary overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 active:scale-[0.99] touch-manipulation flex flex-col justify-between relative text-[#0B0A14] dark:text-[#F4F4F8] select-none cursor-pointer"
    >
      {/* Cover Image Stage */}
      <div className="relative h-44 sm:h-52 w-full bg-[#F5F5F9] dark:bg-[#1A1A26] overflow-hidden border-b border-black/5 dark:border-white/5">
        <SafeImage
          src={campaign.coverImage}
          alt={campaign.title}
          fallbackType="campaign"
          fallbackName={campaign.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10">
          <CategoryBadge category={campaign.category} size="xs" showIcon={true} />
          <span
            className="px-2.5 py-1 rounded-full bg-primary text-white text-[11px] font-mono font-extrabold flex items-center gap-1 shadow-md border border-white/15"
            title={isDifferentCurrency ? `Authoritative brief budget: ${formatCurrency(budgetAmount, originalCurrency)}` : undefined}
          >
            <span className="numeric-tabular text-white">
              {formatCurrency(budgetAmount, originalCurrency)}
              {isDifferentCurrency && (
                <span className="text-[9.5px] font-normal text-purple-200 ml-1">
                  ({convertAndFormat(budgetAmount, originalCurrency)})
                </span>
              )}
            </span>
            <span className="text-[9px] text-purple-200 font-bold">/creator</span>
          </span>
        </div>

        {/* Brand Details Bar */}
        <div className="absolute bottom-3 sm:bottom-3.5 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/90 dark:bg-[#161622]/90 border border-white dark:border-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-xs">
              <BrandIcon name={campaign.brand?.companyName || "Brand"} size={18} className="text-[#0B0A14] dark:text-white" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white leading-tight font-display truncate drop-shadow-xs">
                {campaign.brand?.companyName || "Verified Sponsor"}
              </p>
              <span className="text-[9.5px] sm:text-[10px] text-primary font-mono font-bold flex items-center gap-1 uppercase tracking-wider drop-shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                Escrow Pre-Funded
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-3.5 sm:space-y-4">
        <div className="space-y-1.5 sm:space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#F5F5F9] dark:bg-[#1A1A26] border border-black/8 dark:border-white/10 flex items-center justify-center shrink-0 text-white dark:text-[#F4F4F8] group-hover:bg-primary group-hover:border-primary group-hover:text-white dark:group-hover:text-white transition-all shadow-2xs">
              <TitleIcon title={campaign.title} category={campaign.category} className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-bold text-sm sm:text-base text-[#0B0A14] dark:text-[#F4F4F8] group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-1 font-display">
              {campaign.title}
            </h3>
          </div>
          <p className="text-xs text-[#5A5A68] dark:text-[#A0A0B4] line-clamp-2 leading-relaxed font-sans font-normal">
            {campaign.description}
          </p>
        </div>

        {/* Requirements & Slots */}
        <div className="space-y-2 pt-2 border-t border-black/8 dark:border-white/10">
          <div className="flex items-center justify-between text-xs font-mono text-[#6A6A78] dark:text-[#8E8EA4]">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#0B0A14] dark:text-[#F4F4F8]" />
              <span>{acceptedCount} / {maxCreators} Creators</span>
            </span>
            <span className="text-[11px] text-[#0B0A14] dark:text-[#F4F4F8] font-bold">
              {maxCreators - acceptedCount} Slots Left
            </span>
          </div>

          {/* Slot Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary via-[#9333EA] to-accent rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-[#7A7A8A] dark:text-[#8E8EA4] flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>3 days left</span>
          </span>

          <span className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:text-white dark:group-hover:text-[#0B0A14] text-[#0B0A14] dark:text-[#F4F4F8] font-bold text-xs transition-all flex items-center gap-1.5 border border-black/5 dark:border-white/10">
            <span>View Brief</span>
            <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  );
}
