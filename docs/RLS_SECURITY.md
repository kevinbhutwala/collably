# COLLABLY — ROW LEVEL SECURITY (RLS) ARCHITECTURE & POLICIES

**Document Version:** 1.0  
**Effective Date:** September 1, 2026  
**Scope:** PostgreSQL / Supabase Tables, Role-Based Access Control, Tenant Isolation, and IDOR Defense.

---

## 1. TABLE-BY-TABLE ACCESS MATRIX

| Table Name | SELECT (Read) | INSERT (Create) | UPDATE (Modify) | DELETE (Remove) |
| :--- | :--- | :--- | :--- | :--- |
| **`users`** | Self (`auth.uid() = id`), Admins | Public Signup / Auth System | Self (`auth.uid() = id`), Admins | Admins only |
| **`profiles`** | Public (name, avatar), Admins | Self on signup | Self (`auth.uid() = user_id`), Admins | Self, Admins |
| **`creator_profiles`** | Public if `verified = true`, Self | Authenticated Creators | Self (`auth.uid() = user_id`), Admins | Admins only |
| **`brand_profiles`** | Public (verified info), Self | Authenticated Brands | Self (`auth.uid() = user_id`), Admins | Admins only |
| **`social_accounts`** | Public (handle, tier), Self | Profile Owner | Profile Owner, Admins | Profile Owner, Admins |
| **`campaigns`** | Public if `status = 'active'`, Brand Owner | Brand Owner, Admins | Brand Owner (`auth.uid() = brand.user_id`), Admins | Brand Owner (drafts only), Admins |
| **`campaign_applications`** | Submitting Creator, Sponsoring Brand, Admins | Authenticated Creators | Sponsoring Brand (status), Submitting Creator (pitch), Admins | Submitting Creator (pending only) |
| **`collaborations`** | Assigned Creator, Sponsoring Brand, Admins | Sponsoring Brand on application accept | Assigned Creator, Sponsoring Brand, Admins | Admins only |
| **`deliverables`** | Assigned Creator, Sponsoring Brand, Admins | Sponsoring Brand / System | Assigned Creator (submit), Sponsoring Brand (approve), Admins | Admins only |
| **`deliverable_submissions`** | Assigned Creator, Sponsoring Brand, Admins | Assigned Creator | Assigned Creator, Sponsoring Brand (feedback), Admins | None (immutable audit history) |
| **`payments`** | Paying Brand, Sponsoring Brand, Admins | System / Payment Gateway Webhook | System / Webhook ONLY | None |
| **`payment_events`** | Admins, System Webhook | System / Webhook ONLY | None (immutable ledger) | None |
| **`payouts`** | Receiving Creator, Paying Brand, Admins | System on Milestone Approval | System / Gateway Webhook, Admins | None |
| **`messages`** | Conversation Participants (`sender_id` OR `recipient_id`), Admins | Conversation Participants | Sender (edit within 5 min), Admins | Sender, Admins |
| **`notifications`** | Target User (`auth.uid() = user_id`) | System / Event Triggers | Target User (mark read) | Target User |
| **`disputes`** | Involved Creator, Involved Brand, Admins | Involved Participants | Admins (resolution), Involved Participants (notes) | None |
| **`audit_logs`** | Admins only | System / Backend Service Role | None (immutable audit log) | None |

---

## 2. PRODUCTION SQL RLS POLICIES

```sql
-- Enable RLS across all core tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE deliverable_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Campaigns Policy: Public can read active briefs; Brands manage their own
CREATE POLICY "Public active campaigns are viewable by all" 
ON campaigns FOR SELECT 
USING (status IN ('active', 'applications_open') OR auth.uid() IN (
    SELECT user_id FROM brand_profiles WHERE id = campaigns.brand_id
));

CREATE POLICY "Brands can create campaigns" 
ON campaigns FOR INSERT 
WITH CHECK (auth.uid() IN (
    SELECT user_id FROM brand_profiles WHERE id = campaigns.brand_id
));

CREATE POLICY "Brands can update their own campaigns" 
ON campaigns FOR UPDATE 
USING (auth.uid() IN (
    SELECT user_id FROM brand_profiles WHERE id = campaigns.brand_id
));

-- 2. Campaign Applications: Sponsoring Brand and Submitting Creator only
CREATE POLICY "Applications viewable by creator or brand" 
ON campaign_applications FOR SELECT 
USING (
    auth.uid() IN (SELECT user_id FROM creator_profiles WHERE id = campaign_applications.creator_id) OR
    auth.uid() IN (
        SELECT bp.user_id FROM brand_profiles bp 
        JOIN campaigns c ON c.brand_id = bp.id 
        WHERE c.id = campaign_applications.campaign_id
    )
);

-- 3. Payments Policy: Financial records restricted to paying brand and admins
CREATE POLICY "Payments viewable only by brand owner" 
ON payments FOR SELECT 
USING (
    auth.uid() IN (SELECT user_id FROM brand_profiles WHERE id = payments.brand_id)
);

-- 4. Payouts Policy: Restricted to receiving creator and admins
CREATE POLICY "Payouts viewable only by recipient creator" 
ON payouts FOR SELECT 
USING (
    auth.uid() IN (SELECT user_id FROM creator_profiles WHERE id = payouts.creator_id)
);
```

---

## 3. IDOR ATTACK SCENARIOS & MITIGATIONS

1. **Scenario: Creator A attempts to approve Creator B's deliverable:**
   * *Mitigation:* Database RLS and server API check `auth.uid() IN (SELECT user_id FROM brand_profiles WHERE id = collab.brand_id)`. Rejects with 403 Forbidden.
2. **Scenario: Brand A attempts to query Brand B's payment record via direct UUID:**
   * *Mitigation:* `payments` table RLS restricts `SELECT` to `auth.uid() = brand.user_id`. Supabase returns zero rows.
3. **Scenario: Unauthenticated user modifies URL ID to access private submissions:**
   * *Mitigation:* Edge middleware rejects unauthenticated requests at gateway level; RLS prevents database execution.
