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
    id: "ankur",
    name: "Ankur Warikoo",
    handle: "@ankurwarikoo",
    avatarUrl: "/creators/ankur-warikoo.webp",
    heroImage: "/creators/ankur-warikoo.webp",
    category: "tech",
    niche: "Entrepreneurship & Career Growth",
    reach: "3.2M",
    engagementRate: 5.8,
    startingPrice: 3000,
    matchScore: 99,
    bio: "Keynote speaker, author, and entrepreneur producing high-impact frameworks on personal finance, SaaS growth, and career acceleration.",
    tags: ["India Top Creator 🇮🇳", "Finance & Startups", "Verified Creator"],
    sampleDeliverables: [
      {
        title: "Keynote 60s Video Integration",
        specs: "4K Master Studio • Hindi & English",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "Executive LinkedIn & X Breakdown",
        specs: "Audited 3.2M Audience",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "kusha",
    name: "Kusha Kapila",
    handle: "@kushakapila",
    avatarUrl: "/creators/kusha-kapila.jpg",
    heroImage: "/creators/kusha-kapila.jpg",
    category: "fashion",
    niche: "Fashion & Satirical Entertainment",
    reach: "3.6M",
    engagementRate: 6.1,
    startingPrice: 3200,
    matchScore: 98,
    bio: "Celebrated satirist and fashion icon creating high-energy relatable sketches and luxury couture collaborations.",
    tags: ["India Top Creator 🇮🇳", "Fashion & Comedy", "Verified Creator"],
    sampleDeliverables: [
      {
        title: "High-Fashion Editorial Reel",
        specs: "4K 60fps • Bespoke Styling",
        imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "elena",
    name: "Elena Rostova",
    handle: "@elenarostova",
    avatarUrl: "/creators/elena-rostova.jpg",
    heroImage: "/creators/elena-rostova.jpg",
    category: "tech",
    niche: "Consumer Hardware & Tech",
    reach: "485K",
    engagementRate: 6.8,
    startingPrice: 3500,
    matchScore: 98,
    bio: "Principal tech creator covering consumer hardware, developer tools, and high-performance computing setups.",
    tags: ["Consumer Tech", "RED V-Raptor 8K", "Verified Creator"],
    sampleDeliverables: [
      {
        title: "4K Master Product Reel",
        specs: "RED V-Raptor 8K • 60fps",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "60s Dedicated Mid-roll Integration",
        specs: "Sony FX3 • S-Log3 ProRes",
        imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "mkbhd",
    name: "Marques Brownlee",
    handle: "@mkbhd",
    avatarUrl: "/creators/mkbhd.jpg",
    heroImage: "/creators/mkbhd.jpg",
    category: "tech",
    niche: "Consumer Hardware & Clean Tech",
    reach: "18.8M",
    engagementRate: 7.4,
    startingPrice: 15000,
    matchScore: 99,
    bio: "Preeminent technology reviewer evaluating flagship smartphones, electric vehicles, and computing hardware with signature 8K cinema visuals.",
    tags: ["Consumer Hardware", "8K Master Workflows", "Verified Benchmark"],
    sampleDeliverables: [
      {
        title: "Dedicated Longform YouTube Review",
        specs: "RED 8K Cinema • Multi-cam Studio",
        imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80",
      },
      {
        title: "60s Short-Form Deep Dive Integration",
        specs: "4K 60fps • Native Audio Mixing",
        imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "saradietschy",
    name: "Sara Dietschy",
    handle: "@saradietschy",
    avatarUrl: "/creators/sara-dietschy.jpg",
    heroImage: "/creators/sara-dietschy.jpg",
    category: "tech",
    niche: "Creative Tech & Professional Gear",
    reach: "920K",
    engagementRate: 6.8,
    startingPrice: 3500,
    matchScore: 98,
    bio: "Tech and creative lifestyle creator sharing camera setups, computing rigs, and industrial design deep-dives.",
    tags: ["Design & Creative", "Pro Video Workflows", "Verified Creator"],
    sampleDeliverables: [
      {
        title: "Creative Production Integration",
        specs: "Sony FX3 • S-Log3 4K",
        imageUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "petermckinnon",
    name: "Peter McKinnon",
    handle: "@petermckinnon",
    avatarUrl: "/creators/peter-mckinnon.jpg",
    heroImage: "/creators/peter-mckinnon.jpg",
    category: "fashion",
    niche: "Cinematography & Visual Arts",
    reach: "5.9M",
    engagementRate: 6.9,
    startingPrice: 8500,
    matchScore: 97,
    bio: "Renowned filmmaker, photographer, and storyteller sharing camera masterclasses, coffee rituals, and high-production visual journeys.",
    tags: ["Design & Creative", "Cinema Master", "Verified Benchmark"],
    sampleDeliverables: [
      {
        title: "Cinematic Product Narrative",
        specs: "Canon Cinema RAW • 4K Master",
        imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "bhuvanbam",
    name: "Bhuvan Bam",
    handle: "@bhuvan.bam22",
    avatarUrl: "/creators/bhuvan-bam.jpg",
    heroImage: "/creators/bhuvan-bam.jpg",
    category: "lifestyle",
    niche: "Comedy & Narrative Character Cinema",
    reach: "26.4M",
    engagementRate: 8.2,
    startingPrice: 12000,
    matchScore: 99,
    bio: "Trailblazing Indian entertainer, writer, and musician pioneering multi-character episodic comedy and viral cultural storytelling.",
    tags: ["India Top Creator 🇮🇳", "BB Ki Vines", "Top Performer"],
    sampleDeliverables: [
      {
        title: "Original Narrative Integration Episode",
        specs: "Broadcast Quality • Full Scripting",
        imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80",
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
