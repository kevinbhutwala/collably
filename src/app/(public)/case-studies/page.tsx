"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CaseStudiesSection } from "@/components/landing/CaseStudiesSection";
import { StatsSection } from "@/components/landing/StatsSection";
import { EditorialCTA } from "@/components/collably/EditorialCTA";
import { Modal } from "@/components/ui/Modal";
import { SafeImage } from "@/components/ui/SafeImage";
import { formatCurrency, formatNumber } from "@/core/utils/formatters";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Star,
  CheckCircle2,
  Lock,
  Play,
  ExternalLink,
  Award,
  Layers,
  Zap,
} from "lucide-react";


interface CaseStudy {
  id: string;
  brandName: string;
  brandLogo: string;
  brandTagline: string;
  category: "AI & Developer Tools" | "Design & Creative SaaS" | "Productivity & Collaboration" | "Consumer Apps";
  title: string;
  subtitle: string;
  heroImage: string;
  roas: string;
  impressions: string;
  conversions: string;
  cpv: string;
  escrowAmount: number;
  creatorsCount: number;
  turnaroundDays: number;
  deliverables: string[];
  clientQuote: {
    quote: string;
    author: string;
    role: string;
  };
  keyTakeaways: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "cs-linear",
    brandName: "Linear",
    brandLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
    brandTagline: "The purpose-built issue tracker for high-velocity software teams.",
    category: "AI & Developer Tools",
    title: "How Linear Scaled B2B Developer Signups via 8 Technical YouTube Engineers",
    subtitle: "Eliminating ad fatigue with authentic 60s workflow integrations and 4K codebase walkthroughs.",
    heroImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&auto=format&fit=crop&q=80",
    roas: "+380% ROAS",
    impressions: "4.8M Verified",
    conversions: "24,500 Teams",
    cpv: "$0.038 CPV",
    escrowAmount: 45000,
    creatorsCount: 8,
    turnaroundDays: 14,
    deliverables: [
      "8x 60s Dedicated YouTube Mid-roll Integrations (1080p 60fps)",
      "16x Repurposed X (Twitter) Video Clips with Trackable Links",
      "Full Commercial Perpetual Rights & Raw ProRes Master Files",
    ],
    clientQuote: {
      quote: "Collably's milestone escrow removed 100% of our contract friction. We reviewed all 8 cuts inside the timecoded player and disbursed funds with total confidence.",
      author: "Sarah Jenkins",
      role: "Head of Developer Marketing, Linear",
    },
    keyTakeaways: [
      "Zero upfront risk: $45,000 vault was held in platform escrow until frame QA sign-off.",
      "Audience fit: 88% Tier-1 software engineers in North America and Western Europe.",
      "Conversion surge: 14.8% average click-through on trackable bio discount links.",
    ],
  },
  {
    id: "cs-figma",
    brandName: "Figma",
    brandLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
    brandTagline: "Collaborative interface design and interactive prototyping platform.",
    category: "Design & Creative SaaS",
    title: "Figma Slides Launch: Driving 120,000 First-Week Decks with Design Influencers",
    subtitle: "Coordinating 12 top design YouTubers and TikTok product designers for a synchronized launch day blitz.",
    heroImage: "https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&auto=format&fit=crop&q=80",
    roas: "+410% ROAS",
    impressions: "8.2M Views",
    conversions: "120,000 Decks",
    cpv: "$0.029 CPV",
    escrowAmount: 95000,
    creatorsCount: 12,
    turnaroundDays: 10,
    deliverables: [
      "12x Dedicated Feature Walkthrough Videos",
      "24x High-Impact TikTok & Reel Quick Tips",
      "Custom Figma Community Templates Created by Creators",
    ],
    clientQuote: {
      quote: "The CRM pipeline and synchronized launch day milestone tracking allowed our team to coordinate 12 macro creators without a single dropped deadline.",
      author: "Marcus Vance",
      role: "Product Marketing Lead, Figma",
    },
    keyTakeaways: [
      "Launch blitz: All 12 creators published within a 3-hour window on announcement day.",
      "Community template virality: Over 45,000 creators duplicated the community decks.",
      "100% on-time milestone sign-off across all 12 creator contracts.",
    ],
  },
  {
    id: "cs-notion",
    brandName: "Notion",
    brandLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
    brandTagline: "The connected workspace for wiki, docs, and project management.",
    category: "Productivity & Collaboration",
    title: "Scaling Notion AI: 19,500 Paid Enterprise Upgrades via Workflow Architects",
    subtitle: "Partnering with executive productivity creators to demonstrate enterprise workspace automation.",
    heroImage: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&auto=format&fit=crop&q=80",
    roas: "+320% ROAS",
    impressions: "6.4M Reach",
    conversions: "19,500 Upgrades",
    cpv: "$0.042 CPV",
    escrowAmount: 68000,
    creatorsCount: 10,
    turnaroundDays: 12,
    deliverables: [
      "10x Deep Workflow Case Study Videos",
      "Interactive Template Downloads with Embedded Notion AI Prompts",
      "10x Sponsored Newsletter Inclusions",
    ],
    clientQuote: {
      quote: "The creators felt like genuine product consultants rather than paid endorsers. Collably made contract negotiation and milestone releases effortless.",
      author: "Elena Rostova",
      role: "Growth Operations Director, Notion",
    },
    keyTakeaways: [
      "High enterprise ticket conversion: 28% of signups were teams with 15+ seats.",
      "Audited retention: 84% 90-day retention on creator-referred accounts.",
      "Zero payment disputes: 100% escrow settlement in under 2 hours post-approval.",
    ],
  },
  {
    id: "cs-arc",
    brandName: "The Browser Company",
    brandLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
    brandTagline: "Arc Browser: A cleaner, calmer, more personal internet experience.",
    category: "Consumer Apps",
    title: "Arc Browser Virality: 84,000 Downloads via Minimalist Desk Aesthetic Creators",
    subtitle: "Targeting aesthetic tech enthusiasts and creative directors on YouTube and Instagram Reels.",
    heroImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80",
    roas: "+490% ROAS",
    impressions: "3.1M Views",
    conversions: "84,000 Installs",
    cpv: "$0.021 CPV",
    escrowAmount: 32000,
    creatorsCount: 6,
    turnaroundDays: 7,
    deliverables: [
      "6x Aesthetic Desk Setup Integrations",
      "18x Vertical 4K Reels featuring Arc Spaces & Split View",
      "Exclusive Custom Arc Space Links with Trackable UTMs",
    ],
    clientQuote: {
      quote: "We achieved the lowest cost-per-install in our company history through Collably's vetted creator tier.",
      author: "Devon Croft",
      role: "Head of Growth, Arc Browser",
    },
    keyTakeaways: [
      "Ultra-low CPV: $0.021 blended cost per view across YouTube & Instagram.",
      "Organic lift: 3x secondary viral re-shares on TikTok and Reddit.",
      "Fastest campaign cycle: 7-day brief to final video approval.",
    ],
  },
  {
    id: "cs-supabase",
    brandName: "Supabase",
    brandLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
    brandTagline: "The open source Firebase alternative with Postgres and instant APIs.",
    category: "AI & Developer Tools",
    title: "Supabase Launch Week: 8,900 New Database Projects via Live Coding Creators",
    subtitle: "Empowering full-stack YouTubers to build production apps with Supabase Auth & Vector embeddings.",
    heroImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200&auto=format&fit=crop&q=80",
    roas: "+460% ROAS",
    impressions: "2.2M Views",
    conversions: "8,900 DBs",
    cpv: "$0.035 CPV",
    escrowAmount: 52000,
    creatorsCount: 7,
    turnaroundDays: 14,
    deliverables: [
      "7x Full-Length Build-Along Video Tutorials (20+ minutes)",
      "GitHub Starter Repositories Linked in Video Descriptions",
      "Exclusive Launch Week Community Showcase Streams",
    ],
    clientQuote: {
      quote: "Collably delivers the developer credibility you cannot buy with traditional display ads.",
      author: "Paul Copplestone",
      role: "CEO & Co-founder, Supabase",
    },
    keyTakeaways: [
      "High developer engagement: Average video watch time surpassed 11 minutes.",
      "GitHub repo forks: Over 12,000 clone events during Launch Week.",
      "100% escrow release reliability across international creators in 4 countries.",
    ],
  },
  {
    id: "cs-loom",
    brandName: "Loom",
    brandLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80",
    brandTagline: "Async video messaging for work that keeps teams connected.",
    category: "Productivity & Collaboration",
    title: "Loom for Engineering: 16,200 New Team Workspaces via Tech Leaders",
    subtitle: "Demonstrating async code reviews and product feedback demos with senior software architects.",
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80",
    roas: "+340% ROAS",
    impressions: "5.6M Reach",
    conversions: "16,200 Teams",
    cpv: "$0.048 CPV",
    escrowAmount: 60000,
    creatorsCount: 9,
    turnaroundDays: 11,
    deliverables: [
      "9x 60s Integration Slots in Engineering Architecture Series",
      "18x LinkedIn Thought Leadership Video Posts",
      "Custom Async Code Review Cheat Sheet Downloads",
    ],
    clientQuote: {
      quote: "Collably is our primary engine for sourcing Tier-1 technical creator partnerships at predictable unit economics.",
      author: "Nicole Zhang",
      role: "Senior Growth Lead, Loom",
    },
    keyTakeaways: [
      "High B2B referral quality: 42% of signups invited 3+ coworkers within 14 days.",
      "LinkedIn viral lift: 850,000 organic impressions across creator executive posts.",
      "Complete escrow audit trail delivered directly to finance for compliance.",
    ],
  },
];

export default function CaseStudiesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalStudy, setActiveModalStudy] = useState<CaseStudy | null>(null);

  const categories = [
    "all",
    "AI & Developer Tools",
    "Design & Creative SaaS",
    "Productivity & Collaboration",
    "Consumer Apps",
  ];

  const filteredStudies =
    selectedCategory === "all"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((cs) => cs.category === selectedCategory);

  return (
    <div className="bg-[#FAFAFC] text-[#0A0A0E] min-h-screen select-none font-sans">
      {/* ── Page Hero Stage with #FFD21F & Bright Pure White Aesthetic ── */}
      <section className="pt-24 pb-16 border-b border-black/8 relative overflow-hidden bg-white">
        {/* Subtle Gold Flare Background Accent */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FFD21F]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#FFD21F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF5] border border-[#FFD21F]/50 text-[#0A0A0E] text-xs font-mono font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#FFD21F] fill-[#FFD21F]" />
            <span>HOW COLLABLY CAMPAIGNS WORK</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-[#0A0A0E] tracking-tight font-display max-w-4xl mx-auto">
            The full campaign<br />
            <span className="text-[#0A0A0E] bg-gradient-to-r from-[#FFD21F] via-[#FFAE00] to-[#FFD21F] bg-clip-text text-transparent underline decoration-[#FFD21F]/40 underline-offset-8">
              workflow, end-to-end.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#5A5A68] max-w-2xl mx-auto font-sans leading-relaxed">
            See how brands brief creators, manage deliverables in our 4K review studio, and release milestone payments through 100% pre-funded escrow.
          </p>


          {/* Feature Highlights Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-6 text-left font-mono">
            <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/6">
              <span className="text-[10px] text-[#7A7A8A] uppercase font-bold block">Escrow Protection</span>
              <span className="text-2xl font-black text-[#0A0A0E] font-display">100%</span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">Pre-funded Guarantee</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/6">
              <span className="text-[10px] text-[#7A7A8A] uppercase font-bold block">Platform Fee</span>
              <span className="text-2xl font-black text-[#0A0A0E] font-display">10%</span>
              <span className="text-[10px] text-[#5A5A68] block mt-0.5">Flat & Transparent</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/6">
              <span className="text-[10px] text-[#7A7A8A] uppercase font-bold block">Payout Speed</span>
              <span className="text-2xl font-black text-[#0A0A0E] font-display">Instant</span>
              <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">On QA Sign-off</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#F8F8FC] border border-black/6">
              <span className="text-[10px] text-[#7A7A8A] uppercase font-bold block">Support SLA</span>
              <span className="text-2xl font-black text-[#0A0A0E] font-display">&lt; 4 Hrs</span>
              <span className="text-[10px] text-[#A37F00] font-bold block mt-0.5">Human Arbitration</span>
            </div>
          </div>
        </div>
      </section>


      {/* ── Filter Tabs & Case Studies Studio Grid ── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Filter Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/8 pb-6">
          <div>
            <h2 className="text-2xl font-extrabold text-[#0A0A0E] font-display">
              Workflow Examples
            </h2>
            <p className="text-xs text-[#5A5A68]">
              Illustrative campaigns showing how the Collably platform handles brief-to-payout.
            </p>
          </div>


          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 capitalize ${
                  selectedCategory === cat
                    ? "bg-[#0A0A0E] text-white shadow-xs"
                    : "bg-white border border-black/8 text-[#6A6A78] hover:text-[#0A0A0E] hover:border-black/20"
                }`}
              >
                {cat === "all" ? "All Case Studies" : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Case Studies Grid */}
        <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AnimatePresence>
            {filteredStudies.map((cs, idx) => (
              <motion.div
                layout
                key={cs.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => setActiveModalStudy(cs)}
                className="rounded-3xl bg-white border border-black/8 overflow-hidden shadow-sm hover:border-[#FFD21F] hover:shadow-[0_12px_40px_rgba(255,210,31,0.18)] transition-all cursor-pointer flex flex-col justify-between group hover-lift"
              >
                {/* Card Header & Preview Image */}
                <div className="space-y-4">
                  <div className="relative h-60 w-full overflow-hidden bg-[#F4F4F8]">
                    <SafeImage
                      src={cs.heroImage}
                      alt={cs.title}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

                    {/* Badges on image */}
                    <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0A0A0E] text-[11px] font-mono font-bold shadow-xs">
                        {cs.category}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-black font-display tracking-tight text-white">
                          {cs.brandName}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#FFD21F] text-[#0A0A0E] font-mono font-extrabold text-xs shadow-xs">
                        {cs.roas}
                      </span>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 sm:p-7 space-y-4">
                    <h3 className="text-xl font-extrabold text-[#0A0A0E] font-display group-hover:text-[#A37F00] transition-colors leading-tight">
                      {cs.title}
                    </h3>
                    <p className="text-xs text-[#5A5A68] leading-relaxed line-clamp-2 font-sans">
                      {cs.subtitle}
                    </p>

                    {/* Telemetry Metrics Bar */}
                    <div className="grid grid-cols-3 gap-2 p-3 rounded-2xl bg-[#F8F8FC] border border-black/6 text-xs font-mono">
                      <div>
                        <span className="text-[10px] text-[#7A7A8A] block uppercase font-bold">Impressions</span>
                        <span className="font-bold text-[#0A0A0E] text-sm">{cs.impressions}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#7A7A8A] block uppercase font-bold">Conversions</span>
                        <span className="font-bold text-[#0A0A0E] text-sm">{cs.conversions}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#7A7A8A] block uppercase font-bold">Unit Cost</span>
                        <span className="font-bold text-[#0A0A0E] text-sm">{cs.cpv}</span>
                      </div>
                    </div>

                    {/* Client Quote Preview */}
                    <div className="p-4 rounded-2xl bg-[#FFFDF5] border border-[#FFD21F]/30 space-y-2">
                      <div className="flex items-center gap-1 text-[#FFD21F]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-[#3A3A48] italic font-sans line-clamp-2">
                        &ldquo;{cs.clientQuote.quote}&rdquo;
                      </p>
                      <span className="text-[11px] font-mono font-bold text-[#0A0A0E] block">
                        — {cs.clientQuote.author}, {cs.clientQuote.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="px-6 py-4 sm:px-7 sm:py-5 border-t border-black/8 bg-[#FAFAFC] flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#5A5A68]">
                    <Lock className="w-3.5 h-3.5 text-[#FFD21F]" />
                    <span>Escrow Vault: {formatCurrency(cs.escrowAmount)}</span>
                  </div>
                  <span className="text-xs font-bold text-[#0A0A0E] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    <span>Inspect Case Study</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0E]" />
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </section>

      {/* ── Case Study Detailed Modal ── */}
      {activeModalStudy && (
        <Modal
          isOpen={Boolean(activeModalStudy)}
          onClose={() => setActiveModalStudy(null)}
          title={`Case Study: ${activeModalStudy.brandName}`}
          maxWidth="3xl"
        >
          <div className="space-y-6 text-[#0A0A0E] select-none p-1 font-sans">
            {/* Modal Hero Banner */}
            <div className="relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-[#F4F4F8]">
              <SafeImage
                src={activeModalStudy.heroImage}
                alt={activeModalStudy.title}
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFD21F] text-[#0A0A0E] uppercase">
                  {activeModalStudy.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black font-display text-white">
                  {activeModalStudy.title}
                </h3>
              </div>
            </div>

            {/* Performance Telemetry Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="p-3.5 rounded-2xl bg-[#F8F8FC] border border-black/6">
                <span className="text-[10px] text-[#7A7A8A] block uppercase font-bold">ROAS Multiplier</span>
                <span className="text-xl font-black text-emerald-600 font-display">{activeModalStudy.roas}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8F8FC] border border-black/6">
                <span className="text-[10px] text-[#7A7A8A] block uppercase font-bold">Audited Reach</span>
                <span className="text-xl font-black text-[#0A0A0E] font-display">{activeModalStudy.impressions}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8F8FC] border border-black/6">
                <span className="text-[10px] text-[#7A7A8A] block uppercase font-bold">Sign-ups / Sales</span>
                <span className="text-xl font-black text-[#0A0A0E] font-display">{activeModalStudy.conversions}</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-[#F8F8FC] border border-black/6">
                <span className="text-[10px] text-[#7A7A8A] block uppercase font-bold">Pre-Funded Escrow</span>
                <span className="text-xl font-black text-[#0A0A0E] font-display">{formatCurrency(activeModalStudy.escrowAmount)}</span>
              </div>
            </div>

            {/* Campaign Deliverables & Breakdown */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold font-display text-[#0A0A0E] uppercase tracking-wider font-mono">
                Executed Deliverable Package
              </h4>
              <div className="space-y-2">
                {activeModalStudy.deliverables.map((del, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3A3A48] p-3 rounded-2xl bg-[#F8F8FC] border border-black/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{del}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategy & Key Outcomes */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold font-display text-[#0A0A0E] uppercase tracking-wider font-mono">
                Key Strategic Takeaways
              </h4>
              <div className="space-y-2">
                {activeModalStudy.keyTakeaways.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3A3A48]">
                    <div className="w-4 h-4 rounded-full bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      ✓
                    </div>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sponsor Review Quote */}
            <div className="p-5 rounded-2xl bg-[#FFFDF5] border border-[#FFD21F]/40 space-y-3">
              <div className="flex items-center gap-1 text-[#FFD21F]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-[#2A2A38] italic font-sans leading-relaxed">
                &ldquo;{activeModalStudy.clientQuote.quote}&rdquo;
              </p>
              <div className="pt-1 border-t border-black/6">
                <span className="font-bold text-xs text-[#0A0A0E] block">{activeModalStudy.clientQuote.author}</span>
                <span className="text-[11px] text-[#6A6A78]">{activeModalStudy.clientQuote.role}</span>
              </div>
            </div>

            {/* Modal Bottom CTA */}
            <div className="pt-4 border-t border-black/8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-[#7A7A8A] font-mono">
                Ready to replicate these numbers?
              </span>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveModalStudy(null)}
                  className="px-5 py-2.5 rounded-full border border-black/10 hover:bg-black/5 text-xs font-bold transition-all text-[#0A0A0E]"
                >
                  Close
                </button>
                <Link href="/app/brand/campaigns/create" className="flex-1 sm:flex-initial">
                  <button className="w-full px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FFD21F] via-[#FFE052] to-[#FFC700] hover:from-[#FFE052] hover:to-[#FFD21F] text-[#0A0A0E] text-xs font-bold transition-all shadow-xs border border-black/10 flex items-center justify-center gap-1.5">
                    <span>Launch Similar Campaign</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#0A0A0E]" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* ── Protection & Escrow Guarantee Section ── */}
      <CaseStudiesSection />

      {/* ── Metric Stats Strip ── */}
      <StatsSection />

      {/* ── Editorial CTA Strip ── */}
      <EditorialCTA />
    </div>
  );
}
