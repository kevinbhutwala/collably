import React from "react";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { TrendingUp, Award, CheckCircle2 } from "lucide-react";

export function CaseStudiesSection() {
  const caseStudies = [
    {
      brand: "Linear Dynamics",
      tagline: "AI Backlog Triage Product Launch",
      roi: "5.4x ROI",
      reach: "1.8M Impressions",
      creators: "12 Engineering Creators",
      conversions: "+34,000 Signups",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
      quote: "NEXUS delivered the highest developer conversion campaign in our company's history. Zero micromanagement needed.",
      author: "Head of Growth, Linear",
    },
    {
      brand: "Kuro Recovery Lab",
      tagline: "Thermal Biohacking Sleep Protocol",
      roi: "6.2x ROI",
      reach: "3.4M Impressions",
      creators: "8 Longevity Athletes",
      conversions: "$420k In Sales",
      image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80",
      quote: "The empirical before-and-after wearable data created instant organic virality on YouTube and Instagram.",
      author: "CMO, Kuro Recovery",
    }
  ];

  return (
    <section className="py-24 border-t border-slate-200 bg-slate-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
            <Award className="w-3.5 h-3.5 text-emerald-600" />
            <span>Proven Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Case studies that redefine performance
          </h2>
          <p className="text-base text-slate-600">
            Real campaigns. Verified impressions. Measurable revenue growth.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {caseStudies.map((cs, i) => (
            <div
              key={i}
              className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="glow" size="sm">{cs.brand}</Badge>
                  <span className="text-xs font-mono font-bold text-emerald-600 flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> {cs.roi}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mb-4">
                  {cs.tagline}
                </h3>

                <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-center mb-6 font-mono">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Reach</p>
                    <p className="text-sm font-extrabold text-slate-900">{cs.reach}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Cohort</p>
                    <p className="text-sm font-extrabold text-slate-900">{cs.creators}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase font-semibold">Result</p>
                    <p className="text-sm font-extrabold text-emerald-600">{cs.conversions}</p>
                  </div>
                </div>

                <div className="relative h-44 rounded-2xl overflow-hidden mb-6 shadow-sm">
                  <Image src={cs.image} alt={cs.brand} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                <p className="text-sm text-slate-700 italic mb-2 leading-relaxed">
                  &ldquo;{cs.quote}&rdquo;
                </p>
                <p className="text-xs text-slate-500 font-mono font-medium">— {cs.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
