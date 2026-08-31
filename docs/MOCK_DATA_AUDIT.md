# COLLABLY — MOCK DATA & PERSISTENCE INVENTORY AUDIT

**Audit Date:** September 1, 2026  
**Scope:** Complete Codebase Scan for Hardcoded Arrays, Simulated Responses, Placeholder Entities, and Fallback Mock Systems.

---

## 1. MOCK DATA INVENTORY TABLE

| Mock File / Entity | Current Prototype State | Target Production State | Migration Priority |
| :--- | :--- | :--- | :--- |
| `src/mock/creators.mock.ts` | 6 static creator records (`Alex Rivera`, `Elena Rostova`, `Marcus Chen`, etc.) with hardcoded follower counts, engagement rates, and Unsplash portraits. | Dynamic records in `creator_profiles` table linked to `users.id`, populated during creator onboarding (`/creator/register`). | **HIGH** |
| `src/mock/brands.mock.ts` | 4 static brand profiles (`Arcane Tech`, `Lumina Health`, `CyberShield Security`, `Volt Energy`) with mock budgets and verification badges. | Dynamic records in `brand_profiles` table linked to `users.id`, populated during brand onboarding (`/brand/register`). | **HIGH** |
| `src/mock/campaigns.mock.ts` | 4 hardcoded campaign briefs (`Autonomous Coding Agent Launch`, `Smart Ring Health Tracking`, etc.) with pre-filled milestone tranches. | Database records in `campaigns` table with relational foreign keys to `brand_id`, created via `/app/brand/campaigns/create`. | **HIGH** |
| `src/mock/collaborations.mock.ts` | 3 hardcoded collaborations (`collab-1`, `collab-2`, `collab-3`) with mock deliverables and timecoded feedback arrays. | Dynamic records in `collaborations` and `deliverable_submissions` tables generated upon brand pitch acceptance. | **HIGH** |
| `src/mock/applications.mock.ts` | 3 static creator pitches with proposed fees and match scores. | Dynamic records in `campaign_applications` table submitted via `/campaigns/[id]`. | **MEDIUM** |
| `src/mock/messages.mock.ts` | 3 pre-filled chat conversations with hardcoded message threads. | Real-time messages stored in `messages` and `conversations` tables, queried via `messageService`. | **MEDIUM** |
| `src/mock/notifications.mock.ts` | 5 sample notification objects (application accepted, milestone funded, etc.). | User-specific rows in `notifications` table triggered by system event lifecycle handlers. | **MEDIUM** |
| `src/server/db/seed.ts` | Initializer that imports mock files into `data/valence_db.json` when the database file is missing. | SQL Seed Script (`scripts/seed.ts`) that inserts sanitized demo data into a designated staging environment only. | **HIGH** |
| `src/stores/auth.store.ts` | Contains fallback default users (`user-c1`, `user-b1`) for instant offline preview when no cookies/tokens are present. | Strict cookie/token resolution with no automatic unauthenticated role elevation in production. | **CRITICAL** |
| `src/server/services/ai.service.ts` | Deterministic heuristic calculation for match scores (`78%–96%`) when `GEMINI_API_KEY` is not supplied. | Real LLM semantic embeddings or prompt execution via Google Gemini 1.5 Flash free-tier API. | **LOW** |
| `src/server/services/payment.service.ts` | Generates simulated order IDs (`order_rzp_...`) when Razorpay keys are omitted. | Explicit error raising if payment gateway keys are missing in production mode. | **CRITICAL** |

---

## 2. DETAILED MIGRATION ROADMAP

### A. Creator & Brand Discovery (`/creators`, `/brands`, `/campaigns`)
* **Current:** Public directory pages query `src/services/creator.service.ts` and `src/services/campaign.service.ts`, which pull from seed records when no new items are added.
* **Target:** Public queries execute `SELECT * FROM creator_profiles WHERE verified = true` and `SELECT * FROM campaigns WHERE status = 'active'` directly against PostgreSQL.
* **Transition Step:** Keep seed records labeled with a `"DEMO BENCHMARK"` badge until a minimum quorum of 10 real creator and brand profiles are registered.

### B. Collaborations & Milestone Escrow (`/app/collaborations`, `/app/earnings`)
* **Current:** Freshly logged-in users correctly see `<AnimatedEmptyState />` zero-data screens; demo accounts load pre-configured deliverables for QA testing.
* **Target:** State transitions (Submission → Revision → Approval → Payout) execute transactions inside PostgreSQL with foreign keys pointing to `collaborations.id`.

### C. Real-Time Chat & Threaded Messaging (`/app/messages`)
* **Current:** In-memory message store saves new chat messages during the active session lifecycle.
* **Target:** Supabase Realtime WebSocket channel subscribing to `messages:conversation_id=eq.[id]`.
