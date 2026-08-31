import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/landing/CTASection";
import {
  Sparkles,
  ShieldCheck,
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
    <div className="bg-white min-h-screen">
      <div className="pt-16 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-brand-accent text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Agency Services & Managed Solutions</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight">
          Modern Agency Services Built for Scale
        </h1>
        <p className="text-base text-slate-600 max-w-2xl mx-auto">
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
                className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-card hover:shadow-elevated transition-all space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center text-brand-accent shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.description}</p>

                  <ul className="space-y-2.5 pt-2 font-mono text-xs text-slate-700">
                    {s.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 font-sans font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-slate-100">
                  <Link href="/contact">
                    <Button variant="outline" size="md" className="w-full" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
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
