import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Script from "next/script";
import { Button } from "@/components/ui/Button";
import { EditorialCTA } from "@/components/collably/EditorialCTA";
import { SafeImage } from "@/components/ui/SafeImage";
import {
  Video,
  BarChart3,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Layers,
  Crown,
} from "lucide-react";

const BASE_URL = "https://abeycollab.vercel.app";

export const metadata: Metadata = {
  title: "Agency Services — Creator Representation & Campaign Strategy",
  description:
    "Full-service creator talent management, viral UGC video production, end-to-end influencer strategy, and performance attribution by AbeyCollab.",
  keywords: [
    "creator talent agency",
    "influencer campaign management services",
    "ugc video production",
    "creator brand deal sourcing",
    "influencer roas attribution",
  ],
  alternates: { canonical: `${BASE_URL}/services` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/services`,
    title: "Agency Services | AbeyCollab Creator Commerce",
    description: "End-to-end campaign management, UGC production, and elite talent representation.",
    images: ["/og-image.png"],
  },
};

const servicesJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Creator Management & Influencer Campaign Execution",
  provider: {
    "@type": "Organization",
    name: "AbeyCollab",
    url: BASE_URL,
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AbeyCollab Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Creator Talent Representation",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "End-to-End Campaign Strategy",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "High-Converting UGC & Video Production",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Attribution & Audience Intelligence",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Protected Escrow & Milestone Settlement",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "AI-Powered Talent Discovery & NLP Brief Matching",
        },
      },
    ],
  },
};

export default function ServicesPage() {
  const services = [
    {
      icon: Crown,
      tag: "TALENT OS",
      title: "Creator Talent Representation",
      description: "Dedicated management for elite creators. Exclusive brand deal sourcing, rate card optimization, and contract escrow enforcement.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1000&auto=format&fit=crop&q=80",
      features: ["Verified media kit syndication", "Zero invoice chasing", "Inbound deal triage"],
    },
    {
      icon: Target,
      tag: "FULL-SERVICE AGENCY",
      title: "End-to-End Campaign Strategy",
      description: "Full-service agency execution. We research creator cohorts, craft high-impact narrative hooks, and manage all deliverables.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1000&auto=format&fit=crop&q=80",
      features: ["Custom creator cohort curation", "Brief & script storyboard QA", "Full timeline project management"],
    },
    {
      icon: Video,
      tag: "4K PRODUCTION",
      title: "High-Converting UGC & Video Production",
      description: "Produce viral UGC video ads for TikTok, Reels, and YouTube Shorts ready for paid acquisition scaling.",
      image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&auto=format&fit=crop&q=80",
      features: ["4K raw footage delivery", "Paid usage rights clearance", "Split-screen A/B test hooks"],
    },
    {
      icon: BarChart3,
      tag: "ROAS TELEMETRY",
      title: "Attribution & Audience Intelligence",
      description: "Granular conversion tracking, audience authenticity audits, and CAC/ROAS performance reporting.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80",
      features: ["Audited audience demographics", "Coupon & UTM link analytics", "Quarterly executive reporting"],
    },
    {
      icon: ShieldCheck,
      tag: "FINANCIAL SECURITY",
      title: "Protected Escrow & Milestone Settlement",
      description: "Double-entry cryptographic payment protection. Escrow deposits secured before work starts with automated 120-hour review SLA.",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1000&auto=format&fit=crop&q=80",
      features: ["100% pre-work refund safety", "Instant Razorpay & Stripe payouts", "24h judicial dispute arbitration court"],
    },
    {
      icon: Sparkles,
      tag: "ALGORITHM HUB",
      title: "AI-Powered Talent Discovery & NLP Matching",
      description: "Explainable multi-attribute matchmaking matching brand brief narratives with high-engagement rising creator cohorts.",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80",
      features: ["Prompt-based natural language search", "Audience retention score weighting", "Anti-gaming burst rate limiting"],
    },
  ];

  return (
    <div className="bg-[#FAFAFC] text-[#0A0A0E] min-h-screen">
      <Script
        id="services-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-xs font-mono font-bold text-[#0A0A0E] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#FFD21F]" />
          <span>Agency Services &amp; Managed Solutions</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
          Modern Agency Services Built for Scale
        </h1>
        <p className="text-base text-[#5A5A68] max-w-2xl mx-auto font-sans font-medium leading-relaxed">
          Whether self-serve via our SaaS platform or fully managed by our talent strategy team, we power world-class creator marketing.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="group rounded-3xl bg-white border border-black/8 hover:border-[#FFD21F] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Visual Image Stage Matched to Title */}
                <div className="relative h-48 w-full bg-[#F0F0F4] overflow-hidden border-b border-black/5">
                  <SafeImage
                    src={s.image}
                    alt={s.title}
                    fallbackType="campaign"
                    fallbackName={s.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Top Floating Tag */}
                  <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between z-10">
                    <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 text-[9px] font-mono font-bold uppercase tracking-wider">
                      {s.tag}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#FFD21F] text-[#0A0A0E] flex items-center justify-center shadow-sm">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title Preview on Stage */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 z-10 text-white">
                    <h3 className="text-lg font-bold font-display leading-tight drop-shadow-xs">
                      {s.title}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <p className="text-xs text-[#5A5A68] leading-relaxed font-sans font-medium">
                      {s.description}
                    </p>

                    <ul className="space-y-2 pt-2 border-t border-black/5 font-mono text-xs text-[#5A5A68]">
                      {s.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2 font-sans font-medium text-[#0A0A0E] text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-black/8">
                    <Link href="/contact">
                      <Button variant="secondary" size="sm" className="w-full rounded-full" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                        Inquire for Custom Scope
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <EditorialCTA />
    </div>
  );
}
