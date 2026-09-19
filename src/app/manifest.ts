import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'AbeyCollab — Creator Commerce Platform',
    short_name: 'AbeyCollab',
    description:
      'Premier creator commerce platform with milestone-protected escrow campaigns, transparent rate cards, 4K video review studio, and instant payouts.',
    start_url: '/',
    display: 'standalone',
    background_color: '#07070B',
    theme_color: '#FFD21F',
    icons: [
      {
        src: '/favicon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
      {
        src: '/favicon.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/branding/abeycollab-icon-128.png',
        sizes: '128x128',
        type: 'image/png',
      },
    ],
  };
}
