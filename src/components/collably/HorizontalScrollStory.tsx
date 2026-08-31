"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  Sparkles,
  Users,
  Video,
  CheckCircle2,
  Lock,
  BarChart3,
  ArrowRight,
} from "lucide-react";

export function HorizontalScrollStory() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Transform vertical scroll into horizontal translation percentage (-75%)
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-82%"]);

  const cards = [
    {
      num: "01",
      tag: "DISCOVER",
      title: "Find creators who actually fit.",
      desc: "Filter through verified engagement rates, audience locations, and transparent historical pricing.",
      icon: Search,
      color: "from-orange-500 to-rose-500",
      accent: "bg-orange-50 text-brand-accent border-orange-200",
      ui: (
        <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono">
          <div className="flex justify-between items-center text-slate-700">
            <span>Tech &amp; SaaS Creators</span>
            <span className="font-bold text-brand-accent">2,480 Active</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-brand-accent h-full w-4/5" />
          </div>
        </div>
      ),
    },
    {
      num: "02",
      tag: "MATCH",
      title: "AI-powered creator matching.",
      desc: "Our matching engine scores brand fit, audience overlap, and historical delivery speed with 94%+ precision.",
      icon: Sparkles,
      color: "from-rose-500 to-pink-500",
      accent: "bg-pink-50 text-rose-600 border-pink-200",
      ui: (
        <div className="p-3 bg-rose-50/60 rounded-2xl border border-rose-200/80 text-xs font-mono space-y-1.5">
          <div className="flex justify-between">
            <span className="text-slate-600">Compatibility Score:</span>
            <span className="font-extrabold text-emerald-600">96.4% Match</span>
          </div>
          <div className="text-[10px] text-slate-500">Audience Alignment: 98% • Budget Fit: 100%</div>
        </div>
      ),
    },
    {
      num: "03",
      tag: "COLLABORATE",
      title: "One workspace. Zero chaos.",
      desc: "Contracts, NDAs, usage rights, and brief terms negotiated in a unified, transparent timeline.",
      icon: Users,
      color: "from-pink-500 to-purple-500",
      accent: "bg-purple-50 text-purple-600 border-purple-200",
      ui: (
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono flex items-center justify-between">
          <span className="text-slate-700 font-bold">Standard Creator Agreement</span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            Signed &amp; Locked
          </span>
        </div>
      ),
    },
    {
      num: "04",
      tag: "CREATE",
      title: "Briefs, deliverables, approvals.",
      desc: "Creators upload uncompressed 4K master cuts directly into the project canvas for automated frame indexing.",
      icon: Video,
      color: "from-purple-500 to-indigo-500",
      accent: "bg-indigo-50 text-indigo-600 border-indigo-200",
      ui: (
        <div className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-200/80 text-xs font-mono space-y-1">
          <span className="text-indigo-950 font-bold block">4K Master_Cut_v2.mp4</span>
          <span className="text-[10px] text-slate-500">Transcoded in 60fps • 4K Frame Indexed</span>
        </div>
      ),
    },
    {
      num: "05",
      tag: "APPROVE",
      title: "Review everything in one place.",
      desc: "Frame-accurate timestamps, visual annotations, and 1-click commercial sign-off without endless email chains.",
      icon: CheckCircle2,
      color: "from-indigo-500 to-cyan-500",
      accent: "bg-cyan-50 text-cyan-700 border-cyan-200",
      ui: (
        <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs font-mono flex items-center justify-between">
          <span className="text-emerald-950 font-bold">Deliverable Signed Off</span>
          <span className="text-emerald-700 font-bold">1-Click Approved</span>
        </div>
      ),
    },
    {
      num: "06",
      tag: "PAY",
      title: "Milestones protect everyone.",
      desc: "Funds are pre-locked in escrow before filming begins and released automatically via Stripe Connect upon sign-off.",
      icon: Lock,
      color: "from-cyan-500 to-emerald-500",
      accent: "bg-emerald-50 text-emerald-700 border-emerald-200",
      ui: (
        <div className="p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs font-mono space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-700 font-bold">Stripe Connect Payout</span>
            <span className="font-extrabold text-emerald-600">$2,880.00 Disbursed</span>
          </div>
          <span className="text-[10px] text-slate-500">Net 90 Delay: 0 Days</span>
        </div>
      ),
    },
    {
      num: "07",
      tag: "MEASURE",
      title: "Know what actually worked.",
      desc: "Real-time engagement telemetry, verified link clicks, promo code conversions, and verifiable campaign ROI.",
      icon: BarChart3,
      color: "from-emerald-500 via-teal-500 to-brand-accent",
      accent: "bg-orange-50 text-brand-accent border-orange-200",
      ui: (
        <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs font-mono flex justify-between items-center">
          <span className="text-slate-700 font-bold">Campaign Performance</span>
          <span className="text-emerald-600 font-extrabold">4.8× Verified ROI</span>
        </div>
      ),
    },
  ];

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-slate-900 text-white select-none">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Top Eyebrow Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-orange-400 font-bold">
              05 • The End-To-End Journey
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-sans">
              From brief to payout. One continuous flow.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-mono">
            Scroll vertically to scrub through horizontal stages &rarr;
          </p>
        </div>

        {/* Horizontal Moving Cards Track */}
        <motion.div style={{ x }} className="flex gap-6 pl-4 sm:pl-12">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.num}
                className="w-[300px] sm:w-[380px] md:w-[440px] shrink-0 p-6 sm:p-8 rounded-3xl bg-slate-800/90 border border-slate-700/80 shadow-2xl flex flex-col justify-between space-y-6 group hover:border-slate-500 transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono font-black text-slate-500 group-hover:text-white transition-colors">
                      {card.num}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-mono font-bold border ${card.accent}`}>
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug font-sans">
                    {card.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-sans">
                    {card.desc}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-slate-700 to-slate-800 border border-slate-600 flex items-center justify-center text-white">
                    <Icon className="w-5 h-5" />
                  </div>
                  {card.ui}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
