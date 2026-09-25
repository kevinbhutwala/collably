import type { Metadata } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.com';

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
