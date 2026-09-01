import React from "react";
import { ChatWorkspace } from "@/components/messages/ChatWorkspace";

export default function MessagesPage() {
  return (
    <div className="space-y-6 text-[#0A0A0E] select-none">
      <div className="pb-4 border-b border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F]/15 border border-[#FFD21F]/30 text-[#0A0A0E] text-[11px] font-mono font-bold uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse" />
            <span>Encrypted Direct Messaging</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0E] tracking-tight font-display">
            Direct Messages &amp; Threaded Channels
          </h1>
          <p className="text-xs sm:text-sm text-[#5A5A68] mt-0.5 font-sans">
            Real-time synchronization between creators, brand marketing teams, and agency supervisors.
          </p>
        </div>
      </div>

      <ChatWorkspace />
    </div>
  );
}
