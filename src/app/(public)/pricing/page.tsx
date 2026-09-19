import type { Metadata } from 'next';
import React from 'react';
import { StreamlinedPricing } from '@/components/collably/StreamlinedPricing';
import { CompactFAQ } from '@/components/collably/CompactFAQ';
import { AnimatedBrandSlider } from '@/components/visual/AnimatedBrandSlider';
import { StreamlinedVisualCTA } from '@/components/visual/StreamlinedVisualCTA';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: 'Pricing & Plans — Transparent Creator & Brand Workspaces',
  description:
    'Explore AbeyCollab pricing for creators, brands, and agencies. Start free with zero upfront costs, or unlock unlimited briefs, AI matching, and instant 2-hour payouts.',
  keywords: [
    'creator marketplace pricing',
    'influencer platform plans',
    'creator commission rate',
    'brand campaign pricing',
    'razorpay creator escrow fee',
    'free creator media kit',
    'influencer marketing software cost',
  ],
  alternates: { canonical: `${BASE_URL}/pricing` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/pricing`,
    title: 'Pricing & Plans — AbeyCollab Creator Marketplace',
    description:
      'Transparent workspace plans for creators and brands. Zero upfront costs, milestone escrow security, and instant payouts.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AbeyCollab Workspace Pricing & Plans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AbeyCollab Pricing — Free & Pro Creator Workspaces',
    description: 'Start free forever. Upgrade for unlimited campaign applications and instant payouts.',
    images: ['/og-image.png'],
  },
};

const pricingStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How does milestone-protected escrow work on AbeyCollab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'When a brand approves a collaboration proposal, the milestone funds are deposited into secure escrow via Razorpay or Stripe. Funds remain protected in escrow custody until the brand reviews and approves the deliverable, ensuring creators are guaranteed payment for completed work.',
        },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost to get started as a creator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AbeyCollab Creator Starter is 100% free forever ($0/mo). Creators receive a verified public media kit, rate card hosting, and up to 5 brand applications per month. Creator Pro ($29/mo) unlocks unlimited applications, AI pitch drafting, and instant 2-hour payouts.',
        },
      },
      {
        '@type': 'Question',
        name: 'What payment methods are supported on AbeyCollab?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We support Razorpay (Cards, UPI, Netbanking, direct handle @abeycollab), Stripe Connect, PayPal Global, Wise, and international SWIFT wire transfers across 120+ countries and 10 global currencies.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if a brand fails to review a submitted deliverable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AbeyCollab enforces an automated 120-hour (5-day) review SLA watchdog. If a brand takes no action within 120 hours of deliverable submission, the system automatically approves the milestone and releases the funds to the creator.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the platform commission rate on collaborations?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AbeyCollab charges a standard 10% platform fee on funded collaborations. There are zero hidden fees, zero invoice chasing charges, and zero processing penalties.',
        },
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Pricing & Plans',
        item: `${BASE_URL}/pricing`,
      },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AbeyCollab Workspace Platform',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All Modern Browsers',
    offers: [
      {
        '@type': 'Offer',
        name: 'Creator Starter',
        price: '0.00',
        priceCurrency: 'USD',
        description: 'Free forever media kit, rate cards, and 5 monthly brand pitches.',
      },
      {
        '@type': 'Offer',
        name: 'Creator Pro',
        price: '29.00',
        priceCurrency: 'USD',
        description: 'Unlimited campaign briefs, AI pitch generator, and instant 2-hour payouts.',
      },
      {
        '@type': 'Offer',
        name: 'Brand Starter',
        price: '99.00',
        priceCurrency: 'USD',
        description: 'Launch up to 2 simultaneous campaigns with 100% escrow protection.',
      },
      {
        '@type': 'Offer',
        name: 'Brand Growth',
        price: '249.00',
        priceCurrency: 'USD',
        description: 'Unlimited briefs, 4K frame-accurate video review player, and CRM shortlists.',
      },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="bg-[#FAFAFC] text-[#0A0A0E] min-h-screen space-y-12">
      <script
        id="pricing-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingStructuredData) }}
      />
      <h1 className="sr-only">Pricing & Plans — AbeyCollab Creator Commerce Platform</h1>
      <StreamlinedPricing />
      <AnimatedBrandSlider speed={28} direction="left" />
      <CompactFAQ />
      <StreamlinedVisualCTA />
    </div>
  );
}

