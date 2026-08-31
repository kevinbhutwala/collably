# COLLABLY — FULL TECHNICAL PRODUCTION, SECURITY & BACKEND AUDIT REPORT

**Audit Date:** September 1, 2026  
**Auditors:** Senior Staff Engineer, Security Architect, DevOps Engineer, QA Engineer, Product Architect  
**Scope:** Complete Codebase, API Routes, Persistence Layer, Security Posture, Role-Based Access Control, Webhooks, File Handling, and Infrastructure Strategy.  
**Production Deployment Reference:** [https://collably-ashen.vercel.app/](https://collably-ashen.vercel.app/)

---

## 1. EXECUTIVE SUMMARY

Collably has established a modern, responsive, high-aesthetic frontend with an extensive Next.js App Router structure (76 static/dynamic routes), TypeScript data contracts, and client-side stores. However, the backend architecture is in a **transitional state between prototype emulation and true database-backed infrastructure**.

### Status Classification Key:
* 🟢 **Production-ready:** Fully implemented, validated, securely enforced server-side.
* 🟡 **Partially implemented:** Operational logic exists but lacks production hardening (e.g. distributed rate-limits, asynchronous DB delegates, strict verification).
* 🟠 **Prototype/mock:** Functional in browser/memory only; relies on seeded state or localStorage without cloud persistence.
* 🔴 **Broken:** Vulnerable to security bypass, runtime failure under serverless conditions, or logic failure.
* ⚫ **Missing:** Claimed in UI/marketing or required for production, but completely unimplemented.

---

## 2. MODULE-BY-MODULE AUDIT

| Module | Status | Technical Reality & Findings | Immediate Remediation Required |
| :--- | :---: | :--- | :--- |
| **Frontend UI / Design System** | 🟢 | World-class Tailwind CSS, Outfit & Plus Jakarta typography, responsive breakpoints (390px–1920px), Lenis 120fps hardware scrolling, animated empty states. | None for UI styling; ensure dark-mode contrast parity where applicable. |
| **Routing & Navigation** | 🟢 | 76 routes cleanly mapped across `(public)`, `(auth)`, `app/*`, `admin/*`. Back to Home buttons, breadcrumbs, and deep linking operational. | Add edge middleware for route protection. |
| **Database / Persistence Layer** | 🔴 | `src/server/db/database.ts` reads/writes to `data/valence_db.json`. On serverless platforms (Vercel), local disk is ephemeral and read-only. Data mutations get wiped on cold starts. | Connect Supabase PostgreSQL free-tier client across all repository classes. |
| **Database Schema Definition** | 🟡 | `supabase/schema.sql` contains comprehensive 684-line schema with Enums, UUIDs, Foreign Keys, and RLS templates. However, repositories currently query in-memory JSON state rather than executing SQL queries against Supabase. | Apply migrations to live Supabase instance and wire repositories to `@supabase/supabase-js`. |
| **Authentication Engine** | 🟡 | Custom PBKDF2 hashing (`src/server/auth/crypto.ts`) and HMAC-SHA256 JWT cookies (`collably_session`). Only 1,000 PBKDF2 iterations used (OWASP recommends 210,000+). Timing-safe equality missing on password comparison. | Increase PBKDF2 rounds or migrate to Supabase Auth / bcrypt with `crypto.timingSafeEqual`. |
| **Authorization & RBAC** | 🔴 | `src/server/services/security.service.ts` has `hasPermission()` helper, but several API routes (`POST /api/campaigns`, `POST /api/campaigns/apply`, `POST /api/collaborations/[id]`) omit `getSession(req)` validation. Unauthenticated users can trigger actions and inject arbitrary `brandId` / `creatorId` (IDOR vulnerability). | Implement strict session extraction and role-based guard assertions inside every mutating route handler. |
| **Edge Route Middleware** | ⚫ | No root `middleware.ts` file exists. Route protection relies entirely on client-side React `<AuthGuard>` wrapper. | Create `middleware.ts` to inspect session tokens at the Vercel edge before rendering protected pages. |
| **Payment Gateway Integration** | 🟡 | Razorpay order creation (`createOrder`) and webhook structure (`processWebhookEvent`) implemented in `src/server/services/payment.service.ts`. However, test mode fallback auto-generates simulated order IDs when credentials are not supplied. | Enforce mandatory credentials in production; reject fallback simulated IDs when `NODE_ENV === 'production'`. |
| **Payment Verification Endpoint** | 🔴 | `POST /api/payments/verify` marks payments as captured with `signature: z.string().optional()`. If signature is omitted, it captures payment without cryptographic HMAC validation. | Make signature mandatory and verify HMAC against `RAZORPAY_KEY_SECRET` before updating status. |
| **Webhook Signature Verification** | 🔴 | `POST /api/webhooks/payment` checks signature only `if (webhookSecret)`. If `RAZORPAY_WEBHOOK_SECRET` is unset, it processes unsigned events without error. | Block and return `500 Configuration Error` if webhook secret is missing; return `401 Unauthorized` for invalid signatures. |
| **Idempotency & Duplicate Protection** | 🟢 | `paymentRepo.recordWebhookEvent` stores `providerEventId` and prevents duplicate webhook replay execution. | Maintain existing idempotency table in PostgreSQL. |
| **File Storage & Upload Security** | 🟡 | `mediaService.ts` defines `ALLOWED_MIME_TYPES` and 500MB size ceiling with signed URLs via Supabase Storage. However, fallback `/api/media/upload` lacks local file-writer when Supabase is disconnected. | Configure live Supabase Storage buckets (`content-submissions`, `portfolio`, `avatars`). |
| **Video Review Player** | 🟢 | HTML5 4K video player (`VideoReviewDemo.tsx`) with real stream playback, timecode seeking (`@00:14`, `@00:42`, `@00:55`), frame bounding box annotations, and escrow release triggers. | Wire review notes to live `collaborationRepo` submissions table. |
| **Social API Integrations** | 🟠 | UI displays verified badges and engagement rates, but YouTube/Instagram/TikTok OAuth connections are not connected to live third-party Graph APIs. Metrics are computed from profile defaults. | Replace "Verified by YouTube API" claims with "Manual Self-Reported / Connect Account Coming Soon". |
| **AI Matching & Pitch Generation** | 🟡 | `ai.service.ts` uses prompt builders and heuristics. If `GEMINI_API_KEY` is present, it calls Gemini 1.5 Flash; otherwise, it falls back to structured rule-based deterministic match scoring. | Connect free-tier Google AI Studio API key (`GEMINI_API_KEY`). |
| **Email Notifications** | 🟠 | `notificationService.ts` logs notifications to database/inbox; transactional email via Resend (`RESEND_API_KEY`) is scaffolded but disabled in zero-credential mode. | Configure free-tier Resend API key (3,000 emails/month free) for milestone alerts. |
| **Security Headers & CSP** | 🔴 | `next.config.mjs` contains no security headers (`Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`). | Add comprehensive HTTP security headers in `next.config.mjs`. |
| **Rate Limiting** | 🟡 | `SecurityService.checkRateLimit` implements sliding-window in-memory throttling. Works in single-node/local, but serverless Vercel nodes do not share memory across regions. | Acceptable for ₹0 MVP; recommend Upstash Redis (free tier) for distributed edge rate-limiting. |
| **Admin Panel & Governance** | 🟡 | `/admin` portal features Creator Verification, Campaign Moderation, Dispute Resolution, and Audit Logs (`auditRepo`). However, admin authorization must be enforced via server-side session checks. | Restrict `/admin/*` routes strictly to `super_admin` and `agency_admin` roles in middleware. |
| **Audit Trail Logging** | 🟢 | `auditRepo.logEvent()` captures immutable operational records (Logins, Campaign Creation, Milestone Approvals, Payments) with actor ID, timestamp, and metadata. | Ensure audit logs persist to PostgreSQL `audit_logs` table. |

---

## 3. IDENTIFIED CRITICAL VULNERABILITIES & RISKS

### 1. Insecure Direct Object Reference (IDOR) on Mutations
* **Files:** `src/app/api/campaigns/route.ts`, `src/app/api/collaborations/[id]/route.ts`, `src/app/api/campaigns/apply/route.ts`
* **Risk:** High. An attacker can POST to `/api/collaborations/collab-1` with `action: "approve"` without being authenticated as the brand that funded the campaign.
* **Fix:** Add mandatory session extraction and verify that `session.userId === collaboration.brand.userId` before authorizing deliverable approvals or status updates.

### 2. Payment Capture Signature Bypass
* **Files:** `src/app/api/payments/verify/route.ts`
* **Risk:** Critical. The validation schema marks `signature` as optional. An attacker could craft an HTTP POST payload with an arbitrary `orderId` and `paymentId` to mark orders as paid without transferring funds.
* **Fix:** Require `signature` and compute `crypto.createHmac("sha256", secret).update(orderId + "|" + paymentId).digest("hex")`.

### 3. Ephemeral Disk Persistence on Serverless
* **Files:** `src/server/db/database.ts`, `data/valence_db.json`
* **Risk:** High (Data Loss). On Vercel, filesystem writes are ephemeral. Created accounts, campaigns, or deliverables stored only in `valence_db.json` will vanish upon lambda recycling.
* **Fix:** Deploy `supabase/schema.sql` to a free Supabase Postgres instance and connect `@supabase/supabase-js`.

### 4. Weak PBKDF2 Iteration Count
* **Files:** `src/server/auth/crypto.ts`
* **Risk:** Medium. 1,000 iterations of SHA-512 is vulnerable to GPU-based dictionary brute-forcing.
* **Fix:** Upgrade iteration count to 210,000 rounds or delegate password hashing to Supabase Auth.
