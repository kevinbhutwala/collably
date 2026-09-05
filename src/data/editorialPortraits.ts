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
  featuredCreator: string;
  badgeType: "primary" | "ultramarine" | "infrared" | "monochrome";
}

export const EDITORIAL_PORTRAITS: Record<string, EditorialPortrait> = {
  // ── BIG PORTRAITS (HERO & MAJOR ANCHORS) ──
  heroMaleMain: {
    id: "port-m1",
    name: "Marcus Vance",
    handle: "marcusvance",
    niche: "AI Tooling & Hardware",
    category: "TECH",
    sizeScale: "big",
    role: "Main Anchor Male",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&auto=format&fit=crop&q=85",
    aspectRatio: "4/5",
    colorTreatment: "high-contrast",
    cropFocus: "close-up",
    followersFormatted: "340K",
    engagementFormatted: "6.8%",
    verifiedRate: "₹28,000",
    matchScore: 98,
    featuredBrand: "VERTEX LABS",
  },
  heroFemaleMain: {
    id: "port-f1",
    name: "Elena Rostova",
    handle: "elenatech",
    niche: "Creative Tech & Direction",
    category: "FASHION",
    sizeScale: "big",
    role: "Main Anchor Female",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=85",
    aspectRatio: "3/4",
    colorTreatment: "ultramarine-duotone",
    cropFocus: "three-quarter",
    followersFormatted: "485K",
    engagementFormatted: "6.4%",
    verifiedRate: "₹32,500",
    matchScore: 99,
    featuredBrand: "NOVA STUDIO",
  },
  bigFemaleEditorial: {
    id: "port-f4",
    name: "Zoe Kravitz-Ross",
    handle: "zoedesign",
    niche: "Spatial UI & Architecture",
    category: "DESIGN",
    sizeScale: "big",
    role: "Supporting Female",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1000&auto=format&fit=crop&q=85",
    aspectRatio: "4/5",
    colorTreatment: "high-contrast",
    cropFocus: "half-body",
    followersFormatted: "510K",
    engagementFormatted: "7.9%",
    verifiedRate: "₹38,000",
    matchScore: 97,
    featuredBrand: "NORTH FORM",
  },

  // ── MEDIUM PORTRAITS (POLAROID & EDITORIAL STRIPS) ──
  supportingFemale1: {
    id: "port-f2",
    name: "Aanya Patel",
    handle: "aanyacreative",
    niche: "Clean Beauty & Wellness",
    category: "BEAUTY",
    sizeScale: "medium",
    role: "Supporting Female",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=85",
    aspectRatio: "1/1",
    colorTreatment: "infrared-tint",
    cropFocus: "half-body",
    followersFormatted: "215K",
    engagementFormatted: "7.1%",
    verifiedRate: "₹18,500",
    matchScore: 96,
    featuredBrand: "STUDIO 09",
  },
  supportingMale1: {
    id: "port-m2",
    name: "Devon James",
    handle: "devonmoves",
    niche: "High-Performance Fitness",
    category: "FITNESS",
    sizeScale: "medium",
    role: "Supporting Male",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=85",
    aspectRatio: "4/5",
    colorTreatment: "monochrome",
    cropFocus: "upper-torso",
    followersFormatted: "390K",
    engagementFormatted: "5.9%",
    verifiedRate: "₹24,000",
    matchScore: 97,
    featuredBrand: "KINETIC",
  },
  supportingFemale2: {
    id: "port-f3",
    name: "Chloe Dubois",
    handle: "chloevisuals",
    niche: "Cinematic Travel & Sound",
    category: "TRAVEL",
    sizeScale: "medium",
    role: "Supporting Roster",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=85",
    aspectRatio: "3/4",
    colorTreatment: "natural",
    cropFocus: "three-quarter",
    followersFormatted: "620K",
    engagementFormatted: "8.4%",
    verifiedRate: "₹45,000",
    matchScore: 98,
    featuredBrand: "AURA AUDIO",
  },

  // ── SMALL PORTRAITS (STAMPS, CAMERA BADGES, EMBEDDED PILLS) ──
  supportingMale2: {
    id: "port-m3",
    name: "Kai Takahashi",
    handle: "kaistudio",
    niche: "Streetwear & Gaming",
    category: "GAMING",
    sizeScale: "small",
    role: "Supporting Roster",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=85",
    aspectRatio: "1/1",
    colorTreatment: "ultramarine-duotone",
    cropFocus: "close-up",
    followersFormatted: "180K",
    engagementFormatted: "9.2%",
    verifiedRate: "₹19,000",
    matchScore: 95,
    featuredBrand: "HYPERION",
  },
  smallStampFemale1: {
    id: "port-f5",
    name: "Maya Lin",
    handle: "mayacooks",
    niche: "Culinary & Plant Science",
    category: "CULINARY",
    sizeScale: "small",
    role: "Supporting Roster",
    imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=85",
    aspectRatio: "1/1",
    colorTreatment: "natural",
    cropFocus: "close-up",
    followersFormatted: "295K",
    engagementFormatted: "8.1%",
    verifiedRate: "₹22,000",
    matchScore: 96,
    featuredBrand: "SOLARIS",
  },
  smallStampMale1: {
    id: "port-m4",
    name: "Liam O'Connor",
    handle: "liamsound",
    niche: "Audio Design & Podcasts",
    category: "TECH",
    sizeScale: "small",
    role: "Supporting Roster",
    imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=85",
    aspectRatio: "1/1",
    colorTreatment: "infrared-tint",
    cropFocus: "close-up",
    followersFormatted: "140K",
    engagementFormatted: "7.6%",
    verifiedRate: "₹16,000",
    matchScore: 94,
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
    totalVolume: "₹4,80,000",
    featuredCreator: "Marcus Vance",
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
    totalVolume: "₹6,20,000",
    featuredCreator: "Elena Rostova",
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
    totalVolume: "₹2,90,000",
    featuredCreator: "Chloe Dubois",
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
    totalVolume: "₹3,40,000",
    featuredCreator: "Zoe Kravitz-Ross",
    badgeType: "monochrome",
  },
  {
    id: "brand-5",
    name: "STUDIO 09",
    tagline: "Clean Botanical Formulations",
    industry: "Beauty & Skincare",
    sizeScale: "medium",
    logoEmblem: "S09",
    activeDealsCount: 9,
    totalVolume: "₹1,85,000",
    featuredCreator: "Aanya Patel",
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
    totalVolume: "₹1,95,000",
    featuredCreator: "Devon James",
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
    totalVolume: "₹2,40,000",
    featuredCreator: "Kai Takahashi",
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
    totalVolume: "₹1,60,000",
    featuredCreator: "Maya Lin",
    badgeType: "infrared",
  },
];
