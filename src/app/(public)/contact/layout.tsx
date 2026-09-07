import type { Metadata } from 'next';
import React from 'react';
import Script from 'next/script';

const BASE_URL = 'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: 'Contact Talent & Brand Partnerships | AbeyCollab',
  description:
    'Get in touch with AbeyCollab partnership directors. Whether you are scaling influencer campaigns or looking for exclusive talent representation, our team responds within 4 hours.',
  keywords: [
    'contact AbeyCollab',
    'influencer agency contact',
    'brand partnerships inquiry',
    'creator talent management contact',
    'collaborations support',
  ],
  alternates: { canonical: `${BASE_URL}/contact` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/contact`,
    title: 'Contact AbeyCollab — Talent & Brand Partnerships',
    description: 'Inbound brand and creator partnership inquiries answered within 4 hours.',
    images: ['/og-image.png'],
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact AbeyCollab',
    description: 'Direct contact point for brand and creator partnership inquiries.',
    url: `${BASE_URL}/contact`,
    mainEntity: {
      '@type': 'Organization',
      name: 'AbeyCollab',
      url: BASE_URL,
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Brand Partnerships & Talent Operations',
        email: 'support@abeycollab.com',
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

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script
        id="contact-page-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
