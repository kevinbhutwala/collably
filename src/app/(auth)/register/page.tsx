import React from "react";
import Link from "next/link";
import { Sparkles, Building2, ArrowRight, ArrowLeft, Video, ShieldCheck, Check } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-2xl mx-auto rounded-3xl bg-white border border-black/8 p-6 sm:p-10 space-y-8 shadow-[0_16px_40px_rgba(0,0,0,0.06)] relative z-10 text-[#0A0A0E] select-none">
      {/* Top Header with Back to Home button */}
      <div className="flex items-center justify-between pb-3 border-b border-black/8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-sans font-semibold text-[#7A7A8A] hover:text-[#0A0A0E] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Home</span>
        </Link>
        <span className="text-[10px] font-mono text-[#0A0A0E] font-bold uppercase flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-pulse" />
          Choose Role
        </span>
      </div>

      <div className="text-center space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A0A0E] tracking-tight font-display">
          Join the AbeyCollab Network
        </h1>
        <p className="text-xs sm:text-sm text-[#5A5A68] font-sans max-w-md mx-auto">
          Select your account type to begin tailored onboarding with instant access.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Creator Track */}
        <div className="p-6 rounded-3xl bg-gradient-to-b from-[#FFFDF5] to-[#FAFAFC] border-2 border-[#FFD21F]/60 hover:border-[#FFD21F] transition-all flex flex-col justify-between space-y-5 group shadow-xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform font-bold">
                <Video className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] text-[10px] font-mono font-extrabold uppercase">
                CREATOR
              </span>
            </div>

            <h2 className="text-lg font-bold text-[#0A0A0E] font-display">I am a Creator</h2>
            <p className="text-xs text-[#5A5A68] leading-relaxed font-sans">
              Connect social accounts, build your audited media kit, pitch verified brand campaigns, and receive guaranteed escrow payouts.
            </p>

            <div className="space-y-1.5 pt-1 text-xs text-[#4A4A58] font-sans">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#087F5B]" />
                <span>100% Escrow payout guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#087F5B]" />
                <span>Audited 1-click Media Kit</span>
              </div>
            </div>
          </div>

          <Link href="/creator/register" className="w-full block pt-2">
            <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs transition-all shadow-[0_4px_14px_rgba(255,210,31,0.4)] border border-black/10 flex items-center justify-center gap-1.5 active:scale-98">
              <span>Join as Creator</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0E]" />
            </button>
          </Link>
        </div>

        {/* Brand Track */}
        <div className="p-6 rounded-3xl bg-[#FAFAFC] border border-black/8 hover:border-black/20 transition-all flex flex-col justify-between space-y-5 group shadow-xs">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-[#0A0A0E] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="px-2.5 py-1 rounded-full bg-black/5 text-[#0A0A0E] text-[10px] font-mono font-bold uppercase">
                BRAND
              </span>
            </div>

            <h2 className="text-lg font-bold text-[#0A0A0E] font-display">I am a Brand / Business</h2>
            <p className="text-xs text-[#5A5A68] leading-relaxed font-sans">
              Publish campaign briefs, match with 50K+ vetted creators, collaborate in 4K frame-accurate QA, and automate contracts.
            </p>

            <div className="space-y-1.5 pt-1 text-xs text-[#4A4A58] font-sans">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#087F5B]" />
                <span>AI creator matching engine</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#087F5B]" />
                <span>Automated 1099 compliance</span>
              </div>
            </div>
          </div>

          <Link href="/brand/register" className="w-full block pt-2">
            <button className="w-full py-3 rounded-full bg-white hover:bg-[#F0F0F8] border border-black/10 text-[#0A0A0E] font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs active:scale-98">
              <span>Join as Brand</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

      <div className="pt-2 border-t border-black/8 text-center text-xs text-[#7A7A8A] font-sans">
        Already have an account?{" "}
        <Link href="/login" className="text-[#0A0A0E] hover:underline font-bold">
          Sign In
        </Link>
      </div>
    </div>
  );
}
