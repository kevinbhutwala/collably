import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { CommandPalette } from '@/components/navigation/CommandPalette';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-jakarta',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'AbeyCollab — Creator & Brand Marketplace | Milestone Escrow & Instant Payouts',
    template: '%s | AbeyCollab',
  },
  description:
    'AbeyCollab is the premier creator commerce and influencer marketplace. Connect brands with verified content creators through milestone-protected escrow campaigns, transparent rate cards, 4K video review studio, and instant Razorpay payments.',
  keywords: [
    'creator marketplace',
    'influencer marketing platform',
    'brand creator collaboration',
    'milestone escrow payments',
    'razorpay creator payments',
    'hire influencers',
    'find content creators',
    'ugc creators marketplace',
    'youtube sponsorships',
    'instagram brand deals',
    'tiktok creator briefs',
    'verified creator media kit',
    'influencer campaign management',
    'creator economy software',
  ],
  authors: [{ name: 'AbeyCollab Team', url: BASE_URL }],
  creator: 'AbeyCollab',
  publisher: 'AbeyCollab Media Inc.',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['en_GB', 'en_IN'],
    url: BASE_URL,
    siteName: 'AbeyCollab',
    title: 'AbeyCollab — Creator & Brand Marketplace | Milestone Escrow & Instant Payouts',
    description:
      'Milestone-protected influencer campaigns, verified creator rate cards, and instant payouts via Razorpay & Stripe. Built for high-growth brands and professional creators.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AbeyCollab — Creator Commerce & Brand Collaboration Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@abeycollab',
    creator: '@abeycollab',
    title: 'AbeyCollab — Creator & Brand Collaboration Marketplace',
    description:
      'Milestone-protected campaigns, vetted creator discovery, 4K video review studio, and guaranteed payouts.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Business & Technology',
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },
};

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AbeyCollab',
    alternateName: 'AbeyCollab Marketplace',
    url: BASE_URL,
    logo: `${BASE_URL}/icon.svg`,
    description:
      'Enterprise creator-brand marketplace featuring milestone-protected escrow, transparent rate cards, and instant payouts.',
    foundingDate: '2024',
    sameAs: [
      'https://twitter.com/abeycollab',
      'https://instagram.com/abeycollab',
      'https://linkedin.com/company/abeycollab',
      'https://razorpay.me/@abeycollab',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer & Talent Support',
      email: 'support@abeycollab.com',
      availableLanguage: ['English'],
    },
    paymentAccepted: ['Razorpay', 'Credit Card', 'Debit Card', 'UPI', 'Netbanking', 'Stripe'],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AbeyCollab',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/creators?searchQuery={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'AbeyCollab Platform',
    operatingSystem: 'All Modern Web Browsers',
    applicationCategory: 'BusinessApplication',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1450',
      bestRating: '5',
      worstRating: '1',
    },
    offers: {
      '@type': 'Offer',
      price: '0.00',
      priceCurrency: 'USD',
    },
  },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('abeycollab_theme') || localStorage.getItem('collably_theme');
                  var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (saved === 'dark' || (!saved && prefersDark)) {
                    document.documentElement.classList.add('dark');
                    document.documentElement.style.colorScheme = 'dark';
                  } else {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <Script
          id="global-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen bg-white dark:bg-[#0A0A0E] text-[#0A0A0E] dark:text-[#F4F4F8] antialiased font-sans selection:bg-[#FFD21F] selection:text-[#0A0A0E]">
        {children}
        <Analytics />
        <SpeedInsights />
        <CommandPalette />
        <ToastContainer />
      </body>
    </html>
  );
}
