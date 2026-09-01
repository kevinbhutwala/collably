"use client";

import React from "react";
import { motion } from "framer-motion";
import { CENTRAL_CREATORS } from "@/data/creators";
import { CheckCircle2, Star, Play, Sparkles, ShieldCheck } from "lucide-react";
import { formatCurrency } from "@/core/utils/currency";

export function CreatorReelsMarquee() {
  const reelCards = [
    {
      id: "reel-1",
      creator: CENTRAL_CREATORS[0], // Elena
      videoThumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
      tag: "4K YouTube Review",
      title: "Next-Gen AI Hardware & SDK Teardown",
      views: "88K Views",
      payout: "$3,500",
      verified: true,
    },
    {
      id: "reel-2",
      creator: CENTRAL_CREATORS[2], // Aria
      videoThumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
      tag: "Biometric Reel",
      title: "14-Day Sleep & Metabolic Protocol",
      views: "140K Views",
      payout: "$3,200",
      verified: true,
    },
    {
      id: "reel-3",
      creator: CENTRAL_CREATORS[1], // Marcus
      videoThumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
      tag: "RED Cinema Lookbook",
      title: "Minimalist Scandinavian Architecture 4K",
      views: "95K Views",
      payout: "$2,800",
      verified: true,
    },
    {
      id: "reel-4",
      creator: CENTRAL_CREATORS[4], // Chloe
      videoThumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
      tag: "Clinical Skincare",
      title: "Barrier Formulation Chemistry Breakdown",
      views: "110K Views",
      payout: "$3,000",
      verified: true,
    },
    {
      id: "reel-5",
      creator: CENTRAL_CREATORS[3], // Devon
      videoThumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
      tag: "Live Code Integration",
      title: "Full-Stack AI Agent Cloud Architecture",
      views: "72K Views",
      payout: "$2,400",
      verified: true,
    },
    {
      id: "reel-6",
      creator: CENTRAL_CREATORS[6], // Kai
      videoThumbnail: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=80",
      tag: "Esports Hardware QA",
      title: "Ultra-Low Latency Switch Benchmarks",
      views: "180K Views",
      payout: "$3,800",
      verified: true,
    },
  ];

  // Duplicate for seamless infinite marquee
  const marqueeItems = [...reelCards, ...reelCards];

  return (
    <section className="py-16 sm:py-20 bg-transparent border-y border-white/10 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono text-pink-300">
          <span className="w-2.5 h-2.5 rounded-full bg-[hsl(327,100%,50%)] animate-ping" />
          <span className="font-bold text-white uppercase font-display tracking-wider">LIVE PRODUCTION REELS</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-400">Approved 4K Deliverables</span>
        </div>
        <span className="text-xs font-mono text-emerald-400 font-bold hidden sm:flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Payouts Disbursed
        </span>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Shadow Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0a070a] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0a070a] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: [0, -1800] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-6 w-max"
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[280px] sm:w-[320px] rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/50 overflow-hidden group shadow-xl transition-all duration-300 hover:-translate-y-1 relative"
            >
              {/* Image & Video Tag */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <img
                  src={item.videoThumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#120c16] via-transparent to-black/40" />

                {/* Top Tag Pill */}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-mono font-bold text-white">
                    {item.tag}
                  </span>
                </div>

                {/* Play Button Icon */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-pink-500/80 transition-all shadow-lg">
                    <Play className="w-4 h-4 ml-0.5 fill-white" />
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-bold">{item.views}</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-bold">
                    {item.payout} Disbursed
                  </span>
                </div>
              </div>

              {/* Creator Card Foot */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5 overflow-hidden">
                  <img
                    src={item.creator.avatarUrl}
                    alt={item.creator.fullName}
                    className="w-8 h-8 rounded-full object-cover border border-white/15 shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-white font-display truncate flex items-center gap-1">
                      {item.creator.fullName}
                      <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0" />
                    </h4>
                    <span className="text-[10px] text-slate-400 font-mono block truncate">
                      @{item.creator.handle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-amber-300 text-xs font-mono font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-gold text-gold" />
                  <span>{item.creator.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
