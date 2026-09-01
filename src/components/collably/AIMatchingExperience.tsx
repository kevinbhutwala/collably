"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Search,
  UserPlus,
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
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80",
      matchScore: 94,
      subscores: {
        audience: 95,
        engagement: 98,
        budget: 97,
        brandFit: 92,
      },
    },
    {
      id: "c3",
      name: "Elena Rostova",
      handle: "@elenatech",
      category: "AI Tools & Dev",
      location: "San Francisco / Remote",
      followers: "485K",
      er: "6.4%",
      avgRate: "₹18,000",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
      matchScore: 92,
      subscores: {
        audience: 91,
        engagement: 93,
        budget: 89,
        brandFit: 96,
      },
    },
  ];

  const handleRunQuery = () => {
    setIsProcessing(true);
    setProcessStage(0);

    const intv = setInterval(() => {
      setProcessStage((p) => {
        if (p >= 3) {
          clearInterval(intv);
          setIsProcessing(false);
          return 3;
        }
        return p + 1;
      });
    }, 600);
  };

  const handleInvite = (id: string) => {
    setInvited((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section className="py-24 sm:py-36 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      {/* Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[850px] h-[350px] sm:h-[500px] bg-gradient-radial from-[hsl(327,100%,50%)]/15 via-[hsl(300,100%,42%)]/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>06 • Precision AI Creator Discovery</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["ai-powered", "creator", "matching", "collably"]}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-tight"
          >
            AI-powered creator matching that actually works.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["natural", "language", "engagement", "budget"]}
            className="text-sm sm:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Describe your campaign requirements in natural language. Match by real audience demographics, genuine engagement, and verified budgets.
          </ScrollRevealText>
        </div>

        {/* Interactive Query Terminal Stage */}
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="p-3 sm:p-5 rounded-3xl bg-[#120c16] border border-white/10 text-white shadow-2xl space-y-4">
            {/* Input Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Find creators for your next campaign..."
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white/[0.05] border border-white/10 text-white placeholder:text-slate-500 font-sans text-xs sm:text-sm focus:outline-none focus:border-[hsl(327,100%,50%)]/50 transition-colors"
                />
              </div>

              <button
                onClick={handleRunQuery}
                disabled={isProcessing}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-xs sm:text-sm shadow-lg shadow-pink-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 font-display font-bold"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-gold" />
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
                  className="px-3.5 py-1.5 rounded-full bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 text-[11px] font-sans border border-white/10 transition-colors truncate max-w-[280px] text-left"
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
                className="p-3 rounded-xl bg-pink-500/10 border border-pink-500/30 text-xs font-mono text-[hsl(327,100%,55%)] flex items-center justify-between"
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
                className="p-6 rounded-3xl bg-[#120c16] border border-white/10 shadow-card hover:border-pink-500/40 transition-all flex flex-col justify-between space-y-5 group hover:-translate-y-1 text-white"
              >
                <div className="space-y-4">
                  {/* Avatar & Header */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-white/10 group-hover:scale-105 transition-transform"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-white font-display">{c.name}</h4>
                        <span className="text-xs text-slate-400 font-mono block">{c.handle}</span>
                        <span className="text-[10px] text-[hsl(327,100%,55%)] font-medium font-sans">{c.category}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono font-black text-xs">
                        {c.matchScore}%
                      </span>
                    </div>
                  </div>

                  {/* Core Numerical Metrics */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-white/[0.03] rounded-2xl border border-white/10 text-center font-mono text-[11px]">
                    <div>
                      <span className="text-slate-400 text-[10px] block">AUDIENCE</span>
                      <span className="font-bold text-white">{c.followers}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">ENGAGEMENT</span>
                      <span className="font-bold text-emerald-400">{c.er}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 text-[10px] block">RATE / REEL</span>
                      <span className="font-bold text-white">{c.avgRate}</span>
                    </div>
                  </div>

                  {/* Multi-Factor Subscore Breakdown */}
                  <div className="space-y-1.5 text-[10px] font-mono">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Audience Alignment:</span>
                      <span className="font-bold text-emerald-400">{c.subscores.audience}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <div className="bg-emerald-400 h-full" style={{ width: `${c.subscores.audience}%` }} />
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="text-slate-400">Engagement Quality:</span>
                      <span className="font-bold text-sky-400">{c.subscores.engagement}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <div className="bg-sky-400 h-full" style={{ width: `${c.subscores.engagement}%` }} />
                    </div>

                    <div className="flex justify-between pt-1">
                      <span className="text-slate-400">Budget Match:</span>
                      <span className="font-bold text-pink-400">{c.subscores.budget}%</span>
                    </div>
                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                      <div className="bg-pink-500 h-full" style={{ width: `${c.subscores.budget}%` }} />
                    </div>
                  </div>
                </div>

                {/* Invite CTA Button */}
                <button
                  onClick={() => handleInvite(c.id)}
                  className={`w-full py-3 rounded-full text-xs font-bold font-display transition-all flex items-center justify-center gap-2 ${
                    invited[c.id]
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "bg-white/[0.06] hover:bg-white/[0.12] text-white border border-white/10 shadow-xs"
                  }`}
                >
                  {invited[c.id] ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Invite Dispatched</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5 text-pink-400" />
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
