import { Metadata } from 'next';
import React from 'react';
import { creatorRepo } from '@/server/repositories/creator.repo';
import { CreatorDetailClient } from '@/components/creators/CreatorDetailClient';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.vercel.app';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const creator = creatorRepo.getById(params.id);

  if (!creator) {
    return {
      title: 'Creator Profile',
      description: 'View verified creator media kit, rate cards, and audience analytics on AbeyCollab.',
    };
  }

  const title = `${creator.fullName} (@${creator.handle}) — ${creator.primaryCategory} Creator Media Kit`;
  const description = `${creator.bio || creator.headline} • ${(creator.totalFollowers || 0).toLocaleString()} verified followers. Starting from $${creator.startingPrice}. Hire with 100% milestone escrow protection on AbeyCollab.`;
  const canonicalUrl = `${BASE_URL}/creators/${creator.id}`;

  return {
    title,
    description,
    keywords: [
      creator.fullName,
      creator.handle,
      `${creator.primaryCategory} influencer`,
      'creator rate card',
      'hire content creator',
      'verified creator media kit',
      ...creator.socialAccounts.map((s) => `${s.platform} ${creator.fullName}`),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'profile',
      url: canonicalUrl,
      title,
      description,
      images: [
        {
          url: creator.avatarUrl || '/og-image.png',
          width: 800,
          height: 800,
          alt: `${creator.fullName} — Verified Creator Profile`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [creator.avatarUrl || '/og-image.png'],
    },
  };
}

export default function CreatorDetailPage({ params }: Props) {
  const creator = creatorRepo.getById(params.id);
  const socialLinks = creator?.socialAccounts?.map((s) => s.url).filter(Boolean) || [];

  const jsonLd = creator
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url: `${BASE_URL}/creators/${creator.id}`,
          mainEntity: {
            '@type': 'Person',
            name: creator.fullName,
            alternateName: `@${creator.handle}`,
            jobTitle: creator.headline || `${creator.primaryCategory} Creator`,
            description: creator.bio,
            image: creator.avatarUrl,
            sameAs: socialLinks,
            interactionStatistic: {
              '@type': 'InteractionCounter',
              interactionType: 'https://schema.org/FollowAction',
              userInteractionCount: creator.totalFollowers || 0,
            },
            offers: {
              '@type': 'Offer',
              price: (creator.startingPrice || 500).toString(),
              priceCurrency: 'USD',
              availability: 'https://schema.org/InStock',
              validFrom: '2024-01-01',
            },
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
        <script
          id={`creator-schema-${params.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <CreatorDetailClient creatorId={params.id} initialCreator={creator || null} />
    </>
  );
}
