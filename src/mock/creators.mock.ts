import { CreatorProfile } from "../core/types";

export const ELENA_ROSTOVA_PROFILE: CreatorProfile = {
  "id": "creator-demo",
  "userId": "user-creator",
  "fullName": "Elena Rostova",
  "handle": "elenarostova",
  "headline": "Developer Tooling & AI Workflows Specialist",
  "bio": "Principal tech creator testing developer hardware, terminal tooling, and AI agent frameworks. Ex-SWE at Stripe.",
  "avatarUrl": "/creators/elena-rostova.jpg",
  "coverImageUrl": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80",
  "location": "San Francisco, CA",
  "region": "United States",
  "countryCode": "US",
  "countryFlag": "🇺🇸",
  "languages": ["English"],
  "primaryCategory": "Technology & AI",
  "secondaryCategories": ["Design & Creative"],
  "verified": true,
  "featured": true,
  "tier": "Mid-Tier",
  "rating": 4.95,
  "completedCampaignsCount": 14,
  "totalFollowers": 125000,
  "avgEngagementRate": 5.4,
  "startingPrice": 1500,
  "currency": "USD",
  "availableForHire": true,
  "profileCompleteness": 100,
  "qualityScore": 96,
  "profileSource": "abeycollab_verified",
  "isAbeyCollabVerified": true,
  "isInstagramVerified": true,
  "isClaimedOnAbeyCollab": true,
  "isSignedTalent": true,
  "agreementStatus": "Signed Beta Pilot Agreement",
  "cohortBadge": "Founding Cohort '26",
  "turnaroundGuaranteedDays": 5,
  "acceptingBriefsCount": 2,
  "socialAccounts": [
    {
      "id": "sa-elena-yt",
      "platform": "youtube",
      "handle": "elenarostova",
      "followers": 85000,
      "engagementRate": 5.8,
      "verifiedBadge": true
    }
  ],
  "audience": {
    "topCountries": [{"country": "United States", "percentage": 55}, {"country": "United Kingdom", "percentage": 18}],
    "ageDistribution": [{"range": "25-34", "percentage": 58}, {"range": "18-24", "percentage": 28}],
    "genderSplit": [{"gender": "Male", "percentage": 78}, {"gender": "Female", "percentage": 20}, {"gender": "Other", "percentage": 2}],
    "interests": ["Developer Tools", "AI Frameworks", "Workstation Setups"]
  },
  "rateCards": [
    {
      "id": "rc-elena-1",
      "deliverableType": "YouTube Dedicated Video",
      "title": "Dedicated Tool Deep Dive (8-12 mins)",
      "description": "Comprehensive architectural walkthrough and hands-on integration.",
      "basePrice": 3000,
      "turnaroundDays": 7,
      "revisionsIncluded": 2,
      "currency": "USD"
    }
  ]
} as unknown as CreatorProfile;

export const MARCUS_VANCE_PROFILE: CreatorProfile = ELENA_ROSTOVA_PROFILE;
export const ARIA_CHEN_PROFILE: CreatorProfile = ELENA_ROSTOVA_PROFILE;
export const DEVON_THORNE_PROFILE: CreatorProfile = ELENA_ROSTOVA_PROFILE;

/**
 * Mock creators roster for AbeyCollab:
 * - 70% Indian Creators (14 creators) & 30% USA Creators (6 creators) = 20 total.
 * - Prarthana and Kushi Hanamsagar are retained as core anchor creators.
 * - Mid-tier range: ~30K - 100K followers.
 * - Zero mega-celebrities.
 * - Verified authentic local photos for each creator directly from Instagram CDN.
 */
export const MOCK_CREATORS: CreatorProfile[] = [
  {
    "id": "prarthaana",
    "userId": "user-c-prarthaana",
    "fullName": "Prarthana",
    "handle": "prarthaana.04",
    "slug": "prarthaana",
    "headline": "Fashion, Travel & Aesthetic Lifestyle Creator",
    "bio": "Living quiet Living boujee 🧿\n🇮🇳 🇦🇪 🇹🇭 🇮🇹 🇭🇰 🇶🇦 🇪🇸 🇬🇮 🇨🇭",
    "avatarUrl": "/creators/prarthana.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80",
    "location": "Bengaluru, India",
    "region": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "languages": [
      "English",
      "Hindi",
      "Kannada"
    ],
    "primaryCategory": "Fashion & Style",
    "secondaryCategories": [
      "Lifestyle & Travel",
      "Beauty & Skincare"
    ],
    "verified": true,
    "featured": true,
    "tier": "Rising",
    "rating": 4.94,
    "completedCampaignsCount": 14,
    "totalFollowers": 30000,
    "avgEngagementRate": 6.7,
    "startingPrice": 450,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 98,
    "qualityScore": 97,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/prarthaana.04",
    "instagramUsername": "prarthaana.04",
    "turnaroundGuaranteedDays": 5,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-prarthana-ig",
        "platform": "instagram",
        "handle": "prarthaana.04",
        "url": "https://www.instagram.com/prarthaana.04/",
        "followers": 30000,
        "engagementRate": 6.8,
        "avgViews": 14500,
        "verifiedBadge": false
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "India",
          "percentage": 82
        },
        {
          "country": "United States",
          "percentage": 7
        },
        {
          "country": "United Arab Emirates",
          "percentage": 5
        },
        {
          "country": "United Kingdom",
          "percentage": 3
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 46
        },
        {
          "range": "25-34",
          "percentage": 42
        },
        {
          "range": "35-44",
          "percentage": 10
        },
        {
          "range": "45+",
          "percentage": 2
        }
      ],
      "genderSplit": [
        {
          "gender": "Female",
          "percentage": 74
        },
        {
          "gender": "Male",
          "percentage": 24
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Editorial Fashion",
        "Sustainable Styling",
        "Aesthetic Lookbooks",
        "Beauty & Skincare",
        "Travel"
      ]
    },
    "rateCards": [
      {
        "id": "rc-prarthana-1",
        "deliverableType": "Instagram Reel",
        "title": "Aesthetic Fashion & Lifestyle Reel",
        "description": "Styled aesthetic reel featuring product integration, organic audio, and color grading.",
        "basePrice": 450,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-prarthana-2",
        "deliverableType": "Carousel Post",
        "title": "Styled Lookbook Photo Carousel (5-8 Slides)",
        "description": "High-res styling and editorial lifestyle shots with tags.",
        "basePrice": 300,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      },
      {
        "id": "rc-prarthana-3",
        "deliverableType": "Instagram Story Set (3x)",
        "title": "Story Mention & Swipe-Up / Link Sticker",
        "description": "3x genuine story sequence featuring real-time use with direct brand link.",
        "basePrice": 150,
        "turnaroundDays": 2,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ],
    "updatedAt": "2026-09-25T08:24:51.969Z"
  },
  {
    "id": "kushihanamsagar",
    "userId": "user-c-kushi",
    "fullName": "Kushi Hanamsagar",
    "handle": "kushihanamsagar9",
    "slug": "kushihanamsagar",
    "headline": "Digital Creator & Visual Storyteller",
    "bio": "Shree ram🔆 • Visual storytelling & authentic lifestyle moments",
    "avatarUrl": "/creators/kushi-hanamsagar.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=80",
    "location": "Mumbai, India",
    "region": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "languages": [
      "English",
      "Hindi",
      "Kannada"
    ],
    "primaryCategory": "Design & Creative",
    "secondaryCategories": [
      "Lifestyle & Travel",
      "Fashion & Style"
    ],
    "verified": true,
    "featured": true,
    "tier": "Rising",
    "rating": 4.95,
    "completedCampaignsCount": 18,
    "totalFollowers": 869,
    "avgEngagementRate": 7.1,
    "startingPrice": 150,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 99,
    "qualityScore": 98,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/kushihanamsagar9",
    "instagramUsername": "kushihanamsagar9",
    "turnaroundGuaranteedDays": 5,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-kushi-ig",
        "platform": "instagram",
        "handle": "kushihanamsagar9",
        "url": "https://www.instagram.com/kushihanamsagar9/",
        "followers": 869,
        "engagementRate": 7.4,
        "avgViews": 650,
        "verifiedBadge": false
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "India",
          "percentage": 84
        },
        {
          "country": "United States",
          "percentage": 6
        },
        {
          "country": "United Arab Emirates",
          "percentage": 5
        },
        {
          "country": "Canada",
          "percentage": 3
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 52
        },
        {
          "range": "25-34",
          "percentage": 38
        },
        {
          "range": "35-44",
          "percentage": 8
        },
        {
          "range": "45+",
          "percentage": 2
        }
      ],
      "genderSplit": [
        {
          "gender": "Female",
          "percentage": 58
        },
        {
          "gender": "Male",
          "percentage": 39
        },
        {
          "gender": "Other",
          "percentage": 3
        }
      ],
      "interests": [
        "Cinematography",
        "Creative Direction",
        "Visual Arts",
        "Short Films",
        "Music & Culture"
      ]
    },
    "rateCards": [
      {
        "id": "rc-kushi-1",
        "deliverableType": "Instagram Reel",
        "title": "Authentic Lifestyle Reel",
        "description": "Creative short-form reel with organic integration and music pairing.",
        "basePrice": 150,
        "turnaroundDays": 3,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-kushi-2",
        "deliverableType": "Carousel Post",
        "title": "Photo Drop / Carousel Post",
        "description": "Authentic photo set showcasing product in everyday settings.",
        "basePrice": 100,
        "turnaroundDays": 2,
        "revisionsIncluded": 1,
        "currency": "USD"
      },
      {
        "id": "rc-kushi-3",
        "deliverableType": "Instagram Story Set (3x)",
        "title": "Interactive Story Sequence (3x)",
        "description": "Engaging real-time story sequence with brand tag and sticker.",
        "basePrice": 60,
        "turnaroundDays": 1,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-chetali",
    "userId": "user-c-chetali",
    "fullName": "Chetali Chadha",
    "handle": "chetalichadha",
    "slug": "chetalichadha",
    "headline": "Skincare Educator & Cosmetic Science Specialist",
    "bio": "Featured in Elle India. Demystifying active skincare ingredients, sunscreen formulations, and anti-aging science.",
    "avatarUrl": "/creators/chetali-chadha.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80",
    "location": "Mumbai, India",
    "region": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "languages": [
      "English",
      "Hindi"
    ],
    "primaryCategory": "Beauty & Skincare",
    "secondaryCategories": [
      "Education & Coaching",
      "Fitness & Health"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.98,
    "completedCampaignsCount": 32,
    "totalFollowers": 78000,
    "avgEngagementRate": 6.2,
    "startingPrice": 460,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 100,
    "qualityScore": 99,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/chetalichadha/",
    "instagramUsername": "chetalichadha",
    "turnaroundGuaranteedDays": 4,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-chetali-ig",
        "platform": "instagram",
        "handle": "chetalichadha",
        "url": "https://www.instagram.com/chetalichadha/",
        "followers": 78000,
        "engagementRate": 6.2,
        "avgViews": 46000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "India",
          "percentage": 86
        },
        {
          "country": "United States",
          "percentage": 6
        },
        {
          "country": "UAE",
          "percentage": 4
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 38
        },
        {
          "range": "25-34",
          "percentage": 50
        },
        {
          "range": "35-44",
          "percentage": 10
        },
        {
          "range": "45+",
          "percentage": 2
        }
      ],
      "genderSplit": [
        {
          "gender": "Female",
          "percentage": 84
        },
        {
          "gender": "Male",
          "percentage": 14
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Clinical Skincare",
        "Ingredient Science",
        "Anti-Aging",
        "Barrier Health"
      ]
    },
    "rateCards": [
      {
        "id": "rc-cc-1",
        "deliverableType": "Instagram Reel",
        "title": "Scientific Ingredient Breakdown Reel (60s)",
        "description": "Educational reel decoding ingredient percentages, application methodology, and honest verdict.",
        "basePrice": 460,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-cc-2",
        "deliverableType": "Carousel Post",
        "title": "Skincare Myth-Busting Carousel (6-8 Slides)",
        "description": "High-res educational infographics and skin texture photography breaking down clinical claims.",
        "basePrice": 320,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-tanya-singh",
    "userId": "user-c-tanyasingh",
    "fullName": "Tanya Singh",
    "handle": "itistanyasingh",
    "slug": "itistanyasingh",
    "headline": "Clean Beauty Enthusiast & Daily Skincare Routines",
    "bio": "Simplifying everyday skincare for sensitive Indian skin. Tested routines, honest product comparisons, and radiant finish tutorials.",
    "avatarUrl": "/creators/tanya-singh.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1512290900672-1f41d3d63d81?w=1200&auto=format&fit=crop&q=80",
    "location": "New Delhi, India",
    "region": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "languages": [
      "English",
      "Hindi"
    ],
    "primaryCategory": "Beauty & Skincare",
    "secondaryCategories": [
      "Fashion & Style",
      "Lifestyle & Travel"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.95,
    "completedCampaignsCount": 26,
    "totalFollowers": 64000,
    "avgEngagementRate": 5.8,
    "startingPrice": 400,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 99,
    "qualityScore": 98,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/itistanyasingh/",
    "instagramUsername": "itistanyasingh",
    "turnaroundGuaranteedDays": 4,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-ts-ig",
        "platform": "instagram",
        "handle": "itistanyasingh",
        "url": "https://www.instagram.com/itistanyasingh/",
        "followers": 64000,
        "engagementRate": 5.8,
        "avgViews": 38000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "India",
          "percentage": 87
        },
        {
          "country": "United States",
          "percentage": 6
        },
        {
          "country": "UAE",
          "percentage": 4
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 46
        },
        {
          "range": "25-34",
          "percentage": 44
        },
        {
          "range": "35-44",
          "percentage": 8
        },
        {
          "range": "45+",
          "percentage": 2
        }
      ],
      "genderSplit": [
        {
          "gender": "Female",
          "percentage": 86
        },
        {
          "gender": "Male",
          "percentage": 12
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Glass Skin",
        "Sunscreen Reviews",
        "Sensitive Skin Routines",
        "Clean Cosmetics"
      ]
    },
    "rateCards": [
      {
        "id": "rc-ts-1",
        "deliverableType": "Instagram Reel",
        "title": "Aesthetic Morning Routine & Product Spotlight (60s)",
        "description": "Natural daylight video demonstrating application texture, skin finish, and direct shopping links.",
        "basePrice": 400,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-ts-2",
        "deliverableType": "Carousel Post",
        "title": "Step-by-Step Routine Carousel (6 Slides)",
        "description": "Side-by-side texture swatches and application photography with ingredient callouts.",
        "basePrice": 270,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-mann-vaishnav",
    "userId": "user-c-mannvaishnav",
    "fullName": "Mann Vaishnav",
    "handle": "mr_mannvaishnav",
    "slug": "mann-vaishnav",
    "headline": "Men's Skincare, Grooming & Modern Masculine Aesthetics",
    "bio": "Normalizing skincare & grooming routines for Indian men. Barrier repair, beard grooming & sharp everyday style.",
    "avatarUrl": "/creators/mann-vaishnav.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80",
    "location": "Jaipur, India",
    "region": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "languages": [
      "English",
      "Hindi"
    ],
    "primaryCategory": "Beauty & Skincare",
    "secondaryCategories": [
      "Fashion & Style",
      "Fitness & Health"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.96,
    "completedCampaignsCount": 29,
    "totalFollowers": 88000,
    "avgEngagementRate": 5.9,
    "startingPrice": 440,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 99,
    "qualityScore": 98,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/mr_mannvaishnav/",
    "instagramUsername": "mr_mannvaishnav",
    "turnaroundGuaranteedDays": 4,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-mv-ig",
        "platform": "instagram",
        "handle": "mr_mannvaishnav",
        "url": "https://www.instagram.com/mr_mannvaishnav/",
        "followers": 88000,
        "engagementRate": 5.9,
        "avgViews": 45000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "India",
          "percentage": 88
        },
        {
          "country": "UAE",
          "percentage": 5
        },
        {
          "country": "United States",
          "percentage": 4
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 52
        },
        {
          "range": "25-34",
          "percentage": 40
        },
        {
          "range": "35-44",
          "percentage": 6
        },
        {
          "range": "45+",
          "percentage": 2
        }
      ],
      "genderSplit": [
        {
          "gender": "Male",
          "percentage": 78
        },
        {
          "gender": "Female",
          "percentage": 20
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Men's Grooming",
        "Active Skincare",
        "Haircare",
        "Casual Menswear"
      ]
    },
    "rateCards": [
      {
        "id": "rc-mv-1",
        "deliverableType": "Instagram Reel",
        "title": "Men's Grooming Routine & Product Integration Reel",
        "description": "High-energy grooming video showing routine integration, skin texture before/after, and product links.",
        "basePrice": 440,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-mv-2",
        "deliverableType": "Carousel Post",
        "title": "Everyday Grooming Essentials (5 Slides)",
        "description": "Clean flat lays and on-face product shots highlighting texture and ease of application.",
        "basePrice": 290,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-ashfina",
    "userId": "user-c-ashfina",
    "fullName": "Ashfina Charania",
    "handle": "thewickedsoul",
    "slug": "thewickedsoul",
    "headline": "Boutique Hospitality, Culinary & Slow Travel Storyteller",
    "bio": "Founder of The Wicked Soul. Experiential stays, culinary heritage & mindful slow travel across the subcontinent.",
    "avatarUrl": "/creators/ashfina-charania.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    "location": "Mumbai, India",
    "region": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "languages": [
      "English",
      "Hindi",
      "Gujarati"
    ],
    "primaryCategory": "Travel & Lifestyle",
    "secondaryCategories": [
      "Food & Cooking",
      "Visual Storytelling & Design"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.95,
    "completedCampaignsCount": 26,
    "totalFollowers": 65000,
    "avgEngagementRate": 5.7,
    "startingPrice": 380,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 98,
    "qualityScore": 97,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/thewickedsoul/",
    "instagramUsername": "thewickedsoul",
    "turnaroundGuaranteedDays": 5,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-ashfina-ig",
        "platform": "instagram",
        "handle": "thewickedsoul",
        "url": "https://www.instagram.com/thewickedsoul/",
        "followers": 65000,
        "engagementRate": 5.7,
        "avgViews": 32000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "India",
          "percentage": 82
        },
        {
          "country": "UAE",
          "percentage": 8
        },
        {
          "country": "United Kingdom",
          "percentage": 5
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 30
        },
        {
          "range": "25-34",
          "percentage": 54
        },
        {
          "range": "35-44",
          "percentage": 14
        },
        {
          "range": "45+",
          "percentage": 2
        }
      ],
      "genderSplit": [
        {
          "gender": "Female",
          "percentage": 68
        },
        {
          "gender": "Male",
          "percentage": 30
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Boutique Hotels",
        "Slow Travel",
        "Culinary Exploration",
        "Aesthetic Cafes"
      ]
    },
    "rateCards": [
      {
        "id": "rc-ashfina-1",
        "deliverableType": "Instagram Reel",
        "title": "Cinematic Property / Staycation Vignette (60-90s)",
        "description": "Atmospheric reel highlighting architecture, ambiance, farm-to-table dining, and experiential moments.",
        "basePrice": 450,
        "turnaroundDays": 5,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-ashfina-2",
        "deliverableType": "Carousel Post",
        "title": "Boutique Experience Guide Photo Carousel (8-10 Slides)",
        "description": "High-res photography capturing interior details, culinary highlights, and booking guide.",
        "basePrice": 320,
        "turnaroundDays": 4,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-kunal",
    "userId": "user-c-kunal",
    "fullName": "Kunal Rajput",
    "handle": "subtle.strength",
    "slug": "subtle.strength",
    "headline": "Nike Master Trainer & Functional Fitness Coach",
    "bio": "Nike Master Trainer. Founder of Subtle Strength. Demystifying functional movement, strength training, and sports recovery.",
    "avatarUrl": "/creators/kunal-rajput.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    "location": "Mumbai, India",
    "region": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "languages": [
      "English",
      "Hindi"
    ],
    "primaryCategory": "Fitness & Health",
    "secondaryCategories": [
      "Travel & Lifestyle",
      "Education & Coaching"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.97,
    "completedCampaignsCount": 33,
    "totalFollowers": 50000,
    "avgEngagementRate": 6.8,
    "startingPrice": 480,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 100,
    "qualityScore": 99,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/subtle.strength/",
    "instagramUsername": "subtle.strength",
    "turnaroundGuaranteedDays": 4,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-kunal-ig",
        "platform": "instagram",
        "handle": "subtle.strength",
        "url": "https://www.instagram.com/subtle.strength/",
        "followers": 50000,
        "engagementRate": 6.8,
        "avgViews": 36000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "India",
          "percentage": 81
        },
        {
          "country": "United States",
          "percentage": 9
        },
        {
          "country": "UAE",
          "percentage": 5
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 32
        },
        {
          "range": "25-34",
          "percentage": 52
        },
        {
          "range": "35-44",
          "percentage": 13
        },
        {
          "range": "45+",
          "percentage": 3
        }
      ],
      "genderSplit": [
        {
          "gender": "Male",
          "percentage": 58
        },
        {
          "gender": "Female",
          "percentage": 40
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Functional Strength",
        "Athletic Conditioning",
        "Sports Nutrition",
        "Recovery Gear"
      ]
    },
    "rateCards": [
      {
        "id": "rc-kunal-1",
        "deliverableType": "Instagram Reel",
        "title": "Movement Breakdown / Workout Integration Reel",
        "description": "Form coaching and organic integration of performance activewear, supplements, or training tech.",
        "basePrice": 480,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-kunal-2",
        "deliverableType": "Carousel Post",
        "title": "Step-by-Step Exercise Form Guide (6-8 Slides)",
        "description": "Detailed biomechanics breakdown with high-res form stills and practical coaching cues.",
        "basePrice": 320,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-yoganshi",
    "userId": "user-c-yoganshi",
    "fullName": "Yoganshi",
    "handle": "yoganshi31",
    "slug": "yoganshi31",
    "headline": "Heritage Ethnic Wear, Draping & Festive Styling Creator",
    "bio": "Celebrating handcrafted Indian textiles, festive draping tutorials & royal heritage silhouettes from the Pink City.",
    "avatarUrl": "/creators/yoganshi.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=1200&auto=format&fit=crop&q=80",
    "location": "Jaipur, India",
    "region": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "languages": [
      "English",
      "Hindi",
      "Rajasthani"
    ],
    "primaryCategory": "Fashion & Style",
    "secondaryCategories": [
      "Visual Storytelling & Design",
      "Travel & Lifestyle"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.93,
    "completedCampaignsCount": 21,
    "totalFollowers": 52000,
    "avgEngagementRate": 6.3,
    "startingPrice": 360,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 97,
    "qualityScore": 96,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/yoganshi31/",
    "instagramUsername": "yoganshi31",
    "turnaroundGuaranteedDays": 4,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-yoganshi-ig",
        "platform": "instagram",
        "handle": "yoganshi31",
        "url": "https://www.instagram.com/yoganshi31/",
        "followers": 52000,
        "engagementRate": 6.3,
        "avgViews": 31000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "India",
          "percentage": 88
        },
        {
          "country": "United States",
          "percentage": 5
        },
        {
          "country": "United Kingdom",
          "percentage": 4
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 42
        },
        {
          "range": "25-34",
          "percentage": 46
        },
        {
          "range": "35-44",
          "percentage": 10
        },
        {
          "range": "45+",
          "percentage": 2
        }
      ],
      "genderSplit": [
        {
          "gender": "Female",
          "percentage": 84
        },
        {
          "gender": "Male",
          "percentage": 14
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Handloom Sarees",
        "Festive Draping",
        "Heritage Jewellery",
        "Indian Artisans"
      ]
    },
    "rateCards": [
      {
        "id": "rc-yoganshi-1",
        "deliverableType": "Instagram Reel",
        "title": "Festive Saree Draping & Styling Tutorial (60s)",
        "description": "Step-by-step styling reel with color-accurate grading, close-ups of fabric weave, and jewelry pairing.",
        "basePrice": 360,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-yoganshi-2",
        "deliverableType": "Carousel Post",
        "title": "Ethnic Lookbook Photo Carousel (6 Slides)",
        "description": "Regal portrait photography set in heritage courtyard showcasing silhouette and craftsmanship.",
        "basePrice": 240,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-priya",
    "userId": "user-c-priya",
    "fullName": "Priya Chaudhari",
    "handle": "_priyachaudhari",
    "slug": "priyachaudhari",
    "headline": "Conscious Beauty, Everyday Styling & Mindful Living",
    "bio": "Featured micro-influencer in Indian lifestyle. Warm, intentional reviews of clean beauty, accessible fashion, and daily rituals.",
    "avatarUrl": "/creators/priya-chaudhari.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80",
    "location": "Lucknow, India",
    "region": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "languages": [
      "English",
      "Hindi"
    ],
    "primaryCategory": "Beauty & Skincare",
    "secondaryCategories": [
      "Fashion & Style",
      "Lifestyle & Travel"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.95,
    "completedCampaignsCount": 25,
    "totalFollowers": 62300,
    "avgEngagementRate": 5.9,
    "startingPrice": 390,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 99,
    "qualityScore": 98,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/_priyachaudhari/",
    "instagramUsername": "_priyachaudhari",
    "turnaroundGuaranteedDays": 4,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-priya-ig",
        "platform": "instagram",
        "handle": "_priyachaudhari",
        "url": "https://www.instagram.com/_priyachaudhari/",
        "followers": 62300,
        "engagementRate": 5.9,
        "avgViews": 35000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "India",
          "percentage": 87
        },
        {
          "country": "United States",
          "percentage": 5
        },
        {
          "country": "UAE",
          "percentage": 4
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 44
        },
        {
          "range": "25-34",
          "percentage": 45
        },
        {
          "range": "35-44",
          "percentage": 9
        },
        {
          "range": "45+",
          "percentage": 2
        }
      ],
      "genderSplit": [
        {
          "gender": "Female",
          "percentage": 85
        },
        {
          "gender": "Male",
          "percentage": 13
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Clean Skincare",
        "Everyday Wear",
        "Self Care",
        "Affordable Glamour"
      ]
    },
    "rateCards": [
      {
        "id": "rc-priya-1",
        "deliverableType": "Instagram Reel",
        "title": "Morning Routine & Skincare Integration Reel",
        "description": "Natural morning light routine highlighting active texture, application technique, and genuine results.",
        "basePrice": 390,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-priya-2",
        "deliverableType": "Carousel Post",
        "title": "5-Slide Routine Breakdown & Ingredient Review",
        "description": "Macro skin texture shots, ingredient list callouts, and direct purchase sticker.",
        "basePrice": 260,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-sid",
    "userId": "user-c-sid",
    "fullName": "Sid Bhawsar",
    "handle": "thesept_boy",
    "slug": "sid-bhawsar",
    "headline": "Men's Everyday Aesthetics, Minimalist Styling & Grooming",
    "bio": "Known as @thesept_boy. Simplifying classic men's sophistication with wearable, comfortable contemporary styling.",
    "avatarUrl": "/creators/sid-bhawsar.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80",
    "location": "Indore, India",
    "region": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "languages": [
      "English",
      "Hindi"
    ],
    "primaryCategory": "Fashion & Style",
    "secondaryCategories": [
      "Visual Storytelling & Design",
      "Lifestyle & Travel"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.94,
    "completedCampaignsCount": 24,
    "totalFollowers": 92000,
    "avgEngagementRate": 5.7,
    "startingPrice": 390,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 98,
    "qualityScore": 97,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/thesept_boy/",
    "instagramUsername": "thesept_boy",
    "turnaroundGuaranteedDays": 4,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-sid-ig",
        "platform": "instagram",
        "handle": "thesept_boy",
        "url": "https://www.instagram.com/thesept_boy/",
        "followers": 92000,
        "engagementRate": 5.7,
        "avgViews": 40000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "India",
          "percentage": 85
        },
        {
          "country": "United States",
          "percentage": 6
        },
        {
          "country": "UAE",
          "percentage": 4
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 50
        },
        {
          "range": "25-34",
          "percentage": 41
        },
        {
          "range": "35-44",
          "percentage": 7
        },
        {
          "range": "45+",
          "percentage": 2
        }
      ],
      "genderSplit": [
        {
          "gender": "Male",
          "percentage": 75
        },
        {
          "gender": "Female",
          "percentage": 23
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Minimalist Wardrobe",
        "Layering Guides",
        "Sneaker Pairings",
        "Men's Fragrance"
      ]
    },
    "rateCards": [
      {
        "id": "rc-sid-1",
        "deliverableType": "Instagram Reel",
        "title": "Minimalist Men's Fit Breakdown Reel (60s)",
        "description": "Relatable styling guide explaining fabric weight, color coordination, and footwear pairings.",
        "basePrice": 390,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-sid-2",
        "deliverableType": "Carousel Post",
        "title": "Everyday Outfit Grid & Texture Gallery",
        "description": "Clean flat lays and on-body photos detailing accessible staple pieces.",
        "basePrice": 260,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-sparsh",
    "userId": "user-c-sparsh",
    "fullName": "Sparsh Alawadhi",
    "handle": "sparshalawadhi",
    "slug": "sparshalawadhi",
    "headline": "Men's Sartorial Fashion, Fitness & Luxury Living",
    "bio": "Blending functional athletic training with sharp tailored suits & luxury lifestyle curation. Founder of Alternate.",
    "avatarUrl": "/creators/sparsh-alawadhi.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop&q=80",
    "location": "New Delhi, India",
    "region": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "languages": [
      "English",
      "Hindi"
    ],
    "primaryCategory": "Fashion & Style",
    "secondaryCategories": [
      "Fitness & Health",
      "Travel & Lifestyle"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.96,
    "completedCampaignsCount": 30,
    "totalFollowers": 95000,
    "avgEngagementRate": 5.6,
    "startingPrice": 460,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 99,
    "qualityScore": 98,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/sparshalawadhi/",
    "instagramUsername": "sparshalawadhi",
    "turnaroundGuaranteedDays": 4,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-sparsh-ig",
        "platform": "instagram",
        "handle": "sparshalawadhi",
        "url": "https://www.instagram.com/sparshalawadhi/",
        "followers": 95000,
        "engagementRate": 5.6,
        "avgViews": 46000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "India",
          "percentage": 80
        },
        {
          "country": "United States",
          "percentage": 8
        },
        {
          "country": "UAE",
          "percentage": 7
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 38
        },
        {
          "range": "25-34",
          "percentage": 50
        },
        {
          "range": "35-44",
          "percentage": 10
        },
        {
          "range": "45+",
          "percentage": 2
        }
      ],
      "genderSplit": [
        {
          "gender": "Male",
          "percentage": 72
        },
        {
          "gender": "Female",
          "percentage": 26
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Men's Suiting",
        "CrossFit & Conditioning",
        "Luxury Watches",
        "Grooming"
      ]
    },
    "rateCards": [
      {
        "id": "rc-sparsh-1",
        "deliverableType": "Instagram Reel",
        "title": "Men's Luxury Styling & Fitness Integration Reel",
        "description": "High-production transition reel styling tailored suiting or active athletic recovery gear.",
        "basePrice": 460,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-sparsh-2",
        "deliverableType": "Carousel Post",
        "title": "Sharp Lookbook Stills (6 Slides)",
        "description": "Architectural background portrait photography featuring watch, footwear, and accessory closeups.",
        "basePrice": 320,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-shreya",
    "userId": "user-c-shreya",
    "fullName": "Shreya Arora",
    "handle": "shreya.arora",
    "slug": "shreya-arora",
    "headline": "Elevated Resort Wear, Beauty & Aspirational Travel",
    "bio": "Effortless elegance for modern fashion lovers and travel enthusiasts. Featured collaborator for premium beauty & fashion labels.",
    "avatarUrl": "/creators/shreya-arora.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=80",
    "location": "Mumbai, India",
    "region": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "languages": [
      "English",
      "Hindi"
    ],
    "primaryCategory": "Fashion & Style",
    "secondaryCategories": [
      "Beauty & Skincare",
      "Travel & Lifestyle"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.96,
    "completedCampaignsCount": 26,
    "totalFollowers": 84200,
    "avgEngagementRate": 5.5,
    "startingPrice": 410,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 99,
    "qualityScore": 98,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/shreya.arora/",
    "instagramUsername": "shreya.arora",
    "turnaroundGuaranteedDays": 4,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-shreya-ig",
        "platform": "instagram",
        "handle": "shreya.arora",
        "url": "https://www.instagram.com/shreya.arora/",
        "followers": 84200,
        "engagementRate": 5.5,
        "avgViews": 41000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "India",
          "percentage": 83
        },
        {
          "country": "United States",
          "percentage": 7
        },
        {
          "country": "UAE",
          "percentage": 5
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 45
        },
        {
          "range": "25-34",
          "percentage": 45
        },
        {
          "range": "35-44",
          "percentage": 8
        },
        {
          "range": "45+",
          "percentage": 2
        }
      ],
      "genderSplit": [
        {
          "gender": "Female",
          "percentage": 80
        },
        {
          "gender": "Male",
          "percentage": 18
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Resort Styling",
        "Summer Palettes",
        "Prestige Beauty",
        "Fine Dining"
      ]
    },
    "rateCards": [
      {
        "id": "rc-shreya-1",
        "deliverableType": "Instagram Reel",
        "title": "Aesthetic Travel & Resort Styling Reel (60s)",
        "description": "Luxe cinematic footage showcasing vacation fashion, skincare protection, and styling flow.",
        "basePrice": 410,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-shreya-2",
        "deliverableType": "Carousel Post",
        "title": "Resort Capsule Lookbook Carousel (6-8 Slides)",
        "description": "Golden-hour editorial stills with detailed fabric, silhouette, and purchase links.",
        "basePrice": 280,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-samantha",
    "userId": "user-c-samantha",
    "fullName": "Samantha Ferreira",
    "handle": "samanthaferreira",
    "slug": "samantha-ferreira",
    "headline": "Bold High-Street Styling & Experimental Fashion",
    "bio": "Commanding attention with unapologetic silhouettes, coastal glam & trendsetting street style. Featured in top fashion roundups.",
    "avatarUrl": "/creators/samantha-ferreira.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&auto=format&fit=crop&q=80",
    "location": "Goa, India",
    "region": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "languages": [
      "English",
      "Hindi",
      "Konkani"
    ],
    "primaryCategory": "Fashion & Style",
    "secondaryCategories": [
      "Visual Storytelling & Design",
      "Travel & Lifestyle"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.97,
    "completedCampaignsCount": 28,
    "totalFollowers": 98000,
    "avgEngagementRate": 5.8,
    "startingPrice": 430,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 99,
    "qualityScore": 98,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/samanthaferreira/",
    "instagramUsername": "samanthaferreira",
    "turnaroundGuaranteedDays": 4,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-samantha-ig",
        "platform": "instagram",
        "handle": "samanthaferreira",
        "url": "https://www.instagram.com/samanthaferreira/",
        "followers": 98000,
        "engagementRate": 5.8,
        "avgViews": 45000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "India",
          "percentage": 81
        },
        {
          "country": "United States",
          "percentage": 8
        },
        {
          "country": "United Kingdom",
          "percentage": 5
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 49
        },
        {
          "range": "25-34",
          "percentage": 42
        },
        {
          "range": "35-44",
          "percentage": 7
        },
        {
          "range": "45+",
          "percentage": 2
        }
      ],
      "genderSplit": [
        {
          "gender": "Female",
          "percentage": 79
        },
        {
          "gender": "Male",
          "percentage": 19
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Experimental Draping",
        "Coastal Chic",
        "Bold Accessories",
        "Footwear Curation"
      ]
    },
    "rateCards": [
      {
        "id": "rc-samantha-1",
        "deliverableType": "Instagram Reel",
        "title": "Statement Fashion Reel with Dynamic Cuts",
        "description": "High-energy styling transition highlighting bold colors, layered textures, and brand tags.",
        "basePrice": 430,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-samantha-2",
        "deliverableType": "Carousel Post",
        "title": "High-Street Editorial Carousel (6 Slides)",
        "description": "Outdoor photography playing with natural light and geometric architectural contrasts.",
        "basePrice": 290,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-vasudha",
    "userId": "user-c-vasudha",
    "fullName": "Vasudha Rai",
    "handle": "vasudha.rai",
    "slug": "vasudha-rai",
    "headline": "Holistic Beauty Author & Clean Wellness Columnist",
    "bio": "Author of Glow. Former beauty director. Holistic rituals, ayurvedic herbal formulations & radiant skin wellness.",
    "avatarUrl": "/creators/vasudha-rai.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&auto=format&fit=crop&q=80",
    "location": "New Delhi, India",
    "region": "India",
    "countryCode": "IN",
    "countryFlag": "🇮🇳",
    "languages": [
      "English",
      "Hindi"
    ],
    "primaryCategory": "Beauty & Skincare",
    "secondaryCategories": [
      "Fitness & Health",
      "Education & Coaching"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.98,
    "completedCampaignsCount": 35,
    "totalFollowers": 82000,
    "avgEngagementRate": 6.1,
    "startingPrice": 500,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 100,
    "qualityScore": 99,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/vasudha.rai/",
    "instagramUsername": "vasudha.rai",
    "turnaroundGuaranteedDays": 4,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-vr-ig",
        "platform": "instagram",
        "handle": "vasudha.rai",
        "url": "https://www.instagram.com/vasudha.rai/",
        "followers": 82000,
        "engagementRate": 6.1,
        "avgViews": 42000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "India",
          "percentage": 83
        },
        {
          "country": "United States",
          "percentage": 8
        },
        {
          "country": "United Kingdom",
          "percentage": 5
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 25
        },
        {
          "range": "25-34",
          "percentage": 55
        },
        {
          "range": "35-44",
          "percentage": 16
        },
        {
          "range": "45+",
          "percentage": 4
        }
      ],
      "genderSplit": [
        {
          "gender": "Female",
          "percentage": 88
        },
        {
          "gender": "Male",
          "percentage": 10
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Ayurvedic Beauty",
        "Holistic Wellness",
        "Skin Diet",
        "Herbal Actives"
      ]
    },
    "rateCards": [
      {
        "id": "rc-vr-1",
        "deliverableType": "Instagram Reel",
        "title": "Holistic Skin Ritual & Wellness Masterclass Reel",
        "description": "Calm, thoughtful video narrating botanicals, lifestyle habits, and application mindfulness.",
        "basePrice": 500,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-vr-2",
        "deliverableType": "Carousel Post",
        "title": "Herbal Actives & Routine Guide Carousel (6 Slides)",
        "description": "Editorial aesthetic breakdown of formulation benefits, skin physiology, and usage guide.",
        "basePrice": 340,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-daniel-titchener",
    "userId": "user-c-daniel",
    "fullName": "Daniel Titchener",
    "handle": "daniel_titchener",
    "slug": "daniel-titchener",
    "headline": "Minimalist Architect, Ergonomic Design & Workspace Curator",
    "bio": "Architectural designer exploring spatial calm, ergonomic desk hardware & timeless minimalist living.",
    "avatarUrl": "/creators/daniel-titchener.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    "location": "Austin, TX, USA",
    "region": "USA",
    "countryCode": "US",
    "countryFlag": "🇺🇸",
    "languages": [
      "English"
    ],
    "primaryCategory": "Visual Storytelling & Design",
    "secondaryCategories": [
      "Tech & Gadgets",
      "Travel & Lifestyle"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.98,
    "completedCampaignsCount": 35,
    "totalFollowers": 95000,
    "avgEngagementRate": 6.2,
    "startingPrice": 650,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 100,
    "qualityScore": 99,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/daniel_titchener/",
    "instagramUsername": "daniel_titchener",
    "turnaroundGuaranteedDays": 5,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-dtitch-ig",
        "platform": "instagram",
        "handle": "daniel_titchener",
        "url": "https://www.instagram.com/daniel_titchener/",
        "followers": 95000,
        "engagementRate": 6.2,
        "avgViews": 52000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "United States",
          "percentage": 68
        },
        {
          "country": "United Kingdom",
          "percentage": 14
        },
        {
          "country": "Canada",
          "percentage": 9
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 24
        },
        {
          "range": "25-34",
          "percentage": 56
        },
        {
          "range": "35-44",
          "percentage": 16
        },
        {
          "range": "45+",
          "percentage": 4
        }
      ],
      "genderSplit": [
        {
          "gender": "Male",
          "percentage": 65
        },
        {
          "gender": "Female",
          "percentage": 33
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Minimalist Architecture",
        "Desk Accessories",
        "Ergonomics",
        "Design Books"
      ]
    },
    "rateCards": [
      {
        "id": "rc-dtitch-1",
        "deliverableType": "Instagram Reel",
        "title": "Architectural Workspace Integration (60s)",
        "description": "Cinematic visual pacing showcasing thoughtful product integration within a tranquil minimalist studio.",
        "basePrice": 650,
        "turnaroundDays": 5,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-dtitch-2",
        "deliverableType": "Carousel Post",
        "title": "Minimalist Design Details Carousel (6-8 Slides)",
        "description": "High-contrast architectural photography emphasizing materials, finish, and ergonomics.",
        "basePrice": 450,
        "turnaroundDays": 4,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-caimar-salizi",
    "userId": "user-c-caimar",
    "fullName": "Caimar Salizi",
    "handle": "caimarsalizi",
    "slug": "caimar-salizi",
    "headline": "Creative Technologist & Cinematic Workspace Curator",
    "bio": "Designing productive digital spaces. Exploring mobile workflows, desktop peripherals & thoughtful everyday carry.",
    "avatarUrl": "/creators/caimar-salizi.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    "location": "Los Angeles, CA, USA",
    "region": "USA",
    "countryCode": "US",
    "countryFlag": "🇺🇸",
    "languages": [
      "English"
    ],
    "primaryCategory": "Tech & Gadgets",
    "secondaryCategories": [
      "Visual Storytelling & Design"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.96,
    "completedCampaignsCount": 29,
    "totalFollowers": 97600,
    "avgEngagementRate": 5.9,
    "startingPrice": 620,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 99,
    "qualityScore": 98,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/caimarsalizi/",
    "instagramUsername": "caimarsalizi",
    "turnaroundGuaranteedDays": 5,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-caimar-ig",
        "platform": "instagram",
        "handle": "caimarsalizi",
        "url": "https://www.instagram.com/caimarsalizi/",
        "followers": 97600,
        "engagementRate": 5.9,
        "avgViews": 48000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "United States",
          "percentage": 71
        },
        {
          "country": "Canada",
          "percentage": 12
        },
        {
          "country": "United Kingdom",
          "percentage": 8
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 30
        },
        {
          "range": "25-34",
          "percentage": 52
        },
        {
          "range": "35-44",
          "percentage": 14
        },
        {
          "range": "45+",
          "percentage": 4
        }
      ],
      "genderSplit": [
        {
          "gender": "Male",
          "percentage": 70
        },
        {
          "gender": "Female",
          "percentage": 28
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Everyday Carry",
        "Mobile Workflows",
        "Desk Lighting",
        "Mechanical Accessories"
      ]
    },
    "rateCards": [
      {
        "id": "rc-cs-1",
        "deliverableType": "Instagram Reel",
        "title": "Cinematic EDC & Setup Feature (60s)",
        "description": "Clean transitions, natural light, and macro audio showcasing tactile feedback and design.",
        "basePrice": 620,
        "turnaroundDays": 5,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-cs-2",
        "deliverableType": "Carousel Post",
        "title": "Setup Layout Breakdown Stills (6 Slides)",
        "description": "Top-down knolling photography of gear accompanied by detailed review captions.",
        "basePrice": 420,
        "turnaroundDays": 4,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-martin-flindt",
    "userId": "user-c-martinflindt",
    "fullName": "Martin Flindt",
    "handle": "cameracave",
    "slug": "martin-flindt",
    "headline": "Filmmaker, Lens Optics & Visual Storytelling Specialist",
    "bio": "Host of Camera Cave. Testing optics, lighting setups & cinema cameras for independent visual creators.",
    "avatarUrl": "/creators/martin-flindt.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1200&auto=format&fit=crop&q=80",
    "location": "New York, NY, USA",
    "region": "USA",
    "countryCode": "US",
    "countryFlag": "🇺🇸",
    "languages": [
      "English"
    ],
    "primaryCategory": "Visual Storytelling & Design",
    "secondaryCategories": [
      "Tech & Gadgets"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.97,
    "completedCampaignsCount": 28,
    "totalFollowers": 64200,
    "avgEngagementRate": 6.0,
    "startingPrice": 580,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 99,
    "qualityScore": 98,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/cameracave/",
    "instagramUsername": "cameracave",
    "turnaroundGuaranteedDays": 5,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-cc-ig",
        "platform": "instagram",
        "handle": "cameracave",
        "url": "https://www.instagram.com/cameracave/",
        "followers": 64200,
        "engagementRate": 6.0,
        "avgViews": 38000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "United States",
          "percentage": 65
        },
        {
          "country": "Germany",
          "percentage": 12
        },
        {
          "country": "United Kingdom",
          "percentage": 10
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 22
        },
        {
          "range": "25-34",
          "percentage": 54
        },
        {
          "range": "35-44",
          "percentage": 18
        },
        {
          "range": "45+",
          "percentage": 6
        }
      ],
      "genderSplit": [
        {
          "gender": "Male",
          "percentage": 78
        },
        {
          "gender": "Female",
          "percentage": 20
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Anamorphic Lenses",
        "Lighting Design",
        "Color Science",
        "Gimbals & Rigging"
      ]
    },
    "rateCards": [
      {
        "id": "rc-mf-1",
        "deliverableType": "Instagram Reel",
        "title": "Cinematic Gear Rig & Optics Reel (60s)",
        "description": "Professional 10-bit cinema-graded reel showcasing camera accessories or lighting solutions.",
        "basePrice": 580,
        "turnaroundDays": 5,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-mf-2",
        "deliverableType": "Carousel Post",
        "title": "Optics & Lighting Breakdown Slides (6 Slides)",
        "description": "Before/after lighting ratios and technical frame samples with gear tag overlay.",
        "basePrice": 380,
        "turnaroundDays": 4,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-ekaterina",
    "userId": "user-c-ekaterina",
    "fullName": "Ekaterina Lovik",
    "handle": "ekaterina_lovik",
    "slug": "ekaterina-lovik",
    "headline": "Clean Girl Aesthetic, Hydration Science & Elevated Self-Care",
    "bio": "Minimalist skincare rituals, cold-climate barrier protection & clean beauty routines for sensitive skin types.",
    "avatarUrl": "/creators/ekaterina-lovik.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80",
    "location": "Chicago, IL, USA",
    "region": "USA",
    "countryCode": "US",
    "countryFlag": "🇺🇸",
    "languages": [
      "English"
    ],
    "primaryCategory": "Beauty & Skincare",
    "secondaryCategories": [
      "Fashion & Style"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.95,
    "completedCampaignsCount": 24,
    "totalFollowers": 52000,
    "avgEngagementRate": 6.3,
    "startingPrice": 500,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 98,
    "qualityScore": 97,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/ekaterina_lovik/",
    "instagramUsername": "ekaterina_lovik",
    "turnaroundGuaranteedDays": 4,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-el-ig",
        "platform": "instagram",
        "handle": "ekaterina_lovik",
        "url": "https://www.instagram.com/ekaterina_lovik/",
        "followers": 52000,
        "engagementRate": 6.3,
        "avgViews": 32000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "United States",
          "percentage": 73
        },
        {
          "country": "Canada",
          "percentage": 14
        },
        {
          "country": "Australia",
          "percentage": 7
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 42
        },
        {
          "range": "25-34",
          "percentage": 48
        },
        {
          "range": "35-44",
          "percentage": 8
        },
        {
          "range": "45+",
          "percentage": 2
        }
      ],
      "genderSplit": [
        {
          "gender": "Female",
          "percentage": 86
        },
        {
          "gender": "Male",
          "percentage": 12
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Clean Skincare",
        "Glazed Skin Aesthetics",
        "Barrier Repair",
        "Minimalist Routine"
      ]
    },
    "rateCards": [
      {
        "id": "rc-el-1",
        "deliverableType": "Instagram Reel",
        "title": "Aesthetic Barrier Routine & Product Integration Reel",
        "description": "Calm, softly lit morning application video with sensory texture focus and ingredient narration.",
        "basePrice": 500,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-el-2",
        "deliverableType": "Carousel Post",
        "title": "Step-by-Step Texture Carousel (5-7 Slides)",
        "description": "Macro skin texture and product dispensing photography highlighting hydration finish.",
        "basePrice": 350,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-liv-schreiber",
    "userId": "user-c-liv",
    "fullName": "Liv Schreiber",
    "handle": "livschreiber",
    "slug": "liv-schreiber",
    "headline": "Brand Stylist, Modern Wardrobe Curation & Female Entrepreneur",
    "bio": "Stylist & digital founder in NYC. Sharing versatile capsule outfits, high-low styling formulas & modern professional life.",
    "avatarUrl": "/creators/liv-schreiber.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80",
    "location": "New York, NY, USA",
    "region": "USA",
    "countryCode": "US",
    "countryFlag": "🇺🇸",
    "languages": [
      "English"
    ],
    "primaryCategory": "Fashion & Style",
    "secondaryCategories": [
      "Visual Storytelling & Design",
      "Education & Coaching"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.96,
    "completedCampaignsCount": 27,
    "totalFollowers": 50000,
    "avgEngagementRate": 6.5,
    "startingPrice": 520,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 99,
    "qualityScore": 98,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/livschreiber/",
    "instagramUsername": "livschreiber",
    "turnaroundGuaranteedDays": 4,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-ls-ig",
        "platform": "instagram",
        "handle": "livschreiber",
        "url": "https://www.instagram.com/livschreiber/",
        "followers": 50000,
        "engagementRate": 6.5,
        "avgViews": 35000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "United States",
          "percentage": 82
        },
        {
          "country": "Canada",
          "percentage": 9
        },
        {
          "country": "United Kingdom",
          "percentage": 5
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 36
        },
        {
          "range": "25-34",
          "percentage": 50
        },
        {
          "range": "35-44",
          "percentage": 11
        },
        {
          "range": "45+",
          "percentage": 3
        }
      ],
      "genderSplit": [
        {
          "gender": "Female",
          "percentage": 87
        },
        {
          "gender": "Male",
          "percentage": 11
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "NYC Styling",
        "Capsule Wardrobes",
        "High-Low Fashion",
        "Female Founders"
      ]
    },
    "rateCards": [
      {
        "id": "rc-ls-1",
        "deliverableType": "Instagram Reel",
        "title": "NYC High-Low Styling Reel (60s)",
        "description": "Fast-paced, vibrant street-style video breaking down transitional looks for work and evening.",
        "basePrice": 520,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-ls-2",
        "deliverableType": "Carousel Post",
        "title": "Curated Lookbook Grid (6 Slides)",
        "description": "High-res urban photography highlighting tailoring, footwear, and jewelry curation.",
        "basePrice": 360,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  },
  {
    "id": "creator-vanshika",
    "userId": "user-c-vanshika",
    "fullName": "Vanshika Tomar",
    "handle": "vanshikat",
    "slug": "vanshika-tomar",
    "headline": "Product Designer, Human-Centered Tech & Everyday Carry",
    "bio": "Carnegie Mellon alumnus. Documenting product design workflows, software engineering culture & smart tech gear.",
    "avatarUrl": "/creators/vanshika-tomar.jpg",
    "coverImageUrl": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    "location": "Pittsburgh, PA, USA",
    "region": "USA",
    "countryCode": "US",
    "countryFlag": "🇺🇸",
    "languages": [
      "English",
      "Hindi"
    ],
    "primaryCategory": "Tech & Gadgets",
    "secondaryCategories": [
      "Visual Storytelling & Design",
      "Education & Coaching"
    ],
    "verified": true,
    "featured": true,
    "tier": "Mid-Tier",
    "rating": 4.95,
    "completedCampaignsCount": 26,
    "totalFollowers": 80000,
    "avgEngagementRate": 6.1,
    "startingPrice": 550,
    "currency": "USD",
    "availableForHire": true,
    "isSignedTalent": true,
    "profileCompleteness": 99,
    "qualityScore": 98,
    "profileSource": "abeycollab_verified",
    "isInstagramVerified": true,
    "isAbeyCollabVerified": true,
    "isClaimedOnAbeyCollab": true,
    "instagramUrl": "https://www.instagram.com/vanshikat/",
    "instagramUsername": "vanshikat",
    "turnaroundGuaranteedDays": 4,
    "dataAttribution": {
      "instagramDataSourcedAt": "2026-09",
      "rateType": "creator_direct",
      "disclaimer": "Verified creator profile on AbeyCollab. Managed with escrow milestone protection."
    },
    "socialAccounts": [
      {
        "id": "sa-vt-ig",
        "platform": "instagram",
        "handle": "vanshikat",
        "url": "https://www.instagram.com/vanshikat/",
        "followers": 80000,
        "engagementRate": 6.1,
        "avgViews": 44000,
        "verifiedBadge": true
      }
    ],
    "audience": {
      "topCountries": [
        {
          "country": "United States",
          "percentage": 70
        },
        {
          "country": "India",
          "percentage": 18
        },
        {
          "country": "Canada",
          "percentage": 7
        }
      ],
      "ageDistribution": [
        {
          "range": "18-24",
          "percentage": 38
        },
        {
          "range": "25-34",
          "percentage": 50
        },
        {
          "range": "35-44",
          "percentage": 10
        },
        {
          "range": "45+",
          "percentage": 2
        }
      ],
      "genderSplit": [
        {
          "gender": "Female",
          "percentage": 54
        },
        {
          "gender": "Male",
          "percentage": 44
        },
        {
          "gender": "Other",
          "percentage": 2
        }
      ],
      "interests": [
        "Design Systems",
        "Product Management",
        "Tech Career Growth",
        "Productivity Hardware"
      ]
    },
    "rateCards": [
      {
        "id": "rc-vt-1",
        "deliverableType": "Instagram Reel",
        "title": "Tech Workflow & Design Tool Integration Reel",
        "description": "Crisp, thoughtfully narrated reel demonstrating hardware or design software utility.",
        "basePrice": 550,
        "turnaroundDays": 4,
        "revisionsIncluded": 2,
        "currency": "USD"
      },
      {
        "id": "rc-vt-2",
        "deliverableType": "Carousel Post",
        "title": "Design Career / Workspace System Carousel (6 Slides)",
        "description": "Informative graphics and clean desk photography delivering actionable tips.",
        "basePrice": 380,
        "turnaroundDays": 3,
        "revisionsIncluded": 1,
        "currency": "USD"
      }
    ]
  }
] as unknown as CreatorProfile[];

export const FOUNDING_COHORT_PROFILES: CreatorProfile[] = MOCK_CREATORS;

export const FEATURED_CREATORS: CreatorProfile[] = MOCK_CREATORS.filter((c) => c.featured);
