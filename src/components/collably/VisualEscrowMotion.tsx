"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Video, CheckCircle2, Wallet, ArrowRight, ShieldCheck, Sparkles, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { formatCurrency } from "@/core/utils/currency";

export function VisualEscrowMotion() {
  const [currentStep, setCurrentStep] = useState(2);
  const [released, setReleased] = useState(false);

  const steps = [
    {
      num: "01",
      title: "Funds Secured",
      badge: "100% Pre-Funded",
      icon: Lock,
      color: "from-blue-500 to-indigo-500",
      desc: "Brand budget locked in segregated Stripe custody before production starts.",
      amount: "$3,500 Secured",
    },
    {
      num: "02",
      title: "Creator Films 4K",
      badge: "In Production",
      icon: Video,
      color: "from-pink-500 to-purple-500",
      desc: "Creator shoots and submits frame-accurate 4K video draft.",
      amount: "Cut v2 Uploaded",
    },
    {
      num: "03",
      title: "1-Click Sign-Off",
      badge: "Brand Approval",
      icon: CheckCircle2,
      color: "from-emerald-400 to-teal-500",
      desc: "Brand inspects timecoded annotations and approves the deliverable.",
      amount: "Ready for Release",
    },
    {
      num: "04",
      title: "Direct Payout",
      badge: "<24h Transfer",
      icon: Wallet,
      color: "from-emerald-500 to-green-400",
      desc: "Automated disbursement direct to creator bank account. 0-day waiting.",
      amount: "$3,150 Net Paid",
    },
  ];

  const handleRelease = () => {
    setReleased(true);
    setCurrentStep(3);
    try {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#ff007f", "#b300b3", "#d4af37", "#10b981", "#ffffff"],
      });
    } catch {}
  };

  return (
    <section className="py-24 sm:py-32 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      {/* Background Radial Spot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[850px] h-[350px] sm:h-[500px] bg-gradient-radial from-[hsl(327,100%,50%)]/15 via-[hsl(300,100%,42%)]/10 to-transparent blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-gold" />
            <span>Milestone Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display">
            Guaranteed payouts. Zero friction.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-sans">
            How protected milestone payments flow seamlessly from brief deposit to creator disbursement.
          </p>
        </div>

        {/* 4 Visual Step Cards with Connecting Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            const isCurrent = currentStep === idx;
            const isCompleted = currentStep > idx || released;

            return (
              <div
                key={s.num}
                onClick={() => setCurrentStep(idx)}
                className={`p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-6 relative overflow-hidden ${
                  isCurrent
                    ? "bg-[#180f1d] border-[hsl(327,100%,50%)] shadow-2xl scale-[1.02]"
                    : isCompleted
                    ? "bg-[#120c16] border-emerald-500/40 shadow-card"
                    : "bg-[#120c16] border-white/10 hover:border-white/20"
                }`}
              >
                {/* Top Number & Badge */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold ${isCurrent ? "text-[hsl(327,100%,55%)]" : "text-slate-400"}`}>
                    STAGE {s.num}
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border ${
                    isCompleted
                      ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                      : isCurrent
                      ? "bg-pink-500/20 text-pink-300 border-pink-500/40"
                      : "bg-white/[0.04] text-slate-400 border-white/10"
                  }`}>
                    {s.badge}
                  </span>
                </div>

                {/* Icon & Title */}
                <div className="space-y-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center text-white shadow-lg`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white font-display">{s.title}</h4>
                    <p className="text-xs text-slate-300 font-sans mt-1 leading-relaxed">{s.desc}</p>
                  </div>
                </div>

                {/* Amount Pill */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 text-[11px]">TELEMETRY:</span>
                  <span className="font-bold text-white">{s.amount}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Interactive Action Trigger */}
        <div className="max-w-xl mx-auto p-4 sm:p-6 rounded-3xl bg-[#120c16] border border-white/10 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="text-xs font-mono text-slate-400 block font-bold">CAMPAIGN MILESTONE DEMO</span>
            <span className="text-base font-bold text-white font-display">
              {released ? "✓ $3,150 Disbursed to Creator (Stripe Connect)" : "Ready to test instant milestone release?"}
            </span>
          </div>

          <button
            onClick={handleRelease}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white font-bold text-xs sm:text-sm font-display shadow-lg shadow-pink-500/25 hover:brightness-110 active:scale-95 transition-all flex items-center gap-2 shrink-0"
          >
            {released ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Released Successfully</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-gold" />
                <span>Simulate 1-Click Release</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
