"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, CheckCircle2, ChevronRight } from "lucide-react";

export function ExactHeroSection() {
  return (
    <section className="relative min-h-[92vh] lg:min-h-[96vh] bg-[#07070B] text-white overflow-hidden pt-8 pb-16 sm:pb-20 select-none">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none -z-0" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[130px] pointer-events-none -z-0" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center min-h-[75vh]">
          {/* ══════════════════════════════════════════════════════════════════════
              LEFT: MASSIVE EDITORIAL HEADLINE & VALUE PROP
              ══════════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.18em] text-white/60 uppercase">
                THE CREATOR × BRAND COLLABORATION PLATFORM
              </span>
            </div>

            {/* Giant 3-Line Headline */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-[0.95] text-white font-display">
                CREATE
              </h1>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-normal tracking-tight leading-[0.95] text-white/95 font-serif italic">
                COLLABORATE
              </h2>
              <div className="relative inline-block">
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight uppercase leading-[0.95] text-white font-display">
                  GET PAID.
                </h1>
                {/* Electric Blue Brush Swoosh Underline */}
                <svg
                  className="absolute -bottom-3 left-0 w-full h-4 overflow-visible pointer-events-none"
                  viewBox="0 0 300 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M 5,14 Q 90,6 170,10 Q 240,14 295,6"
                    stroke="#2F6BFF"
                    strokeWidth="5"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_12px_rgba(47,107,255,0.8)]"
                  />
                </svg>
              </div>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-white/70 font-sans max-w-md leading-relaxed pt-2">
              Work with top creators, run high-impact campaigns, and get paid — all in one place.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link href="/for-brands">
                <button className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#2A5CFF] to-[#3B73FF] hover:from-[#234FE6] hover:to-[#3264E6] text-white font-semibold text-xs sm:text-sm transition-all shadow-[0_0_25px_rgba(42,92,255,0.45)] hover:shadow-[0_0_35px_rgba(42,92,255,0.65)] flex items-center gap-2 group active:scale-[0.98]">
                  <span>Start a Campaign</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </Link>

              <Link href="/creator/register">
                <button className="px-6 py-3.5 rounded-full bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 text-white font-semibold text-xs sm:text-sm transition-all shadow-xs active:scale-[0.98]">
                  <span>Join as a Creator</span>
                </button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3.5 pt-4">
              <div className="flex -space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Creator 1"
                  className="w-8 h-8 rounded-full border-2 border-[#07070B] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                  alt="Creator 2"
                  className="w-8 h-8 rounded-full border-2 border-[#07070B] object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                  alt="Creator 3"
                  className="w-8 h-8 rounded-full border-2 border-[#07070B] object-cover"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-white font-sans">50,000+</p>
                <p className="text-[11px] text-white/50 font-sans">Verified Creators</p>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════════════════
              RIGHT: LAYERED EDITORIAL CINEMATIC PORTRAITS + FLOATING GLASS UI
              ══════════════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-6 relative min-h-[460px] sm:min-h-[580px] flex items-center justify-center">
            {/* Chrome Ring Halo Graphic Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[480px] h-[340px] sm:h-[480px] rounded-full border border-white/10 pointer-events-none -z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[400px] h-[280px] sm:h-[400px] rounded-full border border-blue-500/20 pointer-events-none -z-0" />

            {/* 1. Main Female Portrait with Sunglasses & Ambient Sun Halo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 w-60 sm:w-72 md:w-80 rounded-3xl overflow-hidden border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.8)] -translate-x-6 sm:-translate-x-12"
            >
              <div className="aspect-[3/4] w-full relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=85"
                  alt="High Fashion Creator"
                  className="w-full h-full object-cover filter contrast-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070B]/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* 2. Secondary Male Creator Portrait with Blue Rim Lighting */}
            <motion.div
              initial={{ opacity: 0, x: 30, y: 30 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="absolute z-20 top-6 right-2 sm:right-6 w-44 sm:w-56 rounded-2xl overflow-hidden border border-white/20 shadow-2xl"
            >
              <div className="aspect-[4/5] w-full relative">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=85"
                  alt="Tech Creator"
                  className="w-full h-full object-cover filter contrast-115 brightness-95"
                />
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-color pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07070B]/90 via-transparent to-transparent pointer-events-none" />
              </div>
            </motion.div>

            {/* 3. Small Vertical Red-Tinted Video Card (Far Right) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="hidden sm:block absolute z-30 bottom-8 right-0 w-36 sm:w-40 rounded-2xl overflow-hidden border border-white/20 bg-[#0F0D12] shadow-2xl p-2 space-y-2"
            >
              <div className="aspect-[4/5] w-full rounded-xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=85"
                  alt="Creator Reel"
                  className="w-full h-full object-cover filter contrast-125"
                />
                <div className="absolute inset-0 bg-red-600/30 mix-blend-color pointer-events-none" />
                <div className="absolute bottom-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white">
                  <Play className="w-3 h-3 fill-white" />
                </div>
              </div>
              <div className="px-1 text-[9px] font-sans text-white/80 leading-tight">
                <p>Real people.</p>
                <p>Real content.</p>
                <p className="text-white font-bold">Real results.</p>
              </div>
            </motion.div>

            {/* 4. Floating Glass Card: Nike Fashion Campaign $25,000 Live */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -top-4 right-6 sm:right-16 z-30 px-4 py-3 rounded-2xl bg-[#111116]/80 backdrop-blur-xl border border-white/15 shadow-2xl flex items-center gap-3 min-w-[200px]"
            >
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-black font-black text-xs shrink-0">
                <span>✓</span>
              </div>
              <div className="flex-1 min-w-0 font-sans">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-white truncate">Nike</h4>
                  <span className="px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-bold">
                    Live
                  </span>
                </div>
                <p className="text-[10px] text-white/50">Fashion Campaign</p>
                <p className="text-xs font-bold text-white font-mono mt-0.5">$25,000</p>
              </div>
            </motion.div>

            {/* 5. Floating Glass Card: Campaign Match 98% */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute bottom-6 left-2 sm:left-6 z-30 px-4 py-2.5 rounded-2xl bg-[#111116]/85 backdrop-blur-xl border border-white/15 shadow-2xl flex items-center gap-3"
            >
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono text-white/60 block">Campaign Match</span>
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-1.5">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=50&auto=format&fit=crop&q=80"
                      className="w-5 h-5 rounded-full border border-black object-cover"
                    />
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&auto=format&fit=crop&q=80"
                      className="w-5 h-5 rounded-full border border-black object-cover"
                    />
                  </div>
                  <span className="text-sm font-bold text-white font-mono">98%</span>
                </div>
              </div>
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-white/80">
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            BOTTOM BRAND LOGOS MARQUEE BAR
            ══════════════════════════════════════════════════════════════════════ */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-6 text-xs text-white/40 font-mono">
          <div className="flex flex-wrap items-center gap-6 sm:gap-10 text-white/70 font-display font-bold text-sm tracking-wider">
            <span className="hover:text-white transition-colors">NIKE</span>
            <span className="hover:text-white transition-colors">ADIDAS</span>
            <span className="hover:text-white transition-colors">SPOTIFY</span>
            <span className="hover:text-white transition-colors">YOUTUBE</span>
            <span className="hover:text-white transition-colors">APPLE</span>
            <span className="hover:text-white transition-colors">L&apos;ORÉAL</span>
            <span className="hover:text-white transition-colors">SAMSUNG</span>
            <span className="hover:text-white transition-colors">COCA-COLA</span>
          </div>

          <Link href="/for-brands" className="text-white/60 hover:text-white transition-colors flex items-center gap-1 font-sans text-xs">
            <span>TRUSTED BY GLOBAL BRANDS</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
