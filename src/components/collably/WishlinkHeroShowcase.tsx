"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Zap,
  Users,
  Lock,
  Star,
  DollarSign,
  Briefcase,
} from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";
import { Modal } from "@/components/ui/Modal";

interface CreatorShowcase {
  id: string;
  name: string;
  handle: string;
  category: string;
  reach: string;
  image: string;
  dealAmount: string;
  brand: string;
}

const CREATOR_SHOWCASE: CreatorShowcase[] = [
  {
    id: "prarthana",
    name: "Prarthana",
    handle: "@prarthaana.04",
    category: "Fashion & Lifestyle",
    reach: "30K Reach",
    image: "/creators/prarthana.jpg",
    dealAmount: "₹45,000",
    brand: "Snitch",
  },
  {
    id: "vasudha",
    name: "Vasudha Rai",
    handle: "@vasudha.rai",
    category: "Beauty & Skincare",
    reach: "115K Reach",
    image: "/creators/vasudha-rai.jpg",
    dealAmount: "₹65,000",
    brand: "Plum Goodness",
  },
  {
    id: "kunal",
    name: "Kunal Rajput",
    handle: "@kunalrajputc",
    category: "Athletics & Fitness",
    reach: "85K Reach",
    image: "/creators/kunal-rajput.jpg",
    dealAmount: "₹50,000",
    brand: "Boldfit",
  },
  {
    id: "decoding",
    name: "Decoding Tech",
    handle: "@the.decoding.tech",
    category: "Tech & Gadgets",
    reach: "140K Reach",
    image: "/creators/decoding-tech.jpg",
    dealAmount: "₹85,000",
    brand: "Nothing India",
  },
];

export function WishlinkHeroShowcase() {
  const [activeTab, setActiveTab] = useState<"creator" | "brand">("creator");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [roleModalOpen, setRoleModalOpen] = useState(false);

  const activeCreator = CREATOR_SHOWCASE[selectedIdx];

  // Auto-cycle through talent smoothly
  useEffect(() => {
    const timer = setInterval(() => {
      setSelectedIdx((prev) => (prev + 1) % CREATOR_SHOWCASE.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="relative min-h-[92vh] bg-white text-[#0A0A0E] flex flex-col justify-center pt-28 sm:pt-36 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden font-sans select-none">
        {/* Soft Ambient Background Aura */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-gradient-to-b from-[#FFD21F]/20 via-[#FFE052]/8 to-transparent rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
          {/* Top Wishlink-Style Header Bar with Official Store Ratings & Partners */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 sm:mb-12 pb-6 border-b border-black/6">
            {/* Left: Role Switcher */}
            <div className="inline-flex p-1 rounded-full bg-[#F4F4F8] border border-black/8 shadow-2xs self-start">
              <button
                type="button"
                onClick={() => setActiveTab("creator")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "creator"
                    ? "bg-[#0A0A0E] text-white shadow-xs"
                    : "text-[#5A5A68] hover:text-[#0A0A0E]"
                }`}
              >
                For Creators
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("brand")}
                className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "brand"
                    ? "bg-[#0A0A0E] text-white shadow-xs"
                    : "text-[#5A5A68] hover:text-[#0A0A0E]"
                }`}
              >
                For Brands
              </button>
            </div>

            {/* Right: Wishlink-Style App Store & Partner Badges */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
              {/* Meta & Escrow Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] border border-black/8 shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
                <span className="text-[11px] font-mono font-extrabold text-[#0A0A0E]">
                  RAZORPAY ESCROW &bull; META GRAPH PARTNER
                </span>
              </div>

              {/* Play Store Rating */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/8 text-[#0A0A0E] text-[11px] font-mono font-bold shadow-2xs">
                <Star className="w-3.5 h-3.5 fill-[#FFD21F] text-[#FFD21F]" />
                <span>Play Store 4.8★</span>
              </div>

              {/* App Store Rating */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/8 text-[#0A0A0E] text-[11px] font-mono font-bold shadow-2xs">
                <Star className="w-3.5 h-3.5 fill-[#FFD21F] text-[#FFD21F]" />
                <span>App Store 4.7★</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
            {/* ══════════════════════════════════════════════════════════════════
                LEFT: WISHLINK-STYLE MINIMALIST, HIGH-IMPACT HEADLINE & CTAS
                ══════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Exact Wishlink-Style Punchy Headline (Less Text) */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#0A0A0E] leading-[1.05]">
                {activeTab === "creator" ? (
                  <>
                    Empowering creators to{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#0A0A0E] underline decoration-[#FFD21F] decoration-4 underline-offset-4">
                      grow, collaborate
                    </span>{" "}
                    and earn.
                  </>
                ) : (
                  <>
                    Scale your brand with{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] via-[#B45309] to-[#0A0A0E] underline decoration-[#FFD21F] decoration-4 underline-offset-4">
                      top creators
                    </span>{" "}
                    and zero risk.
                  </>
                )}
              </h1>

              {/* Minimal 1-Sentence Description */}
              <p className="text-base sm:text-lg text-[#5A5A68] max-w-xl font-sans leading-relaxed">
                {activeTab === "creator"
                  ? "Boost your social media engagement, collaborate with 250+ top brands and monetise 100% of your content with AbeyCollab."
                  : "Launch milestone-protected campaigns with India's top 21+ audited creators. Funds stay safe in escrow until you approve."}
              </p>

              {/* Primary Call to Action Buttons: "Sign up" */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href={activeTab === "creator" ? "/creator/register" : "/brand/register"}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-sm sm:text-base shadow-[0_4px_20px_rgba(255,210,31,0.5)] border border-black/10 transition-all flex items-center justify-center gap-2 active:scale-95 text-center font-sans"
                >
                  <span>Sign up as {activeTab === "creator" ? "Creator" : "Brand"}</span>
                  <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
                </Link>

                <Link
                  href={activeTab === "creator" ? "/campaigns" : "/creators"}
                  className="px-7 py-4 rounded-full bg-[#FAF9F5] hover:bg-[#F2F1EC] text-[#0A0A0E] font-bold text-sm sm:text-base border border-black/12 shadow-2xs transition-all flex items-center justify-center gap-2 active:scale-95 text-center"
                >
                  <span>{activeTab === "creator" ? "Explore Briefs" : "Browse Creator Roster"}</span>
                </Link>
              </div>

              {/* Trust Micro-Metrics */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4 border-t border-black/8 text-xs font-mono text-[#5A5A68]">
                <div className="flex items-center gap-1.5 font-bold text-[#0A0A0E]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>100% Escrow Protection</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 font-bold text-[#0A0A0E]">
                  <Zap className="w-4 h-4 text-[#FFD21F]" />
                  <span>24h Payout Guarantee</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5 font-bold text-[#0A0A0E]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>0% Chasing Invoices</span>
                </div>
              </div>
            </div>

            {/* ══════════════════════════════════════════════════════════════════
                RIGHT: WISHLINK-STYLE FLOATING INTERACTIVE CREATOR STAGE
                ══════════════════════════════════════════════════════════════════ */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center w-full">
              {/* Main Creator Showcase Container */}
              <div className="relative w-full max-w-[380px] sm:max-w-[420px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#FAF9F5]">
                <SafeImage
                  src={activeCreator.image}
                  alt={activeCreator.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Top Badge on image */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/95 backdrop-blur-md text-[#0A0A0E] shadow-sm">
                    {activeCreator.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#FFD21F] text-[#0A0A0E] shadow-sm flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified</span>
                  </span>
                </div>

                {/* Bottom Creator Info Bar on image */}
                <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                  <div className="flex items-end justify-between">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black font-display leading-tight drop-shadow-sm">
                        {activeCreator.name}
                      </h3>
                      <p className="text-xs font-mono text-white/80">{activeCreator.handle}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] font-mono uppercase text-[#FFD21F] block">Latest Collab</span>
                      <span className="text-base font-extrabold font-mono text-white">
                        {activeCreator.dealAmount}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── WISHLINK FLOATING REACTION STICKERS & BADGES ── */}
              {/* Floating Sticker 1: Escrow Deposited (Top-Left) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -left-2 sm:-left-6 p-3 sm:p-3.5 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 shadow-xl flex items-center gap-2.5 z-20"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center font-bold text-sm">
                  💰
                </div>
                <div className="text-left font-mono">
                  <p className="text-[10px] text-[#7A7A8A] font-semibold uppercase">Escrow Vault</p>
                  <p className="text-xs font-extrabold text-[#0A0A0E]">₹1,25,000 Locked</p>
                </div>
              </motion.div>

              {/* Floating Sticker 2: Brand Partner Deal (Top-Right) */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-12 -right-2 sm:-right-8 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 shadow-xl flex items-center gap-2.5 z-20"
              >
                <div className="w-8 h-8 rounded-xl bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center font-bold text-xs">
                  ⚡️
                </div>
                <div className="text-left font-sans">
                  <p className="text-[10px] font-mono text-[#7A7A8A]">Active Brief</p>
                  <p className="text-xs font-extrabold text-[#0A0A0E]">{activeCreator.brand} Drop</p>
                </div>
              </motion.div>

              {/* Floating Sticker 3: Instant 24h Release (Bottom-Left) */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-14 -left-2 sm:-left-8 p-3 rounded-2xl bg-white/95 backdrop-blur-md border border-black/10 shadow-xl flex items-center gap-2.5 z-20"
              >
                <span className="text-xl">🚀</span>
                <div className="text-left font-mono">
                  <p className="text-[10px] text-[#7A7A8A] font-bold">24-Hour Payout</p>
                  <p className="text-xs font-extrabold text-emerald-700">Funds Released</p>
                </div>
              </motion.div>

              {/* Floating Sticker 4: Emojis just like Wishlink */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], rotate: [0, 6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 right-10 sm:right-6 px-3 py-1.5 rounded-full bg-white border border-black/10 shadow-lg flex items-center gap-1.5 text-xs font-mono font-bold z-20"
              >
                <span>🔥</span>
                <span>Zero Chasing Invoices</span>
              </motion.div>

              {/* Creator Selector Thumbnails below photo */}
              <div className="flex items-center gap-2 mt-5">
                {CREATOR_SHOWCASE.map((creator, i) => (
                  <button
                    key={creator.id}
                    onClick={() => setSelectedIdx(i)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                      selectedIdx === i
                        ? "bg-[#0A0A0E] text-white shadow-xs"
                        : "bg-[#F4F4F8] text-[#5A5A68] hover:text-[#0A0A0E] border border-black/8"
                    }`}
                  >
                    {creator.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Role Selection Modal */}
      <Modal
        isOpen={roleModalOpen}
        onClose={() => setRoleModalOpen(false)}
        title="Sign up for AbeyCollab"
        description="Choose your pathway to explore briefings or share your creator kit."
        maxWidth="md"
      >
        <div className="space-y-3 pt-2 text-[#0A0A0E] select-none font-sans">
          <Link
            href="/creator/register"
            onClick={() => setRoleModalOpen(false)}
            className="w-full text-left p-4 rounded-2xl bg-[#FFFDF5] border-2 border-[#FFD21F] hover:shadow-md transition-all group flex items-center justify-between block"
          >
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-sm font-bold font-display">I am a Creator</h4>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] font-bold">
                  RECOMMENDED
                </span>
              </div>
              <p className="text-xs text-[#6A6A78]">Pitch briefs, claim audited media kit &amp; get paid in 24h</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#08080C] group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/brand/register"
            onClick={() => setRoleModalOpen(false)}
            className="w-full text-left p-4 rounded-2xl bg-[#FAFAFC] border border-black/10 hover:border-black/20 hover:bg-white hover:shadow-md transition-all group flex items-center justify-between block"
          >
            <div>
              <h4 className="text-sm font-bold font-display">I am a Brand / Business</h4>
              <p className="text-xs text-[#6A6A78]">Post campaign briefs, hire creators &amp; escrow funds</p>
            </div>
            <ArrowRight className="w-4 h-4 text-[#08080C] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Modal>
    </>
  );
}
