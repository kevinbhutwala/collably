"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, DollarSign, Clock, CheckCircle } from "lucide-react";

export function TrustGuarantee() {
  const trustMetrics = [
    {
      value: "100%",
      label: "Milestone-Locked Funds",
      subtext: "Brand deposits are secured via Stripe Connect before creators start filming.",
      icon: ShieldCheck,
      color: "from-brand-accent to-orange-500",
    },
    {
      value: "0 Days",
      label: "Invoice Waiting",
      subtext: "Automated payouts directly to creator bank accounts upon deliverable approval.",
      icon: Zap,
      color: "from-amber-400 to-orange-400",
    },
    {
      value: "10%",
      label: "Flat Platform Fee",
      subtext: "Transparent commission on completed deals. Zero hidden monthly SaaS fees.",
      icon: DollarSign,
      color: "from-purple-400 to-indigo-400",
    },
    {
      value: "< 4h",
      label: "Dispute SLA",
      subtext: "Guaranteed human arbitration response for revisions or missed guidelines.",
      icon: Clock,
      color: "from-emerald-400 to-teal-400",
    },
  ];

  return (
    <section className="py-28 bg-[#05070D] border-b border-white/[0.08] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300">
            <span>The Collably Trust Standard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight font-sans">
            Built for confidence at scale.
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Replacing informal DMs, unverified follower counts, and 90-day invoice delays with milestone accountability.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustMetrics.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-[#090D1A] border border-white/[0.08] hover:border-white/20 transition-all duration-300 shadow-xl space-y-4 flex flex-col justify-between group"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-slate-300 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase font-bold">Standard 0{i + 1}</span>
                </div>

                <div className="space-y-2">
                  <div className={`text-4xl sm:text-5xl font-black font-mono tracking-tight bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.value}
                  </div>
                  <h3 className="text-base font-bold text-white tracking-tight font-sans">
                    {item.label}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed font-sans">
                    {item.subtext}
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
