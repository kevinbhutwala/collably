import React from "react";
import { SmoothScroll } from "@/components/flowpilot/SmoothScroll";
import { CustomCursor } from "@/components/flowpilot/CustomCursor";
import { AmbientBackground } from "@/components/flowpilot/AmbientBackground";
import { CinematicNavbar } from "@/components/flowpilot/CinematicNavbar";
import { HeroCinematic } from "@/components/flowpilot/HeroCinematic";
import { InteractiveAiCore } from "@/components/flowpilot/InteractiveAiCore";
import { SignatureTransformScroll } from "@/components/flowpilot/SignatureTransformScroll";
import { HorizontalStorySection } from "@/components/flowpilot/HorizontalStorySection";
import { CinematicProductDemo } from "@/components/flowpilot/CinematicProductDemo";
import { RevenueRecoverySection } from "@/components/flowpilot/RevenueRecoverySection";
import { InteractiveIndustries } from "@/components/flowpilot/InteractiveIndustries";
import { CinematicMetrics } from "@/components/flowpilot/CinematicMetrics";
import { SecurityArchitecture } from "@/components/flowpilot/SecurityArchitecture";
import { CinematicFAQ } from "@/components/flowpilot/CinematicFAQ";
import { CinematicCTA } from "@/components/flowpilot/CinematicCTA";
import { CinematicFooter } from "@/components/flowpilot/CinematicFooter";

export default function FlowPilotLandingPage() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <AmbientBackground />
      <div className="relative min-h-screen bg-[#05070D] text-slate-100 font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden">
        <CinematicNavbar />
        <main>
          <HeroCinematic />
          <InteractiveAiCore />
          <SignatureTransformScroll />
          <HorizontalStorySection />
          <CinematicProductDemo />
          <RevenueRecoverySection />
          <InteractiveIndustries />
          <CinematicMetrics />
          <SecurityArchitecture />
          <CinematicFAQ />
          <CinematicCTA />
        </main>
        <CinematicFooter />
      </div>
    </SmoothScroll>
  );
}
