"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, CheckCircle2, ArrowRight, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { SafeImage } from "@/components/ui/SafeImage";

interface Story {
  id: string;
  name: string;
  handle: string;
  category: string;
  followers: string;
  image: string;
  quote: string;
  brandPartner: string;
  brandDealAmount: string;
  payoutTime: string;
}

const STORIES: Story[] = [
  {
    id: "vasudha",
    name: "Vasudha Rai",
    handle: "@vasudha.rai",
    category: "Beauty & Wellness Author",
    followers: "115K Followers",
    image: "/creators/vasudha-rai.jpg",
    quote:
      "I used to spend 30% of my time chasing invoices from agencies. With AbeyCollab, the escrow is deposited before I even draft the reel. Once approved, the payout hits my bank account in 4 hours.",
    brandPartner: "Plum Goodness",
    brandDealAmount: "₹65,000",
    payoutTime: "4 Hours",
  },
  {
    id: "kunal",
    name: "Kunal Rajput",
    handle: "@kunalrajputc",
    category: "Nike Trainer & Athletics",
    followers: "85K Followers",
    image: "/creators/kunal-rajput.jpg",
    quote:
      "The direct brand collaboration is unmatched. No 40% agency markups, no hidden communication. Brands upload the brief, funds are locked safely, and I can focus entirely on creating top-tier athletic content.",
    brandPartner: "Boldfit India",
    brandDealAmount: "₹50,000",
    payoutTime: "24 Hours",
  },
  {
    id: "prarthana",
    name: "Prarthana",
    handle: "@prarthaana.04",
    category: "Gen-Z Fashion & Lifestyle",
    followers: "30K Followers",
    image: "/creators/prarthana.jpg",
    quote:
      "The Auto-DM engine alone tripled my brand inquiries. When fashion brands comment on my styling reels, they instantly receive my media kit and transparent rate card. Closed 3 brand deals in my first month!",
    brandPartner: "Snitch Men",
    brandDealAmount: "₹45,000",
    payoutTime: "Instant",
  },
  {
    id: "decoding",
    name: "Decoding Tech",
    handle: "@the.decoding.tech",
    category: "Gadgets & Hardware",
    followers: "140K Followers",
    image: "/creators/decoding-tech.jpg",
    quote:
      "For tech creators, brands often take 90 days to settle invoices. AbeyCollab completely solved this with milestone payments. Transparent, reliable, and gives high-converting creators the respect they deserve.",
    brandPartner: "Nothing India",
    brandDealAmount: "₹85,000",
    payoutTime: "12 Hours",
  },
];

export function WishlinkCreatorStories() {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevStory = () => {
    setCurrentIdx((prev) => (prev === 0 ? STORIES.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setCurrentIdx((prev) => (prev === STORIES.length - 1 ? 0 : prev + 1));
  };

  const active = STORIES[currentIdx];

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-black/6 select-none font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 text-left">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold uppercase tracking-tight bg-[#FAF9F5] border border-black/8 text-[#0A0A0E]">
              COMMUNITY VOICES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-[#0A0A0E] font-display tracking-tight leading-[1.1]">
              Loved by Creators,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D97706] to-[#E98415] underline decoration-[#FFD21F] decoration-4 underline-offset-4">
                trusted by Brands
              </span>
            </h2>
            <p className="text-base sm:text-lg text-[#5A5A68] max-w-xl">
              Join thousands of creators who turned sporadic gigs into predictable, protected income.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prevStory}
              className="w-12 h-12 rounded-full border border-black/10 hover:border-black bg-white hover:bg-[#FAF9F5] flex items-center justify-center text-[#0A0A0E] transition-all cursor-pointer shadow-xs active:scale-90"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextStory}
              className="w-12 h-12 rounded-full border border-black/10 hover:border-black bg-white hover:bg-[#FAF9F5] flex items-center justify-center text-[#0A0A0E] transition-all cursor-pointer shadow-xs active:scale-90"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Big Spacious Editorial Story Card */}
        <div className="p-8 sm:p-12 lg:p-16 rounded-3xl sm:rounded-[40px] bg-gradient-to-br from-[#FAF9F5] via-white to-[#FAF9F5] border border-black/8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ambient Badge Background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD21F]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Story Visual Portrait */}
            <div className="lg:col-span-5 relative flex items-center justify-center">
              <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <SafeImage
                  src={active.image}
                  alt={active.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/95 text-[#0A0A0E] shadow-sm">
                    {active.followers}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-4 left-4 right-4 text-white text-left">
                  <h4 className="text-xl font-black font-display flex items-center gap-1.5">
                    <span>{active.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-[#FFD21F] fill-[#FFD21F]" />
                  </h4>
                  <p className="text-xs font-mono text-white/80">{active.handle}</p>
                  <p className="text-xs font-mono text-[#FFD21F] font-bold mt-1">{active.category}</p>
                </div>
              </div>
            </div>

            {/* Story Quote & Partnership Proof */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFD21F] text-[#FFD21F]" />
                ))}
                <span className="ml-2 text-xs font-mono font-bold text-[#0A0A0E]">
                  5.0★ Verified Review
                </span>
              </div>

              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-bold font-sans text-[#0A0A0E] leading-relaxed">
                “{active.quote}”
              </blockquote>

              {/* Deal Metrics Pill */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 font-mono">
                <div className="p-3.5 rounded-2xl bg-white border border-black/8 shadow-2xs">
                  <span className="text-[10px] text-[#7A7A8A] uppercase font-bold block">Brand Collab</span>
                  <span className="text-sm font-extrabold text-[#0A0A0E]">{active.brandPartner}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-black/8 shadow-2xs">
                  <span className="text-[10px] text-[#7A7A8A] uppercase font-bold block">Payout Amount</span>
                  <span className="text-sm font-extrabold text-[#0A0A0E]">{active.brandDealAmount}</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-black/8 shadow-2xs">
                  <span className="text-[10px] text-emerald-700 uppercase font-bold block">Escrow Clearance</span>
                  <span className="text-sm font-extrabold text-emerald-700">{active.payoutTime}</span>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <Link
                  href="/creator/register"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0A0A0E] hover:text-[#D97706] transition-colors"
                >
                  <span>Sign up to monetize your content</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
