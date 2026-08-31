"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Lock } from "lucide-react";

export function CinematicCTA() {
  return (
    <section className="py-32 bg-[#05070D] relative overflow-hidden text-center select-none">
      {/* Central Radiance Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[1000px] h-[500px] bg-gradient-radial from-brand-accent/25 via-orange-600/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-xs font-mono text-slate-300 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-ping" />
          <span>Founding Enterprise Pilot Program Open</span>
        </div>

        <h2 className="text-4xl sm:text-7xl font-black text-white tracking-tight leading-[1.05]">
          Turn your next 1,000 inbound chats into{" "}
          <span className="bg-gradient-to-r from-brand-accent via-orange-400 to-amber-300 bg-clip-text text-transparent">
            confirmed revenue.
          </span>
        </h2>

        <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Deploy FlowPilot on your WhatsApp, Instagram, or Website in 15 minutes. Experience zero lost leads and 24/7 calendar conversion.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
          <a
            href="#demo"
            className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-brand-accent via-orange-500 to-amber-500 text-white font-bold text-base shadow-2xl shadow-brand-accent/30 hover:shadow-brand-accent/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group"
            data-cursor="LAUNCH"
          >
            <span>Launch Your Autonomous Pipeline</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          <a
            href="mailto:kevinbhutwala417@gmail.com"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/[0.06] border border-white/12 text-slate-200 font-semibold text-base hover:bg-white/10 hover:text-white hover:border-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-xl"
            data-cursor="CONTACT"
          >
            <span>Speak with Solutions Architect</span>
          </a>
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-mono text-slate-400 border-t border-white/10 max-w-2xl mx-auto">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>14-Day Free Architecture Pilot</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-brand-accent" />
            <span>SOC2 &amp; HIPAA Ready</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>15-Minute Zero-Code Setup</span>
          </div>
        </div>
      </div>
    </section>
  );
}
