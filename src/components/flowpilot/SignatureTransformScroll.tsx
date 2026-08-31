"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ArrowDown, Zap } from "lucide-react";

export function SignatureTransformScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform stages
  const scale = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.9], [0.85, 1.1, 1.1, 0.9]);
  const opacityConv = useTransform(scrollYProgress, [0.1, 0.45, 0.55], [1, 0.8, 0]);
  const opacityRev = useTransform(scrollYProgress, [0.45, 0.6, 0.9], [0, 1, 1]);
  const yOffset = useTransform(scrollYProgress, [0.2, 0.8], [60, -60]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[140vh] flex flex-col justify-center items-center overflow-hidden bg-[#05070D] border-b border-white/10 select-none py-20"
    >
      {/* Background Radiance */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] sm:w-[900px] h-[400px] bg-gradient-radial from-brand-accent/20 via-orange-600/10 to-transparent blur-[140px]" />
      </div>

      <div className="sticky top-1/4 w-full max-w-7xl mx-auto px-4 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300"
        >
          <Zap className="w-3.5 h-3.5 text-brand-accent" />
          <span>The Autonomous Conversion Bridge</span>
        </motion.div>

        {/* The Signature Giant Morphing Typographic Stage */}
        <motion.div style={{ scale, y: yOffset }} className="relative h-32 sm:h-48 flex items-center justify-center">
          {/* Phase 1 Word: CONVERSATION */}
          <motion.h2
            style={{ opacity: opacityConv }}
            className="absolute text-5xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-slate-400 font-sans"
          >
            CONVERSATION
          </motion.h2>

          {/* Phase 2 Word: REVENUE */}
          <motion.h2
            style={{ opacity: opacityRev }}
            className="absolute text-6xl sm:text-9xl lg:text-[11rem] font-black uppercase tracking-tighter bg-gradient-to-r from-brand-accent via-orange-500 to-amber-300 bg-clip-text text-transparent drop-shadow-2xl font-sans"
          >
            REVENUE
          </motion.h2>
        </motion.div>

        {/* Narrative Punchline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-3 pt-4"
        >
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            FlowPilot connects the two.
          </h3>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Stop losing 60% of high-intent leads to delayed responses. FlowPilot captures every inquiry instantly, answers with brand precision, and logs booked appointments directly to your calendar.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
