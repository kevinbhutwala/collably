import type { Metadata } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  title: 'Sign In to Your Workspace',
  description:
    'Sign in to your AbeyCollab creator or brand account. View your projects, chat with partners, and manage payments.',
  alternates: { canonical: `${BASE_URL}/login` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/login`,
    title: 'Sign In to Your Workspace | AbeyCollab',
    description: 'Sign in to your AbeyCollab account to view your campaigns, messages, and secure payments.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign In | AbeyCollab',
    description: 'Sign in to access your creator media kit or brand sponsorship brief.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
