import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Explore Campaigns',
  description: 'Browse open brand briefs with milestone-protected budgets. Apply as a creator and get paid when your work is approved.',
  alternates: { canonical: 'https://collably-ashen.vercel.app/campaigns' },
  openGraph: { title: 'Explore Campaigns | Collably', description: 'Browse open brand briefs with milestone-protected budgets.' },
};

export default function CampaignsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
