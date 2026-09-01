import React from "react";
import { SmoothScroll } from "@/components/flowpilot/SmoothScroll";
import { AmbientBackground } from "@/components/flowpilot/AmbientBackground";
import { HeroSection } from "@/components/collably/HeroSection";
import { BrandMarquee } from "@/components/collably/BrandMarquee";
import { SevenStepWorkflow } from "@/components/collably/SevenStepWorkflow";
import { AIMatchingExperience } from "@/components/collably/AIMatchingExperience";
import { CreatorShowcase } from "@/components/collably/CreatorShowcase";
import { VideoReviewDemo } from "@/components/collably/VideoReviewDemo";
import { EscrowTrustFlow } from "@/components/collably/EscrowTrustFlow";
import { PerformanceROI } from "@/components/collably/PerformanceROI";
import { InteractiveIndustriesStage } from "@/components/collably/InteractiveIndustriesStage";
import { ChaosToOrder } from "@/components/collably/ChaosToOrder";
import { BrandCreatorSplit } from "@/components/collably/BrandCreatorSplit";
import { TrustGuarantee } from "@/components/collably/TrustGuarantee";
import { FAQSection } from "@/components/collably/FAQSection";
import { CollablyCTA } from "@/components/collably/CollablyCTA";

export default function CollablyLandingPage() {
  return (
    <SmoothScroll>
      <AmbientBackground />
      <div className="relative min-h-screen bg-transparent text-white font-sans selection:bg-pink-500/25 selection:text-pink-300 overflow-x-hidden">
        {/* 01 — Hero & Interactive 4-Tab Campaign Workspace Preview */}
        <HeroSection />

        {/* 02 — Platform Infrastructure & Direct API Telemetry */}
        <BrandMarquee />

        {/* 03 — Canonical 7-Stage Collaboration Operating System */}
        <SevenStepWorkflow />

        {/* 04 — Precision AI Creator Discovery with Natural Language Matching */}
        <AIMatchingExperience />

        {/* 05 — Sample Creator Media Kits & Live Rate Cards */}
        <CreatorShowcase />

        {/* 06 — 4K Frame-Accurate Video Review Studio with Timecoded Annotations */}
        <VideoReviewDemo />

        {/* 07 — Financial Milestone-Protected Payment Architecture */}
        <EscrowTrustFlow />

        {/* 08 — Real-Time Conversion & Attribution Telemetry */}
        <PerformanceROI />

        {/* 09 — Interactive Industry Switcher & Category Playbooks */}
        <InteractiveIndustriesStage />

        {/* 10 — Traditional Workflow vs Collably Operating System */}
        <ChaosToOrder />

        {/* 11 — Dedicated Portals for Brands & Creators */}
        <BrandCreatorSplit />

        {/* 12 — The Collably Trust Standards */}
        <TrustGuarantee />

        {/* 13 — Operational, Legal, Tax & Licensing FAQ */}
        <FAQSection />

        {/* 14 — Grand Finale Conversion CTA */}
        <CollablyCTA />
      </div>
    </SmoothScroll>
  );
}
