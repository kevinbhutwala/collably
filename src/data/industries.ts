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
    recommendedBudget: 3500,
    currency: "USD",
    targetDeliverable: "YouTube 60s In-Video Integration",
    targetTimelineDays: 7,
    expectedReach: "450K+",
    expectedEngagement: "6.2%",
    expectedROIRange: "3.8× – 5.2×",
    creators: [
      {
        name: "Marques Brownlee",
        handle: "@mkbhd",
        avatar: "/creators/mkbhd.jpg",
        followers: "18.8M",
        er: "7.4%",
        rate: "$15,000",
        match: 99,
      },
      {
        name: "Sara Dietschy",
        handle: "@saradietschy",
        avatar: "/creators/sara-dietschy.jpg",
        followers: "920K",
        er: "6.8%",
        rate: "$3,500",
        match: 98,
      },
      {
        name: "Ankur Warikoo",
        handle: "@ankurwarikoo",
        avatar: "/creators/ankur-warikoo.webp",
        followers: "3.2M",
        er: "5.8%",
        rate: "$3,500",
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
    recommendedBudget: 3200,
    currency: "USD",
    targetDeliverable: "Instagram Reel + YouTube Short",
    targetTimelineDays: 5,
    expectedReach: "620K+",
    expectedEngagement: "7.1%",
    expectedROIRange: "4.1× – 5.8×",
    creators: [
      {
        name: "Murad Osmann",
        handle: "@muradosmann",
        avatar: "/creators/murad-osmann.jpg",
        followers: "3.5M",
        er: "6.2%",
        rate: "$4,500",
        match: 97,
      },
      {
        name: "Karen Wazen",
        handle: "@karenwazen",
        avatar: "/creators/karen-wazen.jpg",
        followers: "7.9M",
        er: "5.8%",
        rate: "$6,500",
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
    recommendedBudget: 3000,
    currency: "USD",
    targetDeliverable: "Instagram Reel + TikTok Video",
    targetTimelineDays: 8,
    expectedReach: "520K+",
    expectedEngagement: "8.2%",
    expectedROIRange: "4.5× – 6.2×",
    creators: [
      {
        name: "Huda Kattan",
        handle: "@hudabeauty",
        avatar: "/creators/huda-kattan.jpg",
        followers: "54M",
        er: "3.2%",
        rate: "$25,000",
        match: 99,
      },
      {
        name: "Kusha Kapila",
        handle: "@kushakapila",
        avatar: "/creators/kusha-kapila.jpg",
        followers: "3.6M",
        er: "6.1%",
        rate: "$3,200",
        match: 98,
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
        name: "Emma Chamberlain",
        handle: "@emmachamberlain",
        avatar: "/creators/emma-chamberlain.png",
        followers: "15.8M",
        er: "6.2%",
        rate: "$18,000",
        match: 99,
      },
      {
        name: "Peter McKinnon",
        handle: "@petermckinnon",
        avatar: "/creators/peter-mckinnon.jpg",
        followers: "5.9M",
        er: "6.9%",
        rate: "$8,500",
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
        name: "Joshua Weissman",
        handle: "@joshuaweissman",
        avatar: "/creators/joshua-weissman.jpg",
        followers: "8.2M",
        er: "7.5%",
        rate: "$6,500",
        match: 99,
      },
      {
        name: "Prajakta Koli",
        handle: "@mostlysane",
        avatar: "/creators/prajakta-koli.png",
        followers: "5.2M",
        er: "6.4%",
        rate: "$3,800",
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
        name: "CarryMinati",
        handle: "@carryminati",
        avatar: "/creators/carryminati.jpg",
        followers: "43M",
        er: "9.2%",
        rate: "$18,000",
        match: 99,
      },
      {
        name: "Tanmay Bhat",
        handle: "@tanmaybhat",
        avatar: "/creators/tanmay-bhat.png",
        followers: "4.8M",
        er: "7.2%",
        rate: "$4,200",
        match: 98,
      },
    ],
  },
];
