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
      <div className="relative min-h-screen bg-[#FCFCFA] text-[#101310] font-sans selection:bg-[#EAF8F2] selection:text-[#087F5B] overflow-x-hidden">
        {/* 01 — Editorial Hero with Financial Flow Visualizer */}
        <HeroSection />

        {/* 02 — Approved 4K Creator Video Deliverables Marquee */}
        <CreatorReelsMarquee />

        {/* 03 — AI Creator Discovery & Matching Engine */}
        <AIMatchingExperience />

        {/* 04 — Frame-Accurate Video QA & Milestone Sign-Off */}
        <VideoReviewDemo />

        {/* 05 — Dedicated Brand & Creator Workspaces */}
        <BrandCreatorSplit />

        {/* 06 — Operational FAQ Accordion */}
        <FAQSection />

        {/* 07 — Editorial Conversion CTA */}
        <CollablyCTA />
      </div>
    </SmoothScroll>
  );
}
