"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, Target, ArrowUpRight, DollarSign } from "lucide-react";
import { AnimatedCounter } from "@/components/collably/AnimatedCounter";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function PerformanceROI() {
  const metrics = [
    {
      to: 2.4,
      prefix: "",
      suffix: "M+",
      label: "Campaign Reach",
      subtext: "Verified impressions across targeted consumer demographics.",
      icon: Users,
      color: "from-orange-500 to-rose-500",
    },
    {
      to: 8.7,
      prefix: "",
      suffix: "%",
      label: "Average Engagement",
      subtext: "3.2× higher than standard unvetted creator agency benchmarks.",
      icon: TrendingUp,
      color: "from-rose-500 to-pink-500",
    },
    {
      to: 14820,
      prefix: "",
      suffix: "",
      label: "Tracked Conversions",
      subtext: "Direct promo code redemptions and link click attribution.",
      icon: Target,
      color: "from-pink-500 to-purple-500",
    },
    {
      to: 4.8,
      prefix: "",
      suffix: "×",
      label: "Verifiable ROI",
      subtext: "Average revenue generated per marketing dollar allocated.",
      icon: DollarSign,
      color: "from-emerald-500 to-teal-500",
    },
  ];

  return (
    <section className="py-24 sm:py-28 bg-white border-b border-slate-200 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-orange-50 to-rose-50 border border-orange-200/80 text-xs font-mono font-bold text-brand-accent shadow-xs">
            <BarChart3 className="w-3.5 h-3.5 text-brand-accent" />
            <span>11 • Real-Time Performance Telemetry</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["measurable", "performance", "verifiable", "roi"]}
            className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans leading-tight"
          >
            Measurable performance. Verifiable ROI.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["real-time", "analytics", "attribution", "telemetry"]}
            className="text-sm sm:text-lg text-slate-600 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Real-time analytics and attribution telemetry track every dollar deployed across your creator roster.
          </ScrollRevealText>
        </div>

        {/* 4 Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200 hover:border-orange-300 transition-all duration-300 shadow-card hover:shadow-elevated flex flex-col justify-between space-y-5 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-slate-900 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-brand-accent" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">METRIC 0{i + 1}</span>
                </div>

                <div className="space-y-2">
                  <div className={`text-4xl sm:text-5xl font-black font-mono tracking-tight bg-gradient-to-r ${m.color} bg-clip-text text-transparent`}>
                    <AnimatedCounter
                      to={m.to}
                      prefix={m.prefix}
                      suffix={m.suffix}
                      duration={1.5}
                    />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 font-sans">
                    {m.label}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans">
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
