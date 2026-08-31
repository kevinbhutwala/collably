"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, FileText, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16 sm:py-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Privacy & Data Protection</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500 font-mono">
            Last Updated: August 31, 2026 • Collably Inc.
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-8">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Overview & Commitment</h2>
            <p>
              Collably Inc. (&quot;Collably&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the Collably creator and brand collaboration platform. We are committed to safeguarding your personal data, audience metrics, media assets, and transaction records with enterprise-grade cryptographic security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Information We Collect</h2>
            <p>We collect information you provide directly when registering, verifying your profile, or conducting campaign collaborations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Account Identification:</strong> Legal name, email address, password hash (salted PBKDF2), profile handles, company name, and location.</li>
              <li><strong>Social Media & Audience Analytics:</strong> Public handles, verified follower metrics, subscriber counts, and engagement rates for YouTube, Instagram, TikTok, X, and LinkedIn.</li>
              <li><strong>Campaign Data:</strong> Briefs, deliverable video uploads, timecoded review comments, rate cards, and contract terms.</li>
              <li><strong>Financial Data:</strong> Payout details, escrow transaction IDs, and invoice records processed via secure payment processors (Stripe Connect / Razorpay). We never store raw credit card numbers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li>To provide, operate, and maintain the Collably collaboration workspace and milestone escrow vault.</li>
              <li>To match brand campaign requirements with creator audience niches using algorithmic scoring.</li>
              <li>To process milestone payouts, collect platform commission (10%), and maintain auditable financial records.</li>
              <li>To prevent fraud, verify authentic social channel ownership, and enforce rate limits.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Data Sharing & Third Parties</h2>
            <p>
              We do not sell, rent, or monetize your personal information to data brokers or ad networks. Data is shared strictly with verified infrastructure partners necessary to deliver the service:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Payment Infrastructure:</strong> Stripe / Razorpay for escrow holding and direct creator bank payouts.</li>
              <li><strong>Transactional Email:</strong> Resend for automated deliverable alerts and milestone status updates.</li>
              <li><strong>Cloud Storage:</strong> Encrypted object storage for 4K video drafts and portfolio media.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Your Data Rights & Deletion</h2>
            <p>
              You have the right to access, export, update, or permanently delete your account and all associated media kits at any time from your account settings or by contacting our Data Protection Officer at <span className="font-mono text-slate-900 font-bold">privacy@collably.io</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
