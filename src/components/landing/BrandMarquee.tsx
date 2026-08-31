"use client";

import React from "react";
import {
  LinearLogo,
  StripeLogo,
  NotionLogo,
  FigmaLogo,
  VercelLogo,
  SupabaseLogo,
  RaycastLogo,
  OpenAILogo,
  SpotifyLogo,
  AirbnbLogo,
} from "@/components/ui/BrandLogos";

export function BrandMarquee() {
  const brandList = [
    { name: "Linear", logo: LinearLogo, category: "Engineering & Issue Tracking" },
    { name: "Stripe", logo: StripeLogo, category: "Financial Infrastructure" },
    { name: "Notion", logo: NotionLogo, category: "Connected Workspace" },
    { name: "Figma", logo: FigmaLogo, category: "Collaborative Design" },
    { name: "Vercel", logo: VercelLogo, category: "Frontend Cloud" },
    { name: "Supabase", logo: SupabaseLogo, category: "Open Source Backend" },
    { name: "Raycast", logo: RaycastLogo, category: "Supercharged Productivity" },
    { name: "OpenAI", logo: OpenAILogo, category: "Applied Intelligence" },
    { name: "Spotify", logo: SpotifyLogo, category: "Global Audio Streaming" },
    { name: "Airbnb", logo: AirbnbLogo, category: "Global Travel & Stays" },
  ];

  return (
    <section className="py-14 border-y border-slate-200 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center space-y-2">
        <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 font-mono">
          Trusted by Tier-1 Tech Founders & Global Category Creators
        </p>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative w-full flex overflow-x-hidden group select-none">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-6 sm:gap-8 py-2">
          {brandList.concat(brandList).map((brand, idx) => {
            const LogoComponent = brand.logo;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-3.5 px-6 py-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-xs hover:border-slate-300 hover:bg-white transition-all text-slate-800"
              >
                <LogoComponent size={22} className="text-slate-900" />
                <span className="text-sm font-extrabold tracking-tight text-slate-900 font-sans">
                  {brand.name}
                </span>
                <span className="text-[11px] text-slate-500 font-mono hidden md:inline">
                  / {brand.category}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
