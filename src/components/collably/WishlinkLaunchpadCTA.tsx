"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Star, ShieldCheck, Zap } from "lucide-react";

export function WishlinkLaunchpadCTA() {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] border-t border-black/6 select-none font-sans overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 lg:p-20 rounded-3xl sm:rounded-[44px] bg-gradient-to-br from-[#0A0A0E] via-[#14141B] to-[#0A0A0E] text-white shadow-2xl relative overflow-hidden text-center">
          {/* Ambient Warm Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-[#FFD21F]/20 via-[#E98415]/20 to-transparent rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-mono font-bold text-[#FFD21F]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL META &amp; RAZORPAY ESCROW PARTNER</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.08]">
              Your launchpad to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] underline decoration-[#FFD21F] decoration-4 underline-offset-8">
                success!!
              </span>
            </h2>

            <p className="text-base sm:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
              Collaborate directly with 250+ top brands, automate comments into revenue, and{" "}
              <span className="text-[#FFD21F] font-bold">never chase an invoice again.</span> All protected by 100% milestone escrow.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/creator/register"
                className="w-full sm:w-auto px-9 py-4 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-base shadow-[0_4px_25px_rgba(255,210,31,0.5)] border border-black/10 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Sign up as Creator</span>
                <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
              </Link>

              <Link
                href="/brand/register"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-base border border-white/20 transition-all flex items-center justify-center gap-2 active:scale-95"
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
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-[#FFD21F] text-[#FFD21F]" />
                <span className="font-bold text-white">4.7★ App Store</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-bold text-white">₹1.4 Cr+ Paid Out</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
