import React from "react";
import { SmoothScroll } from "@/components/flowpilot/SmoothScroll";
import { AmbientBackground } from "@/components/flowpilot/AmbientBackground";
import { HeroSection } from "@/components/collably/HeroSection";
import { BrandMarquee } from "@/components/collably/BrandMarquee";
import { CreatorShowcase } from "@/components/collably/CreatorShowcase";
import { VideoReviewDemo } from "@/components/collably/VideoReviewDemo";
import { AIMatchingExperience } from "@/components/collably/AIMatchingExperience";
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

        {/* 02 — Platform API Infrastructure Marquee */}
        <BrandMarquee />

        {/* 03 — Visual Creator Roster & Media Kits */}
        <CreatorShowcase />

        {/* 04 — Cinematic 4K Video Review Studio */}
        <VideoReviewDemo />

        {/* 05 — AI Creator Discovery Engine */}
        <AIMatchingExperience />

        {/* 06 — 7-Step Visual Collaboration Pipeline */}
        <SevenStepWorkflow />

        {/* 07 — Interactive Industry Playbooks */}
        <InteractiveIndustriesStage />

        {/* 08 — Dedicated Brand & Creator Portals */}
        <BrandCreatorSplit />

        {/* 09 — Compact Operational FAQ */}
        <FAQSection />

        {/* 10 — Grand Finale Conversion CTA */}
        <CollablyCTA />
      </div>
    </SmoothScroll>
  );
}
