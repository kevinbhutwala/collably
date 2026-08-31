import { CreatorProfile } from "../core/types";

export const MOCK_CREATORS: CreatorProfile[] = [
  {
    id: "creator-1",
    userId: "user-c1",
    fullName: "Elena Rostova",
    handle: "elenatech",
    headline: "AI Engineer & Next-Gen Hardware Reviewer",
    bio: "Demystifying artificial intelligence, spatial computing, and developer ergonomics for 480k+ tech professionals and founders globally.",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
    coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
    location: "San Francisco, CA",
    languages: ["English", "French"],
    primaryCategory: "Technology & AI",
    secondaryCategories: ["Design & Creative", "Finance & Business"],
    verified: true,
    featured: true,
    tier: "Elite",
    rating: 4.98,
    completedCampaignsCount: 42,
    totalFollowers: 485000,
    avgEngagementRate: 6.4,
    startingPrice: 2200,
    availableForHire: true,
    profileCompleteness: 96,
    qualityScore: 98,
    socialAccounts: [
      { id: "sa-1-yt", platform: "youtube", handle: "ElenaRostovaTech", url: "https://youtube.com", followers: 290000, engagementRate: 7.2, avgViews: 88000, verifiedBadge: true },
      { id: "sa-1-x", platform: "x", handle: "elenatech", url: "https://x.com", followers: 125000, engagementRate: 5.1, avgViews: 45000, verifiedBadge: true },
      { id: "sa-1-ig", platform: "instagram", handle: "elena_creates", url: "https://instagram.com", followers: 70000, engagementRate: 6.8, avgViews: 32000, verifiedBadge: true }
    ],
    audience: {
      topCountries: [
        { country: "United States", percentage: 52 },
        { country: "United Kingdom", percentage: 18 },
        { country: "Germany", percentage: 12 },
        { country: "Canada", percentage: 8 }
      ],
      ageDistribution: [
        { range: "18-24", percentage: 22 },
        { range: "25-34", percentage: 54 },
        { range: "35-44", percentage: 18 },
        { range: "45+", percentage: 6 }
      ],
      genderSplit: [
        { gender: "Male", percentage: 68 },
        { gender: "Female", percentage: 30 },
        { gender: "Other", percentage: 2 }
      ],
      interests: ["Machine Learning", "Developer Tooling", "Ergonomic Setups", "SaaS"]
    },
    rateCards: [
      { id: "rc-1", deliverableType: "YouTube 60s Integration", title: "Dedicated 60s In-Video Sponsor Segment", description: "Seamless workflow integration in a dedicated deep-dive video with trackable link in top comment.", basePrice: 3500, turnaroundDays: 7, revisionsIncluded: 2 },
      { id: "rc-2", deliverableType: "X (Twitter) Thread", title: "Technical Breakdown Thread (6-8 Posts)", description: "Architecture breakdown with high-res screenshots and product highlights.", basePrice: 1500, turnaroundDays: 3, revisionsIncluded: 1 }
    ]
  },
  {
    id: "creator-2",
    userId: "user-c2",
    fullName: "Marcus Vance",
    handle: "marcusvance",
    headline: "Architectural Cinematographer & Luxury Design Critic",
    bio: "Exploring brutalist architecture, Scandinavian interior design, and haute horology through cinematic 4K short films.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=80",
    coverImageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80",
    location: "London, UK",
    languages: ["English"],
    primaryCategory: "Design & Creative",
    secondaryCategories: ["Fashion & Style"],
    verified: true,
    featured: true,
    tier: "Elite",
    rating: 4.95,
    completedCampaignsCount: 28,
    totalFollowers: 310000,
    avgEngagementRate: 5.8,
    startingPrice: 2800,
    availableForHire: true,
    profileCompleteness: 94,
    qualityScore: 96,
    socialAccounts: [
      { id: "sa-2-ig", platform: "instagram", handle: "marcusvance", url: "https://instagram.com", followers: 210000, engagementRate: 6.4, avgViews: 95000, verifiedBadge: true },
      { id: "sa-2-yt", platform: "youtube", handle: "MarcusVanceFilms", url: "https://youtube.com", followers: 100000, engagementRate: 4.9, avgViews: 65000, verifiedBadge: true }
    ],
    audience: {
      topCountries: [
        { country: "United Kingdom", percentage: 44 },
        { country: "United States", percentage: 32 },
        { country: "France", percentage: 14 }
      ],
      ageDistribution: [
        { range: "25-34", percentage: 58 },
        { range: "35-44", percentage: 30 }
      ],
      genderSplit: [
        { gender: "Male", percentage: 54 },
        { gender: "Female", percentage: 45 },
        { gender: "Other", percentage: 1 }
      ],
      interests: ["Minimalist Architecture", "Luxury Watches", "Industrial Design"]
    },
    rateCards: [
      { id: "rc-3", deliverableType: "Instagram Reel", title: "Cinematic Product Short Film", description: "Color-graded RED camera footage with bespoke sound design.", basePrice: 2800, turnaroundDays: 10, revisionsIncluded: 2 }
    ]
  },
  {
    id: "creator-3",
    userId: "user-c3",
    fullName: "Aria Chen",
    handle: "ariachenwellness",
    headline: "Biohacker, Clinical Nutritionist & Longevity Advocate",
    bio: "Translating peer-reviewed metabolic science into daily wellness protocols, cold thermogenesis, and cellular recovery.",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=80",
    coverImageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    location: "Austin, TX",
    languages: ["English", "Mandarin"],
    primaryCategory: "Fitness & Wellness",
    secondaryCategories: ["Education & Science"],
    verified: true,
    featured: true,
    tier: "Elite",
    rating: 4.99,
    completedCampaignsCount: 36,
    totalFollowers: 620000,
    avgEngagementRate: 7.1,
    startingPrice: 3200,
    availableForHire: true,
    profileCompleteness: 98,
    qualityScore: 99,
    socialAccounts: [
      { id: "sa-3-ig", platform: "instagram", handle: "ariachenwellness", url: "https://instagram.com", followers: 420000, engagementRate: 7.8, avgViews: 140000, verifiedBadge: true },
      { id: "sa-3-tt", platform: "tiktok", handle: "ariachenlongevity", url: "https://tiktok.com", followers: 200000, engagementRate: 6.2, avgViews: 85000, verifiedBadge: true }
    ],
    audience: {
      topCountries: [
        { country: "United States", percentage: 65 },
        { country: "Canada", percentage: 15 },
        { country: "Australia", percentage: 10 }
      ],
      ageDistribution: [
        { range: "25-34", percentage: 48 },
        { range: "35-44", percentage: 38 }
      ],
      genderSplit: [
        { gender: "Female", percentage: 60 },
        { gender: "Male", percentage: 40 }
      ],
      interests: ["Thermal Recovery", "Metabolic Health", "Longevity Supplements"]
    },
    rateCards: [
      { id: "rc-4", deliverableType: "Instagram Reel", title: "Protocol Demonstration & Science Hook", description: "Biometric before/after with verified wearable data overlay.", basePrice: 3200, turnaroundDays: 5, revisionsIncluded: 2 }
    ]
  },
  {
    id: "creator-4",
    userId: "user-c4",
    fullName: "Devon Thorne",
    handle: "devoncodes",
    headline: "Full-Stack Tech Lead & Open-Source Creator",
    bio: "Teaching 340k developers how to build scalable cloud architectures with React, Next.js, and autonomous agents.",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=80",
    coverImageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    location: "Seattle, WA",
    languages: ["English"],
    primaryCategory: "Technology & AI",
    secondaryCategories: ["Education & Science"],
    verified: true,
    featured: false,
    tier: "Established",
    rating: 4.92,
    completedCampaignsCount: 19,
    totalFollowers: 340000,
    avgEngagementRate: 6.8,
    startingPrice: 2400,
    availableForHire: true,
    profileCompleteness: 90,
    qualityScore: 92,
    socialAccounts: [
      { id: "sa-4-yt", platform: "youtube", handle: "DevonCodes", url: "https://youtube.com", followers: 220000, engagementRate: 7.4, avgViews: 72000, verifiedBadge: true },
      { id: "sa-4-x", platform: "x", handle: "devoncodes", url: "https://x.com", followers: 120000, engagementRate: 5.6, avgViews: 38000, verifiedBadge: true }
    ],
    audience: {
      topCountries: [{ country: "United States", percentage: 58 }, { country: "India", percentage: 18 }, { country: "Germany", percentage: 10 }],
      ageDistribution: [{ range: "18-24", percentage: 30 }, { range: "25-34", percentage: 55 }],
      genderSplit: [{ gender: "Male", percentage: 82 }, { gender: "Female", percentage: 17 }, { gender: "Other", percentage: 1 }],
      interests: ["Cloud Computing", "AI Coding", "TypeScript"]
    },
    rateCards: [
      { id: "rc-5", deliverableType: "YouTube 60s Integration", title: "Live Build Integration (60s)", description: "Live code walkthrough showcasing tool API directly in editor.", basePrice: 2400, turnaroundDays: 6, revisionsIncluded: 2 }
    ]
  },
  {
    id: "creator-5",
    userId: "user-c5",
    fullName: "Chloe Dubois",
    handle: "chloedubois_paris",
    headline: "Parisian Clean Beauty & Botanical Skincare Authority",
    bio: "Unfiltered ingredient chemistry breakdowns and clinical skincare routines for conscious beauty consumers.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=80",
    coverImageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80",
    location: "Paris, France",
    languages: ["French", "English"],
    primaryCategory: "Beauty & Skincare",
    secondaryCategories: ["Lifestyle & Travel"],
    verified: true,
    featured: true,
    tier: "Elite",
    rating: 4.97,
    completedCampaignsCount: 31,
    totalFollowers: 520000,
    avgEngagementRate: 8.2,
    startingPrice: 3000,
    availableForHire: true,
    profileCompleteness: 95,
    qualityScore: 97,
    socialAccounts: [
      { id: "sa-5-ig", platform: "instagram", handle: "chloedubois_paris", url: "https://instagram.com", followers: 340000, engagementRate: 8.6, avgViews: 110000, verifiedBadge: true },
      { id: "sa-5-tt", platform: "tiktok", handle: "chloeskincare", url: "https://tiktok.com", followers: 180000, engagementRate: 7.4, avgViews: 90000, verifiedBadge: true }
    ],
    audience: {
      topCountries: [{ country: "France", percentage: 40 }, { country: "United States", percentage: 35 }, { country: "United Kingdom", percentage: 15 }],
      ageDistribution: [{ range: "18-24", percentage: 38 }, { range: "25-34", percentage: 48 }],
      genderSplit: [{ gender: "Female", percentage: 88 }, { gender: "Male", percentage: 12 }],
      interests: ["Clean Skincare", "Clinical Formulation", "French Pharmacy"]
    },
    rateCards: [
      { id: "rc-6", deliverableType: "Instagram Reel", title: "14-Day Barrier Routine Reel", description: "Macro texture demonstration with 4K B-roll and clear ingredient CTA.", basePrice: 3000, turnaroundDays: 8, revisionsIncluded: 2 }
    ]
  },
  {
    id: "creator-6",
    userId: "user-c6",
    fullName: "Siddharth Nair",
    handle: "sidfintech",
    headline: "Venture Capitalist & Personal Finance Educator",
    bio: "Demystifying tech investing, equity structuring, and wealth generation for 290k young professionals.",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=80",
    coverImageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
    location: "Singapore",
    languages: ["English", "Hindi"],
    primaryCategory: "Finance & Business",
    secondaryCategories: ["Technology & AI"],
    verified: true,
    featured: false,
    tier: "Established",
    rating: 4.89,
    completedCampaignsCount: 22,
    totalFollowers: 290000,
    avgEngagementRate: 5.4,
    startingPrice: 2000,
    availableForHire: true,
    profileCompleteness: 92,
    qualityScore: 90,
    socialAccounts: [
      { id: "sa-6-yt", platform: "youtube", handle: "SidNairFinance", url: "https://youtube.com", followers: 180000, engagementRate: 5.9, avgViews: 60000, verifiedBadge: true },
      { id: "sa-6-x", platform: "x", handle: "sidfintech", url: "https://x.com", followers: 110000, engagementRate: 4.7, avgViews: 35000, verifiedBadge: true }
    ],
    audience: {
      topCountries: [{ country: "Singapore", percentage: 35 }, { country: "United States", percentage: 30 }, { country: "India", percentage: 25 }],
      ageDistribution: [{ range: "25-34", percentage: 65 }, { range: "35-44", percentage: 25 }],
      genderSplit: [{ gender: "Male", percentage: 70 }, { gender: "Female", percentage: 30 }],
      interests: ["Fintech", "Venture Capital", "Tax Strategy"]
    },
    rateCards: [
      { id: "rc-7", deliverableType: "YouTube 60s Integration", title: "Sponsored Fintech Integration", description: "High-credibility product breakdown explaining real financial utility.", basePrice: 2200, turnaroundDays: 7, revisionsIncluded: 2 }
    ]
  },
  {
    id: "creator-7",
    userId: "user-c7",
    fullName: "Kai Takahashi",
    handle: "kaigaming",
    headline: "Pro Esports Caster & Next-Gen Game Hardware Tester",
    bio: "Testing ultra-low latency peripherals, high-refresh displays, and competitive strategy for 750k gamers.",
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500&auto=format&fit=crop&q=80",
    coverImageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80",
    location: "Tokyo, Japan",
    languages: ["Japanese", "English"],
    primaryCategory: "Gaming & Esports",
    secondaryCategories: ["Technology & AI"],
    verified: true,
    featured: true,
    tier: "Elite",
    rating: 4.96,
    completedCampaignsCount: 45,
    totalFollowers: 750000,
    avgEngagementRate: 8.9,
    startingPrice: 3800,
    availableForHire: true,
    profileCompleteness: 97,
    qualityScore: 98,
    socialAccounts: [
      { id: "sa-7-yt", platform: "youtube", handle: "KaiTakahashiGaming", url: "https://youtube.com", followers: 450000, engagementRate: 9.4, avgViews: 180000, verifiedBadge: true },
      { id: "sa-7-tt", platform: "tiktok", handle: "kaigaming_clips", url: "https://tiktok.com", followers: 300000, engagementRate: 8.2, avgViews: 120000, verifiedBadge: true }
    ],
    audience: {
      topCountries: [{ country: "Japan", percentage: 45 }, { country: "United States", percentage: 35 }, { country: "South Korea", percentage: 12 }],
      ageDistribution: [{ range: "18-24", percentage: 60 }, { range: "25-34", percentage: 32 }],
      genderSplit: [{ gender: "Male", percentage: 75 }, { gender: "Female", percentage: 25 }],
      interests: ["Competitive Gaming", "Gaming Hardware", "Mechanical Keyboards"]
    },
    rateCards: [
      { id: "rc-8", deliverableType: "YouTube Dedicated Video", title: "Dedicated Hardware Review Video", description: "12-minute technical review with latency testing charts and unboxing.", basePrice: 4200, turnaroundDays: 10, revisionsIncluded: 2 }
    ]
  },
  {
    id: "creator-8",
    userId: "user-c8",
    fullName: "Maya Lin-Bates",
    handle: "mayacooks",
    headline: "Culinary Biochemist & Modernist Cook",
    bio: "Teaching 390k home chefs how food science, heat dynamics, and artisan cookware transform everyday dining.",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=80",
    coverImageUrl: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=1200&auto=format&fit=crop&q=80",
    location: "New York, NY",
    languages: ["English"],
    primaryCategory: "Food & Culinary",
    secondaryCategories: ["Lifestyle & Travel", "Education & Science"],
    verified: true,
    featured: false,
    tier: "Established",
    rating: 4.93,
    completedCampaignsCount: 26,
    totalFollowers: 390000,
    avgEngagementRate: 6.7,
    startingPrice: 2200,
    availableForHire: true,
    profileCompleteness: 93,
    qualityScore: 94,
    socialAccounts: [
      { id: "sa-8-ig", platform: "instagram", handle: "mayacooks_science", url: "https://instagram.com", followers: 260000, engagementRate: 7.1, avgViews: 85000, verifiedBadge: true },
      { id: "sa-8-tt", platform: "tiktok", handle: "mayaculinary", url: "https://tiktok.com", followers: 130000, engagementRate: 5.9, avgViews: 60000, verifiedBadge: true }
    ],
    audience: {
      topCountries: [{ country: "United States", percentage: 70 }, { country: "Canada", percentage: 15 }, { country: "United Kingdom", percentage: 10 }],
      ageDistribution: [{ range: "25-34", percentage: 50 }, { range: "35-44", percentage: 35 }],
      genderSplit: [{ gender: "Female", percentage: 58 }, { gender: "Male", percentage: 42 }],
      interests: ["Culinary Science", "Cookware", "Specialty Coffee"]
    },
    rateCards: [
      { id: "rc-9", deliverableType: "Instagram Reel", title: "Recipe Science Showcase Reel", description: "Bespoke recipe highlighting appliance performance with high-speed macro shots.", basePrice: 2400, turnaroundDays: 7, revisionsIncluded: 2 }
    ]
  }
];
