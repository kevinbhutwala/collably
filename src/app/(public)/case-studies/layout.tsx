import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'Real results from brands and creators who used AbeyCollab to run milestone-protected influencer campaigns.',
  alternates: { canonical: 'https://abeycollab.vercel.app/case-studies' },
  openGraph: { title: 'Case Studies | AbeyCollab', description: 'Real results from brands and creators on AbeyCollab.' },
};

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
