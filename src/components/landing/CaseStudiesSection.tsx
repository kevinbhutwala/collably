"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/Badge";
import { ShieldCheck, CheckCircle2, Lock, Zap, ArrowRight, Sparkles, Star } from "lucide-react";

export function CaseStudiesSection() {
  return (
    <section className="py-24 border-t border-black/8 dark:border-white/10 bg-[#FAFAFC] dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8] select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] dark:text-[#FFD21F] text-xs font-semibold font-mono shadow-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0A0A0E] dark:text-[#FFD21F]" />
            <span>The AbeyCollab Trust &amp; Escrow Guarantee</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display">
            How AbeyCollab Protects Both Sides
          </h2>
          <p className="text-base text-[#5A5A68] dark:text-[#8E8EA4] font-sans">
            No more lost emails, late deliverables, or unpaid invoices. Milestone escrow guarantees fairness and transparency for brands and creators.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: For Brands */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-8 sm:p-10 shadow-sm hover:border-[#FFD21F] dark:hover:border-[#FFD21F] hover:shadow-[0_12px_40px_rgba(255,210,31,0.18)] transition-all flex flex-col justify-between space-y-8 relative overflow-hidden group hover-lift"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD21F]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-[#FFFDF5] dark:bg-[#1A1A28] border border-[#FFD21F]/30 text-[#0A0A0E] dark:text-white shadow-xs">
                  <Lock className="w-6 h-6 text-[#0A0A0E] dark:text-white" />
                </div>
                <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 text-[#0A0A0E] dark:text-white text-xs font-mono font-bold uppercase">
                  Brand Protection
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-[#0A0A0E] dark:text-white font-display">
                  Zero Upfront Release Risk
                </h3>
                <p className="text-sm text-[#5A5A68] dark:text-[#8E8EA4] mt-2 leading-relaxed font-sans">
                  Your campaign budget is safely locked in platform escrow custody. Creators only get paid after you inspect, review revisions, and formally sign off on the 4K deliverable.
                </p>
              </div>

              <div className="space-y-3 pt-2 font-sans">
                {[
                  "Milestone release — funds disbursed only when QA requirements are met",
                  "Timecoded video review studio with frame-accurate annotations",
                  "Guaranteed delivery turnaround with automatic escrow refund on default",
                  "Full commercial licensing and raw 4K asset download rights",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3A3A48] dark:text-[#C8C8DC]">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      ✓
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-black/8 dark:border-white/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">10% flat transparent fee</span>
              <Link href="/app/brand/campaigns/create">
                <button className="px-6 py-2.5 rounded-full bg-[#0A0A0E] hover:bg-[#20202B] dark:bg-[#FFD21F] dark:hover:bg-[#FFE052] text-white dark:text-[#0A0A0E] text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs hover-lift">
                  <span>Post a Brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Card 2: For Creators */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 p-8 sm:p-10 shadow-sm hover:border-[#FFD21F] dark:hover:border-[#FFD21F] hover:shadow-[0_12px_40px_rgba(255,210,31,0.18)] transition-all flex flex-col justify-between space-y-8 relative overflow-hidden group hover-lift"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD21F]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-125 transition-transform" />

            <div className="space-y-6 relative z-10">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-[#FFD21F] to-[#FFAE00] text-[#0A0A0E] shadow-[0_2px_10px_rgba(255,210,31,0.3)]">
                  <Zap className="w-6 h-6 fill-[#0A0A0E] text-[#0A0A0E]" />
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] dark:text-[#FFD21F] text-xs font-mono font-bold uppercase">
                  Creator Protection
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-[#0A0A0E] dark:text-white font-display">
                  Guaranteed Automatic Payouts
                </h3>
                <p className="text-sm text-[#5A5A68] dark:text-[#8E8EA4] mt-2 leading-relaxed font-sans">
                  Never work for brands that fail to pay. Escrow is 100% pre-funded and locked before you record a single frame. Funds disburse instantly upon milestone sign-off.
                </p>
              </div>

              <div className="space-y-3 pt-2 font-sans">
                {[
                  "100% pre-funded escrow ensures payout certainty before production begins",
                  "Direct Stripe Connect bank transfers with instant 2-hour settlement options",
                  "Built-in contract generation with clear revision caps",
                  "4-hour response dispute team for fair evidence-based mediation",
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3A3A48] dark:text-[#C8C8DC]">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                      ✓
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-black/8 dark:border-white/10 flex items-center justify-between relative z-10">
              <span className="text-xs text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">Keep 90% of verified earnings</span>
              <Link href="/creator/register">
                <button className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all flex items-center gap-1.5 shadow-[0_2px_10px_rgba(255,210,31,0.3)] border border-black/10 hover-lift">
                  <span>Join Roster</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
