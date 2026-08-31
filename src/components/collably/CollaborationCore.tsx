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
  BarChart3,
  CheckCircle2,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export function CollaborationCore() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: "Brand Brief & Milestone Pre-Funded",
      detail: "Brand locks $3,200 contract budget into Stripe Connect milestone protection before creator records a single frame.",
      badge: "Milestone Locked ($3,200)",
      color: "border-brand-accent/50 text-brand-accent bg-brand-accent/10",
    },
    {
      label: "Creator Submits 4K Video Draft",
      detail: "Creator uploads uncompressed 4K master file with automatic transcoding and timecoded scrubber generation.",
      badge: "Transcoded in 4K (60fps)",
      color: "border-sky-500/50 text-sky-400 bg-sky-500/10",
    },
    {
      label: "Timecoded Review & Frame Comments",
      detail: 'Brand adds timestamped annotations: "Enhance CTA lower-third banner at 00:42". Auto-synced back to creator workspace.',
      badge: "Frame-Accurate QA",
      color: "border-amber-500/50 text-amber-400 bg-amber-500/10",
    },
    {
      label: "Final Polish & 1-Click Approval",
      detail: "Creator uploads revised cut. Brand hits Approve — full commercial IP license transfer triggered automatically.",
      badge: "Deliverable Approved",
      color: "border-purple-500/50 text-purple-400 bg-purple-500/10",
    },
    {
      label: "Instant Automated Creator Payout",
      detail: "Stripe Connect disburses $2,880 (90% net) directly to creator bank within 24 hours. Zero invoice chasing.",
      badge: "Disbursed via Stripe (<24h)",
      color: "border-emerald-500/50 text-emerald-400 bg-emerald-500/10",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [steps.length]);

  const nodes = [
    { id: "youtube", label: "YouTube 60s Integration", icon: Video, x: "-36%", y: "-35%" },
    { id: "instagram", label: "Instagram 4K Reel", icon: Share2, x: "36%", y: "-35%" },
    { id: "brief", label: "Verified Brand Brief", icon: FileText, x: "-45%", y: "5%" },
    { id: "escrow", label: "Milestone Protection", icon: Lock, x: "45%", y: "5%" },
    { id: "review", label: "Timecoded Review", icon: Play, x: "-32%", y: "42%" },
    { id: "payout", label: "Instant Payout", icon: CreditCard, x: "32%", y: "42%" },
  ];

  return (
    <section className="py-28 bg-[#05070D] border-y border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-xs font-mono font-bold text-brand-accent">
            <Layers className="w-3.5 h-3.5" />
            <span>The Collably Collaboration Hub</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
            How creator partnerships happen on Collably.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            From brief matching and milestone funding to timecoded video reviews and instant automated creator payouts.
          </p>
        </div>

        {/* Visual Core Canvas */}
        <div className="relative w-full max-w-4xl mx-auto aspect-square sm:aspect-[16/11] rounded-3xl bg-slate-950/80 border border-white/[0.08] p-6 sm:p-12 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Subtle Grid Backdrop */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255, 94, 58, 0.25) 0%, transparent 70%), linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 48px 48px, 48px 48px",
            }}
          />

          {/* Central Pulsing Collably Engine */}
          <div className="relative z-20 flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-dashed border-brand-accent/30 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-brand-accent via-orange-500 to-amber-400 blur-2xl pointer-events-none"
            />

            {/* Central Badge */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-[#090D1A] border border-brand-accent/50 shadow-2xl shadow-brand-accent/30 flex flex-col items-center justify-center text-center p-3 z-10">
              <Sparkles className="w-8 h-8 text-brand-accent mb-1 animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-white font-sans">
                Collably
              </span>
              <span className="text-[9px] font-mono text-emerald-400 font-bold">PIPELINE ACTIVE</span>
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
                  scale: isTarget ? 1.08 : 1,
                  y: isTarget ? [-3, 3, -3] : 0,
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border transition-all duration-500 select-none shadow-xl ${
                  isTarget
                    ? "bg-slate-900 border-brand-accent text-white shadow-brand-accent/25"
                    : "bg-[#090D1A]/90 border-white/10 text-slate-300 hover:border-white/20"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    isTarget ? "bg-brand-accent text-white" : "bg-white/10 text-slate-300"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold font-sans">{node.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Dynamic Step Status Ticker */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`p-5 rounded-2xl border ${steps[activeStep].color} backdrop-blur-xl shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black uppercase tracking-wider text-white">
                    Phase 0{activeStep + 1} • {steps[activeStep].label}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-sans">
                  {steps[activeStep].detail}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] font-mono font-bold text-white border border-white/10">
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
                  activeStep === i ? "w-8 bg-brand-accent" : "w-2 bg-white/20 hover:bg-white/40"
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
