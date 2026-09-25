import { MetadataRoute } from 'next';

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.com';

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
        userAgent: ['Googlebot', 'Bingbot', 'Applebot', 'DuckDuckBot', 'YandexBot', 'Baiduspider'],
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/app/',
          '/auth/',
          '/_next/',
        ],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Google-Extended',
          'CCBot',
          'Bytespider',
        ],
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
          '/terms',
          '/privacy',
          '/refund-policy',
          '/dpa',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/app/',
          '/auth/',
          '/_next/',
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
