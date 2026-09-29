"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, Send, ShieldCheck, CheckCircle2 } from "lucide-react";

interface SignpostSlide {
  id: string;
  badge: string;
  headlinePrefix: string;
  highlightText: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  metricNumber: string;
  metricLabel: string;
}

const SLIDES: SignpostSlide[] = [
  {
    id: "brands",
    badge: "250+ DIRECT BRANDS",
    headlinePrefix: "Connect and collaborate with",
    highlightText: "250+ Brands",
    description:
      "Partner with leading Brands to earn commissions, pitch open campaign briefs, and unlock paid collaboration opportunities with zero agency middlemen.",
    ctaText: "Explore Brand Briefs",
    ctaLink: "/campaigns",
    metricNumber: "₹1.4 Cr+",
    metricLabel: "Pre-Funded Brand Budgets",
  },
  {
    id: "autodm",
    badge: "META GRAPH API PARTNER",
    headlinePrefix: "Turn Reel comments into deals with",
    highlightText: "Auto-DM in 3s",
    description:
      "When brands or followers comment 'COLLAB' or 'RATE' on your Instagram Reels, your audited media kit and rate card are delivered directly to their DMs in under 3 seconds.",
    ctaText: "Enable Auto-DM Engine",
    ctaLink: "/register?role=creator",
    metricNumber: "3.8x",
    metricLabel: "Higher Inbound Conversion",
  },
  {
    id: "escrow",
    badge: "100% ESCROW PROTECTION",
    headlinePrefix: "Never chase an invoice again with",
    highlightText: "Guaranteed Escrow",
    description:
      "Brands deposit campaign funds into safe escrow before you record a single second. Deliver the brief, get approved, and receive automated bank release in 24 hours.",
    ctaText: "Join with Escrow",
    ctaLink: "/register?role=creator",
    metricNumber: "100%",
    metricLabel: "Guaranteed Payout Rate",
  },
  {
    id: "mediakit",
    badge: "AUDITED LIVE STOREFRONT",
    headlinePrefix: "Replace outdated static PDFs with your",
    highlightText: "Live Media Kit",
    description:
      "Live verified reach, audited demographic breakdown, previous 4K brand deliverables, and 1-click booking with pre-funded escrow payments.",
    ctaText: "Build Verified Kit",
    ctaLink: "/register?role=creator",
    metricNumber: "591K+",
    metricLabel: "Audited Audience Reach",
  },
];

export function WishlinkSignpostShowcase() {
  const [currentIdx, setCurrentIdx] = useState(0);

  // Auto-paginate every 6 seconds if not manually interacted
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[currentIdx];

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % SLIDES.length);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] text-[#0F172A] relative overflow-hidden select-none font-sans border-t border-black/[0.06]">
      {/* Background Soft Atmospheric Emerald Glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-100/40 via-teal-100/30 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-[#34D399]/20 to-transparent rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[#0F766E] text-[11px] font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>TOP INDIAN DIRECT BRANDS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#0F172A] leading-[1.12]">
            Unlock the influence and <br className="hidden sm:inline" />
            <span className="text-[#0F172A]">maximize your earnings</span>
          </h2>
          <p className="text-sm sm:text-base text-[#475569] max-w-lg mx-auto">
            Everything content creators and high-growth brands need to scale transparent, milestone-protected partnerships.
          </p>
        </div>

        {/* 2-Column Showcase: Left 3D Signpost & Right Value Prop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ── LEFT: 3D Directional Brand Signpost (Matching Sample Image 1) ── */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center relative">
            <div
              className="relative w-full max-w-[420px] h-[480px] sm:h-[530px] flex items-center justify-center"
              style={{ perspective: 1000 }}
            >
              {/* Flight Path Dotted Loop with Paper Airplanes */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 420 520"
                fill="none"
              >
                <path
                  d="M 60 160 C 130 90, 310 90, 350 180 C 390 270, 290 320, 180 340 C 90 355, 60 410, 110 470"
                  stroke="#CBD5E1"
                  strokeWidth="2"
                  strokeDasharray="6 6"
                  className="opacity-70"
                />
                {/* Floating Dots on Orbit in Emerald Theme Colors */}
                <circle cx="280" cy="110" r="5" fill="#34D399" className="animate-pulse" />
                <circle cx="365" cy="220" r="6" fill="#0F766E" />
                <circle cx="130" cy="350" r="5" fill="#047857" />
                <circle cx="70" cy="220" r="6" fill="#34D399" />
                <circle cx="330" cy="360" r="4" fill="#0D9488" />
              </svg>

              {/* Floating Paper Airplane 1 (Emerald) */}
              <motion.div
                animate={{
                  x: [0, 8, 0],
                  y: [0, -6, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[160px] right-[40px] z-20 pointer-events-none drop-shadow-md"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12l20-9-9 20-3-8-8-3z" fill="#0F766E" opacity="0.9" />
                </svg>
              </motion.div>

              {/* Floating Paper Airplane 2 (Mint) */}
              <motion.div
                animate={{
                  x: [0, -6, 0],
                  y: [0, 8, 0],
                  rotate: [0, -4, 0],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[110px] left-[35px] z-20 pointer-events-none drop-shadow-md"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M2 12l20-9-9 20-3-8-8-3z" fill="#34D399" opacity="0.9" />
                </svg>
              </motion.div>

              {/* 3D Central Cylindrical Charcoal Pole */}
              <div className="absolute top-[50px] bottom-[30px] w-5 bg-gradient-to-r from-[#1E293B] via-[#475569] to-[#0F172A] rounded-full shadow-[inset_1px_0_2px_rgba(255,255,255,0.4),0_8px_16px_rgba(0,0,0,0.35)] z-0" />

              {/* Pole Top Decorative Finial Cap */}
              <div className="absolute top-[38px] w-7 h-7 rounded-full bg-gradient-to-tr from-[#0F766E] to-[#34D399] border-2 border-white shadow-lg z-10 flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-white shadow-xs" />
              </div>

              {/* 3D Signpost Base with Radial Shadow */}
              <div className="absolute bottom-[20px] w-28 h-5 bg-gradient-to-b from-[#334155] to-[#0F172A] rounded-full shadow-[0_12px_24px_rgba(0,0,0,0.4)] z-0 border-t border-white/20" />
              <div className="absolute bottom-[12px] w-40 h-3 bg-black/15 rounded-full blur-xs z-0" />

              {/* ── THE 3D DIRECTIONAL SIGNBOARDS ── */}
              <div className="relative z-10 w-full h-full flex flex-col justify-between py-10 pointer-events-none">
                {/* 1. Top Central Pill: 250+ Brands (Theme Emerald Gradient) */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  className="self-center px-6 py-2 rounded-2xl bg-gradient-to-r from-[#0F766E] to-[#047857] text-white font-extrabold text-xs sm:text-sm font-sans tracking-wide shadow-[0_10px_25px_rgba(15,118,110,0.35)] border-2 border-[#34D399] pointer-events-auto cursor-default ring-2 ring-white/30"
                >
                  250+ Brands
                </motion.div>

                {/* 2. Top-Right Sign: Littlebox (Midnight Slate + Mint Accent) */}
                <motion.div
                  whileHover={{ x: 6, rotate: 1 }}
                  className="self-end mr-6 sm:mr-10 px-6 py-2.5 rounded-2xl bg-[#0F172A] text-white font-bold text-xs sm:text-sm shadow-[0_10px_20px_rgba(15,23,42,0.25)] border-2 border-[#34D399]/60 pointer-events-auto flex items-center gap-1.5 transform translate-x-1 rotate-[2.5deg]"
                >
                  <span className="font-display font-black tracking-tight text-sm">littlebox</span>
                </motion.div>

                {/* 3. Upper-Left Sign: NEW ME (Deep Emerald) */}
                <motion.div
                  whileHover={{ x: -6, rotate: -1 }}
                  className="self-start ml-6 sm:ml-10 px-5 py-2.5 rounded-2xl bg-[#047857] text-white font-black text-xs sm:text-sm shadow-[0_10px_20px_rgba(4,120,87,0.25)] border-2 border-white/90 pointer-events-auto flex items-center gap-2 transform -rotate-[2.5deg]"
                >
                  <div className="w-5 h-5 rounded-full bg-[#34D399] flex items-center justify-center text-[10px] text-[#064E3B] font-bold">
                    🦎
                  </div>
                  <div className="text-left leading-none">
                    <span className="text-[9px] uppercase tracking-wider block font-bold text-[#A7F3D0]">NEW</span>
                    <span className="text-xs font-black block text-white">ME</span>
                  </div>
                </motion.div>

                {/* 4. Center-Right Sign: NYKAA (Teal Emerald) */}
                <motion.div
                  whileHover={{ x: 6, rotate: 1 }}
                  className="self-end mr-8 sm:mr-14 px-7 py-2.5 rounded-2xl bg-[#0F766E] text-[#E0F2FE] font-black text-xs sm:text-sm shadow-[0_10px_20px_rgba(15,118,110,0.25)] border-2 border-white/90 pointer-events-auto tracking-wider transform rotate-[2deg]"
                >
                  <span className="font-editorial italic font-normal text-base text-[#34D399]">NYKAA</span>
                </motion.div>

                {/* 5. Center-Left Sign: Flipkart (Crisp White + Midnight) */}
                <motion.div
                  whileHover={{ x: -6, rotate: -1 }}
                  className="self-start ml-4 sm:ml-8 px-6 py-2.5 rounded-2xl bg-white text-[#0F172A] font-black text-xs sm:text-sm shadow-[0_10px_20px_rgba(0,0,0,0.12)] border-2 border-[#0F766E]/40 pointer-events-auto flex items-center gap-1.5 transform -rotate-[2deg]"
                >
                  <span className="font-sans font-black tracking-tight text-sm">Flipkart</span>
                </motion.div>

                {/* 6. Lower-Right Sign: Myntra (Dark Slate + Mint Dot) */}
                <motion.div
                  whileHover={{ x: 6, rotate: 1 }}
                  className="self-end mr-10 sm:mr-16 px-6 py-2.5 rounded-2xl bg-[#1E293B] text-white font-bold text-xs sm:text-sm shadow-[0_10px_20px_rgba(30,41,59,0.25)] border-2 border-[#34D399]/70 pointer-events-auto flex items-center gap-2 transform rotate-[1.5deg]"
                >
                  <div className="w-4 h-4 rounded-full bg-[#34D399] flex items-center justify-center text-[9px] font-black text-[#0F172A]">
                    M
                  </div>
                  <span className="font-sans font-bold">Myntra</span>
                </motion.div>

                {/* 7. Bottom-Left Sign: Foxtale (Forest Teal) */}
                <motion.div
                  whileHover={{ x: -6, rotate: -1 }}
                  className="self-start ml-8 sm:ml-12 px-6 py-2.5 rounded-2xl bg-[#115E59] text-[#A7F3D0] font-serif italic text-xs sm:text-sm shadow-[0_10px_20px_rgba(17,94,89,0.25)] border-2 border-white/80 pointer-events-auto transform -rotate-[1.5deg]"
                >
                  foxtale
                </motion.div>
              </div>
            </div>

            {/* Pagination Indicators in Emerald Theme Colors */}
            <div className="flex items-center justify-center gap-2 mt-4">
              {SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIdx(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    currentIdx === idx
                      ? "w-7 h-2.5 bg-[#0F766E]"
                      : "w-2.5 h-2.5 bg-black/20 hover:bg-black/40"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: Value Proposition with Bold Highlight Pill & Controls ── */}
          <div className="lg:col-span-6 space-y-6 text-left lg:pl-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5"
              >
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[#0F766E] text-[11px] font-mono font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-[#0F766E]" />
                  <span>{slide.badge}</span>
                </div>

                {/* Headline with 3D Emerald Highlight Badge */}
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-[#0F172A] leading-[1.18]">
                  {slide.headlinePrefix}{" "}
                  <span className="inline-block bg-gradient-to-r from-[#0F766E] to-[#047857] text-white px-3.5 py-1 rounded-xl shadow-[0_4px_14px_rgba(15,118,110,0.3)] border border-[#34D399]/40">
                    {slide.highlightText}
                  </span>
                </h3>

                {/* Subtext description */}
                <p className="text-base sm:text-lg text-[#475569] font-sans leading-relaxed max-w-xl">
                  {slide.description}
                </p>

                {/* Key Metric Snapshot */}
                <div className="flex items-center gap-6 pt-2 pb-1">
                  <div className="space-y-0.5">
                    <p className="text-2xl sm:text-3xl font-black font-mono text-[#0F172A]">
                      {slide.metricNumber}
                    </p>
                    <p className="text-xs font-mono text-[#64748B] uppercase font-semibold">
                      {slide.metricLabel}
                    </p>
                  </div>
                  <div className="h-10 w-px bg-black/10" />
                  <div className="space-y-0.5">
                    <p className="text-2xl sm:text-3xl font-black font-mono text-[#0F766E]">
                      24h
                    </p>
                    <p className="text-xs font-mono text-[#64748B] uppercase font-semibold">
                      Automated SLA Release
                    </p>
                  </div>
                </div>

                {/* Action CTA & Navigation Arrow Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-3">
                  <Link
                    href={slide.ctaLink}
                    className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#0F766E] to-[#047857] hover:from-[#0D9488] hover:to-[#059669] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-[0_8px_24px_rgba(15,118,110,0.35)] transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95 border border-white/20"
                  >
                    <span>{slide.ctaText}</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </Link>

                  {/* Circular Navigation Buttons (< and >) */}
                  <div className="flex items-center gap-2.5 ml-auto sm:ml-0">
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="w-12 h-12 rounded-full border border-black/15 hover:border-black/30 bg-white hover:bg-[#F1F5F9] flex items-center justify-center text-[#0F172A] transition-all cursor-pointer shadow-xs active:scale-95"
                      aria-label="Previous value prop"
                    >
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      className="w-12 h-12 rounded-full border border-black/15 hover:border-black/30 bg-white hover:bg-[#F1F5F9] flex items-center justify-center text-[#0F172A] transition-all cursor-pointer shadow-xs active:scale-95"
                      aria-label="Next value prop"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
