-- ==============================================================================
-- CREATOR × BRAND COLLABORATION & AGENCY PLATFORM
-- PRODUCTION POSTGRESQL / SUPABASE DATABASE SCHEMA
-- ==============================================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ==============================================================================
-- 1. ENUMS & TYPES
-- ==============================================================================
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM (
        'creator', 
        'brand_owner', 
        'brand_manager', 
        'brand_member', 
        'agency_owner', 
        'agency_admin', 
        'campaign_manager', 
        'finance_manager', 
        'content_manager', 
        'moderator', 
        'super_admin'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE platform_type AS ENUM ('instagram', 'youtube', 'tiktok', 'x', 'linkedin', 'threads', 'podcast');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE creator_tier AS ENUM ('Nano', 'Micro', 'Rising', 'Established', 'Mid-Tier', 'Macro', 'Elite', 'Premium');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE campaign_status AS ENUM (
        'draft', 
        'in_review', 
        'active', 
        'applications_open', 
        'creators_selected', 
        'in_production', 
        'completed', 
        'paused', 
        'archived', 
        'cancelled'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE application_status AS ENUM ('pending', 'shortlisted', 'accepted', 'rejected', 'negotiating');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE deliverable_status AS ENUM (
        'draft', 
        'assigned', 
        'in_progress', 
        'submitted', 
        'under_review', 
        'revision_requested', 
        'approved', 
        'published', 
        'completed'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE collaboration_status AS ENUM (
        'invited', 
        'negotiating', 
        'accepted', 
        'active', 
        'in_progress', 
        'content_submitted', 
        'under_review', 
        'revision_requested', 
        'approved', 
        'published', 
        'completed', 
        'disputed', 
        'cancelled'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE escrow_status AS ENUM ('unfunded', 'held_in_escrow', 'partially_released', 'fully_released', 'refunded');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE payment_status AS ENUM (
        'pending', 
        'authorized', 
        'captured', 
        'failed', 
        'refund_pending', 
        'refunded'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE payout_status AS ENUM (
        'pending', 
        'processing', 
        'paid', 
        'failed', 
        'held'
    );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE dispute_status AS ENUM ('Open', 'Under_Investigation', 'Evidence_Submitted', 'Resolved', 'Closed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE support_ticket_status AS ENUM ('Open', 'In_Progress', 'Waiting_On_User', 'Resolved');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE support_ticket_priority AS ENUM ('Low', 'Medium', 'High', 'Urgent');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
    CREATE TYPE subscription_status AS ENUM ('active', 'trialing', 'past_due', 'cancelled', 'expired', 'paused');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ==============================================================================
-- 2. ORGANIZATIONS & MULTI-TENANCY
-- ==============================================================================
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('brand', 'agency', 'creator_group')),
    billing_email TEXT,
    logo_url TEXT,
    settings JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 2.1 SUBSCRIPTIONS & PBAC TIERS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    role user_role NOT NULL DEFAULT 'creator',
    plan_id TEXT NOT NULL,
    status subscription_status NOT NULL DEFAULT 'active',
    interval TEXT NOT NULL DEFAULT 'monthly' CHECK (interval IN ('monthly', 'annual')),
    current_period_start TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    current_period_end TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now() + interval '30 days') NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    price NUMERIC(10, 2) DEFAULT 0.00,
    currency TEXT DEFAULT 'USD',
    features JSONB DEFAULT '{}'::JSONB,
    usage JSONB DEFAULT '{"activeCampaignsCount":0,"applicationsThisMonth":0,"crmContactsCount":0,"aiTokensUsed":0}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);


-- ==============================================================================
-- 3. USERS & PROFILES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role user_role NOT NULL DEFAULT 'creator',
    name TEXT NOT NULL,
    avatar_url TEXT,
    verified BOOLEAN DEFAULT FALSE,
    phone TEXT,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending_verification', 'deleted')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS organization_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'brand_member',
    permissions TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(organization_id, profile_id)
);

-- ==============================================================================
-- 4. CREATOR PROFILES & DETAILS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS creator_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    handle TEXT UNIQUE NOT NULL,
    headline TEXT NOT NULL,
    bio TEXT NOT NULL,
    cover_image_url TEXT,
    location TEXT NOT NULL,
    languages TEXT[] DEFAULT ARRAY['English'],
    primary_category TEXT NOT NULL,
    secondary_categories TEXT[] DEFAULT ARRAY[]::TEXT[],
    tier creator_tier DEFAULT 'Micro',
    rating NUMERIC(3, 2) DEFAULT 5.00 CHECK (rating >= 0 AND rating <= 5),
    completed_campaigns_count INTEGER DEFAULT 0 CHECK (completed_campaigns_count >= 0),
    total_followers BIGINT DEFAULT 0 CHECK (total_followers >= 0),
    avg_engagement_rate NUMERIC(4, 2) DEFAULT 0.00 CHECK (avg_engagement_rate >= 0),
    starting_price NUMERIC(10, 2) DEFAULT 500.00 CHECK (starting_price >= 0),
    available_for_hire BOOLEAN DEFAULT TRUE,
    featured BOOLEAN DEFAULT FALSE,
    verified BOOLEAN DEFAULT FALSE,
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    audience_demographics JSONB DEFAULT '{}'::JSONB,
    profile_completeness INTEGER DEFAULT 100,
    quality_score INTEGER DEFAULT 95,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS social_accounts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
    platform platform_type NOT NULL,
    handle TEXT NOT NULL,
    url TEXT NOT NULL,
    followers BIGINT DEFAULT 0 CHECK (followers >= 0),
    engagement_rate NUMERIC(4, 2) DEFAULT 0.00 CHECK (engagement_rate >= 0),
    avg_views BIGINT DEFAULT 0 CHECK (avg_views >= 0),
    verified_badge BOOLEAN DEFAULT FALSE,
    oauth_token_encrypted TEXT,
    oauth_refresh_token_encrypted TEXT,
    token_expires_at TIMESTAMP WITH TIME ZONE,
    last_synced_at TIMESTAMP WITH TIME ZONE,
    sync_status TEXT DEFAULT 'idle',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS creator_rate_cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
    deliverable_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    base_price NUMERIC(10, 2) NOT NULL CHECK (base_price >= 0),
    turnaround_days INTEGER DEFAULT 7,
    revisions_included INTEGER DEFAULT 2,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS creator_portfolio_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    brand_name TEXT NOT NULL,
    deliverable_type TEXT NOT NULL,
    media_url TEXT NOT NULL,
    thumbnail_url TEXT,
    metrics JSONB DEFAULT '{}'::JSONB,
    testimonial JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 5. BRAND PROFILES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS brand_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    company_name TEXT NOT NULL,
    industry TEXT NOT NULL,
    headline TEXT NOT NULL,
    description TEXT NOT NULL,
    logo_url TEXT,
    cover_image_url TEXT,
    website_url TEXT,
    location TEXT NOT NULL,
    company_size TEXT DEFAULT '11-50',
    verified BOOLEAN DEFAULT FALSE,
    active_campaigns_count INTEGER DEFAULT 0 CHECK (active_campaigns_count >= 0),
    total_spent NUMERIC(12, 2) DEFAULT 0.00 CHECK (total_spent >= 0),
    social_handles JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 6. CAMPAIGNS & REQUIREMENTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brand_profiles(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    target_locations TEXT[] DEFAULT ARRAY['Worldwide'],
    target_age_ranges TEXT[] DEFAULT ARRAY['18-24', '25-34'],
    target_gender TEXT DEFAULT 'All',
    target_interests TEXT[] DEFAULT ARRAY[]::TEXT[],
    min_followers BIGINT DEFAULT 10000 CHECK (min_followers >= 0),
    max_followers BIGINT,
    min_engagement_rate NUMERIC(4, 2) DEFAULT 3.00 CHECK (min_engagement_rate >= 0),
    required_platforms platform_type[] DEFAULT ARRAY['instagram'::platform_type],
    preferred_tiers creator_tier[] DEFAULT ARRAY['Micro'::creator_tier],
    languages TEXT[] DEFAULT ARRAY['English'],
    total_budget NUMERIC(12, 2) NOT NULL CHECK (total_budget >= 0),
    per_creator_budget NUMERIC(10, 2) NOT NULL CHECK (per_creator_budget >= 0),
    currency TEXT DEFAULT 'USD',
    payment_terms TEXT DEFAULT '50_50_escrow',
    performance_bonus TEXT,
    application_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    content_submission_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    campaign_end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    status campaign_status DEFAULT 'active',
    applicants_count INTEGER DEFAULT 0 CHECK (applicants_count >= 0),
    accepted_count INTEGER DEFAULT 0 CHECK (accepted_count >= 0),
    max_creators INTEGER DEFAULT 5 CHECK (max_creators >= 1),
    cover_image TEXT,
    featured BOOLEAN DEFAULT FALSE,
    match_score INTEGER DEFAULT 85,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS campaign_deliverable_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    deliverable_type TEXT NOT NULL,
    count INTEGER DEFAULT 1 CHECK (count >= 1),
    guidelines TEXT NOT NULL,
    specifications TEXT[] DEFAULT ARRAY[]::TEXT[],
    max_revisions INTEGER DEFAULT 2 CHECK (max_revisions >= 0)
);

-- ==============================================================================
-- 7. APPLICATIONS, OFFERS & SHORTLISTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS campaign_applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
    pitch TEXT NOT NULL,
    proposed_fee NUMERIC(10, 2) NOT NULL CHECK (proposed_fee >= 0),
    estimated_reach BIGINT DEFAULT 0 CHECK (estimated_reach >= 0),
    status application_status DEFAULT 'pending',
    sample_links TEXT[] DEFAULT ARRAY[]::TEXT[],
    match_score INTEGER DEFAULT 85,
    counter_offer JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(campaign_id, creator_id)
);

CREATE TABLE IF NOT EXISTS creator_shortlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brand_profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS shortlist_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    shortlist_id UUID NOT NULL REFERENCES creator_shortlists(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
    notes TEXT,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(shortlist_id, creator_id)
);

CREATE TABLE IF NOT EXISTS crm_contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    brand_id UUID NOT NULL REFERENCES brand_profiles(id) ON DELETE CASCADE,
    creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
    stage TEXT DEFAULT 'Prospect',
    tags TEXT[] DEFAULT ARRAY[]::TEXT[],
    past_campaigns_count INTEGER DEFAULT 0 CHECK (past_campaigns_count >= 0),
    total_paid NUMERIC(12, 2) DEFAULT 0.00 CHECK (total_paid >= 0),
    last_contacted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(brand_id, creator_id)
);

CREATE TABLE IF NOT EXISTS crm_notes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    contact_id UUID NOT NULL REFERENCES crm_contacts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 8. COLLABORATIONS & DELIVERABLES
-- ==============================================================================
CREATE TABLE IF NOT EXISTS collaborations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE RESTRICT,
    brand_id UUID NOT NULL REFERENCES brand_profiles(id) ON DELETE RESTRICT,
    creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE RESTRICT,
    total_agreed_budget NUMERIC(10, 2) NOT NULL CHECK (total_agreed_budget >= 0),
    escrow_status escrow_status DEFAULT 'held_in_escrow',
    status collaboration_status DEFAULT 'active',
    payment_status TEXT DEFAULT 'payment_pending',
    is_funded BOOLEAN DEFAULT FALSE,
    funded_at TIMESTAMP WITH TIME ZONE,
    posting_deadline TIMESTAMP WITH TIME ZONE,
    grace_period_hours INTEGER DEFAULT 24,
    is_overdue BOOLEAN DEFAULT FALSE,
    review_window_hours INTEGER DEFAULT 120,
    review_deadline TIMESTAMP WITH TIME ZONE,
    posting_requirements JSONB,
    verification_proof JSONB,
    cancellation_details JSONB,
    start_date TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    final_deadline TIMESTAMP WITH TIME ZONE NOT NULL,
    agency_manager JSONB,
    agreement_terms JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS collaboration_deliverables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collaboration_id UUID NOT NULL REFERENCES collaborations(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    status deliverable_status DEFAULT 'assigned',
    due_date TIMESTAMP WITH TIME ZONE NOT NULL,
    payout_amount NUMERIC(10, 2) NOT NULL CHECK (payout_amount >= 0),
    revision_count INTEGER DEFAULT 0 CHECK (revision_count >= 0),
    max_revisions INTEGER DEFAULT 2 CHECK (max_revisions >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS content_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    deliverable_id UUID NOT NULL REFERENCES collaboration_deliverables(id) ON DELETE CASCADE,
    version INTEGER DEFAULT 1 CHECK (version >= 1),
    asset_url TEXT NOT NULL CHECK (asset_url LIKE 'https://%'),
    notes TEXT,
    media_urls TEXT[] DEFAULT '{}'::TEXT[],
    caption_text TEXT,
    tracking_link TEXT,
    creator_notes TEXT,
    feedback TEXT,
    status deliverable_status DEFAULT 'under_review',
    published_live_url TEXT,
    published_stats JSONB DEFAULT '{}'::JSONB,
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    sla_deadline TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS content_comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    submission_id UUID NOT NULL REFERENCES content_submissions(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    author_role user_role NOT NULL,
    author_avatar TEXT,
    timestamp_seconds NUMERIC(8, 2) DEFAULT 0,
    timestamp_label TEXT,
    comment TEXT NOT NULL,
    resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 9. MESSAGING & CHAT
-- ==============================================================================
CREATE TABLE IF NOT EXISTS conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    collaboration_id UUID REFERENCES collaborations(id) ON DELETE SET NULL,
    title TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS conversation_participants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(conversation_id, profile_id)
);

CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    attachments JSONB DEFAULT '[]'::JSONB,
    read_by UUID[] DEFAULT ARRAY[]::UUID[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 10. PAYMENTS, ORDERS, COMMISSIONS & PAYOUTS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS payments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    brand_id UUID NOT NULL REFERENCES brand_profiles(id) ON DELETE RESTRICT,
    campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
    collaboration_id UUID REFERENCES collaborations(id) ON DELETE SET NULL,
    provider TEXT NOT NULL DEFAULT 'razorpay', -- 'razorpay' | 'stripe'
    provider_order_id TEXT UNIQUE NOT NULL,
    provider_payment_id TEXT UNIQUE,
    amount NUMERIC(12, 2) NOT NULL CHECK (amount >= 0),
    currency TEXT DEFAULT 'INR',
    status payment_status DEFAULT 'pending',
    commission_rate NUMERIC(5, 2) DEFAULT 10.00,
    agency_fee NUMERIC(10, 2) DEFAULT 0.00,
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS payouts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE RESTRICT,
    collaboration_id UUID REFERENCES collaborations(id) ON DELETE RESTRICT,
    deliverable_id UUID REFERENCES collaboration_deliverables(id) ON DELETE SET NULL,
    payment_id UUID REFERENCES payments(id) ON DELETE SET NULL,
    gross_amount NUMERIC(10, 2) NOT NULL CHECK (gross_amount >= 0),
    agency_fee NUMERIC(10, 2) NOT NULL DEFAULT 0.00 CHECK (agency_fee >= 0),
    net_amount NUMERIC(10, 2) NOT NULL CHECK (net_amount >= 0),
    currency TEXT DEFAULT 'INR',
    status payout_status DEFAULT 'pending',
    provider TEXT DEFAULT 'razorpay_route',
    provider_payout_id TEXT UNIQUE,
    payment_method TEXT DEFAULT 'Bank Transfer (IMPS/NEFT)',
    paid_at TIMESTAMP WITH TIME ZONE,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS payment_webhook_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    provider TEXT NOT NULL,
    provider_event_id TEXT UNIQUE NOT NULL,
    event_type TEXT NOT NULL,
    payload JSONB NOT NULL,
    status TEXT DEFAULT 'processed',
    error TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS refunds (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    payment_id UUID NOT NULL REFERENCES payments(id) ON DELETE RESTRICT,
    amount NUMERIC(10, 2) NOT NULL CHECK (amount >= 0),
    reason TEXT NOT NULL,
    provider_refund_id TEXT UNIQUE,
    status TEXT DEFAULT 'completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 11. NOTIFICATIONS & EMAIL
-- ==============================================================================
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    entity_type TEXT,
    entity_id TEXT,
    link_url TEXT,
    read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS email_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    recipient_email TEXT NOT NULL,
    template TEXT NOT NULL,
    provider_message_id TEXT UNIQUE,
    status TEXT DEFAULT 'sent',
    metadata JSONB DEFAULT '{}'::JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS device_tokens (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    platform TEXT NOT NULL CHECK (platform IN ('ios', 'android', 'web')),
    token TEXT UNIQUE NOT NULL,
    enabled BOOLEAN DEFAULT TRUE,
    last_seen_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 12. MEDIA ASSETS & STORAGE
-- ==============================================================================
CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    bucket TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size BIGINT NOT NULL CHECK (file_size >= 0),
    width INTEGER,
    height INTEGER,
    duration NUMERIC(8, 2),
    status TEXT DEFAULT 'ready',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 13. DISPUTES, SUPPORT & AUDIT LOGS
-- ==============================================================================
CREATE TABLE IF NOT EXISTS disputes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    collaboration_id UUID NOT NULL REFERENCES collaborations(id) ON DELETE RESTRICT,
    filed_by_id UUID NOT NULL REFERENCES profiles(id) ON DELETE RESTRICT,
    filed_by_role user_role NOT NULL,
    reason TEXT NOT NULL,
    description TEXT NOT NULL,
    amount_in_dispute NUMERIC(10, 2) NOT NULL CHECK (amount_in_dispute >= 0),
    status dispute_status DEFAULT 'Open',
    evidence_links TEXT[] DEFAULT ARRAY[]::TEXT[],
    admin_arbitration_notes TEXT,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS support_tickets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    subject TEXT NOT NULL,
    category TEXT NOT NULL,
    priority support_ticket_priority DEFAULT 'Medium',
    status support_ticket_status DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS support_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    ticket_id UUID NOT NULL REFERENCES support_tickets(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    actor_role user_role,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT NOT NULL,
    metadata JSONB DEFAULT '{}'::JSONB,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS ai_usage (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    feature TEXT NOT NULL,
    model TEXT NOT NULL,
    tokens INTEGER NOT NULL DEFAULT 0,
    estimated_cost NUMERIC(8, 5) DEFAULT 0.00000,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- 14. PERFORMANCE INDEXES
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_profiles_role ON profiles(role);
CREATE INDEX IF NOT EXISTS idx_creator_profiles_category ON creator_profiles(primary_category);
CREATE INDEX IF NOT EXISTS idx_creator_profiles_followers ON creator_profiles(total_followers DESC);
CREATE INDEX IF NOT EXISTS idx_creator_profiles_engagement ON creator_profiles(avg_engagement_rate DESC);
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON campaigns(status);
CREATE INDEX IF NOT EXISTS idx_campaigns_brand ON campaigns(brand_id);
CREATE INDEX IF NOT EXISTS idx_campaigns_category ON campaigns(category);
CREATE INDEX IF NOT EXISTS idx_applications_campaign ON campaign_applications(campaign_id);
CREATE INDEX IF NOT EXISTS idx_applications_creator ON campaign_applications(creator_id);
CREATE INDEX IF NOT EXISTS idx_collaborations_creator ON collaborations(creator_id);
CREATE INDEX IF NOT EXISTS idx_collaborations_brand ON collaborations(brand_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(conversation_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id, read, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(provider_order_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_actor ON audit_logs(actor_id, created_at DESC);

-- ==============================================================================
-- 15. ROW LEVEL SECURITY (RLS) POLICIES ON ALL TABLES
-- ==============================================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_rate_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_deliverable_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_shortlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE shortlist_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE crm_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborations ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaboration_deliverables ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_webhook_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE refunds ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE device_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE disputes ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_usage ENABLE ROW LEVEL SECURITY;

-- 1. Profiles & Public Directories
DO $$ BEGIN
    DROP POLICY IF EXISTS "Public profiles read" ON profiles;
    CREATE POLICY "Public profiles read" ON profiles FOR SELECT USING (true);
    
    DROP POLICY IF EXISTS "Users can update self profile" ON profiles;
    CREATE POLICY "Users can update self profile" ON profiles FOR UPDATE USING (auth.uid() = user_id);

    DROP POLICY IF EXISTS "Public creator profiles read" ON creator_profiles;
    CREATE POLICY "Public creator profiles read" ON creator_profiles FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Creators update self" ON creator_profiles;
    CREATE POLICY "Creators update self" ON creator_profiles FOR UPDATE USING (
        profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

    DROP POLICY IF EXISTS "Public social accounts read" ON social_accounts;
    CREATE POLICY "Public social accounts read" ON social_accounts FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public rate cards read" ON creator_rate_cards;
    CREATE POLICY "Public rate cards read" ON creator_rate_cards FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public portfolio read" ON creator_portfolio_items;
    CREATE POLICY "Public portfolio read" ON creator_portfolio_items FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public brand profiles read" ON brand_profiles;
    CREATE POLICY "Public brand profiles read" ON brand_profiles FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Brands update self" ON brand_profiles;
    CREATE POLICY "Brands update self" ON brand_profiles FOR UPDATE USING (
        profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );
END $$;

-- 2. Campaigns & Briefs
DO $$ BEGIN
    DROP POLICY IF EXISTS "Active campaigns viewable" ON campaigns;
    CREATE POLICY "Active campaigns viewable" ON campaigns FOR SELECT USING (
        status IN ('active', 'applications_open', 'completed') OR 
        brand_id IN (SELECT id FROM brand_profiles WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
    );

    DROP POLICY IF EXISTS "Brands manage campaigns" ON campaigns;
    CREATE POLICY "Brands manage campaigns" ON campaigns FOR ALL USING (
        brand_id IN (SELECT id FROM brand_profiles WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
    );

    DROP POLICY IF EXISTS "Applications viewable by creator or brand" ON campaign_applications;
    CREATE POLICY "Applications viewable by creator or brand" ON campaign_applications FOR SELECT USING (
        creator_id IN (SELECT id FROM creator_profiles WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())) OR
        campaign_id IN (SELECT id FROM campaigns WHERE brand_id IN (SELECT id FROM brand_profiles WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())))
    );

    DROP POLICY IF EXISTS "Creators submit applications" ON campaign_applications;
    CREATE POLICY "Creators submit applications" ON campaign_applications FOR INSERT WITH CHECK (
        creator_id IN (SELECT id FROM creator_profiles WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
    );
END $$;

-- 3. Collaborations & Deliverables
DO $$ BEGIN
    DROP POLICY IF EXISTS "Collaborations viewable by participants" ON collaborations;
    CREATE POLICY "Collaborations viewable by participants" ON collaborations FOR SELECT USING (
        creator_id IN (SELECT id FROM creator_profiles WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())) OR
        brand_id IN (SELECT id FROM brand_profiles WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
    );

    DROP POLICY IF EXISTS "Deliverables viewable by participants" ON collaboration_deliverables;
    CREATE POLICY "Deliverables viewable by participants" ON collaboration_deliverables FOR SELECT USING (
        collaboration_id IN (
            SELECT id FROM collaborations WHERE 
            creator_id IN (SELECT id FROM creator_profiles WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())) OR
            brand_id IN (SELECT id FROM brand_profiles WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
        )
    );
END $$;

-- 4. Messaging & Notifications
DO $$ BEGIN
    DROP POLICY IF EXISTS "Messages viewable by sender or recipient" ON messages;
    CREATE POLICY "Messages viewable by sender or recipient" ON messages FOR SELECT USING (
        conversation_id IN (
            SELECT cp.conversation_id FROM conversation_participants cp 
            WHERE cp.profile_id IN (SELECT p.id FROM profiles p WHERE p.user_id = auth.uid())
        ) OR 
        sender_id IN (SELECT p.id FROM profiles p WHERE p.user_id = auth.uid())
    );

    DROP POLICY IF EXISTS "Users read self notifications" ON notifications;
    CREATE POLICY "Users read self notifications" ON notifications FOR SELECT USING (
        user_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );
END $$;

-- 5. Financial & Auditing Records
DO $$ BEGIN
    DROP POLICY IF EXISTS "Payments viewable by brand owner" ON payments;
    CREATE POLICY "Payments viewable by brand owner" ON payments FOR SELECT USING (
        brand_id IN (SELECT id FROM brand_profiles WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
    );

    DROP POLICY IF EXISTS "Payouts viewable by creator" ON payouts;
    CREATE POLICY "Payouts viewable by creator" ON payouts FOR SELECT USING (
        creator_id IN (SELECT id FROM creator_profiles WHERE profile_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
    );

    DROP POLICY IF EXISTS "Disputes viewable by involved parties" ON disputes;
    CREATE POLICY "Disputes viewable by involved parties" ON disputes FOR SELECT USING (
        filed_by_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );
END $$;
