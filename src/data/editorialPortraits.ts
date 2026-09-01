/**
 * Curated Editorial Portrait Registry for Collably Ultramarine × Infrared Redesign
 * High-fashion, modern creator campaign photography with varied crops, angles, and color treatments.
 */

export interface EditorialPortrait {
  id: string;
  name: string;
  handle: string;
  niche: string;
  category: "TECH" | "FASHION" | "FITNESS" | "BEAUTY" | "TRAVEL" | "GAMING";
  role: "Main Anchor Male" | "Main Anchor Female" | "Supporting Female" | "Supporting Male" | "Supporting Roster";
  imageUrl: string;
  aspectRatio: string;
  colorTreatment: "natural" | "monochrome" | "ultramarine-duotone" | "infrared-tint" | "high-contrast";
  cropFocus: "close-up" | "half-body" | "three-quarter" | "upper-torso";
  followersFormatted: string;
  engagementFormatted: string;
  verifiedRate: string;
  matchScore: number;
}

export const EDITORIAL_PORTRAITS: Record<string, EditorialPortrait> = {
  // 1. MAIN HERO MALE PORTRAIT (Anchor close-up, high fashion)
  heroMaleMain: {
    id: "port-m1",
    name: "Marcus Vance",
    handle: "marcusvance",
    niche: "AI Tooling & Hardware",
    category: "TECH",
    role: "Main Anchor Male",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&auto=format&fit=crop&q=85",
    aspectRatio: "4/5",
    colorTreatment: "high-contrast",
    cropFocus: "close-up",
    followersFormatted: "340K",
    engagementFormatted: "6.8%",
    verifiedRate: "₹28,000",
    matchScore: 98,
  },

  // 2. MAIN HERO FEMALE PORTRAIT (Contrasting three-quarter fashion crop)
  heroFemaleMain: {
    id: "port-f1",
    name: "Elena Rostova",
    handle: "elenatech",
    niche: "Creative Tech & Direction",
    category: "FASHION",
    role: "Main Anchor Female",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=85",
    aspectRatio: "3/4",
    colorTreatment: "ultramarine-duotone",
    cropFocus: "three-quarter",
    followersFormatted: "485K",
    engagementFormatted: "6.4%",
    verifiedRate: "₹32,500",
    matchScore: 99,
  },

  // 3. SUPPORTING FEMALE PORTRAIT (Editorial infrared / minimal lighting)
  supportingFemale1: {
    id: "port-f2",
    name: "Aanya Patel",
    handle: "aanyacreative",
    niche: "Clean Beauty & Wellness",
    category: "BEAUTY",
    role: "Supporting Female",
    imageUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=85",
    aspectRatio: "1/1",
    colorTreatment: "infrared-tint",
    cropFocus: "half-body",
    followersFormatted: "215K",
    engagementFormatted: "7.1%",
    verifiedRate: "₹18,500",
    matchScore: 96,
  },

  // 4. SUPPORTING MALE PORTRAIT (Monochrome athletic / dynamic pose)
  supportingMale1: {
    id: "port-m2",
    name: "Devon James",
    handle: "devonmoves",
    niche: "High-Performance Fitness",
    category: "FITNESS",
    role: "Supporting Male",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=85",
    aspectRatio: "4/5",
    colorTreatment: "monochrome",
    cropFocus: "upper-torso",
    followersFormatted: "390K",
    engagementFormatted: "5.9%",
    verifiedRate: "₹24,000",
    matchScore: 97,
  },

  // 5. SUPPORTING CREATOR (Editorial travel/cinematography)
  supportingFemale2: {
    id: "port-f3",
    name: "Chloe Dubois",
    handle: "chloevisuals",
    niche: "Cinematic Travel & Lifestyle",
    category: "TRAVEL",
    role: "Supporting Roster",
    imageUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=85",
    aspectRatio: "3/4",
    colorTreatment: "natural",
    cropFocus: "three-quarter",
    followersFormatted: "620K",
    engagementFormatted: "8.4%",
    verifiedRate: "₹45,000",
    matchScore: 98,
  },

  // 6. SUPPORTING CREATOR (Streetwear & Gaming)
  supportingMale2: {
    id: "port-m3",
    name: "Kai Takahashi",
    handle: "kaistudio",
    niche: "Streetwear & Digital Culture",
    category: "GAMING",
    role: "Supporting Roster",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=85",
    aspectRatio: "1/1",
    colorTreatment: "ultramarine-duotone",
    cropFocus: "close-up",
    followersFormatted: "180K",
    engagementFormatted: "9.2%",
    verifiedRate: "₹19,000",
    matchScore: 95,
  },
};

export const EDITORIAL_ROSTER = Object.values(EDITORIAL_PORTRAITS);
