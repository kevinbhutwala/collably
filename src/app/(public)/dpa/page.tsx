"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, FileText, ArrowLeft, Lock, Database } from "lucide-react";

export default function DPAPage() {
  return (
    <div className="py-16 sm:py-24 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold">
            <Database className="w-3.5 h-3.5 text-blue-600" />
            <span>Enterprise Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Data Processing Agreement (DPA)
          </h1>
          <p className="text-sm text-slate-500 font-mono">
            Standard Contractual Clauses • GDPR, UK GDPR & India DPDP Ready
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8 text-sm text-slate-700 leading-relaxed border-t border-slate-200 pt-8">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">1. Scope and Applicability</h2>
            <p>
              This Data Processing Agreement (&quot;DPA&quot;) supplements the Collably Terms of Service and applies to the processing of Personal Data by Collably Inc. on behalf of customer brands and creator talent partners subject to the European Union General Data Protection Regulation (GDPR), the UK Data Protection Act 2018, the California Consumer Privacy Act (CCPA/CPRA), and the Digital Personal Data Protection Act 2023 (India).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">2. Roles of the Parties</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Brand Customers (Data Controllers):</strong> Determine the purposes and scope of creator marketing briefs, deliverable specifications, and campaign parameters.</li>
              <li><strong>Collably Inc. (Data Processor):</strong> Processes creator channel analytics, review comments, timecoded video timestamps, and payout transaction records strictly under the instruction of the controller.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">3. Technical & Organizational Security Measures</h2>
            <p>Collably implements rigorous technical controls to safeguard all campaign assets and personal information:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Cryptographic Protection:</strong> User passwords hashed with PBKDF2 (100,000 rounds) + unique salt; session cookies signed with HMAC-SHA256 and configured with <code>HttpOnly; Secure; SameSite=Lax</code>.</li>
              <li><strong>Transport & Storage Encryption:</strong> TLS 1.3 in transit across all endpoints; AES-256 at rest for media storage and database logs.</li>
              <li><strong>Webhook Verification:</strong> HMAC signature validation on all incoming payment events (Stripe / Razorpay).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">4. Sub-processors</h2>
            <p>
              Collably engages verified sub-processors for essential infrastructure services: Vercel (Edge Hosting), Stripe Inc. (Payment Processing & Payouts), and Resend (Transactional Email). Customers will be notified of any material sub-processor modifications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900">5. Data Deletion & Audit Inquiries</h2>
            <p>
              Upon termination of services, Collably will delete or return all Personal Data upon controller request within 30 days. For custom enterprise DPA counter-signatures, contact <span className="font-mono font-bold text-slate-900">dpa@collably.io</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
