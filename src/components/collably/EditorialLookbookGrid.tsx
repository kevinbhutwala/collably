"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  EDITORIAL_PORTRAITS,
  EDITORIAL_BRANDS,
  EditorialPortrait,
  EditorialBrand,
} from "@/data/editorialPortraits";
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Zap,
  TrendingUp,
  Layers,
  Star,
  Camera,
} from "lucide-react";

export function EditorialLookbookGrid() {
  const [activeFilter, setActiveFilter] = useState<"ALL" | "BIG" | "MEDIUM" | "SMALL">("ALL");

  const bigPortraits = [
    EDITORIAL_PORTRAITS.heroMaleMain,
    EDITORIAL_PORTRAITS.heroFemaleMain,
    EDITORIAL_PORTRAITS.bigFemaleEditorial,
  ];

  const mediumPortraits = [
    EDITORIAL_PORTRAITS.supportingFemale1,
    EDITORIAL_PORTRAITS.supportingMale1,
    EDITORIAL_PORTRAITS.supportingFemale2,
  ];

  const smallPortraits = [
    EDITORIAL_PORTRAITS.supportingMale2,
    EDITORIAL_PORTRAITS.smallStampFemale1,
    EDITORIAL_PORTRAITS.smallStampMale1,
  ];

  const bigBrands = EDITORIAL_BRANDS.filter((b) => b.sizeScale === "big");
  const mediumBrands = EDITORIAL_BRANDS.filter((b) => b.sizeScale === "medium");
  const smallBrands = EDITORIAL_BRANDS.filter((b) => b.sizeScale === "small");

  return (
    <section className="py-24 sm:py-36 bg-[#FFFFFF] border-b border-[#E6E6E8] relative overflow-hidden select-none text-[#08090C]">
      {/* Background Magazine Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-[0.02] text-[18vw] font-black font-display select-none">
        LOOKBOOK
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 relative z-10">
        {/* ── 01. SECTION HEADER & MAGAZINE METADATA ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E6E6E8] pb-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF0FF] border border-[#C8CEFF] text-xs font-mono font-bold text-[#3047FF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>05 / EDITORIAL LOOKBOOK &amp; BRAND ROSTER</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#08090C] tracking-tight font-display">
              Scale in portraits. <br />
              <span className="font-serif italic font-normal text-[#1726C7]">
                Big, medium &amp; micro.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#FAFAFA] border border-[#E6E6E8] text-xs font-mono">
              {(["ALL", "BIG", "MEDIUM", "SMALL"] as const).map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    activeFilter === filter
                      ? "bg-[#3047FF] text-white shadow-xs"
                      : "text-[#6B7280] hover:text-[#08090C]"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <span className="text-[11px] font-mono text-[#6B7280]">
              ISSUE 04 • 2026 ARCHIVE
            </span>
          </div>
        </div>

        {/* ── 02. BIG SCALE PORTRAITS & MAJOR BRANDS ROW (Large Fashion Cuts) ── */}
        {(activeFilter === "ALL" || activeFilter === "BIG") && (
          <div className="space-y-6">
            <div className="flex items-center justify-between font-mono text-xs text-[#6B7280] pb-2 border-b border-[#E6E6E8]/60">
              <span className="font-bold text-[#08090C] tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#3047FF]" />
                [SECTION A] LARGE EDITORIAL ANCHORS &amp; FLAGSHIP BRANDS
              </span>
              <span>1000PX HI-RES MASTER SHOTS</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Big Male Portrait Feature */}
              <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-[#E6E6E8] bg-[#08090C] shadow-editorial-lg group relative flex flex-col justify-end">
                <div className="aspect-[4/5] w-full overflow-hidden relative">
                  <img
                    src={bigPortraits[0].imageUrl}
                    alt={bigPortraits[0].name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 contrast-[1.15]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/90 via-black/20 to-transparent" />
                  
                  {/* Top Stamp */}
                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-[#3047FF] text-white font-mono text-[10px] font-bold">
                    BIG ANCHOR • {bigPortraits[0].category}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5 font-mono">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/80">FEATURED PARTNER:</span>
                      <span className="text-[#DDE1FF] font-bold">{bigPortraits[0].featuredBrand}</span>
                    </div>
                    <h3 className="text-xl font-bold font-sans text-white">{bigPortraits[0].name}</h3>
                    <div className="flex items-center justify-between text-xs text-white/90 pt-1 border-t border-white/20">
                      <span>{bigPortraits[0].followersFormatted} Reach</span>
                      <span className="font-bold text-[#DDE1FF]">{bigPortraits[0].verifiedRate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Big Female Portrait Feature */}
              <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-[#C8CEFF] bg-[#FFFFFF] shadow-editorial-lg group relative flex flex-col justify-end">
                <div className="aspect-[4/5] w-full overflow-hidden relative">
                  <img
                    src={bigPortraits[1].imageUrl}
                    alt={bigPortraits[1].name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/90 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-[#FFF0EE] border border-[#FFD0CC] text-[#FF3B30] font-mono text-[10px] font-bold">
                    HIGH FASHION • {bigPortraits[1].category}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white space-y-1.5 font-mono">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/80">COLLABORATING WITH:</span>
                      <span className="text-[#FFD0CC] font-bold">{bigPortraits[1].featuredBrand}</span>
                    </div>
                    <h3 className="text-xl font-bold font-sans text-white">{bigPortraits[1].name}</h3>
                    <div className="flex items-center justify-between text-xs text-white/90 pt-1 border-t border-white/20">
                      <span>{bigPortraits[1].engagementFormatted} ER</span>
                      <span className="font-bold text-[#DDE1FF]">{bigPortraits[1].verifiedRate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Big Brand Cards Column */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-4">
                {bigBrands.map((brand) => (
                  <div
                    key={brand.id}
                    className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#E6E6E8] shadow-editorial flex-1 flex flex-col justify-between space-y-4 hover:border-[#3047FF] transition-colors group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-8 h-8 rounded-lg bg-[#08090C] text-white flex items-center justify-center font-mono font-bold text-xs">
                            {brand.logoEmblem}
                          </span>
                          <h4 className="font-extrabold text-lg text-[#08090C] font-display">{brand.name}</h4>
                        </div>
                        <p className="text-xs text-[#6B7280] font-sans">{brand.tagline}</p>
                      </div>

                      <span className="px-2 py-0.5 rounded bg-[#EEF0FF] text-[#3047FF] font-mono text-[10px] font-bold">
                        BIG BRAND
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-[#E6E6E8] grid grid-cols-2 gap-2 text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-[#6B7280] block">ESCROW VOLUME</span>
                        <span className="font-bold text-[#08090C]">{brand.totalVolume}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#6B7280] block">ROSTER TALENT</span>
                        <span className="font-bold text-[#3047FF]">{brand.featuredCreator}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── 03. MEDIUM SCALE PORTRAITS & EDITORIAL BRANDS (Staggered Polaroid Strips) ── */}
        {(activeFilter === "ALL" || activeFilter === "MEDIUM") && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between font-mono text-xs text-[#6B7280] pb-2 border-b border-[#E6E6E8]/60">
              <span className="font-bold text-[#08090C] tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF3B30]" />
                [SECTION B] MEDIUM POLAROID LOOKBOOK &amp; NICHE PARTNERS
              </span>
              <span>800PX STUDIO SHOTS &bull; ROTATED MATTES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mediumPortraits.map((portrait, idx) => (
                <div
                  key={portrait.id}
                  className={`p-4 rounded-2xl bg-[#FFFFFF] border border-[#E6E6E8] shadow-editorial hover:shadow-editorial-lg transition-all duration-300 space-y-4 ${
                    idx === 0
                      ? "sm:rotate-[-1deg]"
                      : idx === 1
                      ? "sm:rotate-[1.5deg]"
                      : "sm:rotate-[-0.5deg]"
                  }`}
                >
                  {/* Polaroid Photo Frame */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#08090C]">
                    <img
                      src={portrait.imageUrl}
                      alt={portrait.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-[#08090C]/80 backdrop-blur-md text-white font-mono text-[9px] font-bold">
                      {portrait.category}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono">
                      <div>
                        <h4 className="font-bold text-sm text-[#08090C] font-sans">{portrait.name}</h4>
                        <span className="text-[11px] text-[#6B7280]">@{portrait.handle}</span>
                      </div>
                      <span className="text-xs font-bold text-[#3047FF]">{portrait.verifiedRate}</span>
                    </div>

                    <div className="pt-2 border-t border-[#E6E6E8] flex items-center justify-between text-[11px] font-mono text-[#6B7280]">
                      <span>Brand Match: <strong className="text-[#08090C]">{portrait.featuredBrand}</strong></span>
                      <span className="text-[#FF3B30] font-bold">{portrait.matchScore}% FIT</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Medium Brands Banner Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {mediumBrands.map((brand) => (
                <div
                  key={brand.id}
                  className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E6E6E8] flex items-center justify-between gap-3 font-mono text-xs"
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-8 h-8 rounded-lg bg-[#EEF0FF] border border-[#C8CEFF] text-[#3047FF] flex items-center justify-center font-bold text-[11px] shrink-0">
                      {brand.logoEmblem}
                    </div>
                    <div className="overflow-hidden">
                      <span className="font-bold text-[#08090C] block truncate font-sans">{brand.name}</span>
                      <span className="text-[10px] text-[#6B7280] block truncate">{brand.industry}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-[#E6E6E8] text-[#08090C] shrink-0">
                    {brand.totalVolume}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 04. SMALL SCALE PORTRAITS & BRAND STAMP CAPSULES (Camera Lens Badges) ── */}
        {(activeFilter === "ALL" || activeFilter === "SMALL") && (
          <div className="space-y-6 pt-4">
            <div className="flex items-center justify-between font-mono text-xs text-[#6B7280] pb-2 border-b border-[#E6E6E8]/60">
              <span className="font-bold text-[#08090C] tracking-wider uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#08090C]" />
                [SECTION C] MICRO-CREATOR BADGES &amp; MONOGRAM CAPSULES
              </span>
              <span>POSTAGE STAMP COMPOSITIONS &bull; EMBEDDED LENSES</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {smallPortraits.map((portrait) => (
                <div
                  key={portrait.id}
                  className="p-3.5 rounded-xl bg-[#FFFFFF] border border-[#E6E6E8] shadow-xs flex items-center justify-between gap-3 hover:border-[#3047FF] transition-colors"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    {/* Camera Lens Circular Avatar */}
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#3047FF] shrink-0 shadow-xs">
                      <img
                        src={portrait.imageUrl}
                        alt={portrait.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 ring-1 ring-inset ring-black/20 rounded-full" />
                    </div>

                    <div className="overflow-hidden font-mono text-xs">
                      <h5 className="font-bold text-[#08090C] font-sans truncate">{portrait.name}</h5>
                      <span className="text-[10px] text-[#6B7280] block truncate">
                        {portrait.category} • {portrait.followersFormatted}
                      </span>
                    </div>
                  </div>

                  <div className="text-right font-mono shrink-0">
                    <span className="text-xs font-bold text-[#08090C] block">{portrait.verifiedRate}</span>
                    <span className="text-[9px] text-[#3047FF] font-bold">VERIFIED</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Small Brand Monogram Ticker Strip */}
            <div className="p-4 rounded-xl bg-[#FAFAFA] border border-[#E6E6E8] flex flex-wrap items-center justify-around gap-4 text-xs font-mono text-[#6B7280]">
              <span className="text-[10px] text-[#08090C] font-bold uppercase tracking-wider">
                ACTIVE DEAL RAILS:
              </span>
              {smallBrands.map((b) => (
                <div key={b.id} className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-[#E6E6E8]">
                  <span className="font-bold text-[#3047FF]">{b.logoEmblem}</span>
                  <span className="text-[#08090C] font-semibold font-sans">{b.name}</span>
                  <span className="text-[10px] text-[#6B7280]">/ {b.activeDealsCount} DEALS</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
