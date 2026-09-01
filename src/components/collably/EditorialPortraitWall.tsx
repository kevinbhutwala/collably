"use client";

import React from "react";
import Link from "next/link";
import { EDITORIAL_ROSTER } from "@/data/editorialPortraits";
import { Sparkles, ArrowRight, CheckCircle2, Star } from "lucide-react";

export function EditorialPortraitWall() {
  return (
    <section className="py-24 sm:py-36 bg-[#FFFFFF] border-b border-[#E6E6E8] relative overflow-hidden select-none text-[#08090C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E6E6E8] pb-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF0FF] border border-[#C8CEFF] text-xs font-mono font-bold text-[#3047FF]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 / EDITORIAL PORTRAIT WALL</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-extrabold text-[#08090C] tracking-tight font-display">
              Vetted talent. <br />
              <span className="font-serif italic font-normal text-[#1726C7]">Curated for culture.</span>
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#6B7280] font-sans max-w-sm">
            Audited creator media kits with verified audience geography, real engagement rates, and standardized commercial rate cards.
          </p>
        </div>

        {/* ── ART-DIRECTED EDITORIAL PORTRAIT COLLAGE (Section 17) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-start">
          {EDITORIAL_ROSTER.map((portrait, idx) => {
            // Give different cards subtle rotation and staggered heights for editorial rhythm
            const rotationClass =
              idx % 3 === 0
                ? "sm:rotate-[-1deg] sm:translate-y-2"
                : idx % 3 === 1
                ? "sm:rotate-[1.5deg] sm:-translate-y-4"
                : "sm:rotate-[-0.5deg]";

            const isUltramarine = portrait.colorTreatment === "ultramarine-duotone";
            const isInfrared = portrait.colorTreatment === "infrared-tint";

            return (
              <div
                key={portrait.id}
                className={`rounded-2xl bg-[#FFFFFF] border overflow-hidden shadow-editorial hover:shadow-editorial-lg transition-all duration-300 group ${rotationClass} ${
                  isUltramarine
                    ? "border-[#C8CEFF]"
                    : isInfrared
                    ? "border-[#FFD0CC]"
                    : "border-[#E6E6E8]"
                }`}
              >
                {/* Portrait Photo Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#08090C]">
                  <img
                    src={portrait.imageUrl}
                    alt={portrait.name}
                    className={`w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 ${
                      portrait.colorTreatment === "monochrome"
                        ? "filter grayscale contrast-[1.15]"
                        : portrait.colorTreatment === "high-contrast"
                        ? "filter contrast-[1.2] brightness-[0.95]"
                        : ""
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/80 via-transparent to-black/10 pointer-events-none" />

                  {/* Niche Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md ${
                        isUltramarine
                          ? "bg-[#3047FF] text-white"
                          : isInfrared
                          ? "bg-[#FF3B30] text-white"
                          : "bg-[#08090C]/80 text-white border border-white/20"
                      }`}
                    >
                      {portrait.category}
                    </span>
                  </div>

                  {/* Bottom Stats Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                    <span className="font-bold">{portrait.followersFormatted} Reach</span>
                    <span className="font-bold text-[#DDE1FF]">{portrait.engagementFormatted} ER</span>
                  </div>
                </div>

                {/* Card Editorial Info */}
                <div className="p-5 space-y-3 bg-[#FFFFFF]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-[#08090C] font-sans flex items-center gap-1">
                        {portrait.name}
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#3047FF]" />
                      </h4>
                      <p className="text-xs text-[#6B7280] font-mono">@{portrait.handle}</p>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-[9px] text-[#6B7280] block">STARTING AT</span>
                      <span className="text-sm font-extrabold text-[#08090C]">{portrait.verifiedRate}</span>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-[#E6E6E8] flex items-center justify-between text-xs font-mono">
                    <span className="text-[#3047FF] font-bold">
                      {portrait.matchScore}% Match Score
                    </span>

                    <Link
                      href="/creators"
                      className="text-[#08090C] hover:text-[#3047FF] font-semibold flex items-center gap-1 transition-colors font-sans"
                    >
                      <span>Media Kit</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section Footer Banner */}
        <div className="p-6 rounded-2xl bg-[#FAFAFA] border border-[#E6E6E8] flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          <div className="font-mono text-xs text-[#6B7280]">
            <span>ROSTER DATABASE: </span>
            <strong className="text-[#08090C]">500+ AUDITED CREATORS ACROSS 12 NICHES</strong>
          </div>

          <Link
            href="/creators"
            className="px-5 py-2.5 rounded-[9px] bg-[#3047FF] hover:bg-[#1726C7] text-white text-xs font-semibold shadow-xs transition-all flex items-center gap-1.5 font-sans"
          >
            <span>Explore Full Creator Roster</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
