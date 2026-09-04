import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { CommandPalette } from '@/components/navigation/CommandPalette';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/react';
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

const BASE_URL = 'https://collably-ashen.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Collably — Creator & Brand Collaboration Platform',
    template: '%s | Collably',
  },
  description:
    'Collably connects brands with creators through milestone-protected escrow campaigns. Discover talent, launch briefs, approve deliverables, and release payments — all in one place.',
  keywords: [
    'influencer marketing platform',
    'creator marketplace',
    'brand creator collaboration',
    'milestone escrow payments',
    'campaign management',
  ],
  authors: [{ name: 'Collably', url: BASE_URL }],
  creator: 'Collably',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: 'Collably',
    title: 'Collably — Creator & Brand Collaboration Platform',
    description:
      'Milestone-protected campaigns, real creator discovery, and instant payouts. Built for the new creator economy.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Collably — Creator Commerce Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Collably — Creator & Brand Collaboration Platform',
    description:
      'Milestone-protected campaigns, real creator discovery, and instant payouts.',
    images: ['/og-image.png'],
    creator: '@collably',
  },
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
    apple: '/icon.svg',
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Collably',
  url: BASE_URL,
  logo: `${BASE_URL}/icon.svg`,
  sameAs: [],
  contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'support@collably.io' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('collably_theme');
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
          id="org-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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
