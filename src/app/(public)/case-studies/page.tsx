import React from "react";
import { CaseStudiesSection } from "@/components/landing/CaseStudiesSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { CTASection } from "@/components/landing/CTASection";

export default function CaseStudiesPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="pt-16 pb-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
          Verified Brand Growth Case Studies
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto">
          Explore how category-defining brands scale high-converting creator campaigns with audited ROI.
        </p>
      </div>

      <CaseStudiesSection />
      <StatsSection />
      <CTASection />
    </div>
  );
}
