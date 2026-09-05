export type UserRole =
  | 'creator'
  | 'brand'
  | 'brand_owner'
  | 'brand_manager'
  | 'brand_member'
  | 'agency_admin'
  | 'agency_owner'
  | 'super_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  verified?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type CreatorCategory =
  | 'Technology & AI'
  | 'Design & Creative'
  | 'Fashion & Style'
  | 'Beauty & Skincare'
  | 'Fitness & Wellness'
  | 'Finance & Business'
  | 'Gaming & Esports'
  | 'Lifestyle & Travel'
  | 'Food & Culinary'
  | 'Education & Science';

export type PlatformType = 'youtube' | 'instagram' | 'tiktok' | 'x' | 'linkedin' | 'threads';

export interface SocialAccount {
  id: string;
  platform: PlatformType;
  handle: string;
  url: string;
  followers: number;
  engagementRate: number;
  avgViews: number;
  verifiedBadge: boolean;
}

export interface AudienceDemographics {
  topCountries: { country: string; percentage: number }[];
  ageDistribution: { range: string; percentage: number }[];
  genderSplit: { gender: 'Female' | 'Male' | 'Other'; percentage: number }[];
  interests: string[];
}

export interface RateCardItem {
  id: string;
  deliverableType: DeliverableType;
  title: string;
  description: string;
  basePrice: number;
  turnaroundDays: number;
  revisionsIncluded: number;
}

export interface CreatorPortfolioItem {
  id: string;
  title: string;
  brandName: string;
  deliverableType: DeliverableType;
  mediaUrl: string;
  thumbnailUrl: string;
  metrics: {
    views: number;
    engagementRate: number;
    likes: number;
    comments: number;
  };
  testimonial?: {
    brandRepName: string;
    brandCompany: string;
    comment: string;
    rating: number;
  };
}

export type CreatorTier = 'Nano' | 'Micro' | 'Rising' | 'Established' | 'Mid-Tier' | 'Macro' | 'Elite' | 'Premium';

export interface CreatorProfile {
  id: string;
  userId: string;
  fullName: string;
  handle: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  coverImageUrl: string;
  location: string;
  languages: string[];
  primaryCategory: CreatorCategory;
  secondaryCategories: CreatorCategory[];
  verified: boolean;
  featured: boolean;
  tier: CreatorTier;
  rating: number;
  completedCampaignsCount: number;
  totalFollowers: number;
  avgEngagementRate: number;
  startingPrice: number;
  availableForHire: boolean;
  socialAccounts: SocialAccount[];
  audience: AudienceDemographics;
  rateCards: RateCardItem[];
  portfolio?: CreatorPortfolioItem[];
  profileCompleteness?: number;
  qualityScore?: number;
  createdAt?: string;
  updatedAt?: string;
  joinedDate?: string;
}

export interface CreatorFilterParams {
  category?: string;
  platform?: PlatformType | 'all';
  searchQuery?: string;
  minFollowers?: number;
  maxFollowers?: number;
  minEngagement?: number;
  minRate?: number;
  maxRate?: number;
  tier?: CreatorTier | 'all';
  verifiedOnly?: boolean;
}

export interface BrandProfile {
  id: string;
  userId: string;
  companyName: string;
  industry: string;
  headline: string;
  description: string;
  logoUrl: string;
  coverImageUrl: string;
  websiteUrl: string;
  location: string;
  companySize: string;
  verified: boolean;
  activeCampaignsCount: number;
  totalSpent: number;
  socialHandles: Partial<Record<PlatformType, string>>;
  createdAt: string;
}

export type DeliverableType =
  | 'Instagram Reel'
  | 'Instagram Story Set (3x)'
  | 'Instagram Dedicated Post'
  | 'YouTube Dedicated Video'
  | 'YouTube 60s Integration'
  | 'YouTube Short'
  | 'TikTok Video'
  | 'UGC Video Ad'
  | 'X (Twitter) Thread'
  | 'Keynote / Event Appearance';

export interface CampaignDeliverableReq {
  id: string;
  type: DeliverableType;
  count: number;
  guidelines: string;
  specifications: string[];
  maxRevisions: number;
}

export type CampaignStatus =
  | 'draft'
  | 'active'
  | 'in_review'
  | 'applications_open'
  | 'creators_selected'
  | 'in_production'
  | 'completed'
  | 'paused'
  | 'archived'
  | 'cancelled';

export interface Campaign {
  id: string;
  brandId: string;
  brand: BrandProfile;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  category: CreatorCategory;
  targetAudience: {
    locations: string[];
    ageRanges: string[];
    gender: 'All' | 'Female' | 'Male' | 'Mixed';
    interests: string[];
  };
  creatorRequirements: {
    minFollowers: number;
    maxFollowers?: number;
    minEngagementRate: number;
    platforms: PlatformType[];
    languages: string[];
    preferredTiers: CreatorTier[];
  };
  deliverables: CampaignDeliverableReq[];
  budget: {
    totalBudget: number;
    perCreatorBudget: number;
    currency: 'USD';
    paymentTerms: '50_50_escrow' | '100_escrow_on_approval' | 'milestone';
    performanceBonus?: string;
  };
  timeline: {
    applicationDeadline: string;
    startDate: string;
    contentSubmissionDeadline: string;
    campaignEndDate: string;
  };
  status: CampaignStatus;
  applicantsCount: number;
  acceptedCount: number;
  maxCreators: number;
  coverImage: string;
  featured: boolean;
  matchScore?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CampaignFilterParams {
  category?: string;
  status?: CampaignStatus | 'all';
  searchQuery?: string;
  minBudget?: number;
  maxBudget?: number;
  platform?: string;
}

export type ApplicationStatus = 'pending' | 'shortlisted' | 'accepted' | 'rejected' | 'negotiating';

export interface CampaignApplication {
  id: string;
  campaignId: string;
  campaignTitle: string;
  brandId: string;
  brandName: string;
  brandLogo: string;
  creatorId: string;
  creator: CreatorProfile;
  pitch: string;
  proposedFee: number;
  estimatedReach: number;
  status: ApplicationStatus;
  sampleLinks: string[];
  matchScore: number;
  counterOffer?: {
    proposedFee: number;
    notes: string;
    proposedBy: 'brand' | 'creator';
  };
  createdAt: string;
  updatedAt: string;
}

export type DeliverableStatus =
  | 'draft'
  | 'assigned'
  | 'in_progress'
  | 'submitted'
  | 'under_review'
  | 'revision_requested'
  | 'approved'
  | 'published'
  | 'completed';

export interface TimecodedComment {
  id: string;
  timestampSeconds: number;
  timestampLabel: string;
  authorName: string;
  authorRole: UserRole;
  authorAvatar: string;
  comment: string;
  resolved: boolean;
  createdAt: string;
}

export interface DeliverableSubmission {
  id: string;
  deliverableId: string;
  version: number;
  assetUrl: string;
  notes?: string;
  mediaUrls?: string[];
  captionText?: string;
  trackingLink?: string;
  submittedAt: string;
  slaDeadline?: string;
  creatorNotes?: string;
  feedback?: string;
  status: DeliverableStatus;
  timecodedComments?: TimecodedComment[];
  publishedLiveUrl?: string;
  publishedStats?: {
    views: number;
    likes: number;
    comments: number;
    shares: number;
    clicks: number;
  };
}

export interface CollaborationDeliverableItem {
  id: string;
  type: DeliverableType;
  title: string;
  status: DeliverableStatus;
  dueDate: string;
  payoutAmount: number;
  revisionCount: number;
  maxRevisions: number;
  assetUrl?: string;
  notes?: string;
  submittedAt?: string;
  slaDeadline?: string;
  submissions: DeliverableSubmission[];
}

export type CollaborationPaymentStatus =
  | 'payment_pending'
  | 'payment_funded'
  | 'payment_secured'
  | 'work_in_progress'
  | 'submitted_for_review'
  | 'revision_requested'
  | 'approved'
  | 'posted'
  | 'payout_processing'
  | 'paid'
  | 'disputed'
  | 'refund_pending'
  | 'refunded'
  | 'cancelled'
  | 'expired'
  | 'overdue';

export type CollaborationStatus =
  | 'payment_pending'
  | 'payment_funded'
  | 'payment_secured'
  | 'work_in_progress'
  | 'submitted_for_review'
  | 'revision_requested'
  | 'approved'
  | 'posted'
  | 'payout_processing'
  | 'paid'
  | 'disputed'
  | 'refund_pending'
  | 'refunded'
  | 'cancelled'
  | 'expired'
  | 'overdue'
  | 'active'
  | 'in_review'
  | 'completed';

export interface NegotiationOffer {
  id: string;
  senderRole: UserRole;
  senderName: string;
  amount: number;
  deliverableTerms: string;
  notes: string;
  status: 'offered' | 'countered' | 'accepted' | 'declined';
  createdAt: string;
}

export interface PostingVerificationProof {
  postUrl: string;
  platform?: PlatformType;
  screenshotUrl?: string;
  publishedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  status: 'pending' | 'verified' | 'rejected';
  notes?: string;
  metrics?: {
    views?: number;
    likes?: number;
    comments?: number;
    shares?: number;
  };
}

export interface CollaborationCancellationDetails {
  cancelledBy: string;
  cancelledByRole: UserRole;
  cancelledAt: string;
  stage: 'before_acceptance' | 'before_work' | 'work_in_progress' | 'submitted' | 'posted' | 'overdue';
  reason: string;
  refundPercentToBrand: number;
  killFeePercentToCreator: number;
  refundAmountDollars: number;
  killFeeAmountDollars: number;
  transactionId?: string;
}

export interface Collaboration {
  id: string;
  campaignId: string;
  campaignTitle: string;
  brandId: string;
  brand: BrandProfile;
  creatorId: string;
  creator: CreatorProfile;
  totalAgreedBudget: number;
  escrowStatus: 'pending_deposit' | 'held_in_escrow' | 'partially_released' | 'fully_released' | 'refunded';
  status: CollaborationStatus;
  paymentStatus?: CollaborationPaymentStatus;
  isFunded?: boolean;
  fundedAt?: string;
  paymentExpiresAt?: string;
  postingDeadline?: string;
  gracePeriodHours?: number;
  isOverdue?: boolean;
  reviewWindowHours?: number;
  reviewDeadline?: string;
  postingRequirements?: {
    platforms: PlatformType[];
    requiredHashtags: string[];
    requiredMentions: string[];
    trackingLink?: string;
    guidelines?: string;
  };
  verificationProof?: PostingVerificationProof;
  cancellationDetails?: CollaborationCancellationDetails;
  startDate: string;
  finalDeadline: string;
  deliverables: CollaborationDeliverableItem[];
  negotiationHistory?: NegotiationOffer[];
  agencyManager?: {
    name: string;
    email: string;
    avatarUrl: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: UserRole;
  senderName: string;
  senderAvatar: string;
  content: string;
  attachments?: {
    type: 'image' | 'video' | 'file';
    url: string;
    name: string;
    size?: string;
  }[];
  readBy: string[];
  reactions?: {
    emoji: string;
    count: number;
    users: string[];
  }[];
  createdAt: string;
}

export interface Conversation {
  id: string;
  campaignId?: string;
  campaignTitle: string;
  participants: {
    userId: string;
    name: string;
    role: UserRole;
    avatarUrl: string;
  }[];
  lastMessage?: {
    content: string;
    senderName: string;
    createdAt: string;
  };
  unreadCount: number;
  updatedAt: string;
}

export interface PayoutRecord {
  id: string;
  creatorId?: string;
  campaignId?: string;
  collaborationId: string;
  campaignTitle: string;
  brandName: string;
  creatorName: string;
  deliverableTitle: string;
  grossAmount: number;
  agencyFee: number;
  netAmount: number;
  status: 'pending' | 'escrow_locked' | 'processing' | 'paid' | 'refunded';
  paymentMethod: string;
  createdAt: string;
  releasedAt?: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'application' | 'campaign' | 'deliverable' | 'payment' | 'system' | 'dispute';
  entityType?: string;
  entityId?: string;
  linkUrl?: string;
  read: boolean;
  createdAt: string;
}

// CRM & Shortlists
export type CRMStage = 'Prospect' | 'Outreach' | 'Negotiating' | 'Active_Partner' | 'Preferred' | 'Dormant';

export interface CRMContact {
  id: string;
  creatorId: string;
  creator: CreatorProfile;
  brandId: string;
  stage: CRMStage;
  tags: string[];
  privateNotes: {
    id: string;
    authorName: string;
    content: string;
    createdAt: string;
  }[];
  pastCampaignsCount: number;
  totalPaid: number;
  lastContactedAt: string;
}

export interface CreatorShortlist {
  id: string;
  brandId: string;
  name: string;
  description: string;
  creatorIds: string[];
  creators: CreatorProfile[];
  createdAt: string;
  updatedAt: string;
}

// Support & Disputes
export type DisputeReason =
  | 'Scope_Mismatch'
  | 'Quality_Standards'
  | 'Missed_Deadline'
  | 'Payment_Dispute'
  | 'Usage_Rights_Violation'
  | 'Unresponsive_Party'
  | 'Late_Submission'
  | 'Unauthorized_Content';

export type DisputeStatus =
  | 'Open'
  | 'Under_Review'
  | 'Evidence_Requested'
  | 'Decision'
  | 'Resolved'
  | 'Under_Investigation'
  | 'Evidence_Submitted'
  | 'Closed';

export type DisputeResolutionOutcome =
  | 'FULL_CREATOR_PAYOUT'
  | 'PARTIAL_CREATOR_PAYOUT'
  | 'FULL_BRAND_REFUND'
  | 'SPLIT_SETTLEMENT'
  | 'ADDITIONAL_REVISION'
  | 'CANCELLATION_WITHOUT_PAYOUT';

export interface DisputeEvidenceAttachment {
  id: string;
  url: string;
  title: string;
  submittedBy: string;
  submittedAt: string;
  role?: UserRole;
  notes?: string;
}

export interface DisputeResolutionDetails {
  outcome: DisputeResolutionOutcome;
  brandRefundDollars: number;
  creatorPayoutDollars: number;
  platformFeeDollars: number;
  notes: string;
  resolvedBy: string;
  resolvedAt: string;
  transactionId?: string;
}

export interface DisputeRecord {
  id: string;
  collaborationId: string;
  campaignTitle: string;
  brandName: string;
  creatorName: string;
  creatorUserId?: string;
  brandUserId?: string;
  filedByUserId?: string;
  reason: DisputeReason;
  description: string;
  amountInDispute: number;
  filedBy: UserRole;
  status: DisputeStatus;
  stage?: 'Open' | 'Under_Review' | 'Evidence_Requested' | 'Decision' | 'Resolved';
  evidenceLinks: string[];
  evidenceAttachments?: DisputeEvidenceAttachment[];
  resolutionOutcome?: DisputeResolutionOutcome;
  resolutionDetails?: DisputeResolutionDetails;
  adminArbitrationNotes?: string;
  resolvedAt?: string;
  createdAt: string;
  updatedAt?: string;
}

// Trust & Safety / Reliability Score
export type ReliabilityTier = 'Elite' | 'Trusted' | 'Good' | 'At_Risk' | 'Suspended';

export interface UserReliabilityScore {
  userId: string;
  role: 'creator' | 'brand';
  score: number; // 0 to 100
  tier: ReliabilityTier;
  metrics: {
    totalCollaborations: number;
    onTimeCompletions: number;
    missedDeadlines: number;
    disputesInitiated: number;
    disputesLost: number;
    cancellations: number;
    avgReviewResponseHours?: number;
  };
  lastCalculatedAt: string;
}

export interface SupportTicket {
  id: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  subject: string;
  category: 'Billing' | 'Technical' | 'Campaign_Help' | 'Account_Verification' | 'Other';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  status: 'Open' | 'In_Progress' | 'Waiting_On_User' | 'Resolved';
  messages: {
    id: string;
    senderName: string;
    senderRole: UserRole;
    content: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
}

// Audit Logging
export interface AuditEvent {
  id: string;
  actorId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  entityType: 'Campaign' | 'Collaboration' | 'Deliverable' | 'Payment' | 'Creator' | 'Brand' | 'Dispute';
  entityId: string;
  entityName: string;
  metadata?: Record<string, any>;
  ipAddress?: string;
  createdAt: string;
}

// Feature Flags
export interface FeatureFlagConfig {
  ai_matching: boolean;
  ai_assistant: boolean;
  payments_escrow: boolean;
  creator_verification: boolean;
  timecoded_video_review: boolean;
  dispute_management: boolean;
  advanced_analytics: boolean;
}

export interface PlatformAnalyticsOverview {
  totalGMV: number;
  activeCampaigns: number;
  activeCollaborations: number;
  creatorsCount: number;
  brandsCount: number;
  avgCreatorEarnings: number;
  avgBrandROI: number;
  impressionsDelivered: number;
  monthlyRevenueSeries: { month: string; revenue: number; gmv: number }[];
  categoryDistribution: { category: string; percentage: number }[];
}

// =============================================================================
// SUBSCRIPTION & PLAN-BASED ACCESS CONTROL (PBAC) TYPES
// =============================================================================

export type CreatorPlanId = 'creator_starter' | 'creator_pro' | 'creator_enterprise';
export type BrandPlanId = 'brand_starter' | 'brand_growth' | 'brand_enterprise';
export type SubscriptionPlanId = CreatorPlanId | BrandPlanId;

export type SubscriptionStatus =
  | 'active'
  | 'trialing'
  | 'past_due'
  | 'cancelled'
  | 'expired'
  | 'paused';

export type SubscriptionInterval = 'monthly' | 'annual';

export type PlanFeatureKey =
  | 'mediaKit'
  | 'campaignApplications'
  | 'instantPayouts'
  | 'advancedAnalytics'
  | 'aiPitchGenerator'
  | 'verifiedBadge'
  | 'priorityDiscovery'
  | 'multiCreatorManagement'
  | 'customDomain'
  | 'activeCampaigns'
  | 'crmPipeline'
  | 'aiCreatorMatching'
  | 'creatorShortlists'
  | 'teamSeats'
  | 'advancedRoiTelemetry'
  | 'contractCompliance'
  | 'dedicatedAccountManager'
  | 'apiAccess'
  | 'adminOverride';

export interface PlanFeatureSet {
  // Creator Capabilities
  mediaKit: boolean;
  maxApplicationsPerMonth: number; // -1 for unlimited
  instantPayouts: boolean;
  advancedAnalytics: boolean;
  aiPitchGenerator: boolean;
  verifiedBadge: boolean;
  priorityDiscovery: boolean;
  multiCreatorManagement: boolean;
  customDomain: boolean;

  // Brand Capabilities
  maxActiveCampaigns: number; // -1 for unlimited
  crmPipeline: boolean;
  aiCreatorMatching: boolean;
  creatorShortlists: boolean;
  maxTeamSeats: number; // -1 for unlimited
  advancedRoiTelemetry: boolean;
  contractCompliance: boolean;
  dedicatedAccountManager: boolean;
  apiAccess: boolean;

  // System Overrides
  adminOverride?: boolean;
}

export interface PlanUsageStats {
  activeCampaignsCount: number;
  applicationsThisMonth: number;
  crmContactsCount: number;
  aiTokensUsed: number;
  lastResetDate: string;
}

export interface SubscriptionPlan {
  id: SubscriptionPlanId;
  name: string;
  badge: string;
  role: 'creator' | 'brand';
  monthlyPrice: number;
  annualPrice: number; // per month when billed annually
  description: string;
  highlight?: boolean;
  features: PlanFeatureSet;
  featureBullets: string[];
  limitations?: string[];
}

export interface SubscriptionEntity {
  id: string;
  userId: string;
  organizationId?: string;
  role: UserRole;
  planId: SubscriptionPlanId;
  status: SubscriptionStatus;
  interval: SubscriptionInterval;
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
  price: number;
  currency: string;
  features: PlanFeatureSet;
  usage: PlanUsageStats;
  createdAt: string;
  updatedAt: string;
}

