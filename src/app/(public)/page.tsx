import React from "react";
import { SmoothScroll } from "@/components/flowpilot/SmoothScroll";
import { CustomCursor } from "@/components/flowpilot/CustomCursor";
import { AmbientBackground } from "@/components/flowpilot/AmbientBackground";
import { HeroSection } from "@/components/collably/HeroSection";
import { BrandMarquee } from "@/components/collably/BrandMarquee";
import { CollaborationCore } from "@/components/collably/CollaborationCore";
import { SignatureTransformScroll } from "@/components/collably/SignatureTransformScroll";
import { StoryPipeline } from "@/components/collably/StoryPipeline";
import { VideoReviewDemo } from "@/components/collably/VideoReviewDemo";
import { CreatorShowcase } from "@/components/collably/CreatorShowcase";
import { TrustGuarantee } from "@/components/collably/TrustGuarantee";
import { FAQSection } from "@/components/collably/FAQSection";
import { CollablyCTA } from "@/components/collably/CollablyCTA";

export default function CollablyLandingPage() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <AmbientBackground />
      <div className="relative min-h-screen bg-[#05070D] text-slate-100 font-sans selection:bg-brand-accent selection:text-white overflow-x-hidden">
        <HeroSection />
        <BrandMarquee />
        <CollaborationCore />
        <SignatureTransformScroll />
        <StoryPipeline />
        <VideoReviewDemo />
        <CreatorShowcase />
        <TrustGuarantee />
        <FAQSection />
        <CollablyCTA />
      </div>
    </SmoothScroll>
  );
}
