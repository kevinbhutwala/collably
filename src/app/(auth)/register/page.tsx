import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CollablyLogo } from "@/components/ui/CollablyLogo";
import { Sparkles, Building2, ArrowUpRight, ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-2xl rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 space-y-8 shadow-elevated">
      {/* Top Header with Back to Home button */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500 hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        <span className="text-[10px] font-mono text-brand-accent font-bold uppercase">
          New Account Setup
        </span>
      </div>

      <div className="text-center space-y-2">
        <div className="flex justify-center mb-2">
          <CollablyLogo href="/" size="sm" subtext="Creator × Brand Ecosystem" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
          Join Collably
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-sans">
          Select your account type to begin customized onboarding
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Creator Track */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-orange-300 transition-all flex flex-col justify-between space-y-6 group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-accent shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">I am a Creator</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Connect your social channels, showcase your media kit, discover high-paying brand campaigns, and receive guaranteed escrow payouts.
            </p>
          </div>

          <Link href="/creator/register" className="w-full block">
            <Button variant="accent" size="md" className="w-full font-display" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
              Join as Creator
            </Button>
          </Link>
        </div>

        {/* Brand Track */}
        <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-slate-400 transition-all flex flex-col justify-between space-y-6 group">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-slate-900 shadow-sm group-hover:scale-105 transition-transform">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-display">I am a Brand / Business</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Publish campaign briefs, discover verified creators with audited demographics, manage deliverables, and measure campaign ROI.
            </p>
          </div>

          <Link href="/brand/register" className="w-full block">
            <Button variant="primary" size="md" className="w-full font-display" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
              Join as Brand
            </Button>
          </Link>
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 font-sans">
        Already have an account?{" "}
        <Link href="/login" className="text-slate-900 font-bold hover:underline font-display">
          Sign In
        </Link>
      </div>
    </div>
  );
}
