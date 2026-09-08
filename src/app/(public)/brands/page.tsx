import type { Metadata } from 'next';
import React from 'react';
import { BrandsDirectoryClient } from '@/components/brands/BrandsDirectoryClient';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: 'Partner Brands & Enterprise Sponsors',
  description:
    'Discover leading high-growth brands and enterprise sponsors hiring creators on AbeyCollab. Explore active campaigns with guaranteed escrow budgets across D2C, SaaS, and Consumer Tech.',
  keywords: [
    'brand partners',
    'enterprise influencer sponsors',
    'brands hiring creators',
    'sponsor companies',
    'creator sponsorships',
  ],
  alternates: { canonical: `${BASE_URL}/brands` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/brands`,
    title: 'Partner Brands & Sponsors',
    description: 'Explore brands launching milestone-protected campaigns on AbeyCollab.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Partner Brands & Sponsors',
    description: 'Leading brands hiring creators with guaranteed escrow budgets.',
    images: ['/og-image.png'],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Partner Brands on AbeyCollab',
    url: `${BASE_URL}/brands`,
    description: 'Verified brands and enterprise companies sponsoring creator campaigns.',
    provider: {
      '@type': 'Organization',
      name: 'AbeyCollab',
      url: BASE_URL,
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
        name: 'Brands',
        item: `${BASE_URL}/brands`,
      },
    ],
  },
];

export default function BrandsDirectoryPage() {
  return (
    <>
      <script
        id="brands-directory-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BrandsDirectoryClient />
    </>
  );
}
