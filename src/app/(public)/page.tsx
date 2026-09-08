import type { Metadata } from 'next';
import React from 'react';
import { HeroEditorialShowcase } from '@/components/collably/HeroEditorialShowcase';
import { AnimatedBrandSlider } from '@/components/visual/AnimatedBrandSlider';
import { EditorialCreatorGrid } from '@/components/creators/EditorialCreatorGrid';
import { ContinuousProductStory } from '@/components/collably/ContinuousProductStory';
import { InteractiveVideoReviewStudio } from '@/components/collably/InteractiveVideoReviewStudio';
import { ProtectedEscrowFlow } from '@/components/collably/ProtectedEscrowFlow';
import { CaseStudiesSection } from '@/components/landing/CaseStudiesSection';
import { StatsSection } from '@/components/landing/StatsSection';
import { StreamlinedPricing } from '@/components/collably/StreamlinedPricing';
import { CompactFAQ } from '@/components/collably/CompactFAQ';
import { StreamlinedVisualCTA } from '@/components/visual/StreamlinedVisualCTA';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: {
    absolute: 'AbeyCollab — Creator Commerce Platform | Milestone Escrow & Instant Payouts',
  },
  description:
    'AbeyCollab connects high-growth brands with verified creators through milestone-protected escrow campaigns, transparent rate cards, 4K video QA review studio, and guaranteed 24-hour payouts.',
  keywords: [
    'creator marketplace',
    'influencer marketing platform',
    'hire content creators',
    'milestone escrow payments',
    'brand creator deals',
    'ugc creator marketplace',
    'youtube sponsorships',
    'tiktok brand campaigns',
    'instagram creator media kit',
    'verified influencer platform',
  ],
  alternates: { canonical: BASE_URL },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    title: 'AbeyCollab — Creator Commerce Platform | Milestone Escrow & Instant Payouts',
    description:
      'Connect brands with verified content creators through milestone-protected escrow, transparent rate cards, and instant payouts.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AbeyCollab Creator Commerce Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AbeyCollab — Creator Commerce Platform',
    description:
      'Milestone-protected creator campaigns, verified rate cards, and instant payouts.',
    images: ['/og-image.png'],
  },
};

const homeFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does 100% escrow protection work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Milestone funds are deposited upfront into segregated custody via Stripe Connect, and released to the creator within 24 hours only after the brand approves the final video deliverable.',
      },
    },
    {
      '@type': 'Question',
      name: "What is AbeyCollab's platform fee?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AbeyCollab charges a flat 10% platform fee on completed milestones. There are zero listing fees or hidden subscription requirements to pitch.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are video revisions handled?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Marketers use our 4K frame-accurate video review player to leave timestamped comments directly on video cuts for fast, clear turnaround.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly do creators get paid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Payouts are automated and arrive directly in the creator's connected bank account in less than 24 hours (or 2 hours on Pro).",
      },
    },
  ],
};

export default function AbeyCollabLandingPage() {
  return (
    <>
      <script
        id="homepage-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqJsonLd) }}
      />
      <div className="relative min-h-screen bg-white dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8] font-sans selection:bg-[#FFD21F] selection:text-[#0A0A0E] overflow-x-hidden">
        {/* 01 — High-Impact Value-Focused Editorial Hero */}
        <HeroEditorialShowcase />

        {/* 02 — Infinite Sliding Brand Marquee */}
        <AnimatedBrandSlider speed={26} direction="left" />

        {/* 03 — Curated Talent Directory with Quick View & Mobile Swipeable Reel */}
        <EditorialCreatorGrid />

        {/* 04 — 7-Step Continuous Product Story OS (Discover → Match → Collab → Review → Approve → Pay → Grow) */}
        <ContinuousProductStory />

        {/* 05 — Standout Interactive 4K Timestamped Video QA Review Studio */}
        <InteractiveVideoReviewStudio />

        {/* 06 — Protected Milestone Escrow & Financial Trust Journey */}
        <ProtectedEscrowFlow />

        {/* 07 — Audited Enterprise Brand Results & Escrow Guarantee */}
        <CaseStudiesSection />

        {/* 08 — Platform Performance Metrics */}
        <StatsSection />

        {/* 09 — Transparent Workspace Pricing with Monthly/Annual Toggle */}
        <StreamlinedPricing />

        {/* 10 — Compact FAQ & Objection Handlers */}
        <CompactFAQ />

        {/* 11 — High-Impact Closing CTA */}
        <StreamlinedVisualCTA />
      </div>
    </>
  );
}
