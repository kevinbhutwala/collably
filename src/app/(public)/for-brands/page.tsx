"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FAQSection } from "@/components/landing/FAQSection";
import {
  ArrowUpRight,
  ShieldCheck,
  Lock,
  Search,
  Video,
} from "lucide-react";

export default function ForBrandsPage() {
  return (
    <div className="bg-[#0a070a] text-white min-h-screen">
      {/* Brand Hero */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden border-b border-white/10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(closest-side,hsl(327_100%_46%/0.18),transparent)] blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-xs font-semibold text-pink-300 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>For Growth Marketers &amp; Brand Leaders</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.08] font-display">
              Hire vetted creators with{" "}
              <span className="bg-gradient-to-r from-[hsl(327,100%,50%)] via-purple-400 to-[hsl(300,100%,42%)] bg-clip-text text-transparent">
                100% milestone escrow.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
              Zero upfront release risk. Review 4K video drafts with frame-accurate timecoded comments, request revisions, and release payouts only upon satisfaction.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/app/brand/campaigns/create">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowUpRight className="w-5 h-5" />}
                  className="w-full sm:w-auto text-base shadow-xl rounded-full font-display font-bold"
                >
                  Create a Campaign Brief
                </Button>
              </Link>

              <Link href="/creators">
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Search className="w-4 h-4 text-slate-300" />}
                  className="w-full sm:w-auto text-base rounded-full font-display"
                >
                  Browse Creator Roster
                </Button>
              </Link>
            </div>

            {/* Brand Trust Metrics */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center font-mono">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <p className="text-2xl font-extrabold text-white">100%</p>
                <p className="text-[11px] text-slate-400 uppercase mt-0.5">Escrow Locked</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <p className="text-2xl font-extrabold text-emerald-400">10%</p>
                <p className="text-[11px] text-slate-400 uppercase mt-0.5">Flat Platform Fee</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <p className="text-2xl font-extrabold text-white">4K</p>
                <p className="text-[11px] text-slate-400 uppercase mt-0.5">Direct Video Review</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10">
                <p className="text-2xl font-extrabold text-pink-400">&lt; 4 Hrs</p>
                <p className="text-[11px] text-slate-400 uppercase mt-0.5">Dispute SLA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Breakdown for Brands */}
      <section className="py-20 bg-[#0c080e] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-white font-display">Everything brand marketers need</h2>
            <p className="text-sm text-slate-300 font-sans">Built to replace messy email threads, loose Google Drive links, and invoice surprises.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/40 shadow-card space-y-4 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-pink-500/15 border border-pink-500/30 flex items-center justify-center text-[hsl(327,100%,55%)]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Vetted Discovery</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Filter creators across YouTube, Instagram, TikTok, and X by authentic audience demographics, engagement consistency, and verified rate cards.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#120c16] border border-white/10 hover:border-emerald-500/40 shadow-card space-y-4 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Timecoded Video Player</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Leave frame-accurate comments directly on uploaded video drafts. Creators see timestamped revision requests and upload versioned updates in one thread.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-[#120c16] border border-white/10 hover:border-purple-500/40 shadow-card space-y-4 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 text-purple-300 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white font-display">Milestone Escrow Vault</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                Funds are held in secure escrow. If a creator fails to meet agreed brief specifications or misses deadlines without cure, your budget is refunded in full.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works for brands */}
      <HowItWorks />

      {/* FAQ */}
      <FAQSection />

      {/* CTA Footer */}
      <section className="py-20 bg-[#0a070a] border-t border-white/10 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display">Ready to launch your next creator campaign?</h2>
          <p className="text-sm text-slate-300 max-w-xl mx-auto font-sans">
            Join the founding cohort of brands running milestone-protected collaborations on Collably.
          </p>
          <div className="pt-2">
            <Link href="/app/brand/campaigns/create">
              <Button variant="primary" size="lg" className="rounded-full font-display font-bold" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                Post a Campaign Brief
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
