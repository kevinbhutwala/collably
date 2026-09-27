import type { Metadata } from 'next';

import { SITE_URL, absoluteUrl } from '@/lib/seo';
const BASE_URL = SITE_URL;

export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Reset your AbeyCollab account password securely.',
  alternates: { canonical: `${BASE_URL}/forgot-password` },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
