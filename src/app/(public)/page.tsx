"use client";

import React from "react";
import { ExactHeroSection } from "@/components/collably/ExactHeroSection";
import { ExactPlatformSection } from "@/components/collably/ExactPlatformSection";
import { ExactBentoSection } from "@/components/collably/ExactBentoSection";
import { ExactSuccessStoriesSection } from "@/components/collably/ExactSuccessStoriesSection";
import { PricingComparisonModule } from "@/components/collably/PricingComparisonModule";
import { FAQSection } from "@/components/collably/FAQSection";
import { ScrollStackSection } from "@/components/ui/ScrollStackSection";

export default function CollablyLandingPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0A0A0E] font-sans selection:bg-[#FFD21F] selection:text-[#0A0A0E] overflow-x-hidden">
      {/* 01 — Hero Stage (Base Level) */}
      <ScrollStackSection index={0} isFirst={true}>
        <ExactHeroSection />
      </ScrollStackSection>

      {/* 02 — Platform Capsule (Overlaps & slides over Hero) */}
      <ScrollStackSection index={1}>
        <ExactPlatformSection />
      </ScrollStackSection>

      {/* 03 — Bento Marketplace & Creator Discovery (Overlaps & slides over Platform) */}
      <ScrollStackSection index={2}>
        <ExactBentoSection />
      </ScrollStackSection>

      {/* 04 — Success Stories & Video Showcase (Overlaps & slides over Bento) */}
      <ScrollStackSection index={3}>
        <ExactSuccessStoriesSection />
      </ScrollStackSection>

      {/* 05 — Transparent Value Pricing (Overlaps & slides over Stories) */}
      <ScrollStackSection index={4}>
        <PricingComparisonModule />
      </ScrollStackSection>

      {/* 06 — FAQ & Help Knowledgebase (Overlaps & slides over Pricing) */}
      <ScrollStackSection index={5}>
        <FAQSection />
      </ScrollStackSection>
    </div>
  );
}
