"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Lock,
  Play,
  TrendingUp,
  Zap,
} from "lucide-react";
import { EDITORIAL_PORTRAITS } from "@/data/editorialPortraits";
import { formatCurrency } from "@/core/utils/currency";

export function HeroEditorialCollage() {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const kineticWords = ["CREATE.", "COLLABORATE.", "APPROVE.", "GET PAID."];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % kineticWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [kineticWords.length]);

  const maleHero = EDITORIAL_PORTRAITS.heroMaleMain;
  const femaleHero = EDITORIAL_PORTRAITS.heroFemaleMain;
  const supportingFemale = EDITORIAL_PORTRAITS.supportingFemale1;
  const supportingMale = EDITORIAL_PORTRAITS.supportingMale1;

  return (
    <section className="relative min-h-[92vh] lg:min-h-[105vh] bg-[#FFFFFF] border-b border-[#E6E6E8] overflow-hidden pt-6 pb-20 sm:pb-32 select-none text-[#08090C]">
      {/* ════════════════════════════════════════════════════════════════════
          OVERSIZED WATERMARK TYPOGRAPHY (Section 8: 15–25vw Layered Background)
          ════════════════════════════════════════════════════════════════════ */}
      <div className="absolute top-12 sm:top-6 inset-x-0 flex justify-center pointer-events-none z-0 opacity-[0.035] select-none overflow-hidden">
        <span className="text-[20vw] font-extrabold tracking-tighter leading-none font-display text-[#08090C]">
          COLLABLY
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12 lg:space-y-16">
        {/* ════════════════════════════════════════════════════════════════════
            TOP EDITORIAL HEADER & MINIMAL COPY (Section 14)
            ════════════════════════════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto space-y-4 pt-2 sm:pt-6">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EEF0FF] border border-[#C8CEFF] text-xs font-mono font-bold text-[#3047FF]">
            <span className="w-2 h-2 rounded-full bg-[#3047FF] animate-pulse" />
            <span>COLLABLY / CREATOR COMMERCE</span>
          </div>

          {/* Kinetic Editorial Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-[#08090C] tracking-tight leading-[1.04] font-display">
              Create great content. <br />
              <span className="font-serif italic font-normal text-[#1726C7]">
                Never chase an invoice.
              </span>
            </h1>

            {/* Dynamic Kinetic Word Loop (Section 9) */}
            <div className="h-10 sm:h-12 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWordIndex}
                  initial={{ y: 24, opacity: 0, letterSpacing: "-0.04em" }}
                  animate={{ y: 0, opacity: 1, letterSpacing: "0.02em" }}
                  exit={{ y: -24, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="font-mono text-xs sm:text-sm font-bold uppercase tracking-widest text-[#FF3B30] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30]" />
                  <span>OPERATING FLOW: {kineticWords[activeWordIndex]}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-[#6B7280] font-sans max-w-xl mx-auto leading-relaxed">
              One workspace for creators, campaigns, content and protected milestone payments.
            </p>
          </div>

          {/* Solid Action Buttons (Section 14 & 6) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/for-brands"
              className="w-full sm:w-auto px-8 py-3.5 rounded-[9px] bg-[#3047FF] hover:bg-[#1726C7] active:bg-[#0E1A9E] text-white font-semibold text-sm shadow-ultramarine-glow transition-all flex items-center justify-center gap-2 font-sans"
            >
              <span>Start a Campaign</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/creator/register"
              className="w-full sm:w-auto px-7 py-3.5 rounded-[9px] bg-[#FFFFFF] hover:bg-[#F6F7F9] border border-[#E6E6E8] text-[#08090C] font-semibold text-sm shadow-xs transition-all flex items-center justify-center gap-2 font-sans"
            >
              <span>Join as a Creator</span>
              <span className="text-[#3047FF] font-bold">→</span>
            </Link>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            HIGH-FASHION EDITORIAL COLLAGE COMPOSITION (Sections 2, 3, 4, 10, 11, 12)
            Controlled Chaos with Layered Portraits, Overlapping UI, and Brand Marks
            ════════════════════════════════════════════════════════════════════ */}
        <div className="relative w-full max-w-6xl mx-auto min-h-[580px] sm:min-h-[720px] lg:min-h-[820px] mt-8 select-none">
          {/* Background Ambient Shadow Ring */}
          <div className="absolute inset-x-8 top-12 bottom-12 rounded-3xl bg-gradient-to-b from-[#F6F7F9]/80 to-transparent border border-[#E6E6E8] pointer-events-none -z-10" />

          {/* ── 01. OVERSIZED EDITORIAL ARTWORK WORD "CREATE" (Intersects Behind Male Anchor) ── */}
          <div className="absolute top-2 sm:top-6 left-0 sm:left-4 z-0 pointer-events-none">
            <span className="text-6xl sm:text-8xl lg:text-9xl font-black text-[#08090C]/[0.08] tracking-tighter font-display leading-none">
              CREA
            </span>
          </div>

          {/* ── 02. MAIN HERO PORTRAIT: MALE ANCHOR (Marcus Vance, Close-Up, Aggressive Crop) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-10 sm:top-12 left-1/2 -translate-x-1/2 sm:-translate-x-28 lg:-translate-x-36 z-10 w-64 sm:w-80 lg:w-96 rounded-2xl overflow-hidden border border-[#E6E6E8] bg-[#08090C] shadow-editorial-lg group"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={maleHero.imageUrl}
                alt={maleHero.name}
                className="w-full h-full object-cover filter contrast-[1.12] brightness-[0.98] group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/80 via-transparent to-black/10 pointer-events-none" />

              {/* Editorial Caption Ribbon */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                <div>
                  <h3 className="font-bold font-sans text-sm">{maleHero.name}</h3>
                  <p className="text-[11px] text-white/70">@{maleHero.handle} • {maleHero.niche}</p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#3047FF] text-white text-[10px] font-bold">
                  TECH LEAD
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── 03. SECONDARY HERO PORTRAIT: FEMALE ANCHOR (Elena Rostova, Three-Quarter Crop) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:block absolute top-28 sm:top-24 right-4 lg:right-12 z-20 w-56 sm:w-72 lg:w-84 rounded-2xl overflow-hidden border border-[#E6E6E8] bg-[#FFFFFF] shadow-editorial"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <img
                src={femaleHero.imageUrl}
                alt={femaleHero.name}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090C]/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-mono">
                <span className="text-[10px] text-[#C8CEFF] uppercase font-bold block">EDITORIAL PARTNER</span>
                <h4 className="font-bold text-sm font-sans">{femaleHero.name}</h4>
              </div>
            </div>
          </motion.div>

          {/* ── 04. SUPPORTING PORTRAIT: INFRARED TINT FEMALE (Aanya Patel, Left Column) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute bottom-24 left-6 lg:left-10 z-20 w-44 lg:w-52 rounded-xl overflow-hidden border border-[#FFD0CC] bg-[#FFFFFF] shadow-editorial"
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <img
                src={supportingFemale.imageUrl}
                alt={supportingFemale.name}
                className="w-full h-full object-cover filter saturate-[1.1] contrast-[1.08]"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#FFF0EE] border border-[#FFD0CC] text-[#FF3B30] text-[9px] font-mono font-bold">
                {supportingFemale.category}
              </div>
            </div>
            <div className="p-2.5 bg-white border-t border-[#E6E6E8] text-[11px] font-mono flex items-center justify-between">
              <span className="font-bold text-[#08090C]">{supportingFemale.name}</span>
              <span className="text-[#FF3B30] font-bold">{supportingFemale.verifiedRate}</span>
            </div>
          </motion.div>

          {/* ── 05. OVERSIZED WORD "GET PAID." (Intersects In Front of Portraits) ── */}
          <div className="absolute bottom-4 sm:bottom-8 right-2 sm:right-8 z-30 pointer-events-none">
            <span className="text-5xl sm:text-7xl lg:text-9xl font-black text-[#08090C]/[0.09] tracking-tighter font-display leading-none">
              GET PAID.
            </span>
          </div>

          {/* ── 06. FLOATING REAL PRODUCT UI FRAGMENT: 98% MATCH CARD (Section 10) ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute top-4 sm:top-8 right-8 sm:right-28 lg:right-44 z-30 p-3 sm:p-4 rounded-xl bg-[#FFFFFF] border border-[#C8CEFF] shadow-editorial max-w-[200px] sm:max-w-[230px]"
          >
            <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-[#E6E6E8] text-xs font-mono">
              <span className="font-bold text-[#08090C] font-sans truncate">Elena Rostova</span>
              <span className="px-1.5 py-0.5 rounded bg-[#EEF0FF] text-[#3047FF] font-bold text-[10px]">
                98% MATCH
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-mono text-[#6B7280]">
              <div>
                <span>REACH</span>
                <p className="font-bold text-[#08090C] text-xs">485K</p>
              </div>
              <div>
                <span>ENGAGEMENT</span>
                <p className="font-bold text-[#3047FF] text-xs">6.4% ER</p>
              </div>
            </div>
          </motion.div>

          {/* ── 07. FLOATING REAL PRODUCT UI FRAGMENT: PAYMENT SETTLEMENT CARD (Section 10) ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="absolute bottom-16 sm:bottom-28 left-4 sm:left-1/2 sm:-translate-x-20 z-30 p-3.5 sm:p-4 rounded-xl bg-[#FFFFFF] border border-[#E6E6E8] shadow-editorial-lg min-w-[210px] sm:min-w-[250px]"
          >
            <div className="flex items-center justify-between gap-2 text-xs font-mono mb-1">
              <span className="text-[10px] text-[#6B7280] font-bold">SETTLEMENT DISBURSED</span>
              <span className="px-1.5 py-0.5 rounded bg-[#FFF0EE] text-[#FF3B30] text-[9px] font-bold">
                ✓ APPROVED
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-xl sm:text-2xl font-extrabold font-mono text-[#08090C]">
                ₹18,500
              </span>
              <span className="text-xs font-mono text-[#3047FF] font-bold">
                Direct to Bank
              </span>
            </div>
            <p className="text-[10px] text-[#6B7280] font-sans mt-1">
              Milestone Sign-Off via Stripe Connect
            </p>
          </motion.div>

          {/* ── 08. FLOATING CAMPAIGN TELEMETRY BADGE: TECH LAUNCH LIVE (Section 10) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="hidden sm:flex items-center gap-3 absolute top-64 left-2 sm:left-16 z-30 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#E6E6E8] shadow-editorial"
          >
            <div className="w-8 h-8 rounded-lg bg-[#EEF0FF] border border-[#C8CEFF] flex items-center justify-center text-[#3047FF] shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="font-mono text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-[#08090C] font-sans">TECH LAUNCH</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF3B30] animate-ping" />
              </div>
              <p className="text-[10px] text-[#6B7280]">12 Creators • ₹2,50,000 LIVE</p>
            </div>
          </motion.div>

          {/* ── 09. FICTIONAL EDITORIAL BRAND PARTNER LABELS (Section 11) ── */}
          <div className="absolute top-1/2 left-0 -translate-y-1/2 hidden lg:flex flex-col gap-3 font-mono text-[10px] text-[#6B7280] z-20">
            <span className="px-2.5 py-1 rounded-md bg-[#FFFFFF] border border-[#E6E6E8] font-bold text-[#08090C] tracking-widest shadow-xs">
              VERTEX / STUDIO
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#FFFFFF] border border-[#E6E6E8] font-bold text-[#08090C] tracking-widest shadow-xs">
              NOVA LABS
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#FFFFFF] border border-[#E6E6E8] font-bold text-[#08090C] tracking-widest shadow-xs">
              NORTH FORM
            </span>
          </div>

          <div className="absolute top-1/3 right-2 hidden xl:flex flex-col gap-2 font-mono text-[10px] text-[#6B7280] z-20">
            <span className="px-2 py-0.5 rounded bg-[#EEF0FF] text-[#3047FF] font-bold">
              CREATOR × BRAND NETWORK
            </span>
            <span className="px-2 py-0.5 rounded bg-[#FFF0EE] text-[#FF3B30] font-bold">
              100% PRE-FUNDED ESCROW
            </span>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            EDITORIAL TRUST RAIL (Section 11 & 14)
            ════════════════════════════════════════════════════════════════════ */}
        <div className="pt-4 sm:pt-6 border-t border-[#E6E6E8] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#6B7280]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#3047FF]" />
            <span className="text-[#08090C] font-semibold">100% Milestone Protection</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF3B30]" />
            <span className="text-[#08090C] font-semibold">&lt; 24h Automated Creator Payouts</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#3047FF]" />
            <span className="text-[#08090C] font-semibold">10% Flat Take-Rate (90% Creator Net)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
