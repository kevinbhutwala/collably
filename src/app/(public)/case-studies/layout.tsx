import type { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';

const BASE_URL = 'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: 'Influencer Marketing Case Studies & Brand Results',
  description:
    'Discover how leading direct-to-consumer and B2B brands achieve 4.2x ROAS and 85% lower acquisition costs using AbeyCollab milestone-protected creator campaigns.',
  keywords: [
    'influencer marketing case studies',
    'creator campaign results',
    'ugc brand ROI',
    'creator sponsorship success stories',
    'influencer marketing benchmarks',
  ],
  alternates: { canonical: `${BASE_URL}/case-studies` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/case-studies`,
    title: 'Influencer Marketing Case Studies | AbeyCollab',
    description: 'Audited case studies and ROAS benchmarks from brands using AbeyCollab.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AbeyCollab Influencer Marketing Case Studies',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creator Marketing Case Studies | AbeyCollab',
    description: 'Real ROAS metrics and verified results from top creator campaigns.',
    images: ['/og-image.png'],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Influencer Marketing Case Studies',
    description: 'Audited performance case studies from brands and creators.',
    url: `${BASE_URL}/case-studies`,
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

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="case-studies-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

