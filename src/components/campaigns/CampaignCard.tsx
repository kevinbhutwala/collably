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
  const originalCurrency = (campaign.budget?.currency || "USD").toUpperCase();
  const isDifferentCurrency = originalCurrency !== displayCurrency.toUpperCase();
  const maxCreators = campaign.maxCreators || 10;
  const acceptedCount = campaign.acceptedCount || 0;
  const progressPercent = Math.min(100, Math.round((acceptedCount / maxCreators) * 100));

  return (
    <div className="group rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 hover:border-[#FFD21F] dark:hover:border-[#FFD21F] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative text-[#0A0A0E] dark:text-[#F4F4F8] select-none">
      {/* Cover Image Stage */}
      <div className="relative h-52 w-full bg-[#F5F5F9] dark:bg-[#1A1A26] overflow-hidden border-b border-black/5 dark:border-white/5">
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
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <CategoryBadge category={campaign.category} size="xs" showIcon={true} />
          <span
            className="px-2.5 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[11px] font-mono font-extrabold flex items-center gap-1 shadow-sm"
            title={isDifferentCurrency ? `Authoritative brief budget: ${formatCurrency(budgetAmount, originalCurrency)}` : undefined}
          >
            <span className="numeric-tabular">
              {formatCurrency(budgetAmount, originalCurrency)}
              {isDifferentCurrency && (
                <span className="text-[9.5px] font-normal opacity-85 ml-1">
                  ({convertAndFormat(budgetAmount, originalCurrency)})
                </span>
              )}
            </span>
            <span className="text-[9px] text-[#0A0A0E]/80 font-bold">/creator</span>
          </span>
        </div>

        {/* Brand Details Bar */}
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/90 dark:bg-[#161622]/90 border border-white dark:border-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-xs">
              <BrandIcon name={campaign.brand?.companyName || "Brand"} size={20} className="text-[#0A0A0E] dark:text-white" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white leading-tight font-display truncate drop-shadow-xs">
                {campaign.brand?.companyName || "Verified Sponsor"}
              </p>
              <span className="text-[10px] text-[#FFD21F] font-mono font-bold flex items-center gap-1 uppercase tracking-wider drop-shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F]" />
                Escrow Pre-Funded
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-[#F5F5F9] dark:bg-[#1A1A26] border border-black/8 dark:border-white/10 flex items-center justify-center shrink-0 text-[#0A0A0E] dark:text-[#F4F4F8] group-hover:bg-[#FFD21F] group-hover:border-[#FFD21F] dark:group-hover:text-[#0A0A0E] transition-all shadow-2xs">
              <TitleIcon title={campaign.title} category={campaign.category} className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-bold text-base text-[#0A0A0E] dark:text-[#F4F4F8] group-hover:text-[#A37F00] dark:group-hover:text-[#FFE052] transition-colors line-clamp-1 font-display">
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
              <Users className="w-3.5 h-3.5 text-[#0A0A0E] dark:text-[#F4F4F8]" />
              <span>{acceptedCount} / {maxCreators} Creators</span>
            </span>
            <span className="text-[11px] text-[#0A0A0E] dark:text-[#F4F4F8] font-bold">
              {maxCreators - acceptedCount} Slots Left
            </span>
          </div>

          {/* Slot Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-black/5 dark:bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] rounded-full transition-all duration-300"
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

          <Link href={`/campaigns/${campaign.id}`}>
            <button className="px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 hover:bg-gradient-to-r hover:from-[#FFD21F] hover:to-[#FFC700] hover:text-[#0A0A0E] dark:hover:text-[#0A0A0E] text-[#0A0A0E] dark:text-[#F4F4F8] font-bold text-xs transition-all flex items-center gap-1.5 border border-black/5 dark:border-white/10">
              <span>View Brief</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
