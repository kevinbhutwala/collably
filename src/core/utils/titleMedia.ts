import React from "react";
import {
  Cpu,
  Bot,
  Sparkles,
  Palette,
  Shirt,
  Flower2,
  Dumbbell,
  HeartPulse,
  Activity,
  Coins,
  Briefcase,
  TrendingUp,
  Gamepad2,
  Trophy,
  Plane,
  Compass,
  UtensilsCrossed,
  Coffee,
  GraduationCap,
  Atom,
  Watch,
  Keyboard,
  Laptop,
  Leaf,
  Flame,
  Wallet,
  CreditCard,
  Luggage,
  Headphones,
  Mic,
  Volume2,
  Video,
  Film,
  Clapperboard,
  Play,
  Crown,
  Target,
  Users,
  BarChart3,
  LineChart,
  CheckCircle2,
  Zap,
  ShieldCheck,
  Building2,
  Smartphone,
  LucideIcon,
} from "lucide-react";

export interface CategoryVisualMeta {
  title: string;
  icon: LucideIcon;
  emoji: string;
  image: string;
  accentColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  tagline: string;
}

export const CATEGORY_VISUALS: Record<string, CategoryVisualMeta> = {
  "Technology & AI": {
    title: "Technology & AI",
    icon: Cpu,
    emoji: "⚡",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    accentColor: "#3B82F6",
    badgeBg: "bg-blue-500/10 dark:bg-blue-500/20",
    badgeBorder: "border-blue-500/30",
    badgeText: "text-blue-600 dark:text-blue-400",
    tagline: "Developer tools, AI workflows & hardware",
  },
  "Design & Creative": {
    title: "Design & Creative",
    icon: Palette,
    emoji: "🎨",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=1200&auto=format&fit=crop&q=80",
    accentColor: "#EC4899",
    badgeBg: "bg-pink-500/10 dark:bg-pink-500/20",
    badgeBorder: "border-pink-500/30",
    badgeText: "text-pink-600 dark:text-pink-400",
    tagline: "UI/UX, 3D motion, architecture & branding",
  },
  "Fashion & Style": {
    title: "Fashion & Style",
    icon: Shirt,
    emoji: "✨",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80",
    accentColor: "#F59E0B",
    badgeBg: "bg-amber-500/10 dark:bg-amber-500/20",
    badgeBorder: "border-amber-500/30",
    badgeText: "text-amber-600 dark:text-amber-400",
    tagline: "High fashion, minimalism & luxury timepieces",
  },
  "Beauty & Skincare": {
    title: "Beauty & Skincare",
    icon: Flower2,
    emoji: "🌸",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80",
    accentColor: "#F43F5E",
    badgeBg: "bg-rose-500/10 dark:bg-rose-500/20",
    badgeBorder: "border-rose-500/30",
    badgeText: "text-rose-600 dark:text-rose-400",
    tagline: "Clean beauty, skincare science & glow",
  },
  "Fitness & Wellness": {
    title: "Fitness & Wellness",
    icon: Dumbbell,
    emoji: "💪",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    accentColor: "#10B981",
    badgeBg: "bg-emerald-500/10 dark:bg-emerald-500/20",
    badgeBorder: "border-emerald-500/30",
    badgeText: "text-emerald-600 dark:text-emerald-400",
    tagline: "Athletics, nutrition, longevity & recovery",
  },
  "Finance & Business": {
    title: "Finance & Business",
    icon: TrendingUp,
    emoji: "📈",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop&q=80",
    accentColor: "#6366F1",
    badgeBg: "bg-indigo-500/10 dark:bg-indigo-500/20",
    badgeBorder: "border-indigo-500/30",
    badgeText: "text-indigo-600 dark:text-indigo-400",
    tagline: "Fintech, venture capital & global trade",
  },
  "Gaming & Esports": {
    title: "Gaming & Esports",
    icon: Gamepad2,
    emoji: "🎮",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&auto=format&fit=crop&q=80",
    accentColor: "#8B5CF6",
    badgeBg: "bg-purple-500/10 dark:bg-purple-500/20",
    badgeBorder: "border-purple-500/30",
    badgeText: "text-purple-600 dark:text-purple-400",
    tagline: "Pro gaming, battlestations & streaming",
  },
  "Lifestyle & Travel": {
    title: "Lifestyle & Travel",
    icon: Plane,
    emoji: "✈️",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&auto=format&fit=crop&q=80",
    accentColor: "#0EA5E9",
    badgeBg: "bg-sky-500/10 dark:bg-sky-500/20",
    badgeBorder: "border-sky-500/30",
    badgeText: "text-sky-600 dark:text-sky-400",
    tagline: "Global exploration, modular gear & hotels",
  },
  "Food & Culinary": {
    title: "Food & Culinary",
    icon: UtensilsCrossed,
    emoji: "🍳",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop&q=80",
    accentColor: "#EA580C",
    badgeBg: "bg-orange-500/10 dark:bg-orange-500/20",
    badgeBorder: "border-orange-500/30",
    badgeText: "text-orange-600 dark:text-orange-400",
    tagline: "Artisan gastronomy, cold-pressed & dining",
  },
  "Education & Science": {
    title: "Education & Science",
    icon: GraduationCap,
    emoji: "🔬",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&auto=format&fit=crop&q=80",
    accentColor: "#14B8A6",
    badgeBg: "bg-teal-500/10 dark:bg-teal-500/20",
    badgeBorder: "border-teal-500/30",
    badgeText: "text-teal-600 dark:text-teal-400",
    tagline: "STEM deep-dives, philosophy & masterclasses",
  },
};

/**
 * Get category metadata with fallback
 */
export function getCategoryVisual(categoryName?: string): CategoryVisualMeta {
  if (!categoryName) return CATEGORY_VISUALS["Technology & AI"];
  
  // Exact match
  if (CATEGORY_VISUALS[categoryName]) {
    return CATEGORY_VISUALS[categoryName];
  }

  // Normalized search
  const lower = categoryName.toLowerCase();
  for (const [key, val] of Object.entries(CATEGORY_VISUALS)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      return val;
    }
  }

  // Substring keywords
  if (lower.includes("tech") || lower.includes("ai") || lower.includes("software")) return CATEGORY_VISUALS["Technology & AI"];
  if (lower.includes("design") || lower.includes("creative") || lower.includes("art")) return CATEGORY_VISUALS["Design & Creative"];
  if (lower.includes("fashion") || lower.includes("style") || lower.includes("cloth")) return CATEGORY_VISUALS["Fashion & Style"];
  if (lower.includes("beauty") || lower.includes("skin") || lower.includes("glow")) return CATEGORY_VISUALS["Beauty & Skincare"];
  if (lower.includes("fit") || lower.includes("health") || lower.includes("wellness")) return CATEGORY_VISUALS["Fitness & Wellness"];
  if (lower.includes("finance") || lower.includes("crypto") || lower.includes("business") || lower.includes("money")) return CATEGORY_VISUALS["Finance & Business"];
  if (lower.includes("game") || lower.includes("esport") || lower.includes("stream")) return CATEGORY_VISUALS["Gaming & Esports"];
  if (lower.includes("travel") || lower.includes("lifestyle") || lower.includes("trip")) return CATEGORY_VISUALS["Lifestyle & Travel"];
  if (lower.includes("food") || lower.includes("culinary") || lower.includes("cook")) return CATEGORY_VISUALS["Food & Culinary"];
  if (lower.includes("edu") || lower.includes("science") || lower.includes("learn")) return CATEGORY_VISUALS["Education & Science"];

  return CATEGORY_VISUALS["Technology & AI"];
}

/**
 * Dynamically derive the most appropriate icon for any Title string
 */
export function getIconForTitle(title: string, category?: string): LucideIcon {
  const t = title.toLowerCase();

  // Specific title keywords
  if (t.includes("ai") || t.includes("sprint") || t.includes("neural") || t.includes("model") || t.includes("linear")) return Bot;
  if (t.includes("watch") || t.includes("time") || t.includes("monolith") || t.includes("clock")) return Watch;
  if (t.includes("keyboard") || t.includes("mechanical") || t.includes("keycap") || t.includes("switch")) return Keyboard;
  if (t.includes("protein") || t.includes("whey") || t.includes("workout") || t.includes("gym") || t.includes("muscle")) return Dumbbell;
  if (t.includes("matcha") || t.includes("tea") || t.includes("coffee") || t.includes("drink") || t.includes("beverage")) return Coffee;
  if (t.includes("crypto") || t.includes("remittance") || t.includes("wallet") || t.includes("fintech") || t.includes("payment")) return Coins;
  if (t.includes("backpack") || t.includes("luggage") || t.includes("modular pack") || t.includes("travel pack")) return Luggage;
  if (t.includes("audio") || t.includes("headphone") || t.includes("speaker") || t.includes("sound") || t.includes("earbud")) return Headphones;
  if (t.includes("mic") || t.includes("podcast") || t.includes("vocal")) return Mic;
  if (t.includes("camera") || t.includes("4k") || t.includes("lens") || t.includes("cinema") || t.includes("footage")) return Video;
  if (t.includes("ugc") || t.includes("video") || t.includes("reel") || t.includes("tiktok") || t.includes("shorts")) return Clapperboard;
  if (t.includes("talent") || t.includes("representation") || t.includes("creator management")) return Crown;
  if (t.includes("strategy") || t.includes("campaign") || t.includes("brief") || t.includes("cohort")) return Target;
  if (t.includes("attribution") || t.includes("analytics") || t.includes("telemetry") || t.includes("roas") || t.includes("cac")) return BarChart3;
  if (t.includes("escrow") || t.includes("ledger") || t.includes("guarantee") || t.includes("protection")) return ShieldCheck;
  if (t.includes("speed") || t.includes("fast") || t.includes("instant") || t.includes("energy")) return Zap;
  if (t.includes("organic") || t.includes("leaf") || t.includes("clean") || t.includes("nature")) return Leaf;
  if (t.includes("fire") || t.includes("hot") || t.includes("burn") || t.includes("intense")) return Flame;
  if (t.includes("card") || t.includes("visa") || t.includes("mastercard")) return CreditCard;
  if (t.includes("laptop") || t.includes("macbook") || t.includes("computer") || t.includes("screen")) return Laptop;
  if (t.includes("phone") || t.includes("mobile") || t.includes("ios") || t.includes("android")) return Smartphone;

  // Fall back to category icon
  if (category) {
    return getCategoryVisual(category).icon;
  }

  return Sparkles;
}

/**
 * Get deliverable icon matching deliverable type name
 */
export function getDeliverableIcon(deliverableType: string): LucideIcon {
  const d = deliverableType.toLowerCase();
  if (d.includes("reel") || d.includes("story") || d.includes("instagram")) return Smartphone;
  if (d.includes("youtube dedicated") || d.includes("integration") || d.includes("youtube 60s")) return Video;
  if (d.includes("short") || d.includes("tiktok")) return Smartphone;
  if (d.includes("ugc") || d.includes("ad")) return Clapperboard;
  if (d.includes("x") || d.includes("twitter") || d.includes("thread")) return Laptop;
  if (d.includes("keynote") || d.includes("event") || d.includes("appearance")) return Mic;
  return Play;
}
