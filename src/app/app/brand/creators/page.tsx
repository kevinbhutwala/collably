"use client";

import React, { useState, useEffect } from "react";
import { creatorService } from "@/services/creator.service";
import { CreatorProfile } from "@/core/types";
import { CreatorCard } from "@/components/creators/CreatorCard";
import { CreatorFilterPanel } from "@/components/creators/CreatorFilterPanel";
import { Badge } from "@/components/ui/Badge";

export default function BrandCreatorDiscoveryPage() {
  const [creators, setCreators] = useState<CreatorProfile[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const data = await creatorService.getCreators();
      setCreators(data);
    };
    fetch();
  }, []);

  return (
    <div className="space-y-8 text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[hsl(327,100%,55%)]">
              Creator Roster
            </span>
            <span className="text-white/20">•</span>
            <Badge variant="glow" size="sm">Audited Demographics</Badge>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Discover Talent for Your Brand
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5 font-sans">
            Directly invite verified creators or add them to your campaign shortlists.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 shrink-0">
          <CreatorFilterPanel />
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {creators.map((c) => (
              <CreatorCard key={c.id} creator={c} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
