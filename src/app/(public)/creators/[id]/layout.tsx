import type { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';
import { creatorRepo } from '@/server/repositories/creator.repo';

interface Props {
  children: React.ReactNode;
  params: { id: string };
}

const BASE_URL = 'https://abeycollab.vercel.app';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const creator = creatorRepo.getById(params.id);

  if (!creator) {
    return {
      title: 'Creator Profile | AbeyCollab',
      description: 'Explore verified creator profiles, media kits, and engagement rates on AbeyCollab.',
    };
  }

  const title = `${creator.fullName} (@${creator.handle}) — ${creator.primaryCategory} Creator Media Kit`;
  const description = `${creator.headline} — Verified ${creator.primaryCategory} creator with ${creator.totalFollowers?.toLocaleString() || '10,000+'} followers, ${creator.avgEngagementRate || 4.5}% engagement rate, and ${creator.completedCampaignsCount || 12} completed collaborations on AbeyCollab.`;

  return {
    title,
    description,
    keywords: [
      creator.fullName,
      creator.handle,
      `${creator.primaryCategory} creator`,
      `${creator.primaryCategory} influencer`,
      `hire ${creator.fullName}`,
      `sponsor ${creator.handle}`,
      'creator rate card',
      'verified media kit',
      'creator escrow collaboration',
    ],
    alternates: {
      canonical: `${BASE_URL}/creators/${params.id}`,
    },
    openGraph: {
      type: 'profile',
      url: `${BASE_URL}/creators/${params.id}`,
      title,
      description,
      images: [
        {
          url: creator.avatarUrl || '/og-image.png',
          width: 800,
          height: 800,
          alt: `${creator.fullName} — Verified Creator on AbeyCollab`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [creator.avatarUrl || '/og-image.png'],
      creator: `@${creator.handle}`,
    },
  };
}

export default function CreatorProfileLayout({ children, params }: Props) {
  const creator = creatorRepo.getById(params.id);

  const jsonLd = creator
    ? [
        {
          '@context': 'https://schema.org',
          '@type': ['Person', 'ProfilePage'],
          name: creator.fullName,
          alternateName: `@${creator.handle}`,
          jobTitle: creator.headline,
          description: creator.bio,
          image: creator.avatarUrl,
          url: `${BASE_URL}/creators/${creator.id}`,
          sameAs: creator.socialAccounts?.map((s) => s.url).filter(Boolean) || [],
          interactionStatistic: [
            {
              '@type': 'InteractionCounter',
              interactionType: 'https://schema.org/FollowAction',
              userInteractionCount: creator.totalFollowers || 10000,
            },
          ],
          offers: {
            '@type': 'Offer',
            price: (creator.startingPrice || 500).toString(),
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            validFrom: '2024-01-01',
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
            {
              '@type': 'ListItem',
              position: 3,
              name: creator.fullName,
              item: `${BASE_URL}/creators/${creator.id}`,
            },
          ],
        },
      ]
    : null;

  return (
    <>
      {jsonLd && (
        <Script
          id={`creator-schema-${params.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
