"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  Share2,
  FileText,
  Lock,
  Play,
  CreditCard,
  Sparkles,
  Layers,
} from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function CollaborationCore() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: "Brand Brief & Milestone Pre-Funded",
      detail: "Brand locks $3,200 contract budget into Stripe Connect milestone protection before creator records a single frame.",
      badge: "Milestone Locked ($3,200)",
      color: "border-pink-500/30 text-white bg-pink-500/10",
    },
    {
      label: "Creator Submits 4K Video Draft",
      detail: "Creator uploads uncompressed 4K master file with automatic transcoding and timecoded scrubber generation.",
      badge: "Transcoded in 4K (60fps)",
      color: "border-sky-500/30 text-white bg-sky-500/10",
    },
    {
      label: "Timecoded Review & Frame Comments",
      detail: 'Brand adds timestamped annotations: "Enhance CTA lower-third banner at 00:42". Auto-synced back to creator workspace.',
      badge: "Frame-Accurate QA",
      color: "border-purple-500/30 text-white bg-purple-500/10",
    },
    {
      label: "Final Polish & 1-Click Approval",
      detail: "Creator uploads revised cut. Brand hits Approve — full commercial IP license transfer triggered automatically.",
      badge: "Deliverable Approved",
      color: "border-pink-500/30 text-white bg-pink-500/10",
    },
    {
      label: "Instant Automated Creator Payout",
      detail: "Stripe Connect disburses $2,880 (90% net) directly to creator bank within 24 hours. Zero invoice chasing.",
      badge: "Disbursed via Stripe (<24h)",
      color: "border-emerald-500/30 text-white bg-emerald-500/10",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [steps.length]);

  const nodes = [
    { id: "youtube", label: "YouTube 60s Integration", icon: Video, x: "-35%", y: "-34%" },
    { id: "instagram", label: "Instagram 4K Reel", icon: Share2, x: "35%", y: "-34%" },
    { id: "brief", label: "Verified Brand Brief", icon: FileText, x: "-42%", y: "4%" },
    { id: "escrow", label: "Milestone Protection", icon: Lock, x: "42%", y: "4%" },
    { id: "review", label: "Timecoded Review", icon: Play, x: "-30%", y: "38%" },
    { id: "payout", label: "Instant Payout", icon: CreditCard, x: "30%", y: "38%" },
  ];

  return (
    <section className="py-20 sm:py-28 bg-transparent border-y border-white/10 relative overflow-hidden text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header with Scroll Reveal Illumination */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <Layers className="w-3.5 h-3.5 text-gold" />
            <span>The AbeyCollab Collaboration Hub</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["creator", "partnerships", "abeycollab"]}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-tight"
          >
            How creator partnerships happen on AbeyCollab.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["milestone", "funding", "instant", "payouts"]}
            className="text-sm sm:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            From brief matching and milestone funding to timecoded video reviews and instant automated creator payouts.
          </ScrollRevealText>
        </div>

        {/* Visual Core Canvas */}
        <div className="relative w-full max-w-4xl mx-auto h-[360px] sm:h-[420px] md:h-[460px] rounded-3xl bg-[#120c16] border border-white/10 p-4 sm:p-10 shadow-card flex items-center justify-center overflow-hidden">
          {/* Subtle Glow Backdrop */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255, 0, 128, 0.15) 0%, transparent 70%), linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 40px 40px, 40px 40px",
            }}
          />

          {/* Central Pulsing AbeyCollab Engine */}
          <div className="relative z-20 flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-32 h-32 sm:w-48 sm:h-48 rounded-full border border-dashed border-[hsl(327,100%,50%)]/40 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-28 h-28 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-[hsl(327,100%,50%)] via-pink-600 to-[hsl(300,100%,42%)] blur-2xl pointer-events-none"
            />

            {/* Central Badge */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-[#160f1c] border border-white/20 shadow-xl shadow-pink-500/20 flex flex-col items-center justify-center text-center p-2 sm:p-3 z-10">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] p-[1.5px] mb-1 flex items-center justify-center shadow-md shadow-pink-500/30">
                <div className="w-full h-full bg-[#0a070a] rounded-[inherit] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold animate-pulse" />
                </div>
              </div>
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-white font-display">
                AbeyCollab
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono text-emerald-400 font-bold">PIPELINE ACTIVE</span>
            </div>
          </div>

          {/* Surrounding Deliverable Nodes */}
          {nodes.map((node) => {
            const Icon = node.icon;
            const isTarget =
              (activeStep === 0 && node.id === "escrow") ||
              (activeStep === 1 && (node.id === "youtube" || node.id === "instagram")) ||
              (activeStep === 2 && node.id === "review") ||
              (activeStep === 4 && node.id === "payout");

            return (
              <motion.div
                key={node.id}
                style={{ left: `calc(50% + ${node.x})`, top: `calc(50% + ${node.y})` }}
                animate={{
                  scale: isTarget ? 1.05 : 1,
                  y: isTarget ? [-2, 2, -2] : 0,
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl border transition-all duration-300 select-none shadow-xs ${
                  isTarget
                    ? "bg-[#180f1e] border-[hsl(327,100%,50%)] text-white shadow-md shadow-pink-500/30 scale-105"
                    : "bg-white/[0.04] border-white/10 text-slate-300 hover:border-pink-500/30"
                }`}
              >
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-lg flex items-center justify-center shrink-0 ${
                    isTarget
                      ? "bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)] text-white"
                      : "bg-white/10 text-slate-300"
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                </div>
                <span className="text-[10px] sm:text-xs font-bold font-sans truncate max-w-[100px] sm:max-w-none">{node.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Step Status Ticker */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className={`p-4 sm:p-5 rounded-2xl border ${steps[activeStep].color} shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 text-white`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black uppercase tracking-wider text-white font-display">
                    Phase 0{activeStep + 1} • {steps[activeStep].label}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans">
                  {steps[activeStep].detail}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="px-3.5 py-1 rounded-full bg-white/[0.06] text-[11px] font-mono font-bold text-white border border-white/10 shadow-xs">
                  {steps[activeStep].badge}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Stepper Dots */}
          <div className="flex justify-center gap-2 mt-4">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStep(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeStep === i ? "w-8 bg-gradient-to-r from-[hsl(327,100%,50%)] to-[hsl(300,100%,42%)]" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
