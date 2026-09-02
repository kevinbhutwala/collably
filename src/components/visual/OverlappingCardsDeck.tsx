"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, ArrowRight, Sparkles, Video, Play, Flame } from "lucide-react";
import { InteractiveTiltCard } from "@/components/ui/InteractiveTiltCard";
import { SafeImage } from "@/components/ui/SafeImage";

interface OverlappingCreatorCard {
  id: string;
  name: string;
  handle: string;
  category: "all" | "tech" | "fashion" | "fitness" | "lifestyle";
  categoryLabel: string;
  mainPortrait: string;
  overlappingImage: string;
  overlappingBadgeText: string;
  rate: string;
  reach: string;
  rating: number;
  tags: string[];
}

const CREATORS_OVERLAPPING: OverlappingCreatorCard[] = [
  {
    id: "elena",
    name: "Elena Rostova",
    handle: "@elenarostova",
    category: "tech",
    categoryLabel: "AI & Consumer Tech",
    mainPortrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=85",
    overlappingImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80",
    overlappingBadgeText: "4K Master Reel",
    rate: "$3,500",
    reach: "485K",
    rating: 5.0,
    tags: ["Apple & Nvidia", "RED V-Raptor 8K", "99.4% AI Match"],
  },
  {
    id: "marcus",
    name: "Marcus Vance",
    handle: "@marcusvisuals",
    category: "fashion",
    categoryLabel: "Luxury & Haute Couture",
    mainPortrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=85",
    overlappingImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=80",
    overlappingBadgeText: "Milan Lookbook",
    rate: "$4,200",
    reach: "620K",
    rating: 5.0,
    tags: ["Prada & Balenciaga", "ARRI Alexa Mini", "4.8× ROAS"],
  },
  {
    id: "sofia",
    name: "Sofia Chen",
    handle: "@sofiabio",
    category: "fitness",
    categoryLabel: "Biohacking & Movement",
    mainPortrait: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=85",
    overlappingImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80",
    overlappingBadgeText: "Kinetic Routine",
    rate: "$2,800",
    reach: "390K",
    rating: 5.0,
    tags: ["Whoop & Gymshark", "ProRes HQ", "7.1% Engagement"],
  },
  {
    id: "devon",
    name: "Devon Thorne",
    handle: "@devoncinema",
    category: "lifestyle",
    categoryLabel: "Automotive & Lifestyle",
    mainPortrait: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=85",
    overlappingImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=80",
    overlappingBadgeText: "Alpine Story",
    rate: "$3,800",
    reach: "510K",
    rating: 5.0,
    tags: ["Porsche & Leica", "Anamorphic", "1.1M Views"],
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
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white text-[#0A0A0E] select-none overflow-hidden border-t border-black/6 font-sans">
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header with smooth in-view entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/6"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-tight text-[#8A7000] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
              FEATURED CREATORS &amp; VISUALS
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-[#0A0A0E]">
              Vetted Talent with Layered 4K Deliverables.
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF9F5] p-1 rounded-full border border-black/8 shadow-2xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold transition-all ${
                  activeTab === cat.id
                    ? "bg-[#0A0A0E] text-white shadow-sm"
                    : "text-[#5A5A68] hover:text-[#0A0A0E]"
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
                  className="rounded-3xl bg-white border border-black/8 hover:border-[#FFD21F] shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-all p-4 flex flex-col justify-between group cursor-pointer"
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
                          {creator.rate}
                        </span>
                      </div>

                      {/* 2. Overlapping Floating Thumbnail Card (Bottom-Right Overlap) */}
                      <motion.div
                        whileHover={{ scale: 1.08, rotate: 2 }}
                        className="absolute bottom-16 right-3 z-20 w-20 sm:w-24 aspect-square rounded-xl overflow-hidden border-2 border-white shadow-[0_8px_20px_rgba(0,0,0,0.35)] bg-black"
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
                        <div className="flex items-center gap-1">
                          <h3 className="text-base font-bold font-display">{creator.name}</h3>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B]" />
                        </div>
                        <p className="text-[11px] text-white/80 font-sans truncate">{creator.categoryLabel}</p>
                      </div>
                    </div>

                    {/* Tags Pills */}
                    <div className="flex flex-wrap gap-1.5 font-mono text-[10px] text-[#4A4A58]">
                      {creator.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-md bg-[#F4F4F8] border border-black/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="pt-3 border-t border-black/6 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-[#6A6A78]">{creator.reach} Reach</span>
                    <Link
                      href="/creators"
                      className="px-3.5 py-1.5 rounded-full bg-[#FAF9F5] hover:bg-[#FFD21F] text-[#0A0A0E] font-sans font-bold text-xs transition-colors flex items-center gap-1 border border-black/8 hover-lift"
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
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#FAF9F5] hover:bg-white border border-black/10 text-xs sm:text-sm font-bold text-[#0A0A0E] transition-all shadow-xs hover-lift"
          >
            <span>Explore All 50,000+ Verified Creators</span>
            <ArrowRight className="w-4 h-4 text-[#FFD21F]" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
