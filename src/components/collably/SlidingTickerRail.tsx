"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { useGlobalCurrency } from "@/context/CurrencyContext";

export function SlidingTickerRail() {
  const { format } = useGlobalCurrency();

  const topCampaigns = [
    { brand: "Supabase", title: "Developer Tools 60s YouTube Integration", budgetAmount: 4200, badge: "Milestone Locked", color: "bg-[#FFD21F]/15 border-[#FFD21F]/30 text-[#FFD21F]" },
    { brand: "Figma", title: "Design Systems Reel & Tutorial", budgetAmount: 3800, badge: "Brief Dispatched", color: "bg-white/10 border-white/20 text-white" },
    { brand: "Notion AI", title: "Productivity Workflow Deep Dive", budgetAmount: 5500, badge: "Milestone Locked", color: "bg-[#FFD21F]/15 border-[#FFD21F]/30 text-[#FFD21F]" },
    { brand: "Raycast", title: "macOS Extension Setup Showcase", budgetAmount: 2900, badge: "In 4K Review", color: "bg-white/10 border-white/20 text-white" },
    { brand: "Linear", title: "Engineering Sprint Management Breakdown", budgetAmount: 4600, badge: "Payout Disbursed", color: "bg-[#FFD21F]/15 border-[#FFD21F]/30 text-[#FFD21F]" },
  ];

  const bottomCreators = [
    { name: "Marques Brownlee", handle: "@mkbhd", niche: "Tech & Hardware", followers: "18.8M", engagement: "7.4%", avatar: "/creators/mkbhd.jpg" },
    { name: "Sara Dietschy", handle: "@saradietschy", niche: "Studio & Creative Tech", followers: "920K", engagement: "6.8%", avatar: "/creators/sara-dietschy.jpg" },
    { name: "Peter McKinnon", handle: "@petermckinnon", niche: "Cinematography & Photo", followers: "5.9M", engagement: "6.9%", avatar: "/creators/peter-mckinnon.jpg" },
    { name: "Ankur Warikoo", handle: "@ankurwarikoo", niche: "Finance & Startups", followers: "3.2M", engagement: "5.8%", avatar: "/creators/ankur-warikoo.webp" },
    { name: "Prajakta Koli", handle: "@mostlysane", niche: "Comedy & Storytelling", followers: "5.2M", engagement: "6.4%", avatar: "/creators/prajakta-koli.png" },
    { name: "Tanmay Bhat", handle: "@tanmaybhat", niche: "Fintech & Comedy", followers: "4.8M", engagement: "7.2%", avatar: "/creators/tanmay-bhat.png" },
  ];

  return (
    <section className="py-16 overflow-hidden bg-transparent relative select-none">
      {/* Side Vignette Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#08080C] via-[#08080C]/80 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#08080C] via-[#08080C]/80 to-transparent z-20 pointer-events-none" />

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
                className="flex items-center gap-3.5 px-5 py-3 rounded-2xl bg-[#101018] border border-white/10 hover:border-[#FFD21F]/40 transition-all shrink-0 w-[340px] sm:w-[380px] text-white"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#FFD21F] flex items-center justify-center font-bold text-xs font-mono shrink-0 shadow-xs">
                  {deal.brand[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="font-bold text-xs text-white truncate font-display">{deal.brand}</span>
                    <span suppressHydrationWarning className="font-mono text-xs font-extrabold text-[#FFD21F]">{format(deal.budgetAmount, "USD")}</span>
                  </div>
                  <p className="text-[11px] text-white/70 truncate font-sans">{deal.title}</p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border shrink-0 ${deal.color}`}>
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
                className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#101018] border border-white/10 hover:border-[#FFD21F]/40 transition-all shrink-0 w-[300px] sm:w-[340px] text-white"
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
                    <CheckCircle2 className="w-3 h-3 text-[#FFD21F] shrink-0" />
                  </div>
                  <span className="text-[10px] text-white/50 font-mono block">{creator.niche}</span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-extrabold text-white font-mono block">{creator.followers}</span>
                  <span className="text-[10px] text-[#FFD21F] font-mono font-bold">{creator.engagement} ER</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
