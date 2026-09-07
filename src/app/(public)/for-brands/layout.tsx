import type { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';

const BASE_URL = 'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: 'Influencer Marketing Platform for High-Growth Brands',
  description:
    'Discover vetted creators, review 4K deliverables with timestamped precision, and safeguard campaign budgets with milestone escrow. Zero invoice chasing, guaranteed delivery.',
  keywords: [
    'influencer marketing platform for brands',
    'hire content creators',
    'ugc creator agency',
    'brand creator escrow',
    'influencer marketing software',
    'youtube sponsorships for brands',
    'tiktok brand campaigns',
    'creator crm pipeline',
  ],
  alternates: { canonical: `${BASE_URL}/for-brands` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/for-brands`,
    title: 'Influencer Marketing Platform for Brands | AbeyCollab',
    description:
      'Scale your brand with milestone-protected creator campaigns, verified engagement metrics, and instant deliverable approvals.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AbeyCollab for Brands & Agencies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AbeyCollab for Brands & Agencies',
    description: 'Scale creator partnerships with guaranteed delivery and escrow protection.',
    images: ['/og-image.png'],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Influencer Marketing & Creator Campaign Management',
    provider: {
      '@type': 'Organization',
      name: 'AbeyCollab',
      url: BASE_URL,
    },
    description:
      'Full-stack creator marketplace enabling brands to discover talent, launch milestone-protected briefs, and approve video deliverables.',
    areaServed: 'Worldwide',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Brand Campaign Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Creator Discovery & CRM',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Milestone Escrow Payment Custody',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: '4K Video QA & Review Studio',
          },
        },
      ],
    },
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
        name: 'For Brands',
        item: `${BASE_URL}/for-brands`,
      },
    ],
  },
];

export default function ForBrandsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="for-brands-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
