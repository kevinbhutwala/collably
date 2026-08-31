"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Sparkles, Star, Zap, CheckCircle2, TrendingUp } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";

export function SlidingTickerRail() {
  const topCampaigns = [
    { brand: "Supabase", title: "Developer Tools 60s YouTube Integration", budget: "$4,200", badge: "Milestone Locked", color: "from-emerald-500/10 to-teal-500/10 border-emerald-300 text-emerald-700" },
    { brand: "Figma", title: "Design Systems Reel & Tutorial", budget: "$3,800", badge: "Brief Dispatched", color: "from-pink-500/10 to-rose-500/10 border-pink-300 text-pink-700" },
    { brand: "Notion AI", title: "Productivity Workflow Deep Dive", budget: "$5,500", badge: "Milestone Locked", color: "from-orange-500/10 to-amber-500/10 border-orange-300 text-orange-700" },
    { brand: "Raycast", title: "macOS Extension Setup Showcase", budget: "$2,900", badge: "In 4K Review", color: "from-purple-500/10 to-indigo-500/10 border-purple-300 text-purple-700" },
    { brand: "Linear", title: "Engineering Sprint Management Breakdown", budget: "$4,600", badge: "Payout Disbursed", color: "from-sky-500/10 to-blue-500/10 border-sky-300 text-sky-700" },
  ];

  const bottomCreators = [
    { name: "Elena Rostova", handle: "@elenatech", niche: "AI & Hardware", followers: "485K", engagement: "6.4%", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80", color: "from-orange-500 to-pink-500" },
    { name: "Marcus Vance", handle: "@marcusvance", niche: "Design & UX", followers: "320K", engagement: "5.8%", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80", color: "from-pink-500 to-purple-500" },
    { name: "Aria Chen", handle: "@ariachenwellness", niche: "Health & Fitness", followers: "610K", engagement: "7.1%", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80", color: "from-amber-500 to-orange-500" },
    { name: "Devon Thorne", handle: "@devoncodes", niche: "Software & Dev", followers: "240K", engagement: "8.2%", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80", color: "from-indigo-500 to-sky-500" },
    { name: "Chloe Dubois", handle: "@chloedubois_paris", niche: "Luxury & Lifestyle", followers: "890K", engagement: "4.9%", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=80", color: "from-rose-500 to-pink-600" },
    { name: "Siddharth Nair", handle: "@sidfintech", niche: "Finance & Wealth", followers: "415K", engagement: "6.7%", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80", color: "from-emerald-500 to-teal-500" },
  ];

  return (
    <section className="py-16 overflow-hidden bg-gradient-to-b from-white via-orange-50/20 to-white relative select-none">
      {/* Side Vignette Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

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
                className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-orange-300 transition-all shrink-0 w-[340px] sm:w-[380px]"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-slate-900 to-slate-800 text-white flex items-center justify-center font-bold text-xs font-mono shrink-0 shadow-xs">
                  {deal.brand[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="font-bold text-xs text-slate-900 truncate font-sans">{deal.brand}</span>
                    <span className="font-mono text-xs font-black text-brand-accent">{deal.budget}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 truncate font-sans">{deal.title}</p>
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
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md hover:border-pink-300 transition-all shrink-0 w-[300px] sm:w-[340px]"
              >
                <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-slate-200 shrink-0">
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
                    <span className="font-bold text-xs text-slate-900 truncate font-sans">{creator.name}</span>
                    <CheckCircle2 className="w-3 h-3 text-sky-500 shrink-0" />
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono block">{creator.niche}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-black text-slate-900 font-mono block">{creator.followers}</span>
                  <span className="text-[10px] text-emerald-600 font-mono font-bold">{creator.engagement} ER</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
