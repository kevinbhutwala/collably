import type { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';
import { campaignRepo } from '@/server/repositories/campaign.repo';

const BASE_URL = 'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: 'Explore Brand Campaigns & Paid Creator Briefs',
  description:
    'Browse paid sponsorship briefs and brand campaigns with guaranteed escrow deposits. Filter by budget, niche, platform deliverables, and apply directly with your verified rate card.',
  keywords: [
    'paid creator briefs',
    'brand sponsorship campaigns',
    'influencer job board',
    'sponsored content briefs',
    'youtube sponsorship opportunities',
    'tiktok paid campaigns',
    'creator collaboration briefs',
  ],
  alternates: { canonical: `${BASE_URL}/campaigns` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/campaigns`,
    title: 'Explore Paid Brand Campaigns — AbeyCollab',
    description:
      'Browse active brand briefs with milestone-protected budgets and guaranteed creator payouts.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Explore Brand Campaigns on AbeyCollab',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Explore Paid Brand Campaigns | AbeyCollab',
    description: 'Find paid sponsorships with guaranteed escrow funding.',
    images: ['/og-image.png'],
  },
};

export default function CampaignsLayout({ children }: { children: React.ReactNode }) {
  let sampleCampaigns: { id: string; title: string; category: string }[] = [];
  try {
    const all = campaignRepo.getAll();
    sampleCampaigns = (all || []).slice(0, 10).map((c) => ({
      id: c.id,
      title: c.title,
      category: c.category,
    }));
  } catch (e) {}

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Explore Brand Campaigns & Creator Briefs',
      description: 'Active paid brand briefs with milestone-protected budgets.',
      url: `${BASE_URL}/campaigns`,
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: sampleCampaigns.map((c, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${BASE_URL}/campaigns/${c.id}`,
          name: c.title,
          description: `Category: ${c.category}`,
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
          name: 'Campaigns',
          item: `${BASE_URL}/campaigns`,
        },
      ],
    },
  ];

  return (
    <>
      <Script
        id="campaigns-directory-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

