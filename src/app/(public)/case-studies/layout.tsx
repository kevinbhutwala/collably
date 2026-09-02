import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Real results from brands and creators who used Collably to run milestone-protected influencer campaigns.',
  alternates: { canonical: 'https://collably-ashen.vercel.app/case-studies' },
  openGraph: { title: 'Case Studies | Collably', description: 'Real results from brands and creators on Collably.' },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
