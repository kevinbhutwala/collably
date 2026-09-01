"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { EDITORIAL_PORTRAITS } from "@/data/editorialPortraits";

export function EditorialBigTextSection() {
  const femalePortrait = EDITORIAL_PORTRAITS.supportingFemale2;
  const malePortrait = EDITORIAL_PORTRAITS.supportingMale2;

  return (
    <section className="py-24 sm:py-36 bg-[#FAFAF8] border-b border-[#E7E7E4] relative overflow-hidden select-none text-[#111111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Eyebrow */}
        <div className="flex items-center justify-between border-b border-[#E7E7E4] pb-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#111111]">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
            <span>01 / EDITORIAL MANIFESTO</span>
          </div>
          <span className="font-mono text-xs text-[#6B6B6B]">THE CREATOR COMMERCE STANDARD</span>
        </div>

        {/* ── GIANT TYPOGRAPHY MANIFESTO ── */}
        <div className="space-y-4 sm:space-y-6">
          {/* WORD 1: CREATORS. with peek-through portrait window */}
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black text-[#111111] tracking-tighter leading-none font-display">
              CREATORS.
            </h2>
            
            {/* Embedded Small Portrait Pill */}
            <div className="hidden md:flex items-center gap-3 p-2 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs shrink-0">
              <img
                src={femalePortrait.imageUrl}
                alt="Chloe"
                className="w-12 h-12 rounded-xl object-cover border border-[#E7E7E4]"
              />
              <div className="font-mono text-xs pr-2">
                <span className="font-bold text-[#111111] block">{femalePortrait.name}</span>
                <span className="text-[#6B6B6B] text-[10px]">{femalePortrait.followersFormatted} Reach • {femalePortrait.category}</span>
              </div>
            </div>
          </div>

          {/* WORD 2: BRANDS. with Chrome / Carbon Styling */}
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:pl-16">
            <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black text-[#6B6B6B] hover:text-[#111111] transition-colors tracking-tighter leading-none font-display">
              BRANDS.
            </h2>

            <div className="max-w-xs text-xs font-sans text-[#6B6B6B] leading-relaxed hidden lg:block">
              Scale authentic video partnerships with pre-funded milestone custody and frame-accurate review tools.
            </div>
          </div>

          {/* WORD 3: ONE WORKSPACE. with Embedded Male Portrait */}
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4 md:pl-28">
            <h2 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black text-[#111111] tracking-tighter leading-none font-display">
              ONE WORKSPACE.
            </h2>

            {/* Embedded Small Portrait Pill */}
            <div className="hidden md:flex items-center gap-3 p-2 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs shrink-0">
              <img
                src={malePortrait.imageUrl}
                alt="Kai"
                className="w-12 h-12 rounded-xl object-cover border border-[#E7E7E4]"
              />
              <div className="font-mono text-xs pr-2">
                <span className="font-bold text-[#111111] block">{malePortrait.name}</span>
                <span className="text-[#111111] font-bold text-[10px] bg-[#B7FF3C] px-1.5 py-0.5 rounded">
                  {malePortrait.verifiedRate}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Quote Strip */}
        <div className="pt-8 border-t border-[#E7E7E4] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <p className="text-base sm:text-lg text-[#111111] font-serif italic max-w-2xl">
            &ldquo;From creator discovery and contract QA to timecoded video reviews and instant bank payouts — everything in one beautiful workflow.&rdquo;
          </p>

          <Link
            href="/for-brands"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#111111] hover:text-black transition-colors shrink-0 bg-[#FFFFFF] px-4 py-2 rounded-lg border border-[#E7E7E4] shadow-xs"
          >
            <span>DISCOVER PLATFORM CAPABILITIES</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
