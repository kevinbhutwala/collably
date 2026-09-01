"use client";

import React from "react";
import { ExactHeroSection } from "@/components/collably/ExactHeroSection";
import { ExactPlatformSection } from "@/components/collably/ExactPlatformSection";
import { ExactBentoSection } from "@/components/collably/ExactBentoSection";
import { ExactSuccessStoriesSection } from "@/components/collably/ExactSuccessStoriesSection";
import { PricingComparisonModule } from "@/components/collably/PricingComparisonModule";
import { FAQSection } from "@/components/collably/FAQSection";

export default function CollablyLandingPage() {
  return (
    <div className="relative min-h-screen bg-white text-[#0A0A0E] font-sans selection:bg-[#FFD21F] selection:text-[#0A0A0E] overflow-x-hidden">
      {/* 01 — Hero Stage (Base Level) */}
      <div className="relative z-10">
        <ExactHeroSection />
      </div>

      {/* 02 — Platform Capsule (Overlaps & slides over Hero) */}
      <div className="relative z-20 -mt-12 sm:-mt-16 rounded-t-[3rem] sm:rounded-t-[3.5rem] shadow-[0_-30px_70px_rgba(0,0,0,0.08)] bg-white border-t border-black/8 overflow-hidden">
        <ExactPlatformSection />
      </div>

      {/* 03 — Bento Marketplace & Creator Discovery (Overlaps & slides over Platform) */}
      <div className="relative z-30 -mt-12 sm:-mt-16 rounded-t-[3rem] sm:rounded-t-[3.5rem] shadow-[0_-30px_70px_rgba(0,0,0,0.08)] bg-[#FAFAFC] border-t border-black/8 overflow-hidden">
        <ExactBentoSection />
      </div>

      {/* 04 — Success Stories & Video Showcase (Overlaps & slides over Bento) */}
      <div className="relative z-40 -mt-12 sm:-mt-16 rounded-t-[3rem] sm:rounded-t-[3.5rem] shadow-[0_-30px_70px_rgba(0,0,0,0.08)] bg-white border-t border-black/8 overflow-hidden">
        <ExactSuccessStoriesSection />
      </div>

      {/* 05 — Transparent Value Pricing (Overlaps & slides over Stories) */}
      <div className="relative z-50 -mt-12 sm:-mt-16 rounded-t-[3rem] sm:rounded-t-[3.5rem] shadow-[0_-30px_70px_rgba(0,0,0,0.08)] bg-[#FAFAFC] border-t border-black/8 overflow-hidden">
        <PricingComparisonModule />
      </div>

      {/* 06 — FAQ & Help Knowledgebase (Overlaps & slides over Pricing) */}
      <div className="relative z-[60] -mt-12 sm:-mt-16 rounded-t-[3rem] sm:rounded-t-[3.5rem] shadow-[0_-30px_70px_rgba(0,0,0,0.08)] bg-white border-t border-black/8 overflow-hidden">
        <FAQSection />
      </div>
    </div>
  );
}
