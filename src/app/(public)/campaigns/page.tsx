import type { Metadata } from 'next';
import React from 'react';
import { campaignRepo } from '@/server/repositories/campaign.repo';
import { CampaignsDirectoryClient } from '@/components/campaigns/CampaignsDirectoryClient';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: 'Active Creator Campaigns & Brand Briefs — Milestone Escrow Deals',
  description:
    'Discover pre-funded brand briefs and creator sponsorship opportunities. Pitch custom angles to verified brands and earn guaranteed milestone payouts in segregated escrow custody.',
  keywords: [
    'creator campaigns',
    'brand briefs',
    'influencer sponsorship opportunities',
    'find brand deals',
    'ugc creator jobs',
    'youtube sponsorships',
    'tiktok campaign briefs',
    'milestone escrow sponsorships',
  ],
  alternates: { canonical: `${BASE_URL}/campaigns` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/campaigns`,
    title: 'Active Creator Campaigns & Brand Briefs | AbeyCollab',
    description:
      'Pitch creative concepts to top brands funding pre-allocated escrow campaigns. Guaranteed payouts on delivery.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Active Creator Campaigns & Brand Briefs | AbeyCollab',
    description:
      'Discover active production briefs from premier verified brands. Guaranteed milestone escrow payouts.',
    images: ['/og-image.png'],
  },
};

export default function CampaignsDirectoryPage() {
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
      name: 'Active Creator Campaigns & Brand Briefs',
      url: `${BASE_URL}/campaigns`,
      description: 'Pre-funded brand briefs and sponsorship opportunities for video creators.',
      provider: {
        '@type': 'Organization',
        name: 'AbeyCollab',
        url: BASE_URL,
      },
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
      <script
        id="campaigns-directory-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CampaignsDirectoryClient />
    </>
  );
}
