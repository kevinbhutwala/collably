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
    <div className="bg-[#FAFAF8] text-[#111111] min-h-screen">
      {/* Brand Hero */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden border-b border-[#E7E7E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-xs font-semibold text-[#111111] font-mono shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
              <span>For Growth Marketers &amp; Brand Leaders</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[#111111] tracking-tight leading-[1.08] font-display">
              Hire vetted creators with{" "}
              <span className="font-serif italic font-normal text-[#6B6B6B]">
                100% milestone escrow.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#6B6B6B] max-w-2xl mx-auto font-sans leading-relaxed">
              Zero upfront release risk. Review 4K video drafts with frame-accurate timecoded comments, request revisions, and release payouts only upon satisfaction.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
              <Link href="/app/brand/campaigns/create">
                <Button
                  variant="primary"
                  size="lg"
                  rightIcon={<ArrowRight className="w-4 h-4 text-[#B7FF3C]" />}
                  className="w-full sm:w-auto shadow-xs rounded-[9px] font-sans font-bold"
                >
                  Create a Campaign Brief
                </Button>
              </Link>

              <Link href="/creators">
                <Button
                  variant="secondary"
                  size="lg"
                  leftIcon={<Search className="w-4 h-4 text-[#6B6B6B]" />}
                  className="w-full sm:w-auto rounded-[9px] font-sans"
                >
                  Browse Creator Roster
                </Button>
              </Link>
            </div>

            {/* Brand Trust Metrics */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center font-mono">
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs">
                <p className="text-2xl font-extrabold text-[#111111]">100%</p>
                <p className="text-[10px] text-[#6B6B6B] uppercase mt-0.5 font-bold">Escrow Locked</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs">
                <p className="text-2xl font-extrabold text-[#111111] flex items-center justify-center gap-1">
                  10% <span className="w-1.5 h-1.5 rounded-full bg-[#B7FF3C]" />
                </p>
                <p className="text-[10px] text-[#6B6B6B] uppercase mt-0.5 font-bold">Flat Platform Fee</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs">
                <p className="text-2xl font-extrabold text-[#111111]">4K</p>
                <p className="text-[10px] text-[#6B6B6B] uppercase mt-0.5 font-bold">Direct Video Review</p>
              </div>
              <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs">
                <p className="text-2xl font-extrabold text-[#111111]">&lt; 4 Hrs</p>
                <p className="text-[10px] text-[#6B6B6B] uppercase mt-0.5 font-bold">Dispute SLA</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Breakdown for Brands */}
      <section className="py-20 bg-[#FAFAF8] border-b border-[#E7E7E4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h2 className="text-3xl font-extrabold text-[#111111] font-display">Everything brand marketers need</h2>
            <p className="text-sm text-[#6B6B6B] font-sans">Built to replace messy email threads, loose Google Drive links, and invoice surprises.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs hover:border-[#111111] space-y-4 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-center text-[#111111]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111111] font-display">Vetted Discovery</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">
                Filter creators across YouTube, Instagram, TikTok, and X by authentic audience demographics, engagement consistency, and verified rate cards.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs hover:border-[#111111] space-y-4 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] flex items-center justify-center text-[#111111]">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111111] font-display">Timecoded Video Player</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">
                Leave frame-accurate comments directly on uploaded video drafts. Creators see timestamped revision requests and upload versioned updates in one thread.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E7E7E4] shadow-xs hover:border-[#111111] space-y-4 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] border border-[#E7E7E4] text-[#111111] flex items-center justify-center">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111111] font-display">Milestone Escrow Vault</h3>
              <p className="text-xs text-[#6B6B6B] leading-relaxed font-sans">
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
