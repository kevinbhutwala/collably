"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function WishlinkLaunchpadCTA() {
  return (
    <section className="py-16 sm:py-24 bg-[#FBFBFD] border-t border-black/[0.06] select-none font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="p-8 sm:p-14 lg:p-20 rounded-3xl sm:rounded-[40px] bg-gradient-to-br from-[#0A0A0E] via-[#14141B] to-[#0A0A0E] text-white shadow-2xl relative overflow-hidden text-center"
        >
          {/* Ambient Warm Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-[#FFD21F]/20 via-[#E98415]/20 to-transparent rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[11px] font-mono font-bold text-[#FFD21F]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL META &amp; RAZORPAY ESCROW PARTNER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.08]">
              Your launchpad to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] underline decoration-[#FFD21F] decoration-4 underline-offset-8">
                success!!
              </span>
            </h2>

            <p className="text-sm sm:text-lg text-white/80 leading-relaxed max-w-2xl mx-auto font-sans">
              Collaborate directly with 250+ top brands, automate comments into revenue, and{" "}
              <span className="text-[#FFD21F] font-bold">never chase an invoice again.</span> All protected by 100% milestone escrow.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
              <Link
                href="/register?role=creator"
                className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-sm sm:text-base shadow-[0_4px_25px_rgba(255,210,31,0.45)] border border-black/10 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Sign up as Creator</span>
                <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
              </Link>

              <Link
                href="/register?role=brand"
                className="w-full sm:w-auto px-7 py-3.5 sm:py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-sm sm:text-base border border-white/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Sign up as Brand</span>
              </Link>
            </div>

            {/* Store & Rating Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-8 border-t border-white/10 text-xs font-mono text-white/70">
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-[#FFD21F] text-[#FFD21F]" />
                <span className="font-bold text-white">4.8★ Play Store</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-[#FFD21F] text-[#FFD21F]" />
                <span className="font-bold text-white">4.7★ App Store</span>
              </div>
              <span className="hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">₹1.4 Cr+ Paid Out</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
