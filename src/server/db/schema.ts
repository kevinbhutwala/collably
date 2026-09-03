import {
  UserRole,
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
} from "@/core/types";

export interface UserEntity {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  avatarUrl?: string;
  verified?: boolean;
  createdAt: string;
  updatedAt: string;
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
  status: "pending" | "authorized" | "captured" | "failed" | "refund_pending" | "refunded";
  commissionRate: number;
  agencyFee: number;
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
}

