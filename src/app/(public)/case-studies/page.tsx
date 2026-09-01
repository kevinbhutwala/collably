import React from "react";
import { CaseStudiesSection } from "@/components/landing/CaseStudiesSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { EditorialCTA } from "@/components/collably/EditorialCTA";

export default function CaseStudiesPage() {
  return (
    <div className="bg-texture-paper-white text-[#0A0A0E] min-h-screen">
      <div className="pt-24 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-black/10 text-[#0A0A0E] text-xs font-mono font-bold shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#FFD21F]" />
          <span>Case Studies &amp; Attribution</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight font-display">
          Verified Brand Growth Case Studies
        </h1>
        <p className="text-base text-[#6B6B6B] max-w-2xl mx-auto font-sans font-medium leading-relaxed">
          Explore how category-defining brands scale high-converting creator campaigns with audited ROI.
        </p>
      </div>

      <CaseStudiesSection />
      <StatsSection />
      <EditorialCTA />
    </div>
  );
}
