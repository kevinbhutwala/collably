"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Sparkles,
  Calendar,
  Database,
  CheckCircle2,
  Cpu,
  Zap,
  Globe,
  Share2,
  Users,
  Smartphone,
  ArrowRight,
} from "lucide-react";

export function InteractiveAiCore() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: "Customer Inbound Message",
      node: "customer",
      detail: '"Hi! Need pricing for 50 enterprise seats and demo this Thursday."',
      badge: "Inbound 14:02:18",
      color: "border-sky-500/50 text-sky-400 bg-sky-500/10",
    },
    {
      label: "Autonomous Intent & Budget Parsing",
      node: "ai",
      detail: "Intent: High-Ticket Enterprise • Budget: $15k-$30k • Timeline: Immediate",
      badge: "Processed in 94ms",
      color: "border-brand-accent/50 text-brand-accent bg-brand-accent/10",
    },
    {
      label: "Lead Score Calculated",
      node: "crm",
      detail: "Lead Score: 98/100 (VIP High Intent) • Auto-assigned to AE pipeline",
      badge: "HubSpot / Salesforce Synced",
      color: "border-amber-500/50 text-amber-400 bg-amber-500/10",
    },
    {
      label: "AI Context-Aware Response & Calendar Lock",
      node: "calendar",
      detail: "Offered Thursday 2:00 PM EST • Customer clicked 1-tap confirm",
      badge: "Google Meet Link Dispatched",
      color: "border-purple-500/50 text-purple-400 bg-purple-500/10",
    },
    {
      label: "Revenue Pipeline Locked & Logged",
      node: "booking",
      detail: "Booking Confirmed • $24,000 Opportunity added to Q3 forecast",
      badge: "Automated Conversion Complete",
      color: "border-emerald-500/50 text-emerald-400 bg-emerald-500/10",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3200);
    return () => clearInterval(timer);
  }, [steps.length]);

  const nodes = [
    { id: "whatsapp", label: "WhatsApp", icon: Smartphone, x: "-36%", y: "-35%" },
    { id: "instagram", label: "Instagram DM", icon: Share2, x: "36%", y: "-35%" },
    { id: "website", label: "Website Chat", icon: Globe, x: "-45%", y: "5%" },
    { id: "customer", label: "Customer Inbound", icon: Users, x: "45%", y: "5%" },
    { id: "calendar", label: "Live Calendar", icon: Calendar, x: "-32%", y: "42%" },
    { id: "crm", label: "CRM Sync", icon: Database, x: "32%", y: "42%" },
  ];

  return (
    <section id="engine" className="py-28 relative overflow-hidden bg-[#05070D] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-xs font-mono font-bold text-brand-accent">
            <Cpu className="w-3.5 h-3.5" />
            <span>Autonomous Intelligence Core</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            How FlowPilot operates in real time.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            From multi-channel inbound capture to calendar confirmation without human lag.
          </p>
        </div>

        {/* The Visual Neural Hub Stage */}
        <div className="relative w-full max-w-4xl mx-auto aspect-square sm:aspect-[16/11] rounded-3xl bg-slate-950/70 border border-white/10 p-6 sm:p-12 shadow-2xl flex items-center justify-center overflow-hidden">
          {/* Subtle Grid Canvas */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(255, 94, 58, 0.2) 0%, transparent 70%), linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 40px 40px, 40px 40px",
            }}
          />

          {/* Central Pulsing AI Core */}
          <div className="relative z-20 flex flex-col items-center justify-center">
            {/* Outer Glowing Energy Orbit */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute w-36 h-36 sm:w-48 sm:h-48 rounded-full border border-dashed border-brand-accent/40 pointer-events-none"
            />
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute w-32 h-32 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-brand-accent via-orange-500 to-amber-400 blur-2xl pointer-events-none"
            />

            {/* Core Neural Sphere */}
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-[#0B0F19] border border-brand-accent/60 shadow-2xl shadow-brand-accent/40 flex flex-col items-center justify-center text-center p-3 z-10">
              <Cpu className="w-8 h-8 text-brand-accent animate-pulse mb-1" />
              <span className="text-[11px] font-black uppercase tracking-wider text-white font-mono">
                FlowPilot
              </span>
              <span className="text-[9px] font-mono text-emerald-400 font-bold">CORE ONLINE</span>
            </div>
          </div>

          {/* Surrounding Floating Nodes */}
          {nodes.map((node) => {
            const Icon = node.icon;
            const isTarget =
              (activeStep === 0 && node.id === "customer") ||
              (activeStep === 2 && node.id === "crm") ||
              (activeStep === 3 && node.id === "calendar");

            return (
              <motion.div
                key={node.id}
                style={{ left: `calc(50% + ${node.x})`, top: `calc(50% + ${node.y})` }}
                animate={{
                  y: isTarget ? [-4, 4, -4] : 0,
                  scale: isTarget ? 1.08 : 1,
                }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border transition-all duration-500 select-none shadow-xl ${
                  isTarget
                    ? "bg-slate-900 border-brand-accent text-white shadow-brand-accent/30"
                    : "bg-[#0B0F19]/90 border-white/10 text-slate-300 hover:border-white/20"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 ${
                    isTarget ? "bg-brand-accent text-white" : "bg-white/10 text-slate-300"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold tracking-tight">{node.label}</span>
              </motion.div>
            );
          })}

          {/* SVG Dynamic Connection Pulses */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            <line
              x1="50%"
              y1="50%"
              x2="15%"
              y2="15%"
              stroke="rgba(255, 94, 58, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <line
              x1="50%"
              y1="50%"
              x2="85%"
              y2="15%"
              stroke="rgba(255, 94, 58, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <line
              x1="50%"
              y1="50%"
              x2="8%"
              y2="55%"
              stroke="rgba(255, 94, 58, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <line
              x1="50%"
              y1="50%"
              x2="92%"
              y2="55%"
              stroke="rgba(255, 94, 58, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <line
              x1="50%"
              y1="50%"
              x2="18%"
              y2="90%"
              stroke="rgba(255, 94, 58, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <line
              x1="50%"
              y1="50%"
              x2="82%"
              y2="90%"
              stroke="rgba(255, 94, 58, 0.25)"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        {/* Live Step Execution Ticker */}
        <div className="max-w-4xl mx-auto mt-8">
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
                    Step 0{activeStep + 1} • {steps[activeStep].label}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 font-medium font-mono">
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
