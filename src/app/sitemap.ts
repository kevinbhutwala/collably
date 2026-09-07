import { MetadataRoute } from 'next';
import { creatorRepo } from '@/server/repositories/creator.repo';
import { campaignRepo } from '@/server/repositories/campaign.repo';

const BASE = 'https://abeycollab.vercel.app';
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  // Static Core Marketing & Platform Pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${BASE}/creators`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE}/campaigns`, lastModified: now, changeFrequency: 'daily', priority: 0.95 },
    { url: `${BASE}/for-brands`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/pricing`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/case-studies`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${BASE}/brands`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/creator/register`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/brand/register`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${BASE}/login`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/terms`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/refund-policy`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${BASE}/dpa`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
  ];

  // Dynamic Creator Profile Pages
  let creatorPages: MetadataRoute.Sitemap = [];
  try {
    const creators = creatorRepo.getAll();
    creatorPages = (creators || []).map((creator) => ({
      url: `${BASE}/creators/${creator.id}`,
      lastModified: creator.updatedAt ? new Date(creator.updatedAt) : now,
      changeFrequency: 'daily',
      priority: 0.85,
    }));
  } catch (e) {
    console.error('Error generating creator sitemap entries:', e);
  }

  // Dynamic Campaign Brief Pages
  let campaignPages: MetadataRoute.Sitemap = [];
  try {
    const campaigns = campaignRepo.getAll();
    campaignPages = (campaigns || []).map((campaign) => ({
      url: `${BASE}/campaigns/${campaign.id}`,
      lastModified: campaign.updatedAt ? new Date(campaign.updatedAt) : now,
      changeFrequency: 'daily',
      priority: 0.85,
    }));
  } catch (e) {
    console.error('Error generating campaign sitemap entries:', e);
  }

  return [...staticPages, ...creatorPages, ...campaignPages];
}

