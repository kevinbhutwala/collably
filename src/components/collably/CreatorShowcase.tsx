"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import { MOCK_CREATORS } from "@/mock/creators.mock";
import { Star, CheckCircle, ArrowUpRight, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/components/collably/AnimatedCounter";

export function CreatorShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Technology & AI",
    "Design & Creative",
    "Beauty & Skincare",
    "Fitness & Wellness",
    "Finance & Business",
  ];

  const filteredCreators =
    activeCategory === "All"
      ? MOCK_CREATORS.slice(0, 6)
      : MOCK_CREATORS.filter((c) => c.primaryCategory === activeCategory).slice(0, 6);

  return (
    <section className="py-28 bg-transparent border-b border-white/10 relative overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)]">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Founding Creator Cohort Spotlight</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              Sample media kits &amp; rate cards.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-sans">
              Illustrative creator profiles demonstrating verified multi-platform audience metrics and automated deliverables on Collably.
            </p>
          </div>

          <Link
            href="/creators"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono font-bold text-slate-200 hover:text-white hover:bg-white/10 transition-all shadow-xs"
          >
            <span>Explore Creator Directory</span>
            <ArrowUpRight className="w-4 h-4 text-[hsl(327,100%,55%)]" />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-200 select-none whitespace-nowrap ${
                activeCategory === category
                  ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white shadow-md shadow-pink-500/25 scale-[1.02]"
                  : "bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Creator Cards Grid with Staggered Side Sliders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator, index) => {
            const slideX = index % 3 === 0 ? -20 : index % 3 === 2 ? 20 : 0;

            return (
              <motion.div
                key={creator.id}
                initial={{ opacity: 0, x: slideX, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
                viewport={{ once: true }}
                className="group rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/40 p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between text-white"
              >
                <div>
                  {/* Badge Header */}
                  <div className="flex items-center justify-between mb-4 text-[10px] font-mono text-slate-400">
                    <span className="bg-white/[0.05] border border-white/10 px-2.5 py-0.5 rounded-full text-slate-300 font-bold">
                      Sample Profile
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] font-bold">
                      {creator.primaryCategory}
                    </span>
                  </div>

                  {/* Avatar & Name */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-white/10 bg-white/5 shrink-0 shadow-xs">
                      <SafeImage
                        src={creator.avatarUrl}
                        alt={creator.fullName}
                        fallbackType="creator"
                        fallbackName={creator.fullName}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-white font-display">
                          {creator.fullName}
                        </h3>
                        <CheckCircle className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20" />
                      </div>
                      <p className="text-xs text-slate-400 font-mono">@{creator.handle}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-200 font-semibold line-clamp-1 mb-1 font-sans">
                    {creator.headline}
                  </p>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4 font-sans">
                    {creator.bio}
                  </p>

                  {/* Stats with Animated Numbers */}
                  <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-white/[0.03] border border-white/10 text-center mb-4 font-mono">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Followers</p>
                      <p className="text-xs font-black text-white">
                        <AnimatedCounter to={creator.totalFollowers} duration={1.2} />
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Engagement</p>
                      <p className="text-xs font-black text-emerald-400">
                        <AnimatedCounter to={creator.avgEngagementRate} suffix="%" decimals={1} duration={1.2} />
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-semibold">Rating</p>
                      <p className="text-xs font-black text-amber-300 flex items-center justify-center gap-0.5">
                        <Star className="w-3 h-3 fill-gold text-gold" />
                        <AnimatedCounter to={creator.rating} decimals={2} duration={1.2} />
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">Starting At</span>
                    <span className="text-sm font-black text-emerald-400 font-mono">
                      <AnimatedCounter to={creator.startingPrice} prefix="$" duration={1.2} />
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/creators/${creator.id}`}
                      className="px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-xs font-mono font-medium text-white transition-colors"
                    >
                      View Media Kit
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
