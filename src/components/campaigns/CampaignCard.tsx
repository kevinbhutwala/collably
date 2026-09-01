"use client";

import React from "react";
import Link from "next/link";
import { Campaign } from "@/core/types";
import { SafeImage } from "@/components/ui/SafeImage";
import { BrandIcon } from "@/components/ui/BrandLogos";
import { formatCurrency } from "@/core/utils/formatters";
import { Users, Calendar, ArrowRight, ShieldCheck } from "lucide-react";

export function CampaignCard({ campaign }: { campaign: Campaign }) {
  const budgetAmount = campaign.budget?.perCreatorBudget || (campaign.budget as any) || 2500;
  const maxCreators = campaign.maxCreators || 10;
  const acceptedCount = campaign.acceptedCount || 0;
  const progressPercent = Math.min(100, Math.round((acceptedCount / maxCreators) * 100));

  return (
    <div className="group rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] hover:border-[#101010] overflow-hidden shadow-xs hover:shadow-editorial transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative text-[#101010]">
      {/* Cover Image Stage */}
      <div className="relative h-52 w-full bg-[#FAFAF8] overflow-hidden border-b border-[#E7E7E4]">
        <SafeImage
          src={campaign.coverImage}
          alt={campaign.title}
          fallbackType="campaign"
          fallbackName={campaign.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Crisp Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/80 via-transparent to-transparent" />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-md bg-[#FFFFFF] text-[#101010] border border-[#E7E7E4] text-[11px] font-display font-bold shadow-xs uppercase tracking-wider">
            {campaign.category}
          </span>
          <span className="px-2.5 py-1 rounded-md bg-[#101010] text-[#FAFAF8] text-[11px] font-mono font-bold flex items-center gap-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
            <span className="numeric-tabular">{formatCurrency(budgetAmount)}</span>
            <span className="text-[9px] text-[#8A8A8A] font-normal">/creator</span>
          </span>
        </div>

        {/* Brand Details Bar */}
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] flex items-center justify-center shrink-0 shadow-xs">
              <BrandIcon name={campaign.brand?.companyName || "Brand"} size={20} className="text-[#101010]" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-[#FFFFFF] leading-tight font-display truncate">
                {campaign.brand?.companyName || "Verified Sponsor"}
              </p>
              <span className="text-[10px] text-[#B7FF3C] font-mono font-bold flex items-center gap-1 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
                Escrow Pre-Funded
              </span>
            </div>
          </div>

          <span className="px-2 py-0.5 rounded-md bg-[#FFFFFF] text-[#101010] font-mono text-[10px] border border-[#E7E7E4] font-bold uppercase tracking-wider">
            Verified Brief
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-bold text-base sm:text-lg text-[#101010] line-clamp-1 font-display tracking-tight">
            {campaign.title}
          </h3>
          <p className="text-xs text-[#626262] line-clamp-2 leading-relaxed font-sans font-normal">
            {campaign.tagline || campaign.description}
          </p>
        </div>

        {/* Deliverables Pills */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {campaign.deliverables?.map((del) => (
              <span
                key={del.id}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-[#FAFAF8] border border-[#E7E7E4] text-[#101010] font-mono font-semibold uppercase tracking-wider"
              >
                {del.count}x {del.type}
              </span>
            ))}
          </div>

          {/* Roster Capacity Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#626262]">
              <span className="flex items-center gap-1 font-sans">
                <Users className="w-3.5 h-3.5 text-[#626262]" />
                <strong className="text-[#101010] numeric-tabular">{acceptedCount}</strong> of <span className="numeric-tabular">{maxCreators}</span> Spots Filled
              </span>
              <span className="font-bold text-[#101010] numeric-tabular">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#E7E7E4] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#101010] h-full rounded-full transition-all"
                style={{ width: `${Math.max(8, progressPercent)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer Meta Details */}
        <div className="pt-3 border-t border-[#E7E7E4] flex items-center justify-between text-xs text-[#626262] font-mono">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#626262]" />
            <span className="text-[11px] font-sans">Due {campaign.timeline?.contentSubmissionDeadline || "In 14 Days"}</span>
          </div>
          <span className="text-[11px] font-bold text-[#101010] font-mono">
            90% Net Payout
          </span>
        </div>
      </div>

      {/* Action Button: Geist 14px / 600 */}
      <div className="p-5 pt-0">
        <Link href={`/campaigns/${campaign.id}`} className="w-full block">
          <button className="w-full py-2.5 px-4 rounded-[9px] bg-[#101010] hover:bg-[#262626] text-[#FAFAF8] font-semibold text-xs sm:text-sm font-sans tracking-tight transition-all duration-200 flex items-center justify-center gap-2 shadow-xs cursor-pointer group">
            <span>View Brief &amp; Apply</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#B7FF3C] group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );
}
