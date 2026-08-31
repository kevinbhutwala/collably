import { NotificationItem, PlatformAnalyticsOverview } from "../core/types";

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    userId: "user-c1",
    type: "payment",
    title: "Tranche Payout Released",
    message: "Linear Marketing released $2,500 for deliverable 'Dedicated AI Triage 60s Segment'.",
    linkUrl: "/app/collaborations",
    read: false,
    createdAt: "2026-08-28T16:50:00Z",
  },
  {
    id: "notif-2",
    userId: "user-c1",
    type: "campaign",
    title: "Direct Campaign Invitation",
    message: "Aethel Watches invited you to collaborate on 'The Architecture of Time' with a $3,500 offer.",
    linkUrl: "/app/campaigns",
    read: false,
    createdAt: "2026-08-27T10:15:00Z",
  },
  {
    id: "notif-3",
    userId: "user-b1",
    type: "deliverable",
    title: "New Deliverable Submitted",
    message: "Elena Rostova submitted a rough cut for 'Dedicated AI Triage 60s Segment'.",
    linkUrl: "/app/collaborations",
    read: true,
    createdAt: "2026-08-28T14:32:00Z",
  },
  {
    id: "notif-4",
    userId: "user-c1",
    type: "system",
    title: "New Message from Linear Marketing",
    message: "The rough cut draft looks incredible! We just left 1 tiny note...",
    linkUrl: "/app/messages",
    read: false,
    createdAt: "2026-08-28T16:45:00Z",
  }
];

export const MOCK_ANALYTICS: PlatformAnalyticsOverview = {
  totalGMV: 4850000,
  activeCampaigns: 48,
  activeCollaborations: 124,
  creatorsCount: 1420,
  brandsCount: 230,
  avgCreatorEarnings: 6850,
  avgBrandROI: 4.8,
  impressionsDelivered: 84500000,
  monthlyRevenueSeries: [
    { month: "Mar", revenue: 42000, gmv: 350000 },
    { month: "Apr", revenue: 58000, gmv: 480000 },
    { month: "May", revenue: 74000, gmv: 620000 },
    { month: "Jun", revenue: 92000, gmv: 780000 },
    { month: "Jul", revenue: 118000, gmv: 980000 },
    { month: "Aug", revenue: 146000, gmv: 1250000 },
  ],
  categoryDistribution: [
    { category: "Technology & AI", percentage: 32 },
    { category: "Fashion & Style", percentage: 22 },
    { category: "Fitness & Wellness", percentage: 18 },
    { category: "Beauty & Skincare", percentage: 14 },
    { category: "Lifestyle & Travel", percentage: 14 },
  ],
};
