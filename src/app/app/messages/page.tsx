import React from "react";
import { ChatWorkspace } from "@/components/messages/ChatWorkspace";

export default function MessagesPage() {
  return (
    <div className="space-y-5 text-[#0A0A0E] select-none">
      <div className="hidden lg:flex pb-4 border-b border-black/8 flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FFD21F]/20 border border-[#FFD21F]/40 text-[#0A0A0E] text-[10px] font-mono font-bold uppercase mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Direct Messaging</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Messages
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68]">
            Direct communication with brands, creators, and campaign managers.
          </p>
        </div>
      </div>

      <ChatWorkspace />
    </div>
  );
}
