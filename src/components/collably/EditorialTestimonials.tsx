"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Quote } from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";
import { useGlobalCurrency } from "@/context/CurrencyContext";

export function EditorialTestimonials() {
  const { format } = useGlobalCurrency();

  const commitments = [
    {
      title: "Milestone-Protected Escrow",
      description:
        "Campaign budgets are deposited into platform escrow before creator production begins. Funds are strictly released upon milestone deliverables approval.",
      pillar: "Financial Security",
      badge: "100% Escrow Funded",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    },
    {
      title: "Frame-Accurate Video QA",
      description:
        "Collaborate seamlessly with timecoded pin notes, revision timelines, and exportable DaVinci Resolve and Premiere Pro markers.",
      pillar: "Review Architecture",
      badge: "Frame-Accurate",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    },
    {
      title: "Direct Digital Rights & Fast Settlement",
      description:
        "Every collaboration generates clear commercial digital rights documentation and settles approved milestone payouts directly within 24 hours.",
      pillar: "Operational Clarity",
      badge: "< 24hr Settlement",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80",
    },
  ];

  return (
    <section className="py-24 sm:py-28 bg-transparent border-b border-white/10 relative overflow-hidden select-none text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-mono font-bold text-[hsl(327,100%,55%)] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Core Workflow Commitments</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["trusted", "world-class", "creators", "founders"]}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-tight"
          >
            Built for professional creators &amp; sponsor brands.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["delivering", "results", "milestone", "peace"]}
            className="text-sm sm:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Institutional financial safeguards, frame-accurate review tools, and instant escrow settlements.
          </ScrollRevealText>
        </div>

        {/* 3 Large Editorial Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {commitments.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/40 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between space-y-6 group hover:-translate-y-1 text-white"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-pink-500/15 text-[hsl(327,100%,55%)] border border-pink-500/30 font-mono text-xs font-bold">
                    {c.badge}
                  </span>
                  <Quote className="w-5 h-5 text-pink-400/40 group-hover:text-[hsl(327,100%,55%)] transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-white font-display">
                  {c.title}
                </h3>

                <p className="text-sm text-slate-300 font-medium leading-relaxed font-sans">
                  {c.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <p className="text-xs text-pink-400 font-mono font-bold tracking-wide uppercase">
                  {c.pillar}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
