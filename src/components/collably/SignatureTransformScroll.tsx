"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShieldCheck } from "lucide-react";

export function SignatureTransformScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.9], [0.9, 1.03, 1.03, 0.92]);
  const opacityCollab = useTransform(scrollYProgress, [0.1, 0.45, 0.55], [1, 0.8, 0]);
  const opacityProtection = useTransform(scrollYProgress, [0.45, 0.6, 0.9], [0, 1, 1]);
  const yOffset = useTransform(scrollYProgress, [0.2, 0.8], [30, -30]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] sm:min-h-[120vh] flex flex-col justify-center items-center overflow-hidden bg-slate-50/60 border-b border-slate-200 select-none py-16 sm:py-20"
    >
      {/* Warm Ambient Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[320px] sm:w-[600px] lg:w-[900px] h-[300px] sm:h-[400px] bg-gradient-radial from-orange-200/60 via-rose-200/40 to-transparent blur-[100px] sm:blur-[140px]" />
      </div>

      <div className="sticky top-1/4 w-full max-w-7xl mx-auto px-4 text-center space-y-4 sm:space-y-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-white border border-slate-200 text-[11px] sm:text-xs font-mono text-slate-700 shadow-xs"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-brand-accent shrink-0" />
          <span>The Zero-Risk Collaboration Standard</span>
        </motion.div>

        {/* Viewport Typographic Morph */}
        <motion.div style={{ scale, y: yOffset }} className="relative h-20 sm:h-36 md:h-44 flex items-center justify-center">
          {/* Word 1: COLLABORATION */}
          <motion.h2
            style={{ opacity: opacityCollab }}
            className="absolute text-3xl xs:text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-slate-300 font-sans px-2"
          >
            COLLABORATION
          </motion.h2>

          {/* Word 2: PAYOUT GUARANTEE */}
          <motion.h2
            style={{ opacity: opacityProtection }}
            className="absolute text-2xl xs:text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter bg-gradient-to-r from-brand-accent via-rose-500 to-amber-500 bg-clip-text text-transparent drop-shadow-xs font-sans px-2"
          >
            MILESTONE ESCROW
          </motion.h2>
        </motion.div>

        {/* Narrative Conclusion */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto space-y-2 sm:space-y-3 pt-2 sm:pt-4 px-2"
        >
          <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Collably protects both sides.
          </h3>
          <p className="text-xs sm:text-base text-slate-600 leading-relaxed font-sans">
            Brands never release funds until the deliverable matches the brief. Creators never start filming until funds are safely held in milestone protection.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
