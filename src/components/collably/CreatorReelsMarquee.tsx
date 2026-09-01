"use client";

import React from "react";
import { motion } from "framer-motion";
import { CENTRAL_CREATORS } from "@/data/creators";
import { CheckCircle2, Star, Play, ShieldCheck } from "lucide-react";

export function CreatorReelsMarquee() {
  const reelCards = [
    {
      id: "reel-1",
      creator: CENTRAL_CREATORS[0],
      videoThumbnail: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
      tag: "4K YouTube Review",
      title: "AI Hardware & SDK Teardown",
      views: "88K Views",
      payout: "₹28,500",
    },
    {
      id: "reel-2",
      creator: CENTRAL_CREATORS[2],
      videoThumbnail: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80",
      tag: "Fitness & Bio Reel",
      title: "14-Day Recovery Protocol",
      views: "140K Views",
      payout: "₹24,000",
    },
    {
      id: "reel-3",
      creator: CENTRAL_CREATORS[1],
      videoThumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80",
      tag: "RED Cinema Cut",
      title: "Minimalist Architectural Design",
      views: "95K Views",
      payout: "₹22,000",
    },
    {
      id: "reel-4",
      creator: CENTRAL_CREATORS[4],
      videoThumbnail: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80",
      tag: "Clean Skincare",
      title: "Active Formulation Review",
      views: "110K Views",
      payout: "₹26,000",
    },
    {
      id: "reel-5",
      creator: CENTRAL_CREATORS[3],
      videoThumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80",
      tag: "Full-Stack Dev",
      title: "Cloud Infrastructure Teardown",
      views: "72K Views",
      payout: "₹19,500",
    },
  ];

  const marqueeItems = [...reelCards, ...reelCards];

  return (
    <section className="py-14 sm:py-18 bg-[#F6F7F3] border-y border-[#E2E6E1] relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-[#087F5B]" />
          <span className="font-bold text-[#101310] uppercase tracking-wider">APPROVED DELIVERABLES</span>
          <span className="text-[#8A908B]">•</span>
          <span className="text-[#626862]">Recent 4K Creator Cuts</span>
        </div>
        <span className="text-xs font-mono text-[#087F5B] font-bold hidden sm:flex items-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5" /> 100% Payouts Disbursed
        </span>
      </div>

      {/* Infinite Horizontal Carousel */}
      <div className="relative w-full overflow-hidden">
        {/* Left & Right Soft Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#F6F7F3] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#F6F7F3] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: [0, -1600] }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="flex items-center gap-5 w-max"
        >
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="w-[270px] sm:w-[300px] rounded-xl bg-[#FFFFFF] border border-[#E2E6E1] hover:border-[#087F5B] overflow-hidden group shadow-fintech transition-all duration-200"
            >
              {/* Image & Video Tag */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#101310]">
                <img
                  src={item.videoThumbnail}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                {/* Top Tag */}
                <div className="absolute top-2.5 left-2.5">
                  <span className="px-2 py-0.5 rounded-md bg-[#101310]/80 backdrop-blur-md text-[10px] font-mono font-semibold text-white">
                    {item.tag}
                  </span>
                </div>

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-9 h-9 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center text-white group-hover:scale-105 group-hover:bg-[#087F5B] transition-all">
                    <Play className="w-3.5 h-3.5 ml-0.5 fill-white" />
                  </div>
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-bold text-[11px]">{item.views}</span>
                  <span className="px-2 py-0.5 rounded-md bg-[#EAF8F2] text-[#087F5B] text-[10px] font-bold">
                    {item.payout} Paid
                  </span>
                </div>
              </div>

              {/* Creator Card Foot */}
              <div className="p-3.5 flex items-center justify-between bg-[#FFFFFF]">
                <div className="flex items-center gap-2 overflow-hidden">
                  <img
                    src={item.creator.avatarUrl}
                    alt={item.creator.fullName}
                    className="w-7 h-7 rounded-full object-cover border border-[#E2E6E1] shrink-0"
                  />
                  <div className="overflow-hidden">
                    <h4 className="text-xs font-bold text-[#101310] font-sans truncate flex items-center gap-1">
                      {item.creator.fullName}
                      <CheckCircle2 className="w-3 h-3 text-[#087F5B] shrink-0" />
                    </h4>
                    <span className="text-[10px] text-[#626862] font-mono block truncate">
                      @{item.creator.handle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[#087F5B] text-xs font-mono font-bold shrink-0">
                  <Star className="w-3.5 h-3.5 fill-[#087F5B] text-[#087F5B]" />
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
