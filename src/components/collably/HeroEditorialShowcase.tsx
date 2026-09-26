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
import { TitleIcon } from "@/components/ui/TitleIconBadge";
import { useGlobalCurrency } from "@/context/CurrencyContext";
import { cn } from "@/lib/utils";

interface HeroTalent {
  id: string;
  name: string;
  handle: string;
  niche: string;
  reach: string;
  startingPrice: string;
  startingPriceAmount: number;
  matchScore: string;
  portrait: string;
  bRollPreview: string;
  specs: string;
  badgeText: string;
  verifiedSponsor: string;
}

const HERO_TALENT: HeroTalent[] = [
  {
    id: "prarthaana",
    name: "Prarthana",
    handle: "@prarthaana.04",
    niche: "Fashion, Travel & Aesthetic Lifestyle",
    reach: "30K Followers",
    startingPrice: "$450",
    startingPriceAmount: 450,
    matchScore: "India Creator 🇮🇳",
    portrait: "/creators/prarthana.jpg",
    bRollPreview: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=80",
    specs: "4K Master Styling • Color Graded",
    badgeText: "Editorial Reel",
    verifiedSponsor: "Fashion & Style",
  },
  {
    id: "kushihanamsagar",
    name: "Kushi Hanamsagar",
    handle: "@kushihanamsagar9",
    niche: "Visual Storytelling & Lifestyle Moments",
    reach: "869 Followers",
    startingPrice: "$150",
    startingPriceAmount: 150,
    matchScore: "India Creator 🇮🇳",
    portrait: "/creators/kushi-hanamsagar.jpg",
    bRollPreview: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&auto=format&fit=crop&q=80",
    specs: "Sony Cinema • 4K Master",
    badgeText: "Cinema Reel",
    verifiedSponsor: "Design & Creative",
  },
  {
    id: "dipti",
    name: "Dipti Parihar Sharma",
    handle: "@diptipariharsharma",
    niche: "Contemporary Fashion & Draping",
    reach: "99.3K Followers",
    startingPrice: "$420",
    startingPriceAmount: 420,
    matchScore: "India Creator 🇮🇳",
    portrait: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    bRollPreview: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop&q=80",
    specs: "4K Master Styling • Color Graded",
    badgeText: "Lookbook Reel",
    verifiedSponsor: "Contemporary Fashion",
  },
  {
    id: "sehitha",
    name: "Dr. Sehitha",
    handle: "@sehithamd",
    niche: "Clinical Dermatology & Skincare Science",
    reach: "52K Followers",
    startingPrice: "$480",
    startingPriceAmount: 480,
    matchScore: "Doctor Verified 🩺",
    portrait: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80",
    bRollPreview: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&auto=format&fit=crop&q=80",
    specs: "Science Backed • Clinical Breakdown",
    badgeText: "Clinical Reel",
    verifiedSponsor: "Skincare Science",
  },
];

export function HeroEditorialShowcase() {
  const { format } = useGlobalCurrency();
  const [activeIdx, setActiveIdx] = useState(0);
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const activeTalent = HERO_TALENT[activeIdx];

  return (
    <section className="relative min-h-[calc(100svh-4rem)] lg:min-h-[85vh] bg-white dark:bg-[#08080C] text-[#0A0A0E] dark:text-white flex flex-col justify-between pt-10 sm:pt-14 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans">
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
            className="lg:col-span-6 space-y-7 text-left"
          >
            {/* Live Trust Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] dark:bg-[#14141E] border border-black/8 dark:border-white/10 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-tight text-[#0A0A0E] dark:text-white">
                ABEYCOLLAB • THE CREATOR × BRAND COMMERCE PLATFORM
              </span>
            </div>

            {/* Confident Large Headline */}
            <h1 className="max-w-xl lg:max-w-2xl text-[clamp(2.5rem,5.5vw,5rem)] font-black font-display tracking-[-0.04em] text-[#0A0A0E] dark:text-white leading-[1.05]">
              Where visionary brands meet{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFB800] dark:from-[#FFD21F] dark:via-[#FFE575] dark:to-[#FFC700]">
                cinematic creators.
              </span>
            </h1>

            {/* Short, clear value statement */}
            <p className="text-base sm:text-lg text-[#5A5A68] dark:text-[#9A9AA8] max-w-xl leading-relaxed font-sans font-normal">
              Discover the right talent, align on the work, review every frame and release payment with complete confidence.
            </p>


            {/* Action Buttons (Dominant Primary CTA + Clean Secondary) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={() => setRoleModalOpen(true)}
                className="min-h-12 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-sm transition-all shadow-[0_4px_20px_rgba(255,210,31,0.5)] flex items-center justify-center gap-2 group active:scale-[0.98] border border-black/10 font-sans hover-lift"
              >
                <span>Post a Campaign</span>
                <ArrowRight className="w-4 h-4 text-[#0A0A0E] group-hover:translate-x-1 transition-transform" />
              </button>

              <Link href="/creators" className="w-full sm:w-auto min-h-12 px-7 py-3.5 rounded-full bg-white hover:bg-[#F8F8FC] dark:bg-[#14141E] dark:hover:bg-[#1E1E2C] border border-black/10 dark:border-white/10 text-[#0A0A0E] dark:text-white font-bold text-sm transition-all shadow-xs active:scale-[0.98] flex items-center justify-center gap-2 hover-lift">
                  <Users className="w-4 h-4 text-[#8A7000] dark:text-[#FFD21F]" />
                  <span>Browse Creators</span>
              </Link>
            </div>

            {/* Proof Micro Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-black/6 dark:border-white/10 text-xs font-mono text-[#5A5A68] dark:text-[#8E8EA4]">
              <div className="flex items-center gap-1.5 font-bold text-[#0A0A0E] dark:text-white">
                <ShieldCheck className="w-4 h-4 text-[#087F5B]" />
                <span>Protected Payments</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 font-bold text-[#0A0A0E] dark:text-white">
                <Zap className="w-4 h-4 text-[#FFD21F]" />
                <span>Fast Payout on Approval</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5 font-bold text-[#0A0A0E] dark:text-white">
                <Lock className="w-4 h-4 text-[#0A0A0E] dark:text-white" />
                <span>Clear Upfront Pricing</span>
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
            <div className="flex items-center gap-2 mb-4 bg-[#F4F4F8] dark:bg-[#14141E] p-1.5 rounded-full border border-black/6 dark:border-white/10 shadow-xs z-20">
              {HERO_TALENT.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setActiveIdx(i)}
                  aria-pressed={activeIdx === i}
                  aria-label={`Show ${t.name}'s creator profile`}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold transition-all flex items-center gap-1.5 ${
                    activeIdx === i
                      ? "bg-white dark:bg-[#1E1E2C] text-[#0A0A0E] dark:text-[#FFD21F] shadow-sm border border-black/8 dark:border-[#FFD21F]/40"
                      : "text-[#6A6A78] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activeIdx === i ? "bg-[#FFD21F]" : "bg-black/20 dark:bg-white/20"
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
              className="relative w-full max-w-[320px] xs:max-w-[360px] sm:max-w-[430px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-white dark:border-white/15 shadow-[0_24px_70px_rgba(10,10,14,0.16)] bg-[#0A0A0E] group"
            >
              {/* Primary Background Portrait */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTalent.id}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="absolute inset-0 bg-[#0A0A0E] overflow-hidden"
                >
                  {/* Ambient Blurred Extension */}
                  <SafeImage
                    src={activeTalent.portrait}
                    alt=""
                    width={900}
                    height={1125}
                    className="absolute inset-0 w-full h-full object-cover filter blur-2xl opacity-40 scale-110 pointer-events-none"
                  />
                  {/* Full Sharp Image */}
                  <SafeImage
                    src={activeTalent.portrait}
                    alt={activeTalent.name}
                    width={900}
                    height={1125}
                    className="relative w-full h-full object-contain filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Floating Top AI Match Badge */}
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 dark:bg-[#14141E]/95 backdrop-blur-md border border-white/40 dark:border-white/20 shadow-lg flex items-center gap-1.5 text-[11px] sm:text-xs font-mono font-bold text-[#0A0A0E] dark:text-[#FFD21F]"
              >
                <Sparkles className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
                <span className="text-[#0A0A0E] dark:text-white">{activeTalent.matchScore}</span>
              </motion.div>

              {/* Top Right Live Reach Badge */}
              <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 px-2 sm:px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[9px] sm:text-[10px] font-mono font-semibold text-white flex items-center gap-1">
                <Flame className="w-3 h-3 text-[#FFD21F]" />
                <span>{activeTalent.reach}</span>
              </div>

              {/* 🌟 OVERLAPPING FLOATING 4K VIDEO ASSET CARD */}
              <motion.div
                whileHover={{ scale: 1.08, rotate: 2 }}
                className="absolute bottom-[118px] sm:bottom-[126px] right-3 sm:right-4 z-20 w-20 sm:w-26 aspect-video rounded-2xl overflow-hidden border-2 border-white dark:border-white/20 shadow-[0_12px_30px_rgba(0,0,0,0.45)] bg-black"
              >
                <SafeImage
                  src={activeTalent.bRollPreview}
                  alt={activeTalent.badgeText}
                  width={200}
                  height={112}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                  <Play className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-white fill-white opacity-90" />
                </div>
                <span className="absolute bottom-1 inset-x-1 text-[7px] sm:text-[8px] font-mono font-bold text-white text-center truncate bg-black/70 rounded px-0.5">
                  {activeTalent.badgeText}
                </span>
              </motion.div>

              {/* Bottom Glass Identity Bar */}
              {/* Bottom Glass Identity Bar */}
              <div className="absolute bottom-3 sm:bottom-4 inset-x-3 sm:inset-x-4 z-20 p-3 sm:p-4 rounded-2xl bg-white/95 dark:bg-[#0E0E16]/95 backdrop-blur-xl border border-black/8 dark:border-white/10 shadow-xl space-y-1.5 sm:space-y-2 text-[#0A0A0E] dark:text-[#F4F4F8]">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-xs sm:text-sm font-bold font-display text-[#0A0A0E] dark:text-white">{activeTalent.name}</h3>
                      <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-[#087F5B]" />
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-4 h-4 rounded-md bg-[#FFD21F]/20 flex items-center justify-center text-[#A37F00] dark:text-[#FFD21F] shrink-0">
                        <TitleIcon title={activeTalent.niche} category={activeTalent.verifiedSponsor} className="w-2.5 h-2.5" />
                      </div>
                      <p className="text-[10px] sm:text-[11px] text-[#6A6A78] dark:text-[#A0A0B4] font-sans">{activeTalent.niche}</p>
                    </div>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-[9px] sm:text-[10px] text-[#888898] dark:text-[#8E8EA4] block uppercase">Starts at</span>
                    <span suppressHydrationWarning className="text-xs sm:text-sm font-extrabold text-[#0A0A0E] dark:text-white">{format(activeTalent.startingPriceAmount, "USD")}</span>
                  </div>
                </div>

                <div className="pt-1.5 sm:pt-2 border-t border-black/6 dark:border-white/10 flex items-center justify-between text-[10px] sm:text-[11px] font-mono">
                  <span className="text-[#5A5A68] dark:text-[#8E8EA4] truncate max-w-[140px] sm:max-w-[180px]">{activeTalent.specs}</span>
                  <Link
                    href={`/creators/${activeTalent.id}`}
                    className="text-[11px] sm:text-xs font-bold text-[#0A0A0E] dark:text-[#FFD21F] hover:text-[#8A7000] dark:hover:text-white flex items-center gap-0.5 shrink-0 transition-colors"
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
        title="Get Started on AbeyCollab"
        description="Choose how you want to use AbeyCollab today."
        maxWidth="md"
      >
        <div className="space-y-3 pt-2 text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
          <Link
            href="/brand/register"
            onClick={() => setRoleModalOpen(false)}
            className="w-full text-left p-4 rounded-2xl bg-[#FFFDF5] dark:bg-[#1A1A28] border-2 border-[#FFD21F] hover:shadow-md transition-all group flex items-center justify-between block hover-lift"
          >
            <div>
              <h4 className="text-sm font-bold font-display text-[#0A0A0E] dark:text-white">I am a Brand or Business</h4>
              <p className="text-xs text-[#6A6A78] dark:text-[#A0A0B4]">Post a campaign, find creators, and pay safely</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#0A0A0E] dark:text-[#FFD21F] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/creator/register"
            onClick={() => setRoleModalOpen(false)}
            className="w-full text-left p-4 rounded-2xl bg-[#FAFAFC] dark:bg-[#14141E] border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 hover:bg-white dark:hover:bg-[#1C1C28] hover:shadow-md transition-all group flex items-center justify-between block hover-lift"
          >
            <div>
              <h4 className="text-sm font-bold font-display text-[#0A0A0E] dark:text-white">I am a Creator</h4>
              <p className="text-xs text-[#6A6A78] dark:text-[#A0A0B4]">Share your media kit, pitch campaigns, and get paid</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#0A0A0E] dark:text-[#FFD21F] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Modal>
    </section>
  );
}
