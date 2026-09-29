"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck,
  Zap,
  MessageSquare,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Users,
  CheckCircle2,
  Lock,
  Send,
  BarChart3,
  Globe,
  FileCheck2,
} from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";

interface FeatureItem {
  id: string;
  tabLabel: string;
  tagline: string;
  title: string;
  highlight: string;
  description: string;
  badge: string;
  points: string[];
  ctaText: string;
  ctaLink: string;
  visualType: "escrow" | "brands" | "dm" | "mediakit";
}

const FEATURES: FeatureItem[] = [
  {
    id: "escrow",
    tabLabel: "100% Escrow",
    tagline: "PAYMENT PROTECTION",
    title: "Monetize with guaranteed",
    highlight: "100% Escrow",
    description:
      "Campaign funds are deposited safely into escrow before you record a single second. Zero unpaid invoices.",
    badge: "0% CHASING INVOICES",
    points: [
      "100% milestone funds locked in Razorpay Escrow",
      "Automated bank payout within 24 hours of approval",
    ],
    ctaText: "Sign up to Monetize",
    ctaLink: "/register?role=creator",
    visualType: "escrow",
  },
  {
    id: "autodm",
    tabLabel: "Auto-DM Engine",
    tagline: "META GRAPH API",
    title: "Automate brand inquiries in",
    highlight: "Under 3 Seconds",
    description:
      "When brands or followers comment on your Instagram Reels, your media kit and rate card are delivered instantly.",
    badge: "META PARTNER",
    points: [
      "Instant DM responses when users comment keywords like 'COLLAB'",
      "3.8x higher deal conversion than manual email replies",
    ],
    ctaText: "Enable Auto-DM",
    ctaLink: "/register?role=creator",
    visualType: "dm",
  },
  {
    id: "mediakit",
    tabLabel: "Audited Media Kit",
    tagline: "LIVE LINK-IN-BIO",
    title: "Replace PDFs with your live",
    highlight: "Audited Storefront",
    description:
      "Live reach, verified demographics, previous 4K brand deliverables, and 1-click booking with pre-funded escrow.",
    badge: "LIVE AUDITED STATS",
    points: [
      "Live verified reach and audience demographic breakdown",
      "Direct milestone booking with transparent upfront rates",
    ],
    ctaText: "Build Your Media Kit",
    ctaLink: "/register?role=creator",
    visualType: "mediakit",
  },
  {
    id: "brands",
    tabLabel: "250+ Direct Brands",
    tagline: "ZERO MIDDLEMEN",
    title: "Pitch directly to briefs from",
    highlight: "250+ Premier Brands",
    description:
      "Pitch open briefs from Snitch, Plum, Boldfit, and Nothing. Transparent budgets with zero agency markups.",
    badge: "DIRECT SPONSORSHIPS",
    points: [
      "Verified brand briefs with fixed, protected budgets",
      "Guaranteed brand response SLA within 48 hours",
    ],
    ctaText: "Explore Brand Briefs",
    ctaLink: "/campaigns",
    visualType: "brands",
  },
];

export function WishlinkSpaciousShowcase() {
  const [activeTabId, setActiveTabId] = useState("escrow");
  const activeFeature = FEATURES.find((f) => f.id === activeTabId) || FEATURES[0];

  return (
    <section className="py-16 sm:py-24 bg-[#FBFBFD] select-none font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Top Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-10 sm:mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/[0.08] shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E98415]" />
            <span className="text-xs font-mono font-extrabold uppercase text-[#0A0A0E] tracking-tight">
              COLLABORATION ESSENTIALS
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A0A0E] font-display tracking-tight leading-[1.1]">
            Unlock your reach and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] to-[#E98415] underline decoration-[#FFD21F] decoration-4 underline-offset-4">
              maximize earnings
            </span>
          </h2>

          <p className="text-sm sm:text-base text-[#5A5A68] max-w-xl mx-auto">
            Everything you need to partner with top brands, automate DMs, and get paid on time.
          </p>
        </motion.div>

        {/* Clean Pill Tab Switcher */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-3 mb-10 sm:mb-12 no-scrollbar gap-2 sm:gap-3 px-1">
          {FEATURES.map((item) => {
            const isActive = item.id === activeTabId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTabId(item.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-[#FFD21F] text-[#0A0A0E] shadow-[0_4px_16px_rgba(255,210,31,0.35)] border border-black/10 scale-[1.02]"
                    : "bg-white text-[#5A5A68] hover:text-[#0A0A0E] border border-black/[0.07] hover:bg-black/[0.03]"
                }`}
              >
                {isActive && <span className="w-2 h-2 rounded-full bg-[#0A0A0E]" />}
                <span>{item.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Main Spacious Feature Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="p-5 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-white border border-black/[0.07] shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
              {/* ── LEFT: Typography & Explanations ── */}
              <div className="lg:col-span-6 space-y-5 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-extrabold uppercase bg-emerald-500/10 text-emerald-800 border border-emerald-500/20">
                    {activeFeature.badge}
                  </span>
                  <span className="text-[11px] font-mono text-[#7A7A8A] font-semibold uppercase">
                    {activeFeature.tagline}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#0A0A0E] font-display tracking-tight leading-[1.15]">
                  {activeFeature.title}{" "}
                  <span className="text-[#E98415] underline decoration-[#FFD21F] decoration-4 underline-offset-4">
                    {activeFeature.highlight}
                  </span>
                </h3>

                <p className="text-sm sm:text-base text-[#5A5A68] leading-relaxed">
                  {activeFeature.description}
                </p>

                {/* Key Points */}
                <div className="space-y-2.5 pt-1">
                  {activeFeature.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/15 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-[#0A0A0E]">{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Direct CTA Button */}
                <div className="pt-2">
                  <Link
                    href={activeFeature.ctaLink}
                    className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_18px_rgba(255,210,31,0.4)] border border-black/10 active:scale-95 cursor-pointer"
                  >
                    <span>{activeFeature.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0E]" />
                  </Link>
                </div>
              </div>

              {/* ── RIGHT: Dedicated High-Fidelity Spacious Visual ── */}
              <div className="lg:col-span-6 relative flex items-center justify-center w-full">
                {activeFeature.visualType === "escrow" && (
                  <div className="w-full max-w-full sm:max-w-[440px] p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FBFBFD] border border-black/[0.08] shadow-lg relative overflow-hidden">
                    <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center font-bold">
                          <Lock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-[#7A7A8A] font-bold">ESCROW VAULT</p>
                          <p className="text-sm font-extrabold text-[#0A0A0E]">Milestone Protected</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-700">
                        100% SECURE
                      </span>
                    </div>

                    <div className="my-5 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#FFFDF0] via-white to-[#FFFDF0] border border-[#FFD21F]/30 text-center space-y-1.5 relative overflow-hidden shadow-2xs">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD21F]/15 rounded-full blur-2xl pointer-events-none" />
                      <p className="text-[10px] font-mono text-[#0A0A0E] font-bold uppercase tracking-wider">Escrow Funds Reserved</p>
                      <h4 className="text-3xl sm:text-4xl font-black font-mono text-[#0A0A0E]">₹1,25,000</h4>
                      <p className="text-[10.5px] font-mono text-emerald-700 font-bold">
                        ✓ Deposited by Snitch India • Campaign #AC-884
                      </p>
                    </div>

                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-black/[0.06]">
                        <span className="text-[#6A6A78]">Milestone 1: Reel Draft</span>
                        <span className="text-emerald-700 font-bold">₹50,000 (Released)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-xl bg-white border border-black/[0.06]">
                        <span className="text-[#6A6A78]">Milestone 2: Live Metrics</span>
                        <span className="text-amber-600 font-bold">₹75,000 (Locked)</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeFeature.visualType === "dm" && (
                  <div className="w-full max-w-full sm:max-w-[440px] p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FBFBFD] border border-black/[0.08] shadow-lg space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF] text-white flex items-center justify-center font-bold text-xs">
                          IG
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0A0A0E]">Instagram Direct</p>
                          <p className="text-[10px] font-mono text-emerald-700 font-bold">● Active Auto-Response</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#7A7A8A]">Meta Verified</span>
                    </div>

                    <div className="space-y-3 text-xs">
                      {/* Incoming comment */}
                      <div className="p-3 rounded-2xl bg-white border border-black/[0.06] shadow-2xs space-y-1">
                        <p className="text-[10px] font-mono text-[#7A7A8A]">@plumgoodness commented on your reel:</p>
                        <p className="font-semibold text-[#0A0A0E]">&ldquo;Hey! Loved this review. Can we get your rates for a 3-reel series?&rdquo;</p>
                      </div>

                      {/* Auto-DM Response */}
                      <div className="p-3.5 rounded-2xl bg-gradient-to-b from-[#FFFDF0] via-white to-[#FFFDF0] border border-[#FFD21F]/35 text-[#0A0A0E] space-y-2 shadow-2xs">
                        <div className="flex items-center justify-between text-[10px] font-mono text-amber-800 font-bold">
                          <span className="flex items-center gap-1">
                            <Send className="w-3 h-3 text-amber-600" />
                            <span>Auto-Sent in 1.8 seconds</span>
                          </span>
                          <span className="text-emerald-700 font-bold">Delivered</span>
                        </div>
                        <p className="text-xs text-[#2A2A38] leading-relaxed">
                          &ldquo;Hi team Plum! Here is my live media kit, previous beauty deliverables, and 1-click escrow booking link: abeycollab.com/creator/vasudha&rdquo;
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {activeFeature.visualType === "mediakit" && (
                  <div className="w-full max-w-full sm:max-w-[440px] p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FBFBFD] border border-black/[0.08] shadow-lg space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full overflow-hidden relative border-2 border-white shadow-xs">
                          <SafeImage src="/creators/vasudha-rai.jpg" alt="Vasudha" fill className="object-cover" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0A0A0E]">Vasudha Rai</p>
                          <p className="text-[10px] font-mono text-[#7A7A8A]">@vasudha.rai • Beauty &amp; Wellness</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-mono font-bold">
                        Audited
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="p-2.5 rounded-xl bg-white border border-black/[0.06]">
                        <p className="text-base font-black text-[#0A0A0E] font-mono">115K</p>
                        <p className="text-[9.5px] font-mono text-[#7A7A8A]">Reach</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-black/[0.06]">
                        <p className="text-base font-black text-emerald-700 font-mono">5.8%</p>
                        <p className="text-[9.5px] font-mono text-[#7A7A8A]">Engagement</p>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-black/[0.06]">
                        <p className="text-base font-black text-[#0A0A0E] font-mono">₹45,000</p>
                        <p className="text-[9.5px] font-mono text-[#7A7A8A]">Starting Rate</p>
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-between text-xs">
                      <span className="font-semibold text-[#0A0A0E]">Instagram Dedicated Reel</span>
                      <span className="font-mono font-bold text-[#0A0A0E]">₹45,000 INR</span>
                    </div>
                  </div>
                )}

                {activeFeature.visualType === "brands" && (
                  <div className="w-full max-w-full sm:max-w-[440px] p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-[#FBFBFD] border border-black/[0.08] shadow-lg space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-black/[0.06]">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-[#FFF9E6] border border-[#FFD21F]/40 text-[#0A0A0E] flex items-center justify-center font-bold text-xs">
                          AC
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#0A0A0E]">Active Brand Briefs</p>
                          <p className="text-[10px] font-mono text-emerald-700 font-bold">250+ Verified Sponsors</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#7A7A8A]">Pre-Funded</span>
                    </div>

                    <div className="space-y-2.5">
                      {[
                        { brand: "Snitch", brief: "Festive Streetwear Reel Series", budget: "₹1,50,000", cat: "Men's Fashion" },
                        { brand: "Plum Goodness", brief: "Vitamin C Serums Routine", budget: "₹85,000", cat: "Skincare" },
                        { brand: "Boldfit India", brief: "Protein Isolate Transformation", budget: "₹60,000", cat: "Fitness" },
                      ].map((item, i) => (
                        <div key={i} className="p-3 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-between gap-3">
                          <div className="min-w-0">
                            <span className="text-[9.5px] font-mono text-[#7A7A8A] uppercase font-bold">{item.brand}</span>
                            <p className="text-xs font-bold text-[#0A0A0E] truncate">{item.brief}</p>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-xs font-mono font-extrabold shrink-0">
                            {item.budget}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
