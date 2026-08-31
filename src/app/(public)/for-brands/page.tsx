"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FAQSection } from "@/components/landing/FAQSection";
import {
  ArrowUpRight,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  Search,
  Sparkles,
  DollarSign,
  TrendingUp,
  Clock,
  Video,
} from "lucide-react";

export default function ForBrandsPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Brand Hero */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-32 overflow-hidden border-b border-slate-200">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-radial from-blue-100/50 via-slate-50 to-transparent blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>For Growth Marketers & Brand Leaders</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.08]">
              Hire vetted creators with{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                100% milestone escrow.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
              Zero upfront release risk. Review 4K video drafts with frame-accurate timecoded comments, request revisions, and release payouts only upon satisfaction.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/app/brand/campaigns/create">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowUpRight className="w-5 h-5" />}
                  className="w-full sm:w-auto text-base shadow-xl"
                >
                  Create a Campaign Brief
                </Button>
              </Link>

              <Link href="/creators">
                <Button
                  variant="outline"
                  size="lg"
                  leftIcon={<Search className="w-4 h-4 text-slate-500" />}
                  className="w-full sm:w-auto text-base"
                >
                  Browse Creator Roster
                </Button>
              </Link>
            </div>

            {/* Brand Trust Metrics */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center font-mono">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="text-2xl font-extrabold text-slate-900">100%</p>
                <p className="text-[11px] text-slate-500 uppercase mt-0.5">Escrow Locked</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="text-2xl font-extrabold text-emerald-600">10%</p>
                <p className="text-[11px] text-slate-500 uppercase mt-0.5">Flat Platform Fee</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="text-2xl font-extrabold text-slate-900">4K</p>
                <p className="text-[11px] text-slate-500 uppercase mt-0.5">Direct Video Review</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="text-2xl font-extrabold text-blue-600">&lt; 4 Hrs</p>
                <p className="text-[11px] text-slate-500 uppercase mt-0.5">Dispute SLA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Breakdown for Brands */}
      <section className="py-20 bg-slate-50/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-slate-900">Everything brand marketers need</h2>
            <p className="text-sm text-slate-600">Built to replace messy email threads, loose Google Drive links, and invoice surprises.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Vetted Discovery</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Filter creators across YouTube, Instagram, TikTok, and X by authentic audience demographics, engagement consistency, and verified rate cards.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Timecoded Video Player</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Leave frame-accurate comments directly on uploaded video drafts. Creators see timestamped revision requests and upload versioned updates in one thread.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200 shadow-card space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Milestone Escrow Vault</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
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
      <section className="py-20 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to launch your next creator campaign?</h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Join the founding cohort of brands running milestone-protected collaborations on Collably.
          </p>
          <div className="pt-2">
            <Link href="/app/brand/campaigns/create">
              <Button variant="accent" size="lg" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                Post a Campaign Brief
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
