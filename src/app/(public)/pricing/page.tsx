import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FAQSection } from "@/components/collably/FAQSection";
import { EditorialCTA } from "@/components/collably/EditorialCTA";
import { CheckCircle2, ShieldCheck, ArrowUpRight } from "lucide-react";

export default function PricingPage() {
  const plans = [
    {
      name: "Self-Serve Marketplace",
      price: "10%",
      subtext: "Take-rate per successful escrow payout",
      description: "Direct discovery and self-serve collaboration tools for fast-moving startups and creator partners.",
      features: [
        "Full access to vetted creator discovery",
        "7-step automated campaign wizard",
        "AI Campaign Brief & Proposal generators",
        "Milestone escrow payment protection",
        "Real-time threaded chat & deliverable reviews",
      ],
      cta: "Start Free Brief",
      href: "/app/brand/campaigns/create",
      highlight: false,
    },
    {
      name: "Managed Agency Retainer",
      price: "$4,500",
      subtext: "/ month + creator campaign spend",
      description: "Dedicated talent director and end-to-end production management for scaling growth teams.",
      features: [
        "Everything in Self-Serve Marketplace",
        "Dedicated Senior Creator Strategist",
        "Guaranteed creator cohort recruitment",
        "Script storyboard & video asset QA",
        "Whitelisted paid ad usage rights handling",
        "Quarterly attribution and ROI reports",
      ],
      cta: "Schedule Agency Consultation",
      href: "/contact",
      highlight: true,
    },
    {
      name: "Enterprise Brand Suite",
      price: "Custom",
      subtext: "Bespoke annual enterprise retainers",
      description: "Custom compliance, dedicated escrow vaults, and multi-tier influencer roster retainers.",
      features: [
        "Everything in Managed Retainer",
        "Custom legal MSAs & contract terms",
        "Multi-user team permissions & audit logs",
        "Direct API & CRM attribution integration",
        "Exclusive creator roster lockouts",
        "Dedicated Slack channel with executive leadership",
      ],
      cta: "Contact Enterprise Sales",
      href: "/contact",
      highlight: false,
    },
  ];

  return (
    <div className="bg-[#FAFAF8] text-[#111111] min-h-screen">
      <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFFFFF] border border-[#E7E7E4] text-[#111111] text-xs font-semibold font-mono shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#B7FF3C]" />
          <span>Transparent &amp; Escrow Secured</span>
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#111111] tracking-tight font-display">
          Simple, Transparent Pricing
        </h1>
        <p className="text-base text-[#6B6B6B] max-w-2xl mx-auto font-sans leading-relaxed">
          No hidden subscription traps. Pay transparent platform fees only on successful milestones or partner with our dedicated agency team.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((p, i) => (
            <div
              key={i}
              className={`p-8 rounded-2xl border transition-all flex flex-col justify-between space-y-8 ${
                p.highlight
                  ? "bg-[#FFFFFF] text-[#111111] shadow-editorial-lg border-[#111111] relative"
                  : "bg-[#FFFFFF] text-[#111111] border-[#E7E7E4] shadow-xs hover:border-[#111111]"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="px-3 py-1 rounded-full bg-[#B7FF3C] text-[#111111] text-xs font-mono font-bold border border-[#9EE61C] shadow-xs">
                    Most Popular for Growth Teams
                  </span>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-[#111111] font-display">{p.name}</h3>
                  <p className="text-xs mt-1 leading-relaxed text-[#6B6B6B] font-sans">
                    {p.description}
                  </p>
                </div>

                <div className="pt-2 font-mono">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#111111]">
                    {p.price}
                  </span>
                  <span className="text-xs block mt-1 text-[#6B6B6B] font-sans">{p.subtext}</span>
                </div>

                <ul className="space-y-3 pt-4 border-t border-[#E7E7E4] text-xs font-sans">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                      <span className="text-[#111111] font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={p.href} className="w-full block pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full shadow-xs rounded-[9px] font-sans font-bold"
                  rightIcon={<ArrowUpRight className="w-4 h-4" />}
                >
                  {p.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <FAQSection />
      <EditorialCTA />
    </div>
  );
}
