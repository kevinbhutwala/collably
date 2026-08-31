"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, ShieldCheck, Play, Activity } from "lucide-react";

export function HeroCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Word-by-word staggered reveal configuration
  const headlineWords = ["Turn", "Every", "Conversation", "Into", "Predictable", "Revenue."];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <motion.div
        style={{ y: heroY, opacity: heroOpacity }}
        className="max-w-6xl mx-auto text-center space-y-8 relative z-10"
      >
        {/* Top Floating Pill */}
        <motion.div
          initial={{ opacity: 0, y: -20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md shadow-2xl"
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-accent animate-ping" />
          <span className="font-bold text-white tracking-wide">FlowPilot 2.0</span>
          <span className="text-white/20">•</span>
          <span className="text-slate-400">Autonomous Conversational Sales Engine</span>
        </motion.div>

        {/* Oversized Cinematic Masked Typography */}
        <div className="space-y-2 max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.03] select-none">
            {headlineWords.map((word, i) => {
              const isHighlight = word === "Conversation" || word === "Revenue.";
              return (
                <span key={i} className="inline-block overflow-hidden mr-3 sm:mr-5 py-1">
                  <motion.span
                    initial={{ y: "115%", filter: "blur(12px)", opacity: 0 }}
                    animate={{ y: "0%", filter: "blur(0px)", opacity: 1 }}
                    transition={{
                      duration: 0.9,
                      delay: 0.15 + i * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className={`inline-block ${
                      isHighlight
                        ? "bg-gradient-to-r from-brand-accent via-orange-400 to-amber-300 bg-clip-text text-transparent drop-shadow-sm"
                        : "text-white"
                    }`}
                  >
                    {word}
                  </motion.span>
                </span>
              );
            })}
          </h1>
        </div>

        {/* Supporting Narrative Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl text-slate-400 max-w-3xl mx-auto font-normal leading-relaxed"
        >
          FlowPilot understands customer intent in 120ms, qualifies high-ticket leads, and autonomously books confirmed calendar pipeline 24/7 across WhatsApp, Instagram, Website Chat, and CRM.
        </motion.p>

        {/* Magnetic Action Group */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
        >
          <a
            href="#demo"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-orange-500 to-amber-500 text-white font-bold text-base shadow-2xl shadow-brand-accent/30 hover:shadow-brand-accent/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group select-none"
            data-cursor="TEST AI"
          >
            <span>See FlowPilot in Action</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="#recovery"
            className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white/[0.06] border border-white/12 text-slate-200 font-semibold text-base hover:bg-white/10 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2 group backdrop-blur-xl select-none"
            data-cursor="RECOVERY"
          >
            <Zap className="w-4 h-4 text-amber-400" />
            <span>Calculate Lost Revenue</span>
          </a>
        </motion.div>

        {/* Live Telemetry Ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-mono text-slate-400 border-t border-white/10 max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-slate-300 font-semibold">120ms</span>
            <span className="text-slate-500">Semantic Parsing</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
            <span className="text-slate-300 font-semibold">24/7/365</span>
            <span className="text-slate-500">Zero Human Latency</span>
          </div>
          <div className="flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-slate-300 font-semibold">+38%</span>
            <span className="text-slate-500">Booking Conversion</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
