import type { Metadata } from 'next';
import React from 'react';
import { creatorRepo } from '@/server/repositories/creator.repo';
import { CreatorsDirectoryClient } from '@/components/creators/CreatorsDirectoryClient';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: 'Verified Creator Talent Directory — Hire Elite Influencers & UGC Talent',
  description:
    'Browse audited video creators, tech influencers, UGC creators, and vloggers. Verified audience demographics, transparent rate cards, 4K production reels, and 100% escrow protection.',
  keywords: [
    'hire influencers',
    'creator directory',
    'verified content creators',
    'ugc creators marketplace',
    'find youtube influencers',
    'instagram creator rates',
    'tiktok sponsorship talent',
    'creator media kit',
  ],
  alternates: { canonical: `${BASE_URL}/creators` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/creators`,
    title: 'Verified Creator Talent Directory | AbeyCollab',
    description:
      'Browse audited video creators, transparent rate cards, and verified audience demographics. Book top creators with guaranteed escrow protection.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Verified Creator Talent Directory | AbeyCollab',
    description:
      'Direct access to audited video creators, transparent rate cards, and instant booking.',
    images: ['/og-image.png'],
  },
};

export default function CreatorsDirectoryPage() {
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
      name: 'Verified Creator Talent Directory',
      description: 'Audited directory of verified video creators, influencers, and UGC artists.',
      url: `${BASE_URL}/creators`,
      provider: {
        '@type': 'Organization',
        name: 'AbeyCollab',
        url: BASE_URL,
      },
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
      <script
        id="creators-directory-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CreatorsDirectoryClient />
    </>
  );
}
