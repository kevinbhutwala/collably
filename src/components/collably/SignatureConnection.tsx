"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, Video, Sparkles, CheckCircle2, Lock, ArrowRight, Zap } from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function SignatureConnection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Left card (Brand) moves from left towards center
  const brandX = useTransform(scrollYProgress, [0.15, 0.55], ["-35%", "0%"]);
  // Right card (Creator) moves from right towards center
  const creatorX = useTransform(scrollYProgress, [0.15, 0.55], ["35%", "0%"]);
  // Core fusion scale & opacity
  const coreScale = useTransform(scrollYProgress, [0.45, 0.65], [0.5, 1]);
  const coreOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);
  // Connection line opacity & pulse
  const lineScaleX = useTransform(scrollYProgress, [0.2, 0.55], [0.2, 1]);

  const stages = [
    { num: "01", name: "DISCOVER", desc: "Vetted Creator Matching" },
    { num: "02", name: "MATCH", desc: "AI Compatibility Fit" },
    { num: "03", name: "COLLABORATE", desc: "Pre-Funded Brief Lock" },
    { num: "04", name: "CREATE", desc: "4K Master Deliverables" },
    { num: "05", name: "APPROVE", desc: "Frame-Accurate QA" },
    { num: "06", name: "PAY", desc: "Automated Escrow Release" },
    { num: "07", name: "MEASURE", desc: "Verified Campaign ROI" },
  ];

  return (
    <section
      ref={containerRef}
      className="py-24 sm:py-36 bg-gradient-to-b from-white via-slate-50/80 to-white border-y border-slate-200 relative overflow-hidden select-none"
    >
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[800px] h-[350px] sm:h-[500px] bg-gradient-radial from-orange-200/50 via-rose-200/30 to-transparent blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 via-rose-50 to-pink-50 border border-orange-200/80 text-xs font-mono font-bold text-brand-accent shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
            <span>The Signature Collably Connection</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["two", "sides", "one", "workspace", "collably"]}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans leading-tight"
          >
            Two sides. One seamless workspace.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["chaos", "clarity", "milestone", "protection"]}
            className="text-sm sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Watch how brand capital and creator talent converge through automated milestone protection.
          </ScrollRevealText>
        </div>

        {/* The Connection Kinetic Stage */}
        <div className="relative min-h-[420px] sm:min-h-[460px] flex items-center justify-center">
          {/* Animated Horizontal Laser Connecting Line */}
          <motion.div
            style={{ scaleX: lineScaleX }}
            className="absolute h-1 w-full max-w-4xl bg-gradient-to-r from-brand-accent via-rose-500 to-indigo-600 rounded-full shadow-lg shadow-brand-accent/30 pointer-events-none"
          />

          {/* Left: BRAND Node */}
          <motion.div
            style={{ x: brandX }}
            className="absolute left-4 sm:left-12 z-20 w-64 sm:w-80 p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-card hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs font-mono">
                  <Building2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900">THE BRAND</h3>
                  <span className="text-[10px] font-mono text-slate-400">Marketing &amp; Growth</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-orange-50 border border-orange-200 text-brand-accent font-mono text-[10px] font-bold">
                $28,500 Locked
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3 font-sans">
              Looking for 10 verified creators for product launch. Zero manual outreach or invoice overhead.
            </p>

            <div className="space-y-1 text-[10px] font-mono text-slate-500 bg-slate-50 p-2.5 rounded-xl">
              <div className="flex justify-between">
                <span>Milestone Status:</span>
                <span className="font-bold text-emerald-600">Funded in Escrow</span>
              </div>
              <div className="flex justify-between">
                <span>Usage Rights:</span>
                <span className="font-bold text-slate-900">Commercial 12-Mo</span>
              </div>
            </div>
          </motion.div>

          {/* Center: COLLABLY Fusion Core */}
          <motion.div
            style={{ scale: coreScale, opacity: coreOpacity }}
            className="relative z-30 w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-white border-2 border-brand-accent shadow-2xl shadow-brand-accent/25 flex flex-col items-center justify-center text-center p-3"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 rounded-3xl border border-dashed border-brand-accent/40 pointer-events-none"
            />
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-accent via-rose-500 to-amber-500 p-[1.5px] mb-1.5 flex items-center justify-center shadow-md">
              <div className="w-full h-full bg-slate-950 rounded-[inherit] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
            </div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900 font-sans">
              Collably
            </span>
            <span className="text-[9px] font-mono font-bold text-emerald-600">
              TRUST ENGINE
            </span>
          </motion.div>

          {/* Right: CREATOR Node */}
          <motion.div
            style={{ x: creatorX }}
            className="absolute right-4 sm:right-12 z-20 w-64 sm:w-80 p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-card hover:shadow-elevated transition-shadow"
          >
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-accent to-pink-500 text-white flex items-center justify-center font-bold text-xs">
                  <Video className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-black text-slate-900">THE CREATOR</h3>
                  <span className="text-[10px] font-mono text-slate-400">Verified Talent</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[10px] font-bold">
                90% Net Payout
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3 font-sans">
              Creates 4K frame-accurate content. Funds guaranteed in escrow before recording a single second.
            </p>

            <div className="space-y-1 text-[10px] font-mono text-slate-500 bg-slate-50 p-2.5 rounded-xl">
              <div className="flex justify-between">
                <span>Disbursement:</span>
                <span className="font-bold text-emerald-600">&lt; 24h via Stripe</span>
              </div>
              <div className="flex justify-between">
                <span>Invoice Chasing:</span>
                <span className="font-bold text-brand-accent">0 Days</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 7-Step Convergence Horizontal Track */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 pt-6 border-t border-slate-200/80">
          {stages.map((st, i) => (
            <div
              key={st.num}
              className="p-3 rounded-2xl bg-white border border-slate-200/90 hover:border-orange-300 transition-colors shadow-xs text-center space-y-1 group"
            >
              <span className="text-[10px] font-mono font-bold text-slate-400 block group-hover:text-brand-accent transition-colors">
                {st.num}
              </span>
              <h4 className="text-xs font-black text-slate-900 font-sans tracking-wide">
                {st.name}
              </h4>
              <p className="text-[10px] text-slate-500 leading-tight">
                {st.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
