"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Quote } from "lucide-react";
import { ScrollRevealText } from "@/components/collably/ScrollRevealText";

export function EditorialTestimonials() {
  const testimonials = [
    {
      quote:
        "Collably solved our biggest bottleneck: chasing creators over DMs and dealing with invoice delays. We launched 25 sponsored Reels in 14 days with 100% milestone protection.",
      author: "Vikram Malhotra",
      role: "Head of Growth",
      company: "HyperScale AI",
      result: "+42% Engagement Surge",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
    },
    {
      quote:
        "Knowing my $3,200 fee was secured in escrow before I picked up the camera gave me complete creative confidence. The payout was in my bank within 12 hours of the brand approving the cut.",
      author: "Marcus Vance",
      role: "Independent 4K Filmmaker",
      company: "890K Subscribers",
      result: "0 Days Invoice Waiting",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
    },
    {
      quote:
        "The frame-accurate timecode comments alone saved our creative team 20 hours of back-and-forth review calls. It feels like Linear built specifically for the creator economy.",
      author: "Sarah Jenkins",
      role: "VP of Brand Marketing",
      company: "Kira Cosmetics",
      result: "$180K Attributed GMV",
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
            <span>14 • Real Partnership Stories</span>
          </div>

          <ScrollRevealText
            as="h2"
            gradientWords={["trusted", "world-class", "creators", "founders"]}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight font-display leading-tight"
          >
            Trusted by world-class creators &amp; founders.
          </ScrollRevealText>

          <ScrollRevealText
            as="p"
            gradientWords={["delivering", "results", "milestone", "peace"]}
            className="text-sm sm:text-lg text-slate-300 font-sans max-w-2xl mx-auto leading-relaxed"
          >
            Real results and authentic feedback from teams shipping high-performing video partnerships.
          </ScrollRevealText>
        </div>

        {/* 3 Large Editorial Quote Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 sm:p-10 rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/40 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between space-y-6 group hover:-translate-y-1 text-white"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3.5 py-1 rounded-full bg-pink-500/15 text-[hsl(327,100%,55%)] border border-pink-500/30 font-mono text-xs font-bold">
                    {t.result}
                  </span>
                  <Quote className="w-5 h-5 text-pink-400/40 group-hover:text-[hsl(327,100%,55%)] transition-colors" />
                </div>

                <p className="text-sm sm:text-base text-slate-200 font-medium leading-relaxed font-sans">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-11 h-11 rounded-2xl object-cover border border-white/10"
                />
                <div>
                  <h4 className="font-bold text-sm text-white font-display">{t.author}</h4>
                  <p className="text-xs text-slate-400 font-mono">
                    {t.role} • {t.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
