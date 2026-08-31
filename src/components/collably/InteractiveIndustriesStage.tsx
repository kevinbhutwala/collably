"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Layers,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
} from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function InteractiveIndustriesStage() {
  const industries = [
    {
      id: "fitness",
      name: "Fitness & Wellness",
      badge: "Highest Engagement",
      brief: "Launch 10 calisthenics & gym training Reels showcasing plant-based protein powder.",
      budget: "$22,000",
      avgER: "6.8%",
      roi: "5.2×",
      creators: [
        { name: "Siddharth Nair", followers: "420K", er: "6.8%", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80" },
        { name: "Pooja Hegde", followers: "285K", er: "7.2%", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80" },
      ],
    },
    {
      id: "tech",
      name: "Technology & SaaS",
      badge: "B2B / Developer Focus",
      brief: "Explain AI-powered developer tool workflow in 60-second YouTube integrations.",
      budget: "$35,000",
      avgER: "5.4%",
      roi: "4.6×",
      creators: [
        { name: "Marcus Vance", followers: "890K", er: "5.4%", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80" },
        { name: "Elena Rostova", followers: "485K", er: "6.4%", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80" },
      ],
    },
    {
      id: "beauty",
      name: "Beauty & Cosmetics",
      badge: "High Conversion",
      brief: "4K close-up skincare routine and honest ingredient review for clean beauty line.",
      budget: "$18,500",
      avgER: "7.9%",
      roi: "6.1×",
      creators: [
        { name: "Chloe Dubois", followers: "340K", er: "7.9%", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80" },
        { name: "Aria Chen", followers: "310K", er: "5.9%", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80" },
      ],
    },
    {
      id: "fashion",
      name: "Fashion & Apparel",
      badge: "D2C Streetwear",
      brief: "Lookbook styling videos with dynamic swipe-up promo codes and haul reels.",
      budget: "$26,000",
      avgER: "6.1%",
      roi: "4.4×",
      creators: [
        { name: "Devon Thorne", followers: "620K", er: "7.8%", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80" },
        { name: "Siddharth Nair", followers: "420K", er: "6.8%", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80" },
      ],
    },
    {
      id: "food",
      name: "Food & Beverage",
      badge: "Sensory / ASMR",
      brief: "4K ASMR recipe creation featuring organic artisanal cold-pressed juices.",
      budget: "$15,000",
      avgER: "8.4%",
      roi: "5.8×",
      creators: [
        { name: "Pooja Hegde", followers: "285K", er: "7.2%", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80" },
        { name: "Chloe Dubois", followers: "340K", er: "7.9%", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80" },
      ],
    },
    {
      id: "travel",
      name: "Travel & Hospitality",
      badge: "Cinematic 4K Drone",
      brief: "Luxury boutique resort showcase with drone sweeps and experiential storytelling.",
      budget: "$40,000",
      avgER: "7.1%",
      roi: "4.9×",
      creators: [
        { name: "Devon Thorne", followers: "620K", er: "7.8%", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80" },
        { name: "Elena Rostova", followers: "485K", er: "6.4%", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80" },
      ],
    },
  ];

  const [selectedInd, setSelectedInd] = useState(industries[0]);

  return (
    <section className="py-24 sm:py-28 bg-slate-50/50 border-b border-slate-200 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/80 text-xs font-mono font-bold text-brand-accent shadow-xs">
            <Layers className="w-3.5 h-3.5 text-brand-accent" />
            <span>12 • Multi-Category Expertise</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["tailored", "verticals", "collably"]}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans leading-tight"
          >
            Built for high-performing industry verticals.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["benchmarks", "rosters", "briefs"]}
            className="text-sm sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Switch industries to preview dynamic campaign briefs, verified talent rosters, and performance benchmarks.
          </ScrollRevealText>
        </div>

        {/* Industry Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          {industries.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setSelectedInd(ind)}
              className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all ${
                selectedInd.id === ind.id
                  ? "bg-slate-900 text-white shadow-md scale-105"
                  : "bg-white border border-slate-200 text-slate-700 hover:border-slate-300 shadow-xs"
              }`}
            >
              {ind.name}
            </button>
          ))}
        </div>

        {/* Dynamic Showcase Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedInd.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto rounded-3xl bg-white border border-slate-200 shadow-card p-6 sm:p-10 space-y-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <span className="text-xs font-mono font-bold text-brand-accent uppercase">
                  {selectedInd.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-sans">
                  {selectedInd.name} Campaign Matrix
                </h3>
              </div>
              <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-xs font-bold text-slate-800">
                Recommended Budget: {selectedInd.budget}
              </span>
            </div>

            {/* Campaign Brief Showcase */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400">SAMPLE CAMPAIGN BRIEF</span>
              <p className="text-xs sm:text-sm text-slate-900 font-semibold leading-relaxed">
                &ldquo;{selectedInd.brief}&rdquo;
              </p>
            </div>

            {/* Recommended Creator Lineup */}
            <div className="space-y-3">
              <span className="text-xs font-mono uppercase font-bold text-slate-500 block">
                MATCHED TALENT EXAMPLES
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedInd.creators.map((c) => (
                  <div
                    key={c.name}
                    className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-10 h-10 rounded-xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900 font-sans">{c.name}</h4>
                        <span className="text-[11px] text-slate-500 font-mono">{c.followers} followers</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono font-bold text-xs">
                      {c.er} ER
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Metrics Footer */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-100 font-mono text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-slate-400 block text-[10px]">AVG ENGAGEMENT</span>
                <span className="font-bold text-slate-900 text-sm">{selectedInd.avgER}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-slate-400 block text-[10px]">EXPECTED ROI</span>
                <span className="font-bold text-emerald-600 text-sm">{selectedInd.roi}</span>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                <span className="text-slate-400 block text-[10px]">TURNAROUND SLA</span>
                <span className="font-bold text-slate-900 text-sm">&lt; 7 Days</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
