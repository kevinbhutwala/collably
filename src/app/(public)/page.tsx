import React from "react";
import { SmoothScroll } from "@/components/flowpilot/SmoothScroll";
import { AmbientBackground } from "@/components/flowpilot/AmbientBackground";
import { HeroSection } from "@/components/collably/HeroSection";
import { SlidingTickerRail } from "@/components/collably/SlidingTickerRail";
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
      <AmbientBackground />
      <div className="relative min-h-screen bg-transparent text-slate-900 font-sans selection:bg-brand-accent/20 selection:text-brand-accent overflow-x-hidden">
        <HeroSection />
        <SlidingTickerRail />
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
