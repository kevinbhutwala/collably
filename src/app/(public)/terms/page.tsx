"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, FileCheck2, Scale, ArrowLeft } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="py-16 sm:py-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Scale className="w-3.5 h-3.5 text-blue-600" />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500 font-mono">
            Last Updated: August 31, 2026 • Collably Inc.
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-8">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Acceptance of Terms</h2>
            <p>
              By creating an account, publishing a campaign brief, connecting social channels, or submitting content on Collably (&quot;Platform&quot;), you agree to be bound by these Terms of Service. If you are entering into this agreement on behalf of a company, you represent that you have the authority to bind such entity.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Milestone Escrow & Payments</h2>
            <ul className="list-disc pl-5 space-y-2 text-slate-600">
              <li><strong>Brand Deposit:</strong> When a brand accepts a creator application or launches a direct booking, the agreed campaign budget is pre-funded into Collably Escrow.</li>
              <li><strong>Deliverable Review Period:</strong> Brands have 7 calendar days to review submitted content, request revisions within the agreed scope, or approve the deliverable.</li>
              <li><strong>Milestone Release:</strong> Upon brand approval (or expiration of the review window without active dispute), escrow funds are automatically disbursed to the creator.</li>
              <li><strong>Platform Fee:</strong> Collably charges a 10% platform fee deducted upon milestone release. Creators receive 90% of the agreed contract price.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Creator Deliverable Obligations</h2>
            <p>
              Creators agree to produce original, authentic content in accordance with the brief guidelines and delivery deadlines. Creators must disclose brand sponsorships in compliance with applicable advertising standards (e.g. FTC guidelines and #ad disclosure rules).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Intellectual Property & Commercial Usage</h2>
            <p>
              Unless specified otherwise in a custom campaign brief, approval of a deliverable grants the brand a non-exclusive, worldwide digital advertising license for the duration agreed in the rate card. The creator retains organic portfolio display and credit rights.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Dispute Arbitration & Refunds</h2>
            <p>
              If a deliverable is rejected or a creator fails to meet production milestones, either party may trigger Collably Dispute Arbitration. Collably staff will review video uploads, brief specifications, and revision history within 4 hours. In the event of an uncured default by a creator, escrow funds are refunded to the brand.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">6. Contact & Legal Inquiries</h2>
            <p>
              For legal notices or questions regarding these terms, contact <span className="font-mono text-slate-900 font-bold">legal@collably.io</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
