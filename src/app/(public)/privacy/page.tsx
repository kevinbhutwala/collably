"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ArrowLeft } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 sm:py-24 bg-[#0a070a] text-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-400 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] text-xs font-semibold font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Privacy &amp; Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400 font-mono">
            Last Updated: August 31, 2026 • Collably Inc.
          </p>
        </div>

        <div className="space-y-8 text-sm text-slate-300 leading-relaxed border-t border-white/10 pt-8 font-sans">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display">1. Overview &amp; Commitment</h2>
            <p>
              Collably Inc. (&quot;Collably&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the Collably creator and brand collaboration platform. We are committed to safeguarding your personal data, audience metrics, media assets, and transaction records with enterprise-grade cryptographic security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display">2. Information We Collect</h2>
            <p>We collect information you provide directly when registering, verifying your profile, or conducting campaign collaborations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong className="text-white">Account Identification:</strong> Legal name, email address, password hash (salted PBKDF2), profile handles, company name, and location.</li>
              <li><strong className="text-white">Social Media &amp; Audience Analytics:</strong> Public handles, verified follower metrics, subscriber counts, and engagement rates for YouTube, Instagram, TikTok, X, and LinkedIn.</li>
              <li><strong className="text-white">Campaign Data:</strong> Briefs, deliverable video uploads, timecoded review comments, rate cards, and contract terms.</li>
              <li><strong className="text-white">Financial Data:</strong> Payout details, escrow transaction IDs, and invoice records processed via secure payment processors (Stripe Connect / Razorpay). We never store raw credit card numbers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li>To provide, operate, and maintain the Collably collaboration workspace and milestone escrow vault.</li>
              <li>To match brand campaign requirements with creator audience niches using algorithmic scoring.</li>
              <li>To process milestone payouts, collect platform commission (10%), and maintain auditable financial records.</li>
              <li>To prevent fraud, verify authentic social channel ownership, and enforce rate limits.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display">4. Data Sharing &amp; Third Parties</h2>
            <p>
              We do not sell, rent, or monetize your personal information to data brokers or ad networks. Data is shared strictly with verified infrastructure partners necessary to deliver the service:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-300">
              <li><strong className="text-white">Payment Infrastructure:</strong> Stripe / Razorpay for escrow holding and direct creator bank payouts.</li>
              <li><strong className="text-white">Transactional Email:</strong> Resend for automated deliverable alerts and milestone status updates.</li>
              <li><strong className="text-white">Cloud Storage:</strong> Encrypted object storage for 4K video drafts and portfolio media.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white font-display">5. Your Data Rights &amp; Deletion</h2>
            <p>
              You have the right to access, export, update, or permanently delete your account and all associated media kits at any time from your account settings or by contacting our Data Protection Officer at <span className="font-mono text-pink-300 font-bold">privacy@collably.io</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
