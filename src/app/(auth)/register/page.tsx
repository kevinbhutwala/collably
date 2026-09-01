import React from "react";
import Link from "next/link";
import { Sparkles, Building2, ArrowRight, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] text-[#0A0A0E] flex items-center justify-center p-4 relative overflow-hidden select-none">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#FFD21F]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-2xl rounded-3xl bg-white border border-black/8 p-8 sm:p-12 space-y-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative z-10 text-[#0A0A0E] select-none">
        {/* Top Header with Back to Home button */}
        <div className="flex items-center justify-between pb-4 border-b border-black/8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#7A7A8A] hover:text-[#0A0A0E] transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Home</span>
          </Link>
          <span className="text-[10px] font-mono text-[#0A0A0E] font-bold uppercase flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-pulse" />
            Account Setup
          </span>
        </div>

        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5 group mb-1">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#FFD21F] to-[#FFAE00] border border-black/10 flex items-center justify-center text-[#0A0A0E] shadow-[0_2px_10px_rgba(255,210,31,0.3)]">
              <Sparkles className="w-4 h-4 fill-[#0A0A0E] text-[#0A0A0E]" />
            </div>
            <span className="font-display font-extrabold text-xl tracking-tight text-[#0A0A0E]">
              Collably
            </span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Join Collably
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] font-sans">
            Select your account type to begin customized onboarding
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Creator Track */}
          <div className="p-6 rounded-3xl bg-[#F8F8FC] border border-black/8 hover:border-[#FFD21F] transition-all flex flex-col justify-between space-y-6 group shadow-xs">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD21F]/20 border border-[#FFD21F]/40 flex items-center justify-center text-[#0A0A0E] shadow-xs group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0E] font-display">I am a Creator</h3>
              <p className="text-xs text-[#5A5A68] leading-relaxed font-sans">
                Connect your social channels, showcase your media kit, discover high-paying brand campaigns, and receive guaranteed escrow payouts.
              </p>
            </div>

            <Link href="/creator/register" className="w-full block">
              <button className="w-full py-3 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs transition-all shadow-[0_4px_14px_rgba(255,210,31,0.4)] border border-black/10 flex items-center justify-center gap-1.5">
                <span>Join as Creator</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0E]" />
              </button>
            </Link>
          </div>

          {/* Brand Track */}
          <div className="p-6 rounded-3xl bg-[#F8F8FC] border border-black/8 hover:border-black/20 transition-all flex flex-col justify-between space-y-6 group shadow-xs">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-black/10 flex items-center justify-center text-[#0A0A0E] shadow-xs group-hover:scale-105 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#0A0A0E] font-display">I am a Brand / Business</h3>
              <p className="text-xs text-[#5A5A68] leading-relaxed font-sans">
                Publish campaign briefs, discover verified creators with audited demographics, manage deliverables, and measure campaign ROI.
              </p>
            </div>

            <Link href="/brand/register" className="w-full block">
              <button className="w-full py-3 rounded-full bg-white hover:bg-[#F0F0F8] border border-black/10 text-[#0A0A0E] font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-xs">
                <span>Join as Brand</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </Link>
          </div>
        </div>

        <div className="pt-4 border-t border-black/8 text-center text-xs text-[#7A7A8A] font-sans">
          Already have an account?{" "}
          <Link href="/login" className="text-[#0A0A0E] hover:underline font-bold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
