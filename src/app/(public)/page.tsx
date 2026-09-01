import React from "react";
import { SmoothScroll } from "@/components/flowpilot/SmoothScroll";
import { AmbientBackground } from "@/components/flowpilot/AmbientBackground";
import { HeroSection } from "@/components/collably/HeroSection";
import { CreatorReelsMarquee } from "@/components/collably/CreatorReelsMarquee";
import { AIMatchingExperience } from "@/components/collably/AIMatchingExperience";
import { VideoReviewDemo } from "@/components/collably/VideoReviewDemo";
import { BrandCreatorSplit } from "@/components/collably/BrandCreatorSplit";
import { FAQSection } from "@/components/collably/FAQSection";
import { CollablyCTA } from "@/components/collably/CollablyCTA";

export default function CollablyLandingPage() {
  return (
    <SmoothScroll>
      <AmbientBackground />
      <div className="relative min-h-screen bg-transparent text-white font-sans selection:bg-pink-500/25 selection:text-pink-300 overflow-x-hidden">
        {/* 01 — Cinematic Hero with Interactive 4-Tab Workspace */}
        <HeroSection />

        {/* 02 — Live Animated 4K Creator Video Reels Marquee */}
        <CreatorReelsMarquee />

        {/* 03 — AI Creator Discovery Engine */}
        <AIMatchingExperience />

        {/* 04 — Cinematic 4K Video Review QA Studio */}
        <VideoReviewDemo />

        {/* 05 — Dedicated Brand & Creator Portals */}
        <BrandCreatorSplit />

        {/* 06 — Compact FAQ Accordion */}
        <FAQSection />

        {/* 07 — Grand Finale Conversion CTA */}
        <CollablyCTA />
      </div>
    </SmoothScroll>
  );
}
