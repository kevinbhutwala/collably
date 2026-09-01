"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { brandService } from "@/services/brand.service";
import { BrandProfile } from "@/core/types";
import { Button } from "@/components/ui/Button";
import { BrandIcon } from "@/components/ui/BrandLogos";
import { formatCurrency } from "@/core/utils/formatters";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function BrandsDirectoryPage() {
  const [brands, setBrands] = useState<BrandProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await brandService.getBrands();
      setBrands(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div className="py-12 sm:py-16 bg-[#FAFAFC] text-[#0A0A0E] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/8 text-xs font-mono font-bold text-[#0A0A0E] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F]" />
            <span>Brand Partners Directory</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Partner with category-defining brands
          </h1>
          <p className="text-sm sm:text-base text-[#5A5A68] font-sans font-medium">
            Discover verified companies funding creator campaigns with guaranteed milestone escrow.
          </p>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="rounded-3xl bg-white border border-black/8 hover:border-[#FFD21F] p-6 shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-14 h-14 rounded-2xl bg-[#F8F8FC] border border-black/8 text-[#0A0A0E] flex items-center justify-center shrink-0 shadow-xs">
                    <BrandIcon name={brand.companyName} size={28} className="text-[#0A0A0E]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0A0A0E] flex items-center gap-1.5 font-display">
                      {brand.companyName}
                      {brand.verified && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                    </h3>
                    <p className="text-xs text-[#7A7A8A] font-mono">
                      {brand.industry} • {brand.location}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#0A0A0E] font-semibold line-clamp-1 font-sans">{brand.headline}</p>
                <p className="text-xs text-[#5A5A68] line-clamp-2 leading-relaxed font-sans font-medium">{brand.description}</p>

                <div className="grid grid-cols-2 gap-2 p-3 rounded-2xl bg-[#F8F8FC] border border-black/5 font-mono text-center text-xs">
                  <div>
                    <span className="text-[10px] text-[#7A7A8A] block uppercase">Campaigns</span>
                    <span className="font-bold text-[#0A0A0E]">{brand.activeCampaignsCount} Active</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A7A8A] block uppercase">Escrow Volume</span>
                    <span className="font-bold text-[#0A0A0E]">{formatCurrency(brand.totalSpent)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-black/8 mt-4">
                <Link href="/campaigns" className="w-full">
                  <Button variant="secondary" size="sm" className="w-full rounded-full" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
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
