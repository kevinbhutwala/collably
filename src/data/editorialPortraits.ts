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
    name: "Ujwal Puri",
    handle: "ompsyram",
    niche: "Urban Architectural Cinematography",
    category: "DESIGN",
    sizeScale: "big",
    role: "Main Anchor Male",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
    aspectRatio: "4/5",
    colorTreatment: "high-contrast",
    cropFocus: "close-up",
    followersFormatted: "100K",
    engagementFormatted: "7.8%",
    verifiedRate: "$550",
    verifiedRateAmount: 550,
    matchScore: 99,
    featuredBrand: "VERTEX LABS",
  },
  heroFemaleMain: {
    id: "port-f1",
    name: "Prarthana",
    handle: "prarthaana.04",
    niche: "Contemporary Fashion & Style",
    category: "FASHION",
    sizeScale: "big",
    role: "Main Anchor Female",
    imageUrl: "/creators/prarthana.jpg",
    aspectRatio: "3/4",
    colorTreatment: "ultramarine-duotone",
    cropFocus: "three-quarter",
    followersFormatted: "30K",
    engagementFormatted: "6.8%",
    verifiedRate: "$450",
    verifiedRateAmount: 450,
    matchScore: 99,
    featuredBrand: "NORTH FORM",
  },
  bigFemaleEditorial: {
    id: "port-f4",
    name: "Dipti Parihar Sharma",
    handle: "diptipariharsharma",
    niche: "Contemporary Fashion & Editorial Draping",
    category: "FASHION",
    sizeScale: "big",
    role: "Supporting Female",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    aspectRatio: "4/5",
    colorTreatment: "high-contrast",
    cropFocus: "half-body",
    followersFormatted: "99.3K",
    engagementFormatted: "5.8%",
    verifiedRate: "$420",
    verifiedRateAmount: 420,
    matchScore: 98,
    featuredBrand: "NOVA STUDIO",
  },

  // ── MEDIUM PORTRAITS (POLAROID & EDITORIAL STRIPS) ──
  supportingFemale1: {
    id: "port-f2",
    name: "Dr. Sehitha",
    handle: "sehithamd",
    niche: "Clinical Dermatology & Skincare Science",
    category: "BEAUTY",
    sizeScale: "medium",
    role: "Supporting Female",
    imageUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80",
    aspectRatio: "1/1",
    colorTreatment: "infrared-tint",
    cropFocus: "half-body",
    followersFormatted: "52K",
    engagementFormatted: "6.4%",
    verifiedRate: "$480",
    verifiedRateAmount: 480,
    matchScore: 99,
    featuredBrand: "NOTION",
  },
  supportingMale1: {
    id: "port-m2",
    name: "Decoding Tech",
    handle: "decodingtech",
    niche: "Consumer Hardware & Tech EDC",
    category: "TECH",
    sizeScale: "medium",
    role: "Supporting Male",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    aspectRatio: "4/5",
    colorTreatment: "monochrome",
    cropFocus: "upper-torso",
    followersFormatted: "81.9K",
    engagementFormatted: "5.2%",
    verifiedRate: "$390",
    verifiedRateAmount: 390,
    matchScore: 97,
    featuredBrand: "KINETIC",
  },
  supportingFemale2: {
    id: "port-f3",
    name: "Damini Sinha",
    handle: "daminisinha",
    niche: "Minimalist Streetwear & Capsule Styling",
    category: "FASHION",
    sizeScale: "medium",
    role: "Supporting Roster",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
    aspectRatio: "3/4",
    colorTreatment: "natural",
    cropFocus: "three-quarter",
    followersFormatted: "99.9K",
    engagementFormatted: "5.6%",
    verifiedRate: "$460",
    verifiedRateAmount: 460,
    matchScore: 97,
    featuredBrand: "AURA AUDIO",
  },

  // ── SMALL PORTRAITS (STAMPS, CAMERA BADGES, EMBEDDED PILLS) ──
  supportingMale2: {
    id: "port-m3",
    name: "Daniel Titchener",
    handle: "daniel_titchener",
    niche: "Architectural Workspace & Design",
    category: "DESIGN",
    sizeScale: "small",
    role: "Supporting Roster",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    aspectRatio: "1/1",
    colorTreatment: "ultramarine-duotone",
    cropFocus: "close-up",
    followersFormatted: "95K",
    engagementFormatted: "5.4%",
    verifiedRate: "$580",
    verifiedRateAmount: 580,
    matchScore: 98,
    featuredBrand: "HYPERION",
  },
  smallStampFemale1: {
    id: "port-m5",
    name: "Ashfina Charania",
    handle: "thewickedsoul",
    niche: "Specialty Coffee & Home Cafe ASMR",
    category: "CULINARY",
    sizeScale: "small",
    role: "Supporting Roster",
    imageUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
    aspectRatio: "1/1",
    colorTreatment: "natural",
    cropFocus: "close-up",
    followersFormatted: "65K",
    engagementFormatted: "6.9%",
    verifiedRate: "$340",
    verifiedRateAmount: 340,
    matchScore: 98,
    featuredBrand: "SOLARIS",
  },
  smallStampMale1: {
    id: "port-m4",
    name: "Harish Vekariya",
    handle: "harish_vekariya88",
    niche: "Calisthenics & Core Conditioning",
    category: "FITNESS",
    sizeScale: "small",
    role: "Supporting Roster",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
    aspectRatio: "1/1",
    colorTreatment: "infrared-tint",
    cropFocus: "close-up",
    followersFormatted: "74K",
    engagementFormatted: "7.1%",
    verifiedRate: "$320",
    verifiedRateAmount: 320,
    matchScore: 97,
    featuredBrand: "AURA AUDIO",
  },
};

export const EDITORIAL_ROSTER = Object.values(EDITORIAL_PORTRAITS);

export const EDITORIAL_BRANDS: EditorialBrand[] = [
  {
    id: "brand-eb1",
    name: "VERTEX / LABS",
    tagline: "Developer Infrastructure & AI Agent Runtime",
    industry: "DevTool & AI",
    sizeScale: "big",
    logoEmblem: "VX",
    activeDealsCount: 8,
    totalVolume: "$42.5K",
    totalVolumeAmount: 42500,
    featuredCreator: "Ujwal Puri",
    badgeType: "ultramarine",
  },
  {
    id: "brand-eb2",
    name: "NOVA STUDIO",
    tagline: "Professional Color Grading & Optical LUTs",
    industry: "Creative Software",
    sizeScale: "big",
    logoEmblem: "NV",
    activeDealsCount: 12,
    totalVolume: "$68.0K",
    totalVolumeAmount: 68000,
    featuredCreator: "Dipti Parihar Sharma",
    badgeType: "primary",
  },
  {
    id: "brand-eb3",
    name: "AURA AUDIO",
    tagline: "High-Fidelity Studio Monitors & Spatial Headphones",
    industry: "Pro Audio Gear",
    sizeScale: "medium",
    logoEmblem: "AA",
    activeDealsCount: 6,
    totalVolume: "$31.2K",
    totalVolumeAmount: 31200,
    featuredCreator: "Decoding Tech",
    badgeType: "infrared",
  },
  {
    id: "brand-eb4",
    name: "NORTH FORM",
    tagline: "Minimalist Workspace Architecture & Hardware",
    industry: "Industrial Design",
    sizeScale: "medium",
    logoEmblem: "NF",
    activeDealsCount: 9,
    totalVolume: "$54.0K",
    totalVolumeAmount: 54000,
    featuredCreator: "Prarthana",
    badgeType: "primary",
  },
  {
    id: "brand-eb5",
    name: "NOTION",
    tagline: "Connected Workspace & AI Knowledge Engine",
    industry: "Productivity",
    sizeScale: "medium",
    logoEmblem: "N",
    activeDealsCount: 15,
    totalVolume: "$85.0K",
    totalVolumeAmount: 85000,
    featuredCreator: "Dr. Sehitha",
    badgeType: "monochrome",
  },
  {
    id: "brand-eb6",
    name: "KINETIC",
    tagline: "High-Performance Athletic Apparel & Smart Recovery",
    industry: "Activewear",
    sizeScale: "small",
    logoEmblem: "KN",
    activeDealsCount: 7,
    totalVolume: "$28.5K",
    totalVolumeAmount: 28500,
    featuredCreator: "Harish Vekariya",
    badgeType: "infrared",
  },
  {
    id: "brand-eb7",
    name: "HYPERION",
    tagline: "Ultra-Low Latency Esports Keyboards & Mice",
    industry: "Gaming Peripherals",
    sizeScale: "small",
    logoEmblem: "HY",
    activeDealsCount: 5,
    totalVolume: "$22.0K",
    totalVolumeAmount: 22000,
    featuredCreator: "Daniel Titchener",
    badgeType: "ultramarine",
  },
  {
    id: "brand-eb8",
    name: "SOLARIS",
    tagline: "Ultralight Modular Travel Gear & Bags",
    industry: "Travel & Outdoor",
    sizeScale: "small",
    logoEmblem: "SO",
    activeDealsCount: 11,
    totalVolume: "$49.0K",
    totalVolumeAmount: 49000,
    featuredCreator: "Ashfina Charania",
    badgeType: "primary",
  },
];

export const EDITORIAL_BRAND_ROSTER = EDITORIAL_BRANDS;
