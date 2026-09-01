"use client";

import React from "react";
import Link from "next/link";
import { EDITORIAL_ROSTER } from "@/data/editorialPortraits";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function EditorialPortraitWall() {
  return (
    <section className="py-24 sm:py-36 bg-[#FAFAF8] border-b border-[#E7E7E4] relative overflow-hidden select-none text-[#101010]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header: Section Heading 56-88px Neue Montreal + Instrument Serif Accent */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E7E7E4] pb-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-xs font-mono font-bold text-[#101010]">
              <span className="w-2 h-2 rounded-full bg-[#FFD21F]" />
              <span>02 / CREATOR ROSTER</span>
            </div>
            <h2 className="section-headline">
              Vetted talent. <br />
              <span className="font-serif italic font-normal text-[#626262] text-[clamp(2.75rem,6vw,6rem)]">
                Curated for culture.
              </span>
            </h2>
          </div>

          <p className="editorial-body max-w-sm">
            Audited creator media kits with verified audience geography, real engagement rates, and standardized commercial rate cards.
          </p>
        </div>

        {/* ── ART-DIRECTED EDITORIAL PORTRAIT COLLAGE ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto items-start">
          {EDITORIAL_ROSTER.slice(0, 6).map((portrait, idx) => {
            const rotationClass =
              idx % 3 === 0
                ? "sm:rotate-[-1deg] sm:translate-y-2"
                : idx % 3 === 1
                ? "sm:rotate-[1.5deg] sm:-translate-y-4"
                : "sm:rotate-[-0.5deg]";

            return (
              <div
                key={portrait.id}
                className={`rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] overflow-hidden shadow-editorial hover:shadow-editorial-lg transition-all duration-300 group ${rotationClass}`}
              >
                {/* Portrait Photo Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#101010]">
                  <img
                    src={portrait.imageUrl}
                    alt={portrait.name}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500 filter contrast-[1.12]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/85 via-transparent to-black/10 pointer-events-none" />

                  {/* Niche Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider backdrop-blur-md bg-[#101010] text-[#FFD21F] border border-[#FFD21F]/30">
                      {portrait.category}
                    </span>
                  </div>

                  {/* Bottom Stats Overlay */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs font-mono">
                    <span className="font-bold numeric-tabular">{portrait.followersFormatted} Reach</span>
                    <span className="font-bold text-[#FFD21F] numeric-tabular">{portrait.engagementFormatted} ER</span>
                  </div>
                </div>

                {/* Card Editorial Info */}
                <div className="p-5 space-y-3 bg-[#FFFFFF]">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-display font-semibold text-[#101010] flex items-center gap-1">
                        {portrait.name}
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#101010]" />
                      </h4>
                      <p className="text-xs text-[#626262] font-sans">@{portrait.handle}</p>
                    </div>

                    <div className="text-right font-mono">
                      <span className="text-[9px] text-[#626262] block">STARTING AT</span>
                      <span className="text-sm font-extrabold text-[#101010] font-display numeric-tabular">{portrait.verifiedRate}</span>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-[#E7E7E4] flex items-center justify-between text-xs font-sans">
                    <span className="text-[#101010] font-semibold flex items-center gap-1.5 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F]" />
                      <span className="numeric-tabular">{portrait.matchScore}%</span> Fit
                    </span>

                    <Link
                      href="/creators"
                      className="text-[#101010] hover:text-black font-semibold flex items-center gap-1 transition-colors text-xs"
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
        <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 max-w-5xl mx-auto">
          <div className="font-sans text-xs text-[#626262]">
            <span>ROSTER DATABASE: </span>
            <strong className="text-[#101010] font-display font-bold">500+ AUDITED CREATORS ACROSS 12 NICHES</strong>
          </div>

          <Link
            href="/creators"
            className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] text-[#0A0A0E] text-xs font-sans font-bold shadow-xs transition-all flex items-center gap-2 group border border-black/10"
          >
            <span>Explore Full Creator Roster</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0E]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
