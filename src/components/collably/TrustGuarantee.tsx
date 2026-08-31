"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, DollarSign, Clock } from "lucide-react";
import { AnimatedCounter } from "@/components/collably/AnimatedCounter";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function TrustGuarantee() {
  const trustMetrics = [
    {
      to: 100,
      suffix: "%",
      label: "Milestone-Locked Funds",
      subtext: "Brand deposits are secured via Stripe Connect before creators start filming.",
      icon: ShieldCheck,
      color: "from-orange-500 via-rose-500 to-pink-500",
      bgColor: "bg-orange-50 border-orange-200 text-brand-accent",
    },
    {
      to: 0,
      prefix: "",
      suffix: " Days",
      label: "Invoice Waiting",
      subtext: "Automated payouts directly to creator bank accounts upon deliverable approval.",
      icon: Zap,
      color: "from-rose-500 via-pink-500 to-purple-500",
      bgColor: "bg-pink-50 border-pink-200 text-rose-600",
    },
    {
      to: 10,
      suffix: "%",
      label: "Flat Platform Fee",
      subtext: "Transparent commission on completed deals. Zero hidden monthly SaaS fees.",
      icon: DollarSign,
      color: "from-pink-500 via-purple-500 to-indigo-500",
      bgColor: "bg-purple-50 border-purple-200 text-purple-600",
    },
    {
      to: 4,
      prefix: "< ",
      suffix: "h",
      label: "Dispute SLA",
      subtext: "Guaranteed human arbitration response for revisions or missed guidelines.",
      icon: Clock,
      color: "from-emerald-500 via-teal-500 to-cyan-600",
      bgColor: "bg-emerald-50 border-emerald-200 text-emerald-600",
    },
  ];

  return (
    <section className="py-24 sm:py-28 bg-slate-50/50 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 via-rose-50 to-pink-50 border border-orange-200/80 text-xs font-mono text-brand-accent font-bold shadow-xs">
            <span>The Collably Trust Standard</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["confidence", "scale"]}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans leading-tight"
          >
            Built for confidence at scale.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["milestone", "accountability", "informal", "delays"]}
            className="text-sm sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Replacing informal DMs, unverified follower counts, and 90-day invoice delays with milestone accountability.
          </ScrollRevealText>
        </div>

        {/* 4 Cards Grid with Side Sliding Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustMetrics.map((item, i) => {
            const Icon = item.icon;
            const slideFrom = i < 2 ? -25 : 25;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: slideFrom, y: 10 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-white border border-slate-200/90 hover:border-orange-300 transition-all duration-300 shadow-card hover:shadow-elevated space-y-4 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${item.bgColor} group-hover:scale-105 transition-transform shadow-xs`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">Standard 0{i + 1}</span>
                </div>

                <div className="space-y-2">
                  <div className={`text-4xl sm:text-5xl font-black font-mono tracking-tight bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    <AnimatedCounter
                      to={item.to}
                      prefix={item.prefix}
                      suffix={item.suffix}
                      duration={1.4}
                    />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 tracking-tight font-sans">
                    {item.label}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
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
