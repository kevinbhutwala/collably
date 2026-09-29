import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Instrument_Serif, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { CommandPalette } from '@/components/navigation/CommandPalette';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

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

import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_TITLE,
  TITLE_TEMPLATE,
  DEFAULT_DESCRIPTION,
  SEO_KEYWORDS,
  globalStructuredData,
} from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: TITLE_TEMPLATE,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: 'AbeyCollab Team', url: SITE_URL }],
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
    url: SITE_URL,
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'AbeyCollab — Creator Marketplace & Brand Collaboration Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@abeycollab',
    creator: '@abeycollab',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      'en-US': SITE_URL,
      'en-IN': SITE_URL,
      'x-default': SITE_URL,
    },
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
  verification: {
    google: 'HNyLvhNLTlvY4Cl7955LGVeHMtCeDnb__8HuJFnBWlk',
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || undefined,
  },
  category: 'Business & Technology',
  icons: {
    icon: [
      { url: '/logo.jpg', sizes: '48x48', type: 'image/jpeg' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/logo.jpg',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${jakarta.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/logo.jpg" sizes="48x48" type="image/jpeg" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  localStorage.removeItem('abeycollab_theme');
                  localStorage.removeItem('collably_theme');
                  localStorage.setItem('abeycollab_theme', 'light');
                  localStorage.setItem('collably_theme', 'light');
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          id="global-structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalStructuredData) }}
        />
      </head>
      <body className="min-h-screen bg-white text-[#0B0A14] antialiased font-sans selection:bg-primary selection:text-[#0B0A14]">
        {children}
        {process.env.NODE_ENV === "production" && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}
        <CommandPalette />
        <ToastContainer />
      </body>
    </html>
  );
}
