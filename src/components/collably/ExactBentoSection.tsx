"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Plus, Sparkles, ExternalLink } from "lucide-react";
import { BrandIcon } from "@/components/ui/BrandLogos";

export function ExactBentoSection() {
  const brandCampaigns = [
    { brand: "Nike", title: "Fashion", budget: "$25,000", live: true },
    { brand: "Spotify", title: "Music", budget: "$18,000", live: true },
    { brand: "Apple", title: "Tech", budget: "$30,000", live: true },
    { brand: "L'Oréal", title: "Beauty", budget: "$20,000", live: true },
  ];

  const creators = [
    {
      name: "Elena Shah",
      niche: "Fashion / Beauty",
      followers: "485K",
      engagement: "6.4%",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=85",
      accentBg: "bg-white border border-black/8 shadow-sm",
    },
    {
      name: "Marcus Lee",
      niche: "Tech / Lifestyle",
      followers: "320K",
      engagement: "4.2%",
      imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=85",
      accentBg: "bg-white border border-black/8 shadow-sm",
    },
    {
      name: "Sofia Rivera",
      niche: "Travel / Lifestyle",
      followers: "275K",
      engagement: "5.8%",
      imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=85",
      accentBg: "bg-white border border-black/8 shadow-sm",
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#FAFAFC] text-[#0A0A0E] select-none relative overflow-hidden border-t border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ══════════════════════════════════════════════════════════════════════
            TOP HALF: FOR CREATORS & LIVE CAMPAIGNS BENTO
            ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Male Creator Portrait with Floating Media Kit Badge (Cols 1-4) */}
          <div className="lg:col-span-4 relative rounded-3xl overflow-hidden border border-black/8 bg-white shadow-xl min-h-[380px] sm:min-h-[440px] flex items-end p-5">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=700&auto=format&fit=crop&q=85"
              alt="Creator in Sunglasses"
              className="absolute inset-0 w-full h-full object-cover filter contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Floating Glass Media Kit Card */}
            <div className="relative z-10 w-full p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/8 shadow-xl space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Elena"
                  className="w-10 h-10 rounded-full object-cover border border-white shadow-xs"
                />
                <div>
                  <h4 className="text-xs font-bold text-[#0A0A0E] font-display">Elena Shah</h4>
                  <p className="text-[10px] text-[#6A6A78] font-sans">Lifestyle / Fashion / Beauty</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-black/8 text-center font-mono">
                <div>
                  <span className="text-[10px] text-[#7A7A8A] block">Followers</span>
                  <span className="text-xs font-bold text-[#0A0A0E]">485K</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A7A8A] block">Engagement</span>
                  <span className="text-xs font-bold text-[#0A0A0E]">6.4%</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#7A7A8A] block">Starting At</span>
                  <span className="text-xs font-bold text-[#0A0A0E]">$1,200</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center: For Creators Copy (Cols 5-8) */}
          <div className="lg:col-span-4 space-y-5 px-2 sm:px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] text-[10px] font-mono font-extrabold uppercase tracking-wider">
              <span>FOR CREATORS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0E] tracking-tight leading-[1.04] font-display">
              Turn your creativity into <br />
              <span className="font-serif italic font-normal text-[#5A5A68]">income.</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#5A5A68] font-sans leading-relaxed">
              Get discovered, work with global brands, and receive secure, on-time payments.
            </p>

            <div className="pt-2">
              <Link href="/creator/register">
                <button className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs sm:text-sm transition-all shadow-[0_4px_14px_rgba(255,210,31,0.4)] flex items-center gap-2 group border border-black/10">
                  <span>Join as a Creator</span>
                  <ArrowRight className="w-4 h-4 text-[#0A0A0E] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right: Top Brand Campaigns Card (Cols 9-12) */}
          <div className="lg:col-span-4 rounded-3xl bg-white border border-black/8 p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/8 text-xs font-sans">
              <h3 className="font-bold text-[#0A0A0E] font-display">Top Brand Campaigns</h3>
              <ChevronDown className="w-4 h-4 text-[#7A7A8A]" />
            </div>

            <div className="space-y-2.5">
              {brandCampaigns.map((c, i) => (
                <div
                  key={i}
                  className="p-3 rounded-2xl bg-[#F8F8FC] hover:bg-[#F0F0F8] border border-black/5 hover:border-black/10 transition-all flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#0A0A0E] flex items-center justify-center font-bold text-white text-[11px]">
                      {c.brand.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A0A0E] font-display">{c.brand}</h4>
                      <p className="text-[11px] text-[#6A6A78] font-mono">
                        {c.budget} • {c.title}
                      </p>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 text-[10px] font-mono font-bold">
                    Live
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/campaigns"
                className="text-xs font-mono text-[#5A5A68] hover:text-[#0A0A0E] transition-colors flex items-center justify-center gap-1 font-bold"
              >
                <span>View All Campaigns</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            BOTTOM HALF: FOR BRANDS & CREATOR DISCOVERY GRID
            ══════════════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8 border-t border-black/8">
          {/* Left: For Brands Copy (Cols 1-4) */}
          <div className="lg:col-span-4 space-y-5 px-2 sm:px-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-[#0A0A0E] text-[10px] font-mono font-bold uppercase tracking-wider">
              <span>FOR BRANDS</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0E] tracking-tight leading-[1.04] font-display">
              Find the perfect <br />
              <span className="font-serif italic font-normal text-[#5A5A68]">creators</span> for your next campaign.
            </h2>

            <p className="text-xs sm:text-sm text-[#5A5A68] font-sans leading-relaxed">
              Access a global network of verified creators, or let our AI do the heavy lifting.
            </p>

            <div className="pt-2">
              <Link href="/for-brands">
                <button className="px-6 py-3.5 rounded-full bg-white hover:bg-[#F8F8FC] border border-black/10 text-[#0A0A0E] font-bold text-xs sm:text-sm transition-all shadow-xs flex items-center gap-2 group">
                  <span>Start a Campaign</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right: 4-Card Creator Discovery Grid (Cols 5-12) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {creators.map((c, i) => (
              <div
                key={i}
                className={`rounded-2xl overflow-hidden border p-3 flex flex-col justify-between space-y-3 relative group transition-all duration-300 hover:scale-[1.02] ${c.accentBg}`}
              >
                <div className="aspect-[4/5] w-full rounded-xl overflow-hidden relative">
                  <img
                    src={c.imageUrl}
                    alt={c.name}
                    className="w-full h-full object-cover filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#0A0A0E] font-display truncate">{c.name}</h4>
                  <p className="text-[10px] text-[#6A6A78] truncate font-sans">{c.niche}</p>
                  <div className="flex items-center justify-between text-[10px] font-mono text-[#0A0A0E] pt-1 font-bold">
                    <span>{c.followers}</span>
                    <span className="text-[#A37F00]">{c.engagement}</span>
                  </div>
                </div>
              </div>
            ))}

            {/* 4th Card: Explore More Creators */}
            <Link
              href="/creators"
              className="rounded-2xl border border-dashed border-black/15 bg-white hover:bg-[#F8F8FC] p-4 flex flex-col items-center justify-center text-center space-y-2 text-[#5A5A68] hover:text-[#0A0A0E] transition-all group min-h-[180px] shadow-xs"
            >
              <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:scale-110 transition-transform text-[#0A0A0E]">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold font-sans text-[#0A0A0E]">Explore More Creators</p>
                <p className="text-[10px] text-[#7A7A8A] font-mono">50,000+ Verified</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
