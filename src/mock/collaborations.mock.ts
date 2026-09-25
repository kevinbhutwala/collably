import { Collaboration } from "../core/types";
import { MOCK_BRANDS } from "./brands.mock";
import {
  ELENA_ROSTOVA_PROFILE,
  MARCUS_VANCE_PROFILE,
  ARIA_CHEN_PROFILE,
} from "./creators.mock";

export const MOCK_COLLABORATIONS: Collaboration[] = [
  {
    id: "collab-1",
    campaignId: "camp-1",
    campaignTitle: "Linear 2.0: High-Velocity Product Engineering",
    brandId: "brand-1",
    brand: MOCK_BRANDS[0],
    creatorId: "creator-demo",
    creator: ELENA_ROSTOVA_PROFILE,
    totalAgreedBudget: 3500,
    escrowStatus: "held_in_escrow",
    status: "active",
    paymentStatus: "submitted_for_review",
    isFunded: true,
    fundedAt: "2026-08-20T10:00:00Z",
    reviewWindowHours: 120,
    reviewDeadline: "2026-09-12T14:30:00Z",
    startDate: "2026-08-20",
    finalDeadline: "2026-10-10",
    deliverables: [
      {
        id: "collab-del-1",
        type: "YouTube 60s Integration",
        title: "Dedicated Linear 60s Integration in Main Video",
        status: "under_review",
        dueDate: "2026-09-10",
        payoutAmount: 2500,
        revisionCount: 1,
        maxRevisions: 2,
        submissions: [
          {
            id: "sub-1-1",
            deliverableId: "collab-del-1",
            version: 1,
            assetUrl: "https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9/view?usp=sharing",
            notes: "Draft rough cut uploaded for preview. The custom keyboard shortcut B-roll begins at 04:12.",
            mediaUrls: ["https://drive.google.com/file/d/1a2b3c4d5e6f7g8h9/view?usp=sharing"],
            captionText: "Special thanks to Linear for sponsoring this video. Check out how their new AI triage cuts backlog debt in half: https://linear.app #ad #linear",
            trackingLink: "https://linear.app",
            submittedAt: "2026-08-28T14:30:00Z",
            slaDeadline: "2026-09-02T14:30:00Z",
            creatorNotes: "Draft rough cut uploaded for preview. The custom keyboard shortcut B-roll begins at 04:12.",
            status: "under_review",
          }
        ]
      },
      {
        id: "collab-del-2",
        type: "X (Twitter) Thread",
        title: "Interactive AI Workflow Breakdown Thread",
        status: "assigned",
        dueDate: "2026-09-15",
        payoutAmount: 1000,
        revisionCount: 0,
        maxRevisions: 1,
        submissions: []
      }
    ],
    agencyManager: {
      name: "Siddharth Mehta",
      email: "partnerships@abeycollab.io",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    },
    createdAt: "2026-08-20",
    updatedAt: "2026-08-28",
  },
  {
    id: "collab-unfunded",
    campaignId: "camp-4",
    campaignTitle: "Design Systems & Interactive Prototyping Showcase",
    brandId: "brand-demo",
    brand: {
      ...MOCK_BRANDS[0],
      id: "brand-demo",
      userId: "user-brand",
      companyName: "Brand Partner",
      logoUrl: "/brands/linear.png",
      coverImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    },
    creatorId: "creator-demo",
    creator: ELENA_ROSTOVA_PROFILE,
    totalAgreedBudget: 2200,
    escrowStatus: "pending_deposit",
    status: "payment_pending",
    paymentStatus: "payment_pending",
    isFunded: false,
    startDate: "2026-09-01",
    finalDeadline: "2026-10-15",
    deliverables: [
      {
        id: "del-unfunded-1",
        type: "YouTube 60s Integration",
        title: "Figma Variables & Design Tokens Workflow",
        status: "draft",
        dueDate: "2026-09-25",
        payoutAmount: 2200,
        revisionCount: 0,
        maxRevisions: 2,
        submissions: [],
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "collab-2",
    campaignId: "camp-2",
    campaignTitle: "Connected Workspace & AI Docs Masterclass",
    brandId: "brand-2",
    brand: MOCK_BRANDS[1],
    creatorId: "creator-2",
    creator: MARCUS_VANCE_PROFILE,
    totalAgreedBudget: 2800,
    escrowStatus: "partially_released",
    status: "active",
    paymentStatus: "approved",
    isFunded: true,
    fundedAt: "2026-08-15T10:00:00Z",
    startDate: "2026-08-15",
    finalDeadline: "2026-10-05",
    deliverables: [
      {
        id: "collab-del-3",
        type: "Instagram Reel",
        title: "Connected Workspace Cinematic Productivity Reel",
        status: "approved",
        dueDate: "2026-08-25",
        payoutAmount: 2000,
        revisionCount: 1,
        maxRevisions: 2,
        submissions: [
          {
            id: "sub-2-1",
            deliverableId: "collab-del-3",
            version: 1,
            assetUrl: "https://app.frame.io/reviews/notion-workspace-cut",
            notes: "High-contrast editorial cut showing custom Notion project workspace.",
            mediaUrls: ["https://app.frame.io/reviews/notion-workspace-cut"],
            captionText: "Eliminating context switching with @notionhq AI connected workspaces. #NotionPartner",
            submittedAt: "2026-08-24T10:00:00Z",
            creatorNotes: "High-contrast editorial cut showing custom Notion project workspace.",
            status: "approved",
            publishedLiveUrl: "https://instagram.com/p/reel-marcus-notion",
            publishedStats: {
              views: 185000,
              likes: 19400,
              comments: 480,
              shares: 1200,
              clicks: 3400,
            }
          }
        ]
      },
      {
        id: "collab-del-4",
        type: "Instagram Story Set (3x)",
        title: "3x Interactive Notion Setup Stories with Template Poll",
        status: "submitted",
        dueDate: "2026-09-02",
        payoutAmount: 800,
        revisionCount: 0,
        maxRevisions: 1,
        submissions: [
          {
            id: "sub-2-2",
            deliverableId: "collab-del-4",
            version: 1,
            assetUrl: "https://www.dropbox.com/scl/fo/stories-notion-v1",
            notes: "High-resolution vertical 9:16 export ready for preview.",
            mediaUrls: ["https://www.dropbox.com/scl/fo/stories-notion-v1"],
            captionText: "Swipe up to download our studio Notion operating system @notionhq",
            submittedAt: "2026-08-29T16:20:00Z",
            slaDeadline: "2026-09-03T16:20:00Z",
            status: "submitted",
          }
        ]
      }
    ],
    createdAt: "2026-08-15",
    updatedAt: "2026-08-29",
  },
  {
    id: "collab-3",
    campaignId: "camp-3",
    campaignTitle: "Realtime Postgres & Edge Functions Feature Spotlight",
    brandId: "brand-3",
    brand: MOCK_BRANDS[2],
    creatorId: "creator-aria",
    creator: ARIA_CHEN_PROFILE,
    totalAgreedBudget: 5000,
    escrowStatus: "held_in_escrow",
    status: "active",
    paymentStatus: "revision_requested",
    isFunded: true,
    fundedAt: "2026-08-22T10:00:00Z",
    startDate: "2026-08-22",
    finalDeadline: "2026-10-28",
    deliverables: [
      {
        id: "collab-del-5",
        type: "YouTube Dedicated Video",
        title: "Fullstack Architecture with Supabase Realtime & Auth",
        status: "revision_requested",
        dueDate: "2026-09-12",
        payoutAmount: 3800,
        revisionCount: 1,
        maxRevisions: 2,
        submissions: [
          {
            id: "sub-3-1",
            deliverableId: "collab-del-5",
            version: 1,
            assetUrl: "https://drive.google.com/drive/folders/supabase-realtime-aria",
            notes: "First rough cut demonstrating multi-tenant row level security and realtime sync.",
            mediaUrls: ["https://drive.google.com/drive/folders/supabase-realtime-aria"],
            captionText: "Spinning up production Postgres with auth and realtime in 15 mins with @supabase. #SupabasePartner",
            submittedAt: "2026-08-27T11:00:00Z",
            feedback: "Loved the terminal and code walkthrough! Could you please highlight the edge functions deploy latency at 05:20?",
            status: "revision_requested",
          }
        ]
      }
    ],
    createdAt: "2026-08-22",
    updatedAt: "2026-08-28",
  }
];
