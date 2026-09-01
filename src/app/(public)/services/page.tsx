import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/landing/CTASection";
import {
  Sparkles,
  Video,
  BarChart3,
  Users,
  Target,
  ArrowUpRight,
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
    <div className="bg-[#0a070a] text-white min-h-screen">
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] text-xs font-semibold font-mono">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Agency Services &amp; Managed Solutions</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display">
          Modern Agency Services Built for Scale
        </h1>
        <p className="text-base text-slate-300 max-w-2xl mx-auto font-sans leading-relaxed">
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
                className="p-8 sm:p-10 rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/40 shadow-card hover:shadow-elevated transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[hsl(327,100%,55%)] shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">{s.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed font-sans">{s.description}</p>

                  <ul className="space-y-2.5 pt-2 font-mono text-xs text-slate-300">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 font-sans font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <Link href="/contact">
                    <Button variant="outline" size="md" className="w-full rounded-full font-display" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                      Inquire for Custom Scope
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CTASection />
    </div>
  );
}
