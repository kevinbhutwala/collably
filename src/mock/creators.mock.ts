import { CreatorProfile } from "../core/types";

// 1. Elena Rostova (Design & Creative / Demo Anchor)
export const ELENA_ROSTOVA_PROFILE: CreatorProfile = {
  id: "creator-demo",
  userId: "user-creator",
  fullName: "Elena Rostova",
  handle: "elenarostova",
  slug: "elena-rostova-creative",
  headline: "Creative Director & Aesthetic Cinematography Specialist",
  bio: "Creative director, visual storytelling, aesthetic cinematography, and curated brand collaborations.",
  avatarUrl: "/creators/elena-rostova.jpg",
  coverImageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  location: "Global / New York",
  languages: ["English"],
  primaryCategory: "Design & Creative",
  secondaryCategories: ["Technology & AI"],
  verified: true,
  featured: true,
  tier: "Mid-Tier",
  rating: 4.96,
  completedCampaignsCount: 20,
  totalFollowers: 72000,
  avgEngagementRate: 5.5,
  startingPrice: 42000,
  currency: "INR",
  availableForHire: true,
  profileCompleteness: 100,
  qualityScore: 98,
  profileSource: "abeycollab_verified",
  isAbeyCollabVerified: true,
  isInstagramVerified: true,
  isClaimedOnAbeyCollab: true,
  isSignedTalent: true,
  cohortBadge: "Founding Cohort '26",
  socialAccounts: [
    { id: "sa-elena-yt", platform: "youtube", handle: "Elena Rostova Studio", followers: 52000, engagementRate: 5.8, verifiedBadge: true },
    { id: "sa-elena-ig", platform: "instagram", handle: "elenarostova", followers: 20000, engagementRate: 5.0, verifiedBadge: true }
  ],
  audience: {
    topCountries: [{ country: "United States", percentage: 50 }, { country: "India", percentage: 25 }, { country: "United Kingdom", percentage: 15 }],
    ageDistribution: [{ range: "25-34", percentage: 60 }, { range: "18-24", percentage: 25 }],
    genderSplit: [{ gender: "Female", percentage: 55 }, { gender: "Male", percentage: 45 }],
    interests: ["Visual Storytelling", "Cinematography", "Creative Direction", "Minimalist Design"]
  },
  rateCards: [
    { id: "rc-e-1", deliverableType: "YouTube Dedicated Video", title: "Dedicated 8-12 min Production Walkthrough", description: "Comprehensive cinematic production and brand collaboration.", basePrice: 42000, currency: "INR", turnaroundDays: 7, revisionsIncluded: 2 }
  ]
};

// Aliases for backward compatibility in tests
export const MARCUS_VANCE_PROFILE: CreatorProfile = ELENA_ROSTOVA_PROFILE;
export const ARIA_CHEN_PROFILE: CreatorProfile = ELENA_ROSTOVA_PROFILE;
export const DEVON_THORNE_PROFILE: CreatorProfile = ELENA_ROSTOVA_PROFILE;

// 2. Waseem Khan (Fitness & Gym Nutrition)
export const WASEEM_KHAN_PROFILE: CreatorProfile = {
  id: "creator-waseem",
  userId: "user-c-waseem",
  fullName: "Waseem Khan",
  handle: "iamwaseem_khan_",
  slug: "waseem-khan-fitness",
  headline: "Fitness & Gym Nutrition | Candid Supplement Audits",
  bio: "Candid supplement unboxings, hypertrophy science, and authentic gym routines. Helping athletes decode real fitness without the BS.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  coverImageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
  location: "Mumbai, India",
  languages: ["English", "Hindi"],
  primaryCategory: "Fitness & Wellness",
  secondaryCategories: ["Health & Wellness" as any],
  verified: true,
  featured: true,
  tier: "Micro",
  rating: 4.96,
  completedCampaignsCount: 16,
  totalFollowers: 48000,
  avgEngagementRate: 6.4,
  startingPrice: 25000,
  currency: "INR",
  availableForHire: true,
  profileCompleteness: 100,
  qualityScore: 98,
  profileSource: "abeycollab_verified",
  isAbeyCollabVerified: true,
  isInstagramVerified: true,
  isClaimedOnAbeyCollab: true,
  isSignedTalent: true,
  cohortBadge: "Founding Cohort '26",
  socialAccounts: [
    { id: "sa-waseem-ig", platform: "instagram", handle: "iamwaseem_khan_", followers: 48000, engagementRate: 6.4, verifiedBadge: true },
    { id: "sa-waseem-yt", platform: "youtube", handle: "Waseem Khan Fitness", followers: 32000, engagementRate: 7.2, verifiedBadge: false }
  ],
  audience: {
    topCountries: [{ country: "India", percentage: 88 }, { country: "UAE", percentage: 8 }],
    ageDistribution: [{ range: "18-24", percentage: 48 }, { range: "25-34", percentage: 44 }],
    genderSplit: [{ gender: "Male", percentage: 82 }, { gender: "Female", percentage: 18 }],
    interests: ["Bodybuilding", "Protein & Supplements", "Activewear", "Gym Workouts"]
  },
  rateCards: [
    { id: "rc-w-1", deliverableType: "Instagram Reel", title: "Dedicated 9:16 Reel & Story Sequence", description: "Candid product breakdown, gym workout integration, and story link set.", basePrice: 25000, currency: "INR", turnaroundDays: 4, revisionsIncluded: 2 },
    { id: "rc-w-2", deliverableType: "YouTube 60s Integration", title: "Dedicated Mid-Roll Sponsor Segment", description: "High retention 60s integration with pinned comment link.", basePrice: 35000, currency: "INR", turnaroundDays: 5, revisionsIncluded: 2 }
  ]
};

// 3. Prarthana (Fashion & Style)
export const PRARTHANA_PROFILE: CreatorProfile = {
  id: "creator-prarthana",
  userId: "user-c-prarthana",
  fullName: "Prarthana",
  handle: "prarthaana.04",
  slug: "prarthana-fashion",
  headline: "Minimalist Transitional Fashion & Everyday Styling",
  bio: "Minimalist transitional outfit styling, aesthetic lookbooks, and high-conversion D2C fashion hauls.",
  avatarUrl: "/creators/prarthana.jpg",
  coverImageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80",
  location: "Mumbai, India",
  languages: ["English", "Hindi"],
  primaryCategory: "Fashion & Style",
  secondaryCategories: ["Lifestyle & Culture" as any],
  verified: true,
  featured: true,
  tier: "Micro",
  rating: 4.94,
  completedCampaignsCount: 19,
  totalFollowers: 32000,
  avgEngagementRate: 6.8,
  startingPrice: 22000,
  currency: "INR",
  availableForHire: true,
  profileCompleteness: 100,
  qualityScore: 97,
  profileSource: "abeycollab_verified",
  isAbeyCollabVerified: true,
  isInstagramVerified: true,
  isClaimedOnAbeyCollab: true,
  isSignedTalent: true,
  cohortBadge: "Founding Cohort '26",
  socialAccounts: [
    { id: "sa-prarthana-ig", platform: "instagram", handle: "prarthaana.04", followers: 32000, engagementRate: 6.8, verifiedBadge: true }
  ],
  audience: {
    topCountries: [{ country: "India", percentage: 90 }, { country: "United States", percentage: 5 }],
    ageDistribution: [{ range: "18-24", percentage: 52 }, { range: "25-34", percentage: 40 }],
    genderSplit: [{ gender: "Female", percentage: 80 }, { gender: "Male", percentage: 20 }],
    interests: ["Minimalist Fashion", "Streetwear", "Capsule Wardrobes", "D2C Brands"]
  },
  rateCards: [
    { id: "rc-p-1", deliverableType: "Instagram Reel", title: "Transitional Outfit Reel", description: "Cinematic outfit transition with music sync and swipe-up story.", basePrice: 22000, currency: "INR", turnaroundDays: 3, revisionsIncluded: 2 }
  ]
};

// 4. Kushi Hanamsagar (Design & Creative / Visual Storytelling)
export const KUSHI_HANAMSAGAR_PROFILE: CreatorProfile = {
  id: "kushihanamsagar",
  userId: "user-c-kushi",
  fullName: "Kushi Hanamsagar",
  handle: "kushihanamsagar9",
  slug: "kushihanamsagar",
  headline: "Digital Creator & Visual Storyteller",
  bio: "Shree ram🔆 • Visual storytelling & authentic lifestyle moments",
  avatarUrl: "/creators/kushi-hanamsagar.jpg",
  coverImageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=80",
  location: "Mumbai, India",
  languages: ["English", "Hindi", "Kannada"],
  primaryCategory: "Design & Creative",
  secondaryCategories: ["Lifestyle & Culture" as any, "Fashion & Style"],
  verified: true,
  featured: true,
  tier: "Rising",
  rating: 4.95,
  completedCampaignsCount: 18,
  totalFollowers: 869,
  avgEngagementRate: 7.4,
  startingPrice: 15000,
  currency: "INR",
  availableForHire: true,
  profileCompleteness: 100,
  qualityScore: 98,
  profileSource: "abeycollab_verified",
  isAbeyCollabVerified: true,
  isInstagramVerified: true,
  isClaimedOnAbeyCollab: true,
  isSignedTalent: true,
  cohortBadge: "Founding Cohort '26",
  socialAccounts: [
    {
      id: "sa-kushi-ig",
      platform: "instagram",
      handle: "kushihanamsagar9",
      url: "https://www.instagram.com/kushihanamsagar9/",
      followers: 869,
      engagementRate: 7.4,
      avgViews: 650,
      verifiedBadge: true,
    },
  ],
  audience: {
    topCountries: [
      { country: "India", percentage: 84 },
      { country: "United States", percentage: 6 },
      { country: "United Arab Emirates", percentage: 5 },
      { country: "Canada", percentage: 3 },
    ],
    ageDistribution: [
      { range: "18-24", percentage: 52 },
      { range: "25-34", percentage: 38 },
      { range: "35-44", percentage: 8 },
      { range: "45+", percentage: 2 },
    ],
    genderSplit: [
      { gender: "Female", percentage: 58 },
      { gender: "Male", percentage: 39 },
      { gender: "Other", percentage: 3 },
    ],
    interests: [
      "Cinematography",
      "Creative Direction",
      "Visual Arts",
      "Short Films",
      "Music & Culture",
    ],
  },
  rateCards: [
    {
      id: "rc-kushi-1",
      deliverableType: "Instagram Reel",
      title: "Authentic Lifestyle Reel",
      description: "Creative short-form reel with organic integration and music pairing.",
      basePrice: 15000,
      turnaroundDays: 3,
      revisionsIncluded: 2,
      currency: "INR",
    },
    {
      id: "rc-kushi-2",
      deliverableType: "Carousel Post",
      title: "Photo Drop / Carousel Post",
      description: "Authentic photo set showcasing product in everyday settings.",
      basePrice: 10000,
      turnaroundDays: 2,
      revisionsIncluded: 1,
      currency: "INR",
    },
    {
      id: "rc-kushi-3",
      deliverableType: "Instagram Story Set (3x)",
      title: "Interactive Story Sequence (3x)",
      description: "Engaging real-time story sequence with brand tag and sticker.",
      basePrice: 5000,
      turnaroundDays: 1,
      revisionsIncluded: 1,
      currency: "INR",
    },
  ],
};

// 5. Pooja Bera (Fashion & Streetwear Styling)
export const POOJA_BERA_PROFILE: CreatorProfile = {
  id: "creator-pooja",
  userId: "user-c-pooja",
  fullName: "Pooja Bera",
  handle: "pooja_bera",
  slug: "pooja-bera-styling",
  headline: "High-Energy Streetwear Transitions & Outfit Recreations",
  bio: "High-energy outfit recreations, trendy streetwear transitions, and everyday capsule styling.",
  avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
  coverImageUrl: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&auto=format&fit=crop&q=80",
  location: "Delhi, India",
  languages: ["English", "Hindi"],
  primaryCategory: "Fashion & Style",
  secondaryCategories: ["Design & Creative"],
  verified: true,
  featured: true,
  tier: "Micro",
  rating: 4.92,
  completedCampaignsCount: 14,
  totalFollowers: 45000,
  avgEngagementRate: 5.9,
  startingPrice: 28000,
  currency: "INR",
  availableForHire: true,
  profileCompleteness: 100,
  qualityScore: 96,
  profileSource: "abeycollab_verified",
  isAbeyCollabVerified: true,
  isInstagramVerified: true,
  isClaimedOnAbeyCollab: true,
  isSignedTalent: true,
  cohortBadge: "Founding Cohort '26",
  socialAccounts: [
    { id: "sa-pooja-ig", platform: "instagram", handle: "pooja_bera", followers: 45000, engagementRate: 5.9, verifiedBadge: true }
  ],
  audience: {
    topCountries: [{ country: "India", percentage: 92 }],
    ageDistribution: [{ range: "18-24", percentage: 65 }, { range: "25-34", percentage: 30 }],
    genderSplit: [{ gender: "Female", percentage: 74 }, { gender: "Male", percentage: 26 }],
    interests: ["Fast Fashion", "Streetwear", "Sneakers", "Accessories"]
  },
  rateCards: [
    { id: "rc-pb-1", deliverableType: "Instagram Reel", title: "Styling Transition Reel", description: "3 ways to style dynamic transitions with link stickers.", basePrice: 28000, currency: "INR", turnaroundDays: 4, revisionsIncluded: 2 }
  ]
};

// 5. Dietitian Sheena (Nutrition & Healthy Eating)
export const DIETITIAN_SHEENA_PROFILE: CreatorProfile = {
  id: "creator-sheena",
  userId: "user-c-sheena",
  fullName: "Sheena Kalra",
  handle: "eatmorelosemore",
  slug: "eatmorelosemore-nutrition",
  headline: "Clinical Dietitian & Metabolic Health Specialist",
  bio: "Certified clinical sports dietitian. Sharing macro-friendly food swaps, guilt-free clean snacks, and holistic metabolic health.",
  avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
  coverImageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=1200&auto=format&fit=crop&q=80",
  location: "Chandigarh, India",
  languages: ["English", "Hindi"],
  primaryCategory: "Fitness & Wellness",
  secondaryCategories: ["Health & Wellness" as any],
  verified: true,
  featured: true,
  tier: "Mid-Tier",
  rating: 4.98,
  completedCampaignsCount: 24,
  totalFollowers: 95000,
  avgEngagementRate: 6.1,
  startingPrice: 50000,
  currency: "INR",
  availableForHire: true,
  profileCompleteness: 100,
  qualityScore: 99,
  profileSource: "abeycollab_verified",
  isAbeyCollabVerified: true,
  isInstagramVerified: true,
  isClaimedOnAbeyCollab: true,
  isSignedTalent: true,
  cohortBadge: "Founding Cohort '26",
  socialAccounts: [
    { id: "sa-sheena-ig", platform: "instagram", handle: "eatmorelosemore", followers: 95000, engagementRate: 6.1, verifiedBadge: true }
  ],
  audience: {
    topCountries: [{ country: "India", percentage: 85 }, { country: "Canada", percentage: 8 }],
    ageDistribution: [{ range: "25-34", percentage: 55 }, { range: "35-44", percentage: 32 }],
    genderSplit: [{ gender: "Female", percentage: 70 }, { gender: "Male", percentage: 30 }],
    interests: ["Clean Eating", "Diet Plans", "Weight Loss", "Healthy Recipes"]
  },
  rateCards: [
    { id: "rc-s-1", deliverableType: "Instagram Reel", title: "Ingredient Breakdown & Clean Swap", description: "Doctor/Dietitian verified breakdown of product ingredients and health benefits.", basePrice: 50000, currency: "INR", turnaroundDays: 5, revisionsIncluded: 2 }
  ]
};

// 6. Ramsha Sultan (Beauty & Skincare)
export const RAMSHA_SULTAN_PROFILE: CreatorProfile = {
  id: "creator-ramsha",
  userId: "user-c-ramsha",
  fullName: "Ramsha Sultan",
  handle: "ramshasultankhan",
  slug: "ramsha-sultan-beauty",
  headline: "Active Ingredients Skincare & Wearable Glam",
  bio: "Dermatologist-recommended skincare routines, barrier repair science, and wearable everyday glam. Zero-filter beauty tutorials.",
  avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
  coverImageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80",
  location: "Delhi, India",
  languages: ["English", "Hindi"],
  primaryCategory: "Beauty & Skincare",
  secondaryCategories: ["Fashion & Style"],
  verified: true,
  featured: true,
  tier: "Mid-Tier",
  rating: 4.93,
  completedCampaignsCount: 22,
  totalFollowers: 92000,
  avgEngagementRate: 5.7,
  startingPrice: 48000,
  currency: "INR",
  availableForHire: true,
  profileCompleteness: 100,
  qualityScore: 97,
  profileSource: "abeycollab_verified",
  isAbeyCollabVerified: true,
  isInstagramVerified: true,
  isClaimedOnAbeyCollab: true,
  isSignedTalent: true,
  cohortBadge: "Founding Cohort '26",
  socialAccounts: [
    { id: "sa-ramsha-ig", platform: "instagram", handle: "ramshasultankhan", followers: 92000, engagementRate: 5.7, verifiedBadge: true }
  ],
  audience: {
    topCountries: [{ country: "India", percentage: 91 }],
    ageDistribution: [{ range: "18-24", percentage: 50 }, { range: "25-34", percentage: 42 }],
    genderSplit: [{ gender: "Female", percentage: 88 }, { gender: "Male", percentage: 12 }],
    interests: ["Skincare Routines", "Clean Cosmetics", "Serums & Sunscreens", "Dermacare"]
  },
  rateCards: [
    { id: "rc-r-1", deliverableType: "Instagram Reel", title: "Texture Demonstration & Routine Integration", description: "Close-up 4K texture application, ingredient efficacy, and 7-day before/after.", basePrice: 48000, currency: "INR", turnaroundDays: 5, revisionsIncluded: 2 }
  ]
};

// 7. Kunal Rajput (Fitness & Performance Athletics)
export const KUNAL_RAJPUT_PROFILE: CreatorProfile = {
  id: "creator-kunal",
  userId: "user-c-kunal",
  fullName: "Kunal Rajput",
  handle: "subtle.strength",
  slug: "kunal-rajput-strength",
  headline: "Nike Master Trainer & Athletic Conditioning Coach",
  bio: "Nike Master Trainer & strength coach. High-performance athletic conditioning, functional movement patterns, and mobility routines.",
  avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
  coverImageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&auto=format&fit=crop&q=80",
  location: "Mumbai, India",
  languages: ["English", "Hindi"],
  primaryCategory: "Fitness & Wellness",
  secondaryCategories: ["Health & Wellness" as any],
  verified: true,
  featured: true,
  tier: "Micro",
  rating: 4.97,
  completedCampaignsCount: 18,
  totalFollowers: 52000,
  avgEngagementRate: 6.2,
  startingPrice: 35000,
  currency: "INR",
  availableForHire: true,
  profileCompleteness: 100,
  qualityScore: 98,
  profileSource: "abeycollab_verified",
  isAbeyCollabVerified: true,
  isInstagramVerified: true,
  isClaimedOnAbeyCollab: true,
  isSignedTalent: true,
  cohortBadge: "Founding Cohort '26",
  socialAccounts: [
    { id: "sa-kunal-ig", platform: "instagram", handle: "subtle.strength", followers: 52000, engagementRate: 6.2, verifiedBadge: true }
  ],
  audience: {
    topCountries: [{ country: "India", percentage: 86 }, { country: "United Kingdom", percentage: 6 }],
    ageDistribution: [{ range: "20-35", percentage: 78 }],
    genderSplit: [{ gender: "Male", percentage: 65 }, { gender: "Female", percentage: 35 }],
    interests: ["Athletics", "Strength Training", "Nutrition", "Sports Gear"]
  },
  rateCards: [
    { id: "rc-k-1", deliverableType: "Instagram Reel", title: "Athletic Conditioning Video", description: "High-intensity drill with natural product integration and workout tips.", basePrice: 35000, currency: "INR", turnaroundDays: 4, revisionsIncluded: 2 }
  ]
};

// 8. Aryan Sharma (Technology & AI)
export const ARYAN_SHARMA_PROFILE: CreatorProfile = {
  id: "creator-aryan",
  userId: "user-c-aryan",
  fullName: "Aryan Sharma",
  handle: "aryantech",
  slug: "aryan-sharma-tech",
  headline: "Next-Gen Tech Teardowns & Workflow Automation",
  bio: "Next-gen tech gear, AI workflow tools, smartphone teardowns, and productivity camera setups.",
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
  coverImageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
  location: "Pune, India",
  languages: ["English", "Hindi"],
  primaryCategory: "Technology & AI",
  secondaryCategories: ["Design & Creative"],
  verified: true,
  featured: true,
  tier: "Micro",
  rating: 4.95,
  completedCampaignsCount: 15,
  totalFollowers: 65000,
  avgEngagementRate: 5.6,
  startingPrice: 40000,
  currency: "INR",
  availableForHire: true,
  profileCompleteness: 100,
  qualityScore: 97,
  profileSource: "abeycollab_verified",
  isAbeyCollabVerified: true,
  isInstagramVerified: true,
  isClaimedOnAbeyCollab: true,
  isSignedTalent: true,
  cohortBadge: "Founding Cohort '26",
  socialAccounts: [
    { id: "sa-aryan-yt", platform: "youtube", handle: "Aryan Tech Reviews", followers: 45000, engagementRate: 6.0, verifiedBadge: true },
    { id: "sa-aryan-ig", platform: "instagram", handle: "aryantech", followers: 20000, engagementRate: 4.8, verifiedBadge: false }
  ],
  audience: {
    topCountries: [{ country: "India", percentage: 88 }, { country: "United States", percentage: 7 }],
    ageDistribution: [{ range: "18-24", percentage: 55 }, { range: "25-34", percentage: 38 }],
    genderSplit: [{ gender: "Male", percentage: 88 }, { gender: "Female", percentage: 12 }],
    interests: ["Smartphones", "AI Tools", "Developer Hardware", "Camera Gear"]
  },
  rateCards: [
    { id: "rc-a-1", deliverableType: "YouTube 60s Integration", title: "Dedicated Tech Mid-Roll Review", description: "60-second screen capture and hands-on tool review.", basePrice: 40000, currency: "INR", turnaroundDays: 5, revisionsIncluded: 2 }
  ]
};

// 9. Alex Rivera (Technology & AI / Sample Creator Anchor)
export const ALEX_RIVERA_PROFILE: CreatorProfile = {
  id: "creator-alex",
  userId: "user-c-alex",
  fullName: "Alex Rivera",
  handle: "alexrivera",
  slug: "alex-rivera-tech",
  headline: "Next-Gen Tech Reviews & Workflow Productivity",
  bio: "Tech creator reviewing next-gen gadgets, developer tools, and workflow productivity setups.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80",
  coverImageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop&q=80",
  location: "United States",
  languages: ["English"],
  primaryCategory: "Technology & AI",
  secondaryCategories: ["Design & Creative"],
  verified: false,
  featured: false,
  tier: "Micro",
  rating: 4.98,
  completedCampaignsCount: 12,
  totalFollowers: 155000,
  avgEngagementRate: 5.2,
  startingPrice: 45000,
  currency: "INR",
  availableForHire: true,
  profileCompleteness: 100,
  qualityScore: 96,
  profileSource: "abeycollab_verified",
  isAbeyCollabVerified: false,
  isInstagramVerified: true,
  isClaimedOnAbeyCollab: true,
  isSignedTalent: true,
  cohortBadge: "Founding Cohort '26",
  socialAccounts: [
    { id: "sa-alex-yt", platform: "youtube", handle: "AlexRiveraTech", followers: 42000, engagementRate: 5.4, verifiedBadge: true },
    { id: "sa-alex-ig", platform: "instagram", handle: "alex_rivera", followers: 28000, engagementRate: 4.8, verifiedBadge: true },
    { id: "sa-alex-tt", platform: "tiktok", handle: "alexrivera.tech", followers: 65000, engagementRate: 5.8, verifiedBadge: false },
    { id: "sa-alex-x", platform: "x", handle: "alexrivera_ai", followers: 14000, engagementRate: 4.5, verifiedBadge: false },
    { id: "sa-alex-li", platform: "linkedin", handle: "alex-rivera-tech", followers: 6000, engagementRate: 3.8, verifiedBadge: false },
  ],
  audience: {
    topCountries: [{ country: "United States", percentage: 65 }, { country: "United Kingdom", percentage: 20 }, { country: "Canada", percentage: 15 }],
    ageDistribution: [{ range: "18-24", percentage: 30 }, { range: "25-34", percentage: 55 }, { range: "35-44", percentage: 15 }],
    genderSplit: [{ gender: "Male", percentage: 65 }, { gender: "Female", percentage: 35 }],
    interests: ["Gadgets", "Developer Tools", "AI Software", "Desk Setups"]
  },
  rateCards: [
    { id: "rc-al-1", deliverableType: "YouTube 60s Integration", title: "Dedicated Tech Sponsorship", description: "60-second in-depth hardware or software breakdown.", basePrice: 45000, currency: "INR", turnaroundDays: 5, revisionsIncluded: 2 }
  ]
};

export const MOCK_CREATORS: CreatorProfile[] = [
  WASEEM_KHAN_PROFILE,
  PRARTHANA_PROFILE,
  KUSHI_HANAMSAGAR_PROFILE,
  POOJA_BERA_PROFILE,
  DIETITIAN_SHEENA_PROFILE,
  RAMSHA_SULTAN_PROFILE,
  KUNAL_RAJPUT_PROFILE,
  ARYAN_SHARMA_PROFILE,
  ELENA_ROSTOVA_PROFILE,
  ALEX_RIVERA_PROFILE,
];
