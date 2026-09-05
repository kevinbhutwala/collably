import { MetadataRoute } from 'next';

const BASE = 'https://abeycollab.vercel.app';
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/creators`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/campaigns`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE}/brands`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/case-studies`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/for-brands`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/login`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/creator/register`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/brand/register`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
