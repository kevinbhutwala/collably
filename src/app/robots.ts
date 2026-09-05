import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/', '/app/'] },
    ],
    sitemap: 'https://abeycollab.vercel.app/sitemap.xml',
  };
}
