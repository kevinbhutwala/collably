"use client";

import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, Clock, Zap, ShieldCheck } from "lucide-react";

export function CinematicMetrics() {
  const metrics = [
    {
      value: "+38%",
      label: "Qualified Booking Rate",
      subtext: "Compared to traditional web forms and manual SDR follow-up queues.",
      icon: TrendingUp,
      accent: "from-brand-accent to-orange-500",
    },
    {
      value: "< 850ms",
      label: "Autonomous Response Time",
      subtext: "Instant semantic parsing across WhatsApp, Instagram, and Web Chat.",
      icon: Zap,
      accent: "from-amber-400 to-orange-400",
    },
    {
      value: "24/7/365",
      label: "Zero Human Burnout",
      subtext: "Captures and locks appointments while your sales team is sleeping.",
      icon: Clock,
      accent: "from-purple-400 to-indigo-400",
    },
    {
      value: "0",
      label: "Lost Inbound Inquiries",
      subtext: "100% of abandoned customer chats receive timed re-engagement.",
      icon: ShieldCheck,
      accent: "from-emerald-400 to-teal-400",
    },
  ];

  return (
    <section className="py-28 bg-[#05070D] border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300">
            <span>Verified Performance Telemetry</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Engineered for high-volume conversion.
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Backed by live telemetry from over 1.2M automated customer conversations.
          </p>
        </div>

        {/* 4 Large Typographic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-slate-950/80 border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl space-y-4 group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Metric 0{i + 1}</span>
                </div>

                <div className="space-y-2">
                  <div className={`text-4xl sm:text-5xl font-black font-mono tracking-tight bg-gradient-to-r ${m.accent} bg-clip-text text-transparent`}>
                    {m.value}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {m.label}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {m.subtext}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
