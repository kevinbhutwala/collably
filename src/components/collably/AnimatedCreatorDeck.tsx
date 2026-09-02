"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowRight, Flame, Sparkles, Star } from "lucide-react";
import { InteractiveTiltCard } from "@/components/ui/InteractiveTiltCard";

interface CreatorItem {
  id: string;
  name: string;
  category: "all" | "fashion" | "tech" | "fitness" | "lifestyle";
  categoryLabel: string;
  followers: string;
  engagement: string;
  rate: string;
  image: string;
  tag: string;
  rating: number;
}

const CREATORS: CreatorItem[] = [
  {
    id: "elena",
    name: "Elena Shah",
    category: "fashion",
    categoryLabel: "Fashion & Beauty",
    followers: "485K",
    engagement: "6.4%",
    rate: "$1,400",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=85",
    tag: "High-Fashion Editorial",
    rating: 4.9,
  },
  {
    id: "marcus",
    name: "Marcus Lee",
    category: "tech",
    categoryLabel: "Tech & AI",
    followers: "320K",
    engagement: "4.2%",
    rate: "$1,850",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=85",
    tag: "4K Hardware Teardowns",
    rating: 5.0,
  },
  {
    id: "sofia",
    name: "Sofia Rivera",
    category: "lifestyle",
    categoryLabel: "Travel & Lifestyle",
    followers: "275K",
    engagement: "5.8%",
    rate: "$1,200",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=85",
    tag: "Cinematic Travel & Vlogs",
    rating: 4.8,
  },
  {
    id: "karan",
    name: "Karan Mehta",
    category: "fitness",
    categoryLabel: "Athletics & Nutrition",
    followers: "510K",
    engagement: "7.1%",
    rate: "$1,650",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=85",
    tag: "Calisthenics & Biohacking",
    rating: 5.0,
  },
];

const CATEGORIES = [
  { id: "all", label: "All Talent" },
  { id: "fashion", label: "Fashion & Beauty" },
  { id: "tech", label: "Tech & AI" },
  { id: "fitness", label: "Athletics & Bio" },
  { id: "lifestyle", label: "Travel & Life" },
];

export function AnimatedCreatorDeck() {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered =
    activeTab === "all"
      ? CREATORS
      : CREATORS.filter((c) => c.category === activeTab);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FBFBFE] text-[#0A0A0E] border-t border-black/6 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-tight text-[#8A7000] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
              CURATED TALENT ROSTER
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-[#0A0A0E]">
              Vetted Creators Ready to Scale Your Brand.
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-full border border-black/8 shadow-2xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold transition-all ${
                  activeTab === cat.id
                    ? "bg-[#0A0A0E] text-white shadow-sm"
                    : "bg-[#F4F4F8] text-[#5A5A68] hover:bg-[#EAEAEF]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Creator Cards Grid with 3D Tilt & Specular Reflection */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  maxTilt={8}
                  glowColor="rgba(255, 210, 31, 0.22)"
                  className="rounded-3xl bg-white border border-black/8 hover:border-black/20 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between"
                >
                  {/* Creator Image Card */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#0A0A0E]">
                    <img
                      src={creator.image}
                      alt={creator.name}
                      className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

                    {/* Top Rating & Verified Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
                      <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono font-semibold text-white flex items-center gap-1">
                        <Star className="w-3 h-3 text-[#FFD21F] fill-[#FFD21F]" />
                        <span>{creator.rating}</span>
                      </span>
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold text-[#0A0A0E]">
                        {creator.followers}
                      </span>
                    </div>

                    {/* Bottom Portrait Info */}
                    <div className="absolute bottom-3 inset-x-3 z-10 text-white space-y-0.5">
                      <div className="flex items-center gap-1">
                        <h3 className="text-base font-bold font-display">{creator.name}</h3>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B]" />
                      </div>
                      <p className="text-[11px] text-white/80 font-sans">{creator.categoryLabel}</p>
                    </div>
                  </div>

                  {/* Footer Rate & Action */}
                  <div className="p-4 flex items-center justify-between border-t border-black/6 text-xs">
                    <div>
                      <span className="text-[10px] font-mono text-[#7A7A8A] block uppercase">Starts at</span>
                      <span className="font-mono font-extrabold text-[#0A0A0E] text-sm">{creator.rate}</span>
                    </div>

                    <Link
                      href={`/creators`}
                      className="px-3.5 py-1.5 rounded-full bg-[#F4F4F8] hover:bg-[#FFD21F] text-[#0A0A0E] font-sans font-bold text-xs transition-colors flex items-center gap-1"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </InteractiveTiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View Full Roster Link */}
        <div className="text-center pt-2">
          <Link
            href="/creators"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#F8F8FC] border border-black/10 text-xs sm:text-sm font-bold text-[#0A0A0E] transition-all shadow-xs"
          >
            <span>Explore All 50,000+ Verified Creators</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
