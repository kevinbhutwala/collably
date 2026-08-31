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
  mediaUrls: string[];
  captionText: string;
  trackingLink?: string;
  submittedAt: string;
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
  submissions: DeliverableSubmission[];
}

export type CollaborationStatus = 'active' | 'in_review' | 'completed' | 'cancelled' | 'disputed';

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

export interface Collaboration {
  id: string;
  campaignId: string;
  campaignTitle: string;
  brandId: string;
  brand: BrandProfile;
  creatorId: string;
  creator: CreatorProfile;
  totalAgreedBudget: number;
  escrowStatus: 'held_in_escrow' | 'partially_released' | 'fully_released' | 'refunded';
  status: CollaborationStatus;
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
export type DisputeReason = 'Scope_Mismatch' | 'Quality_Standards' | 'Missed_Deadline' | 'Payment_Dispute' | 'Usage_Rights_Violation';
export type DisputeStatus = 'Open' | 'Under_Investigation' | 'Evidence_Submitted' | 'Resolved' | 'Closed';

export interface DisputeRecord {
  id: string;
  collaborationId: string;
  campaignTitle: string;
  brandName: string;
  creatorName: string;
  reason: DisputeReason;
  description: string;
  amountInDispute: number;
  filedBy: UserRole;
  status: DisputeStatus;
  evidenceLinks: string[];
  adminArbitrationNotes?: string;
  resolvedAt?: string;
  createdAt: string;
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
