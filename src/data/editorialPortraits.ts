/**
 * Curated Editorial Portrait & Brand Registry for AbeyCollab Ultramarine × Infrared Redesign
 * High-fashion, modern creator campaign photography with varied crops, angles, and color treatments (Big, Medium, Small).
 */

export interface EditorialPortrait {
  id: string;
  name: string;
  handle: string;
  niche: string;
  category: "TECH" | "FASHION" | "FITNESS" | "BEAUTY" | "TRAVEL" | "GAMING" | "DESIGN" | "CULINARY";
  sizeScale: "big" | "medium" | "small";
  role: "Main Anchor Male" | "Main Anchor Female" | "Supporting Female" | "Supporting Male" | "Supporting Roster";
  imageUrl: string;
  aspectRatio: string;
  colorTreatment: "natural" | "monochrome" | "ultramarine-duotone" | "infrared-tint" | "high-contrast";
  cropFocus: "close-up" | "half-body" | "three-quarter" | "upper-torso";
  followersFormatted: string;
  engagementFormatted: string;
  verifiedRate: string;
  verifiedRateAmount?: number;
  matchScore: number;
  featuredBrand?: string;
}

export interface EditorialBrand {
  id: string;
  name: string;
  tagline: string;
  industry: string;
  sizeScale: "big" | "medium" | "small";
  logoEmblem: string; // Text / SVG monogram
  activeDealsCount: number;
  totalVolume: string;
  totalVolumeAmount?: number;
  featuredCreator: string;
  badgeType: "primary" | "ultramarine" | "infrared" | "monochrome";
}

export const EDITORIAL_PORTRAITS: Record<string, EditorialPortrait> = {
  // ── BIG PORTRAITS (HERO & MAJOR ANCHORS) ──
  heroMaleMain: {
    id: "port-m1",
    name: "Marques Brownlee",
    handle: "mkbhd",
    niche: "Consumer Tech & Hardware Review",
    category: "TECH",
    sizeScale: "big",
    role: "Main Anchor Male",
    imageUrl: "/creators/mkbhd.jpg",
    aspectRatio: "4/5",
    colorTreatment: "high-contrast",
    cropFocus: "close-up",
    followersFormatted: "4.8M",
    engagementFormatted: "5.4%",
    verifiedRate: "$25,000",
    verifiedRateAmount: 25000,
    matchScore: 99,
    featuredBrand: "VERTEX LABS",
  },
  heroFemaleMain: {
    id: "port-f1",
    name: "Sara Dietschy",
    handle: "saradietschy",
    niche: "Creative Tech & Studio Production",
    category: "TECH",
    sizeScale: "big",
    role: "Main Anchor Female",
    imageUrl: "/creators/sara-dietschy.jpg",
    aspectRatio: "3/4",
    colorTreatment: "ultramarine-duotone",
    cropFocus: "three-quarter",
    followersFormatted: "360K",
    engagementFormatted: "4.9%",
    verifiedRate: "$6,500",
    verifiedRateAmount: 6500,
    matchScore: 98,
    featuredBrand: "NOVA STUDIO",
  },
  bigFemaleEditorial: {
    id: "port-f4",
    name: "Prajakta Koli",
    handle: "mostlysane",
    niche: "Comedy & Narrative Storytelling",
    category: "FASHION",
    sizeScale: "big",
    role: "Supporting Female",
    imageUrl: "/creators/prajakta-koli.png",
    aspectRatio: "4/5",
    colorTreatment: "high-contrast",
    cropFocus: "half-body",
    followersFormatted: "5.2M",
    engagementFormatted: "6.4%",
    verifiedRate: "$15,000",
    verifiedRateAmount: 15000,
    matchScore: 98,
    featuredBrand: "NORTH FORM",
  },

  // ── MEDIUM PORTRAITS (POLAROID & EDITORIAL STRIPS) ──
  supportingFemale1: {
    id: "port-f2",
    name: "Huda Kattan",
    handle: "hudabeauty",
    niche: "Clean Beauty & Skincare Masterclass",
    category: "BEAUTY",
    sizeScale: "medium",
    role: "Supporting Female",
    imageUrl: "/creators/huda-kattan.jpg",
    aspectRatio: "1/1",
    colorTreatment: "infrared-tint",
    cropFocus: "half-body",
    followersFormatted: "54M",
    engagementFormatted: "3.2%",
    verifiedRate: "$35,000",
    verifiedRateAmount: 35000,
    matchScore: 96,
    featuredBrand: "NOTION",
  },
  supportingMale1: {
    id: "port-m2",
    name: "Peter McKinnon",
    handle: "petermckinnon",
    niche: "Cinematic Photography & Visual FX",
    category: "DESIGN",
    sizeScale: "medium",
    role: "Supporting Male",
    imageUrl: "/creators/peter-mckinnon.jpg",
    aspectRatio: "4/5",
    colorTreatment: "monochrome",
    cropFocus: "upper-torso",
    followersFormatted: "3.1M",
    engagementFormatted: "4.8%",
    verifiedRate: "$18,000",
    verifiedRateAmount: 18000,
    matchScore: 98,
    featuredBrand: "KINETIC",
  },
  supportingFemale2: {
    id: "port-f3",
    name: "Kusha Kapila",
    handle: "kushakapila",
    niche: "Satirical Comedy & Fashion Direction",
    category: "FASHION",
    sizeScale: "medium",
    role: "Supporting Roster",
    imageUrl: "/creators/kusha-kapila.jpg",
    aspectRatio: "3/4",
    colorTreatment: "natural",
    cropFocus: "three-quarter",
    followersFormatted: "3.6M",
    engagementFormatted: "6.1%",
    verifiedRate: "$14,000",
    verifiedRateAmount: 14000,
    matchScore: 97,
    featuredBrand: "AURA AUDIO",
  },

  // ── SMALL PORTRAITS (STAMPS, CAMERA BADGES, EMBEDDED PILLS) ──
  supportingMale2: {
    id: "port-m3",
    name: "Zach King",
    handle: "zachking",
    niche: "Visual Magic & Short-form Illusions",
    category: "DESIGN",
    sizeScale: "small",
    role: "Supporting Roster",
    imageUrl: "/creators/zach-king.jpg",
    aspectRatio: "1/1",
    colorTreatment: "ultramarine-duotone",
    cropFocus: "close-up",
    followersFormatted: "24.5M",
    engagementFormatted: "5.8%",
    verifiedRate: "$40,000",
    verifiedRateAmount: 40000,
    matchScore: 99,
    featuredBrand: "HYPERION",
  },
  smallStampFemale1: {
    id: "port-m5",
    name: "Murad Osmann",
    handle: "muradosmann",
    niche: "Iconic Global Travel & Photography",
    category: "TRAVEL",
    sizeScale: "small",
    role: "Supporting Roster",
    imageUrl: "/creators/murad-osmann.jpg",
    aspectRatio: "1/1",
    colorTreatment: "natural",
    cropFocus: "close-up",
    followersFormatted: "3.5M",
    engagementFormatted: "4.6%",
    verifiedRate: "$16,000",
    verifiedRateAmount: 16000,
    matchScore: 96,
    featuredBrand: "SOLARIS",
  },
  smallStampMale1: {
    id: "port-m4",
    name: "Ankur Warikoo",
    handle: "ankurwarikoo",
    niche: "Entrepreneurship & Growth Frameworks",
    category: "TECH",
    sizeScale: "small",
    role: "Supporting Roster",
    imageUrl: "/creators/ankur-warikoo.webp",
    aspectRatio: "1/1",
    colorTreatment: "infrared-tint",
    cropFocus: "close-up",
    followersFormatted: "3.2M",
    engagementFormatted: "5.8%",
    verifiedRate: "$12,000",
    verifiedRateAmount: 12000,
    matchScore: 99,
    featuredBrand: "AURA AUDIO",
  },
};

export const EDITORIAL_ROSTER = Object.values(EDITORIAL_PORTRAITS);

export const EDITORIAL_BRANDS: EditorialBrand[] = [
  {
    id: "brand-1",
    name: "VERTEX / LABS",
    tagline: "Intelligent Hardware & Spatial Robotics",
    industry: "Consumer Electronics",
    sizeScale: "big",
    logoEmblem: "VTX",
    activeDealsCount: 18,
    totalVolume: "$48,000",
    totalVolumeAmount: 48000,
    featuredCreator: "Marques Brownlee",
    badgeType: "ultramarine",
  },
  {
    id: "brand-2",
    name: "NOVA STUDIO",
    tagline: "Minimalist Modern Apparel",
    industry: "Fashion & Lifestyle",
    sizeScale: "big",
    logoEmblem: "NVA",
    activeDealsCount: 24,
    totalVolume: "$62,000",
    totalVolumeAmount: 62000,
    featuredCreator: "Sara Dietschy",
    badgeType: "monochrome",
  },
  {
    id: "brand-3",
    name: "AURA AUDIO",
    tagline: "Acoustic Engineering & Spatial Sound",
    industry: "Sound & Media",
    sizeScale: "medium",
    logoEmblem: "ARA",
    activeDealsCount: 12,
    totalVolume: "$29,000",
    totalVolumeAmount: 29000,
    featuredCreator: "Chloe Ting",
    badgeType: "ultramarine",
  },
  {
    id: "brand-4",
    name: "NORTH FORM",
    tagline: "Architectural Workspaces & Living",
    industry: "Interior & Architecture",
    sizeScale: "medium",
    logoEmblem: "NF",
    activeDealsCount: 15,
    totalVolume: "$34,000",
    totalVolumeAmount: 34000,
    featuredCreator: "Kelsey Simone",
    badgeType: "monochrome",
  },
  {
    id: "brand-5",
    name: "NOTION",
    tagline: "Connected Workspace & AI",
    industry: "Productivity & Software",
    sizeScale: "medium",
    logoEmblem: "N",
    activeDealsCount: 19,
    totalVolume: "$58,500",
    totalVolumeAmount: 58500,
    featuredCreator: "Huda Kattan",
    badgeType: "infrared",
  },
  {
    id: "brand-6",
    name: "KINETIC",
    tagline: "Next-Gen Electric Drivetrains",
    industry: "Mobility & EV",
    sizeScale: "small",
    logoEmblem: "KNT",
    activeDealsCount: 7,
    totalVolume: "$19,500",
    totalVolumeAmount: 19500,
    featuredCreator: "Peter McKinnon",
    badgeType: "monochrome",
  },
  {
    id: "brand-7",
    name: "HYPERION",
    tagline: "4K Optical Systems & Anamorphic Lenses",
    industry: "Cinematography",
    sizeScale: "small",
    logoEmblem: "HYP",
    activeDealsCount: 11,
    totalVolume: "$24,000",
    totalVolumeAmount: 24000,
    featuredCreator: "Zach King",
    badgeType: "ultramarine",
  },
  {
    id: "brand-8",
    name: "SOLARIS",
    tagline: "Photovoltaic Outdoor Wear",
    industry: "Sustainable Tech",
    sizeScale: "small",
    logoEmblem: "SLR",
    activeDealsCount: 8,
    totalVolume: "$16,000",
    totalVolumeAmount: 16000,
    featuredCreator: "Murad Osmann",
    badgeType: "infrared",
  },
];
