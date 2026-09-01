import React from "react";
import Link from "next/link";
import { Sparkles, Building2, ArrowRight, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#08080C] text-white flex items-center justify-center p-4 relative overflow-hidden select-none">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#FFD21F]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-2xl rounded-3xl bg-[#101018]/95 border border-[#FFD21F]/25 p-8 sm:p-12 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_30px_rgba(255,210,31,0.15)] backdrop-blur-2xl relative z-10 text-white select-none">
        {/* Top Header with Back to Home button */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-white/50 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          <span className="text-[10px] font-mono text-[#FFD21F] font-extrabold uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-pulse" />
            Account Setup
          </span>
        </div>

        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-1">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFD21F] to-[#FFAE00] border border-white/40 flex items-center justify-center text-[#0A0A0E] shadow-[0_0_15px_rgba(255,210,31,0.45)]">
              <Sparkles className="w-4 h-4 fill-[#0A0A0E] text-[#0A0A0E]" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-white">
              Collably
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Join Collably
          </h1>
          <p className="text-xs sm:text-sm text-white/60 font-sans">
            Select your account type to begin customized onboarding
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Creator Track */}
          <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-[#FFD21F]/40 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD21F]/15 border border-[#FFD21F]/30 flex items-center justify-center text-[#FFD21F] shadow-xs group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">I am a Creator</h3>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Connect your social channels, showcase your media kit, discover high-paying brand campaigns, and receive guaranteed escrow payouts.
              </p>
            </div>

            <Link href="/creator/register" className="w-full block">
              <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all shadow-[0_0_18px_rgba(255,210,31,0.4)] border border-white/40 flex items-center justify-center gap-1.5">
                <span>Join as Creator</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0E]" />
              </button>
            </Link>
          </div>

          {/* Brand Track */}
          <div className="p-6 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-[#FFD21F]/40 transition-all flex flex-col justify-between space-y-6 group">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white font-display">I am a Brand / Business</h3>
              <p className="text-xs text-white/60 leading-relaxed font-sans">
                Publish campaign briefs, discover verified creators with audited demographics, manage deliverables, and measure campaign ROI.
              </p>
            </div>

            <Link href="/brand/register" className="w-full block">
              <button className="w-full py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs transition-all flex items-center justify-center gap-1.5">
                <span>Join as Brand</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>

        <div className="pt-4 border-t border-white/10 text-center text-xs text-white/50 font-sans">
          Already have an account?{" "}
          <Link href="/login" className="text-[#FFD21F] hover:underline font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
