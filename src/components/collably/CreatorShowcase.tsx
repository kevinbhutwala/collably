"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SafeImage } from "@/components/ui/SafeImage";
import { MOCK_CREATORS } from "@/mock/creators.mock";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { Star, CheckCircle, ArrowUpRight, Sparkles } from "lucide-react";

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
    <section className="py-28 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/80 text-xs font-mono font-bold text-brand-accent">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Founding Creator Cohort Spotlight</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans">
              Sample media kits &amp; rate cards.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-sans">
              Illustrative creator profiles demonstrating verified multi-platform audience metrics and automated deliverables on Collably.
            </p>
          </div>

          <Link
            href="/creators"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-mono font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-all shadow-xs"
          >
            <span>Explore Creator Directory</span>
            <ArrowUpRight className="w-4 h-4 text-brand-accent" />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-300 select-none whitespace-nowrap ${
                activeCategory === category
                  ? "bg-slate-900 text-white shadow-sm scale-[1.02]"
                  : "bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Creator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.map((creator) => (
            <div
              key={creator.id}
              className="group rounded-3xl bg-white border border-slate-200/90 hover:border-orange-300 p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between mb-4 text-[10px] font-mono text-slate-500">
                  <span className="bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-700 font-bold">
                    Sample Profile
                  </span>
                  <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200 text-brand-accent font-bold">
                    {creator.primaryCategory}
                  </span>
                </div>

                {/* Avatar & Name */}
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0 shadow-xs">
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
                      <h3 className="font-bold text-sm text-slate-900 font-sans">
                        {creator.fullName}
                      </h3>
                      <CheckCircle className="w-3.5 h-3.5 text-sky-500 fill-sky-500/20" />
                    </div>
                    <p className="text-xs text-slate-500 font-mono">@{creator.handle}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-800 font-semibold line-clamp-1 mb-1 font-sans">
                  {creator.headline}
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 font-sans">
                  {creator.bio}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center mb-4 font-mono">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Followers</p>
                    <p className="text-xs font-black text-slate-900">
                      {formatNumber(creator.totalFollowers)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Engagement</p>
                    <p className="text-xs font-black text-emerald-600">
                      {creator.avgEngagementRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Rating</p>
                    <p className="text-xs font-black text-amber-600 flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {creator.rating}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">Starting At</span>
                  <span className="text-sm font-black text-slate-900 font-mono">
                    {formatCurrency(creator.startingPrice)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href={`/creators/${creator.id}`}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-xs font-mono font-medium text-slate-800 transition-colors"
                  >
                    View Media Kit
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
