import type { Metadata } from 'next';
import React from "react";
import { EditorialCTA } from "@/components/collably/EditorialCTA";
import { Sparkles, ShieldCheck, Zap, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: 'About Us',
  description: 'AbeyCollab is building the operating system for the creator economy — milestone payments, campaign management, and creator discovery in one platform.',
  alternates: { canonical: 'https://abeycollab.vercel.app/about' },
};


export default function AboutPage() {
  return (
    <div className="bg-[#FAFAF8] text-[#111111] min-h-screen">
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-xs font-mono font-bold text-[#111111] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#FFD21F]" />
          <span>Our Vision &amp; Philosophy</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight font-display">
          Building the infrastructure for the creator economy
        </h1>
        <p className="text-base text-[#6B6B6B] max-w-2xl mx-auto font-sans font-medium leading-relaxed">
          We believe the future of brand storytelling belongs to independent creators who have earned genuine cultural trust.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        <div className="p-8 sm:p-12 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] font-display">
            Why traditional influencer marketing is broken
          </h2>
          <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed font-sans font-medium">
            For years, influencer marketing has been plagued by bloated middleman markups, vanity follower metrics, lost email attachments, and delayed payments that force creators to chase invoices for 90 days.
          </p>
          <p className="text-sm sm:text-base text-[#6B6B6B] leading-relaxed font-sans font-medium">
            AbeyCollab replaces chaotic agency spreadsheets with a clean, high-performance platform: automated campaign briefs, multi-dimensional AI matching, real-time deliverable pipelines, and guaranteed milestone escrow protection.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] hover:border-[#111111] shadow-xs space-y-3 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] flex items-center justify-center mx-auto shadow-xs">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#111111] font-display">Radical Speed</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-medium">
              Launch briefs in under 5 minutes. Deliverables approved with 1-click escrow release.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] hover:border-[#111111] shadow-xs space-y-3 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] flex items-center justify-center mx-auto shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#111111] font-display">100% Guaranteed Escrow</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-medium">
              Brands know their budget is safe until sign-off; creators know funds are guaranteed in vault.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] hover:border-[#111111] shadow-xs space-y-3 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] flex items-center justify-center mx-auto shadow-xs">
              <Globe className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-[#111111] font-display">Vetted Audience Quality</h3>
            <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans font-medium">
              Strict creator vetting with audited engagement authenticity and verified audience demographics.
            </p>
          </div>
        </div>

      </div>

      <EditorialCTA />
    </div>
  );
}
