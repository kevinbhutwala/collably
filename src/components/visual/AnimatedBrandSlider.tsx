"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Zap, ShieldCheck } from "lucide-react";

interface AnimatedBrandSliderProps {
  speed?: number;
  direction?: "left" | "right";
  className?: string;
}

const BRANDS = [
  { name: "TECH & AI", badge: "DEVELOPER TOOLS" },
  { name: "FASHION", badge: "EDITORIAL CONTENT" },
  { name: "FITNESS", badge: "WELLNESS CAMPAIGNS" },
  { name: "CONSUMER APPS", badge: "GROWTH MARKETING" },
  { name: "B2B SAAS", badge: "CREATOR PROGRAMS" },
  { name: "LUXURY GOODS", badge: "BRAND STORYTELLING" },
  { name: "PRODUCTIVITY", badge: "WORKFLOW CONTENT" },
  { name: "BEAUTY", badge: "SKINCARE CAMPAIGNS" },
];

export function AnimatedBrandSlider({
  speed = 28,
  direction = "left",
  className = "",
}: AnimatedBrandSliderProps) {
  const xTranslation = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <div className={`relative w-full overflow-hidden select-none py-6 border-y border-black/8 bg-[#FAF9F5] ${className}`}>
      {/* Subtle edge fades */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAF9F5] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAF9F5] to-transparent z-10" />

      <motion.div
        className="flex items-center gap-10 sm:gap-14 whitespace-nowrap w-fit font-display font-black text-sm sm:text-lg tracking-widest text-[#0A0A0E]/70"
        animate={{
          x: xTranslation,
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: speed,
        }}
      >
        {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((brand, idx) => (
          <div key={idx} className="flex items-center gap-4 shrink-0 group cursor-default">
            <span className="text-[#0A0A0E] group-hover:text-[#FFD21F] transition-colors font-mono tracking-widest">
              {brand.name}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white border border-black/8 text-[10px] font-mono font-bold text-[#6A6A78] tracking-normal">
              {brand.badge}
            </span>
            <span className="text-[#FFD21F] font-black text-xs">•</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
