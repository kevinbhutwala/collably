import type { Metadata } from 'next';
import React from "react";
import Link from "next/link";
import { Database, ArrowLeft } from "lucide-react";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://abeycollab.com';

export const metadata: Metadata = {
  title: 'Data Processing Agreement (DPA) — Enterprise Compliance',
  description:
    'AbeyCollab enterprise data processing agreement, standard contractual clauses, GDPR, UK GDPR, and India DPDP compliance.',
  keywords: [
    'data processing agreement',
    'dpa',
    'gdpr compliance',
    'enterprise creator compliance',
    'standard contractual clauses',
  ],
  alternates: { canonical: `${BASE_URL}/dpa` },
  openGraph: {
    type: 'website',
    url: `${BASE_URL}/dpa`,
    title: 'Data Processing Agreement (DPA) — AbeyCollab',
    description: 'Enterprise compliance, GDPR, UK GDPR, and India DPDP contractual clauses.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Data Processing Agreement — AbeyCollab',
    description: 'Standard Contractual Clauses & data processor obligations for brands and creators.',
    images: ['/og-image.png'],
  },
};

const dpaJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Data Processing Agreement — AbeyCollab',
    url: `${BASE_URL}/dpa`,
    description: 'Standard Contractual Clauses and enterprise compliance.',
    inLanguage: 'en-US',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Data Processing Agreement',
        item: `${BASE_URL}/dpa`,
      },
    ],
  },
];

export default function DPAPage() {
  return (
    <div className="py-16 sm:py-24 bg-[#FAFAFC] dark:bg-[#07070B] text-[#0A0A0E] dark:text-[#F4F4F8] min-h-screen">
      <script
        id="dpa-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dpaJsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#7A7A8A] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 text-[#0A0A0E] dark:text-white text-xs font-mono font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F]" />
            <span>Enterprise Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0A0A0E] dark:text-white tracking-tight font-display">
            Data Processing Agreement (DPA)
          </h1>
          <p className="text-sm text-[#7A7A8A] dark:text-[#8E8EA4] font-mono">
            Standard Contractual Clauses • GDPR, UK GDPR &amp; India DPDP Ready
          </p>
        </div>

        <div className="space-y-8 text-sm text-[#6B6B6B] dark:text-[#8E8EA4] leading-relaxed border-t border-[#E7E7E4] dark:border-white/10 pt-8 font-sans font-medium">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] dark:text-white font-display">1. Scope and Applicability</h2>
            <p>
              This Data Processing Agreement (&quot;DPA&quot;) supplements the AbeyCollab Terms of Service and applies to the processing of Personal Data by AbeyCollab Inc. on behalf of customer brands and creator talent partners subject to the European Union General Data Protection Regulation (GDPR), the UK Data Protection Act 2018, the California Consumer Privacy Act (CCPA/CPRA), and the Digital Personal Data Protection Act 2023 (India).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] dark:text-white font-display">2. Roles of the Parties</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-[#6B6B6B] dark:text-[#8E8EA4]">
              <li><strong className="text-[#111111] dark:text-white">Brand Customers (Data Controllers):</strong> Determine the purposes and scope of creator marketing briefs, deliverable specifications, and campaign parameters.</li>
              <li><strong className="text-[#111111] dark:text-white">AbeyCollab Inc. (Data Processor):</strong> Processes creator channel analytics, review comments, timecoded video timestamps, and payout transaction records strictly under the instruction of the controller.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] dark:text-white font-display">3. Technical &amp; Organizational Security Measures</h2>
            <p>AbeyCollab implements rigorous technical controls to safeguard all campaign assets and personal information:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#6B6B6B] dark:text-[#8E8EA4]">
              <li><strong className="text-[#111111] dark:text-white">Cryptographic Protection:</strong> User passwords hashed with PBKDF2 (100,000 rounds) + unique salt; session cookies signed with HMAC-SHA256 and configured with <code className="bg-black/5 dark:bg-white/10 px-1 py-0.5 rounded text-[11px] text-[#0A0A0E] dark:text-white">HttpOnly; Secure; SameSite=Lax</code>.</li>
              <li><strong className="text-[#111111] dark:text-white">Transport &amp; Storage Encryption:</strong> TLS 1.3 in transit across all endpoints; AES-256 at rest for media storage and database logs.</li>
              <li><strong className="text-[#111111] dark:text-white">Webhook Verification:</strong> HMAC signature validation on all incoming payment events (Stripe / Razorpay).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] dark:text-white font-display">4. Sub-processors</h2>
            <p>
              AbeyCollab engages verified sub-processors for essential infrastructure services: Vercel (Edge Hosting), Stripe Inc. (Payment Processing &amp; Payouts), and Resend (Transactional Email). Customers will be notified of any material sub-processor modifications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] dark:text-white font-display">5. Data Deletion &amp; Audit Inquiries</h2>
            <p>
              Upon termination of services, AbeyCollab will delete or return all Personal Data upon controller request within 30 days. For custom enterprise DPA counter-signatures, contact <span className="font-mono font-bold text-[#111111] dark:text-white">dpa@abeycollab.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
