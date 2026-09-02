import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/', '/app/'] },
    ],
    sitemap: 'https://collably-ashen.vercel.app/sitemap.xml',
  };
}
