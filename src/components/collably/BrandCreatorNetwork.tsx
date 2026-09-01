"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { EDITORIAL_PORTRAITS } from "@/data/editorialPortraits";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Building2,
  Lock,
} from "lucide-react";
import Link from "next/link";

export function BrandCreatorNetwork() {
  const maleCreator = EDITORIAL_PORTRAITS.heroMaleMain;
  const femaleCreator = EDITORIAL_PORTRAITS.heroFemaleMain;
  const beautyCreator = EDITORIAL_PORTRAITS.supportingFemale1;

  const deals = [
    {
      id: "deal-1",
      brand: "VERTEX / LABS",
      brandNiche: "Smart Hardware & AI",
      creator: maleCreator,
      deliverable: "1x 4K Dedicated Review + Whitelisting",
      budget: "₹28,000",
      status: "Pre-Funded Escrow",
    },
    {
      id: "deal-2",
      brand: "NOVA STUDIO",
      brandNiche: "Minimalist Apparel & Tech",
      creator: femaleCreator,
      deliverable: "2x 60s Reels + Story Bundle",
      budget: "₹32,500",
      status: "Deliverable Approved",
    },
    {
      id: "deal-3",
      brand: "STUDIO 09",
      brandNiche: "Clean Formulation Skincare",
      creator: beautyCreator,
      deliverable: "1x Integrated YouTube Spotlight",
      budget: "₹18,500",
      status: "Payout Disbursed",
    },
  ];

  return (
    <section className="py-24 sm:py-36 bg-[#FAFAFA] border-b border-[#E6E6E8] relative overflow-hidden select-none text-[#08090C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF0FF] border border-[#C8CEFF] text-xs font-mono font-bold text-[#3047FF]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>03 / CREATIVE NETWORK</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-extrabold text-[#08090C] tracking-tight font-display">
            Direct brand × creator ties.
          </h2>
          <p className="text-sm sm:text-base text-[#6B7280] font-sans">
            How ambitious brands connect with top-tier creators under 100% pre-funded milestone security.
          </p>
        </div>

        {/* ── 3 NETWORK DEAL PIPELINE CARDS (Section 18) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E6E6E8] shadow-editorial hover:border-[#3047FF] transition-all duration-300 space-y-6 flex flex-col justify-between"
            >
              {/* Top: Brand Header */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-[#E6E6E8]">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-[#3047FF]" />
                    <span className="font-mono text-xs font-extrabold tracking-wider text-[#08090C]">
                      {deal.brand}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#EEF0FF] text-[#3047FF]">
                    BRAND
                  </span>
                </div>
                <p className="text-[11px] text-[#6B7280] font-sans">{deal.brandNiche}</p>
              </div>

              {/* Middle: Connecting Arrow & Creator Box */}
              <div className="space-y-3">
                <div className="flex items-center justify-center">
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#C8CEFF] to-transparent relative">
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#FFFFFF] border border-[#3047FF] flex items-center justify-center text-[8px] font-mono font-bold text-[#3047FF]">
                      ↓
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAFAFA] border border-[#E6E6E8] flex items-center gap-3">
                  <img
                    src={deal.creator.imageUrl}
                    alt={deal.creator.name}
                    className="w-11 h-11 rounded-lg object-cover border border-[#E6E6E8] shrink-0"
                  />
                  <div className="overflow-hidden font-mono text-xs">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[#08090C] font-sans truncate">{deal.creator.name}</span>
                      <CheckCircle2 className="w-3 h-3 text-[#3047FF] shrink-0" />
                    </div>
                    <span className="text-[10px] text-[#6B7280] block truncate">
                      {deal.creator.followersFormatted} • {deal.creator.niche}
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom: Milestone Deal Terms */}
              <div className="pt-3 border-t border-[#E6E6E8] space-y-2 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280] text-[10px]">DELIVERABLE:</span>
                  <span className="font-bold text-[#08090C] text-[11px] truncate max-w-[170px]">{deal.deliverable}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#6B7280] text-[10px]">ESCROW BUDGET:</span>
                  <span className="font-extrabold text-[#08090C] text-sm">{deal.budget}</span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-[#3047FF] font-bold pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{deal.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Section Action Trigger */}
        <div className="text-center pt-4">
          <Link
            href="/for-brands"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-[9px] bg-[#08090C] hover:bg-[#1A1C23] text-white text-xs font-semibold shadow-xs transition-all font-sans"
          >
            <span>Launch a Brand Collaboration</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#3047FF]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
