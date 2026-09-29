/**
 * Canonical SEO Configuration for AbeyCollab
 * Official Domain: https://www.abeycollab.com
 */

export const SITE_URL = 'https://www.abeycollab.com';
export const SITE_NAME = 'AbeyCollab';
export const SITE_ALTERNATE_NAMES = [
  'Abey Collab',
  'abeycollab',
  'abeycollab.com',
  'AbeyCollab Marketplace',
  'AbeyCollab Creator Commerce',
];

export const DEFAULT_TITLE = 'AbeyCollab — Creator Marketplace & Brand Collaboration Platform';
export const TITLE_TEMPLATE = '%s | AbeyCollab';

export const DEFAULT_DESCRIPTION =
  'AbeyCollab is the official creator commerce platform connecting brands with verified content creators through milestone escrow protection, transparent rate cards, Meta Auto-DMs, and guaranteed 24-hour payouts.';

export const SEO_KEYWORDS = [
  // Exact Brand Keywords
  'AbeyCollab',
  'abeycollab',
  'Abey Collab',
  'abeycollab.com',
  'www.abeycollab.com',
  'AbeyCollab Marketplace',
  'AbeyCollab Creator Platform',
  'AbeyCollab Brand Collab',
  'AbeyCollab Escrow',
  'AbeyCollab Influencer',
  
  // High-Intent Industry Keywords
  'creator marketplace',
  'influencer marketing platform',
  'brand creator collaboration',
  'hire content creators',
  'find influencers India',
  'milestone escrow payments',
  'razorpay creator payments',
  'verified creator media kit',
  'ugc creator marketplace',
  'youtube sponsorships',
  'instagram brand deals',
  'tiktok creator briefs',
  'creator economy software',
  'influencer campaign management',
  'influencer escrow platform',
  'safe creator payouts',
  'auto dm creator tools',
];

/**
 * Returns absolute canonical URL for any path
 */
export function absoluteUrl(path: string = ''): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (cleanPath === '/') return SITE_URL;
  return `${SITE_URL}${cleanPath}`;
}

/**
 * Comprehensive Schema.org JSON-LD Structured Data
 */
export const globalStructuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AbeyCollab',
    alternateName: SITE_ALTERNATE_NAMES,
    legalName: 'AbeyCollab Media Inc.',
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/logo.jpg`,
      width: '1024',
      height: '576',
      caption: 'AbeyCollab Official Logo',
    },
    image: `${SITE_URL}/logo.jpg`,
    description: DEFAULT_DESCRIPTION,
    foundingDate: '2024',
    sameAs: [
      'https://twitter.com/abeycollab',
      'https://instagram.com/abeycollab',
      'https://linkedin.com/company/abeycollab',
      'https://youtube.com/@abeycollab',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer & Creator Support',
      email: 'support@abeycollab.com',
      availableLanguage: ['English', 'Hindi'],
    },
    paymentAccepted: ['Razorpay', 'Credit Card', 'Debit Card', 'UPI', 'Netbanking', 'Stripe'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AbeyCollab',
    alternateName: 'Abey Collab',
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/creators?searchQuery={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AbeyCollab Platform',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'All Modern Browsers (Chrome, Safari, Firefox, Edge, iOS, Android)',
    url: SITE_URL,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1850',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'AbeyCollab Core Navigation',
    itemListElement: [
      {
        '@type': 'SiteNavigationElement',
        position: 1,
        name: 'Explore Campaign Briefs',
        description: 'Browse active brand campaigns and apply for milestone-protected creator deals.',
        url: `${SITE_URL}/campaigns`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 2,
        name: 'Creator Roster',
        description: 'Discover verified creators across tech, fashion, lifestyle, and fitness.',
        url: `${SITE_URL}/creators`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 3,
        name: 'For Brands',
        description: 'Launch high-ROI influencer campaigns with zero advance risk and milestone escrow.',
        url: `${SITE_URL}/for-brands`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 4,
        name: 'Pricing & Escrow Protection',
        description: 'Transparent pricing with 100% upfront escrow locking and zero hidden fees.',
        url: `${SITE_URL}/pricing`,
      },
      {
        '@type': 'SiteNavigationElement',
        position: 5,
        name: 'Case Studies',
        description: 'Real performance metrics and success stories from top brand-creator partnerships.',
        url: `${SITE_URL}/case-studies`,
      },
    ],
  },
];
