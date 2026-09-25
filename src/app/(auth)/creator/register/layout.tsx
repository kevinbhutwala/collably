import type { Metadata } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.com';

export const metadata: Metadata = {
  title: 'Creator Registration & Media Kit Onboarding',
  description:
    'Sign up as a verified creator on AbeyCollab. Build your 4K media kit, set transparent rate cards, link your YouTube & Instagram channels, and get paid within 24 hours with 100% escrow protection.',
  alternates: { canonical: `${BASE_URL}/creator/register` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/creator/register`,
    title: 'Creator Registration & Media Kit Onboarding | AbeyCollab',
    description: 'Set your rate cards, connect social channels, and pitch pre-funded brand briefs with zero invoice chasing.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Creator Registration | AbeyCollab',
    description: 'Build your media kit, publish rate cards, and get paid with guaranteed milestone escrow.',
    images: ['/og-image.png'],
  },
};

export default function CreatorRegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
