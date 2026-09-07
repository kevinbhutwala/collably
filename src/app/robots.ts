import { MetadataRoute } from 'next';

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
        userAgent: ['GPTBot', 'PerplexityBot', 'ClaudeBot'],
        allow: [
          '/',
          '/creators',
          '/campaigns',
          '/pricing',
          '/for-brands',
          '/case-studies',
          '/services',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/app/',
          '/auth/',
        ],
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://abeycollab.vercel.app'}/sitemap.xml`,
    host: process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://abeycollab.vercel.app',
  };
}

