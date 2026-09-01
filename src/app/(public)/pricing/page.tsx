import React from "react";
import { PricingComparisonModule } from "@/components/collably/PricingComparisonModule";
import { FAQSection } from "@/components/collably/FAQSection";

export default function PricingPage() {
  return (
    <div className="bg-[#07070B] text-white min-h-screen">
      <PricingComparisonModule />
      <FAQSection />
    </div>
  );
}
