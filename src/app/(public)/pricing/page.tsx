import type { Metadata } from 'next';
import React from "react";
import { StreamlinedPricing } from "@/components/collably/StreamlinedPricing";
import { CompactFAQ } from "@/components/collably/CompactFAQ";
import { AnimatedBrandSlider } from "@/components/visual/AnimatedBrandSlider";
import { StreamlinedVisualCTA } from "@/components/visual/StreamlinedVisualCTA";

export const metadata: Metadata = {
  title: 'Pricing',
  description: 'Simple, transparent pricing for creators and brands. Start free, upgrade when you grow.',
  alternates: { canonical: 'https://collably-ashen.vercel.app/pricing' },
  openGraph: { title: 'Pricing | Collably', description: 'Simple, transparent pricing for creators and brands.' },
};


export default function PricingPage() {
  return (
    <div className="bg-[#FAFAFC] text-[#0A0A0E] min-h-screen space-y-12">
      <StreamlinedPricing />
      <AnimatedBrandSlider speed={28} direction="left" />
      <CompactFAQ />
      <StreamlinedVisualCTA />
    </div>
  );
}
