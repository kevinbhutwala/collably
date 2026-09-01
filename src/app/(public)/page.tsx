import React from "react";
import { SmoothScroll } from "@/components/flowpilot/SmoothScroll";
import { AmbientBackground } from "@/components/flowpilot/AmbientBackground";
import { HeroEditorialCollage } from "@/components/collably/HeroEditorialCollage";
import { EditorialBigTextSection } from "@/components/collably/EditorialBigTextSection";
import { EditorialPortraitWall } from "@/components/collably/EditorialPortraitWall";
import { EditorialLookbookGrid } from "@/components/collably/EditorialLookbookGrid";
import { BrandCreatorNetwork } from "@/components/collably/BrandCreatorNetwork";
import { EditorialProductStory } from "@/components/collably/EditorialProductStory";
import { FAQSection } from "@/components/collably/FAQSection";
import { EditorialCTA } from "@/components/collably/EditorialCTA";

export default function CollablyLandingPage() {
  return (
    <SmoothScroll>
      <AmbientBackground />
      <div className="relative min-h-screen bg-[#FFFFFF] text-[#08090C] font-sans selection:bg-[#EEF0FF] selection:text-[#3047FF] overflow-x-hidden">
        {/* 01 — High-Fashion Editorial Hero with Layered Portraits & Overlapping UI */}
        <HeroEditorialCollage />

        {/* 02 — Giant Kinetic Typography Section (CREATORS. BRANDS. ONE WORKSPACE.) */}
        <EditorialBigTextSection />

        {/* 03 — Art-Directed Editorial Portrait Wall */}
        <EditorialPortraitWall />

        {/* 04 — Big, Medium & Small Portrait Lookbook + Brand Emblems */}
        <EditorialLookbookGrid />

        {/* 05 — Creative Brand × Creator Network */}
        <BrandCreatorNetwork />

        {/* 06 — Blended Product UI QA & Settlement Studio */}
        <EditorialProductStory />

        {/* 07 — Compact FAQ Accordion */}
        <FAQSection />

        {/* 08 — Magazine Grand Finale CTA */}
        <EditorialCTA />
      </div>
    </SmoothScroll>
  );
}
