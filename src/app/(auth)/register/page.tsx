import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ValenceLogo } from "@/components/ui/ValenceLogo";
import { Sparkles, Building2, ArrowUpRight } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12 bg-slate-50/50">
      <div className="w-full max-w-2xl rounded-3xl bg-white border border-slate-200 p-8 sm:p-12 space-y-8 shadow-elevated">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <ValenceLogo href="/" size="sm" subtext="Creator × Brand Ecosystem" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Join Collably
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Select your account type to begin customized onboarding
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Creator Track */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-amber-500 shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">I am a Creator</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect your social channels, showcase your media kit, discover high-paying brand campaigns, and receive guaranteed escrow payouts.
              </p>
            </div>

            <Link href="/creator/register" className="w-full block">
              <Button variant="accent" size="md" className="w-full" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                Join as Creator
              </Button>
            </Link>
          </div>

          {/* Brand Track */}
          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-sky-600 shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">I am a Brand / Business</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Publish campaign briefs, discover verified creators with audited demographics, manage deliverables, and measure campaign ROI.
              </p>
            </div>

            <Link href="/brand/register" className="w-full block">
              <Button variant="primary" size="md" className="w-full" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                Join as Brand
              </Button>
            </Link>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-slate-900 font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
