import React from "react";
import { Hero } from "@/components/landing/Hero";
import { BrandMarquee } from "@/components/landing/BrandMarquee";
import { CreatorShowcase } from "@/components/landing/CreatorShowcase";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { CampaignEcosystem } from "@/components/landing/CampaignEcosystem";
import { CaseStudiesSection } from "@/components/landing/CaseStudiesSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { FAQSection } from "@/components/landing/FAQSection";
import { CTASection } from "@/components/landing/CTASection";

export default function LandingPage() {
  return (
    <div className="w-full">
      <Hero />
      <BrandMarquee />
      <CreatorShowcase />
      <HowItWorks />
      <CampaignEcosystem />
      <CaseStudiesSection />
      <StatsSection />
      <FAQSection />
      <CTASection />
    </div>
  );
}
