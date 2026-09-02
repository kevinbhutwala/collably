"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Flame,
  CheckCircle2,
  Play,
  Users,
  Zap,
  Lock,
  Star,
  Check,
} from "lucide-react";
import { InteractiveTiltCard } from "@/components/ui/InteractiveTiltCard";
import { Modal } from "@/components/ui/Modal";
import { SafeImage } from "@/components/ui/SafeImage";

interface HeroTalent {
  id: string;
  name: string;
  handle: string;
  niche: string;
  reach: string;
  startingPrice: string;
  matchScore: string;
  portrait: string;
  bRollPreview: string;
  specs: string;
  badgeText: string;
  verifiedSponsor: string;
}

const HERO_TALENT: HeroTalent[] = [
  {
    id: "elena",
    name: "Elena Rostova",
    handle: "@elenarostova",
    niche: "AI & Consumer Tech",
    reach: "485K Reach",
    startingPrice: "$3,500",
    matchScore: "99.4%",
    portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=85",
    bRollPreview: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80",
    specs: "RED V-Raptor 8K • 60fps",
    badgeText: "4K Master Reel",
    verifiedSponsor: "Nvidia & Linear",
  },
  {
    id: "marcus",
    name: "Marcus Vance",
    handle: "@marcusvisuals",
    niche: "Luxury & Haute Couture",
    reach: "620K Reach",
    startingPrice: "$4,200",
    matchScore: "98.7%",
    portrait: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&auto=format&fit=crop&q=85",
    bRollPreview: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=80",
    specs: "ARRI Alexa Mini • ProRes 4444",
    badgeText: "Milan Lookbook",
    verifiedSponsor: "Prada & Balenciaga",
  },
  {
    id: "sofia",
    name: "Sofia Chen",
    handle: "@sofiabio",
    niche: "Biohacking & Movement",
    reach: "390K Reach",
    startingPrice: "$2,800",
    matchScore: "99.1%",
    portrait: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=85",
    bRollPreview: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&auto=format&fit=crop&q=80",
    specs: "Sony FX3 • S-Log3 ProRes",
    badgeText: "Kinetic Reel",
    verifiedSponsor: "Whoop & Gymshark",
  },
];

export function HeroEditorialShowcase() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const activeTalent = HERO_TALENT[activeIdx];

  return (
    <section className="relative min-h-[90vh] sm:min-h-[92vh] bg-white text-[#0A0A0E] flex flex-col justify-between pt-20 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none font-sans">
      {/* Background Solar Flare with Gentle Breathing Cycle */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.45, 0.25],
        }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] sm:w-[950px] h-[400px] bg-gradient-to-b from-[#FFD21F]/25 via-[#FFD21F]/8 to-transparent rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center my-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 items-center">
          {/* ══════════════════════════════════════════════════════════════════════
              LEFT: POWERFUL EDITORIAL VALUE PROPOSITION (Answers all 4 user questions)
              ══════════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6 text-left"
          >
            {/* Live Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] border border-black/8 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-tight text-[#0A0A0E]">
                COLLABLY • THE CREATOR × BRAND COMMERCE PLATFORM
              </span>
            </div>

            {/* Confident Large Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-[#0A0A0E] leading-[1.02]">
              WHERE VISIONARY BRANDS MEET{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700]">
                CINEMATIC
              </span>{" "}
              CREATORS.
            </h1>

            {/* Short, clear value statement */}
            <p className="text-sm sm:text-base text-[#5A5A68] max-w-lg leading-relaxed font-sans font-normal">
              Direct access to 50,000+ audited creator media kits, frame-accurate 4K timestamped review, and 100% pre-funded milestone escrow custody. Zero unpaid invoices. Zero ghosting.
            </p>

            {/* Action Buttons (Dominant Primary CTA + Clean Secondary) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => setRoleModalOpen(true)}
                className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(255,210,31,0.5)] flex items-center justify-center gap-2 group active:scale-[0.98] border border-black/10 font-sans hover-lift"
              >
                <span>Launch Campaign Brief</span>
                <ArrowRight className="w-4 h-4 text-[#0A0A0E] group-hover:translate-x-1 transition-transform" />
              </button>

              <Link href="/creators" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-[#F8F8FC] border border-black/10 text-[#0A0A0E] font-bold text-xs sm:text-sm transition-all shadow-xs active:scale-[0.98] flex items-center justify-center gap-2 hover-lift">
                  <Users className="w-4 h-4 text-[#8A7000]" />
                  <span>Explore Creator Roster</span>
                </button>
              </Link>
            </div>

            {/* Proof Micro Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-black/6 text-xs font-mono text-[#5A5A68]">
              <div className="flex items-center gap-1.5 font-bold text-[#0A0A0E]">
                <ShieldCheck className="w-4 h-4 text-[#087F5B]" />
                <span>$14.8M Escrow Vaults</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 font-bold text-[#0A0A0E]">
                <Zap className="w-4 h-4 text-[#FFD21F]" />
                <span>&lt; 2h Instant Payout SLA</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 font-bold text-[#0A0A0E]">
                <Star className="w-4 h-4 text-[#FFD21F] fill-[#FFD21F]" />
                <span>99.4% On-Time QA Rate</span>
              </div>
            </div>
          </motion.div>

          {/* ══════════════════════════════════════════════════════════════════════
              RIGHT: HIGH-FASHION OVERLAPPING MEDIA STAGE WITH 3D TILT
              ══════════════════════════════════════════════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex flex-col items-center"
          >
            {/* Top Selector Chips */}
            <div className="flex items-center gap-2 mb-4 bg-[#F4F4F8] p-1.5 rounded-full border border-black/6 shadow-xs z-20">
              {HERO_TALENT.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveIdx(i)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold transition-all flex items-center gap-1.5 ${
                    activeIdx === i
                      ? "bg-white text-[#0A0A0E] shadow-sm border border-black/8"
                      : "text-[#6A6A78] hover:text-[#0A0A0E]"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeIdx === i ? "bg-[#FFD21F]" : "bg-black/20"
                    }`}
                  />
                  <span>{t.name.split(" ")[0]}</span>
                </button>
              ))}
            </div>

            {/* Main Interactive Overlapping Portrait Card with 3D Tilt */}
            <InteractiveTiltCard
              maxTilt={9}
              glowColor="rgba(255, 210, 31, 0.32)"
              className="relative w-full max-w-[360px] sm:max-w-[430px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white shadow-[0_20px_60px_rgba(0,0,0,0.14)] bg-[#0A0A0E] group"
            >
              {/* Primary Background Portrait */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTalent.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <SafeImage
                    src={activeTalent.portrait}
                    alt={activeTalent.name}
                    width={900}
                    height={1125}
                    className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Top AI Match Badge */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center gap-1.5 text-xs font-mono font-bold text-[#0A0A0E]"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
                <span>{activeTalent.matchScore} AI Match</span>
              </motion.div>

              {/* Top Right Live Reach Badge */}
              <div className="absolute top-4 right-4 z-20 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-mono font-semibold text-white flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#FFD21F]" />
                <span>{activeTalent.reach}</span>
              </div>

              {/* 🌟 OVERLAPPING FLOATING 4K VIDEO ASSET CARD */}
              <motion.div
                whileHover={{ scale: 1.08, rotate: 2 }}
                className="absolute bottom-20 right-4 z-20 w-24 sm:w-28 aspect-video rounded-2xl overflow-hidden border-2 border-white shadow-[0_12px_30px_rgba(0,0,0,0.45)] bg-black"
              >
                <SafeImage
                  src={activeTalent.bRollPreview}
                  alt={activeTalent.badgeText}
                  width={200}
                  height={112}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                  <Play className="w-4 h-4 text-white fill-white opacity-90" />
                </div>
                <span className="absolute bottom-1 inset-x-1 text-[8px] font-mono font-bold text-white text-center truncate bg-black/70 rounded px-0.5">
                  {activeTalent.badgeText}
                </span>
              </motion.div>

              {/* Bottom Glass Identity Bar */}
              <div className="absolute bottom-4 inset-x-4 z-20 p-4 rounded-2xl bg-white/95 backdrop-blur-xl border border-black/8 shadow-xl space-y-2 text-[#0A0A0E]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-sm font-bold font-display">{activeTalent.name}</h3>
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#087F5B]" />
                    </div>
                    <p className="text-[11px] text-[#6A6A78] font-sans">{activeTalent.niche}</p>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-[10px] text-[#888898] block uppercase">Starts at</span>
                    <span className="text-xs font-extrabold text-[#0A0A0E]">{activeTalent.startingPrice}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-black/6 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#5A5A68] truncate max-w-[180px]">{activeTalent.specs}</span>
                  <Link
                    href="/creators"
                    className="text-xs font-bold text-[#0A0A0E] hover:text-[#8A7000] flex items-center gap-0.5 shrink-0 transition-colors"
                  >
                    <span>View Deck</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </InteractiveTiltCard>
          </motion.div>
        </div>
      </div>

      {/* Role Selection Modal */}
      <Modal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        title="Join Collably Commerce"
        description="Select your pathway to start hiring creators or showcase your verified portfolio."
        maxWidth="md"
      >
        <div className="space-y-3 pt-2 text-[#0A0A0E] select-none font-sans">
          <Link
            href="/brand/register"
            onClick={() => setRoleModalOpen(false)}
            className="w-full text-left p-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#FFD21F] hover:shadow-md transition-all group flex items-center justify-between block hover-lift"
          >
            <div>
              <h4 className="text-sm font-bold font-display">I am a Brand / Business</h4>
              <p className="text-xs text-[#6A6A78]">Post briefs, hire creators &amp; escrow funds safely</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#0A0A0E] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/creator/register"
            onClick={() => setRoleModalOpen(false)}
            className="w-full text-left p-4 rounded-2xl bg-[#FAFAFC] border border-black/10 hover:border-black/20 hover:bg-white hover:shadow-md transition-all group flex items-center justify-between block hover-lift"
          >
            <div>
              <h4 className="text-sm font-bold font-display">I am a Content Creator</h4>
              <p className="text-xs text-[#6A6A78]">Publish media kit, receive inbound deals &amp; get paid</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#0A0A0E] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Modal>
    </section>
  );
}
