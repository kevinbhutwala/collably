import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Sparkles, Building2 } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 border-t border-white/10 bg-[#0a070a] relative overflow-hidden text-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[radial-gradient(closest-side,hsl(327_100%_46%/0.12),transparent)] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: For Brands */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#180f1d] via-[#120c16] to-[#0c0810] border border-white/10 hover:border-pink-500/40 text-white flex flex-col justify-between space-y-6 shadow-elevated transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-purple-300 shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                For Brands &amp; Growth Teams
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Launch creator campaigns in minutes. Access verified audience metrics, escrow protection, and direct collaboration with world-class storytellers.
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <Link href="/app/brand/campaigns/create" className="w-full block">
                <Button variant="primary" size="lg" className="w-full rounded-full font-display font-bold" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                  Create a Campaign Brief
                </Button>
              </Link>
              <p className="text-center text-[11px] text-slate-400 font-mono">
                No subscription required to explore creators
              </p>
            </div>
          </div>

          {/* Card 2: For Creators */}
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#180f1d] via-[#120c16] to-[#0c0810] border border-white/10 hover:border-pink-500/40 flex flex-col justify-between space-y-6 shadow-card transition-all">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-pink-400 shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                For Creators &amp; Influencers
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                Showcase your media kit to premium brands. Pitch creative campaigns with AI proposals and receive guaranteed on-time escrow payouts.
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <Link href="/creator/register" className="w-full block">
                <Button variant="primary" size="lg" className="w-full rounded-full font-display font-bold" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                  Apply to Join Roster
                </Button>
              </Link>
              <p className="text-center text-[11px] text-slate-400 font-mono">
                Keep 90% of your earnings • Escrow protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
