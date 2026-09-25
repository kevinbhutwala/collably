import type { Metadata } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.com';

export const metadata: Metadata = {
  title: 'Create Your Account — Join as Creator or Brand',
  description:
    'Join AbeyCollab. Creators get a free media kit and guaranteed on-time payments. Brands discover top video creators and pay only when satisfied.',
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
