"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";

export function SlidingTickerRail() {
  const topCampaigns = [
    { brand: "Supabase", title: "Developer Tools 60s YouTube Integration", budget: "$4,200", badge: "Milestone Locked", color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/40 text-emerald-300" },
    { brand: "Figma", title: "Design Systems Reel & Tutorial", budget: "$3,800", badge: "Brief Dispatched", color: "from-pink-500/20 to-rose-500/20 border-pink-500/40 text-pink-300" },
    { brand: "Notion AI", title: "Productivity Workflow Deep Dive", budget: "$5,500", badge: "Milestone Locked", color: "from-amber-500/20 to-orange-500/20 border-amber-500/40 text-amber-300" },
    { brand: "Raycast", title: "macOS Extension Setup Showcase", budget: "$2,900", badge: "In 4K Review", color: "from-purple-500/20 to-indigo-500/20 border-purple-500/40 text-purple-300" },
    { brand: "Linear", title: "Engineering Sprint Management Breakdown", budget: "$4,600", badge: "Payout Disbursed", color: "from-sky-500/20 to-blue-500/20 border-sky-500/40 text-sky-300" },
  ];

  const bottomCreators = [
    { name: "Elena Rostova", handle: "@elenatech", niche: "AI & Hardware", followers: "485K", engagement: "6.4%", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80" },
    { name: "Marcus Vance", handle: "@marcusvance", niche: "Design & UX", followers: "320K", engagement: "5.8%", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80" },
    { name: "Aria Chen", handle: "@ariachenwellness", niche: "Health & Fitness", followers: "610K", engagement: "7.1%", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80" },
    { name: "Devon Thorne", handle: "@devoncodes", niche: "Software & Dev", followers: "240K", engagement: "8.2%", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80" },
    { name: "Chloe Dubois", handle: "@chloedubois_paris", niche: "Luxury & Lifestyle", followers: "890K", engagement: "4.9%", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80" },
    { name: "Siddharth Nair", handle: "@sidfintech", niche: "Finance & Wealth", followers: "415K", engagement: "6.7%", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80" },
  ];

  return (
    <section className="py-16 overflow-hidden bg-transparent relative select-none">
      {/* Side Vignette Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#0a070a] via-[#0a070a]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#0a070a] via-[#0a070a]/80 to-transparent z-20 pointer-events-none" />

      <div className="space-y-6">
        {/* Rail 1: Fast Sliding Live Campaign Deals (Leftward) */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: [0, -1400] }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 shrink-0"
          >
            {[...topCampaigns, ...topCampaigns, ...topCampaigns].map((deal, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-[#120c16] border border-white/10 shadow-card hover:border-pink-500/40 transition-all shrink-0 w-[340px] sm:w-[380px] text-white"
              >
                <div className="w-10 h-10 rounded-xl bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] flex items-center justify-center font-bold text-xs font-mono shrink-0 shadow-xs">
                  {deal.brand[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="font-bold text-xs text-white truncate font-display">{deal.brand}</span>
                    <span className="font-mono text-xs font-black text-emerald-400">{deal.budget}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 truncate font-sans">{deal.title}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border shrink-0 bg-gradient-to-r ${deal.color}`}>
                  {deal.badge}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Rail 2: Fast Sliding Creators (Rightward) */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={{ x: [-1400, 0] }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 shrink-0"
          >
            {[...bottomCreators, ...bottomCreators, ...bottomCreators].map((creator, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#120c16] border border-white/10 shadow-card hover:border-pink-500/40 transition-all shrink-0 w-[300px] sm:w-[340px] text-white"
              >
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-white/10 shrink-0">
                  <SafeImage
                    src={creator.avatar}
                    alt={creator.name}
                    fallbackType="creator"
                    fallbackName={creator.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-xs text-white truncate font-display">{creator.name}</span>
                    <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0" />
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono block">{creator.niche}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-white font-mono block">{creator.followers}</span>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">{creator.engagement} ER</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
