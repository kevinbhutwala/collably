import type { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';
import { campaignRepo } from '@/server/repositories/campaign.repo';

interface Props {
  children: React.ReactNode;
  params: { id: string };
}

const BASE_URL = 'https://abeycollab.vercel.app';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const campaign = campaignRepo.getById(params.id);

  if (!campaign) {
    return {
      title: 'Campaign Brief | AbeyCollab',
      description: 'Explore paid brand campaign briefs and sponsorship opportunities on AbeyCollab.',
    };
  }

  const title = `${campaign.title} ($${campaign.budget.perCreatorBudget.toLocaleString()}) by ${campaign.brand.companyName}`;
  const description = `Apply for ${campaign.title}. Budget: $${campaign.budget.perCreatorBudget.toLocaleString()} per creator with milestone escrow protection. Seeking creators in ${campaign.category}. Deliverables: ${campaign.deliverables.map((d) => d.type).join(', ')}.`;

  return {
    title,
    description,
    keywords: [
      campaign.title,
      campaign.brand.companyName,
      `${campaign.category} campaign`,
      'paid creator brief',
      'brand sponsorship opportunity',
      'creator collaboration job',
      'escrow protected brand deal',
    ],
    alternates: {
      canonical: `${BASE_URL}/campaigns/${params.id}`,
    },
    openGraph: {
      type: 'article',
      url: `${BASE_URL}/campaigns/${params.id}`,
      title,
      description,
      images: [
        {
          url: campaign.coverImage || campaign.brand.logoUrl || '/og-image.png',
          width: 1200,
          height: 630,
          alt: `${campaign.title} by ${campaign.brand.companyName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [campaign.coverImage || campaign.brand.logoUrl || '/og-image.png'],
    },
  };
}

export default function CampaignDetailLayout({ children, params }: Props) {
  const campaign = campaignRepo.getById(params.id);

  const jsonLd = campaign
    ? [
        {
          '@context': 'https://schema.org',
          '@type': 'JobPosting',
          title: campaign.title,
          description: campaign.description,
          datePosted: campaign.createdAt || new Date().toISOString(),
          validThrough: campaign.timeline.applicationDeadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          employmentType: 'CONTRACTOR',
          hiringOrganization: {
            '@type': 'Organization',
            name: campaign.brand.companyName,
            logo: campaign.brand.logoUrl,
          },
          baseSalary: {
            '@type': 'MonetaryAmount',
            currency: 'USD',
            value: {
              '@type': 'QuantitativeValue',
              value: campaign.budget.perCreatorBudget,
              unitText: 'PROJECT',
            },
          },
          jobLocationType: 'TELECOMMUTE',
          applicantLocationRequirements: {
            '@type': 'Country',
            name: 'Worldwide',
          },
          directApply: true,
          url: `${BASE_URL}/campaigns/${campaign.id}`,
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
      {jsonLd && (
        <Script
          id={`campaign-schema-${params.id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
