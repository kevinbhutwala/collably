import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { StatsSection } from "@/components/landing/StatsSection";
import { CTASection } from "@/components/landing/CTASection";
import { Sparkles, ShieldCheck, Heart, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="pt-16 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-brand-accent text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Our Vision & Philosophy</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
          Building the infrastructure for the creator economy
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto">
          We believe the future of brand storytelling belongs to independent creators who have earned genuine cultural trust.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 shadow-card space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Why traditional influencer marketing is broken
          </h2>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            For years, influencer marketing has been plagued by bloated middleman markups, vanity follower metrics, lost email attachments, and delayed payments that force creators to chase invoices for 90 days.
          </p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
            Collably replaces chaotic agency spreadsheets with a clean, high-performance platform: automated campaign briefs, multi-dimensional AI matching, real-time deliverable pipelines, and guaranteed milestone escrow protection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-accent flex items-center justify-center mx-auto">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Radical Speed</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Launch briefs in under 5 minutes. Deliverables approved with 1-click escrow release.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">100% Guaranteed Escrow</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Brands know their budget is safe until sign-off; creators know funds are guaranteed in vault.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Vetted Audience Quality</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strict 5% creator admission rate with audited engagement authenticity.
            </p>
          </div>
        </div>
      </div>

      <StatsSection />
      <CTASection />
    </div>
  );
}
