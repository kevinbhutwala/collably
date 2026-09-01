import React from "react";
import { SmoothScroll } from "@/components/flowpilot/SmoothScroll";
import { AmbientBackground } from "@/components/flowpilot/AmbientBackground";
import { HeroEditorialCollage } from "@/components/collably/HeroEditorialCollage";
import { FeatureBentoGrid } from "@/components/collably/FeatureBentoGrid";
import { InteractiveDashboardShowcase } from "@/components/collably/InteractiveDashboardShowcase";
import { EditorialPortraitWall } from "@/components/collably/EditorialPortraitWall";
import { EditorialLookbookGrid } from "@/components/collably/EditorialLookbookGrid";
import { PricingComparisonModule } from "@/components/collably/PricingComparisonModule";
import { BrandCreatorNetwork } from "@/components/collably/BrandCreatorNetwork";
import { FAQSection } from "@/components/collably/FAQSection";
import { EditorialCTA } from "@/components/collably/EditorialCTA";

export default function CollablyLandingPage() {
  return (
    <SmoothScroll>
      <AmbientBackground />
      <div className="relative min-h-screen bg-[#FAFAF8] text-[#101010] font-sans selection:bg-[#B7FF3C] selection:text-[#101010] overflow-x-hidden">
        {/* 01 — Modern Editorial Hero Section with Floating Trust Badges & 3D Layered Composition */}
        <HeroEditorialCollage />

        {/* 02 — Asymmetric 5-Card Bento Grid (4K QA Studio, AI Affinity, Milestone Escrow, Rights QA, Arbitration) */}
        <FeatureBentoGrid />

        {/* 03 — Interactive Dashboard Showcase (High Data-Ink Ratio, Live Telemetry Sparkline, Activity Timeline) */}
        <InteractiveDashboardShowcase />

        {/* 04 — Art-Directed Editorial Creator Portrait Wall */}
        <EditorialPortraitWall />

        {/* 05 — Big, Medium & Small Creator Lookbook + Brand Emblems */}
        <EditorialLookbookGrid />

        {/* 06 — 3-Tier Pricing & Feature Comparison Matrix with Annual Discount Toggle */}
        <PricingComparisonModule />

        {/* 07 — Creative Brand × Creator Verified Deal Flow */}
        <BrandCreatorNetwork />

        {/* 08 — Minimalist Accordion FAQ Section */}
        <FAQSection />

        {/* 09 — Grand Finale Magazine CTA */}
        <EditorialCTA />
      </div>
    </SmoothScroll>
  );
}
