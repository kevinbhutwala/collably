"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Sparkles,
  Bot,
  User,
  CheckCircle2,
  Calendar,
  Zap,
  Play,
  RotateCcw,
  ShieldCheck,
  Building,
  Clock,
} from "lucide-react";

export function CinematicProductDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const demoSteps = [
    {
      id: "inbound",
      title: "Inbound Message Arrives",
      actor: "Customer (Marcus Vance - Head of Growth, Vertex Cloud)",
      time: "10:14 AM",
      text: "Hey! We are scaling our sales team to 40 reps and need an enterprise conversational AI pipeline by next week. Can we schedule an onboarding call this Thursday?",
      meta: "Channel: WhatsApp Business API • IP: San Francisco, US",
      status: "Inbound Received",
      statusColor: "text-sky-400 bg-sky-500/10 border-sky-500/30",
    },
    {
      id: "intent",
      title: "AI Semantic Intent Analysis",
      actor: "FlowPilot Neural Parser",
      time: "10:14 AM (+86ms)",
      text: "Intent: High-Ticket Enterprise Purchase • Team Size: 40 seats • Urgency: Critical (Next Week) • Estimated Contract Value: $36,000 ARR.",
      meta: "Confidence: 99.2% • Lead Tier: VIP Priority",
      status: "Lead Score: 98 / 100 (HIGH)",
      statusColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    },
    {
      id: "response",
      title: "Context-Aware Response Generation",
      actor: "FlowPilot AI Closer",
      time: "10:14 AM (+1.1s)",
      text: "Hi Marcus! We’d love to support your 40-rep rollout. We have dedicated enterprise onboarding slots this Thursday at 2:00 PM EST and 4:30 PM EST with our VP of Solutions. Which time works best for you?",
      meta: "Trained on Enterprise Pitch Deck • Multi-calendar free/busy synced",
      status: "Response Dispatched",
      statusColor: "text-brand-accent bg-brand-accent/10 border-brand-accent/30",
    },
    {
      id: "confirm",
      title: "Customer Slot Selection & Instant Confirmation",
      actor: "Customer Response",
      time: "10:15 AM",
      text: "Thursday at 2:00 PM EST works perfectly. Please send the invite to marcus@vertexcloud.io.",
      meta: "Customer selected preferred slot in 1 tap",
      status: "Slot Selected",
      statusColor: "text-purple-400 bg-purple-500/10 border-purple-500/30",
    },
    {
      id: "sync",
      title: "Autonomous Calendar Lock & CRM Synchronization",
      actor: "FlowPilot Integration Layer",
      time: "10:15 AM (+400ms)",
      text: "Calendar invite sent (Google Meet attached) • HubSpot Deal Created (#DEAL-9201, $36,000 ARR) • Slack notification pushed to #sales-enterprise channel.",
      meta: "Two-way webhook triggered • Zero human manual work required",
      status: "Pipeline Locked: $36,000 ARR",
      statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
    },
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [isPlaying, demoSteps.length]);

  return (
    <section id="demo" className="py-28 bg-[#05070D] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-xs font-mono font-bold text-brand-accent">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Conversation Replay</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Watch FlowPilot close a \$36k lead.
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Live sequential trace of customer inquiry, intent extraction, calendar scheduling, and CRM synchronization.
            </p>
          </div>

          {/* Interactive Playback Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-mono font-bold text-white transition-all"
            >
              {isPlaying ? "Pause Simulation" : "Resume Simulation"}
            </button>
            <button
              onClick={() => setCurrentStep(0)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-slate-300 hover:text-white transition-all"
              aria-label="Restart Simulation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* The Live Interactive Interface Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Chat Canvas */}
          <div className="lg:col-span-7 rounded-3xl bg-[#090D1A] border border-white/15 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
            {/* Window Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-400 ml-2">
                  Session: #LIVE-INBOUND-9402
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                FLOWPILOT ACTIVE
              </span>
            </div>

            {/* Conversation Messages Waterfall */}
            <div className="space-y-4 min-h-[380px]">
              {/* Message 1: Customer */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center shrink-0 text-white text-xs font-bold font-mono">
                  MV
                </div>
                <div className="p-4 rounded-2xl rounded-tl-none bg-slate-900 border border-white/10 max-w-lg space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                    <span className="text-slate-300 font-bold">Marcus Vance</span>
                    <span>10:14 AM</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    Hey! We are scaling our sales team to 40 reps and need an enterprise conversational AI pipeline by next week. Can we schedule an onboarding call this Thursday?
                  </p>
                </div>
              </motion.div>

              {/* Message 2: Intent Card */}
              {currentStep >= 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="ml-11 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs font-mono space-y-1.5"
                >
                  <div className="flex items-center justify-between text-amber-300 font-bold text-[11px]">
                    <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Intent Classification</span>
                    <span>94ms</span>
                  </div>
                  <p className="text-slate-300 text-[11px]">
                    Enterprise 40 Seats • Urgency: High • Estimated Pipeline: <span className="text-amber-300 font-bold">$36,000 ARR</span>
                  </p>
                </motion.div>
              )}

              {/* Message 3: AI Response */}
              {currentStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3 flex-row-reverse"
                >
                  <div className="w-8 h-8 rounded-xl bg-brand-accent flex items-center justify-center shrink-0 text-white text-xs font-bold font-mono shadow-md shadow-brand-accent/30">
                    FP
                  </div>
                  <div className="p-4 rounded-2xl rounded-tr-none bg-gradient-to-br from-brand-accent/20 to-orange-600/10 border border-brand-accent/40 max-w-lg space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-brand-accent font-mono">
                      <span className="font-bold">FlowPilot AI Closer</span>
                      <span>10:14 AM</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-100 leading-relaxed">
                      Hi Marcus! We’d love to support your 40-rep rollout. We have dedicated enterprise onboarding slots this Thursday at <strong>2:00 PM EST</strong> and <strong>4:30 PM EST</strong> with our VP of Solutions. Which time works best for you?
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Message 4: Customer Confirms */}
              {currentStep >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center shrink-0 text-white text-xs font-bold font-mono">
                    MV
                  </div>
                  <div className="p-4 rounded-2xl rounded-tl-none bg-slate-900 border border-white/10 max-w-lg space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                      <span className="text-slate-300 font-bold">Marcus Vance</span>
                      <span>10:15 AM</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      Thursday at 2:00 PM EST works perfectly. Please send the invite to marcus@vertexcloud.io.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Message 5: Booking Confirmed & CRM Logged */}
              {currentStep >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/40 text-xs font-mono space-y-2"
                >
                  <div className="flex items-center justify-between text-emerald-300 font-bold">
                    <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Appointment Confirmed &amp; CRM Synced</span>
                    <span>Status: WON / SCHEDULED</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] text-slate-300">
                    <div>📅 Google Meet: Thurs 2:00 PM EST</div>
                    <div>💼 HubSpot: #OPP-4029 ($36k)</div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>

          {/* Right Column: Execution Telemetry Feed */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
              Execution Sequence ({currentStep + 1} of {demoSteps.length})
            </h3>

            <div className="space-y-3">
              {demoSteps.map((step, idx) => {
                const isActive = currentStep === idx;
                const isPassed = currentStep > idx;

                return (
                  <div
                    key={step.id}
                    onClick={() => setCurrentStep(idx)}
                    className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer select-none ${
                      isActive
                        ? "bg-slate-900 border-white/30 shadow-xl scale-[1.02]"
                        : isPassed
                        ? "bg-[#090D1A]/60 border-white/5 opacity-70"
                        : "bg-[#090D1A]/30 border-white/5 opacity-40 hover:opacity-70"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-white font-mono">
                        0{idx + 1}. {step.title}
                      </span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-mono font-bold ${step.statusColor}`}>
                        {step.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 font-mono line-clamp-2">
                      {step.meta}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
