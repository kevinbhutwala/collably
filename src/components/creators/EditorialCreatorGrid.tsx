"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { EditorialCreatorCard } from "./EditorialCreatorCard";
import { CreatorQuickViewModal, CreatorQuickViewData } from "./CreatorQuickViewModal";
import { Sparkles, ArrowRight, Star, CheckCircle2 } from "lucide-react";
import { useUIStore } from "@/stores/ui.store";

const FEATURED_TALENT: CreatorQuickViewData[] = [
  {
    id: "prarthaana",
    name: "Prarthana",
    handle: "@prarthaana.04",
    avatarUrl: "/creators/prarthana.jpg",
    heroImage: "/creators/prarthana.jpg",
    category: "fashion",
    niche: "Fashion, Travel & Aesthetic Lifestyle",
    reach: "30K",
    engagementRate: 6.8,
    startingPrice: 450,
    matchScore: 98,
    bio: "Living quiet Living boujee 🧿 • 444 • 🇮🇳 🇦🇪 🇹🇭 🇮🇹 🇭🇰 🇶🇦 🇪🇸 🇬🇮 🇨🇭",
    tags: ["India Creator 🇮🇳", "Fashion & Lifestyle", "22 Posts"],
    sampleDeliverables: [
      {
        title: "Aesthetic Fashion & Lifestyle Reel",
        specs: "4K Master Styling • Color Graded",
        imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "Curated 6-Slide Editorial Drop",
        specs: "High-Res Editorial Photography",
        imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "kushihanamsagar",
    name: "Kushi Hanamsagar",
    handle: "@kushihanamsagar9",
    avatarUrl: "/creators/kushi-hanamsagar.jpg",
    heroImage: "/creators/kushi-hanamsagar.jpg",
    category: "lifestyle",
    niche: "Cinema, Visual Arts & Creative Direction",
    reach: "869",
    engagementRate: 7.4,
    startingPrice: 150,
    matchScore: 97,
    bio: "Shree ram🔆 • Authentic visual storytelling & everyday aesthetic moments",
    tags: ["India Creator 🇮🇳", "Cinema & Arts", "34 Posts"],
    sampleDeliverables: [
      {
        title: "Authentic Lifestyle Vignette Reel",
        specs: "4K Cinema • Sound Designed",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "Photo Drop / Editorial Carousel",
        specs: "Creative Stills & Color Graded",
        imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "dipti",
    name: "Dipti Parihar Sharma",
    handle: "@diptipariharsharma",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80",
    heroImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80",
    category: "fashion",
    niche: "Contemporary Fashion & Editorial Draping",
    reach: "99.3K",
    engagementRate: 5.8,
    startingPrice: 420,
    matchScore: 98,
    bio: "Blending cultural storytelling with modern fashion & editorial draping. Featured in Cosmopolitan & Grazia India.",
    tags: ["India Creator 🇮🇳", "Editorial Fashion", "Verified Creator"],
    sampleDeliverables: [
      {
        title: "Editorial Fashion & Styling Reel",
        specs: "4K Master Styling • Color Graded",
        imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "Curated Lookbook Photo Carousel",
        specs: "High-Res Photography • 6-8 Slides",
        imageUrl: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "sehitha",
    name: "Dr. Sehitha",
    handle: "@sehithamd",
    avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&auto=format&fit=crop&q=80",
    heroImage: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80",
    category: "beauty",
    niche: "Clinical Dermatology & Skincare Science",
    reach: "52K",
    engagementRate: 6.4,
    startingPrice: 480,
    matchScore: 99,
    bio: "Medical doctor & cosmetic dermatologist demystifying actives, skin barrier repair, and clinical ingredient transparency.",
    tags: ["Doctor Verified 🩺", "Skincare Science", "Evidence Based"],
    sampleDeliverables: [
      {
        title: "Clinical Ingredient Breakdown Reel",
        specs: "Macro Texture Video • Science Backed",
        imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "decodingtech",
    name: "Decoding Tech",
    handle: "@decodingtech",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80",
    category: "tech",
    niche: "Consumer Hardware & Tech EDC",
    reach: "81.9K",
    engagementRate: 5.2,
    startingPrice: 390,
    matchScore: 97,
    bio: "Practical smartphone teardowns, daily gadget benchmarks, and workspace setups. Clear real-world testing without brand bias.",
    tags: ["Consumer Tech", "EDC Gear", "Verified Creator"],
    sampleDeliverables: [
      {
        title: "4K Master Tech Review Reel",
        specs: "4K 60fps • Benchmark Overlay",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "ashfina",
    name: "Ashfina Charania",
    handle: "@thewickedsoul",
    avatarUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&auto=format&fit=crop&q=80",
    heroImage: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1200&auto=format&fit=crop&q=80",
    category: "lifestyle",
    niche: "Specialty Coffee & Home Cafe ASMR",
    reach: "65K",
    engagementRate: 6.9,
    startingPrice: 340,
    matchScore: 98,
    bio: "Sensory morning coffee rituals, single-origin pour-overs, and cinematic culinary storytelling for modern home cafes.",
    tags: ["Specialty Coffee ☕", "Home Cafe ASMR", "Verified Creator"],
    sampleDeliverables: [
      {
        title: "Sensory Coffee Ritual Reel (ASMR)",
        specs: "4K Macro • Ambient Audio Mix",
        imageUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "damini",
    name: "Damini Sinha",
    handle: "@daminisinha",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80",
    heroImage: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&auto=format&fit=crop&q=80",
    category: "fashion",
    niche: "Minimalist Streetwear & Capsule Wardrobes",
    reach: "99.9K",
    engagementRate: 5.6,
    startingPrice: 460,
    matchScore: 96,
    bio: "3-way styling reels, transitional streetwear drops, and elevated everyday basics. Organic aesthetic for premium apparel.",
    tags: ["Streetwear", "Capsule Wardrobes", "Verified Creator"],
    sampleDeliverables: [
      {
        title: "3 Ways to Style Transition Reel",
        specs: "4K 60fps • Upbeat Streetwear Beat",
        imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "harish",
    name: "Harish Vekariya",
    handle: "@harish_vekariya88",
    avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80",
    heroImage: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1200&auto=format&fit=crop&q=80",
    category: "lifestyle",
    niche: "Calisthenics & Core Conditioning",
    reach: "74K",
    engagementRate: 7.1,
    startingPrice: 320,
    matchScore: 97,
    bio: "Natural bodyweight progressions, joint longevity, and progressive overload calisthenics tutorials.",
    tags: ["Calisthenics 🤸", "Fitness Coaching", "Verified Creator"],
    sampleDeliverables: [
      {
        title: "Calisthenics Technique Demo Reel",
        specs: "4K Form Breakdown • Voiceover",
        imageUrl: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "ujwal",
    name: "Ujwal Puri",
    handle: "@ompsyram",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80",
    heroImage: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop&q=80",
    category: "lifestyle",
    niche: "Urban Architectural Cinematography",
    reach: "100K",
    engagementRate: 7.8,
    startingPrice: 550,
    matchScore: 99,
    bio: "Capturing the cinematic soul of Mumbai streetscapes, monsoons, and architectural heritage through 4K lens craft.",
    tags: ["Cinema Master 🎥", "Heritage Visuals", "Verified Creator"],
    sampleDeliverables: [
      {
        title: "4K Cinematic Heritage Vignette",
        specs: "Sony Cinema Line • Custom Grade",
        imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
];

const CATEGORIES = [
  { id: "all", label: "All Talent" },
  { id: "india", label: "India Top Creators 🇮🇳" },
  { id: "tech", label: "Tech & Gear" },
  { id: "fashion", label: "Visual Arts & Cinema" },
  { id: "fitness", label: "Athletics & Health" },
  { id: "lifestyle", label: "Cinema & Life" },
];

import { useShortlistStore } from "@/stores/shortlist.store";

export function EditorialCreatorGrid() {
  const [activeTab, setActiveTab] = useState("all");
  const [quickViewCreator, setQuickViewCreator] = useState<CreatorQuickViewData | null>(null);
  const { isSaved, toggleSaveCreator } = useShortlistStore();
  const { addToast } = useUIStore();

  const handleBookmarkToggle = async (creatorId: string) => {
    const creator = FEATURED_TALENT.find((c) => c.id === creatorId);
    if (!creator) return;
    const profile: any = {
      id: creator.id,
      fullName: creator.name,
      handle: creator.handle.replace("@", ""),
      avatarUrl: creator.avatarUrl,
      primaryCategory: creator.category,
      totalFollowers: typeof creator.reach === "string" ? parseInt(creator.reach) * 1000 : creator.reach,
      avgEngagementRate: creator.engagementRate,
      startingPrice: creator.startingPrice,
      verified: true,
    };
    await toggleSaveCreator(profile);
  };

  const filtered =
    activeTab === "all"
      ? FEATURED_TALENT
      : activeTab === "india"
      ? FEATURED_TALENT.filter((c) => c.tags?.some((t) => t.includes("India Top Creator")))
      : FEATURED_TALENT.filter((c) => c.category === activeTab);

  return (
    <section className="py-20 sm:py-24 bg-texture-paper-white text-[#0A0A0E] dark:text-white border-b border-black/8 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono font-bold tracking-tight text-[#8A7000] dark:text-[#FFD21F] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
              CURATED TALENT DIRECTORY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-[#0A0A0E] dark:text-white">
              Vetted Cinematic Creators.
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5A68] dark:text-[#8E8EA4] leading-relaxed">
              Explore audited media kits, rate cards, and 4K production reels ready for instant milestone booking.
            </p>
            <p className="text-[11px] text-[#9A9AA8] dark:text-[#7E7E94] font-mono mt-1">
              ✦ Verified public creators &amp; benchmark talent across technology, cinema, and lifestyle.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF9F5] dark:bg-[#14141E] p-1.5 rounded-full border border-black/8 dark:border-white/10 shadow-2xs overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold transition-all shrink-0 ${
                  activeTab === cat.id
                    ? "bg-[#0A0A0E] dark:bg-[#FFD21F] text-white dark:text-[#0A0A0E] shadow-xs"
                    : "text-[#5A5A68] dark:text-[#8E8EA4] hover:text-[#0A0A0E] dark:hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Creator Cards Grid (Desktop) & Swipeable Reel (Mobile) */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          <AnimatePresence>
            {filtered.map((creator) => (
              <motion.div
                layout
                key={creator.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                <EditorialCreatorCard
                  creator={creator}
                  onQuickView={(c) => setQuickViewCreator(c)}
                  onBookmarkToggle={handleBookmarkToggle}
                  isBookmarked={isSaved(creator.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Mobile Horizontal Swipeable Reel (< 640px) */}
        <div className="sm:hidden flex items-stretch gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-none -mx-4 px-4">
          {filtered.map((creator) => (
            <div key={creator.id} className="min-w-[280px] w-[80vw] max-w-[320px] snap-center shrink-0">
              <EditorialCreatorCard
                creator={creator}
                onQuickView={(c) => setQuickViewCreator(c)}
                onBookmarkToggle={handleBookmarkToggle}
                isBookmarked={isSaved(creator.id)}
              />
            </div>
          ))}
        </div>

        {/* View All Roster CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center pt-4"
        >
          <Link
            href="/creators"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FAF9F5] hover:bg-white dark:bg-[#14141E] dark:hover:bg-[#1E1E2C] border border-black/10 dark:border-white/10 text-xs sm:text-sm font-bold text-[#0A0A0E] dark:text-white transition-all shadow-xs hover-lift"
          >
            <span>Explore the Full Creator Roster</span>

            <ArrowRight className="w-4 h-4 text-[#FFD21F]" />
          </Link>
        </motion.div>
      </div>

      {/* Quick View Modal */}
      <CreatorQuickViewModal
        creator={quickViewCreator}
        isOpen={!!quickViewCreator}
        onClose={() => setQuickViewCreator(null)}
        onBookmarkToggle={handleBookmarkToggle}
        isBookmarked={quickViewCreator ? isSaved(quickViewCreator.id) : false}
      />
    </section>
  );
}
