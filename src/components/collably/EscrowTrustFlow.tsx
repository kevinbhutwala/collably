"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, CheckCircle2 } from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function EscrowTrustFlow() {
  const [escrowStage, setEscrowStage] = useState(0);

  const stages = [
    {
      title: "Budget Secured in Stripe Escrow",
      desc: "Brand deposits $3,200 (₹2,50,000) into Stripe Connect milestone custody. Funds are locked before production.",
      status: "100% SECURED",
    },
    {
      title: "Milestone 1: 4K Video Draft Completed",
      desc: "Creator uploads uncompressed master cut. Automated frame indexing and review timeline triggered.",
      status: "DELIVERABLE IN REVIEW",
    },
    {
      title: "Content Approved by Brand",
      desc: "Brand reviews timecodes and provides 1-click commercial sign-off. Commercial IP license transferred.",
      status: "APPROVED",
    },
    {
      title: "$2,880 Automated Disbursement (<24h)",
      desc: "Stripe Connect disburses 90% net earnings directly to creator bank. Zero invoice chasing or 90-day delays.",
      status: "DISBURSED & PAID",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setEscrowStage((prev) => (prev + 1) % stages.length);
    }, 4200);
    return () => clearInterval(timer);
  }, [stages.length]);

  return (
    <section className="py-24 sm:py-28 bg-[#0a070a] border-b border-white/10 relative overflow-hidden select-none text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-pink-300 shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
            <span>09 • Financial Trust Architecture</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["creators", "get", "paid", "brands", "stay", "protected"]}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-tight"
          >
            Creators get paid. Brands stay protected.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["milestone", "escrow", "zero", "invoice", "waiting"]}
            className="text-sm sm:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Replacing traditional 90-day invoice delays and unverified payment terms with automated milestone escrow.
          </ScrollRevealText>
        </div>

        {/* Financial Escrow Stage Canvas */}
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-[#180f1d] via-[#120c16] to-[#0c0810] border border-pink-500/25 shadow-card hover:shadow-elevated transition-all duration-300 p-6 sm:p-10 space-y-8 relative overflow-hidden text-white">
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(closest-side,hsl(327_100%_46%/0.15),transparent)] blur-[100px] pointer-events-none" />

          {/* Budget Top Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10 shadow-xs">
            <div className="space-y-1 font-mono">
              <span className="text-[10px] uppercase text-slate-400 font-bold block">CAMPAIGN ESCROW ALLOCATION</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-black text-white font-display">$3,200.00</span>
                <span className="text-xs text-slate-400 font-mono">(₹2,50,000 INR)</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" /> 100% Pre-Funded Escrow
              </span>
            </div>
          </div>

          {/* Milestone Step Indicator Track */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            {stages.map((st, i) => (
              <button
                key={i}
                onClick={() => setEscrowStage(i)}
                className={`p-3.5 rounded-2xl border text-left transition-all ${
                  escrowStage === i
                    ? "bg-white/10 border-pink-500/60 shadow-md shadow-pink-500/20 scale-102 ring-1 ring-pink-500/40 text-white"
                    : "bg-white/[0.03] border-white/10 text-slate-400 hover:bg-white/[0.07] hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-mono font-bold ${escrowStage === i ? "text-[hsl(327,100%,55%)]" : "text-slate-400"}`}>
                    0{i + 1}
                  </span>
                  {escrowStage >= i && (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  )}
                </div>
                <h4 className="text-xs font-bold text-white font-display truncate">{st.title}</h4>
              </button>
            ))}
          </div>

          {/* Active Milestone Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={escrowStage}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="p-6 rounded-2xl bg-white/[0.05] border border-white/10 shadow-xs space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-[hsl(327,100%,55%)] font-bold">
                  PHASE 0{escrowStage + 1} EXECUTION
                </span>
                <span className="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[10px] font-mono font-bold">
                  {stages[escrowStage].status}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white font-display">{stages[escrowStage].title}</h3>
              <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
                {stages[escrowStage].desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
