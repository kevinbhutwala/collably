"use client";

import React from "react";
import Link from "next/link";
import { Database, ArrowLeft } from "lucide-react";

export default function DPAPage() {
  return (
    <div className="py-16 sm:py-24 bg-[#FAFAF8] text-[#111111] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="space-y-4">
          <Link href="/" className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-[#6B6B6B] hover:text-[#111111] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-[#111111] text-xs font-mono font-bold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
            <span>Enterprise Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#111111] tracking-tight font-display">
            Data Processing Agreement (DPA)
          </h1>
          <p className="text-sm text-[#6B6B6B] font-mono">
            Standard Contractual Clauses • GDPR, UK GDPR &amp; India DPDP Ready
          </p>
        </div>

        <div className="space-y-8 text-sm text-[#6B6B6B] leading-relaxed border-t border-[#E7E7E4] pt-8 font-sans font-medium">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">1. Scope and Applicability</h2>
            <p>
              This Data Processing Agreement (&quot;DPA&quot;) supplements the Collably Terms of Service and applies to the processing of Personal Data by Collably Inc. on behalf of customer brands and creator talent partners subject to the European Union General Data Protection Regulation (GDPR), the UK Data Protection Act 2018, the California Consumer Privacy Act (CCPA/CPRA), and the Digital Personal Data Protection Act 2023 (India).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">2. Roles of the Parties</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-[#6B6B6B]">
              <li><strong className="text-[#111111]">Brand Customers (Data Controllers):</strong> Determine the purposes and scope of creator marketing briefs, deliverable specifications, and campaign parameters.</li>
              <li><strong className="text-[#111111]">Collably Inc. (Data Processor):</strong> Processes creator channel analytics, review comments, timecoded video timestamps, and payout transaction records strictly under the instruction of the controller.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">3. Technical &amp; Organizational Security Measures</h2>
            <p>Collably implements rigorous technical controls to safeguard all campaign assets and personal information:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[#6B6B6B]">
              <li><strong className="text-[#111111]">Cryptographic Protection:</strong> User passwords hashed with PBKDF2 (100,000 rounds) + unique salt; session cookies signed with HMAC-SHA256 and configured with <code>HttpOnly; Secure; SameSite=Lax</code>.</li>
              <li><strong className="text-[#111111]">Transport &amp; Storage Encryption:</strong> TLS 1.3 in transit across all endpoints; AES-256 at rest for media storage and database logs.</li>
              <li><strong className="text-[#111111]">Webhook Verification:</strong> HMAC signature validation on all incoming payment events (Stripe / Razorpay).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">4. Sub-processors</h2>
            <p>
              Collably engages verified sub-processors for essential infrastructure services: Vercel (Edge Hosting), Stripe Inc. (Payment Processing &amp; Payouts), and Resend (Transactional Email). Customers will be notified of any material sub-processor modifications.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-[#111111] font-display">5. Data Deletion &amp; Audit Inquiries</h2>
            <p>
              Upon termination of services, Collably will delete or return all Personal Data upon controller request within 30 days. For custom enterprise DPA counter-signatures, contact <span className="font-mono font-bold text-[#111111]">dpa@collably.io</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
