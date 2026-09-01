import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { Sparkles, Building2, ArrowRight, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-2xl rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] p-8 sm:p-12 space-y-8 shadow-xs text-[#111111]">
      {/* Top Header with Back to Home button */}
      <div className="flex items-center justify-between pb-4 border-b border-[#E7E7E4]">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#6B6B6B] hover:text-[#111111] transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        <span className="text-[10px] font-mono text-[#111111] font-bold uppercase flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
          New Account Setup
        </span>
      </div>

      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <CollablyLogo href="/" size="sm" subtext="Creator × Brand Ecosystem" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight font-display">
          Join Collably
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B6B] font-sans font-medium">
          Select your account type to begin customized onboarding
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Creator Track */}
        <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E4] hover:border-[#111111] transition-all flex flex-col justify-between space-y-6 group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] flex items-center justify-center text-[#111111] shadow-xs group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#111111] font-display">I am a Creator</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-medium">
              Connect your social channels, showcase your media kit, discover high-paying brand campaigns, and receive guaranteed escrow payouts.
            </p>
          </div>

          <Link href="/creator/register" className="w-full block">
            <Button variant="primary" size="md" className="w-full font-display rounded-[9px]" rightIcon={<ArrowRight className="w-4 h-4 text-[#B7FF3C]" />}>
              Join as Creator
            </Button>
          </Link>
        </div>

        {/* Brand Track */}
        <div className="p-6 rounded-2xl bg-[#FAFAF8] border border-[#E7E7E4] hover:border-[#111111] transition-all flex flex-col justify-between space-y-6 group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] flex items-center justify-center text-[#111111] shadow-xs group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#111111] font-display">I am a Brand / Business</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-medium">
              Publish campaign briefs, discover verified creators with audited demographics, manage deliverables, and measure campaign ROI.
            </p>
          </div>

          <Link href="/brand/register" className="w-full block">
            <Button variant="primary" size="md" className="w-full font-display rounded-[9px]" rightIcon={<ArrowRight className="w-4 h-4 text-[#B7FF3C]" />}>
              Join as Brand
            </Button>
          </Link>
        </div>
      </div>

      <div className="pt-4 border-t border-[#E7E7E4] text-center text-xs text-[#6B6B6B] font-sans">
        Already have an account?{" "}
        <Link href="/login" className="text-[#111111] font-bold hover:underline font-display">
          Sign In
        </Link>
      </div>
    </div>
  );
}
