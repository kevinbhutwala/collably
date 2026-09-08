import { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/app/',
          '/auth/',
          '/_next/',
          '/dashboard/',
        ],
      },
      {
        userAgent: ['Googlebot', 'Bingbot', 'Applebot'],
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/app/',
          '/auth/',
        ],
      },
      {
        userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot', 'Google-Extended'],
        allow: [
          '/',
          '/creators',
          '/creators/*',
          '/campaigns',
          '/campaigns/*',
          '/pricing',
          '/for-brands',
          '/case-studies',
          '/services',
          '/brands',
          '/about',
          '/contact',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/app/',
          '/auth/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
