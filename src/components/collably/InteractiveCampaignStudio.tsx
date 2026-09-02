"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
  ArrowRight,
  CheckCircle2,
  Sliders,
  DollarSign,
  Users,
  Video,
} from "lucide-react";
import { InteractiveTiltCard } from "@/components/ui/InteractiveTiltCard";

interface NicheOption {
  id: string;
  name: string;
  icon: string;
  multiplier: number;
  creators: { name: string; followers: string; role: string; avatar: string }[];
  deliverables: string[];
}

const NICHES: NicheOption[] = [
  {
    id: "fashion",
    name: "Fashion & Luxury",
    icon: "✨",
    multiplier: 1.2,
    creators: [
      { name: "Elena Shah", followers: "485K", role: "Editorial Model", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200" },
      { name: "Claire Dupont", followers: "320K", role: "Paris Stylist", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200" },
    ],
    deliverables: ["2× 4K High-Fashion Reels", "1× Dedicated Carousel", "Whitelisted Ad Rights (30d)"],
  },
  {
    id: "tech",
    name: "Tech & AI",
    icon: "⚡",
    multiplier: 1.4,
    creators: [
      { name: "Marcus Lee", followers: "320K", role: "AI Filmmaker", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200" },
      { name: "Alex Rivers", followers: "210K", role: "Hardware Reviewer", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200" },
    ],
    deliverables: ["1× Dedicated YouTube 4K Video", "2× TikTok Teardown Hooks", "Source Project Files Included"],
  },
  {
    id: "fitness",
    name: "Athletics & Bio",
    icon: "🌿",
    multiplier: 1.1,
    creators: [
      { name: "Karan Mehta", followers: "510K", role: "Calisthenics Coach", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200" },
      { name: "Sofia Rivera", followers: "275K", role: "Holistic Trainer", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200" },
    ],
    deliverables: ["2× Authentic Workout Integrations", "3× IG Story Swipes", "Usage in Brand Commercials"],
  },
  {
    id: "lifestyle",
    name: "SaaS & Consumer",
    icon: "💼",
    multiplier: 1.3,
    creators: [
      { name: "Maya Patel", followers: "190K", role: "Productivity Host", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200" },
      { name: "David Kim", followers: "340K", role: "Founder & Creator", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200" },
    ],
    deliverables: ["1× Live Product Walkthrough", "2× Founder Reaction Clips", "Perpetual Organic Reshare"],
  },
];

const BUDGET_PRESETS = [1000, 2500, 5000, 10000];

export function InteractiveCampaignStudio() {
  const [selectedNicheId, setSelectedNicheId] = useState<string>("fashion");
  const [budget, setBudget] = useState<number>(2500);

  const activeNiche = NICHES.find((n) => n.id === selectedNicheId) || NICHES[0];

  // Dynamic calculations based on selected budget and category
  const estimatedReach = Math.round((budget / 10) * 140 * activeNiche.multiplier);
  const estimatedCreators = budget >= 7500 ? 4 : budget >= 4000 ? 3 : budget >= 2000 ? 2 : 1;
  const estimatedRoas = (3.4 + (budget / 10000) * 1.8).toFixed(1);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white text-[#0A0A0E] select-none overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[400px] bg-gradient-to-r from-[#FFD21F]/15 to-[#087F5B]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full space-y-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold tracking-tight text-[#8A7000] uppercase flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
              INTERACTIVE CAMPAIGN STUDIO
            </span>
            <h2 className="text-2xl sm:text-4xl font-black font-display tracking-tight text-[#0A0A0E]">
              Simulate Your Creator Campaign in Real-Time.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#5A5A68] max-w-md font-sans">
            Dial in your niche and budget to preview matched creators, guaranteed deliverables, and forecasted impressions instantly.
          </p>
        </div>

        {/* Studio Interactive Card Container */}
        <div className="rounded-3xl bg-[#FAF9F5] border border-black/8 p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
            {/* ══════════════════════════════════════════════════════════════════════
                LEFT CONTROLS: NICHE SELECTOR & SLIDER
                ══════════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-6 space-y-6">
              {/* 1. Category Selector */}
              <div className="space-y-2.5">
                <label className="text-xs font-mono font-bold text-[#6A6A78] uppercase tracking-wider block">
                  1. Select Content Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {NICHES.map((niche) => (
                    <button
                      key={niche.id}
                      onClick={() => setSelectedNicheId(niche.id)}
                      className={`p-3 rounded-2xl text-left font-sans font-bold text-xs sm:text-sm transition-all flex items-center gap-2.5 border border-black/5 ${
                        selectedNicheId === niche.id
                          ? "bg-[#0A0A0E] text-white shadow-md"
                          : "bg-[#F4F4F8] text-[#4A4A58] hover:bg-[#EBEBEF]"
                      }`}
                    >
                      <span className="text-sm">{niche.icon}</span>
                      <span>{niche.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Budget Presets */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono font-bold text-[#6A6A78] uppercase tracking-wider">
                    2. Target Campaign Budget
                  </label>
                  <span className="text-lg font-black text-[#0A0A0E] font-display">
                    ${budget.toLocaleString()}
                  </span>
                </div>

                {/* Preset Chips */}
                <div className="grid grid-cols-4 gap-2">
                  {BUDGET_PRESETS.map((val) => (
                    <button
                      key={val}
                      onClick={() => setBudget(val)}
                      className={`py-2 px-2 rounded-xl text-xs font-mono font-bold transition-all text-center border ${
                        budget === val
                          ? "bg-[#FFD21F] text-[#0A0A0E] border-[#FFD21F] shadow-sm"
                          : "bg-white text-[#4A4A58] border-black/10 hover:border-black/20"
                      }`}
                    >
                      ${val >= 1000 ? `${val / 1000}k` : val}
                    </button>
                  ))}
                </div>
              </div>

              {/* Matched Creators Mini Preview */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[11px] font-mono font-bold text-[#6A6A78] uppercase tracking-wider block">
                  AI-Recommended Creators
                </span>
                <div className="grid grid-cols-2 gap-3">
                  {activeNiche.creators.map((c, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-2xl bg-[#F8F8FC] border border-black/6 flex items-center gap-3 shadow-2xs"
                    >
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-10 h-10 rounded-full object-cover border border-white shrink-0 shadow-xs"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-[#0A0A0E] truncate font-display">{c.name}</p>
                        <p className="text-[10px] text-[#6A6A78] font-sans truncate">{c.followers} • {c.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════════
                RIGHT OUTPUT: 3D TILT DYNAMIC PROJECTED DELIVERABLES & ROI
                ══════════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-6">
              <InteractiveTiltCard
                maxTilt={8}
                glowColor="rgba(255, 210, 31, 0.28)"
                className="rounded-2xl bg-gradient-to-br from-[#0A0A0E] via-[#14141A] to-[#0A0A0E] text-white p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden"
              >
                {/* Gold Glow inside card */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFD21F]/20 rounded-full blur-[80px] pointer-events-none" />

                {/* Header Metrics */}
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-white/10 relative z-10">
                  <div>
                    <span className="text-[10px] font-mono text-[#FFD21F] font-bold uppercase tracking-wider flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> Projected Reach
                    </span>
                    <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-white block mt-1">
                      {estimatedReach.toLocaleString()}+
                    </span>
                    <span className="text-[10px] text-white/50 font-sans">Verified Impressions</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-[#087F5B] font-bold uppercase tracking-wider flex items-center gap-1">
                      <Zap className="w-3 h-3" /> Forecasted ROAS
                    </span>
                    <span className="text-2xl sm:text-3xl font-black font-display tracking-tight text-[#FFD21F] block mt-1">
                      {estimatedRoas}×
                    </span>
                    <span className="text-[10px] text-white/50 font-sans">Based on category data</span>
                  </div>
                </div>

                {/* Included Production Deliverables */}
                <div className="space-y-2.5 relative z-10">
                  <span className="text-xs font-mono font-bold text-white/70 uppercase tracking-wider block">
                    Included Production Assets ({estimatedCreators} Creators Allocated):
                  </span>
                  <div className="space-y-2">
                    {activeNiche.deliverables.map((del, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-xs font-sans text-white/90 p-2.5 rounded-xl bg-white/[0.04] border border-white/8"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#087F5B] shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Launch Action */}
                <div className="pt-2 relative z-10">
                  <Link href="/for-brands">
                    <button className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-black text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(255,210,31,0.5)] flex items-center justify-center gap-2 group active:scale-[0.98]">
                      <span>Lock In Campaign Brief (${budget.toLocaleString()})</span>
                      <ArrowRight className="w-4 h-4 text-[#0A0A0E] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                  <p className="text-[10px] font-mono text-center text-white/50 mt-2">
                    🔒 Funds held in 100% pre-funded FDIC milestone escrow
                  </p>
                </div>
              </InteractiveTiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
