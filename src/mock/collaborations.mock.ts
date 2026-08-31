import { Collaboration } from "../core/types";
import { MOCK_BRANDS } from "./brands.mock";
import { MOCK_CREATORS } from "./creators.mock";

export const MOCK_COLLABORATIONS: Collaboration[] = [
  {
    id: "collab-1",
    campaignId: "camp-1",
    campaignTitle: "AI-Powered Sprint Workflows Launch",
    brandId: "brand-1",
    brand: MOCK_BRANDS[0],
    creatorId: "creator-1",
    creator: MOCK_CREATORS[0],
    totalAgreedBudget: 3500,
    escrowStatus: "held_in_escrow",
    status: "active",
    startDate: "2026-08-20",
    finalDeadline: "2026-10-10",
    deliverables: [
      {
        id: "collab-del-1",
        type: "YouTube 60s Integration",
        title: "Dedicated AI Triage 60s Segment in Main Video",
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
            mediaUrls: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80"],
            captionText: "Special thanks to Linear for sponsoring this video. Check out how their new AI triage cuts backlog debt in half: https://linear.app/elena #ad #linear",
            trackingLink: "https://linear.app/ref/elena-ai",
            submittedAt: "2026-08-28T14:30:00Z",
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
      email: "sid@agencyplatform.io",
      avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
    },
    createdAt: "2026-08-20",
    updatedAt: "2026-08-28",
  },
  {
    id: "collab-2",
    campaignId: "camp-2",
    campaignTitle: "The Architecture of Time: Autumn Collection",
    brandId: "brand-2",
    brand: MOCK_BRANDS[1],
    creatorId: "creator-2",
    creator: MOCK_CREATORS[1],
    totalAgreedBudget: 2800,
    escrowStatus: "partially_released",
    status: "active",
    startDate: "2026-08-15",
    finalDeadline: "2026-10-05",
    deliverables: [
      {
        id: "collab-del-3",
        type: "Instagram Reel",
        title: "Titanium Monolith Architectural Reel",
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
            mediaUrls: ["https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80"],
            captionText: "Form follows precision. Exploring London with the new @aethelwatches Monolith in raw titanium. #AethelPartner",
            submittedAt: "2026-08-24T10:00:00Z",
            creatorNotes: "Color graded with Kodak Vision3 emulation.",
            status: "approved",
            publishedLiveUrl: "https://instagram.com/p/reel-marcus-aethel",
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
        title: "3x Interactive Unboxing Stories with Poll",
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
            mediaUrls: ["https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80"],
            captionText: "Swipe up to discover the engineering secrets behind the Monolith case @aethelwatches",
            submittedAt: "2026-08-29T16:20:00Z",
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
    campaignTitle: "Thermal Contrast & Sleep Recovery Protocol",
    brandId: "brand-3",
    brand: MOCK_BRANDS[2],
    creatorId: "creator-3",
    creator: MOCK_CREATORS[2],
    totalAgreedBudget: 5000,
    escrowStatus: "held_in_escrow",
    status: "active",
    startDate: "2026-08-22",
    finalDeadline: "2026-10-28",
    deliverables: [
      {
        id: "collab-del-5",
        type: "YouTube Dedicated Video",
        title: "14-Day Oura Biometric Sleep Study with Kuro Cold Plunge",
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
            mediaUrls: ["https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&auto=format&fit=crop&q=80"],
            captionText: "Can cold thermogenesis truly double REM sleep? Here is my raw biometric breakdown with @kurorecovery. Code ARIA20 for $200 off.",
            submittedAt: "2026-08-27T11:00:00Z",
            feedback: "Loved the laboratory visuals! Could you please emphasize the 3-year warranty and free threshold delivery in the video overlay at 06:40?",
            status: "revision_requested",
          }
        ]
      }
    ],
    createdAt: "2026-08-22",
    updatedAt: "2026-08-28",
  }
];
