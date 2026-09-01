import React from "react";
import { ExactHeroSection } from "@/components/collably/ExactHeroSection";
import { ExactPlatformSection } from "@/components/collably/ExactPlatformSection";
import { ExactBentoSection } from "@/components/collably/ExactBentoSection";
import { ExactSuccessStoriesSection } from "@/components/collably/ExactSuccessStoriesSection";

export default function CollablyLandingPage() {
  return (
    <div className="relative min-h-screen bg-[#07070B] text-white font-sans selection:bg-[#2A5CFF] selection:text-white overflow-x-hidden">
      {/* 01 — Hero Section: CREATE COLLABORATE GET PAID. with 3D models and floating cards */}
      <ExactHeroSection />

      {/* 02 — High-Contrast Capsule: BUILT FOR CREATORS. MADE FOR BRANDS. */}
      <ExactPlatformSection />

      {/* 03 — Dark Bento: FOR CREATORS & FOR BRANDS with Live Campaigns and Creator Grid */}
      <ExactBentoSection />

      {/* 04 — Bottom Showcase: CREATOR SUCCESS STORIES with Video Spotlight & Metrics Rail */}
      <ExactSuccessStoriesSection />
    </div>
  );
}
