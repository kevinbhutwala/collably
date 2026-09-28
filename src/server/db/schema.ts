import {
  UserRole,
  CurrencyCode,
  CreatorProfile,
  BrandProfile,
  Campaign,
  Collaboration,
  CampaignApplication,
  CRMContact,
  CreatorShortlist,
  DisputeRecord,
  SupportTicket,
  AuditEvent,
  PayoutRecord,
  NotificationItem,
  ChatMessage,
  Conversation,
  SubscriptionEntity,
  UserReliabilityScore,
  PlatformMetricEntity,
  AlgorithmWeightsConfig,
  UserBadgeEntity,
  SuspiciousActivityRecord,
  FeatureFlagConfig,
} from "@/core/types";


export interface UserEntity {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  avatarUrl?: string;
  verified?: boolean;
  preferredCurrency?: CurrencyCode;
  preferred_currency?: CurrencyCode;
  country?: string;
  gender?: "male" | "female" | "other" | string;
  lastLoginAt?: string;
  lastActiveAt?: string;
  passwordResetAt?: string;
  createdAt: string;
  updatedAt: string;
}

/** Secure password-reset token record stored in the DB (only the SHA-256 hash is kept, never the raw token). */
export interface PasswordResetTokenEntity {
  /** SHA-256 hash of the raw token (the raw token is only ever in the signed URL). */
  tokenHash: string;
  userId: string;
  email: string;
  /** ISO 8601 expiry — 1 hour from creation. */
  expiresAt: string;
  /** Set when the token has been consumed. Cannot be reused. */
  usedAt?: string;
  createdAt: string;
  /** Tracks how many reset emails have been sent to this email in the last hour for rate-limiting. */
  requestCount?: number;
}

export interface PaymentEntity {
  id: string;
  organizationId?: string;
  brandId: string;
  campaignId?: string;
  collaborationId?: string;
  provider: "razorpay" | "stripe";
  providerOrderId: string;
  providerPaymentId?: string;
  amount: number;
  currency: string;
  settlementAmount?: number;
  settlementCurrency?: string;
  exchangeRateUsed?: number;
  status: "pending" | "authorized" | "captured" | "failed" | "refund_pending" | "refunded";
  commissionRate: number;
  agencyFee: number;
  environment?: "test" | "live";
  isTest?: boolean;
  metadata?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
}

export interface MediaAssetEntity {
  id: string;
  ownerId: string;
  organizationId?: string;
  bucket: string;
  storagePath: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  width?: number;
  height?: number;
  duration?: number;
  status: "ready" | "processing" | "failed";
  createdAt: string;
  updatedAt: string;
}

export interface WebhookEventEntity {
  id: string;
  provider: string;
  providerEventId: string;
  eventType: string;
  payload: any;
  status: "processed" | "failed" | "ignored";
  error?: string;
  createdAt: string;
}

export interface AIUsageEntity {
  id: string;
  userId?: string;
  organizationId?: string;
  feature: string;
  model: string;
  tokens: number;
  estimatedCost: number;
  createdAt: string;
}

export interface DatabaseState {
  users: UserEntity[];
  creators: CreatorProfile[];
  brands: BrandProfile[];
  campaigns: Campaign[];
  applications: CampaignApplication[];
  collaborations: Collaboration[];
  payouts: PayoutRecord[];
  payments: PaymentEntity[];
  subscriptions: SubscriptionEntity[];
  mediaAssets: MediaAssetEntity[];
  conversations: Conversation[];
  messages: ChatMessage[];
  notifications: NotificationItem[];
  webhookEvents: WebhookEventEntity[];
  aiUsage: AIUsageEntity[];
  crmContacts: CRMContact[];
  shortlists: CreatorShortlist[];
  disputes: DisputeRecord[];
  tickets: SupportTicket[];
  auditLogs: AuditEvent[];
  ledgerEntries: any[];
  reliabilityScores?: UserReliabilityScore[];
  platformMetrics?: PlatformMetricEntity[];
  algorithmConfig?: AlgorithmWeightsConfig;
  userBadges?: UserBadgeEntity[];
  suspiciousActivities?: SuspiciousActivityRecord[];
  featureFlags?: FeatureFlagConfig;
  passwordResetTokens?: PasswordResetTokenEntity[];
}


