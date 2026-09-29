"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";

const AVATAR_STRIP = [
  "/creators/prarthana.jpg",
  "/creators/kushi-hanamsagar.jpg",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
];

export function StreamlinedVisualCTA() {

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#07070B] text-[#0B0A14] dark:text-[#F4F4F8] select-none relative overflow-hidden border-t border-black/6 dark:border-white/10 font-sans">
      {/* Ambient Pulsing Gold Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] h-[350px] bg-primary/20 rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto text-center space-y-8 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAF9F5] dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-2xs">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-xs font-mono font-bold tracking-tight text-[#0B0A14] dark:text-white uppercase">
            SCALE YOUR CAMPAIGN
          </span>
        </div>

        {/* Clean Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display uppercase tracking-tight text-[#0B0A14] dark:text-white">
          Ready to scale your next{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#9333EA] to-accent">
            creator drop?
          </span>
        </h2>

        <p className="text-sm sm:text-base text-[#5A5A68] dark:text-[#8E8EA4] max-w-lg mx-auto leading-relaxed font-sans font-normal">
          Join 50,000+ creators and forward-thinking brands running 4K campaigns with 100% milestone escrow protection.
        </p>

        {/* Overlapping Mini Avatar Strip */}
        <div className="flex items-center justify-center -space-x-3 pt-2">
          {AVATAR_STRIP.map((url, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.15, zIndex: 10 }}
              className="w-12 h-12 rounded-full border-2 border-white dark:border-[#14141E] overflow-hidden shadow-sm bg-black shrink-0 relative transition-transform"
            >
              <SafeImage
                src={url}
                alt={`Creator ${i + 1}`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/register"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-primary via-[#9333EA] to-accent hover:from-accent hover:to-primary text-[#0B0A14] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(var(--theme-primary-rgb),0.5)] flex items-center justify-center gap-2 group active:scale-[0.98] border border-black/10 font-sans hover-lift"
          >
            <span>Launch Campaign Brief</span>
            <ArrowRight className="w-4 h-4 text-[#0B0A14] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link href="/register">
            <button className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-[#F8F8FC] dark:bg-[#14141E] dark:hover:bg-[#1E1E2C] border border-black/10 dark:border-white/10 text-[#0B0A14] dark:text-white font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-[0.98] flex items-center justify-center gap-2 hover-lift">
              <Sparkles className="w-4 h-4 text-[#0B0A14] dark:text-accent" />
              <span>Join as a Creator</span>
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
