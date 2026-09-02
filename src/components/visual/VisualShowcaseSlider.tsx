"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Star, Sparkles, Video, Play } from "lucide-react";
import { InteractiveTiltCard } from "@/components/ui/InteractiveTiltCard";
import { SafeImage } from "@/components/ui/SafeImage";

const SHOWCASE_WORKS = [
  {
    title: "AIR MAX SNEAKER DROP",
    brand: "Nike Running",
    creator: "Elena Rostova",
    mainImage: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=700&auto=format&fit=crop&q=80",
    overlappingThumb: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80",
    roas: "6.2× ROAS",
    views: "1.4M Views",
  },
  {
    title: "FX3 CINEMA TEARDOWN",
    brand: "Sony Alpha",
    creator: "Marcus Vance",
    mainImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&auto=format&fit=crop&q=80",
    overlappingThumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    roas: "4.8× ROAS",
    views: "980K Views",
  },
  {
    title: "BIOHACKING RECOVERY",
    brand: "TheraPulse Bio",
    creator: "Sofia Chen",
    mainImage: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=700&auto=format&fit=crop&q=80",
    overlappingThumb: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80",
    roas: "5.5× ROAS",
    views: "750K Views",
  },
  {
    title: "ALPINE MOTORSPORTS",
    brand: "Kronos Auto",
    creator: "Devon Thorne",
    mainImage: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=700&auto=format&fit=crop&q=80",
    overlappingThumb: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    roas: "5.1× ROAS",
    views: "1.1M Views",
  },
];

export function VisualShowcaseSlider() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-[#FAF9F5] text-[#0A0A0E] select-none overflow-hidden border-t border-black/6 font-sans">
      <div className="max-w-7xl mx-auto w-full space-y-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-tight text-[#8A7000] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
              SELECTED CAMPAIGN DELIVERABLES
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-[#0A0A0E]">
              Crafted for High-Growth Brands.
            </h2>
          </div>

          <Link
            href="/case-studies"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#0A0A0E] hover:underline"
          >
            <span>View All Case Studies</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4 Overlapping Visual Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SHOWCASE_WORKS.map((work) => (
            <InteractiveTiltCard
              key={work.title}
              maxTilt={8}
              glowColor="rgba(255, 210, 31, 0.25)"
              className="rounded-3xl bg-white border border-black/8 hover:border-[#FFD21F] shadow-[0_12px_40px_rgba(0,0,0,0.06)] transition-all p-4 space-y-3 flex flex-col justify-between group cursor-pointer"
            >
              {/* Overlapping Image Visual */}
              <div className="relative aspect-[4/4.5] w-full rounded-2xl overflow-hidden bg-[#0A0A0E]">
                <SafeImage
                  src={work.mainImage}
                  alt={work.title}
                  width={700}
                  height={800}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                {/* Overlapping Floating Creator Avatar Thumbnail */}
                <div className="absolute bottom-12 right-3 w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-lg bg-black z-20">
                  <SafeImage
                    src={work.overlappingThumb}
                    alt={work.creator}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Top Badges */}
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-mono font-bold text-white border border-white/10">
                  {work.brand}
                </span>
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-mono font-extrabold shadow-sm">
                  {work.roas}
                </span>

                {/* Bottom Title */}
                <div className="absolute bottom-3 inset-x-3 text-white z-10">
                  <h3 className="text-sm font-bold font-display uppercase tracking-tight truncate">
                    {work.title}
                  </h3>
                  <p className="text-[10px] text-white/70 font-mono">{work.creator} • {work.views}</p>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 border-t border-black/6 flex items-center justify-between text-xs font-mono text-[#6A6A78]">
                <span>Campaign Master</span>
                <Link
                  href="/case-studies"
                  className="text-xs font-bold text-[#0A0A0E] hover:underline flex items-center gap-1"
                >
                  <span>Reel</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </InteractiveTiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
