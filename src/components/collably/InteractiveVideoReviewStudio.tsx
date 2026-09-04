"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import { DeliverableReviewCard } from "./DeliverableReviewCard";

export { DeliverableReviewCard };

/**
 * InteractiveVideoReviewStudio is deprecated.
 * Replaced with lightweight external link DeliverableReviewCard.
 */
export function InteractiveVideoReviewStudio() {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8] select-none border-t border-black/8 dark:border-white/10 relative overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF5] dark:bg-[#14141E] border border-[#FFD21F]/50 text-xs font-mono font-bold text-[#0A0A0E] dark:text-white shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
            <span>EXTERNAL LINK DELIVERABLE REVIEW</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0A0A0E] dark:text-white tracking-tight font-display">
            Frictionless Link Reviews. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD21F] via-[#FFAE00] to-[#FFD21F]">
              Zero Video Upload Hassle.
            </span>
          </h2>

          <p className="text-xs sm:text-base text-[#5A5A68] dark:text-[#8E8EA4] leading-relaxed">
            Eliminate massive file upload bottlenecks. Review Google Drive, Dropbox, or Frame.io deliverables with automatic 120-hour SLA review timers, creator notes, and instant 1-click escrow disbursement.
          </p>
        </div>

        {/* Deliverable Review Card Interactive Showcase */}
        <div className="pt-2">
          <DeliverableReviewCard
            title="Dedicated 4K Technical Integration Segment"
            deliverableType="YouTube 60s Integration"
            payoutAmount={2500}
            creatorName="Elena Rostova"
            creatorHandle="elenatech"
            assetUrl="https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9/view?usp=sharing"
            notes="Color graded to Linear brand guidelines. Rough cut audio mixed at -14 LUFS. Primary product onboarding b-roll starts at 04:12."
            isInteractiveDemo={true}
          />
        </div>
      </div>
    </section>
  );
}
