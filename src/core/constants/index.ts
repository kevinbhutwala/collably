import { CreatorCategory, DeliverableType, PlatformType } from "../types";

export const CATEGORIES: CreatorCategory[] = [
  'Technology & AI',
  'Design & Creative',
  'Fashion & Style',
  'Beauty & Skincare',
  'Fitness & Wellness',
  'Finance & Business',
  'Gaming & Esports',
  'Lifestyle & Travel',
  'Food & Culinary',
  'Education & Science',
];

export const PLATFORMS: { id: PlatformType; name: string; color: string; icon: string }[] = [
  { id: 'instagram', name: 'Instagram', color: '#E1306C', icon: 'Instagram' },
  { id: 'youtube', name: 'YouTube', color: '#FF0000', icon: 'Youtube' },
  { id: 'tiktok', name: 'TikTok', color: '#00F2FE', icon: 'Video' },
  { id: 'x', name: 'X / Twitter', color: '#000000', icon: 'Twitter' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0A66C2', icon: 'Linkedin' },
  { id: 'threads', name: 'Threads', color: '#000000', icon: 'AtSign' },
];

export const DELIVERABLE_TYPES: DeliverableType[] = [
  'Instagram Reel',
  'Instagram Story Set (3x)',
  'Instagram Dedicated Post',
  'YouTube Dedicated Video',
  'YouTube 60s Integration',
  'YouTube Short',
  'TikTok Video',
  'UGC Video Ad',
  'X (Twitter) Thread',
  'Keynote / Event Appearance',
];

export const CREATOR_TIERS = [
  { label: 'Rising (10K - 50K)', value: 'Rising', min: 10000, max: 50000, avgRate: '$400 - $1,500' },
  { label: 'Established (50K - 250K)', value: 'Established', min: 50000, max: 250000, avgRate: '$1,500 - $4,000' },
  { label: 'Elite (250K - 1M)', value: 'Elite', min: 250000, max: 1000000, avgRate: '$4,000 - $15,000' },
  { label: 'Premium (1M+)', value: 'Premium', min: 1000000, max: 100000000, avgRate: '$15,000+' },
];
