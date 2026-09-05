import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Partners',
  description: 'Discover the brands running campaigns on AbeyCollab. From D2C startups to high-growth SaaS.',
  alternates: { canonical: 'https://abeycollab.vercel.app/brands' },
};

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
