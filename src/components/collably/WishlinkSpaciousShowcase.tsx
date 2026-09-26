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
  DollarSign,
  Star,
  ExternalLink,
  Lock,
  Layers,
  Award,
} from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";

interface FeatureItem {
  id: string;
  tabLabel: string;
  tagline: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
  badge: string;
  badgeColor: string;
  points: string[];
  ctaText: string;
  ctaLink: string;
  visualType: "escrow" | "brands" | "dm" | "mediakit" | "analytics" | "community";
}

const FEATURES: FeatureItem[] = [
  {
    id: "monetize",
    tabLabel: "100% Monetisation",
    tagline: "ESCROW-BACKED PAYOUTS",
    titlePrefix: "Monetize",
    titleHighlight: "100%",
    titleSuffix: "of your content with guaranteed escrow",
    description:
      "Stop chasing brands for unpaid invoices. Funds are deposited into safe escrow before you record a single second of content, and released automatically within 24 hours of approval.",
    badge: "0% INVOICE CHASING",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    points: [
      "100% milestone funds locked in Razorpay Escrow",
      "Automated bank payout within 24 hours of approval",
      "Zero platform commission cuts on verified creator rates",
    ],
    ctaText: "Sign up to Monetize",
    ctaLink: "/creator/register",
    visualType: "escrow",
  },
  {
    id: "brands",
    tabLabel: "250+ Top Brands",
    tagline: "DIRECT BRAND COLLABORATIONS",
    titlePrefix: "Connect & collaborate with",
    titleHighlight: "250+ Leading Brands",
    titleSuffix: "without middlemen",
    description:
      "Pitch directly to verified campaigns from Snitch, Plum, Boldfit, DermaCo, and Nothing. No talent agencies taking 40% cuts. Transparent campaign budgets and instant contracts.",
    badge: "DIRECT ACCESS",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
    points: [
      "Verified brand briefs with upfront fixed budgets",
      "One-click pitch submission with verified past performance",
      "Zero ghosting guarantee with 48h brand response SLA",
    ],
    ctaText: "Sign up to Partner",
    ctaLink: "/creator/register",
    visualType: "brands",
  },
  {
    id: "autodm",
    tabLabel: "Auto-DM Engine",
    tagline: "SMART ENGAGEMENT AUTOMATION",
    titlePrefix: "Unlock the power of",
    titleHighlight: "Automated Engagement",
    titleSuffix: "in your DMs",
    description:
      "When followers or brand managers comment on your Instagram Reels, AbeyCollab automatically delivers your media kit, collaboration rates, or product links directly to their DMs in under 3 seconds.",
    badge: "META BUSINESS PARTNER",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
    points: [
      "Instant DM delivery when users comment keywords like 'COLLAB' or 'LINK'",
      "3.8x higher brand deal conversion than manual email replies",
      "100% compliant with Instagram Meta Graph API guidelines",
    ],
    ctaText: "Sign up for Auto-DM",
    ctaLink: "/creator/register",
    visualType: "dm",
  },
  {
    id: "mediakit",
    tabLabel: "Media Kit & Shop",
    tagline: "STANDALONE STOREFRONT",
    titlePrefix: "Personalized",
    titleHighlight: "Creator Media Kit",
    titleSuffix: "and storefront",
    description:
      "Replace clunky PDF rate cards with a live, audited link-in-bio page. Brands can view your real-time reach, previous brand deliverables, verified reviews, and book deals instantly.",
    badge: "LIVE AUDITED STATS",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
    points: [
      "Live verified reach, demographics, and engagement rates",
      "Instant booking calendar with pre-funded milestone escrow",
      "Showcase previous 4K video deliveries and brand testimonials",
    ],
    ctaText: "Sign up for Your Media Kit",
    ctaLink: "/creator/register",
    visualType: "mediakit",
  },
  {
    id: "analytics",
    tabLabel: "Live Analytics",
    tagline: "REAL-TIME CAMPAIGN INTELLIGENCE",
    titlePrefix: "A dashin'",
    titleHighlight: "Analytics Dashboard",
    titleSuffix: "built for high earners",
    description:
      "Track your cumulative earnings, active escrows, top-performing brand reels, and upcoming milestone deliverables in one clean, clutter-free dashboard.",
    badge: "REAL-TIME DATA",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
    points: [
      "Live escrow pipeline: Pending, Active, and Cleared payouts",
      "ROI and engagement breakdown per brand collaboration",
      "Instant tax invoices and GST-compliant payout statements",
    ],
    ctaText: "Sign up to View Dashboard",
    ctaLink: "/creator/register",
    visualType: "analytics",
  },
  {
    id: "community",
    tabLabel: "Creator Community",
    tagline: "EXCLUSIVE TALENT NETWORK",
    titlePrefix: "Exclusive",
    titleHighlight: "Creator Community",
    titleSuffix: "of 15,000+ top talents",
    description:
      "Join private mastermind groups, participate in co-creator campaigns, learn monetization secrets from creators making 7 figures, and attend invite-only brand mixer events.",
    badge: "15,000+ MEMBERS",
    badgeColor: "bg-orange-50 text-orange-800 border-orange-200",
    points: [
      "Weekly creator masterclasses on rate negotiation and viral hooks",
      "Brand gifting drops and free product sampling packages",
      "Private Discord and WhatsApp VIP creator channels",
    ],
    ctaText: "Sign up to Join Community",
    ctaLink: "/creator/register",
    visualType: "community",
  },
];

export function WishlinkSpaciousShowcase() {
  const [activeTabId, setActiveTabId] = useState("monetize");
  const activeFeature = FEATURES.find((f) => f.id === activeTabId) || FEATURES[0];

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5]/70 border-t border-black/6 select-none font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#E98415]" />
            <span className="text-xs font-mono font-extrabold uppercase text-[#0A0A0E] tracking-tight">
              WISHLINK ESSENTIALS
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-[#0A0A0E] font-display tracking-tight leading-[1.1]">
            Unlock the influence and{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] to-[#E98415] underline decoration-[#FFD21F] decoration-4 underline-offset-4">
              maximize your earnings
            </span>
          </h2>

          <p className="text-base sm:text-lg text-[#5A5A68] max-w-2xl mx-auto">
            Everything you need to collaborate with top brands, automate your social media engagement, and get paid on time.
          </p>
        </div>

        {/* Clean Pill Tab Switcher */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-12 sm:mb-16 no-scrollbar gap-2 sm:gap-3">
          {FEATURES.map((item) => {
            const isActive = item.id === activeTabId;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTabId(item.id)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-[#0A0A0E] text-white shadow-md scale-102"
                    : "bg-white text-[#5A5A68] hover:text-[#0A0A0E] border border-black/8 hover:bg-[#F2F1EC]"
                }`}
              >
                {isActive && <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />}
                <span>{item.tabLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Main Spacious Feature Card (Generous Padding & Big Visual) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFeature.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="p-8 sm:p-12 lg:p-16 rounded-3xl sm:rounded-[36px] bg-white border border-black/8 shadow-xl shadow-black/4"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* ── LEFT: Typography & Explanations ── */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-mono font-extrabold uppercase border ${activeFeature.badgeColor}`}
                  >
                    {activeFeature.badge}
                  </span>
                  <span className="text-xs font-mono text-[#7A7A8A] font-semibold uppercase">
                    {activeFeature.tagline}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0E] font-display tracking-tight leading-[1.1]">
                  {activeFeature.titlePrefix}{" "}
                  <span className="text-[#E98415] underline decoration-[#FFD21F] decoration-4 underline-offset-4">
                    {activeFeature.titleHighlight}
                  </span>{" "}
                  {activeFeature.titleSuffix}
                </h3>

                <p className="text-base sm:text-lg text-[#5A5A68] leading-relaxed">
                  {activeFeature.description}
                </p>

                {/* Key Points */}
                <div className="space-y-3 pt-2">
                  {activeFeature.points.map((pt, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-500/15 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm font-semibold text-[#0A0A0E]">{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Direct CTA Button */}
                <div className="pt-4">
                  <Link
                    href={activeFeature.ctaLink}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#0A0A0E] hover:bg-[#202028] text-white font-extrabold text-sm sm:text-base transition-all shadow-md active:scale-95"
                  >
                    <span>{activeFeature.ctaText}</span>
                    <ArrowRight className="w-4 h-4 text-[#FFD21F]" />
                  </Link>
                </div>
              </div>

              {/* ── RIGHT: Dedicated High-Fidelity Spacious Visual ── */}
              <div className="lg:col-span-6 relative flex items-center justify-center">
                {activeFeature.visualType === "escrow" && (
                  <div className="w-full max-w-[460px] p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#FAF9F5] to-white border border-black/10 shadow-2xl relative overflow-hidden">
                    <div className="flex items-center justify-between pb-6 border-b border-black/8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center font-bold">
                          <Lock className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-mono text-[#7A7A8A] font-bold">ESCROW VAULT</p>
                          <p className="text-base font-extrabold text-[#0A0A0E]">Milestone Protected</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-700">
                        100% SECURE
                      </span>
                    </div>

                    <div className="my-6 p-6 rounded-2xl bg-[#0A0A0E] text-white text-center space-y-2 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD21F]/20 rounded-full blur-2xl pointer-events-none" />
                      <p className="text-xs font-mono text-white/70 uppercase">Funds Waiting for You</p>
                      <h4 className="text-4xl font-black font-mono text-[#FFD21F]">₹1,25,000</h4>
                      <p className="text-[11px] font-mono text-emerald-400 font-semibold">
                        ✓ Deposited by Snitch India • Campaign #AC-884
                      </p>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-black/6">
                        <span className="text-[#5A5A68]">1. Campaign Brief Accepted</span>
                        <span className="font-bold text-emerald-600">✓ Done</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-black/6">
                        <span className="text-[#5A5A68]">2. 4K Video Draft Approved</span>
                        <span className="font-bold text-emerald-600">✓ Approved</span>
                      </div>
                      <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
                        <span className="font-bold">3. 24h Payout Released</span>
                        <span className="font-extrabold text-emerald-700">₹1,25,000 In Bank</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeFeature.visualType === "brands" && (
                  <div className="w-full max-w-[460px] space-y-4">
                    {[
                      {
                        brand: "Snitch",
                        category: "Men's Apparel",
                        budget: "₹45,000",
                        deliverable: "1x Reel + 2x Stories",
                        logo: "👔",
                        status: "Instant Escrow",
                      },
                      {
                        brand: "Plum Goodness",
                        category: "Clean Beauty",
                        budget: "₹65,000",
                        deliverable: "Dedicated YouTube Review",
                        logo: "✨",
                        status: "Verified Deal",
                      },
                      {
                        brand: "Boldfit",
                        category: "Fitness & Nutrition",
                        budget: "₹50,000",
                        deliverable: "Workout Transformation Reel",
                        logo: "⚡️",
                        status: "Pre-Funded",
                      },
                      {
                        brand: "Nothing India",
                        category: "Consumer Tech",
                        budget: "₹85,000",
                        deliverable: "Ear (open) Launch Brief",
                        logo: "🎧",
                        status: "High Budget",
                      },
                    ].map((deal, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-2xl bg-white border border-black/8 shadow-sm flex items-center justify-between hover:border-[#E98415] hover:shadow-md transition-all group"
                      >
                        <div className="flex items-center gap-3.5">
                          <div className="w-12 h-12 rounded-xl bg-[#FAF9F5] border border-black/6 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                            {deal.logo}
                          </div>
                          <div className="text-left font-sans">
                            <div className="flex items-center gap-2">
                              <h5 className="font-bold text-[#0A0A0E] text-base">{deal.brand}</h5>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-800 font-bold">
                                {deal.status}
                              </span>
                            </div>
                            <p className="text-xs text-[#5A5A68]">{deal.deliverable}</p>
                          </div>
                        </div>
                        <div className="text-right font-mono">
                          <span className="text-sm font-extrabold text-[#0A0A0E] block">{deal.budget}</span>
                          <span className="text-[10px] text-emerald-600 font-bold">Escrow Verified</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeFeature.visualType === "dm" && (
                  <div className="w-full max-w-[420px] p-6 rounded-3xl bg-white border border-black/10 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-black/8">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-400" />
                        <div className="w-3 h-3 rounded-full bg-yellow-400" />
                        <div className="w-3 h-3 rounded-full bg-green-400" />
                        <span className="text-xs font-mono font-bold text-[#7A7A8A] ml-2">
                          Instagram Direct Message
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                        ⚡️ 2.4s Auto-Reply
                      </span>
                    </div>

                    <div className="space-y-3 font-sans text-xs">
                      {/* Incoming comment */}
                      <div className="p-3.5 rounded-2xl bg-[#F4F4F8] text-left space-y-1">
                        <p className="font-bold text-[#0A0A0E] flex items-center gap-1.5">
                          <span>@snitch_marketing</span>
                          <span className="text-[10px] text-[#7A7A8A] font-normal">commented:</span>
                        </p>
                        <p className="text-sm text-[#0A0A0E] font-medium">
                          “Loved this look! Where can we send the collab brief? 📩”
                        </p>
                      </div>

                      {/* Automated instant DM reply */}
                      <div className="p-4 rounded-2xl bg-gradient-to-r from-[#0A0A0E] to-[#202028] text-white text-left space-y-2 ml-4 shadow-lg">
                        <p className="font-bold text-[#FFD21F] flex items-center gap-1.5 text-xs">
                          <Zap className="w-3.5 h-3.5" />
                          <span>AbeyCollab Engage Bot:</span>
                        </p>
                        <p className="text-xs text-white/90 leading-relaxed">
                          “Hey Snitch team! Thanks for reaching out. Here is my verified Media Kit &amp; Rate Card with 100% Escrow Protection:”
                        </p>
                        <div className="p-2.5 rounded-xl bg-white/10 border border-white/20 flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold text-[#FFD21F]">
                            abeycollab.com/@prarthana
                          </span>
                          <ExternalLink className="w-3.5 h-3.5 text-white/80" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeFeature.visualType === "mediakit" && (
                  <div className="w-full max-w-[440px] p-6 rounded-3xl bg-white border border-black/10 shadow-2xl space-y-5 text-left">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden relative border-2 border-[#FFD21F] shadow-sm">
                        <SafeImage
                          src="/creators/vasudha-rai.jpg"
                          alt="Vasudha Rai"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-lg font-black text-[#0A0A0E]">Vasudha Rai</h4>
                          <CheckCircle2 className="w-4 h-4 text-[#FFD21F] fill-[#0A0A0E]" />
                        </div>
                        <p className="text-xs font-mono text-[#5A5A68]">Beauty &amp; Skincare Specialist</p>
                        <p className="text-xs font-mono text-emerald-600 font-bold">115K Verified Reach</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
                      <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-black/6">
                        <span className="text-[10px] text-[#7A7A8A] block">Avg Views</span>
                        <span className="text-sm font-extrabold text-[#0A0A0E]">45.2K</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-black/6">
                        <span className="text-[10px] text-[#7A7A8A] block">Engagement</span>
                        <span className="text-sm font-extrabold text-emerald-600">6.8%</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-[#FAF9F5] border border-black/6">
                        <span className="text-[10px] text-[#7A7A8A] block">Deals Done</span>
                        <span className="text-sm font-extrabold text-[#0A0A0E]">28</span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-[#FAF9F5] border border-black/6 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-[#0A0A0E] block">Reel + Story Package</span>
                        <span className="text-[11px] text-[#5A5A68]">Delivered in 4K with Escrow</span>
                      </div>
                      <span className="text-base font-black font-mono text-[#0A0A0E]">₹65,000</span>
                    </div>

                    <button
                      type="button"
                      className="w-full py-3 rounded-full bg-[#FFD21F] hover:bg-[#FFE052] text-[#0A0A0E] font-bold text-xs font-mono uppercase tracking-wider transition-all"
                    >
                      Book Collaboration via Escrow
                    </button>
                  </div>
                )}

                {activeFeature.visualType === "analytics" && (
                  <div className="w-full max-w-[460px] p-6 rounded-3xl bg-white border border-black/10 shadow-2xl space-y-5 text-left font-sans">
                    <div className="flex items-center justify-between pb-3 border-b border-black/8">
                      <div>
                        <p className="text-xs font-mono text-[#7A7A8A]">Total Creator Revenue</p>
                        <h4 className="text-3xl font-black font-mono text-[#0A0A0E]">₹3,45,000</h4>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        +24.6% this month
                      </span>
                    </div>

                    {/* Simulated Clean Chart Bars */}
                    <div className="space-y-2">
                      <p className="text-xs font-mono text-[#7A7A8A]">Campaign Performance Distribution</p>
                      <div className="h-24 w-full bg-[#FAF9F5] rounded-2xl p-3 flex items-end justify-between gap-2">
                        {[40, 65, 55, 80, 70, 95, 85].map((val, idx) => (
                          <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                            <div
                              style={{ height: `${val}%` }}
                              className="w-full rounded-md bg-gradient-to-t from-[#0A0A0E] to-[#FFD21F]"
                            />
                            <span className="text-[9px] font-mono text-[#7A7A8A]">W{idx + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                      <div className="p-3 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
                        <span className="block text-[10px] uppercase font-bold text-amber-700">In Escrow</span>
                        <span className="text-sm font-extrabold">₹95,000</span>
                      </div>
                      <div className="p-3 rounded-xl bg-emerald-50 text-emerald-900 border border-emerald-200">
                        <span className="block text-[10px] uppercase font-bold text-emerald-700">Bank Disbursed</span>
                        <span className="text-sm font-extrabold">₹2,50,000</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeFeature.visualType === "community" && (
                  <div className="w-full max-w-[450px] p-6 sm:p-8 rounded-3xl bg-[#FAF9F5] border border-black/10 shadow-2xl space-y-6 text-center">
                    <div className="inline-flex p-3 rounded-2xl bg-[#FFD21F] text-[#0A0A0E] shadow-sm">
                      <Users className="w-8 h-8 text-[#0A0A0E]" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-black text-[#0A0A0E] font-display">
                        15,000+ Indian Creators
                      </h4>
                      <p className="text-xs sm:text-sm text-[#5A5A68]">
                        Connecting, sharing rate benchmarks, and pitching co-branded campaigns every single day.
                      </p>
                    </div>

                    {/* Creator Avatar Stack */}
                    <div className="flex items-center justify-center -space-x-3 py-2">
                      {[
                        "/creators/prarthana.jpg",
                        "/creators/vasudha-rai.jpg",
                        "/creators/kunal-rajput.jpg",
                        "/creators/chetali-chadha.jpg",
                        "/creators/tanya-singh.jpg",
                        "/creators/kusha-kapila.jpg",
                      ].map((img, i) => (
                        <div
                          key={i}
                          className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md relative"
                        >
                          <SafeImage src={img} alt="Creator" fill className="object-cover" />
                        </div>
                      ))}
                    </div>

                    <div className="p-3 rounded-xl bg-white border border-black/8 text-xs font-mono font-bold text-[#0A0A0E] flex items-center justify-between">
                      <span>Next Masterclass: Scaling from 10k to 100k</span>
                      <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                        FREE FOR CREATORS
                      </span>
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
