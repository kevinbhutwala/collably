"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CENTRAL_CREATORS } from "@/data/creators";
import { Star, CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { formatCurrency } from "@/core/utils/currency";
import { SocialIcon } from "@/components/ui/SocialIcons";

export function CreatorShowcase() {
  const [activeHub, setActiveHub] = useState<string>("All");

  const hubs = [
    { id: "All", label: "All Regions", flag: "🌐" },
    { id: "India", label: "India", flag: "🇮🇳" },
    { id: "United States", label: "United States", flag: "🇺🇸" },
    { id: "Dubai / UAE", label: "Dubai / UAE", flag: "🇦🇪" },
  ];

  const filteredCreators =
    activeHub === "All"
      ? CENTRAL_CREATORS.slice(0, 6)
      : CENTRAL_CREATORS.filter((c) => {
          const loc = (c.location || "").toLowerCase();
          const r = ((c as any).region || "").toLowerCase();
          if (activeHub === "India") return loc.includes("india") || r.includes("india");
          if (activeHub === "United States") return loc.includes("united states") || r.includes("united states");
          if (activeHub === "Dubai / UAE") return loc.includes("dubai") || loc.includes("emirates") || r.includes("dubai");
          return true;
        }).slice(0, 6);

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
              Discover verified creators across India, the United States, and Dubai with audited audience demographics.
            </p>
          </div>

          {/* Regional Hub Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {hubs.map((hub) => (
              <button
                key={hub.id}
                onClick={() => setActiveHub(hub.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  activeHub === hub.id
                    ? "bg-[#087F5B] text-white shadow-xs"
                    : "bg-[#F6F7F3] text-[#626862] hover:text-[#101310] hover:bg-[#E2E6E1] border border-[#E2E6E1]"
                }`}
              >
                <span>{hub.flag}</span>
                <span>{hub.label}</span>
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
                  <span className="px-2.5 py-0.5 rounded-md bg-[#101310]/80 backdrop-blur-md text-white font-mono text-[10px] font-bold flex items-center gap-1">
                    <SocialIcon platform="instagram" colored={true} size={11} />
                    <span>Instagram Profile</span>
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                  <span className="font-bold">
                    {creator.totalFollowers >= 1000000
                      ? `${(creator.totalFollowers / 1000000).toFixed(1)}M`
                      : `${(creator.totalFollowers / 1000).toFixed(0)}K`}{" "}
                    IG Reach
                  </span>
                  <span className="font-bold text-[#8DD9BA]">{creator.avgEngagementRate}% ER</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#101310] font-sans flex items-center gap-1.5">
                      <span>{creator.fullName}</span>
                      <span title="Verified on Instagram">
                        <CheckCircle className="w-3.5 h-3.5 text-[#0095F6] fill-[#0095F6] text-white" />
                      </span>
                    </h4>
                    <a
                      href={creator.instagramUrl || `https://www.instagram.com/${creator.handle}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#626862] hover:text-[#087F5B] font-mono transition-colors"
                      title="View Instagram Profile"
                    >
                      @{creator.handle} ↗
                    </a>
                    <div className="flex items-center gap-1 text-[11px] text-[#626862] font-mono mt-0.5">
                      <span>{creator.countryFlag || (creator.location.includes("India") ? "🇮🇳" : creator.location.includes("United States") ? "🇺🇸" : "🇦🇪")}</span>
                      <span className="truncate max-w-[140px]">{creator.location}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[9px] text-[#8A908B] font-mono block uppercase">Demo Est.</span>
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
