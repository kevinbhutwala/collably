"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  ArrowRight,
  MessageSquare,
  Banknote,
  Instagram,
  CheckCircle2,
  Zap,
  Send,
  Star,
} from "lucide-react";

interface FeatureBullet {
  title: string;
  desc: string;
}

interface EngageFeature {
  id: string;
  tabLabel: string;
  tagline: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: FeatureBullet[];
  ctaText: string;
  ctaLink: string;
  creatorName: string;
  creatorHandle: string;
  creatorCategory: string;
  creatorFollowers: string;
  creatorImage: string;
  gradientBg: string;
  pillBg: string;
  pillText: string;
  statBadge: string;
}

const ENGAGE_FEATURES: EngageFeature[] = [
  {
    id: "autodm",
    tabLabel: "AbeyCollab Engage",
    tagline: "META GRAPH API AUTO-DM ENGINE",
    eyebrow: "Turn Reel comments into guaranteed brand deals with",
    title: "ABEYCOLLAB ENGAGE",
    description:
      "Connect your Instagram account in 1 click. When brands or followers comment on your reels, your verified media kit, rate card, and deliverable links are automatically sent to their DMs in under 3 seconds.",
    bullets: [
      { title: "Instant 3s DM Response", desc: "Automated trigger on 'COLLAB' or 'RATE' reel comments" },
      { title: "Live Audited Media Kit", desc: "Real engagement stats & demographic breakdown directly from Meta" },
      { title: "1-Click Direct Booking", desc: "Pre-funded escrow campaigns with automated bank release" },
    ],
    ctaText: "EXPLORE AUTO-DM",
    ctaLink: "/register?role=creator",
    creatorName: "Prarthana",
    creatorHandle: "@prarthaana.04",
    creatorCategory: "Fashion & Lifestyle Creator",
    creatorFollowers: "284K Followers",
    creatorImage: "/creators/prarthana.jpg",
    gradientBg: "from-[#0F766E] via-[#0D9488] to-[#047857]",
    pillBg: "bg-[#34D399]",
    pillText: "text-[#064E3B]",
    statBadge: "Instant 3s DM Response",
  },
  {
    id: "escrow",
    tabLabel: "Milestone Vault",
    tagline: "100% PRE-FUNDED PROTECTION",
    eyebrow: "Guaranteed payouts and zero invoice chasing with",
    title: "MILESTONE ESCROW",
    description:
      "Brands deposit campaign budgets safely into escrow before you record a single second. Deliver your draft, get approved, and money releases automatically to your bank within 24 hours.",
    bullets: [
      { title: "100% Pre-Funded Escrow", desc: "Campaign funds locked in safe custody before production begins" },
      { title: "Automated 24h Payouts", desc: "Guaranteed bank transfer once brand signs off on deliverables" },
      { title: "Zero Invoice Chasing", desc: "Never wait 60 to 90 days for agency accounting approvals" },
    ],
    ctaText: "HOW ESCROW WORKS",
    ctaLink: "/register?role=creator",
    creatorName: "Prarthana",
    creatorHandle: "@prarthaana.04",
    creatorCategory: "Fashion & Lifestyle Creator",
    creatorFollowers: "284K Followers",
    creatorImage: "/creators/prarthana.jpg",
    gradientBg: "from-[#0F172A] via-[#0F766E] to-[#047857]",
    pillBg: "bg-white",
    pillText: "text-[#0F766E]",
    statBadge: "100% Pre-Funded Escrow",
  },
  {
    id: "briefs",
    tabLabel: "Direct 250+ Brands",
    tagline: "SNITCH, NYKAA & PLUM OPEN BRIEFS",
    eyebrow: "Unlock high-ticket sponsorships with zero middlemen with",
    title: "DIRECT BRAND DEALS",
    description:
      "Apply directly to active campaign briefs with transparent budgets. No agency markups, no hidden platform commissions, and guaranteed responses from verified brand marketers.",
    bullets: [
      { title: "250+ Verified Direct Brands", desc: "Snitch, Plum, DermaCo, Nykaa actively hiring creators" },
      { title: "Transparent Budgets", desc: "Fixed payouts with zero agency cut or platform deduction" },
      { title: "Guaranteed 48h Response", desc: "Brand marketers review applications within 48 hours" },
    ],
    ctaText: "VIEW OPEN BRIEFS",
    ctaLink: "/campaigns",
    creatorName: "Prarthana",
    creatorHandle: "@prarthaana.04",
    creatorCategory: "Fashion & Lifestyle Creator",
    creatorFollowers: "284K Followers",
    creatorImage: "/creators/prarthana.jpg",
    gradientBg: "from-[#047857] via-[#0F766E] to-[#115E59]",
    pillBg: "bg-[#34D399]",
    pillText: "text-[#064E3B]",
    statBadge: "₹1.4 Cr+ Open Briefs",
  },
];

export function WishlinkEngageBanner() {
  const [activeId, setActiveId] = useState("autodm");
  const active = ENGAGE_FEATURES.find((f) => f.id === activeId) || ENGAGE_FEATURES[0];

  return (
    <section className="py-10 sm:py-16 pb-20 sm:pb-28 bg-[#FAF8F5] relative overflow-hidden select-none font-sans border-t border-black/[0.06]">
      {/* Background Soft Atmospheric Theme Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[450px] bg-emerald-100/35 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[400px] bg-[#34D399]/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-4 space-y-2">
          <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-black font-display tracking-tight text-[#0F172A] leading-[1.15]">
            Discover and explore endless <br className="hidden sm:inline" />
            possibilities with AbeyCollab
          </h2>

          {/* Quick Pill Switcher for Features */}
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 pt-1 flex-wrap">
            {ENGAGE_FEATURES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeId === item.id
                    ? "bg-[#0F172A] text-white shadow-md scale-[1.02] ring-2 ring-[#34D399]/40"
                    : "bg-white text-[#64748B] hover:text-[#0F172A] border border-black/10 shadow-xs hover:border-black/20"
                }`}
              >
                {item.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* ── 3D HERO BANNER: MANAGEABLE SPACING, FILLED CONTENT & PRARTHANA ORIGINAL PHOTO ── */}
        <div className="max-w-5xl lg:max-w-6xl mx-auto pt-8 sm:pt-12" style={{ perspective: 1200 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className={`rounded-[24px] sm:rounded-[36px] bg-gradient-to-r ${active.gradientBg} shadow-[0_25px_60px_-15px_rgba(15,118,110,0.38),0_12px_28px_rgba(0,0,0,0.18)] relative text-white border border-white/20`}
            >
              {/* Subtle 3D Radial Atmospheric Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22)_0%,transparent_60%)] rounded-[24px] sm:rounded-[36px] pointer-events-none" />

              <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8 lg:gap-10 p-5 sm:p-8 lg:p-12 pb-14 sm:pb-16 lg:pb-12 relative z-10">
                {/* ── LEFT COLUMN: Rich Product Copy & Feature Grid ── */}
                <div className="lg:col-span-7 space-y-4 text-left">
                  {/* Tagline Pill */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-[10px] sm:text-[11px] font-mono font-bold tracking-wide uppercase text-white shadow-xs">
                    <Zap className="w-3 h-3 text-[#34D399]" />
                    <span>{active.tagline}</span>
                  </div>

                  {/* Eyebrow */}
                  <p className="text-xs sm:text-sm font-sans font-medium text-white/90 max-w-lg leading-relaxed">
                    {active.eyebrow}
                  </p>

                  {/* Main Title */}
                  <h3 className="text-xl sm:text-3xl lg:text-4xl font-black font-display tracking-tight text-white uppercase leading-none drop-shadow-xs">
                    {active.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] font-sans text-white/85 leading-relaxed max-w-xl">
                    {active.description}
                  </p>

                  {/* 3 Key Benefit Micro-Bullets */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                    {active.bullets.map((b, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 space-y-1 hover:bg-white/15 transition-colors"
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#34D399] shrink-0" />
                          <span className="truncate">{b.title}</span>
                        </div>
                        <p className="text-[10px] text-white/80 leading-snug line-clamp-2">
                          {b.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Action Row: CTA Pill + 3 Circular Glass Discs + Social Proof */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                    <Link
                      href={active.ctaLink}
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-white text-[#0F172A] hover:bg-[#F8FAF9] font-extrabold text-xs tracking-wider uppercase shadow-[0_6px_16px_rgba(0,0,0,0.15)] transition-all hover:scale-[1.02] active:scale-95 cursor-pointer font-sans text-center"
                    >
                      <span>{active.ctaText}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#0F172A]" />
                    </Link>

                    {/* 3 Circular Glass Action Discs */}
                    <div className="flex items-center justify-center gap-2">
                      <div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xs hover:scale-105 transition-transform"
                        title="Milestone Escrow Payouts"
                      >
                        <Banknote className="w-4 h-4 text-white" />
                      </div>
                      <div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xs hover:scale-105 transition-transform"
                        title="Automated Instagram Comments"
                      >
                        <MessageSquare className="w-4 h-4 text-white" />
                      </div>
                      <div
                        className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xs hover:scale-105 transition-transform"
                        title="Instant Direct Messages"
                      >
                        <Send className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Social proof rating */}
                    <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-mono font-medium text-white/85 sm:pl-2">
                      <div className="flex items-center text-[#34D399]">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span>4.9/5 from 1.2K+ Creators</span>
                    </div>
                  </div>
                </div>

                {/* ── RIGHT COLUMN: PRARTHANA ORIGINAL PHOTO & FLOATING BADGE ── */}
                <div className="lg:col-span-5 flex items-center justify-center lg:justify-end pt-4 lg:pt-0 pb-8 sm:pb-10 lg:pb-0">
                  {/* Photo & Badge Wrapped Together with bottom clearance so it never hangs out of the banner */}
                  <div className="relative inline-flex flex-col items-center mb-6 sm:mb-8 lg:mb-2">
                    {/* Photo Card with 3D Tilt */}
                    <motion.div
                      whileHover={{ scale: 1.03, rotateY: 0, rotateX: 0 }}
                      transition={{ duration: 0.3 }}
                      className="relative w-56 min-[380px]:w-64 sm:w-72 md:w-80 lg:w-[310px] aspect-[4/5] mt-2 sm:mt-4 lg:-mt-28 xl:-mt-32 rounded-[24px] sm:rounded-[36px] overflow-hidden border-4 border-white/95 shadow-[0_25px_50px_-15px_rgba(0,0,0,0.5),0_10px_20px_rgba(15,118,110,0.3)] ring-2 ring-white/30 transform lg:rotate-y-[-5deg] lg:rotate-x-[3deg] transition-transform bg-neutral-900"
                    >
                      <SafeImage
                        src={active.creatorImage}
                        alt={active.creatorName}
                        fill
                        className="object-cover object-top"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      {/* Top Creator Live Verified Badge */}
                      <div className="absolute top-3.5 left-3.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/65 backdrop-blur-md border border-white/20 text-[10px] font-mono font-bold text-white shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                        <span>{active.statBadge}</span>
                      </div>
                    </motion.div>

                    {/* Centered Overlapping Stat Badge: Perfectly centered using left-0 right-0 mx-auto (immune to Framer Motion transform overrides!) */}
                    <motion.div
                      initial={{ y: 15, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15 }}
                      className={`absolute -bottom-5 left-0 right-0 mx-auto w-[86%] max-w-[230px] py-2 px-3 rounded-2xl ${active.pillBg} ${active.pillText} shadow-[0_12px_28px_rgba(0,0,0,0.22)] border-2 border-white flex flex-col items-center justify-center text-center z-20 backdrop-blur-md`}
                    >
                      <div className="flex items-center gap-1.5 justify-center">
                        <p className="font-extrabold text-xs sm:text-sm font-sans tracking-tight">
                          {active.creatorHandle}
                        </p>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#064E3B] shrink-0" />
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-sans font-medium text-neutral-800 whitespace-nowrap truncate max-w-full">
                        {active.creatorCategory}
                      </p>
                      <div className="flex items-center gap-1 pt-0.5 text-[9px] sm:text-[10px] font-mono font-bold text-neutral-900 justify-center">
                        <Instagram className="w-3 h-3 text-[#064E3B] shrink-0" />
                        <span>{active.creatorFollowers}</span>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
