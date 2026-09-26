"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, MessageSquare, Briefcase, CheckCircle2 } from "lucide-react";

export function WishlinkPillarsSection() {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-black/6 select-none font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold uppercase tracking-tight bg-[#FAF9F5] border border-black/8 text-[#0A0A0E]">
            BUILT DIFFERENT FOR CREATORS &amp; BRANDS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A0A0E] font-display tracking-tight">
            How AbeyCollab Works
          </h2>
          <p className="text-sm sm:text-base text-[#5A5A68]">
            Three powerful pillars engineered to remove friction, automate outreach, and protect your earnings.
          </p>
        </div>

        {/* 3 Large Visual Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Pillar 1: Monetise with Escrow */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#FAF9F6] border border-black/8 hover:border-[#FFD21F] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center font-bold shadow-xs">
                <ShieldCheck className="w-6 h-6 text-[#0A0A0E]" />
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-500/10 px-2.5 py-1 rounded-full inline-block">
                0% CHASING INVOICES
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-display">
                Monetise with 100% Escrow
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5A68] leading-relaxed">
                Brands deposit campaign funds into escrow before you shoot. Deliver the brief, get approved, and receive payouts within 24 hours.
              </p>
            </div>

            <div className="pt-6 border-t border-black/6 mt-6">
              <Link
                href="/creator/register"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A0A0E] group-hover:text-[#D97706] transition-colors"
              >
                <span>Sign up as Creator</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Pillar 2: Engage & Automate DMs */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#FAF9F6] border border-black/8 hover:border-[#FFD21F] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A0A0E] text-[#FFD21F] flex items-center justify-center font-bold shadow-xs">
                <MessageSquare className="w-6 h-6 text-[#FFD21F]" />
              </div>
              <span className="text-[11px] font-mono font-bold text-[#9A7000] bg-[#FFD21F]/20 px-2.5 py-1 rounded-full inline-block">
                AUTO-DM ENGINE
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-display">
                Turn Comments into Deals
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5A68] leading-relaxed">
                Connect your Instagram and automate direct responses. When brands comment or DM, your verified media kit and rate card are delivered instantly.
              </p>
            </div>

            <div className="pt-6 border-t border-black/6 mt-6">
              <Link
                href="/creators"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A0A0E] group-hover:text-[#D97706] transition-colors"
              >
                <span>View Audited Media Kits</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Pillar 3: Collaborate Directly */}
          <div className="p-7 sm:p-8 rounded-3xl bg-[#FAF9F6] border border-black/8 hover:border-[#FFD21F] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center font-bold shadow-xs">
                <Briefcase className="w-6 h-6 text-[#0A0A0E]" />
              </div>
              <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-500/10 px-2.5 py-1 rounded-full inline-block">
                250+ ACTIVE BRANDS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-[#0A0A0E] font-display">
                Direct Brand Collaborations
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5A68] leading-relaxed">
                Pitch directly to open briefs from Snitch, Plum, Boldfit, and Nykaa with transparent budgets. Zero agency markups or hidden cuts.
              </p>
            </div>

            <div className="pt-6 border-t border-black/6 mt-6">
              <Link
                href="/campaigns"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0A0A0E] group-hover:text-[#D97706] transition-colors"
              >
                <span>Explore Open Briefs</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
