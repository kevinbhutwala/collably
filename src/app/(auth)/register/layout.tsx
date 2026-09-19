import type { Metadata } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: 'Create Your Account — Join as Creator or Brand',
  description:
    'Join AbeyCollab. Creators get free media kit hosting and milestone escrow security. Brands hire audited video creators with guaranteed payouts.',
  alternates: { canonical: `${BASE_URL}/register` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/register`,
    title: 'Create Your Account — Join AbeyCollab',
    description: 'Get started free on AbeyCollab as a verified creator or sponsoring brand.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Your Account — AbeyCollab',
    description: 'Join the premier creator commerce marketplace with 100% escrow protection.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
