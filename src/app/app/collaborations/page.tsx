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
    <div className="space-y-8 text-[#0A0A0E] select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-black/8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-[#0A0A0E] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Workspace Portal
            </span>
            <span className="text-[#8A8A9A]">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] font-mono text-[10px] font-bold">
              Milestone Escrow
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Active Collaborations &amp; Content Submissions
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
            Submit video drafts, review feedback with revision timestamps, and approve milestone payouts.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-16 text-center rounded-3xl bg-white border border-black/8 p-8 text-[#0A0A0E] shadow-xs">
          <CreativeLoader
            size="md"
            label="Syncing Active Pipelines"
            subtext="Fetching live milestone deliverables, revision threads & escrow state..."
          />
        </div>
      ) : collaborations.length === 0 ? (

        <AnimatedEmptyState
          icon={<FolderGit2 className="w-8 h-8 text-[#0A0A0E]" />}
          badgeText="Active Pipeline"
          title="No Active Collaborations Yet"
          description={
            role === "creator"
              ? "When a brand accepts your pitch or invites you to a campaign, your milestone deliverables and 4K QA review rooms will be unlocked here."
              : "When you hire creators or accept pitch applications, their deliverables will populate this interactive tracking stage."
          }
          actionText={role === "creator" ? "Find Brand Campaigns" : "Create Campaign Brief"}
          actionHref={role === "creator" ? "/campaigns" : "/app/brand/campaigns/create"}
          secondaryText="View Dashboard"
          secondaryHref="/app/dashboard"
        />
      ) : (
        <div className="space-y-12">
          {collaborations.map((collab) => (
            <DeliverablesPipeline key={collab.id} collaboration={collab} />
          ))}
        </div>
      )}
    </div>
  );
}
