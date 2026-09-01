import React from "react";
import { SmoothScroll } from "@/components/flowpilot/SmoothScroll";
import { AmbientBackground } from "@/components/flowpilot/AmbientBackground";
import { HeroSection } from "@/components/collably/HeroSection";
import { CreatorReelsMarquee } from "@/components/collably/CreatorReelsMarquee";
import { VideoReviewDemo } from "@/components/collably/VideoReviewDemo";
import { AIMatchingExperience } from "@/components/collably/AIMatchingExperience";
import { CreatorShowcase } from "@/components/collably/CreatorShowcase";
import { VisualEscrowMotion } from "@/components/collably/VisualEscrowMotion";
import { SevenStepWorkflow } from "@/components/collably/SevenStepWorkflow";
import { InteractiveIndustriesStage } from "@/components/collably/InteractiveIndustriesStage";
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

        {/* 03 — Cinematic 4K Video Review QA Studio */}
        <VideoReviewDemo />

        {/* 04 — AI Creator Matching Engine */}
        <AIMatchingExperience />

        {/* 05 — Visual Creator Photography Roster & Media Kits */}
        <CreatorShowcase />

        {/* 06 — Interactive Milestone Custody Flow Visualizer */}
        <VisualEscrowMotion />

        {/* 07 — 7-Step Visual Collaboration Pipeline */}
        <SevenStepWorkflow />

        {/* 08 — Category Playbooks & Creator Examples */}
        <InteractiveIndustriesStage />

        {/* 09 — Dedicated Brand & Creator Portals */}
        <BrandCreatorSplit />

        {/* 10 — Compact FAQ Accordion */}
        <FAQSection />

        {/* 11 — Grand Finale Conversion CTA */}
        <CollablyCTA />
      </div>
    </SmoothScroll>
  );
}
