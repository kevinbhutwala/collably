"use client";

import React, { useState, useEffect } from "react";
import { collaborationService } from "@/services/collaboration.service";
import { Collaboration } from "@/core/types";
import { useAuthStore } from "@/stores/auth.store";
import { DeliverablesPipeline } from "@/components/collaborations/DeliverablesPipeline";
import { AnimatedEmptyState } from "@/components/ui/AnimatedEmptyState";
import { CreativeLoader } from "@/components/ui/CreativeLoader";
import { FolderGit2 } from "lucide-react";


export default function CollaborationsWorkspacePage() {
  const { role, currentCreator, currentBrand } = useAuthStore();
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const data = await collaborationService.getCollaborations(
          role === "creator" ? "creator" : "brand",
          role === "creator" ? currentCreator?.id : currentBrand?.id
        );
        setCollaborations(data || []);
      } catch {
        setCollaborations([]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [role, currentCreator?.id, currentBrand?.id]);

  return (
    <div className="space-y-6 text-[#0A0A0E] select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Projects
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Secured Escrow
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Active Collaborations &amp; Deals
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            Submit content drafts, review feedback, and approve secured payments.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-black/8 p-6 text-[#0A0A0E] shadow-xs">
          <CreativeLoader
            size="md"
            label="Loading Projects"
            subtext="Fetching project deliverables and review status..."
          />
        </div>
      ) : collaborations.length === 0 ? (
        <AnimatedEmptyState
          icon={<FolderGit2 className="w-7 h-7 text-[#0A0A0E]" />}
          badgeText="Projects"
          title="No Active Deals Yet"
          description={
            role === "creator"
              ? "Your accepted pitches and ongoing brand projects will appear here once approved."
              : "Creators you hire and active content deliverables will appear here."
          }
          actionText={role === "creator" ? "Find Campaigns" : "Post Campaign"}
          actionHref={role === "creator" ? "/app/campaigns" : "/app/brand/campaigns/create"}
          secondaryText="Go to Dashboard"
          secondaryHref="/app/dashboard"
        />
      ) : (
        <div className="space-y-8">
          {collaborations.map((collab) => (
            <DeliverablesPipeline key={collab.id} collaboration={collab} />
          ))}
        </div>
      )}
    </div>
  );
}
