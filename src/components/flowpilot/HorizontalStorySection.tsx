"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Inbox,
  Brain,
  MessageCircle,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Smartphone,
  Share2,
  Calendar,
  CreditCard,
  ShieldCheck,
} from "lucide-react";

export function HorizontalStorySection() {
  const [activePanel, setActivePanel] = useState(0);

  const panels = [
    {
      num: "01",
      title: "Omni-Channel Capture",
      tagline: "Every inbound message routed into one intelligent stream.",
      description:
        "Instantly listen to WhatsApp, Instagram DMs, Website Live Chat, SMS, and Facebook Messenger. No lost inquiries, no manual tab-switching.",
      metrics: "0ms Ingest Delay • 100% Inbound Capture Rate",
      icon: Inbox,
      gradient: "from-[#FFD21F]/20 to-[#FFD21F]/5",
      accent: "text-[#FFD21F] border-[#FFD21F]/30",
      uiPreview: (
        <div className="space-y-3 p-5 rounded-2xl bg-slate-900/90 border border-white/10 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-white/10">
            <span className="flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-emerald-400" /> WhatsApp Cloud API</span>
            <span className="text-emerald-400">ONLINE</span>
          </div>
          <p className="text-white font-medium">&quot;Hi, we want to book 10 consulting slots for next month.&quot;</p>
          <div className="flex items-center gap-2 text-[10px] text-slate-400">
            <span className="px-2 py-0.5 rounded bg-white/10 text-white font-bold">Ingested</span>
            <span>Channel ID: #WA-9482 • Synced</span>
          </div>
        </div>
      ),
    },
    {
      num: "02",
      title: "Semantic Understanding",
      tagline: "Classifies intent, budget, and urgency in 120 milliseconds.",
      description:
        "FlowPilot does not use dumb keyword matching. It understands nuanced customer questions, handles objections, and evaluates purchasing authority with custom prompt guardrails.",
      metrics: "99.4% Accuracy • Real-Time Vector Search",
      icon: Brain,
      gradient: "from-purple-500/20 to-indigo-500/5",
      accent: "text-purple-400 border-purple-500/30",
      uiPreview: (
        <div className="space-y-3 p-5 rounded-2xl bg-slate-900/90 border border-white/10 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-white/10">
            <span className="flex items-center gap-1.5"><Brain className="w-3.5 h-3.5 text-purple-400" /> Intent Classifier</span>
            <span className="text-purple-400">94ms</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-slate-400 block">Lead Urgency</span>
              <span className="text-emerald-400 font-bold">IMMEDIATE</span>
            </div>
            <div className="p-2 rounded-xl bg-white/5 border border-white/5">
              <span className="text-[10px] text-slate-400 block">Lead Score</span>
              <span className="text-amber-400 font-bold">96 / 100</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      num: "03",
      title: "Human-Grade Engagement",
      tagline: "Natural, contextual conversations that sound like your best closer.",
      description:
        "Trained on your product catalog, objection cheat-sheets, and pricing tables. FlowPilot responds with empathetic, precise phrasing that drives trust.",
      metrics: "Custom Brand Voice • Multi-Language Support",
      icon: MessageCircle,
      gradient: "from-orange-500/20 to-amber-500/5",
      accent: "text-orange-400 border-orange-500/30",
      uiPreview: (
        <div className="space-y-3 p-5 rounded-2xl bg-slate-900/90 border border-white/10 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-white/10">
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-brand-accent" /> FlowPilot AI Closer</span>
            <span className="text-brand-accent">Generated</span>
          </div>
          <p className="text-slate-200 text-[11px] leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
            &quot;We’d love to have your team! We have dedicated slots on Thursday at 2:00 PM EST with our Senior Solution Architect. Would that time suit you?&quot;
          </p>
        </div>
      ),
    },
    {
      num: "04",
      title: "Autonomous Follow-Up",
      tagline: "Resurrect cold leads with intelligent, timed re-engagements.",
      description:
        "If a customer drops off before confirming a slot, FlowPilot sends tailored follow-ups at optimal intervals (2 hours, 24 hours, 3 days) to recapture the deal.",
      metrics: "+31% Recovered Pipeline • Zero Annoying Spam",
      icon: Clock,
      gradient: "from-amber-500/20 to-yellow-500/5",
      accent: "text-amber-400 border-amber-500/30",
      uiPreview: (
        <div className="space-y-3 p-5 rounded-2xl bg-slate-900/90 border border-white/10 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-white/10">
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-amber-400" /> Smart Follow-Up Engine</span>
            <span className="text-amber-400">Triggered +2h</span>
          </div>
          <p className="text-slate-300 text-[11px]">
            &quot;Just holding the Thursday 2:00 PM slot for you for the next 30 minutes! Want me to lock it in?&quot;
          </p>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1 font-bold">
            <CheckCircle className="w-3 h-3" /> Lead re-engaged within 4 minutes
          </div>
        </div>
      ),
    },
    {
      num: "05",
      title: "Direct Conversion & CRM Sync",
      tagline: "Confirmed appointments, payment links, and two-way CRM logging.",
      description:
        "FlowPilot checks real-time calendar availability (Google Calendar, Outlook, Cal.com), creates calendar invites, sends Stripe payment links, and updates HubSpot/Salesforce.",
      metrics: "100% Calendar Integrity • Instant Stripe Payouts",
      icon: CheckCircle,
      gradient: "from-emerald-500/20 to-teal-500/5",
      accent: "text-emerald-400 border-emerald-500/30",
      uiPreview: (
        <div className="space-y-3 p-5 rounded-2xl bg-slate-900/90 border border-white/10 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-white/10">
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-emerald-400" /> Appointment Confirmed</span>
            <span className="text-emerald-400 font-bold">$24,000 DEAL</span>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[11px]">
            ✓ Event: Enterprise Strategy Demo • Thurs 2:00 PM EST
          </div>
          <div className="text-[10px] text-slate-400 flex items-center justify-between">
            <span>HubSpot ID: #OPP-8391</span>
            <span className="text-white font-bold">Stripe: Verified</span>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="story" className="py-28 bg-[#05070D] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header with Step Counter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-brand-accent" />
              <span>5-Stage Autonomous Revenue Architecture</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              The conversion pipeline.
            </h2>
            <p className="text-sm sm:text-base text-slate-400">
              Explore how FlowPilot transforms cold inbound visitors into verified paid bookings.
            </p>
          </div>

          {/* Progress Indicator (01 / 05) */}
          <div className="flex items-center gap-4">
            <div className="font-mono text-3xl font-black text-white flex items-center gap-2">
              <span className="text-brand-accent">0{activePanel + 1}</span>
              <span className="text-white/20">/</span>
              <span className="text-slate-500">05</span>
            </div>
          </div>
        </div>

        {/* Step Navigation Pill Track */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar">
          {panels.map((p, idx) => (
            <button
              key={p.num}
              onClick={() => setActivePanel(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 select-none whitespace-nowrap flex items-center gap-2 ${
                activePanel === idx
                  ? "bg-white text-slate-950 shadow-xl scale-[1.02]"
                  : "bg-white/[0.04] text-slate-400 hover:text-white hover:bg-white/[0.08] border border-white/10"
              }`}
            >
              <span>{p.num}</span>
              <span>{p.title}</span>
            </button>
          ))}
        </div>

        {/* Active Stage Hero Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Narrative Details */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePanel}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-bold ${panels[activePanel].accent}`}>
                  <span>STAGE {panels[activePanel].num}</span>
                  <span>•</span>
                  <span>{panels[activePanel].metrics}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  {panels[activePanel].tagline}
                </h3>

                <p className="text-base text-slate-400 leading-relaxed max-w-xl">
                  {panels[activePanel].description}
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    onClick={() => setActivePanel((prev) => (prev + 1) % panels.length)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/[0.08] border border-white/15 text-xs font-mono font-bold text-white hover:bg-white/15 transition-all"
                  >
                    <span>Next Stage</span>
                    <ArrowRight className="w-3.5 h-3.5 text-brand-accent" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column: Interactive UI Showcase Preview */}
          <div className="lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePanel}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-br ${panels[activePanel].gradient} border border-white/15 shadow-2xl backdrop-blur-2xl relative overflow-hidden`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <span className="text-white font-bold uppercase">Live Engine Telemetry</span>
                    <span className="text-emerald-400 font-bold">● ACTIVE</span>
                  </div>

                  {panels[activePanel].uiPreview}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
