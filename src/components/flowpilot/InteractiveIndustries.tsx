"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Stethoscope,
  Building,
  Laptop,
  Dumbbell,
  Scale,
  Hotel,
  Car,
  ShoppingBag,
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export function InteractiveIndustries() {
  const [selectedIndustry, setSelectedIndustry] = useState(0);

  const industries = [
    {
      id: "b2b",
      name: "B2B SaaS & Tech",
      icon: Laptop,
      badge: "High-Ticket Enterprise",
      metric: "+44% Demo Shows",
      averageDeal: "$18,000 - $60,000 ARR",
      headline: "Qualify technical buyers & route directly to Account Executives.",
      dialogue: {
        customer: "We need SOC2 compliance and SSO integration for 150 team members. Can we get pricing?",
        aiResponse: "Yes! FlowPilot is fully SOC2-ready with Okta/SAML SSO support. I’ve alerted our Solutions VP and held a private 30-min technical architecture call for your team this Wednesday at 3:00 PM EST. Would that work?",
      },
      tags: ["HubSpot Sync", "Salesforce Two-Way", "Slack Lead Alerts"],
    },
    {
      id: "healthcare",
      name: "MedSpas & Aesthetics",
      icon: Stethoscope,
      badge: "HIPAA Compliant",
      metric: "92% Deposit Collection",
      averageDeal: "$1,200 - $4,500 / patient",
      headline: "Book high-value clinical consultations and collect pre-deposits 24/7.",
      dialogue: {
        customer: "Hi! Do you have openings for Morpheus8 full-face treatment this Saturday morning?",
        aiResponse: "Hello! Dr. Bennett has two Saturday slots open: 9:30 AM and 11:15 AM. We collect a $150 refundable consultation deposit to lock the slot. Would you like me to hold the 9:30 AM appointment for you?",
      },
      tags: ["HIPAA Verified", "Stripe Deposit Link", "EMR Integration"],
    },
    {
      id: "realestate",
      name: "Luxury Real Estate",
      icon: Building,
      badge: "HNW Lead Qualification",
      metric: "3.2x Private Tour Volume",
      averageDeal: "$1.5M - $8M Listing Value",
      headline: "Instantly screen buyer liquidity and schedule verified private penthouse showings.",
      dialogue: {
        customer: "Is the penthouse at 432 Park Ave still accepting private viewings this weekend?",
        aiResponse: "Yes, private tours are open for pre-qualified buyers on Saturday at 2:00 PM. Would you like the VIP gate code and private walkthrough confirmation sent to your WhatsApp?",
      },
      tags: ["Pre-Approval Screening", "WhatsApp Tour Invites", "Broker Direct Routing"],
    },
    {
      id: "fitness",
      name: "Longevity & Fitness",
      icon: Dumbbell,
      badge: "Membership Conversions",
      metric: "+52% Trial Bookings",
      averageDeal: "$250 - $850 / month",
      headline: "Fill high-ticket personal training and recovery memberships automatically.",
      dialogue: {
        customer: "I want to start personal training and cold plunge recovery. What is your intro package?",
        aiResponse: "Welcome! Our 14-Day Longevity Intro includes 3 1-on-1 coaching sessions plus unlimited infrared sauna & cold plunge for $199. Would you like to book your fitness assessment tomorrow at 6:00 PM?",
      },
      tags: ["Mindbody Sync", "Stripe Checkout", "Automated SMS Reminders"],
    },
    {
      id: "legal",
      name: "Legal & Consulting",
      icon: Scale,
      badge: "Retainer Agreements",
      metric: "< 60s Intake Turnaround",
      averageDeal: "$5,000 - $25,000 Retainers",
      headline: "Capture high-urgency client matters and book paid attorney consultations.",
      dialogue: {
        customer: "Need immediate legal counsel regarding an IP licensing breach for our Delaware corp.",
        aiResponse: "Understood. Our Managing Partner handles corporate IP litigation. We have an expedited retainer consultation slot open today at 4:00 PM EST. Shall I reserve this for your firm?",
      },
      tags: ["Conflict Check Form", "Clio Sync", "Encrypted Document Ingest"],
    },
    {
      id: "hospitality",
      name: "Luxury Hospitality",
      icon: Hotel,
      badge: "VIP Concierge",
      metric: "+68% Direct Bookings",
      averageDeal: "$800 - $3,200 / night",
      headline: "Handle bespoke guest inquiries, dining reservations, and penthouse stays.",
      dialogue: {
        customer: "Can we book the Grand Suite for our anniversary on Sept 14th with airport helicopter transfer?",
        aiResponse: "Congratulations! The Grand Suite is available for Sept 14th with complimentary champagne and helipad coordination. Would you like me to confirm the reservation directly with our guest director?",
      },
      tags: ["Opera PMS Sync", "WhatsApp Concierge", "Stripe Payment Link"],
    },
  ];

  const current = industries[selectedIndustry];

  return (
    <section id="industries" className="py-28 bg-[#05070D] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono font-bold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Vertical Intelligence Models</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Tailored for high-ticket industries.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Pre-trained on industry-specific compliance standards, objection matrices, and booking flows.
          </p>
        </div>

        {/* Industry Pill Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            const isSelected = selectedIndustry === idx;
            return (
              <button
                key={ind.id}
                onClick={() => setSelectedIndustry(idx)}
                className={`p-3.5 rounded-2xl border transition-all duration-300 select-none flex flex-col items-center text-center gap-2 ${
                  isSelected
                    ? "bg-slate-900 border-brand-accent text-white shadow-lg shadow-brand-accent/20 scale-[1.03]"
                    : "bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    isSelected ? "bg-brand-accent text-white" : "bg-white/10 text-slate-300"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold font-mono tracking-tight">{ind.name}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Industry Interactive Canvas */}
        <div className="rounded-3xl bg-slate-950 border border-white/15 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Details */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-brand-accent/15 border border-brand-accent/30 text-brand-accent text-xs font-mono font-bold">
                    {current.badge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> {current.metric}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
                  {current.headline}
                </h3>

                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-1 font-mono text-xs text-slate-300">
                  <span className="text-slate-500 block uppercase font-bold text-[10px]">Average Deal Size</span>
                  <span className="text-amber-300 font-extrabold text-sm">{current.averageDeal}</span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {current.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-slate-300"
                    >
                      <CheckCircle2 className="w-3 h-3 text-brand-accent" /> {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Live Dialogue Box */}
              <div className="lg:col-span-6 rounded-2xl bg-slate-900/90 border border-white/15 p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400 pb-3 border-b border-white/10">
                  <span className="text-white font-bold">{current.name} • Live Inbound Simulation</span>
                  <span className="text-emerald-400">● REAL-TIME</span>
                </div>

                {/* Customer Message */}
                <div className="p-4 rounded-xl rounded-tl-none bg-slate-950 border border-white/10 text-xs text-slate-200 leading-relaxed font-mono">
                  <span className="text-slate-400 text-[10px] block mb-1">Customer Inbound</span>
                  &quot;{current.dialogue.customer}&quot;
                </div>

                {/* AI Closer Response */}
                <div className="p-4 rounded-xl rounded-tr-none bg-gradient-to-br from-brand-accent/20 to-orange-500/10 border border-brand-accent/30 text-xs text-slate-100 leading-relaxed font-mono">
                  <span className="text-brand-accent text-[10px] font-bold block mb-1">FlowPilot AI Closer (110ms)</span>
                  &quot;{current.dialogue.aiResponse}&quot;
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
