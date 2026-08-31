# COLLABLY — PRODUCT & LEGAL CLAIMS AUDIT

**Audit Date:** September 1, 2026  
**Scope:** Verification of Marketing Claims, Financial Terminology, Creator Guarantees, Tax Documentation, and Legal Deliverable Rights.

---

## 1. CLAIMS AUDIT SUMMARY TABLE

| Marketing / Product Claim | Current Implementation Status | Legal & Technical Risk | Recommended Copy / Feature Remediation |
| :--- | :---: | :--- | :--- |
| **"Escrow Protected / 100% Escrow Shield"** | 🟡 **PARTIALLY IMPLEMENTED** | In India and the US, true "escrow" requires formal escrow banking licenses (or third-party trustees like Escrow.com or Razorpay Route/Stripe Custom Connect held balances). Currently, funds are pre-authorized via payment gateway rather than held in a regulated escrow trust. | Change marketing copy to: **"Milestone-Guaranteed Funds"** or **"Pre-Funded Milestone Security via Stripe/Razorpay"** to prevent regulatory misrepresentation. |
| **"Automated Instant Bank Payouts"** | 🟡 **PARTIALLY IMPLEMENTED** | Razorpay / Stripe test mode creates payout records; real automatic SEPA/NEFT/ACH bank transfers require KYC-verified connected accounts and payout balance funding. | Change copy to: **"Direct Bank Payouts upon Milestone Approval"** (standard 1–3 business day settlement). |
| **"100% Verified Audience Metrics (YouTube/Instagram/TikTok)"** | 🟠 **PROTOTYPE / UNVERIFIED** | Metrics are currently self-reported by creators during registration or populated via demo fixtures; live OAuth 2.0 Graph API sync is not active. | Change copy to: **"Audience Self-Reported Benchmarks"** and add **"Live API Verification Coming Soon"** tags. |
| **"Automated Tax Compliance (1099, W-9, W-8BEN, TDS Withholding)"** | 🔴 **NOT IMPLEMENTED** | No automated e-signature or tax withholding calculation engine exists in the codebase. Receipts are generated, but formal tax forms are not filed. | Remove automated tax filing claims from the public landing page; replace with **"Exportable Invoices & Financial Settlement Reports"**. |
| **"Commercial IP Rights & Full License Transfer"** | 🟡 **PARTIALLY IMPLEMENTED** | Terms of Service (`/terms`) specifies IP license transfer on payout completion, but contract PDF generation with digital signature is not built. | Clarify in the brief workflow that approval constitutes legal acceptance under platform Terms of Service. |
| **"Automated Dispute Arbitration"** | 🟡 **PARTIALLY IMPLEMENTED** | Admin dispute management portal exists at `/admin/disputes` with manual resolution actions; automated AI tribunal arbitration is not implemented. | Clarify that platform administrators manually mediate disputes within 48 hours. |
| **"AI-Powered Brief & Match Scoring"** | 🟢 **IMPLEMENTED** | Deterministic semantic scoring and brief generation implemented in `ai.service.ts`, with optional Gemini 1.5 Flash connectivity. | Claim is valid and accurate. |

---

## 2. REQUIRED COPY ADJUSTMENTS FOR HONEST TRUST

To build an authentic, reputable creator economy platform that avoids legal deception:

1. **Escrow Terminology:**
   * *Before:* `"Institutional Escrow Custody Vault"`
   * *After:* `"Pre-Funded Milestone Protection (Stripe & Razorpay Secured)"`
2. **Social Metric Verification:**
   * *Before:* `"100% API Audited Follower Network"`
   * *After:* `"Creator Portfolio & Metric Self-Declarations (API Sync Rolling Out)"`
3. **Tax Compliance:**
   * *Before:* `"Automated Global TDS & 1099 Tax Filing"`
   * *After:* `"Standardized Milestone Receipts & Transaction Ledgers for Easy Tax Reporting"`
