import { Metadata } from 'next';
import React from 'react';
import { campaignRepo } from '@/server/repositories/campaign.repo';
import { CampaignDetailClient } from '@/components/campaigns/CampaignDetailClient';
import { formatCurrency } from '@/core/utils/currency';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.vercel.app';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const campaign = campaignRepo.getById(params.id);

  if (!campaign) {
    return {
      title: 'Campaign Brief',
      description: 'View creator sponsorship brief and milestone escrow details on AbeyCollab.',
    };
  }

  const campaignCurrency = (campaign.budget?.currency || 'USD') as any;
  const budgetFormatted = formatCurrency(campaign.budget?.perCreatorBudget || 0, campaignCurrency);
  const title = `${campaign.title} (${budgetFormatted}) — Creator Campaign Brief`;
  const description = `${campaign.tagline || campaign.description?.slice(0, 150)} • Sponsored by ${campaign.brand?.companyName}. Apply with creative pitch. 100% pre-funded milestone escrow on AbeyCollab.`;
  const canonicalUrl = `${BASE_URL}/campaigns/${campaign.id}`;

  return {
    title,
    description,
    keywords: [
      campaign.title,
      campaign.category,
      campaign.brand?.companyName,
      'creator sponsorship brief',
      'brand deal application',
      'ugc creator campaign',
      'influencer brief',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title,
      description,
      images: [
        {
          url: campaign.coverImage || '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${campaign.title} — Campaign Brief`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [campaign.coverImage || '/og-image.png'],
    },
  };
}

export default function CampaignDetailPage({ params }: Props) {
  const campaign = campaignRepo.getById(params.id);

  const briefJsonLd = campaign
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'JobPosting',
          title: campaign.title,
          description: campaign.description || campaign.tagline,
          datePosted: campaign.timeline?.startDate || new Date().toISOString(),
          validThrough: campaign.timeline?.applicationDeadline || campaign.timeline?.campaignEndDate,
          employmentType: 'CONTRACTOR',
          hiringOrganization: {
            '@type': 'Organization',
            name: campaign.brand?.companyName || 'AbeyCollab Brand Partner',
            sameAs: BASE_URL,
            logo: campaign.brand?.logoUrl,
          },
          baseSalary: {
            '@type': 'MonetaryAmount',
            currency: campaign.budget?.currency || 'USD',
            value: {
              '@type': 'QuantitativeValue',
              value: campaign.budget?.perCreatorBudget || campaign.budget?.totalBudget || 0,
              unitText: 'PROJECT',
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
              name: 'Campaigns',
              item: `${BASE_URL}/campaigns`,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: campaign.title,
              item: `${BASE_URL}/campaigns/${campaign.id}`,
            },
          ],
        },
      ]
    : null;

  return (
    <>
      {briefJsonLd && (
        <script
          id={`campaign-schema-${params.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(briefJsonLd) }}
        />
      )}
      <CampaignDetailClient campaignId={params.id} initialCampaign={campaign || null} />
    </>
  );
}
