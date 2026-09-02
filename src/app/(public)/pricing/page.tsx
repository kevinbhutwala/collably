import React from "react";
import { StreamlinedPricing } from "@/components/collably/StreamlinedPricing";
import { CompactFAQ } from "@/components/collably/CompactFAQ";
import { AnimatedBrandSlider } from "@/components/visual/AnimatedBrandSlider";
import { StreamlinedVisualCTA } from "@/components/visual/StreamlinedVisualCTA";

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
