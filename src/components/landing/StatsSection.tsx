"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, DollarSign, Clock } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      label: "Milestone Escrow Protection",
      value: "100%",
      subtext: "Pre-funded in Stripe custody, released on QA approval",
      icon: ShieldCheck,
      highlight: true,
    },
    {
      label: "Invoice Chasing For Creators",
      value: "0 Days",
      subtext: "Automated instant payouts upon milestone sign-off",
      icon: Zap,
    },
    {
      label: "Flat Platform Fee",
      value: "10%",
      subtext: "Transparent commission with zero hidden markups",
      icon: DollarSign,
    },
    {
      label: "Dispute & Support SLA",
      value: "< 4 Hrs",
      subtext: "Dedicated human arbitration & review desk",
      icon: Clock,
    },
  ];

  return (
    <section className="py-20 border-y border-black/8 bg-white text-[#0A0A0E] select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`p-6 sm:p-7 rounded-3xl transition-all flex flex-col justify-between text-center space-y-4 border hover-lift ${
                  s.highlight
                    ? "bg-gradient-to-b from-[#FFFDF5] to-white border-2 border-[#FFD21F] shadow-[0_8px_24px_rgba(255,210,31,0.18)]"
                    : "bg-white border-black/8 hover:border-black/20 shadow-xs"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto shadow-xs ${
                    s.highlight
                      ? "bg-gradient-to-br from-[#FFD21F] to-[#FFAE00] text-[#0A0A0E]"
                      : "bg-[#F8F8FC] border border-black/6 text-[#0A0A0E]"
                  }`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-3xl sm:text-4xl font-black text-[#0A0A0E] font-display tracking-tight">
                    {s.value}
                  </p>
                  <p className="text-xs font-bold text-[#0A0A0E] uppercase tracking-wider font-mono">
                    {s.label}
                  </p>
                  <p className="text-xs text-[#6A6A78] mt-1 leading-relaxed font-sans">
                    {s.subtext}
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
