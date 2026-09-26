import type { Metadata } from 'next';
import React from 'react';
import { WishlinkHeroShowcase } from '@/components/collably/WishlinkHeroShowcase';
import { WishlinkFlipMarquee } from '@/components/collably/WishlinkFlipMarquee';
import { WishlinkPillarsSection } from '@/components/collably/WishlinkPillarsSection';
import { WishlinkStickyCTA } from '@/components/collably/WishlinkStickyCTA';
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
  'https://abeycollab.com';

export const metadata: Metadata = {
  title: {
    absolute: 'AbeyCollab — Creator Commerce Platform | Milestone Escrow & Instant Payouts',
  },
  description:
    'AbeyCollab connects high-growth brands with verified creators through milestone-protected escrow campaigns, transparent rate cards, 4K video deliverable review, and guaranteed 24-hour payouts.',
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
      name: 'How does payment protection work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When a brand starts a project, they set aside the fee safely with AbeyCollab. The creator knows the money is waiting, and the brand only releases it once they review and approve the final work.',
      },
    },
    {
      '@type': 'Question',
      name: "What is AbeyCollab's platform fee?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AbeyCollab charges a simple 10% fee on completed projects. There are zero listing fees or hidden subscription requirements to pitch.',
      },
    },
    {
      '@type': 'Question',
      name: 'How are video revisions handled?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Creators share draft links directly in the project space. Brands can leave notes, point out specific moments in the video, and request small tweaks easily.',
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
      <div className="relative min-h-screen bg-white text-[#0A0A0E] font-sans selection:bg-[#FFD21F] selection:text-[#0A0A0E] overflow-x-hidden">
        {/* 01 — Wishlink-Style Punchy Minimalist Hero with Floating 3D Stickers */}
        <WishlinkHeroShowcase />

        {/* 02 — Signature Wishlink Dual-Track 3D Flip Card Marquee ("We have The Best With Us") */}
        <WishlinkFlipMarquee />

        {/* 03 — 3 Core Pillars (Monetise, Engage & Automate DMs, Collaborate Directly) */}
        <WishlinkPillarsSection />

        {/* 04 — Curated Talent Directory with Quick View & Mobile Swipeable Reel */}
        <EditorialCreatorGrid />

        {/* 05 — 7-Step Continuous Product Story OS (Discover → Match → Collab → Review → Approve → Pay → Grow) */}
        <ContinuousProductStory />

        {/* 06 — Standout Interactive 4K Timestamped Video QA Review Studio */}
        <InteractiveVideoReviewStudio />

        {/* 07 — Protected Milestone Escrow & Financial Trust Journey */}
        <ProtectedEscrowFlow />

        {/* 08 — Audited Enterprise Brand Results & Escrow Guarantee */}
        <CaseStudiesSection />

        {/* 09 — Platform Performance Metrics */}
        <StatsSection />

        {/* 10 — Transparent Workspace Pricing with Monthly/Annual Toggle */}
        <StreamlinedPricing />

        {/* 11 — Compact FAQ & Objection Handlers */}
        <CompactFAQ />

        {/* 12 — High-Impact Closing CTA */}
        <StreamlinedVisualCTA />

        {/* 13 — Signature Wishlink Floating Sticky Bottom Quick Sign-Up Bar */}
        <WishlinkStickyCTA />
      </div>
    </>
  );
}
