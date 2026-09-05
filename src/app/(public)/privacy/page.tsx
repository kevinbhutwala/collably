"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 sm:py-24 bg-[#FAFAFC] text-[#0A0A0E] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#7A7A8A] hover:text-[#0A0A0E] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-xs font-mono font-bold text-[#0A0A0E] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F]" />
            <span>Privacy &amp; Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Privacy Policy
          </h1>
          <p className="text-sm text-[#7A7A8A] font-mono">
            Last Updated: August 31, 2026 • AbeyCollab Inc.
          </p>
        </div>

        <div className="space-y-8 text-sm text-[#6B6B6B] leading-relaxed border-t border-[#E7E7E4] pt-8 font-sans font-medium">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">1. Overview &amp; Commitment</h2>
            <p>
              AbeyCollab Inc. (&quot;AbeyCollab&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the AbeyCollab creator and brand collaboration platform. We are committed to safeguarding your personal data, audience metrics, media assets, and transaction records with enterprise-grade cryptographic security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">2. Information We Collect</h2>
            <p>We collect information you provide directly when registering, verifying your profile, or conducting campaign collaborations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#6B6B6B]">
              <li><strong className="text-[#111111]">Account Identification:</strong> Legal name, email address, password hash (salted PBKDF2), profile handles, company name, and location.</li>
              <li><strong className="text-[#111111]">Social Media &amp; Audience Analytics:</strong> Public handles, verified follower metrics, subscriber counts, and engagement rates for YouTube, Instagram, TikTok, X, and LinkedIn.</li>
              <li><strong className="text-[#111111]">Campaign Data:</strong> Briefs, deliverable video uploads, timecoded review comments, rate cards, and contract terms.</li>
              <li><strong className="text-[#111111]">Financial Data:</strong> Payout details, escrow transaction IDs, and invoice records processed via secure payment processors (Stripe Connect / Razorpay). We never store raw credit card numbers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-[#6B6B6B]">
              <li>To provide, operate, and maintain the AbeyCollab collaboration workspace and milestone escrow vault.</li>
              <li>To match brand campaign requirements with creator audience niches using algorithmic scoring.</li>
              <li>To process milestone payouts, collect platform commission (10%), and maintain auditable financial records.</li>
              <li>To prevent fraud, verify authentic social channel ownership, and enforce rate limits.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">4. Data Sharing &amp; Third Parties</h2>
            <p>
              We do not sell, rent, or monetize your personal information to data brokers or ad networks. Data is shared strictly with verified infrastructure partners necessary to deliver the service:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#6B6B6B]">
              <li><strong className="text-[#111111]">Payment Infrastructure:</strong> Stripe / Razorpay for escrow holding and direct creator bank payouts.</li>
              <li><strong className="text-[#111111]">Transactional Email:</strong> Resend for automated deliverable alerts and milestone status updates.</li>
              <li><strong className="text-[#111111]">Cloud Storage:</strong> Encrypted object storage for 4K video drafts and portfolio media.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">5. Your Data Rights &amp; Deletion</h2>
            <p>
              You have the right to access, export, update, or permanently delete your account and all associated media kits at any time from your account settings or by contacting our Data Protection Officer at <span className="font-mono text-[#111111] font-bold">privacy@abeycollab.com</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
