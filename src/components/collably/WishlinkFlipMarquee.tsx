"use client";

import React, { useState } from "react";
import { SafeImage } from "@/components/ui/SafeImage";
import { ShieldCheck, Sparkles, CheckCircle2, TrendingUp } from "lucide-react";

interface FlipItem {
  id: string;
  name: string;
  handle: string;
  category: string;
  image: string;
  brand: string;
  brandCategory: string;
  dealAmount: string;
  brandColor: string;
}

const FLIP_ITEMS_ROW1: FlipItem[] = [
  {
    id: "prarthana",
    name: "Prarthana",
    handle: "@prarthaana.04",
    category: "Fashion & Lifestyle",
    image: "/creators/prarthana.jpg",
    brand: "Snitch",
    brandCategory: "Men's & Unisex Style",
    dealAmount: "₹45,000",
    brandColor: "#0A0A0E",
  },
  {
    id: "vasudha",
    name: "Vasudha Rai",
    handle: "@vasudha.rai",
    category: "Beauty & Wellness",
    image: "/creators/vasudha-rai.jpg",
    brand: "Plum Goodness",
    brandCategory: "Clean Skincare Drop",
    dealAmount: "₹65,000",
    brandColor: "#6B21A8",
  },
  {
    id: "kunal",
    name: "Kunal Rajput",
    handle: "@kunalrajputc",
    category: "Fitness & Athletics",
    image: "/creators/kunal-rajput.jpg",
    brand: "Boldfit",
    brandCategory: "Performance Fuel",
    dealAmount: "₹50,000",
    brandColor: "#B91C1C",
  },
  {
    id: "decoding",
    name: "Decoding Tech",
    handle: "@the.decoding.tech",
    category: "Gadgets & AI",
    image: "/creators/decoding-tech.jpg",
    brand: "Nothing India",
    brandCategory: "Ear (3) Audio Launch",
    dealAmount: "₹85,000",
    brandColor: "#0A0A0E",
  },
  {
    id: "chetali",
    name: "Chetali Chadha",
    handle: "@chetali_chadha",
    category: "Skincare Science",
    image: "/creators/chetali-chadha.jpg",
    brand: "DermaCo",
    brandCategory: "Clinical Serums",
    dealAmount: "₹40,000",
    brandColor: "#0369A1",
  },
  {
    id: "tanya",
    name: "Tanya Singh",
    handle: "@tanyasingh",
    category: "Contemporary Fashion",
    image: "/creators/tanya-singh.jpg",
    brand: "FabIndia",
    brandCategory: "Festive Collection",
    dealAmount: "₹55,000",
    brandColor: "#991B1B",
  },
];

const FLIP_ITEMS_ROW2: FlipItem[] = [
  {
    id: "sparsh",
    name: "Sparsh Alawadhi",
    handle: "@sparshalawadhi",
    category: "Men's Grooming",
    image: "/creators/sparsh-alawadhi.jpg",
    brand: "Bombay Shaving Co",
    brandCategory: "Precision Grooming",
    dealAmount: "₹35,000",
    brandColor: "#1E3A8A",
  },
  {
    id: "shreya",
    name: "Shreya Arora",
    handle: "@shreya.arora",
    category: "Luxury Beauty",
    image: "/creators/shreya-arora.jpg",
    brand: "Forest Essentials",
    brandCategory: "Ayurvedic Luxury",
    dealAmount: "₹70,000",
    brandColor: "#854D0E",
  },
  {
    id: "kushi",
    name: "Kushi Hanamsagar",
    handle: "@kushihanamsagar9",
    category: "Visual Storytelling",
    image: "/creators/kushi-hanamsagar.jpg",
    brand: "Mokobara",
    brandCategory: "Urban Travel Gear",
    dealAmount: "₹30,000",
    brandColor: "#0F766E",
  },
  {
    id: "priya",
    name: "Priya Chaudhari",
    handle: "@priyachaudhari",
    category: "Lifestyle & Food",
    image: "/creators/priya-chaudhari.jpg",
    brand: "The Whole Truth",
    brandCategory: "100% Clean Whey",
    dealAmount: "₹42,000",
    brandColor: "#15803D",
  },
  {
    id: "sid",
    name: "Sid Bhawsar",
    handle: "@sid.bhawsar",
    category: "Sneakers & Streetwear",
    image: "/creators/sid-bhawsar.jpg",
    brand: "Urban Monkey",
    brandCategory: "Streetwear Drops",
    dealAmount: "₹38,000",
    brandColor: "#4338CA",
  },
  {
    id: "yoganshi",
    name: "Yoganshi",
    handle: "@yoganshi",
    category: "Aesthetic Living",
    image: "/creators/yoganshi.jpg",
    brand: "Mamaearth",
    brandCategory: "Toxin-Free Beauty",
    dealAmount: "₹48,000",
    brandColor: "#047857",
  },
];

function FlipCard({ item, autoFlipped }: { item: FlipItem; autoFlipped: boolean }) {
  const [hovered, setHovered] = useState(false);
  const isFlipped = hovered || autoFlipped;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered(!hovered)}
      className="shrink-0 w-44 sm:w-52 h-64 sm:h-72 cursor-pointer select-none"
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative w-full h-full rounded-2xl transition-transform duration-700 ease-out shadow-xs border border-black/8 hover:shadow-xl"
        style={{
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT: Creator Portrait & Handle */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-white"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <SafeImage
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

          {/* Top category badge */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-white/90 backdrop-blur-md text-[#0A0A0E] shadow-2xs">
              {item.category}
            </span>
            <span className="w-6 h-6 rounded-full bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center font-bold text-xs shadow-2xs">
              ★
            </span>
          </div>

          {/* Bottom Creator Info */}
          <div className="absolute bottom-3 left-3 right-3 text-white pointer-events-none">
            <h4 className="font-extrabold text-sm sm:text-base leading-tight font-display drop-shadow-xs">
              {item.name}
            </h4>
            <p className="text-[11px] font-mono text-white/80">{item.handle}</p>
          </div>
        </div>

        {/* BACK: Brand Collaboration & Escrow Deal */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden p-5 flex flex-col justify-between text-left border-2 border-[#FFD21F]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(145deg, #FFFFFF 0%, #FFFDF5 100%)",
          }}
        >
          {/* Header */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-extrabold uppercase tracking-wider bg-[#FFD21F] text-[#0A0A0E]">
                VERIFIED COLLAB
              </span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-[10px] font-mono text-[#7A7A8A] pt-1">Brand Partner</p>
            <h3 className="text-lg font-black text-[#0A0A0E] font-display leading-tight">
              {item.brand}
            </h3>
            <p className="text-xs text-[#5A5A68] line-clamp-1">{item.brandCategory}</p>
          </div>

          {/* Deal Value Pill */}
          <div className="p-3 rounded-xl bg-white border border-black/8 shadow-2xs space-y-0.5">
            <div className="flex items-center justify-between text-[10px] font-mono text-[#7A7A8A]">
              <span>Milestone Payout</span>
              <span className="text-emerald-700 font-bold">24h Release</span>
            </div>
            <div className="text-xl font-black text-[#0A0A0E] font-mono">
              {item.dealAmount}
            </div>
          </div>

          {/* Footer Escrow Seal */}
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#0A0A0E] font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className="truncate">Escrow Protected • 0% Fee</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function WishlinkFlipMarquee() {
  const [autoFlipRow, setAutoFlipRow] = useState(false);

  // Automatically flip a subset of cards every 3.5s for continuous delight
  React.useEffect(() => {
    const timer = setInterval(() => {
      setAutoFlipRow((prev) => !prev);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F6] border-y border-black/6 select-none overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#E98415]" />
          <span className="text-xs font-mono font-bold tracking-tight text-[#0A0A0E]">
            EXCLUSIVE ROSTER &amp; BRAND DEALS
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0A0A0E] font-display tracking-tight">
          We have The Best With Us
        </h2>
        <p className="text-base sm:text-lg text-[#5A5A68] max-w-lg mx-auto font-sans font-medium">
          Top creators match with category-leading brands. Flip any card to view verified escrow deals.
        </p>
      </div>

      {/* Track 1: Moving Left */}
      <div className="relative w-full overflow-hidden mb-5">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10" />

        <div className="flex gap-4 sm:gap-6 animate-marquee-left hover:[animation-play-state:paused] w-max">
          {[...FLIP_ITEMS_ROW1, ...FLIP_ITEMS_ROW1, ...FLIP_ITEMS_ROW1].map((item, idx) => (
            <FlipCard
              key={`row1-${item.id}-${idx}`}
              item={item}
              autoFlipped={autoFlipRow && idx % 2 === 0}
            />
          ))}
        </div>
      </div>

      {/* Track 2: Moving Right */}
      <div className="relative w-full overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF9F6] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF9F6] to-transparent z-10" />

        <div className="flex gap-4 sm:gap-6 animate-marquee-right hover:[animation-play-state:paused] w-max">
          {[...FLIP_ITEMS_ROW2, ...FLIP_ITEMS_ROW2, ...FLIP_ITEMS_ROW2].map((item, idx) => (
            <FlipCard
              key={`row2-${item.id}-${idx}`}
              item={item}
              autoFlipped={!autoFlipRow && idx % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
