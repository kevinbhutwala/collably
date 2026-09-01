"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CENTRAL_CREATORS } from "@/data/creators";
import { Star, CheckCircle, ArrowUpRight, Sparkles } from "lucide-react";
import { formatCurrency } from "@/core/utils/currency";

export function CreatorShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = [
    "All",
    "Technology & AI",
    "Design & Creative",
    "Fitness & Wellness",
    "Beauty & Skincare",
  ];

  const filteredCreators =
    activeCategory === "All"
      ? CENTRAL_CREATORS.slice(0, 6)
      : CENTRAL_CREATORS.filter((c) => c.primaryCategory === activeCategory).slice(0, 6);

  return (
    <section className="py-24 sm:py-32 bg-transparent border-b border-white/10 relative overflow-hidden text-white select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)]">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Vetted Creator Roster</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
              World-class talent.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-sans">
              Discover verified creators with audited audience demographics and transparent rate cards.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white shadow-md shadow-pink-500/25 scale-102"
                    : "bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Creator Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((c, index) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/50 overflow-hidden shadow-card hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between relative"
            >
              {/* Photo & Floating Badges */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                <img
                  src={c.coverImageUrl || c.avatarUrl}
                  alt={c.fullName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120c16] via-[#120c16]/30 to-transparent" />

                {/* Floating Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold text-white shadow-lg">
                    {c.primaryCategory}
                  </span>
                </div>

                {/* Match Score Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-2.5 py-1 rounded-full bg-pink-500/25 backdrop-blur-md border border-pink-500/40 text-[hsl(327,100%,55%)] font-mono font-bold text-xs shadow-lg">
                    {c.qualityScore || 98}% FIT
                  </span>
                </div>

                {/* Avatar Overlay */}
                <div className="absolute -bottom-5 left-5 flex items-end gap-3">
                  <img
                    src={c.avatarUrl}
                    alt={c.fullName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[#120c16] shadow-xl"
                  />
                  <div className="mb-2">
                    <h3 className="text-base font-bold text-white flex items-center gap-1.5 font-display drop-shadow">
                      {c.fullName}
                      <CheckCircle className="w-4 h-4 text-sky-400 fill-sky-400/20" />
                    </h3>
                    <p className="text-xs text-slate-300 font-mono drop-shadow">@{c.handle}</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 pt-7 space-y-4">
                <p className="text-xs text-slate-300 line-clamp-1 font-sans">
                  {c.headline}
                </p>

                {/* 3 Metric Pills */}
                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-2xl bg-white/[0.03] border border-white/10 text-center font-mono text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">REACH</span>
                    <span className="font-bold text-white">{c.totalFollowers.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">ENGAGE</span>
                    <span className="font-bold text-emerald-400">{c.avgEngagementRate}%</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">RATING</span>
                    <span className="font-bold text-amber-300 flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 fill-gold text-gold" />
                      {c.rating}
                    </span>
                  </div>
                </div>

                {/* Bottom Action */}
                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-mono">From</span>
                    <span className="text-sm font-bold text-white font-mono">{formatCurrency(c.startingPrice)}</span>
                  </div>

                  <Link
                    href={`/creators/${c.id}`}
                    className="px-4 py-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-xs font-mono font-bold text-white transition-colors flex items-center gap-1"
                  >
                    <span>View Media Kit</span>
                    <ArrowUpRight className="w-3 h-3 text-[hsl(327,100%,55%)]" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
