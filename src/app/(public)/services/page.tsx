import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { EditorialCTA } from "@/components/collably/EditorialCTA";
import {
  Video,
  BarChart3,
  Users,
  Target,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      icon: Users,
      title: "Creator Talent Representation",
      description: "Dedicated management for elite creators. Exclusive brand deal sourcing, rate card optimization, and contract escrow enforcement.",
      features: ["Verified media kit syndication", "Zero invoice chasing", "Inbound deal triage"],
    },
    {
      icon: Target,
      title: "End-to-End Campaign Strategy",
      description: "Full-service agency execution. We research creator cohorts, craft high-impact narrative hooks, and manage all deliverables.",
      features: ["Custom creator cohort curation", "Brief & script storyboard QA", "Full timeline project management"],
    },
    {
      icon: Video,
      title: "High-Converting UGC & Video Production",
      description: "Produce viral UGC video ads for TikTok, Reels, and YouTube Shorts ready for paid acquisition scaling.",
      features: ["4K raw footage delivery", "Paid usage rights clearance", "Split-screen A/B test hooks"],
    },
    {
      icon: BarChart3,
      title: "Attribution & Audience Intelligence",
      description: "Granular conversion tracking, audience authenticity audits, and CAC/ROAS performance reporting.",
      features: ["Audited audience demographics", "Coupon & UTM link analytics", "Quarterly executive reporting"],
    },
  ];

  return (
    <div className="bg-[#FAFAFC] text-[#0A0A0E] min-h-screen">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="p-8 sm:p-10 rounded-3xl bg-white border border-black/8 hover:border-[#FFD21F] shadow-xs transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#F8F8FC] border border-black/8 flex items-center justify-center text-[#0A0A0E] shadow-xs">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0A0A0E] font-display">{s.title}</h3>
                  <p className="text-sm text-[#5A5A68] leading-relaxed font-sans font-medium">{s.description}</p>

                  <ul className="space-y-2.5 pt-2 font-mono text-xs text-[#5A5A68]">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 font-sans font-medium text-[#0A0A0E]">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-black/8">
                  <Link href="/contact">
                    <Button variant="secondary" size="md" className="w-full rounded-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Inquire for Custom Scope
                    </Button>
                  </Link>
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
