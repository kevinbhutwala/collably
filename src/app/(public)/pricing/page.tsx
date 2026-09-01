import React from "react";
import { PricingComparisonModule } from "@/components/collably/PricingComparisonModule";
import { FAQSection } from "@/components/collably/FAQSection";
import { EditorialCTA } from "@/components/collably/EditorialCTA";

export default function PricingPage() {
  return (
    <div className="bg-[#FAFAF8] text-[#101010] min-h-screen">
      <PricingComparisonModule />
      <FAQSection />
      <EditorialCTA />
    </div>
  );
}
