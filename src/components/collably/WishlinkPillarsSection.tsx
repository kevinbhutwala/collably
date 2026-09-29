"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShieldCheck,
  Zap,
  MessageSquare,
  Briefcase,
  CheckCircle2,
  Lock,
  Sparkles,
  Send,
} from "lucide-react";

export function WishlinkPillarsSection() {
  return (
    <section id="pillars" className="py-16 sm:py-24 bg-[#FBFBFD] select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16"
        >
          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold uppercase tracking-tight bg-white border border-black/[0.08] text-[#0A0A0E] shadow-2xs">
            BUILT DIFFERENT FOR CREATORS &amp; BRANDS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A0A0E] font-display tracking-tight">
            How AbeyCollab Works
          </h2>
          <p className="text-sm sm:text-base text-[#5A5A68]">
            Three powerful pillars engineered to remove friction, automate outreach, and protect your earnings.
          </p>
        </motion.div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1: Monetise with Escrow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.55, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-black/[0.07] hover:border-[#FFD21F] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center font-bold shadow-xs">
                  <ShieldCheck className="w-6 h-6 text-[#0A0A0E]" />
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  0% CHASING INVOICES
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-display">
                  100% Escrow Protection
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5A68] mt-1.5 leading-relaxed">
                  Brands deposit campaign fees into safe escrow before you record. Deliver the brief, get approved, and receive payouts within 24 hours.
                </p>
              </div>

              {/* Interactive Micro Visual: Milestone Timeline */}
              <div className="p-3.5 rounded-2xl bg-[#FBFBFD] border border-black/[0.06] space-y-2 mt-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#6A6A78] flex items-center gap-1">
                    <Lock className="w-3 h-3 text-amber-500" />
                    <span>Deposit Locked:</span>
                  </span>
                  <span className="font-bold text-[#0A0A0E]">₹50,000 INR</span>
                </div>
                <div className="w-full bg-black/[0.06] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#FFD21F] h-full w-full rounded-full" />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-emerald-700 font-bold pt-0.5">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Deliverable Approved</span>
                  </span>
                  <span>Instant 24h Payout</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/[0.06] mt-6 flex items-center justify-between">
              <Link
                href="/register?role=creator"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A0A0E] group-hover:text-amber-600 transition-colors"
              >
                <span>Sign up as Creator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-[10px] font-mono text-[#7A7A8A]">Free Forever</span>
            </div>
          </motion.div>

          {/* Pillar 2: Engage & Automate DMs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-black/[0.07] hover:border-[#FFD21F] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#0A0A0E] text-[#FFD21F] flex items-center justify-center font-bold shadow-xs">
                  <MessageSquare className="w-6 h-6 text-[#FFD21F]" />
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-800 bg-[#FFD21F]/20 px-2.5 py-1 rounded-full border border-[#FFD21F]/30">
                  AUTO-DM ENGINE
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-display">
                  Turn Comments into Deals
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5A68] mt-1.5 leading-relaxed">
                  Connect Instagram with official Meta APIs. When brands or followers comment on your reels, your verified media kit is sent in under 3 seconds.
                </p>
              </div>

              {/* Interactive Micro Visual: Live Chat Preview */}
              <div className="p-3 rounded-2xl bg-[#FBFBFD] border border-black/[0.06] space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-pink-500/20 text-pink-600 flex items-center justify-center text-[10px] font-bold">
                    IG
                  </div>
                  <span className="text-[11px] font-sans font-medium text-[#5A5A68]">
                    Brand: <span className="font-bold text-[#0A0A0E]">&ldquo;Share collaboration rate?&rdquo;</span>
                  </span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-black/[0.06] shadow-2xs flex items-center justify-between text-[10px] font-mono">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <Send className="w-3 h-3 text-emerald-600" />
                    <span>Auto-DM Sent (1.8s)</span>
                  </span>
                  <span className="text-[#0A0A0E] font-semibold">Media Kit &amp; Rates</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/[0.06] mt-6 flex items-center justify-between">
              <Link
                href="/creators"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A0A0E] group-hover:text-amber-600 transition-colors"
              >
                <span>View Audited Media Kits</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-[10px] font-mono text-[#7A7A8A]">Meta Partner</span>
            </div>
          </motion.div>

          {/* Pillar 3: Collaborate Directly */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1, margin: "0px 0px -40px 0px" }}
            transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-black/[0.07] hover:border-[#FFD21F] shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between group relative overflow-hidden"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center font-bold shadow-xs">
                  <Briefcase className="w-6 h-6 text-[#0A0A0E]" />
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/20">
                  250+ ACTIVE BRANDS
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-display">
                  Direct Brand Collabs
                </h3>
                <p className="text-xs sm:text-sm text-[#5A5A68] mt-1.5 leading-relaxed">
                  Pitch directly to open briefs from Snitch, Plum, Boldfit, and Nykaa with transparent budgets. Zero agency markups or hidden cuts.
                </p>
              </div>

              {/* Interactive Micro Visual: Active Sponsors */}
              <div className="p-3 rounded-2xl bg-[#FBFBFD] border border-black/[0.06] space-y-1.5 mt-2">
                <div className="flex items-center justify-between text-[10px] font-mono text-[#7A7A8A]">
                  <span>Active Verified Sponsors</span>
                  <span className="text-emerald-700 font-bold">Pre-Funded</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {["Snitch", "Plum", "Boldfit", "DermaCo"].map((brand) => (
                    <span
                      key={brand}
                      className="px-2 py-0.5 rounded-lg bg-white border border-black/[0.06] text-[10px] font-mono font-bold text-[#0A0A0E]"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/[0.06] mt-6 flex items-center justify-between">
              <Link
                href="/campaigns"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A0A0E] group-hover:text-amber-600 transition-colors"
              >
                <span>Explore Open Briefs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-[10px] font-mono text-[#7A7A8A]">Zero Cut</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
