import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Brand Partners',
  description: 'Discover the brands running campaigns on Collably. From D2C startups to high-growth SaaS.',
  alternates: { canonical: 'https://collably-ashen.vercel.app/brands' },
};

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
