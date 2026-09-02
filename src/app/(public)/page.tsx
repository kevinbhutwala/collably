"use client";

import React from "react";
import { HeroEditorialShowcase } from "@/components/collably/HeroEditorialShowcase";
import { AnimatedBrandSlider } from "@/components/visual/AnimatedBrandSlider";
import { EditorialCreatorGrid } from "@/components/creators/EditorialCreatorGrid";
import { ContinuousProductStory } from "@/components/collably/ContinuousProductStory";
import { InteractiveVideoReviewStudio } from "@/components/collably/InteractiveVideoReviewStudio";
import { ProtectedEscrowFlow } from "@/components/collably/ProtectedEscrowFlow";
import { CaseStudiesSection } from "@/components/landing/CaseStudiesSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { StreamlinedPricing } from "@/components/collably/StreamlinedPricing";
import { CompactFAQ } from "@/components/collably/CompactFAQ";
import { StreamlinedVisualCTA } from "@/components/visual/StreamlinedVisualCTA";

export default function CollablyLandingPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0A0A0E] font-sans selection:bg-[#FFD21F] selection:text-[#0A0A0E] overflow-x-hidden">
      {/* 01 — High-Impact Value-Focused Editorial Hero */}
      <HeroEditorialShowcase />

      {/* 02 — Infinite Sliding Brand Marquee */}
      <AnimatedBrandSlider speed={26} direction="left" />

      {/* 03 — Curated Talent Directory with Quick View & Mobile Swipeable Reel */}
      <EditorialCreatorGrid />

      {/* 04 — 7-Step Continuous Product Story OS (Discover → Match → Collab → Review → Approve → Pay → Grow) */}
      <ContinuousProductStory />

      {/* 05 — Standout Interactive 4K Timestamped Video QA Review Studio */}
      <InteractiveVideoReviewStudio />

      {/* 06 — Protected Milestone Escrow & Financial Trust Journey */}
      <ProtectedEscrowFlow />

      {/* 07 — Audited Enterprise Brand Results & Escrow Guarantee */}
      <CaseStudiesSection />

      {/* 08 — Platform Performance Metrics */}
      <StatsSection />

      {/* 09 — Transparent Workspace Pricing with Monthly/Annual Toggle */}
      <StreamlinedPricing />

      {/* 10 — Compact FAQ & Objection Handlers */}
      <CompactFAQ />

      {/* 11 — High-Impact Closing CTA */}
      <StreamlinedVisualCTA />
    </div>
  );
}
