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
    <div className="group rounded-3xl bg-[#0E0C15]/90 border border-white/10 hover:border-blue-500/40 overflow-hidden shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative text-white select-none">
      {/* Cover Image Stage */}
      <div className="relative h-52 w-full bg-[#07070B] overflow-hidden border-b border-white/10">
        <SafeImage
          src={campaign.coverImage}
          alt={campaign.title}
          fallbackType="campaign"
          fallbackName={campaign.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0C15] via-transparent to-black/40" />

        {/* Top Floating Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/15 text-[10px] font-mono font-bold uppercase tracking-wider">
            {campaign.category}
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#2A5CFF] text-white text-[11px] font-mono font-bold flex items-center gap-1 shadow-md">
            <span className="numeric-tabular">{formatCurrency(budgetAmount)}</span>
            <span className="text-[9px] text-white/70 font-normal">/creator</span>
          </span>
        </div>

        {/* Brand Details Bar */}
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-xs">
              <BrandIcon name={campaign.brand?.companyName || "Brand"} size={20} className="text-white" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white leading-tight font-display truncate">
                {campaign.brand?.companyName || "Verified Sponsor"}
              </p>
              <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1 uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Escrow Pre-Funded
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="font-bold text-base text-white group-hover:text-blue-400 transition-colors line-clamp-1 font-display">
            {campaign.title}
          </h3>
          <p className="text-xs text-white/60 line-clamp-2 leading-relaxed font-sans font-normal">
            {campaign.description}
          </p>
        </div>

        {/* Requirements & Slots */}
        <div className="space-y-2 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-xs font-mono text-white/60">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-blue-400" />
              <span>{acceptedCount} / {maxCreators} Creators</span>
            </span>
            <span className="text-[11px] text-emerald-400 font-bold">
              {maxCreators - acceptedCount} Slots Left
            </span>
          </div>

          {/* Slot Progress Bar */}
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2A5CFF] to-[#3B73FF] rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-2 flex items-center justify-between gap-3">
          <span className="text-[11px] font-mono text-white/40 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>3 days left</span>
          </span>

          <Link href={`/campaigns/${campaign.id}`}>
            <button className="px-4 py-2 rounded-full bg-white/10 hover:bg-gradient-to-r hover:from-[#2A5CFF] hover:to-[#3B73FF] text-white font-semibold text-xs transition-all flex items-center gap-1.5">
              <span>View Brief</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
