import type { Metadata } from 'next';
import React from 'react';
import { ContactClient } from '@/components/landing/ContactClient';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: 'Contact Partnerships & Support',
  description:
    'Contact the AbeyCollab brand strategy and talent partnership team. Inquire about managed creator cohorts, enterprise rate negotiations, or platform escrow support.',
  keywords: [
    'contact AbeyCollab',
    'creator partnerships inquiry',
    'influencer marketing agency contact',
    'brand sponsorship support',
  ],
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/contact`,
    title: 'Contact Partnerships & Support',
    description:
      'Reach out to our talent and brand partnership directors. 4-hour response SLA.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Partnerships & Support',
    description:
      'Reach out to our talent and brand partnership directors. 4-hour response SLA.',
    images: ['/og-image.png'],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact AbeyCollab',
    url: `${BASE_URL}/contact`,
    description: 'Partnership and talent support contact page for AbeyCollab.',
    mainEntity: {
      '@type': 'Organization',
      name: 'AbeyCollab',
      url: BASE_URL,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer & Talent Support',
        email: 'partnerships@abeycollab.com',
        availableLanguage: ['English'],
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
        name: 'Contact',
        item: `${BASE_URL}/contact`,
      },
    ],
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        id="contact-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactClient />
    </>
  );
}
