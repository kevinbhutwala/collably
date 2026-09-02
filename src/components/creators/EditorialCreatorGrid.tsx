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
    id: "elena",
    name: "Elena Rostova",
    handle: "@elenarostova",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=85",
    heroImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=85",
    category: "tech",
    niche: "AI & Consumer Tech",
    reach: "485K",
    engagementRate: 6.8,
    startingPrice: 3500,
    matchScore: undefined,
    bio: "Principal tech creator covering artificial intelligence tooling, developer hardware, and future-of-work software suites.",
    tags: ["Technology & AI", "RED V-Raptor 8K", "Verified Creator"],
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
    id: "marcus",
    name: "Marcus Vance",
    handle: "@marcusvisuals",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=85",
    heroImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=85",
    category: "fashion",
    niche: "Luxury & Haute Couture",
    reach: "310K",
    engagementRate: 5.4,
    startingPrice: 2800,
    matchScore: undefined,
    bio: "Milan & Paris fashion cinematographer specializing in luxury editorial lookbooks and high-aesthetic brand identity drops.",
    tags: ["Design & Creative", "ARRI Alexa Mini", "Elite Tier"],
    sampleDeliverables: [
      {
        title: "Lookbook Editorial Cut",
        specs: "ARRI Alexa Mini • ProRes 4444",
        imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "aria",
    name: "Aria Chen",
    handle: "@ariawellness",
    avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=85",
    heroImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=85",
    category: "fitness",
    niche: "Biohacking & Longevity",
    reach: "620K",
    engagementRate: 7.1,
    startingPrice: 3200,
    matchScore: undefined,
    bio: "High-performance wellness advocate creating dynamic protocol integrations and metabolic science walkthroughs.",
    tags: ["Fitness & Wellness", "Sony FX3", "Top Creator"],
    sampleDeliverables: [
      {
        title: "Kinetic Routine Dynamic Reel",
        specs: "Sony FX3 • 120fps Slow-mo",
        imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
  {
    id: "devon",
    name: "Devon Thorne",
    handle: "@devoncinema",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=85",
    heroImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=85",
    category: "lifestyle",
    niche: "Automotive & Lifestyle",
    reach: "510K",
    engagementRate: 6.2,
    startingPrice: 3800,
    matchScore: undefined,
    bio: "Automotive documentary filmmaker and lifestyle storyteller producing cinematic road trip narratives and luxury vehicle showcases.",
    tags: ["Lifestyle & Travel", "Anamorphic Lenses", "Established Creator"],
    sampleDeliverables: [
      {
        title: "Alpine Story Automotive Cut",
        specs: "RED Komodo 6K • Anamorphic",
        imageUrl: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80",
      },
    ],
  },
];

const CATEGORIES = [

  { id: "all", label: "All Talent" },
  { id: "tech", label: "Tech & AI" },
  { id: "fashion", label: "Fashion & Luxury" },
  { id: "fitness", label: "Athletics & Bio" },
  { id: "lifestyle", label: "Cinema & Life" },
];

export function EditorialCreatorGrid() {
  const [activeTab, setActiveTab] = useState("all");
  const [quickViewCreator, setQuickViewCreator] = useState<CreatorQuickViewData | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
  const { addToast } = useUIStore();

  const handleBookmarkToggle = (creatorId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(creatorId)) {
        next.delete(creatorId);
        addToast({ type: "info", title: "Removed from Saved", message: "Creator removed from your saved talent list." });
      } else {
        next.add(creatorId);
        addToast({ type: "success", title: "Saved to Talent Roster", message: "Creator bookmarked for upcoming campaign briefs." });
      }
      return next;
    });
  };

  const filtered =
    activeTab === "all"
      ? FEATURED_TALENT
      : FEATURED_TALENT.filter((c) => c.category === activeTab);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white text-[#0A0A0E] select-none overflow-hidden border-t border-black/6 font-sans">
      <div className="max-w-7xl mx-auto w-full space-y-12">
        {/* Section Header with smooth in-view entrance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-black/6"
        >
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-mono font-bold tracking-tight text-[#8A7000] uppercase flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
              CURATED TALENT DIRECTORY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display tracking-tight text-[#0A0A0E]">
              Vetted Cinematic Creators.
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5A68] leading-relaxed">
              Explore audited media kits, rate cards, and 4K production reels ready for instant milestone booking.
            </p>
            <p className="text-[11px] text-[#9A9AA8] font-mono mt-1">
              ✦ Sample profiles shown for illustration — real creator roster populates as creators join.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF9F5] p-1.5 rounded-full border border-black/8 shadow-2xs overflow-x-auto scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-sans font-bold transition-all shrink-0 ${
                  activeTab === cat.id
                    ? "bg-[#0A0A0E] text-white shadow-xs"
                    : "text-[#5A5A68] hover:text-[#0A0A0E]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </motion.div>

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
                  isBookmarked={bookmarkedIds.has(creator.id)}
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
                isBookmarked={bookmarkedIds.has(creator.id)}
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
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#FAF9F5] hover:bg-white border border-black/10 text-xs sm:text-sm font-bold text-[#0A0A0E] transition-all shadow-xs hover-lift"
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
        isBookmarked={quickViewCreator ? bookmarkedIds.has(quickViewCreator.id) : false}
      />
    </section>
  );
}
