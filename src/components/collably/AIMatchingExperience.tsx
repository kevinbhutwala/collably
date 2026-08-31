"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Search,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  UserPlus,
  Sliders,
  Check,
} from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function AIMatchingExperience() {
  const presets = [
    "20 Indian fitness creators under ₹15K per Reel with >5% engagement",
    "Tech & AI storytellers for SaaS launch with high US/UK audience",
    "Beauty & Skincare video creators in Mumbai & Delhi with 80%+ female demo",
  ];

  const [query, setQuery] = useState(presets[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStage, setProcessStage] = useState(0);
  const [invited, setInvited] = useState<Record<string, boolean>>({});

  const processStages = [
    "ANALYZING NATURAL LANGUAGE CRITERIA...",
    "FILTERING 50,000+ VERIFIED RATE CARDS...",
    "SCORING ENGAGEMENT AUTHENTICITY...",
    "MATCHING AUDIENCE DEMOGRAPHICS...",
  ];

  const results = [
    {
      id: "c1",
      name: "Siddharth Nair",
      handle: "@siddharth.fits",
      category: "Fitness & Wellness",
      location: "Bengaluru, India",
      followers: "420K",
      er: "6.8%",
      avgRate: "₹14,500",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
      matchScore: 96,
      subscores: {
        audience: 97,
        engagement: 94,
        budget: 99,
        brandFit: 95,
      },
    },
    {
      id: "c2",
      name: "Pooja Hegde",
      handle: "@pooja.movement",
      category: "Calisthenics & Yoga",
      location: "Mumbai, India",
      followers: "285K",
      er: "7.2%",
      avgRate: "₹12,000",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
      matchScore: 94,
      subscores: {
        audience: 96,
        engagement: 91,
        budget: 98,
        brandFit: 93,
      },
    },
    {
      id: "c3",
      name: "Aman Sharma",
      handle: "@aman.athletes",
      category: "Strength & Nutrition",
      location: "Delhi NCR, India",
      followers: "510K",
      er: "5.9%",
      avgRate: "₹15,000",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=160&auto=format&fit=crop&q=80",
      matchScore: 92,
      subscores: {
        audience: 92,
        engagement: 90,
        budget: 95,
        brandFit: 94,
      },
    },
  ];

  const handleRunQuery = () => {
    setIsProcessing(true);
    setProcessStage(0);

    const interval = setInterval(() => {
      setProcessStage((prev) => {
        if (prev >= 3) {
          clearInterval(interval);
          setIsProcessing(false);
          return 3;
        }
        return prev + 1;
      });
    }, 450);
  };

  const handleInvite = (id: string) => {
    setInvited((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-24 sm:py-28 bg-white border-b border-slate-200 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/80 text-xs font-mono font-bold text-brand-accent shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
            <span>06 • Precision AI Creator Discovery</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["ai-powered", "creator", "matching", "collably"]}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans leading-tight"
          >
            AI-powered creator matching that actually works.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["natural", "language", "engagement", "budget"]}
            className="text-sm sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Describe your campaign requirements in natural language. Match by real audience demographics, genuine engagement, and verified budgets.
          </ScrollRevealText>
        </div>

        {/* Interactive Query Terminal Stage */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-3 sm:p-4 rounded-3xl bg-slate-900 text-white shadow-2xl space-y-4">
            {/* Input Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find creators for your next campaign..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-400 font-sans text-xs sm:text-sm focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <button
                onClick={handleRunQuery}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-brand-accent/25 hover:shadow-brand-accent/40 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 font-sans"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Run AI Match</span>
                  </>
                )}
              </button>
            </div>

            {/* Quick Preset Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-slate-400 font-mono text-[11px] mr-1">Presets:</span>
              {presets.map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setQuery(p);
                    handleRunQuery();
                  }}
                  className="px-3 py-1 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-[11px] font-sans border border-slate-700/60 transition-colors truncate max-w-[280px] text-left"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Processing Telemetry Stream */}
            {isProcessing && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-3 rounded-xl bg-slate-800 border border-orange-500/30 text-xs font-mono text-orange-400 flex items-center justify-between"
              >
                <span>&gt; {processStages[processStage]}</span>
                <span className="text-slate-400">{processStage + 1} / 4</span>
              </motion.div>
            )}
          </div>

          {/* Results Roster with Multi-Factor Subscores */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((c) => (
              <div
                key={c.id}
                className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between space-y-5 group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  {/* Avatar & Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-slate-200"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 font-sans">{c.name}</h4>
                        <span className="text-xs text-slate-500 font-mono block">{c.handle}</span>
                        <span className="text-[10px] text-brand-accent font-medium">{c.category}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono font-black text-xs">
                        {c.matchScore}%
                      </span>
                    </div>
                  </div>

                  {/* Core Numerical Metrics */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-center font-mono text-[11px]">
                    <div>
                      <span className="text-slate-400 text-[10px] block">AUDIENCE</span>
                      <span className="font-bold text-slate-900">{c.followers}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">ENGAGEMENT</span>
                      <span className="font-bold text-emerald-600">{c.er}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">RATE / REEL</span>
                      <span className="font-bold text-slate-900">{c.avgRate}</span>
                    </div>
                  </div>

                  {/* Multi-Factor Subscore Breakdown */}
                  <div className="space-y-1.5 text-[10px] font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Audience Alignment:</span>
                      <span className="font-bold text-slate-800">{c.subscores.audience}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${c.subscores.audience}%` }} />
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="text-slate-500">Engagement Quality:</span>
                      <span className="font-bold text-slate-800">{c.subscores.engagement}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className="bg-sky-500 h-full" style={{ width: `${c.subscores.engagement}%` }} />
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="text-slate-500">Budget Match:</span>
                      <span className="font-bold text-slate-800">{c.subscores.budget}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                      <div className="bg-orange-500 h-full" style={{ width: `${c.subscores.budget}%` }} />
                    </div>
                  </div>
                </div>

                {/* Invite CTA Button */}
                <button
                  onClick={() => handleInvite(c.id)}
                  className={`w-full py-3 rounded-2xl text-xs font-bold font-sans transition-all flex items-center justify-center gap-2 ${
                    invited[c.id]
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : "bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
                  }`}
                >
                  {invited[c.id] ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Invite Dispatched</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Invite to Campaign +</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
