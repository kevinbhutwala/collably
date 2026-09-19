import type { Metadata } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: 'Brand Registration & Campaign Workspace Onboarding',
  description:
    'Create your brand workspace on AbeyCollab. Launch targeted creator briefs, review 4K video cuts with timecoded comments, and safeguard marketing budgets with 100% milestone escrow.',
  alternates: { canonical: `${BASE_URL}/brand/register` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/brand/register`,
    title: 'Brand Registration & Workspace Onboarding | AbeyCollab',
    description: 'Post creator briefs, review video drafts with frame-accurate notes, and release escrow upon sign-off.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Registration | AbeyCollab',
    description: 'Launch creator sponsorship briefs with 100% milestone escrow guarantee.',
    images: ['/og-image.png'],
  },
};

export default function BrandRegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
