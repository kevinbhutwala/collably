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
    briefDescription: "Source 3 full-stack engineers to record 60s in-editor code walkthroughs showing live API latency and terminal deployment.",
    recommendedBudget: 3500,
    currency: "USD",
    targetDeliverable: "YouTube 60s In-Video Integration",
    targetTimelineDays: 7,
    expectedReach: "450K+",
    expectedEngagement: "6.2%",
    expectedROIRange: "3.8× – 5.2×",
    creators: [
      {
        name: "Devon Thorne",
        handle: "@devoncodes",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
        followers: "340K",
        er: "6.8%",
        rate: "$2,400",
        match: 98,
      },
      {
        name: "Elena Rostova",
        handle: "@elenatech",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
        followers: "485K",
        er: "6.4%",
        rate: "$2,200",
        match: 96,
      },
      {
        name: "Marcus Vance",
        handle: "@marcuscodes",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
        followers: "310K",
        er: "5.8%",
        rate: "$2,800",
        match: 94,
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
    recommendedBudget: 3200,
    currency: "USD",
    targetDeliverable: "Instagram Reel + YouTube Short",
    targetTimelineDays: 5,
    expectedReach: "620K+",
    expectedEngagement: "7.1%",
    expectedROIRange: "4.1× – 5.8×",
    creators: [
      {
        name: "Aria Chen",
        handle: "@ariachenwellness",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=160&auto=format&fit=crop&q=80",
        followers: "620K",
        er: "7.1%",
        rate: "$3,200",
        match: 99,
      },
      {
        name: "Siddharth Nair",
        handle: "@siddharth.fits",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&auto=format&fit=crop&q=80",
        followers: "420K",
        er: "6.8%",
        rate: "$2,400",
        match: 95,
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
    recommendedBudget: 3000,
    currency: "USD",
    targetDeliverable: "Instagram Reel + TikTok Video",
    targetTimelineDays: 8,
    expectedReach: "520K+",
    expectedEngagement: "8.2%",
    expectedROIRange: "4.5× – 6.2×",
    creators: [
      {
        name: "Chloe Dubois",
        handle: "@chloedubois_paris",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&auto=format&fit=crop&q=80",
        followers: "520K",
        er: "8.2%",
        rate: "$3,000",
        match: 99,
      },
    ],
  },
  {
    id: "fashion",
    name: "Fashion & Apparel",
    tag: "👔 Minimalist & Heritage Wear",
    iconName: "Shirt",
    briefTitle: "Autumn Capsule Wardrobe Lookbook & Material Review",
    briefDescription: "Cinematic 4K lookbook highlighting Japanese selvedge denim, organic wool tailoring, and versatile styling.",
    recommendedBudget: 2800,
    currency: "USD",
    targetDeliverable: "Cinematic 4K Video Lookbook",
    targetTimelineDays: 10,
    expectedReach: "310K+",
    expectedEngagement: "5.8%",
    expectedROIRange: "3.5× – 4.9×",
    creators: [
      {
        name: "Marcus Vance",
        handle: "@marcusvance",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80",
        followers: "310K",
        er: "5.8%",
        rate: "$2,800",
        match: 97,
      },
    ],
  },
  {
    id: "food",
    name: "Food & Beverage",
    tag: "🍳 Culinary Science & Artisan Cookware",
    iconName: "Utensils",
    briefTitle: "Precision Temperature Control & Artisan Pan Review",
    briefDescription: "High-speed macro footage demonstrating heat retention, sear quality, and easy cleanup with a signature recipe.",
    recommendedBudget: 2200,
    currency: "USD",
    targetDeliverable: "Instagram Reel + Recipe Hook",
    targetTimelineDays: 7,
    expectedReach: "390K+",
    expectedEngagement: "6.7%",
    expectedROIRange: "3.9× – 5.4×",
    creators: [
      {
        name: "Maya Lin-Bates",
        handle: "@mayacooks",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&auto=format&fit=crop&q=80",
        followers: "390K",
        er: "6.7%",
        rate: "$2,200",
        match: 98,
      },
    ],
  },
  {
    id: "gaming",
    name: "Gaming & Hardware",
    tag: "🎮 Esports & Peripherals",
    iconName: "Gamepad2",
    briefTitle: "Ultra-Low Latency Mouse & Rapid Trigger Keyboard QA",
    briefDescription: "Oscilloscope latency testing, sensor tracking benchmarks, and competitive gameplay showcase.",
    recommendedBudget: 3800,
    currency: "USD",
    targetDeliverable: "YouTube Dedicated Video",
    targetTimelineDays: 10,
    expectedReach: "750K+",
    expectedEngagement: "8.9%",
    expectedROIRange: "4.2× – 6.0×",
    creators: [
      {
        name: "Kai Takahashi",
        handle: "@kaigaming",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=160&auto=format&fit=crop&q=80",
        followers: "750K",
        er: "8.9%",
        rate: "$3,800",
        match: 99,
      },
    ],
  },
];
