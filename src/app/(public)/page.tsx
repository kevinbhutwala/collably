import React from "react";
import { SmoothScroll } from "@/components/flowpilot/SmoothScroll";
import { AmbientBackground } from "@/components/flowpilot/AmbientBackground";
import { HeroSection } from "@/components/collably/HeroSection";
import { SlidingTickerRail } from "@/components/collably/SlidingTickerRail";
import { BrandMarquee } from "@/components/collably/BrandMarquee";
import { SignatureConnection } from "@/components/collably/SignatureConnection";
import { HorizontalScrollStory } from "@/components/collably/HorizontalScrollStory";
import { AIMatchingExperience } from "@/components/collably/AIMatchingExperience";
import { CreatorShowcase } from "@/components/collably/CreatorShowcase";
import { CampaignLifecycleOS } from "@/components/collably/CampaignLifecycleOS";
import { EscrowTrustFlow } from "@/components/collably/EscrowTrustFlow";
import { VideoReviewDemo } from "@/components/collably/VideoReviewDemo";
import { ChaosToOrder } from "@/components/collably/ChaosToOrder";
import { PerformanceROI } from "@/components/collably/PerformanceROI";
import { InteractiveIndustriesStage } from "@/components/collably/InteractiveIndustriesStage";
import { BrandCreatorSplit } from "@/components/collably/BrandCreatorSplit";
import { EditorialTestimonials } from "@/components/collably/EditorialTestimonials";
import { TrustGuarantee } from "@/components/collably/TrustGuarantee";
import { FAQSection } from "@/components/collably/FAQSection";
import { CollablyCTA } from "@/components/collably/CollablyCTA";

export default function CollablyLandingPage() {
  return (
    <SmoothScroll>
      <AmbientBackground />
      <div className="relative min-h-screen bg-transparent text-white font-sans selection:bg-pink-500/25 selection:text-pink-300 overflow-x-hidden">
        {/* 01, 02 & 03 — Editorial Hero with Masked Reveal & Live Miniature Product Ecosystem */}
        <HeroSection />

        {/* Live Deal & Creator Infinite Sliding Ticker Rails */}
        <SlidingTickerRail />

        {/* Verified Brand Ecosystem Marquee */}
        <BrandMarquee />

        {/* 04 — The Signature Collably Connection (Brand ↔ Creator convergence into Collably Core) */}
        <SignatureConnection />

        {/* 05 — Cinematic Horizontal Scroll Story (7 End-To-End Stages) */}
        <HorizontalScrollStory />

        {/* 06 — Precision AI Creator Discovery with Natural Language Query & Multi-Factor Match Subscores */}
        <AIMatchingExperience />

        {/* 07 — Interactive Creator Media Kits & Live Rate Cards */}
        <CreatorShowcase />

        {/* 08 — The Collably Campaign Lifecycle Operating System */}
        <CampaignLifecycleOS />

        {/* 09 — Financial Escrow Milestone Protection & Payout Architecture */}
        <EscrowTrustFlow />

        {/* Interactive 4K Frame-Accurate Video Review Player */}
        <VideoReviewDemo />

        {/* 10 — "No More Chaos" (Without Collably vs With Collably Transformation) */}
        <ChaosToOrder />

        {/* 11 — Real-Time Performance & ROI Telemetry */}
        <PerformanceROI />

        {/* 12 — Multi-Category Interactive Industries Stage */}
        <InteractiveIndustriesStage />

        {/* 13 — Dedicated Creator ↔ Brand Portals Split */}
        <BrandCreatorSplit />

        {/* 14 — Editorial Testimonials & Authentic Results */}
        <EditorialTestimonials />

        {/* 100% Milestone Escrow & Compliance Trust Matrix */}
        <TrustGuarantee />

        {/* Legal & Operational FAQ */}
        <FAQSection />

        {/* Grand Finale Conversion CTA */}
        <CollablyCTA />
      </div>
    </SmoothScroll>
  );
}
