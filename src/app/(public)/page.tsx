import type { Metadata } from 'next';
import React from 'react';
import { WishlinkHeroShowcase } from '@/components/collably/WishlinkHeroShowcase';
import { WishlinkFlipMarquee } from '@/components/collably/WishlinkFlipMarquee';
import { WishlinkSignpostShowcase } from '@/components/collably/WishlinkSignpostShowcase';
import { WishlinkEngageBanner } from '@/components/collably/WishlinkEngageBanner';
import { WishlinkTicketStories } from '@/components/collably/WishlinkTicketStories';
import { WishlinkLaunchpadCTA } from '@/components/collably/WishlinkLaunchpadCTA';
import { WishlinkStickyCTA } from '@/components/collably/WishlinkStickyCTA';
import { CompactFAQ } from '@/components/collably/CompactFAQ';
import { StreamlinedPricing } from '@/components/collably/StreamlinedPricing';
import { SITE_URL, absoluteUrl } from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    absolute: 'AbeyCollab — Creator Commerce Platform | Milestone Escrow & Instant Payouts',
  },
  description:
    'AbeyCollab connects high-growth brands with verified creators through milestone-protected escrow campaigns, transparent rate cards, Auto-DM engagement, and guaranteed 24-hour payouts.',
  keywords: [
    'AbeyCollab',
    'abeycollab',
    'creator marketplace',
    'influencer marketing platform',
    'hire content creators',
    'milestone escrow payments',
    'brand creator deals',
    'ugc creator marketplace',
    'youtube sponsorships',
    'instagram creator media kit',
    'verified influencer platform India',
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    title: 'AbeyCollab — Creator Commerce Platform | Milestone Escrow & Instant Payouts',
    description:
      'Connect brands with verified content creators through milestone-protected escrow, transparent rate cards, and instant payouts.',
    images: [
      {
        url: absoluteUrl('/og-image.png'),
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
    images: [absoluteUrl('/og-image.png')],
  },
};

const homeFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How does payment protection work on AbeyCollab?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'When a brand starts a project, they deposit 100% of the campaign fee safely into Razorpay Escrow. Creators know the funds are locked and guaranteed before creating content, and the money is released within 24 hours of deliverable approval.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the AbeyCollab Engage (Auto-DM) engine work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AbeyCollab connects with your Instagram account via official Meta Graph APIs. When brands or followers comment on your reels, your verified media kit, rate card, or product link is automatically sent to their DMs in under 3 seconds.',
      },
    },
    {
      '@type': 'Question',
      name: "What is AbeyCollab's platform fee?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Joining and creating your verified media kit is 100% free. AbeyCollab charges a simple platform fee on completed brand deals, with zero hidden listing fees or subscriptions.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly do creators get paid?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Payouts are automated and arrive directly in the creator’s connected bank account in less than 24 hours after brand approval.',
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
      <div className="relative min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-white overflow-x-clip scroll-smooth">
        {/* 01 — Wishlink-Style Minimalist, Spacious Hero with Floating 3D Stickers */}
        <WishlinkHeroShowcase />

        {/* 02 — Signature Wishlink Dual-Track 3D Flip Card Marquee ("We have The Best With Us") */}
        <WishlinkFlipMarquee />

        {/* 03 — 3D Directional Brand Signpost & Interactive Carousel (Matching Sample Image 1) */}
        <WishlinkSignpostShowcase />

        {/* 04 — Endless Possibilities Feature Banner with Overlapping Creator (Matching Sample Image 3) */}
        <WishlinkEngageBanner />

        {/* 05 — Perforated VIP Ticket Pass Creator Testimonials (Matching Sample Image 2) */}
        <WishlinkTicketStories />

        {/* 06 — Subscription & Transparent Pricing Plans */}
        <div id="pricing">
          <StreamlinedPricing />
        </div>

        {/* 07 — Clean, Spacious FAQ & Objection Handlers */}
        <CompactFAQ />

        {/* 08 — Wishlink Signature "Your launchpad to success!!" High-Conversion Closing Banner */}
        <WishlinkLaunchpadCTA />

        {/* 08 — Signature Wishlink Floating Sticky Bottom Quick Sign-Up Bar */}
        <WishlinkStickyCTA />
      </div>
    </>
  );
}
