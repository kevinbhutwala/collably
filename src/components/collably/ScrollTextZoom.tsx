"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles, ShieldCheck, ArrowDown } from "lucide-react";

export function ScrollTextZoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth scroll transformations:
  // Starts medium size (scale 0.85, opacity 0.4), grows to prominent bold headline (scale 1.15, opacity 1)
  const fontScale = useTransform(scrollYProgress, [0.15, 0.5, 0.85], [0.85, 1.12, 0.95]);
  const textOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.8, 0.95], [0.3, 1, 1, 0.4]);
  const yOffset = useTransform(scrollYProgress, [0.15, 0.85], [40, -40]);

  // Progressive word illumination transforms
  const opacityP1 = useTransform(scrollYProgress, [0.15, 0.35], [0.3, 1]);
  const opacityP2 = useTransform(scrollYProgress, [0.3, 0.5], [0.3, 1]);
  const opacityP3 = useTransform(scrollYProgress, [0.45, 0.65], [0.3, 1]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[110vh] sm:min-h-[130vh] flex flex-col justify-center items-center py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-orange-50/30 to-white overflow-hidden select-none"
    >
      {/* Dynamic Background Glowing Aura */}
      <motion.div
        style={{ scale: fontScale }}
        className="absolute w-[350px] sm:w-[750px] h-[350px] sm:h-[500px] rounded-full bg-gradient-radial from-orange-300/30 via-rose-300/20 to-transparent blur-[120px] pointer-events-none -z-10"
      />

      <div className="sticky top-1/4 w-full max-w-5xl mx-auto text-center space-y-8 sm:space-y-12">
        {/* Top Feature Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-orange-200/90 text-xs font-mono text-brand-accent shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-accent animate-pulse" />
          <span className="font-bold">Scroll-Driven Collaboration Engine</span>
        </motion.div>

        {/* Scroll-Driven Dynamic Font Zoom Canvas */}
        <motion.div
          style={{ scale: fontScale, opacity: textOpacity, y: yOffset }}
          className="space-y-4 sm:space-y-6 transition-transform duration-75 ease-out"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.2] font-sans max-w-4xl mx-auto">
            <motion.span style={{ opacity: opacityP1 }} className="transition-opacity duration-150">
              From your first verified brand brief{" "}
            </motion.span>
            <motion.span
              style={{ opacity: opacityP2 }}
              className="bg-gradient-to-r from-brand-accent via-rose-500 to-pink-500 bg-clip-text text-transparent transition-opacity duration-150"
            >
              to pre-funded milestone lock,{" "}
            </motion.span>
            <motion.span style={{ opacity: opacityP3 }} className="transition-opacity duration-150">
              Collably powers partnerships that ship on time.
            </motion.span>
          </h2>

          <p className="text-sm sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
            Never chase a net-90 invoice. Never gamble on unverified deliverables. 100% pre-funded before filming starts.
          </p>
        </motion.div>

        {/* Floating Telemetry Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-4"
        >
          <div className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-2 text-xs font-mono text-slate-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="font-bold">Stripe Connect Milestone Custody</span>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center gap-2 text-xs font-mono text-slate-800">
            <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
            <span className="font-bold">4K Frame-Accurate Video QA</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
