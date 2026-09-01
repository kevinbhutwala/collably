"use client";

import React, { useState, useEffect } from "react";
import { collaborationService } from "@/services/collaboration.service";
import { Collaboration } from "@/core/types";
import { useAuthStore } from "@/stores/auth.store";
import { DeliverablesPipeline } from "@/components/collaborations/DeliverablesPipeline";
import { AnimatedEmptyState } from "@/components/ui/AnimatedEmptyState";
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
    <div className="space-y-8 text-white select-none">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold uppercase text-white/80 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Workspace Portal
            </span>
            <span className="text-white/20">•</span>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-mono text-[10px] font-bold">
              Milestone Escrow
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
            Active Collaborations &amp; Content Submissions
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
            Submit video drafts, review feedback with revision timestamps, and approve milestone payouts.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="py-24 text-center rounded-3xl bg-[#0E0C15]/90 border border-white/10 p-8 text-white">
          <div className="w-8 h-8 rounded-full border-2 border-[#2A5CFF] border-t-transparent animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono text-white/50">Loading collaboration pipelines...</p>
        </div>
      ) : collaborations.length === 0 ? (
        <AnimatedEmptyState
          icon={<FolderGit2 className="w-8 h-8 text-white" />}
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
