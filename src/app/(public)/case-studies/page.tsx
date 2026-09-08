import type { Metadata } from 'next';
import React from 'react';
import { CaseStudiesClient } from '@/components/landing/CaseStudiesClient';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: 'Creator Campaign Case Studies & Brand ROI Results',
  description:
    'Discover how high-growth tech brands and consumer apps achieved 4.8x average ROAS, millions of organic impressions, and sub-$0.02 CPV using AbeyCollab milestone-protected creator campaigns.',
  keywords: [
    'creator marketing case studies',
    'influencer campaign roi',
    'brand creator results',
    'ugc video roas',
    'developer tool influencer marketing',
    'saas creator campaigns',
  ],
  alternates: { canonical: `${BASE_URL}/case-studies` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/case-studies`,
    title: 'Creator Campaign Case Studies & Brand ROI Results',
    description:
      'Verified performance metrics from top brands. 4.8x average ROAS and millions of impressions delivered with zero invoice chasing.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creator Marketing Case Studies',
    description:
      'Explore verified performance metrics, ROAS, and video creative from top creator campaigns.',
    images: ['/og-image.png'],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Creator Campaign Case Studies & Brand ROI Results',
    url: `${BASE_URL}/case-studies`,
    description: 'Audited performance results, impressions, and ROAS from brand creator collaborations.',
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
        name: 'Case Studies',
        item: `${BASE_URL}/case-studies`,
      },
    ],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <script
        id="case-studies-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudiesClient />
    </>
  );
}
