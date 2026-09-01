import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Video,
  Sparkles,
  ArrowRight,
  Search,
} from "lucide-react";

export default function ForBrandsPage() {
  return (
    <div className="bg-[#08080C] text-white min-h-screen select-none">
      {/* Brand Hero */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-32 overflow-hidden border-b border-white/10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#FFD21F]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#FFD21F] text-[11px] font-mono font-bold uppercase tracking-wider">
              <span>FOR GROWTH MARKETERS &amp; BRAND LEADERS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.02] text-white font-display">
              Hire vetted creators with{" "}
              <span className="font-serif italic font-normal text-white/80 lowercase block sm:inline">
                100% milestone escrow.
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-white/60 font-sans max-w-xl mx-auto leading-relaxed">
              Zero upfront release risk. Review 4K video drafts with frame-accurate timecoded comments, request revisions, and release payouts only upon satisfaction.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4 font-sans text-sm">
              <Link href="/app/brand/campaigns/create">
                <button className="px-6 py-3.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] font-bold text-xs sm:text-sm transition-all shadow-[0_0_20px_rgba(255,210,31,0.4)] border border-white/50 flex items-center gap-2">
                  <span>Create a Campaign Brief</span>
                  <ArrowRight className="w-4 h-4 text-[#0A0A0E]" />
                </button>
              </Link>

              <Link href="/creators">
                <button className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-[#FFD21F]/30 text-white font-semibold text-xs sm:text-sm transition-all flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#FFD21F]" />
                  <span>Browse Creator Roster</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Pillars Bento */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white">
            Engineered for High-ROAS Creator Campaigns
          </h2>
          <p className="text-xs sm:text-sm text-white/50 font-sans">
            Every step built to safeguard brand budget, quality, and timelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-3xl bg-[#101018] border border-white/10 shadow-2xl backdrop-blur-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD21F]/15 border border-[#FFD21F]/30 flex items-center justify-center text-[#FFD21F]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">FDIC-Insured Escrow Custody</h3>
            <p className="text-xs text-white/60 font-sans leading-relaxed">
              Your budget remains safely in escrow custody until you review the deliverable. If a creator fails to meet requirements, your escrow is fully refundable.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#101018] border border-white/10 shadow-2xl backdrop-blur-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Video className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">4K Timecoded Video Player</h3>
            <p className="text-xs text-white/60 font-sans leading-relaxed">
              Leave frame-by-frame annotations directly on video cuts. Eliminate messy email chains and align your creative vision with exact precision.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#101018] border border-white/10 shadow-2xl backdrop-blur-xl space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center text-white">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white font-display">AI Audience Telemetry Matching</h3>
            <p className="text-xs text-white/60 font-sans leading-relaxed">
              Filter by verified follower demographics, average engagement rate, and past brand ROAS to eliminate ghost followers and maximize campaign ROI.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
