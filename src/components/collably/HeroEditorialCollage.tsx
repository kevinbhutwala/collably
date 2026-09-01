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
  Zap,
} from "lucide-react";
import { EDITORIAL_PORTRAITS } from "@/data/editorialPortraits";

export function HeroEditorialCollage() {
  const [activeWordIndex, setActiveWordIndex] = useState(0);
  const kineticWords = [
    { text: "CREATE", accent: "text-[#101010]" },
    { text: "COLLABORATE", accent: "text-[#3047FF]" },
    { text: "APPROVE", accent: "text-[#101010]" },
    { text: "GET PAID", accent: "text-[#FF3B30]" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveWordIndex((prev) => (prev + 1) % kineticWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [kineticWords.length]);

  const maleHero = EDITORIAL_PORTRAITS.heroMaleMain;
  const femaleHero = EDITORIAL_PORTRAITS.heroFemaleMain;
  const supportingFemale = EDITORIAL_PORTRAITS.supportingFemale1;

  return (
    <section className="relative min-h-[90vh] lg:min-h-[100vh] bg-[#FAFAF8] border-b border-[#E7E7E4] overflow-hidden pt-6 pb-20 sm:pb-32 select-none text-[#101010]">
      {/* ════════════════════════════════════════════════════════════════════
          OVERSIZED WATERMARK TYPOGRAPHY
          ════════════════════════════════════════════════════════════════════ */}
      <div className="absolute top-6 sm:top-0 inset-x-0 flex justify-center pointer-events-none z-0 opacity-[0.03] select-none overflow-hidden font-display">
        <span className="text-[20vw] font-black tracking-tighter leading-none text-[#101010]">
          COLLABLY
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10 lg:space-y-12">
        {/* ════════════════════════════════════════════════════════════════════
            TOP EDITORIAL HEADER & CLEAN LUXURY HEADLINE
            ════════════════════════════════════════════════════════════════════ */}
        <div className="text-center max-w-4xl mx-auto space-y-6 pt-2 sm:pt-4">
          {/* Micro Label Eyebrow: 11px uppercase tracking */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-[11px] font-sans font-semibold uppercase tracking-[0.08em] text-[#101010] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C] animate-pulse" />
            <span>CREATOR × BRAND COLLABORATION PLATFORM</span>
          </div>

          {/* Harmonious Hero Headline */}
          <div className="space-y-4">
            <h1 className="hero-headline">
              Create great content. <br className="hidden sm:inline" />
              <span className="font-serif italic font-normal text-[#626262]">
                Without the chaos.
              </span>
            </h1>

            {/* Kinetic Stage Word Loop */}
            <div className="h-10 sm:h-12 flex items-center justify-center overflow-hidden pt-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWordIndex}
                  initial={{ y: 20, opacity: 0, filter: "blur(3px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -20, opacity: 0, filter: "blur(3px)" }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="font-mono text-xs sm:text-sm font-bold uppercase tracking-wider text-[#101010] flex items-center gap-2 bg-[#B7FF3C] px-4 py-1.5 rounded-lg shadow-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#101010]" />
                  <span>
                    STAGE: <strong className={kineticWords[activeWordIndex].accent}>{kineticWords[activeWordIndex].text}</strong>
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Clean Body Text */}
            <p className="editorial-body mx-auto text-center font-normal">
              One unified workspace for vetted creator discovery, brief management, 4K frame-accurate review, and protected milestone settlements.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2 font-sans font-semibold text-sm">
            <Link
              href="/for-brands"
              className="w-full sm:w-auto px-8 py-3.5 rounded-[9px] bg-[#101010] hover:bg-[#262626] active:bg-[#000000] text-[#FAFAF8] shadow-xs transition-all flex items-center justify-center gap-2 group tracking-tight"
            >
              <span>Start a Campaign</span>
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C] group-hover:scale-125 transition-transform" />
            </Link>

            <Link
              href="/creator/register"
              className="w-full sm:w-auto px-7 py-3.5 rounded-[9px] bg-[#FFFFFF] hover:bg-[#F4F4F0] border border-[#E7E7E4] text-[#101010] shadow-xs transition-all flex items-center justify-center gap-2 tracking-tight"
            >
              <span>Join as a Creator</span>
              <ArrowRight className="w-4 h-4 text-[#101010]" />
            </Link>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            HIGH-FASHION EDITORIAL COLLAGE COMPOSITION
            ════════════════════════════════════════════════════════════════════ */}
        <div className="relative w-full max-w-6xl mx-auto min-h-[560px] sm:min-h-[700px] lg:min-h-[800px] mt-6 select-none">
          {/* Background Ambient Surface */}
          <div className="absolute inset-x-6 top-8 bottom-8 rounded-3xl bg-[#FFFFFF] border border-[#E7E7E4] pointer-events-none -z-10 shadow-xs" />

          {/* ── 01. MAIN HERO PORTRAIT: MALE ANCHOR (Marcus Vance) ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-8 sm:top-10 left-1/2 -translate-x-1/2 sm:-translate-x-28 lg:-translate-x-36 z-10 w-64 sm:w-80 lg:w-96 rounded-2xl overflow-hidden border border-[#E7E7E4] bg-[#101010] shadow-editorial-lg group"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={maleHero.imageUrl}
                alt={maleHero.name}
                className="w-full h-full object-cover filter contrast-[1.12] brightness-[0.98] group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/90 via-transparent to-black/10 pointer-events-none" />

              {/* Caption Ribbon */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                <div>
                  <h3 className="font-display font-bold text-sm text-[#FAFAF8]">{maleHero.name}</h3>
                  <p className="text-[11px] text-white/70 font-sans">@{maleHero.handle} • {maleHero.niche}</p>
                </div>
                <span className="px-2 py-0.5 rounded-md bg-[#B7FF3C] text-[#101010] text-[10px] font-bold">
                  TECH LEAD
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── 02. SECONDARY HERO PORTRAIT: FEMALE ANCHOR (Elena Rostova) ── */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 30 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hidden sm:block absolute top-24 sm:top-20 right-4 lg:right-12 z-20 w-56 sm:w-72 lg:w-84 rounded-2xl overflow-hidden border border-[#E7E7E4] bg-[#FFFFFF] shadow-editorial"
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <img
                src={femaleHero.imageUrl}
                alt={femaleHero.name}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101010]/85 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 text-[#FAFAF8] text-xs font-mono">
                <span className="text-[10px] text-[#B7FF3C] uppercase font-bold block">PARTNER</span>
                <h4 className="font-display font-bold text-sm">{femaleHero.name}</h4>
              </div>
            </div>
          </motion.div>

          {/* ── 03. SUPPORTING PORTRAIT: FEMALE HALF-BODY (Aanya Patel) ── */}
          <motion.div
            initial={{ opacity: 0, x: -30, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hidden md:block absolute bottom-20 left-6 lg:left-10 z-20 w-44 lg:w-52 rounded-xl overflow-hidden border border-[#E7E7E4] bg-[#FFFFFF] shadow-editorial"
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <img
                src={supportingFemale.imageUrl}
                alt={supportingFemale.name}
                className="w-full h-full object-cover filter contrast-[1.08]"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#101010] text-[#B7FF3C] text-[9px] font-mono font-bold">
                {supportingFemale.category}
              </div>
            </div>
            <div className="p-2.5 bg-white border-t border-[#E7E7E4] text-[11px] font-mono flex items-center justify-between">
              <span className="font-display font-bold text-[#101010]">{supportingFemale.name}</span>
              <span className="text-[#101010] font-bold numeric-tabular">{supportingFemale.verifiedRate}</span>
            </div>
          </motion.div>

          {/* ── 04. FLOATING REAL PRODUCT UI: 98% MATCH CARD with #B7FF3C ── */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="absolute top-4 sm:top-6 right-8 sm:right-28 lg:right-44 z-30 p-3 sm:p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-editorial max-w-[200px] sm:max-w-[230px]"
          >
            <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-[#E7E7E4] text-xs font-mono">
              <span className="font-display font-bold text-[#101010] truncate">Elena Rostova</span>
              <span className="px-1.5 py-0.5 rounded bg-[#B7FF3C] text-[#101010] font-bold text-[10px]">
                98% MATCH
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] font-mono text-[#626262]">
              <div>
                <span className="tracking-wider">REACH</span>
                <p className="font-bold text-[#101010] text-xs numeric-tabular">485K</p>
              </div>
              <div>
                <span className="tracking-wider">ENGAGEMENT</span>
                <p className="font-bold text-[#101010] text-xs numeric-tabular">6.4% ER</p>
              </div>
            </div>
          </motion.div>

          {/* ── 05. FLOATING PRODUCT UI: SETTLEMENT CARD ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.4 }}
            className="absolute bottom-12 sm:bottom-24 left-4 sm:left-1/2 sm:-translate-x-20 z-30 p-3.5 sm:p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-editorial-lg min-w-[210px] sm:min-w-[250px]"
          >
            <div className="flex items-center justify-between gap-2 text-xs font-mono mb-1">
              <span className="text-[10px] text-[#626262] font-bold uppercase tracking-wider">SETTLEMENT DISBURSED</span>
              <span className="px-1.5 py-0.5 rounded bg-[#101010] text-[#B7FF3C] text-[9px] font-bold">
                ✓ APPROVED
              </span>
            </div>
            <div className="flex items-baseline justify-between font-display">
              <span className="text-xl sm:text-2xl font-black font-mono text-[#101010] numeric-tabular">
                ₹18,500
              </span>
              <span className="text-xs font-mono text-[#626262] font-bold">
                Direct to Bank
              </span>
            </div>
            <p className="text-[10px] text-[#626262] mt-1 font-sans font-medium">
              Milestone Sign-Off via Stripe Connect
            </p>
          </motion.div>

          {/* ── 06. FLOATING CAMPAIGN TELEMETRY BADGE ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="hidden sm:flex items-center gap-3 absolute top-60 left-2 sm:left-16 z-30 px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-editorial"
          >
            <div className="w-8 h-8 rounded-lg bg-[#101010] text-[#B7FF3C] flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4" />
            </div>
            <div className="font-mono text-xs">
              <div className="flex items-center gap-1.5">
                <span className="font-display font-bold text-[#101010]">TECH LAUNCH</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#3047FF] animate-ping" />
              </div>
              <p className="text-[10px] text-[#626262] font-sans">12 Creators • <strong className="text-[#101010] numeric-tabular">₹2,50,000</strong> LIVE</p>
            </div>
          </motion.div>
        </div>

        {/* ════════════════════════════════════════════════════════════════════
            TRUST RAIL
            ════════════════════════════════════════════════════════════════════ */}
        <div className="pt-4 sm:pt-6 border-t border-[#E7E7E4] flex flex-wrap items-center justify-between gap-4 text-xs font-sans text-[#626262]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
            <span className="text-[#101010] font-semibold">100% Milestone Protection</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#101010]" />
            <span className="text-[#101010] font-semibold">&lt; 24h Automated Creator Payouts</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#101010]" />
            <span className="text-[#101010] font-semibold">10% Flat Take-Rate (90% Creator Net)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
