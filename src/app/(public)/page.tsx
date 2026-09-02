"use client";

import React from "react";
import { VisualHeroSection } from "@/components/visual/VisualHeroSection";
import { AnimatedBrandSlider } from "@/components/visual/AnimatedBrandSlider";
import { OverlappingCardsDeck } from "@/components/visual/OverlappingCardsDeck";
import { VisualShowcaseSlider } from "@/components/visual/VisualShowcaseSlider";
import { StreamlinedVisualCTA } from "@/components/visual/StreamlinedVisualCTA";

export default function CollablyLandingPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0A0A0E] font-sans selection:bg-[#FFD21F] selection:text-[#0A0A0E] overflow-x-hidden">
      {/* 01 — Visual-First Hero with Minimal Text & Overlapping 4K Media Portrait Stage */}
      <VisualHeroSection />

      {/* 02 — Sliding & Animated Infinite List of Brands */}
      <AnimatedBrandSlider speed={25} direction="left" />

      {/* 03 — Featured Cards Deck with High-Fashion Portraits, Overlapping Floating Images & 3D Tilt Effect */}
      <OverlappingCardsDeck />

      {/* 04 — Selected Campaign Deliverables with Overlapping Frame Thumbnails */}
      <VisualShowcaseSlider />

      {/* 05 — Minimal High-Impact Closing CTA */}
      <StreamlinedVisualCTA />
    </div>
  );
}
