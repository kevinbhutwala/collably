import fs from "fs";
import path from "path";
import crypto from "crypto";

const DB_PATH = path.join(process.cwd(), "data", "valence_db.json");
const db = JSON.parse(fs.readFileSync(DB_PATH, "utf8"));

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const iterations = 1000;
  const hash = crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");
  return `${salt}:${hash}:${iterations}`;
}

const defaultPasswordHash = hashPassword("Password123!");
const nowIso = new Date().toISOString();

// -----------------------------------------------------------------------------
// 1. THE 2 BRANDS
// -----------------------------------------------------------------------------
const brands = [
  {
    id: "brand-1",
    userId: "user-brand",
    companyName: "The Whole Truth Foods",
    industry: "Fitness & Health Nutrition",
    headline: "100% Clean-Label Nutrition, Whey Isolate & Real Food",
    description: "India's first 100% clean-label food company. 0% added sugar, 0% artificial chemicals, real ingredients. Partnering with credible health, fitness, and lifestyle creators.",
    logoUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80",
    coverImageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    websiteUrl: "https://thewholetruthfoods.com",
    location: "Mumbai, India",
    companySize: "51-200",
    verified: true,
    activeCampaignsCount: 2,
    totalSpent: 350000,
    socialHandles: {
      instagram: "thewholetruthfoods",
      youtube: "thewholetruthfoods",
      x: "wholetruthfoods"
    },
    createdAt: "2024-02-15"
  },
  {
    id: "brand-2",
    userId: "user-b2",
    companyName: "Snitch",
    industry: "Fashion & Streetwear",
    headline: "Contemporary Menswear & Streetwear for the Unconventional Generation",
    description: "Encapsulating inspirations from around the globe, Snitch crafts fast-paced contemporary streetwear, Korean parachute pants, and transitional menswear for the style-forward generation.",
    logoUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&auto=format&fit=crop&q=80",
    coverImageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80",
    websiteUrl: "https://snitch.co.in",
    location: "Bengaluru, India",
    companySize: "201-500",
    verified: true,
    activeCampaignsCount: 2,
    totalSpent: 420000,
    socialHandles: {
      instagram: "snitch.co.in",
      youtube: "snitchfashion",
      x: "snitch_india"
    },
    createdAt: "2024-01-20"
  }
];

// -----------------------------------------------------------------------------
// 2. THE 4 CAMPAIGNS (2 FOR EACH BRAND)
// -----------------------------------------------------------------------------
const campaigns = [
  // --- The Whole Truth Foods (Campaign 1) ---
  {
    id: "camp-1",
    brandId: "brand-1",
    brand: brands[0],
    title: "The Whole Truth: Zero-Sugar Dark Chocolate & Protein Bar Challenge",
    slug: "whole-truth-zero-sugar-protein-challenge",
    tagline: "Candid taste tests and clean-label ingredient audits with zero added sugar.",
    description: "Unfiltered ingredient audit and post-workout taste tests highlighting our 100% clean-label whey protein bars and zero-sugar artisanal dark chocolate. Focus on authentic reaction, macro breakdown, and high-energy b-roll.",
    category: "Fitness & Wellness",
    targetAudience: {
      locations: ["India", "United States", "United Kingdom"],
      ageRanges: ["20-34", "35-44"],
      gender: "All",
      interests: ["Fitness & Gym Nutrition", "Clean Eating", "Health & Wellness", "Active Lifestyle"]
    },
    creatorRequirements: {
      minFollowers: 25000,
      minEngagementRate: 4.2,
      platforms: ["instagram", "youtube"],
      languages: ["English", "Hindi"],
      preferredTiers: ["Micro", "Mid-Tier", "Macro"]
    },
    deliverables: [
      {
        id: "del-twt-1",
        type: "Instagram Reel",
        count: 1,
        guidelines: "High-energy 9:16 vertical Reel demonstrating candid unboxing, ingredient label audit, and taste test.",
        specifications: ["1080p 60fps", "Tag @thewholetruthfoods", "Include custom discount code"],
        maxRevisions: 2
      },
      {
        id: "del-twt-2",
        type: "Instagram Story Set",
        count: 3,
        guidelines: "3-frame sequence with direct swipe link to clean snack bundle.",
        specifications: ["Swipe-up link sticker", "24hr live verification"],
        maxRevisions: 1
      }
    ],
    budget: {
      totalBudget: 150000,
      perCreatorBudget: 35000,
      currency: "INR",
      paymentTerms: "100_escrow_on_approval",
      performanceBonus: "₹5,000 bonus for reels exceeding 50K organic views"
    },
    timeline: {
      applicationDeadline: "2026-10-15",
      startDate: "2026-10-18",
      contentSubmissionDeadline: "2026-10-28",
      campaignEndDate: "2026-11-15"
    },
    status: "active",
    applicantsCount: 12,
    acceptedCount: 3,
    maxCreators: 5,
    coverImage: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=1200&auto=format&fit=crop&q=80",
    featured: true,
    isPreNegotiated: true,
    recommendedCreatorIds: ["creator-waseem", "creator-sheena", "creator-kunal"],
    createdAt: "2026-09-20",
    updatedAt: "2026-09-25"
  },

  // --- The Whole Truth Foods (Campaign 2) ---
  {
    id: "camp-2",
    brandId: "brand-1",
    brand: brands[0],
    title: "Truth In Every Scoop: Cold-Brew Whey Isolate Morning Routine",
    slug: "whole-truth-cold-brew-isolate-morning-routine",
    tagline: "Showcase uncompromised post-workout recovery with cold-brew whey isolate.",
    description: "Morning routine integration showing post-workout shaker bottle prep with Cold-Brew Whey Isolate. Emphasize zero artificial sweeteners, zero thickeners, and clean gut digestion without bloating.",
    category: "Fitness & Wellness",
    targetAudience: {
      locations: ["India", "United States", "UAE"],
      ageRanges: ["22-38"],
      gender: "All",
      interests: ["Gym Workouts", "Protein Supplements", "Bodybuilding", "Endurance Sports"]
    },
    creatorRequirements: {
      minFollowers: 30000,
      minEngagementRate: 4.5,
      platforms: ["youtube", "instagram"],
      languages: ["English", "Hindi"],
      preferredTiers: ["Micro", "Mid-Tier"]
    },
    deliverables: [
      {
        id: "del-twt-3",
        type: "YouTube 60s Integration",
        count: 1,
        guidelines: "Dedicated 60s mid-roll segment during post-workout gym debrief or morning routine.",
        specifications: ["1080p 60fps", "Pinned comment with tracked link", "No artificial sweet taste claims"],
        maxRevisions: 2
      }
    ],
    budget: {
      totalBudget: 200000,
      perCreatorBudget: 50000,
      currency: "INR",
      paymentTerms: "100_escrow_on_approval",
      performanceBonus: "₹10,000 for top performing conversion video"
    },
    timeline: {
      applicationDeadline: "2026-10-20",
      startDate: "2026-10-25",
      contentSubmissionDeadline: "2026-11-05",
      campaignEndDate: "2026-11-25"
    },
    status: "active",
    applicantsCount: 8,
    acceptedCount: 2,
    maxCreators: 4,
    coverImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    featured: true,
    isPreNegotiated: true,
    recommendedCreatorIds: ["creator-waseem", "creator-kunal"],
    createdAt: "2026-09-22",
    updatedAt: "2026-09-26"
  },

  // --- Snitch (Campaign 1) ---
  {
    id: "camp-3",
    brandId: "brand-2",
    brand: brands[1],
    title: "Snitch Streetwear: '3 Ways to Style' Korean Parachute Pants & Relaxed Tees",
    slug: "snitch-korean-parachute-streetwear-styling",
    tagline: "Dynamic transitions demonstrating versatile day-to-night urban streetwear fits.",
    description: "High-tempo transitions demonstrating versatile day-to-night styling for Snitch Korean parachute pants and relaxed drop-shoulder graphic tees. High aesthetic grading, sneaker synergy, and outfit links in bio.",
    category: "Fashion & Style",
    targetAudience: {
      locations: ["India", "United States", "United Kingdom"],
      ageRanges: ["18-28"],
      gender: "Mixed",
      interests: ["Streetwear", "Sneakers", "Korean Fashion", "College Fits"]
    },
    creatorRequirements: {
      minFollowers: 25000,
      minEngagementRate: 5.0,
      platforms: ["instagram", "tiktok"],
      languages: ["English", "Hindi"],
      preferredTiers: ["Micro", "Mid-Tier"]
    },
    deliverables: [
      {
        id: "del-snitch-1",
        type: "Instagram Reel",
        count: 2,
        guidelines: "Fast cut transitional fashion Reels showcasing fit changes with Snitch apparel.",
        specifications: ["4K or 1080p 60fps", "Trending audio sync", "Tagged @snitch.co.in in caption and reel"],
        maxRevisions: 2
      },
      {
        id: "del-snitch-2",
        type: "Instagram Story Set",
        count: 2,
        guidelines: "Direct link stories with product tags.",
        specifications: ["Swipe link", "Code SNITCH20"],
        maxRevisions: 1
      }
    ],
    budget: {
      totalBudget: 175000,
      perCreatorBudget: 40000,
      currency: "INR",
      paymentTerms: "100_escrow_on_approval",
      performanceBonus: "₹7,500 bonus for Reels crossing 100K plays"
    },
    timeline: {
      applicationDeadline: "2026-10-18",
      startDate: "2026-10-22",
      contentSubmissionDeadline: "2026-11-02",
      campaignEndDate: "2026-11-20"
    },
    status: "active",
    applicantsCount: 16,
    acceptedCount: 4,
    maxCreators: 6,
    coverImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&auto=format&fit=crop&q=80",
    featured: true,
    isPreNegotiated: true,
    recommendedCreatorIds: ["creator-pooja", "creator-prarthana"],
    createdAt: "2026-09-21",
    updatedAt: "2026-09-25"
  },

  // --- Snitch (Campaign 2) ---
  {
    id: "camp-4",
    brandId: "brand-2",
    brand: brands[1],
    title: "Autumn Streetwear Lookbook: Heavyweight Oversized Hoodies & Layering",
    slug: "snitch-autumn-drop-oversized-hoodies-lookbook",
    tagline: "Curated seasonal capsule styling featuring heavyweight textured French terry.",
    description: "Autumn streetwear wardrobe lookbook showcasing Snitch heavyweight textured hoodies, boxy flannel overshirts, and utility cargos. Fast-paced cut transitions and seasonal color palette.",
    category: "Fashion & Style",
    targetAudience: {
      locations: ["India", "United States", "Canada"],
      ageRanges: ["18-32"],
      gender: "Men & Unisex",
      interests: ["Winter Streetwear", "Hoodies & Jackets", "Layering Guides", "Mens Fashion"]
    },
    creatorRequirements: {
      minFollowers: 30000,
      minEngagementRate: 4.8,
      platforms: ["youtube", "instagram"],
      languages: ["English", "Hindi"],
      preferredTiers: ["Micro", "Mid-Tier", "Macro"]
    },
    deliverables: [
      {
        id: "del-snitch-3",
        type: "YouTube Dedicated Video",
        count: 1,
        guidelines: "Autumn styling haul and capsule wardrobe video feature (minimum 60s dedicated segment or full haul).",
        specifications: ["1080p 60fps", "Outfit links in description", "Pinned promo code"],
        maxRevisions: 2
      }
    ],
    budget: {
      totalBudget: 225000,
      perCreatorBudget: 55000,
      currency: "INR",
      paymentTerms: "100_escrow_on_approval",
      performanceBonus: "₹10,000 for top performing video haul"
    },
    timeline: {
      applicationDeadline: "2026-10-25",
      startDate: "2026-10-28",
      contentSubmissionDeadline: "2026-11-10",
      campaignEndDate: "2026-11-30"
    },
    status: "active",
    applicantsCount: 10,
    acceptedCount: 2,
    maxCreators: 4,
    coverImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=1200&auto=format&fit=crop&q=80",
    featured: true,
    isPreNegotiated: true,
    recommendedCreatorIds: ["creator-pooja", "creator-prarthana"],
    createdAt: "2026-09-23",
    updatedAt: "2026-09-26"
  }
];

// -----------------------------------------------------------------------------
// 3. THE 8 CURATED CREATORS
// -----------------------------------------------------------------------------
const creators = [
  // 1. Waseem Khan (Fitness & Gym Nutrition)
  {
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
    secondaryCategories: ["Health & Wellness"],
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
  },

  // 2. Prarthana (Fashion & Style)
  {
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
    secondaryCategories: ["Lifestyle & Culture"],
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
  },

  // 3. Pooja Bera (Fashion & Streetwear Styling)
  {
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
  },

  // 4. Dietitian Sheena (Nutrition & Clean Health)
  {
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
    secondaryCategories: ["Health & Wellness"],
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
  },

  // 5. Ramsha Sultan (Beauty & Skincare)
  {
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
  },

  // 6. Kunal Rajput (Fitness & Performance Athletics)
  {
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
    secondaryCategories: ["Health & Wellness"],
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
  },

  // 7. Aryan Sharma (Technology & AI)
  {
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
  },

  // 8. Elena Rostova (Design & Creative / Demo Anchor)
  {
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
  }
];

// -----------------------------------------------------------------------------
// 4. USERS ALIGNED WITH THESE ENTITIES
// -----------------------------------------------------------------------------
const users = [
  // Super Admin
  {
    id: "user-owner",
    name: "Kevin Bhutwala",
    email: "kevinbhutwala417@gmail.com",
    passwordHash: defaultPasswordHash,
    role: "agency_admin",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: nowIso,
    updatedAt: nowIso
  },

  // Demo Creator Account (Elena Rostova)
  {
    id: "user-creator",
    name: "Elena Rostova",
    email: "creator@abeycollab.io",
    passwordHash: defaultPasswordHash,
    role: "creator",
    avatarUrl: "/creators/elena-rostova.jpg",
    verified: true,
    createdAt: nowIso,
    updatedAt: nowIso
  },

  // Demo Brand Account (The Whole Truth Foods)
  {
    id: "user-brand",
    name: "Shashank Mehta",
    email: "brand@abeycollab.io",
    passwordHash: defaultPasswordHash,
    role: "brand",
    avatarUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: nowIso,
    updatedAt: nowIso
  },

  // Brand 2 Account (Snitch)
  {
    id: "user-b2",
    name: "Siddharth Dungarwal",
    email: "siddharth@snitch.co.in",
    passwordHash: defaultPasswordHash,
    role: "brand",
    avatarUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: nowIso,
    updatedAt: nowIso
  },

  // 1. Waseem Khan
  {
    id: "user-c-waseem",
    name: "Waseem Khan",
    email: "Bloggermaster786@gmail.com",
    passwordHash: defaultPasswordHash,
    role: "creator",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: nowIso,
    updatedAt: nowIso
  },

  // 2. Prarthana
  {
    id: "user-c-prarthana",
    name: "Prarthana",
    email: "prarthana@abeycollab.io",
    passwordHash: defaultPasswordHash,
    role: "creator",
    avatarUrl: "/creators/prarthana.jpg",
    verified: true,
    createdAt: nowIso,
    updatedAt: nowIso
  },

  // 3. Pooja Bera
  {
    id: "user-c-pooja",
    name: "Pooja Bera",
    email: "berapooja1994@gmail.com",
    passwordHash: defaultPasswordHash,
    role: "creator",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: nowIso,
    updatedAt: nowIso
  },

  // 4. Dietitian Sheena
  {
    id: "user-c-sheena",
    name: "Sheena Kalra",
    email: "work.eatmorelosemore@gmail.com",
    passwordHash: defaultPasswordHash,
    role: "creator",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: nowIso,
    updatedAt: nowIso
  },

  // 5. Ramsha Sultan
  {
    id: "user-c-ramsha",
    name: "Ramsha Sultan",
    email: "ramshasultanwork@gmail.com",
    passwordHash: defaultPasswordHash,
    role: "creator",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: nowIso,
    updatedAt: nowIso
  },

  // 6. Kunal Rajput
  {
    id: "user-c-kunal",
    name: "Kunal Rajput",
    email: "subtle.strength@abeycollab.io",
    passwordHash: defaultPasswordHash,
    role: "creator",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: nowIso,
    updatedAt: nowIso
  },

  // 7. Aryan Sharma
  {
    id: "user-c-aryan",
    name: "Aryan Sharma",
    email: "aryantech@abeycollab.io",
    passwordHash: defaultPasswordHash,
    role: "creator",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    verified: true,
    createdAt: nowIso,
    updatedAt: nowIso
  }
];

// Clean sample collaborations between these brands and creators
const sampleCollaborations = [
  {
    id: "collab-1",
    campaignId: "camp-1",
    creatorId: "creator-waseem",
    brandId: "brand-1",
    status: "in_production",
    price: 35000,
    currency: "INR",
    title: "The Whole Truth: Zero-Sugar Protein Bar Challenge",
    brandName: "The Whole Truth Foods",
    creatorName: "Waseem Khan",
    creatorHandle: "iamwaseem_khan_",
    deliverables: [
      { id: "del-col-1", title: "Instagram Reel", status: "submitted", dueDate: "2026-10-25" },
      { id: "del-col-2", title: "Instagram Story Set", status: "pending", dueDate: "2026-10-28" }
    ],
    createdAt: "2026-09-24",
    updatedAt: "2026-09-26"
  },
  {
    id: "collab-2",
    campaignId: "camp-3",
    creatorId: "creator-pooja",
    brandId: "brand-2",
    status: "completed",
    price: 40000,
    currency: "INR",
    title: "Snitch Streetwear: Korean Parachute Pants Styling",
    brandName: "Snitch",
    creatorName: "Pooja Bera",
    creatorHandle: "pooja_bera",
    deliverables: [
      { id: "del-col-3", title: "Instagram Reel (Transitions)", status: "approved", dueDate: "2026-09-20" }
    ],
    createdAt: "2026-09-15",
    updatedAt: "2026-09-22"
  }
];

// Update database object
db.brands = brands;
db.campaigns = campaigns;
db.creators = creators;
db.users = users;
db.collaborations = sampleCollaborations;
db._lastVerifiedAt = nowIso;

fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf8");

console.log("✅ Successfully updated valence_db.json:");
console.log(`- Brands: ${db.brands.length} (The Whole Truth Foods & Snitch)`);
console.log(`- Campaigns: ${db.campaigns.length} (2 per brand)`);
console.log(`- Creators: ${db.creators.length} (8 curated creators)`);
console.log(`- Users: ${db.users.length}`);
