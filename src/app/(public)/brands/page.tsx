"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { brandService } from "@/services/brand.service";
import { BrandProfile } from "@/core/types";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandLogos";
import { formatCurrency } from "@/core/utils/formatters";
import { CheckCircle2, ArrowUpRight, Building2 } from "lucide-react";

export default function BrandsDirectoryPage() {
  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await brandService.getBrands();
      setBrands(data);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="py-12 sm:py-16 bg-[#0a070a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/30 text-[hsl(327,100%,55%)] text-xs font-semibold font-mono">
            <Building2 className="w-3.5 h-3.5 text-gold" />
            <span>Brand Partners Directory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-display">
            Partner with category-defining brands
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-sans">
            Discover verified companies funding creator campaigns with guaranteed milestone escrow.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="rounded-3xl bg-[#120c16] border border-white/10 hover:border-pink-500/40 p-6 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.08] border border-white/20 text-white flex items-center justify-center shrink-0 shadow-md">
                    <BrandIcon name={brand.companyName} size={28} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-white flex items-center gap-1.5 font-display">
                      {brand.companyName}
                      {brand.verified && (
                        <CheckCircle2 className="w-4 h-4 fill-sky-400 text-[#0a070a] shrink-0" />
                      )}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono">
                      {brand.industry} • {brand.location}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-slate-200 font-semibold line-clamp-1 font-sans">{brand.headline}</p>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">{brand.description}</p>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-white/[0.04] border border-white/10 font-mono text-center text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Campaigns</span>
                    <span className="font-bold text-white">{brand.activeCampaignsCount} Active</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Escrow Volume</span>
                    <span className="font-bold text-emerald-400">{formatCurrency(brand.totalSpent)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 mt-4">
                <Link href="/campaigns" className="w-full">
                  <Button variant="secondary" size="sm" className="w-full rounded-full" rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}>
                    View Active Briefs
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
