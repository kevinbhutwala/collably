"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";

export function ExactSuccessStoriesSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const metrics = [
    { value: "4.8×", label: "Average ROI" },
    { value: "90%", label: "Net Earnings" },
    { value: "<24h", label: "Payouts" },
    { value: "100%", label: "Escrow Protection" },
  ];

  return (
    <section className="py-20 sm:py-28 bg-[#07070B] text-white select-none relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-semibold tracking-[0.16em] text-white/50 uppercase block">
              REAL CAMPAIGNS. REAL RESULTS.
            </span>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-display">
              CREATOR <br className="sm:hidden" />
              <span className="font-serif italic font-normal text-white/80 lowercase">success stories</span>
            </h2>

            <p className="text-xs sm:text-sm text-white/60 font-sans max-w-lg leading-relaxed">
              From global brands to independent creators, see how Collably turns ideas into impact.
            </p>
          </div>

          {/* Nav Arrows */}
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.12] flex items-center justify-center text-white transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.12] flex items-center justify-center text-white transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cinematic Video Showcase Card */}
        <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-[#0C0B12] shadow-[0_30px_90px_rgba(0,0,0,0.8)] aspect-[16/9] sm:aspect-[21/9] flex items-end p-6 sm:p-10 group">
          <img
            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=1600&auto=format&fit=crop&q=85"
            alt="Night Drive Creator Story"
            className="absolute inset-0 w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-102 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#07070B] via-black/40 to-transparent pointer-events-none" />

          {/* Floating Play Story Pill */}
          <div className="relative z-10 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono text-[#FFD21F] font-bold uppercase tracking-wider block">
                FEATURED STORY • NIKE RUNNING 2026
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                How Devon Thorne Generated 1.4M Organic Impressions
              </h3>
            </div>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-xl border border-white/20 text-white font-sans text-xs font-semibold transition-all shrink-0 active:scale-95 shadow-xl"
            >
              <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center">
                <Play className="w-3 h-3 fill-black ml-0.5" />
              </div>
              <span>Watch Story 2:48</span>
            </button>
          </div>
        </div>

        {/* Bottom 4 Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4 border-t border-white/10 text-center font-mono">
          {metrics.map((m, i) => (
            <div key={i} className="space-y-1">
              <p className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight numeric-tabular font-display">
                {m.value}
              </p>
              <p className="text-xs text-white/50 font-sans">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
