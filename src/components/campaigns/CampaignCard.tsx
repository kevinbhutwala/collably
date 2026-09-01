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
    <div className="group rounded-3xl bg-[#120c16] border border-white/10 hover:border-[hsl(327,100%,50%)]/40 overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between relative text-white">
      {/* Top Subtle Gradient Accent Line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] opacity-0 group-hover:opacity-100 transition-opacity z-20" />

      {/* Cover Image Stage with Vibrant Overlay */}
      <div className="relative h-52 w-full bg-[#0a070a] overflow-hidden">
        <SafeImage
          src={campaign.coverImage}
          alt={campaign.title}
          fallbackType="campaign"
          fallbackName={campaign.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
        />
        {/* Crisp Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120c16] via-[#120c16]/50 to-transparent" />

        {/* Top Floating Glass Badges */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 text-[11px] font-display font-bold shadow-md">
            {campaign.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-[#0a070a]/80 backdrop-blur-md text-emerald-300 border border-emerald-500/40 text-[11px] font-mono font-black flex items-center gap-1 shadow-lg">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{formatCurrency(budgetAmount)}</span>
            <span className="text-[9px] text-slate-400 font-normal">/creator</span>
          </span>
        </div>

        {/* Brand Details Bar */}
        <div className="absolute bottom-3.5 left-4 right-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/[0.08] border border-white/20 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <BrandIcon name={campaign.brand?.companyName || "Brand"} size={20} className="text-white" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-black text-white leading-tight font-display truncate">
                {campaign.brand?.companyName || "Verified Sponsor"}
              </p>
              <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Escrow Pre-Funded
              </span>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-md bg-pink-500/15 backdrop-blur-sm text-pink-300 font-mono text-[10px] border border-pink-500/30 font-bold">
            Verified Brief
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <h3 className="font-black text-base sm:text-lg text-white group-hover:text-[hsl(327,100%,55%)] transition-colors line-clamp-1 font-display tracking-tight">
            {campaign.title}
          </h3>
          <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans">
            {campaign.tagline || campaign.description}
          </p>
        </div>

        {/* Deliverables Pills */}
        <div className="space-y-3 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {campaign.deliverables?.map((del) => (
              <span
                key={del.id}
                className="text-[11px] px-2.5 py-1 rounded-xl bg-white/[0.05] border border-white/10 text-slate-200 font-mono font-semibold"
              >
                {del.count}x {del.type}
              </span>
            ))}
          </div>

          {/* Roster Capacity Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span className="flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <strong className="text-white">{acceptedCount}</strong> of {maxCreators} Spots Filled
              </span>
              <span className="font-bold text-[hsl(327,100%,55%)]">{progressPercent}%</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] h-full rounded-full transition-all"
                style={{ width: `${Math.max(8, progressPercent)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Footer Meta Details */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px]">Due {campaign.timeline?.contentSubmissionDeadline || "In 14 Days"}</span>
          </div>
          <span className="text-[11px] font-bold text-slate-300 font-display">
            90% Net Payout
          </span>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-5 pt-0">
        <Link href={`/campaigns/${campaign.id}`} className="w-full block">
          <button className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] hover:brightness-110 text-white font-bold text-xs sm:text-sm font-display tracking-tight transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-pink-500/25">
            <span>View Brief &amp; Apply</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );
}
