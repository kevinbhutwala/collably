import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ArrowUpRight, Sparkles, Building2, ShieldCheck } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-24 border-t border-slate-200 bg-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-orange-100/50 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: For Brands */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-900 text-white flex flex-col justify-between space-y-6 shadow-elevated">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-sky-400 shadow-sm">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                For Brands & Growth Teams
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Launch creator campaigns in minutes. Access verified audience metrics, escrow protection, and direct collaboration with world-class storytellers.
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <Link href="/app/brand/campaigns/create" className="w-full block">
                <Button variant="accent" size="lg" className="w-full" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                  Create a Campaign Brief
                </Button>
              </Link>
              <p className="text-center text-[11px] text-slate-400 font-mono">
                No subscription required to explore creators
              </p>
            </div>
          </div>

          {/* Card 2: For Creators */}
          <div className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200 flex flex-col justify-between space-y-6 shadow-card">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-amber-500 shadow-sm">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                For Creators & Influencers
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Showcase your media kit to premium brands. Pitch creative campaigns with AI proposals and receive guaranteed on-time escrow payouts.
              </p>
            </div>

            <div className="pt-4 space-y-3">
              <Link href="/creator/register" className="w-full block">
                <Button variant="outline" size="lg" className="w-full" rightIcon={<ArrowUpRight className="w-4 h-4" />}>
                  Apply to Join Roster
                </Button>
              </Link>
              <p className="text-center text-[11px] text-slate-500 font-mono">
                Keep 90% of your earnings • Escrow protected
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
