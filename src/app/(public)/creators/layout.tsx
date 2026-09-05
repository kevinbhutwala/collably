import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Discover Creators',
  description: 'Browse verified creators across tech, lifestyle, fashion and more. Filter by platform, audience size, and engagement rate.',
  alternates: { canonical: 'https://abeycollab.vercel.app/creators' },
  openGraph: { title: 'Discover Creators | AbeyCollab', description: 'Browse verified creators across tech, lifestyle, fashion and more.' },
};

export default function CreatorsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
