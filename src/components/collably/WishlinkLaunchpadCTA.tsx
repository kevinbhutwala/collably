"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function WishlinkLaunchpadCTA() {
  return (
    <section className="py-16 sm:py-24 bg-[#FAF8F5] border-t border-black/[0.06] select-none font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="p-6 sm:p-14 lg:p-20 rounded-2xl sm:rounded-[40px] bg-white border border-black/[0.08] text-[#0F172A] shadow-[0_25px_65px_-15px_rgba(15,118,110,0.15)] relative overflow-hidden text-center"
        >
          {/* Ambient Warm Aura */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[320px] bg-gradient-to-r from-emerald-100/40 via-teal-100/30 to-transparent rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-[11px] font-mono font-bold text-[#0F766E]">
              <Sparkles className="w-3.5 h-3.5 text-[#0F766E]" />
              <span>OFFICIAL META &amp; RAZORPAY ESCROW PARTNER</span>
            </div>

            <h2 className="text-2xl min-[400px]:text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#0F172A] leading-[1.08]">
              Your launchpad to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#047857] underline decoration-[#0F766E]/50 decoration-4 underline-offset-8">
                success!!
              </span>
            </h2>

            <p className="text-sm sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto font-sans">
              Collaborate directly with 250+ top brands, automate comments into revenue, and{" "}
              <span className="text-[#0F172A] font-bold">never chase an invoice again.</span> All protected by 100% milestone escrow.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
              <Link
                href="/register?role=creator"
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#047857] hover:from-[#0D9488] hover:to-[#059669] text-white font-extrabold text-sm sm:text-base shadow-[0_10px_30px_rgba(15,118,110,0.35)] border border-white/10 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Sign up as Creator</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </Link>

              <Link
                href="/register?role=brand"
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full bg-[#FAF8F5] hover:bg-emerald-50/60 text-[#0F172A] font-bold text-sm sm:text-base border border-black/10 hover:border-[#0F766E]/30 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Sign up as Brand</span>
              </Link>
            </div>

            {/* Store & Rating Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-8 border-t border-black/[0.06] text-xs font-mono text-[#64748B]">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-[#34D399] text-[#0F766E]" />
                <span className="font-bold text-[#0F172A]">4.8★ Play Store</span>
              </div>
              <span className="hidden sm:inline text-black/20">•</span>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-[#34D399] text-[#0F766E]" />
                <span className="font-bold text-[#0F172A]">4.7★ App Store</span>
              </div>
              <span className="hidden sm:inline text-black/20">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-[#0F172A]">₹1.4 Cr+ Paid Out</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
