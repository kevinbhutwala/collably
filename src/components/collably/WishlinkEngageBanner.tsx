"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SafeImage } from "@/components/ui/SafeImage";
import { ArrowRight, Sparkles, Send, ShieldCheck, MessageSquare, Banknote, Instagram } from "lucide-react";

interface EngageFeature {
  id: string;
  tabLabel: string;
  eyebrow: string;
  title: string;
  tagline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
  creatorName: string;
  creatorHandle: string;
  creatorCategory: string;
  creatorFollowers: string;
  creatorImage: string;
  gradientBg: string;
  pillColor: string;
  pillTextColor: string;
}

const ENGAGE_FEATURES: EngageFeature[] = [
  {
    id: "autodm",
    tabLabel: "AbeyCollab Engage",
    eyebrow: "Simplified link sharing and boost engagement with",
    title: "ABEYCOLLAB ENGAGE",
    tagline: "META GRAPH API AUTO-DM ENGINE",
    description:
      "Connect your Instagram account in 1 click. When brands or followers comment on your reels, your verified media kit, rate card, and deliverable links are automatically sent to their DMs in under 3 seconds.",
    ctaText: "READ MORE",
    ctaLink: "/register?role=creator",
    creatorName: "Vasudha Rai",
    creatorHandle: "@thepearshapedstylist",
    creatorCategory: "Fashion & Styling Creator",
    creatorFollowers: "591K Followers",
    creatorImage: "/creators/vasudha-rai.jpg",
    gradientBg: "from-[#EA580C] via-[#F97316] to-[#FB923C]",
    pillColor: "bg-[#FACC15]",
    pillTextColor: "text-[#0F172A]",
  },
  {
    id: "escrow",
    tabLabel: "Milestone Vault",
    eyebrow: "Guaranteed payouts and zero invoice chasing with",
    title: "MILESTONE ESCROW",
    tagline: "100% PRE-FUNDED PROTECTION",
    description:
      "Brands deposit campaign budgets safely into escrow before you record a single second. Deliver your draft, get approved, and money releases automatically to your bank within 24 hours.",
    ctaText: "HOW ESCROW WORKS",
    ctaLink: "/register?role=creator",
    creatorName: "Prarthana",
    creatorHandle: "@prarthaana.04",
    creatorCategory: "Fashion & Lifestyle Creator",
    creatorFollowers: "284K Followers",
    creatorImage: "/creators/prarthana.jpg",
    gradientBg: "from-[#0F766E] via-[#0D9488] to-[#14B8A6]",
    pillColor: "bg-[#34D399]",
    pillTextColor: "text-[#064E3B]",
  },
  {
    id: "briefs",
    tabLabel: "Direct 250+ Brands",
    eyebrow: "Unlock high-ticket sponsorships with",
    title: "DIRECT BRAND DEALS",
    tagline: "SNITCH, NYKAA & PLUM OPEN BRIEFS",
    description:
      "Apply directly to active campaign briefs with transparent budgets. No agency markups, no hidden platform commissions, and guaranteed responses from verified brand marketers.",
    ctaText: "VIEW OPEN BRIEFS",
    ctaLink: "/campaigns",
    creatorName: "Kunal Rajput",
    creatorHandle: "@kunalrajputc",
    creatorCategory: "Fitness & Performance Creator",
    creatorFollowers: "410K Followers",
    creatorImage: "/creators/kunal-rajput.jpg",
    gradientBg: "from-[#1E293B] via-[#0F766E] to-[#047857]",
    pillColor: "bg-[#F59E0B]",
    pillTextColor: "text-[#0F172A]",
  },
];

export function WishlinkEngageBanner() {
  const [activeId, setActiveId] = useState("autodm");
  const active = ENGAGE_FEATURES.find((f) => f.id === activeId) || ENGAGE_FEATURES[0];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF8F5] relative overflow-hidden select-none font-sans border-t border-black/[0.06]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading matching Wishlink style */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#0F172A] leading-[1.12]">
            Discover and explore endless <br className="hidden sm:inline" />
            possibilities with AbeyCollab
          </h2>
          <p className="text-sm sm:text-base text-[#475569] max-w-xl mx-auto">
            From automated DM conversions to guaranteed milestone payments, everything runs on autopilot.
          </p>

          {/* Quick Pill Switcher for Features */}
          <div className="flex items-center justify-center gap-2 pt-2">
            {ENGAGE_FEATURES.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveId(item.id)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeId === item.id
                    ? "bg-[#0F172A] text-white shadow-md scale-[1.03]"
                    : "bg-white text-[#64748B] hover:text-[#0F172A] border border-black/10"
                }`}
              >
                {item.tabLabel}
              </button>
            ))}
          </div>
        </div>

        {/* ── BIG HERO FEATURE BANNER WITH OVERLAPPING CREATOR (Matching Sample Image 3) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className={`rounded-3xl sm:rounded-[36px] bg-gradient-to-r ${active.gradientBg} shadow-2xl relative overflow-visible text-white p-6 sm:p-12 lg:p-16`}
          >
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.18)_0%,transparent_60%)] rounded-3xl sm:rounded-[36px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              {/* Left Column: Typography, Eyebrow, Title & Pill Button */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <p className="text-sm sm:text-base font-sans font-medium text-white/90 drop-shadow-xs max-w-md">
                  {active.eyebrow}
                </p>

                <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white uppercase drop-shadow-sm leading-none">
                  {active.title}
                </h3>

                <p className="text-xs sm:text-sm font-sans text-white/85 leading-relaxed max-w-lg">
                  {active.description}
                </p>

                {/* Read More Pill Button */}
                <div className="pt-2">
                  <Link
                    href={active.ctaLink}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white text-[#0F172A] hover:bg-neutral-100 font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-lg transition-transform active:scale-95 cursor-pointer font-sans"
                  >
                    <span>{active.ctaText}</span>
                    <ArrowRight className="w-4 h-4 text-[#0F172A]" />
                  </Link>
                </div>

                {/* Bottom 3 Signature Circular Action Icons (Matching Image 3) */}
                <div className="flex items-center gap-3 pt-4">
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xs" title="Milestone Escrow Payouts">
                    <Banknote className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xs" title="Automated Instagram Comments">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xs" title="Instant Direct Messages">
                    <Send className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              {/* Right Column: High-Res Creator Photo Overlapping the Banner Top Edge! */}
              <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
                {/* Creator Card / Overlapping Portrait Container */}
                <div className="relative w-full max-w-[320px] sm:max-w-[380px] lg:-mt-24 sm:-mt-16 -mt-8">
                  {/* Portrait Window with Rounded Curves */}
                  <div className="w-full aspect-[4/5] rounded-[32px] sm:rounded-[40px] overflow-hidden shadow-2xl relative border-4 border-white/90 bg-neutral-900">
                    <SafeImage
                      src={active.creatorImage}
                      alt={active.creatorName}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Overlapping Bottom Yellow/Mint Creator Stat Pill (Matching Sample Image 3) */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={`absolute -bottom-6 left-2 right-2 sm:left-4 sm:right-4 p-4 rounded-2xl sm:rounded-3xl ${active.pillColor} ${active.pillTextColor} shadow-xl border-2 border-white/90 flex flex-col items-center justify-center text-center z-20`}
                  >
                    <p className="font-extrabold text-sm sm:text-base font-sans tracking-tight">
                      {active.creatorHandle}
                    </p>
                    <p className="text-xs font-sans font-medium text-neutral-800">
                      {active.creatorCategory}
                    </p>
                    <div className="flex items-center gap-1.5 pt-1 text-[11px] font-mono font-bold text-neutral-900">
                      <Instagram className="w-3.5 h-3.5" />
                      <span>{active.creatorFollowers}</span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
