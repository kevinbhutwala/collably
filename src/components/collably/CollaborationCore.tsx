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

export function CollaborationCore() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: "Brand Brief & Milestone Pre-Funded",
      detail: "Brand locks $3,200 contract budget into Stripe Connect milestone protection before creator records a single frame.",
      badge: "Milestone Locked ($3,200)",
      color: "border-orange-200 text-orange-900 bg-orange-50/80",
    },
    {
      label: "Creator Submits 4K Video Draft",
      detail: "Creator uploads uncompressed 4K master file with automatic transcoding and timecoded scrubber generation.",
      badge: "Transcoded in 4K (60fps)",
      color: "border-sky-200 text-sky-900 bg-sky-50/80",
    },
    {
      label: "Timecoded Review & Frame Comments",
      detail: 'Brand adds timestamped annotations: "Enhance CTA lower-third banner at 00:42". Auto-synced back to creator workspace.',
      badge: "Frame-Accurate QA",
      color: "border-rose-200 text-rose-900 bg-rose-50/80",
    },
    {
      label: "Final Polish & 1-Click Approval",
      detail: "Creator uploads revised cut. Brand hits Approve — full commercial IP license transfer triggered automatically.",
      badge: "Deliverable Approved",
      color: "border-purple-200 text-purple-900 bg-purple-50/80",
    },
    {
      label: "Instant Automated Creator Payout",
      detail: "Stripe Connect disburses $2,880 (90% net) directly to creator bank within 24 hours. Zero invoice chasing.",
      badge: "Disbursed via Stripe (<24h)",
      color: "border-emerald-200 text-emerald-900 bg-emerald-50/80",
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
    <section className="py-28 bg-white border-y border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/80 text-xs font-mono font-bold text-brand-accent">
            <Layers className="w-3.5 h-3.5" />
            <span>The Collably Collaboration Hub</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans">
            How creator partnerships happen on Collably.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-sans">
            From brief matching and milestone funding to timecoded video reviews and instant automated creator payouts.
          </p>
        </div>

        {/* Visual Core Canvas */}
        <div className="relative w-full max-w-4xl mx-auto aspect-square sm:aspect-[16/11] rounded-3xl bg-slate-50 border border-slate-200/90 p-6 sm:p-12 shadow-card flex items-center justify-center overflow-hidden">
          {/* Subtle Warm Grid Backdrop */}
          <div
            className="absolute inset-0 opacity-40 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255, 94, 58, 0.12) 0%, transparent 70%), linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 48px 48px, 48px 48px",
            }}
          />

          {/* Central Pulsing Collably Engine */}
          <div className="relative z-20 flex flex-col items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute w-40 h-40 sm:w-52 sm:h-52 rounded-full border border-dashed border-brand-accent/40 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-orange-300 via-rose-300 to-amber-200 blur-2xl pointer-events-none"
            />

            {/* Central Badge */}
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-brand-accent/15 flex flex-col items-center justify-center text-center p-3 z-10">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-accent via-rose-500 to-amber-400 p-[1.5px] mb-1.5 flex items-center justify-center">
                <div className="w-full h-full bg-slate-950 rounded-[inherit] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                </div>
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-900 font-sans">
                Collably
              </span>
              <span className="text-[9px] font-mono text-emerald-600 font-bold">PIPELINE ACTIVE</span>
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
                  scale: isTarget ? 1.06 : 1,
                  y: isTarget ? [-2, 2, -2] : 0,
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border transition-all duration-500 select-none shadow-sm ${
                  isTarget
                    ? "bg-white border-brand-accent text-slate-900 shadow-md shadow-brand-accent/20"
                    : "bg-white/95 border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    isTarget
                      ? "bg-gradient-to-r from-brand-accent to-rose-500 text-white"
                      : "bg-slate-100 text-slate-700"
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
              className={`p-5 rounded-2xl border ${steps[activeStep].color} shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black uppercase tracking-wider text-slate-900">
                    Phase 0{activeStep + 1} • {steps[activeStep].label}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 font-sans">
                  {steps[activeStep].detail}
                </p>
              </div>

              <div className="shrink-0 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white text-[11px] font-mono font-bold text-slate-900 border border-slate-200 shadow-xs">
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
                  activeStep === i ? "w-8 bg-brand-accent" : "w-2 bg-slate-300 hover:bg-slate-400"
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
