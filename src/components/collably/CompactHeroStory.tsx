"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Flame, CheckCircle2 } from "lucide-react";
import { InteractiveTiltCard } from "@/components/ui/InteractiveTiltCard";

interface HeroCreator {
  id: string;
  name: string;
  handle: string;
  niche: string;
  matchScore: string;
  reach: string;
  rate: string;
  image: string;
  tag: string;
  bio: string;
}

const HERO_CREATORS: HeroCreator[] = [
  {
    id: "elena",
    name: "Elena Rostova",
    handle: "@elenarostova",
    niche: "Fashion & Luxury",
    matchScore: "99.4%",
    reach: "485K",
    rate: "$1,400",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=85",
    tag: "Top 1% Fashion Roster",
    bio: "Editorial fashion creator with high luxury brand conversion and 6.4% avg engagement.",
  },
  {
    id: "marcus",
    name: "Marcus Vance",
    handle: "@marcusvance",
    niche: "Tech & AI Hardware",
    matchScore: "98.7%",
    reach: "320K",
    rate: "$1,850",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=85",
    tag: "4K Cinematic Reviews",
    bio: "Deep-dive tech teardowns, AI workflows, and cinematic consumer electronics.",
  },
  {
    id: "sofia",
    name: "Sofia Chen",
    handle: "@sofiachen",
    niche: "Wellness & Lifestyle",
    matchScore: "99.1%",
    reach: "610K",
    rate: "$2,200",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=85",
    tag: "High-Engagement UGC",
    bio: "Clean living, holistic nutrition, and organic storytelling for wellness brands.",
  },
];

export function CompactHeroStory() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeCreator = HERO_CREATORS[activeIdx];

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen bg-white text-[#0A0A0E] flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[350px] bg-gradient-to-b from-[#FFD21F]/20 via-[#FFD21F]/5 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          {/* ══════════════════════════════════════════════════════════════════════
              LEFT: PUNCHY 4-SECOND STORY VALUE PROPOSITION
              ══════════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 space-y-5 sm:space-y-6 text-left">
            {/* Status Live Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] border border-black/8 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-tight text-[#0A0A0E]">
                COLLABLY CREATOR COMMERCE PLATFORM
              </span>
            </div>

            {/* High-Impact Punchy Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#0A0A0E] leading-[1.08]">
              Where High-Growth Brands{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] underline decoration-black/10 decoration-wavy">
                Hire Vetted Creators
              </span>{" "}
              in Minutes.
            </h1>

            {/* Short Narrative */}
            <p className="text-sm sm:text-base text-[#5A5A68] max-w-lg leading-relaxed font-sans font-normal">
              Skip weeks of cold emails. Access audited creator media kits, frame-accurate 4K review, and 100% guaranteed milestone escrow vaults.
            </p>

            {/* Thumb-friendly CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link href="/for-brands">
                <button className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(255,210,31,0.5)] hover:shadow-[0_6px_24px_rgba(255,210,31,0.7)] flex items-center gap-2 group active:scale-[0.98] border border-black/10">
                  <span>Start Campaign</span>
                  <ArrowRight className="w-4 h-4 text-[#0A0A0E] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>

              <Link href="/creator/register">
                <button className="px-6 py-3.5 rounded-full bg-white hover:bg-[#F8F8FC] border border-black/10 text-[#0A0A0E] font-bold text-xs sm:text-sm transition-all shadow-[0_2px_8px_rgba(0,0,0,0.04)] active:scale-[0.98]">
                  <span>Join Roster</span>
                </button>
              </Link>
            </div>

            {/* Micro Social Proof Bar */}
            <div className="flex items-center gap-4 pt-3 border-t border-black/6">
              <div className="flex -space-x-2">
                {HERO_CREATORS.map((c) => (
                  <img
                    key={c.id}
                    src={c.image}
                    alt={c.name}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-xs"
                  />
                ))}
              </div>
              <div className="flex items-center gap-3 text-xs font-sans">
                <span className="font-bold text-[#0A0A0E]">50,000+ Creators</span>
                <span className="text-[#888898]">•</span>
                <span className="text-[#087F5B] font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Escrow Guaranteed
                </span>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════════
              RIGHT: INTERACTIVE ANIMATED PORTRAIT STAGE WITH 3D TILT
              ══════════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 relative flex flex-col items-center">
            {/* Creator Switcher Thumb Pills (Mobile & Desktop) */}
            <div className="flex items-center gap-2 mb-4 bg-[#F4F4F8] p-1.5 rounded-full border border-black/6 shadow-xs z-20">
              {HERO_CREATORS.map((creator, i) => (
                <button
                  key={creator.id}
                  onClick={() => setActiveIdx(i)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold transition-all flex items-center gap-1.5 ${
                    activeIdx === i
                      ? "bg-white text-[#0A0A0E] shadow-sm border border-black/8"
                      : "text-[#6A6A78] hover:text-[#0A0A0E]"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeIdx === i ? "bg-[#FFD21F]" : "bg-black/20"
                    }`}
                  />
                  <span>{creator.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            {/* Main Interactive 3D Tilt Animated Portrait Card */}
            <InteractiveTiltCard
              maxTilt={10}
              glowColor="rgba(255, 210, 31, 0.28)"
              className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white shadow-[0_20px_60px_rgba(0,0,0,0.14)] bg-[#0A0A0E] group"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCreator.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <img
                    src={activeCreator.image}
                    alt={activeCreator.name}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Top Match Badge */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-white/40 shadow-lg flex items-center gap-1.5 text-xs font-mono font-bold text-[#0A0A0E]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
                <span>{activeCreator.matchScore}</span>
              </motion.div>

              {/* Floating Top Right Live Reel Badge */}
              <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-semibold text-white flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#FFD21F]" />
                <span>{activeCreator.reach} Reach</span>
              </div>

              {/* Bottom Glass Creator Identity & Rate Card */}
              <div className="absolute bottom-4 inset-x-4 z-20 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/8 shadow-xl space-y-2 text-[#0A0A0E]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold font-display">{activeCreator.name}</h3>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B]" />
                    </div>
                    <p className="text-[11px] text-[#6A6A78] font-sans">{activeCreator.niche}</p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-[10px] text-[#888898] block uppercase">Starts at</span>
                    <span className="text-xs font-extrabold text-[#0A0A0E]">{activeCreator.rate}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-black/6 flex items-center justify-between text-[11px] font-sans">
                  <span className="text-[#5A5A68] truncate max-w-[200px]">{activeCreator.tag}</span>
                  <Link
                    href={`/creators`}
                    className="text-xs font-bold text-[#0A0A0E] hover:underline flex items-center gap-0.5 shrink-0"
                  >
                    <span>View Deck</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </InteractiveTiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
