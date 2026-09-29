"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Star, CheckCircle2, ArrowRight, Quote, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
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
    <section className="py-16 sm:py-24 bg-[#F8FAFC] select-none font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-14"
        >
          <div className="space-y-3 text-left">
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono font-extrabold uppercase tracking-tight bg-white border border-black/[0.08] text-[#0B0A14] shadow-2xs">
              COMMUNITY VOICES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0B0A14] font-display tracking-tight leading-[1.1]">
              Loved by Creators,{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-[#0D9488] to-[#047857] underline decoration-[#0F766E]/50 decoration-4 underline-offset-4">
                trusted by Brands
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#545266] max-w-xl">
              Real creators sharing why milestone escrow and direct brand briefs changed how they work.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <button
              type="button"
              onClick={prevStory}
              className="w-11 h-11 rounded-full border border-black/[0.1] hover:border-primary bg-white hover:bg-[#F1F5F9] flex items-center justify-center text-[#0B0A14] transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Previous story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextStory}
              className="w-11 h-11 rounded-full border border-black/[0.1] hover:border-primary bg-white hover:bg-[#F1F5F9] flex items-center justify-center text-[#0B0A14] transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Next story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Big Clean Editorial Story Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.08, margin: "0px 0px -40px 0px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="p-5 sm:p-10 lg:p-12 rounded-2xl sm:rounded-3xl bg-white border border-black/[0.07] shadow-[0_4px_30px_rgba(0,0,0,0.03)] relative overflow-hidden"
        >
          {/* Subtle Ambient Radial Highlight */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center"
            >
              {/* Story Visual Portrait */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                  <SafeImage
                    src={active.image}
                    alt={active.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges on Portrait */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <p className="text-base font-extrabold font-display leading-tight">{active.name}</p>
                    <p className="text-xs font-mono text-white/80">{active.handle}</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-primary text-white">
                      {active.followers}
                    </span>
                  </div>
                </div>
              </div>

              {/* Story Narrative & Proof */}
              <div className="lg:col-span-7 space-y-6 text-left">
                <Quote className="w-10 h-10 text-accent fill-accent/25" />

                <blockquote className="text-base sm:text-xl lg:text-2xl font-bold font-display text-[#0B0A14] leading-relaxed sm:leading-snug">
                  &ldquo;{active.quote}&rdquo;
                </blockquote>

                {/* Proof Metric Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-black/[0.06]">
                  <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-black/[0.06] space-y-0.5">
                    <p className="text-[10px] font-mono text-[#79768F]">Brand Partner</p>
                    <p className="text-sm font-black text-[#0B0A14]">{active.brandPartner}</p>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-black/[0.06] space-y-0.5">
                    <p className="text-[10px] font-mono text-[#79768F]">Deal Amount</p>
                    <p className="text-sm font-black font-mono text-[#0B0A14]">{active.brandDealAmount}</p>
                  </div>

                  <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-0.5">
                    <p className="text-[10px] font-mono text-emerald-800">Payout Release</p>
                    <p className="text-sm font-black text-emerald-700">{active.payoutTime}</p>
                  </div>
                </div>

                {/* Footer Creator Tag */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-xs font-mono font-bold text-[#0B0A14]">
                      Verified AbeyCollab Creator Deal
                    </span>
                  </div>

                  <Link
                    href="/register?role=creator"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B0A14] hover:text-primary transition-colors self-start sm:self-auto"
                  >
                    <span>Join Roster</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
