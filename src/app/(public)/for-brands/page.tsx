"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { FAQSection } from "@/components/collably/FAQSection";
import { EditorialCTA } from "@/components/collably/EditorialCTA";
import {
  ArrowRight,
  ShieldCheck,
  Lock,
  Search,
  Video,
  Sparkles,
  Zap,
} from "lucide-react";

export default function ForBrandsPage() {
  return (
    <div className="bg-[#FAFAF8] text-[#101010] min-h-screen">
      {/* Brand Hero */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden border-b border-[#E7E7E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-[11px] font-semibold text-[#101010] font-sans uppercase tracking-[0.1em] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
              <span>For Growth Marketers &amp; Brand Leaders</span>
            </div>

            <h1 className="hero-headline normal-case tracking-tight leading-[0.98]">
              Hire vetted creators with{" "}
              <span className="font-serif italic font-normal text-[#626262] lowercase text-[clamp(3.75rem,8.5vw,8.5rem)]">
                100% milestone escrow.
              </span>
            </h1>

            <p className="editorial-body mx-auto text-center">
              Zero upfront release risk. Review 4K video drafts with frame-accurate timecoded comments, request revisions, and release payouts only upon satisfaction.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 font-sans text-sm">
              <Link href="/app/brand/campaigns/create">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#B7FF3C]" />}
                  className="w-full sm:w-auto shadow-xs rounded-[9px] font-sans font-semibold tracking-tight"
                >
                  Create a Campaign Brief
                </Button>
              </Link>

              <Link href="/creators">
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Search className="w-4 h-4 text-[#626262]" />}
                  className="w-full sm:w-auto rounded-[9px] font-sans font-semibold tracking-tight"
                >
                  Browse Creator Roster
                </Button>
              </Link>
            </div>

            {/* Brand Trust Metrics */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center font-mono">
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs">
                <p className="text-2xl font-extrabold text-[#101010] numeric-tabular">100%</p>
                <p className="text-[10px] text-[#626262] uppercase mt-0.5 font-bold tracking-wider">Escrow Locked</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs">
                <p className="text-2xl font-extrabold text-[#101010] flex items-center justify-center gap-1 numeric-tabular">
                  10% <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
                </p>
                <p className="text-[10px] text-[#626262] uppercase mt-0.5 font-bold tracking-wider">Flat Take-Rate</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs">
                <p className="text-2xl font-extrabold text-[#101010]">4K</p>
                <p className="text-[10px] text-[#626262] uppercase mt-0.5 font-bold tracking-wider">Direct Video QA</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs">
                <p className="text-2xl font-extrabold text-[#101010] numeric-tabular">&lt; 4 Hrs</p>
                <p className="text-[10px] text-[#626262] uppercase mt-0.5 font-bold tracking-wider">Dispute SLA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Breakdown for Brands */}
      <section className="py-20 bg-[#FAFAF8] border-b border-[#E7E7E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="section-headline text-center">Everything brand marketers need</h2>
            <p className="editorial-body mx-auto text-center">Built to replace messy email threads, loose Google Drive links, and invoice surprises.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs hover:border-[#101010] space-y-4 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-center text-[#101010]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#101010] font-display">Vetted Discovery</h3>
              <p className="text-xs text-[#626262] leading-relaxed font-sans font-medium">
                Filter creators across YouTube, Instagram, TikTok, and X by authentic audience demographics, engagement consistency, and verified rate cards.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs hover:border-[#101010] space-y-4 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-center text-[#101010]">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#101010] font-display">Timecoded Video Player</h3>
              <p className="text-xs text-[#626262] leading-relaxed font-sans font-medium">
                Leave frame-accurate comments directly on uploaded video drafts. Creators see timestamped revision requests and upload versioned updates in one thread.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs hover:border-[#101010] space-y-4 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-[#101010] flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#101010] font-display">Milestone Escrow Vault</h3>
              <p className="text-xs text-[#626262] leading-relaxed font-sans font-medium">
                Funds are held in secure escrow. If a creator fails to meet agreed brief specifications or misses deadlines without cure, your budget is refunded in full.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* Editorial CTA */}
      <EditorialCTA />
    </div>
  );
}
