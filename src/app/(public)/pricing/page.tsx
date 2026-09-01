import React from "react";
import { PricingComparisonModule } from "@/components/collably/PricingComparisonModule";
import { FAQSection } from "@/components/collably/FAQSection";

export default function PricingPage() {
  return (
    <div className="bg-[#FAFAFC] text-[#0A0A0E] min-h-screen">
      <PricingComparisonModule />
      <FAQSection />
    </div>
  );
}
