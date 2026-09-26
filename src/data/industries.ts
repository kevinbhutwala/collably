export interface IndustryPreset {
  id: string;
  name: string;
  tag: string;
  iconName: string;
  briefTitle: string;
  briefDescription: string;
  recommendedBudget: number;
  currency: "USD";
  targetDeliverable: string;
  targetTimelineDays: number;
  expectedReach: string;
  expectedEngagement: string;
  expectedROIRange: string;
  creators: {
    name: string;
    handle: string;
    avatar: string;
    followers: string;
    er: string;
    rate: string;
    match: number;
  }[];
}

export const INDUSTRY_PRESETS: IndustryPreset[] = [
  {
    id: "tech-saas",
    name: "Technology & SaaS",
    tag: "⚡ Developer Tools & AI",
    iconName: "Cpu",
    briefTitle: "Developer Evangelist Integration for Next-Gen AI SDK",
    briefDescription: "Source verified tech creators to record 60s in-editor code walkthroughs showing live API latency and terminal deployment.",
    recommendedBudget: 1200,
    currency: "USD",
    targetDeliverable: "YouTube 60s In-Video Integration",
    targetTimelineDays: 7,
    expectedReach: "120K+",
    expectedEngagement: "5.4%",
    expectedROIRange: "3.8× – 5.2×",
    creators: [
      {
        name: "Decoding Tech",
        handle: "@decodingtech",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
        followers: "81.9K",
        er: "5.2%",
        rate: "$390",
        match: 99,
      },
      {
        name: "Gurfan Shaikh",
        handle: "@gurfanshaikh",
        avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&auto=format&fit=crop&q=80",
        followers: "62K",
        er: "5.7%",
        rate: "$330",
        match: 98,
      },
      {
        name: "Daniel Titchener",
        handle: "@daniel_titchener",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
        followers: "95K",
        er: "5.4%",
        rate: "$580",
        match: 97,
      },
    ],
  },
  {
    id: "fitness",
    name: "Fitness & Wellness",
    tag: "🔥 Fitness & Longevity",
    iconName: "Activity",
    briefTitle: "Biometric Smartwatch & Cold Therapy Showcase",
    briefDescription: "Creator-led 4K video showing real-time heart rate variability, sleep recovery tracking, and daily athletic routine integration.",
    recommendedBudget: 950,
    currency: "USD",
    targetDeliverable: "Instagram Reel + YouTube Short",
    targetTimelineDays: 5,
    expectedReach: "140K+",
    expectedEngagement: "6.8%",
    expectedROIRange: "4.1× – 5.8×",
    creators: [
      {
        name: "Harish Vekariya",
        handle: "@harish_vekariya88",
        avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
        followers: "74K",
        er: "7.1%",
        rate: "$320",
        match: 98,
      },
      {
        name: "Namratha Suresh Achar",
        handle: "@namratha.achar",
        avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&auto=format&fit=crop&q=80",
        followers: "58K",
        er: "6.5%",
        rate: "$290",
        match: 96,
      },
    ],
  },
  {
    id: "beauty",
    name: "Beauty & Cosmetics",
    tag: "✨ Clean Skincare & Barrier Science",
    iconName: "Sparkles",
    briefTitle: "14-Day Barrier Repair Routine & Ingredient Breakdown",
    briefDescription: "Unfiltered ingredient chemistry breakdowns showing macro texture B-roll and 14-day clinical results.",
    recommendedBudget: 1100,
    currency: "USD",
    targetDeliverable: "Instagram Reel + Carousel Post",
    targetTimelineDays: 8,
    expectedReach: "110K+",
    expectedEngagement: "6.4%",
    expectedROIRange: "4.5× – 6.2×",
    creators: [
      {
        name: "Dr. Sehitha",
        handle: "@sehithamd",
        avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80",
        followers: "52K",
        er: "6.4%",
        rate: "$480",
        match: 99,
      },
      {
        name: "Yoganshi",
        handle: "@yoganshi31",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80",
        followers: "52K",
        er: "6.2%",
        rate: "$260",
        match: 97,
      },
    ],
  },
  {
    id: "fashion",
    name: "Fashion & Apparel",
    tag: "👔 Minimalist & Contemporary Wear",
    iconName: "Shirt",
    briefTitle: "Autumn Capsule Wardrobe Lookbook & Material Review",
    briefDescription: "Cinematic 4K lookbook highlighting Japanese selvedge denim, organic wool tailoring, and versatile styling.",
    recommendedBudget: 1400,
    currency: "USD",
    targetDeliverable: "Cinematic 4K Video Lookbook",
    targetTimelineDays: 7,
    expectedReach: "160K+",
    expectedEngagement: "6.2%",
    expectedROIRange: "3.5× – 4.9×",
    creators: [
      {
        name: "Prarthana",
        handle: "@prarthaana.04",
        avatar: "/creators/prarthana.jpg",
        followers: "30K",
        er: "6.8%",
        rate: "$450",
        match: 99,
      },
      {
        name: "Dipti Parihar Sharma",
        handle: "@diptipariharsharma",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
        followers: "99.3K",
        er: "5.8%",
        rate: "$420",
        match: 98,
      },
      {
        name: "Damini Sinha",
        handle: "@daminisinha",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
        followers: "99.9K",
        er: "5.6%",
        rate: "$460",
        match: 97,
      },
    ],
  },
  {
    id: "food",
    name: "Food & Beverage",
    tag: "☕ Artisan Coffee & Culinary Science",
    iconName: "Utensils",
    briefTitle: "Single-Origin Pour-Over Ritual & Culinary Pairing",
    briefDescription: "High-speed macro footage demonstrating heat retention, single-origin bloom, and home cafe styling.",
    recommendedBudget: 850,
    currency: "USD",
    targetDeliverable: "Instagram Reel + Recipe Hook",
    targetTimelineDays: 5,
    expectedReach: "95K+",
    expectedEngagement: "7.0%",
    expectedROIRange: "3.9× – 5.4×",
    creators: [
      {
        name: "Ashfina Charania",
        handle: "@thewickedsoul",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
        followers: "65K",
        er: "6.9%",
        rate: "$340",
        match: 99,
      },
      {
        name: "Kushi Hanamsagar",
        handle: "@kushihanamsagar9",
        avatar: "/creators/kushi-hanamsagar.jpg",
        followers: "869",
        er: "7.4%",
        rate: "$150",
        match: 98,
      },
    ],
  },
  {
    id: "design-travel",
    name: "Design & Visual Arts",
    tag: "📸 Cinematography & Architecture",
    iconName: "Camera",
    briefTitle: "Urban Architecture 4K Cinematography Series",
    briefDescription: "4K architectural street cinematography, dramatic lighting b-roll, and creator camera breakdown.",
    recommendedBudget: 1500,
    currency: "USD",
    targetDeliverable: "4K Cinematic Showcase",
    targetTimelineDays: 7,
    expectedReach: "190K+",
    expectedEngagement: "7.2%",
    expectedROIRange: "4.2× – 6.0×",
    creators: [
      {
        name: "Ujwal Puri",
        handle: "@ompsyram",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
        followers: "100K",
        er: "7.8%",
        rate: "$550",
        match: 99,
      },
      {
        name: "Shriya Dwivedi",
        handle: "@shriyadwivedi",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
        followers: "98K",
        er: "6.1%",
        rate: "$440",
        match: 98,
      },
    ],
  },
];
