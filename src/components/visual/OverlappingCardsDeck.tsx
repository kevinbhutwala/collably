"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, ArrowRight, Sparkles, Video, Play, Flame } from "lucide-react";
import { InteractiveTiltCard } from "@/components/ui/InteractiveTiltCard";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency } from "@/core/utils/formatters";

interface OverlappingCreatorCard {
  id: string;
  name: string;
  handle: string;
  category: "all" | "tech" | "fashion" | "fitness" | "lifestyle";
  categoryLabel: string;
  mainPortrait: string;
  overlappingImage: string;
  overlappingBadgeText: string;
  rateNumber: number;
  rate?: string;
  reach: string;
  rating: number;
  tags: string[];
}

const CREATORS_OVERLAPPING: OverlappingCreatorCard[] = [
  {
    id: "sara",
    name: "Sara Dietschy",
    handle: "@saradietschy",
    category: "tech",
    categoryLabel: "Studio & Creative Tech",
    mainPortrait: "/creators/sara-dietschy.jpg",
    overlappingImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80",
    overlappingBadgeText: "4K Studio Cut",
    rateNumber: 3500,
    rate: "$3,500",
    reach: "920K",
    rating: 5.0,
    tags: ["Sony FX3", "Studio Setups", "98.8% AI Match"],
  },
  {
    id: "mkbhd",
    name: "Marques Brownlee",
    handle: "@mkbhd",
    category: "tech",
    categoryLabel: "Consumer Tech & Hardware",
    mainPortrait: "/creators/mkbhd.jpg",
    overlappingImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=80",
    overlappingBadgeText: "8K Cinema Review",
    rateNumber: 15000,
    rate: "$15,000",
    reach: "18.8M",
    rating: 5.0,
    tags: ["RED 8K Master", "Hardware Lab", "99.8% AI Match"],
  },
  {
    id: "peter",
    name: "Peter McKinnon",
    handle: "@petermckinnon",
    category: "lifestyle",
    categoryLabel: "Cinematography & Photo",
    mainPortrait: "/creators/peter-mckinnon.jpg",
    overlappingImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80",
    overlappingBadgeText: "Cinema Masterclass",
    rateNumber: 8500,
    rate: "$8,500",
    reach: "5.9M",
    rating: 5.0,
    tags: ["Canon Cinema RAW", "Visual Storytelling", "99.1% AI Match"],
  },
  {
    id: "ankur",
    name: "Ankur Warikoo",
    handle: "@ankurwarikoo",
    category: "fitness",
    categoryLabel: "Personal Growth & Finance",
    mainPortrait: "/creators/ankur-warikoo.webp",
    overlappingImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=80",
    overlappingBadgeText: "Executive Framework",
    rateNumber: 3500,
    rate: "$3,500",
    reach: "3.2M",
    rating: 5.0,
    tags: ["Finance & Startups", "Keynote Author", "97.5% AI Match"],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Talent" },
  { id: "tech", label: "Tech & AI" },
  { id: "fashion", label: "Fashion & Luxury" },
  { id: "fitness", label: "Athletics & Bio" },
  { id: "lifestyle", label: "Cinema & Life" },
];

export function OverlappingCardsDeck() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered =
    activeTab === "all"
      ? CREATORS_OVERLAPPING
      : CREATORS_OVERLAPPING.filter((c) => c.category === activeTab);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8] select-none overflow-hidden border-t border-black/6 dark:border-white/10 font-sans">
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header with smooth in-view entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/6 dark:border-white/10"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-tight text-[#8A7000] dark:text-[#FFD21F] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
              FEATURED CREATORS &amp; VISUALS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-[#0A0A0E] dark:text-white">
              Vetted Talent with Layered 4K Deliverables.
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF9F5] dark:bg-[#14141E] p-1 rounded-full border border-black/8 dark:border-white/10 shadow-2xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold transition-all ${
                  activeTab === cat.id
                    ? "bg-[#0A0A0E] text-white dark:bg-[#FFD21F] dark:text-[#0A0A0E] shadow-sm"
                    : "text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Overlapping Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence>
            {filtered.map((creator) => (
              <motion.div
                layout
                key={creator.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <InteractiveTiltCard
                  maxTilt={9}
                  glowColor="rgba(255, 210, 31, 0.28)"
                  className="rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 hover:border-[#FFD21F] dark:hover:border-[#FFD21F] shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all p-4 flex flex-col justify-between group cursor-pointer"
                >
                  <div className="space-y-4">
                    {/* Layered / Overlapping Image Container */}
                    <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#0A0A0E]">
                      {/* 1. Main Primary Portrait */}
                      <SafeImage
                        src={creator.mainPortrait}
                        alt={creator.name}
                        width={800}
                        height={1000}
                        className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                      {/* Top Badges */}
                      <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-bold text-white flex items-center gap-1 border border-white/15">
                          <Star className="w-3 h-3 text-[#FFD21F] fill-[#FFD21F]" />
                          <span>{creator.rating.toFixed(1)}</span>
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-mono font-extrabold shadow-sm">
                          {creator.rateNumber ? formatCurrency(creator.rateNumber) : creator.rate}
                        </span>
                      </div>

                      {/* 2. Overlapping Floating Thumbnail Card (Bottom-Right Overlap) */}
                      <motion.div
                        whileHover={{ scale: 1.08, rotate: 2 }}
                        className="absolute bottom-16 right-3 z-20 w-20 sm:w-24 aspect-square rounded-xl overflow-hidden border-2 border-white dark:border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.35)] bg-black"
                      >
                        <SafeImage
                          src={creator.overlappingImage}
                          alt={creator.overlappingBadgeText}
                          width={150}
                          height={150}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white fill-white opacity-80" />
                        </div>
                        <span className="absolute bottom-1 inset-x-1 text-[8px] font-mono font-bold text-white text-center truncate bg-black/60 rounded px-0.5">
                          {creator.overlappingBadgeText}
                        </span>
                      </motion.div>

                      {/* Bottom Portrait Info */}
                      <div className="absolute bottom-3 inset-x-3 z-10 text-white space-y-0.5 max-w-[65%]">
                        <div className="flex items-center gap-1.5">
                          <h3 className="text-base font-extrabold font-display text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)] truncate">{creator.name}</h3>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0095F6] fill-[#0095F6] text-white shrink-0 drop-shadow-sm" />
                        </div>
                        <p className="text-[11px] text-white/95 font-medium font-sans truncate drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">{creator.categoryLabel}</p>
                      </div>
                    </div>

                    {/* Tags Pills */}
                    <div className="flex flex-wrap gap-1.5 font-mono text-[10px]">
                      {creator.tags.map((tag) => {
                        const isMatch = tag.includes("Match") || tag.includes("ROAS") || tag.includes("Views");
                        return (
                          <span
                            key={tag}
                            className={`px-2 py-0.5 rounded-md border text-[10px] transition-colors ${
                              isMatch
                                ? "bg-[#FFD21F]/15 dark:bg-[#FFD21F]/20 border-[#FFD21F]/30 dark:border-[#FFD21F]/40 text-[#8A6500] dark:text-[#FFD21F] font-bold"
                                : "bg-[#F4F4F8] dark:bg-[#181824] border-black/5 dark:border-white/10 text-[#4A4A58] dark:text-[#C0C0D4]"
                            }`}
                          >
                            {tag}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-3 border-t border-black/6 dark:border-white/10 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-[#6A6A78] dark:text-[#8E8EA4]">{creator.reach} Reach</span>
                    <Link
                      href="/creators"
                      className="px-3.5 py-1.5 rounded-full bg-[#FAF9F5] dark:bg-[#FFD21F] hover:bg-[#FFD21F] dark:hover:bg-[#FFE052] text-[#0A0A0E] font-sans font-bold text-xs transition-colors flex items-center gap-1 border border-black/8 dark:border-transparent hover-lift"
                    >
                      <span>Book</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </InteractiveTiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Roster CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-2"
        >
          <Link
            href="/creators"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FAF9F5] dark:bg-[#14141E] hover:bg-white dark:hover:bg-[#1C1C28] border border-black/10 dark:border-white/10 text-xs sm:text-sm font-bold text-[#0A0A0E] dark:text-white transition-all shadow-xs hover-lift"
          >
            <span>Explore All 50,000+ Verified Creators</span>
            <ArrowRight className="w-4 h-4 text-[#FFD21F]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
