"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CENTRAL_CREATORS } from "@/data/creators";
import { Star, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
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
    <section className="py-20 sm:py-28 bg-[#FCFCFA] border-b border-[#E2E6E1] relative overflow-hidden text-[#101310] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF8F2] border border-[#C3EBDA] text-xs font-mono font-semibold text-[#087F5B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vetted Creator Roster</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#101310] tracking-tight font-display">
              World-class talent.
            </h2>
            <p className="text-sm sm:text-base text-[#626862] font-sans">
              Discover verified creators with audited audience demographics and transparent rate cards.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-3.5 py-1.5 rounded-[9px] text-xs font-semibold transition-all whitespace-nowrap ${
                  activeCategory === category
                    ? "bg-[#087F5B] text-white shadow-xs"
                    : "bg-[#F6F7F3] text-[#626862] hover:text-[#101310] hover:bg-[#E2E6E1] border border-[#E2E6E1]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Creator Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <div
              key={creator.id}
              className="rounded-2xl bg-[#FFFFFF] border border-[#E2E6E1] hover:border-[#087F5B] overflow-hidden shadow-fintech flex flex-col justify-between group transition-all"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#101310]">
                <img
                  src={creator.avatarUrl}
                  alt={creator.fullName}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-md bg-[#101310]/80 backdrop-blur-md text-white font-mono text-[10px] font-bold">
                    {creator.primaryCategory}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-bold">{creator.totalFollowers > 999 ? `${(creator.totalFollowers / 1000).toFixed(0)}K` : creator.totalFollowers} Reach</span>
                  <span className="font-bold text-[#8DD9BA]">{creator.avgEngagementRate}% ER</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#101310] font-sans flex items-center gap-1">
                      {creator.fullName}
                      <CheckCircle className="w-3.5 h-3.5 text-[#087F5B]" />
                    </h4>
                    <p className="text-xs text-[#626862] font-mono">@{creator.handle}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-[#8A908B] font-mono block">STARTING AT</span>
                    <span className="text-sm font-bold text-[#101310] font-mono">
                      {formatCurrency(creator.startingPrice || 18500)}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E2E6E1] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-[#087F5B] font-bold font-mono">
                    <Star className="w-3.5 h-3.5 fill-[#087F5B] text-[#087F5B]" />
                    <span>{creator.rating} Rating</span>
                  </div>

                  <Link
                    href={`/creators/${creator.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#087F5B] hover:text-[#075E45] transition-colors font-sans"
                  >
                    <span>View Media Kit</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
