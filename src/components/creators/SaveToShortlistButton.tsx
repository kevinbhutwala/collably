"use client";

import React from "react";
import { CreatorProfile } from "@/core/types";
import { useShortlistStore } from "@/stores/shortlist.store";
import { useUIStore } from "@/stores/ui.store";
import { Bookmark } from "lucide-react";
import { cn } from "@/lib/utils";

export function SaveToShortlistButton({
  creator,
  className,
}: {
  creator: CreatorProfile;
  className?: string;
}) {
  const { isSaved, toggleSaveCreator } = useShortlistStore();
  const { addToast } = useUIStore();
  const saved = isSaved(creator.id);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowSaved = await toggleSaveCreator(creator);
    addToast({
      type: "success",
      title: nowSaved ? "Saved to Shortlist" : "Removed from Shortlist",
      message: `${creator.fullName} has been ${nowSaved ? "added to" : "removed from"} your active brand talent shortlist.`,
    });
  };

  return (
    <button
      type="button"
      onClick={handleSave}
      className={cn(
        "w-full py-2.5 rounded-full border text-xs font-bold transition-all flex items-center justify-center gap-2 select-none",
        saved
          ? "bg-[#FFD21F] text-[#0A0A0E] border-black/10 shadow-xs"
          : "bg-white text-[#5A5A68] hover:text-[#0A0A0E] border-black/10 hover:bg-[#F5F5F9]",
        className
      )}
    >
      <Bookmark className={cn("w-3.5 h-3.5", saved ? "fill-[#0A0A0E]" : "")} />
      <span>{saved ? "Saved to Shortlist" : "Save to Shortlist"}</span>
    </button>
  );
}
