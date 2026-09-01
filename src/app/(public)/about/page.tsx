import React from "react";
import { StatsSection } from "@/components/landing/StatsSection";
import { CTASection } from "@/components/landing/CTASection";
import { Sparkles, ShieldCheck, Zap, Globe } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-[#0a070a] text-white min-h-screen">
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] text-xs font-semibold font-mono">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Our Vision &amp; Philosophy</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display">
          Building the infrastructure for the creator economy
        </h1>
        <p className="text-base text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
          We believe the future of brand storytelling belongs to independent creators who have earned genuine cultural trust.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#120c16] border border-white/10 shadow-card space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Why traditional influencer marketing is broken
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            For years, influencer marketing has been plagued by bloated middleman markups, vanity follower metrics, lost email attachments, and delayed payments that force creators to chase invoices for 90 days.
          </p>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
            Collably replaces chaotic agency spreadsheets with a clean, high-performance platform: automated campaign briefs, multi-dimensional AI matching, real-time deliverable pipelines, and guaranteed milestone escrow protection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/40 shadow-card space-y-3 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 text-[hsl(327,100%,55%)] flex items-center justify-center mx-auto">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">Radical Speed</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Launch briefs in under 5 minutes. Deliverables approved with 1-click escrow release.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#120c16] border border-white/10 hover:border-emerald-500/40 shadow-card space-y-3 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 text-emerald-400 flex items-center justify-center mx-auto">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">100% Guaranteed Escrow</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Brands know their budget is safe until sign-off; creators know funds are guaranteed in vault.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#120c16] border border-white/10 hover:border-purple-500/40 shadow-card space-y-3 transition-all">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 text-purple-300 flex items-center justify-center mx-auto">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white font-display">Vetted Audience Quality</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
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
