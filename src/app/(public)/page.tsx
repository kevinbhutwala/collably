import React from "react";
import { SmoothScroll } from "@/components/flowpilot/SmoothScroll";
import { AmbientBackground } from "@/components/flowpilot/AmbientBackground";
import { HeroSection } from "@/components/collably/HeroSection";
import { BrandMarquee } from "@/components/collably/BrandMarquee";
import { VideoReviewDemo } from "@/components/collably/VideoReviewDemo";
import { AIMatchingExperience } from "@/components/collably/AIMatchingExperience";
import { CreatorShowcase } from "@/components/collably/CreatorShowcase";
import { EscrowTrustFlow } from "@/components/collably/EscrowTrustFlow";
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
        {/* 01 — Editorial Hero with Interactive Live Deal & Payout Simulation */}
        <HeroSection />

        {/* 02 — Platform Infrastructure & Direct API Telemetry */}
        <BrandMarquee />

        {/* 03 — Core Product Feature: 4K Frame-Accurate Video Review & 1-Click Escrow Release */}
        <VideoReviewDemo />

        {/* 04 — Precision AI Creator Discovery with Natural Language Query */}
        <AIMatchingExperience />

        {/* 05 — Sample Creator Media Kits & Live Rate Cards */}
        <CreatorShowcase />

        {/* 06 — Financial Escrow Milestone Custody Architecture */}
        <EscrowTrustFlow />

        {/* 07 — "No More Chaos" (Without Collably vs With Collably) */}
        <ChaosToOrder />

        {/* 08 — Tailored Portals for Brands & Creators */}
        <BrandCreatorSplit />

        {/* 09 — The Collably Trust Standard (100% Escrow, 0-Day Waiting, 10% Fee, <4h SLA) */}
        <TrustGuarantee />

        {/* 10 — Operational, Legal & Tax Compliance FAQ */}
        <FAQSection />

        {/* 11 — Grand Finale Conversion CTA */}
        <CollablyCTA />
      </div>
    </SmoothScroll>
  );
}
