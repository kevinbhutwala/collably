import { ChatMessage, Conversation } from "../core/types";

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv-1",
    campaignId: "camp-1",
    campaignTitle: "AI-Powered Sprint Workflows Launch",
    participants: [
      {
        userId: "user-b1",
        name: "Linear Marketing",
        role: "brand",
        avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
      },
      {
        userId: "user-c1",
        name: "Elena Rostova",
        role: "creator",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      },
      {
        userId: "user-admin",
        name: "Agency Manager (Sid)",
        role: "agency_admin",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
      }
    ],
    lastMessage: {
      content: "The rough cut draft looks incredible! We just left 1 tiny note on the final discount overlay.",
      senderName: "Linear Marketing",
      createdAt: "2026-08-28T16:45:00Z",
    },
    unreadCount: 1,
    updatedAt: "2026-08-28T16:45:00Z",
  },
  {
    id: "conv-2",
    campaignId: "camp-2",
    campaignTitle: "The Architecture of Time: Autumn Collection",
    participants: [
      {
        userId: "user-b2",
        name: "Aethel Watches",
        role: "brand",
        avatarUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&auto=format&fit=crop&q=80",
      },
      {
        userId: "user-c2",
        name: "Marcus Vance",
        role: "creator",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
      }
    ],
    lastMessage: {
      content: "The first reel is officially approved and payout tranche 1 has been released to your escrow balance.",
      senderName: "Aethel Watches",
      createdAt: "2026-08-26T12:10:00Z",
    },
    unreadCount: 0,
    updatedAt: "2026-08-26T12:10:00Z",
  },
  {
    id: "conv-3",
    campaignId: "camp-3",
    campaignTitle: "Raycast Pro Developer Extensions Launch",
    participants: [
      {
        userId: "user-b3",
        name: "Raycast DevRel",
        role: "brand",
        avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
      },
      {
        userId: "user-c3",
        name: "Devon Thorne",
        role: "creator",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
      }
    ],
    lastMessage: {
      content: "Can we include the custom Raycast API extension script in your pinned GitHub repo link?",
      senderName: "Raycast DevRel",
      createdAt: "2026-08-29T10:15:00Z",
    },
    unreadCount: 2,
    updatedAt: "2026-08-29T10:15:00Z",
  },
  {
    id: "conv-4",
    campaignId: "camp-4",
    campaignTitle: "Clean Botanical Morning Routine",
    participants: [
      {
        userId: "user-b4",
        name: "Studio 09 Botanical",
        role: "brand",
        avatarUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=80",
      },
      {
        userId: "user-c4",
        name: "Aanya Patel",
        role: "creator",
        avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
      }
    ],
    lastMessage: {
      content: "Color grading on the outdoor sunrise sequence is stunning! Payout escrow tranche cleared.",
      senderName: "Studio 09 Botanical",
      createdAt: "2026-08-30T14:20:00Z",
    },
    unreadCount: 0,
    updatedAt: "2026-08-30T14:20:00Z",
  },
  {
    id: "conv-5",
    campaignId: "camp-vip",
    campaignTitle: "AbeyCollab VIP Creator Escrow & Priority Match Desk",
    participants: [
      {
        userId: "user-admin",
        name: "AbeyCollab Talent Concierge",
        role: "agency_admin",
        avatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
      },
      {
        userId: "user-c1",
        name: "Elena Rostova",
        role: "creator",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      }
    ],
    lastMessage: {
      content: "You've been matched with 3 Tier-1 enterprise SaaS brand briefs this week with guaranteed escrow funding.",
      senderName: "AbeyCollab Talent Concierge",
      createdAt: "2026-08-31T09:00:00Z",
    },
    unreadCount: 1,
    updatedAt: "2026-08-31T09:00:00Z",
  }
];

export const MOCK_MESSAGES: Record<string, ChatMessage[]> = {
  "conv-1": [
    {
      id: "msg-1",
      conversationId: "conv-1",
      senderId: "user-b1",
      senderRole: "brand",
      senderName: "Linear Marketing",
      senderAvatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
      content: "Hi Elena! Thrilled to welcome you to the Linear AI launch campaign. Escrow funds of $3,500 have been secured in the platform vault.",
      readBy: ["user-c1", "user-admin"],
      createdAt: "2026-08-20T10:00:00Z",
    },
    {
      id: "msg-2",
      conversationId: "conv-1",
      senderId: "user-c1",
      senderRole: "creator",
      senderName: "Elena Rostova",
      senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      content: "Excited to get started! I have outlined the script for the AI triage integration. I'll showcase our real open-source triage workflow on Next.js 15.",
      readBy: ["user-b1", "user-admin"],
      createdAt: "2026-08-20T14:15:00Z",
    },
    {
      id: "msg-3",
      conversationId: "conv-1",
      senderId: "user-c1",
      senderRole: "creator",
      senderName: "Elena Rostova",
      senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
      content: "Just submitted the rough cut video deliverable for review under Deliverables tab! 4K ProRes cut with timecoded chapter markers.",
      readBy: ["user-b1"],
      createdAt: "2026-08-28T14:32:00Z",
    },
    {
      id: "msg-4",
      conversationId: "conv-1",
      senderId: "user-b1",
      senderRole: "brand",
      senderName: "Linear Marketing",
      senderAvatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
      content: "The rough cut draft looks incredible! We just left 1 tiny note on the final discount overlay.",
      readBy: [],
      createdAt: "2026-08-28T16:45:00Z",
    }
  ],
  "conv-2": [
    {
      id: "msg-201",
      conversationId: "conv-2",
      senderId: "user-b2",
      senderRole: "brand",
      senderName: "Aethel Watches",
      senderAvatar: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&auto=format&fit=crop&q=80",
      content: "Welcome Marcus! The titanium watch prototype has been dispatched via DHL Express with tracking #AE-99201.",
      readBy: ["user-c2"],
      createdAt: "2026-08-15T09:00:00Z",
    },
    {
      id: "msg-202",
      conversationId: "conv-2",
      senderId: "user-c2",
      senderRole: "creator",
      senderName: "Marcus Vance",
      senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
      content: "Received in pristine condition! The bezel finishing is extraordinary. Shooting the architectural reel tomorrow in Barbican Centre.",
      readBy: ["user-b2"],
      createdAt: "2026-08-18T16:00:00Z",
    },
    {
      id: "msg-203",
      conversationId: "conv-2",
      senderId: "user-b2",
      senderRole: "brand",
      senderName: "Aethel Watches",
      senderAvatar: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=200&auto=format&fit=crop&q=80",
      content: "The first reel is officially approved and payout tranche 1 has been released to your escrow balance.",
      readBy: ["user-c2"],
      createdAt: "2026-08-26T12:10:00Z",
    }
  ],
  "conv-3": [
    {
      id: "msg-301",
      conversationId: "conv-3",
      senderId: "user-b3",
      senderRole: "brand",
      senderName: "Raycast DevRel",
      senderAvatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
      content: "Hey Devon, we are loving your speed-coding workflows on YouTube. We'd like to sponsor a 90s deep dive on our new Extension Store API.",
      readBy: ["user-c3"],
      createdAt: "2026-08-28T09:30:00Z",
    },
    {
      id: "msg-302",
      conversationId: "conv-3",
      senderId: "user-c3",
      senderRole: "creator",
      senderName: "Devon Thorne",
      senderAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
      content: "Raycast is already a core part of my daily dotfiles setup! I'll build a live custom GitHub pull-request reviewer extension on video.",
      readBy: ["user-b3"],
      createdAt: "2026-08-28T11:45:00Z",
    },
    {
      id: "msg-303",
      conversationId: "conv-3",
      senderId: "user-b3",
      senderRole: "brand",
      senderName: "Raycast DevRel",
      senderAvatar: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
      content: "Can we include the custom Raycast API extension script in your pinned GitHub repo link?",
      readBy: [],
      createdAt: "2026-08-29T10:15:00Z",
    }
  ],
  "conv-4": [
    {
      id: "msg-401",
      conversationId: "conv-4",
      senderId: "user-b4",
      senderRole: "brand",
      senderName: "Studio 09 Botanical",
      senderAvatar: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=80",
      content: "Hello Aanya, your clean aesthetic is a perfect match for our botanical serum launch. $2,200 escrow pre-authorized.",
      readBy: ["user-c4"],
      createdAt: "2026-08-29T11:00:00Z",
    },
    {
      id: "msg-402",
      conversationId: "conv-4",
      senderId: "user-c4",
      senderRole: "creator",
      senderName: "Aanya Patel",
      senderAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
      content: "Draft reel uploaded! Natural lighting with high-contrast macro texture shots.",
      readBy: ["user-b4"],
      createdAt: "2026-08-30T09:15:00Z",
    },
    {
      id: "msg-403",
      conversationId: "conv-4",
      senderId: "user-b4",
      senderRole: "brand",
      senderName: "Studio 09 Botanical",
      senderAvatar: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&auto=format&fit=crop&q=80",
      content: "Color grading on the outdoor sunrise sequence is stunning! Payout escrow tranche cleared.",
      readBy: ["user-c4"],
      createdAt: "2026-08-30T14:20:00Z",
    }
  ],
  "conv-5": [
    {
      id: "msg-501",
      conversationId: "conv-5",
      senderId: "user-admin",
      senderRole: "agency_admin",
      senderName: "AbeyCollab Talent Concierge",
      senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
      content: "Welcome to the AbeyCollab VIP Creator Cohort, Elena! Your rate card and audience authenticity score (98.4%) have been verified.",
      readBy: ["user-c1"],
      createdAt: "2026-08-30T08:00:00Z",
    },
    {
      id: "msg-502",
      conversationId: "conv-5",
      senderId: "user-admin",
      senderRole: "agency_admin",
      senderName: "AbeyCollab Talent Concierge",
      senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80",
      content: "You've been matched with 3 Tier-1 enterprise SaaS brand briefs this week with guaranteed escrow funding.",
      readBy: [],
      createdAt: "2026-08-31T09:00:00Z",
    }
  ]
};
