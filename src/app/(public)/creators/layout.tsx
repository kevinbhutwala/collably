import type { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';
import { creatorRepo } from '@/server/repositories/creator.repo';

const BASE_URL = 'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: 'Discover Creators — Find & Hire Verified Influencers',
  description:
    'Search and filter verified content creators across Tech, Fitness, Fashion, Gaming, Finance, and Lifestyle. View real engagement metrics, verified rate cards, and book milestone-protected collaborations.',
  keywords: [
    'find content creators',
    'hire influencers',
    'creator directory',
    'tech influencers',
    'ugc creator marketplace',
    'verified creator rate card',
    'instagram influencer search',
    'youtube sponsorship directory',
  ],
  alternates: { canonical: `${BASE_URL}/creators` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/creators`,
    title: 'Discover Verified Creators — AbeyCollab Talent Marketplace',
    description:
      'Search top-performing creators with audited engagement rates, transparent pricing, and escrow payment protection.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Discover Content Creators on AbeyCollab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discover & Hire Verified Creators | AbeyCollab',
    description: 'Browse top talent with verified rates and guaranteed escrow protection.',
    images: ['/og-image.png'],
  },
};

export default function CreatorsLayout({ children }: { children: React.ReactNode }) {
  let sampleCreators: { id: string; fullName: string; headline: string }[] = [];
  try {
    const all = creatorRepo.getAll();
    sampleCreators = (all || []).slice(0, 10).map((c) => ({
      id: c.id,
      fullName: c.fullName,
      headline: c.headline,
    }));
  } catch (e) {}

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Discover Content Creators',
      description: 'Vetted creator talent across technology, lifestyle, gaming, and business niches.',
      url: `${BASE_URL}/creators`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: sampleCreators.map((c, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${BASE_URL}/creators/${c.id}`,
          name: c.fullName,
          description: c.headline,
        })),
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
          name: 'Creators',
          item: `${BASE_URL}/creators`,
        },
      ],
    },
  ];

  return (
    <>
      <Script
        id="creators-directory-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

