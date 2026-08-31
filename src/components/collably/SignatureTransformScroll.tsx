"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck, Sparkles } from "lucide-react";

export function SignatureTransformScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.9], [0.85, 1.05, 1.05, 0.9]);
  const opacityCollab = useTransform(scrollYProgress, [0.1, 0.45, 0.55], [1, 0.8, 0]);
  const opacityProtection = useTransform(scrollYProgress, [0.45, 0.6, 0.9], [0, 1, 1]);
  const yOffset = useTransform(scrollYProgress, [0.2, 0.8], [50, -50]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[130vh] flex flex-col justify-center items-center overflow-hidden bg-[#05070D] border-b border-white/[0.08] select-none py-20"
    >
      {/* Glow Center */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] sm:w-[900px] h-[400px] bg-gradient-radial from-brand-accent/20 via-orange-600/10 to-transparent blur-[140px]" />
      </div>

      <div className="sticky top-1/4 w-full max-w-7xl mx-auto px-4 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-brand-accent" />
          <span>The Zero-Risk Collaboration Standard</span>
        </motion.div>

        {/* Viewport Typographic Morph */}
        <motion.div style={{ scale, y: yOffset }} className="relative h-28 sm:h-44 flex items-center justify-center">
          {/* Word 1: COLLABORATION */}
          <motion.h2
            style={{ opacity: opacityCollab }}
            className="absolute text-5xl sm:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-slate-400 font-sans"
          >
            COLLABORATION
          </motion.h2>

          {/* Word 2: PAYOUT GUARANTEE */}
          <motion.h2
            style={{ opacity: opacityProtection }}
            className="absolute text-4xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tighter bg-gradient-to-r from-brand-accent via-orange-500 to-amber-300 bg-clip-text text-transparent drop-shadow-2xl font-sans"
          >
            MILESTONE ESCROW
          </motion.h2>
        </motion.div>

        {/* Narrative Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-3 pt-4"
        >
          <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Collably protects both sides.
          </h3>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
            Brands never release funds until the deliverable matches the brief. Creators never start filming until funds are safely held in milestone protection.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
