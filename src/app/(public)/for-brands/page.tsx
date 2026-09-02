"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Video,
  Sparkles,
  ArrowRight,
  Search,
  CheckCircle2,
  TrendingUp,
  Zap,
  Lock,
  DollarSign,
  Users,
} from "lucide-react";
import { AnimatedBrandSlider } from "@/components/visual/AnimatedBrandSlider";
import { InteractiveTiltCard } from "@/components/ui/InteractiveTiltCard";
import { ContinuousProductStory } from "@/components/collably/ContinuousProductStory";
import { ProtectedEscrowFlow } from "@/components/collably/ProtectedEscrowFlow";
import { InteractiveVideoReviewStudio } from "@/components/collably/InteractiveVideoReviewStudio";
import { CaseStudiesSection } from "@/components/landing/CaseStudiesSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { StreamlinedVisualCTA } from "@/components/visual/StreamlinedVisualCTA";
import { motion } from "framer-motion";

export default function ForBrandsPage() {
  return (
    <div className="bg-[#FAFAFC] text-[#0A0A0E] min-h-screen select-none space-y-12 pb-16 font-sans">
      {/* Brand Hero */}
      <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden border-b border-black/8 bg-white">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#FFD21F]/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] text-[11px] font-mono font-bold uppercase tracking-wider">
              <span>FOR GROWTH MARKETERS &amp; BRAND LEADERS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] text-[#0A0A0E] font-display">
              Hire Vetted Creators with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700]">
                100% Milestone Escrow.
              </span>
            </h1>

            <p className="text-xs sm:text-base text-[#5A5A68] font-sans max-w-xl mx-auto leading-relaxed">
              Zero upfront release risk. Review 4K video drafts with frame-accurate timecoded comments, request revisions, and release payouts only upon formal sign-off.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 font-sans text-sm">
              <Link href="/app/brand/campaigns/create">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-extrabold text-xs sm:text-sm transition-all shadow-[0_4px_20px_rgba(255,210,31,0.5)] border border-black/10 flex items-center gap-2 hover-lift">
                  <span>Create a Campaign Brief</span>
                  <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
                </button>
              </Link>

              <Link href="/creators">
                <button className="px-7 py-4 rounded-full bg-white hover:bg-[#F8F8FC] border border-black/10 text-[#0A0A0E] font-bold text-xs sm:text-sm transition-all flex items-center gap-2 shadow-xs hover-lift">
                  <Search className="w-4 h-4 text-[#8A7000]" />
                  <span>Browse Creator Roster</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Animated Brand Marquee */}
      <AnimatedBrandSlider speed={26} direction="left" />

      {/* 3 Pillars Bento with 3D Tilt */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-[#0A0A0E]">
            Engineered for High-ROAS Creator Drops
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5A68] font-sans">
            Every layer built to safeguard brand budget, deliverable fidelity, and strict release schedules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InteractiveTiltCard
            maxTilt={7}
            glowColor="rgba(255, 210, 31, 0.25)"
            className="p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-4 flex flex-col justify-between hover-lift"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD21F]/20 border border-[#FFD21F]/40 flex items-center justify-center text-[#0A0A0E]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0E] font-display">FDIC-Insured Escrow Custody</h3>
              <p className="text-xs text-[#5A5A68] font-sans leading-relaxed">
                Your budget remains safely in escrow custody until you inspect and approve the deliverable. If a creator fails to meet requirements, your escrow is fully refundable.
              </p>
            </div>
            <div className="pt-4 border-t border-black/6 text-xs font-mono font-bold text-[#087F5B] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>100% Pre-funded</span>
            </div>
          </InteractiveTiltCard>

          <InteractiveTiltCard
            maxTilt={7}
            glowColor="rgba(255, 210, 31, 0.25)"
            className="p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-4 flex flex-col justify-between hover-lift"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0A0A0E] text-white flex items-center justify-center shadow-xs">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0E] font-display">4K Timecoded Video Player</h3>
              <p className="text-xs text-[#5A5A68] font-sans leading-relaxed">
                Leave frame-by-frame annotations directly on ProRes video cuts. Eliminate messy email chains and align your creative vision with exact precision.
              </p>
            </div>
            <div className="pt-4 border-t border-black/6 text-xs font-mono font-bold text-[#0A0A0E] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FFD21F]" />
              <span>SMPTE Accurate</span>
            </div>
          </InteractiveTiltCard>

          <InteractiveTiltCard
            maxTilt={7}
            glowColor="rgba(255, 210, 31, 0.25)"
            className="p-8 rounded-3xl bg-white border border-black/8 shadow-xs space-y-4 flex flex-col justify-between hover-lift"
          >
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FAF9F5] border border-black/10 flex items-center justify-center text-[#0A0A0E]">
                <Sparkles className="w-6 h-6 text-[#8A7000]" />
              </div>
              <h3 className="text-xl font-bold text-[#0A0A0E] font-display">AI Audience Telemetry Matching</h3>
              <p className="text-xs text-[#5A5A68] font-sans leading-relaxed">
                Filter by verified follower demographics, average engagement rate, and past brand ROAS to eliminate ghost followers and maximize campaign ROI.
              </p>
            </div>
            <div className="pt-4 border-t border-black/6 text-xs font-mono font-bold text-[#087F5B] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Audience Data</span>
            </div>

          </InteractiveTiltCard>
        </div>
      </section>

      {/* 7-Step Operating System */}
      <ContinuousProductStory />

      {/* 4K Timestamped QA Studio */}
      <InteractiveVideoReviewStudio />

      {/* Protected Milestone Flow */}
      <ProtectedEscrowFlow />

      {/* Audited Case Studies & Trust Guarantees */}
      <CaseStudiesSection />

      {/* Platform Performance Stats */}
      <StatsSection />

      {/* Closing High-Impact CTA */}
      <StreamlinedVisualCTA />
    </div>
  );
}
