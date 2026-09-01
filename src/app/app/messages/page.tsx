import React from "react";
import { ChatWorkspace } from "@/components/messages/ChatWorkspace";

export default function MessagesPage() {
  return (
    <div className="space-y-6 text-white select-none">
      <div className="pb-4 border-b border-white/10">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
          Direct Messages &amp; Threaded Conversations
        </h1>
        <p className="text-xs sm:text-sm text-white/50 mt-0.5 font-sans">
          Realtime communication between creators, brands, and agency supervisors.
        </p>
      </div>

      <ChatWorkspace />
    </div>
  );
}
