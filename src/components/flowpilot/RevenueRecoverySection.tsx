"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, AlertTriangle, ShieldCheck, CheckCircle, Zap, Clock } from "lucide-react";

export function RevenueRecoverySection() {
  const [stage, setStage] = useState(0);

  const recoveryStages = [
    { abandoned: 47, recovered: 0, revenue: "$0", label: "Initial Drop-Off (After Hours & Missed Calls)" },
    { abandoned: 31, recovered: 16, revenue: "$48,000", label: "2-Hour Autonomous Re-engagement Triggered" },
    { abandoned: 18, recovered: 29, revenue: "$87,000", label: "Objection Clarified & Pricing FAQ Sent" },
    { abandoned: 7, recovered: 40, revenue: "$124,000", label: "VIP Hold Slot Reminder Dispatched" },
    { abandoned: 0, recovered: 47, revenue: "$148,500", label: "100% Pipeline Recovered & Calendar Locked" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => (prev + 1) % recoveryStages.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [recoveryStages.length]);

  const current = recoveryStages[stage];

  return (
    <section id="recovery" className="py-28 bg-[#05070D] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-xs font-mono font-bold text-rose-400">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>AI Revenue Recovery Engine</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Turn abandoned inquiries into \$148k+ pipeline.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            63% of high-intent buyers message after 6:00 PM and abandon when they don&apos;t get an instant response. FlowPilot autonomously resurrects them.
          </p>
        </div>

        {/* The Live Interactive Recovery Dashboard Card */}
        <div className="max-w-5xl mx-auto rounded-3xl bg-slate-950 border border-white/15 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Backing */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left items-center pb-10 border-b border-white/10">
            {/* Abandoned Counter */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center justify-center md:justify-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Abandoned Leads
              </span>
              <motion.div
                key={current.abandoned}
                initial={{ scale: 1.2, color: "#F43F5E" }}
                animate={{ scale: 1, color: current.abandoned === 0 ? "#10B981" : "#F43F5E" }}
                className="text-5xl sm:text-7xl font-black font-mono tracking-tight"
              >
                {current.abandoned}
              </motion.div>
              <p className="text-xs text-slate-500 font-mono">Unanswered Inquiries</p>
            </div>

            {/* Recovered Leads Counter */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400 flex items-center justify-center md:justify-start gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Re-engaged Leads
              </span>
              <motion.div
                key={current.recovered}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className="text-5xl sm:text-7xl font-black font-mono tracking-tight text-white"
              >
                {current.recovered}
              </motion.div>
              <p className="text-xs text-slate-500 font-mono">Resurrected via AI</p>
            </div>

            {/* Total Recovered Value */}
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-center md:justify-start gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Recovered Pipeline
              </span>
              <motion.div
                key={current.revenue}
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                className="text-4xl sm:text-6xl font-black font-mono tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent"
              >
                {current.revenue}
              </motion.div>
              <p className="text-xs text-slate-500 font-mono">High-Ticket Bookings Won</p>
            </div>
          </div>

          {/* Real-Time Phase Status */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-brand-accent animate-ping" />
              <span className="text-xs font-mono text-slate-300 font-bold">
                Phase 0{stage + 1}: {current.label}
              </span>
            </div>

            {/* Manual Stage Trigger Pills */}
            <div className="flex items-center gap-1.5">
              {recoveryStages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setStage(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    stage === idx ? "w-8 bg-brand-accent" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Jump to stage ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
