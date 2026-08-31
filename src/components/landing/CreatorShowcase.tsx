"use client";

import React, { useState } from "react";
import Link from "next/link";
import { MOCK_CREATORS } from "@/mock/creators.mock";
import { CreatorCategory } from "@/core/types";
import { CATEGORIES } from "@/core/constants";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatNumber, formatCurrency } from "@/core/utils/formatters";
import { ArrowUpRight, Sparkles, Star, Users, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function CreatorShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<CreatorCategory | "all">("all");

  const filteredCreators =
    selectedCategory === "all"
      ? MOCK_CREATORS
      : MOCK_CREATORS.filter(
          (c) => c.primaryCategory === selectedCategory || c.secondaryCategories.includes(selectedCategory)
        );

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Vetted Creator Roster</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
              Curated talent. Unrivaled retention.
            </h2>
            <p className="text-sm sm:text-base text-slate-600">
              Every creator on NEXUS undergoes verified audience audits, background vetting, and delivery quality scoring.
            </p>
          </div>

          <Link href="/creators">
            <Button variant="outline" size="md" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
              Explore Full 1,400+ Roster
            </Button>
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <button
            onClick={() => setSelectedCategory("all")}
            className={cn(
              "px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 select-none whitespace-nowrap",
              selectedCategory === "all"
                ? "bg-slate-900 text-white font-bold shadow-sm"
                : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100"
            )}
          >
            All Categories
          </button>
          {CATEGORIES.slice(0, 6).map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 select-none whitespace-nowrap",
                selectedCategory === cat
                  ? "bg-slate-900 text-white font-bold shadow-sm"
                  : "bg-slate-50 text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-100"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Creator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCreators.slice(0, 6).map((creator) => (
            <div
              key={creator.id}
              className="group rounded-3xl bg-white border border-slate-200 hover:border-slate-300 p-6 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Top User Info */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3.5">
                    <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 shrink-0 shadow-sm">
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
                        <h3 className="font-bold text-base text-slate-900 transition-colors">
                          {creator.fullName}
                        </h3>
                        {creator.verified && (
                          <CheckCircle2 className="w-4 h-4 fill-sky-500 text-white shrink-0" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 font-mono">@{creator.handle}</p>
                    </div>
                  </div>

                  <Badge variant="glow" size="sm">
                    {creator.primaryCategory}
                  </Badge>
                </div>

                {/* Headline & Bio */}
                <p className="text-xs text-slate-800 font-semibold line-clamp-1 mb-1">
                  {creator.headline}
                </p>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4 font-normal">
                  {creator.bio}
                </p>

                {/* Metrics Bar */}
                <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-center mb-4 font-mono">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Followers</p>
                    <p className="text-xs font-extrabold text-slate-900">
                      {formatNumber(creator.totalFollowers)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Engagement</p>
                    <p className="text-xs font-extrabold text-emerald-600">
                      {creator.avgEngagementRate}%
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Rating</p>
                    <p className="text-xs font-extrabold text-amber-600 flex items-center justify-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                      {creator.rating}
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-mono">From</span>
                  <span className="text-sm font-bold text-slate-900 font-mono">
                    {formatCurrency(creator.startingPrice)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/creators/${creator.id}`}>
                    <Button variant="secondary" size="sm">
                      View Profile
                    </Button>
                  </Link>
                  <Link href="/app/brand/campaigns/create">
                    <Button variant="accent" size="sm">
                      Invite
                    </Button>
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
