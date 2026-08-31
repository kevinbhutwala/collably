import React from "react";
import { ChatWorkspace } from "@/components/messages/ChatWorkspace";

export default function MessagesPage() {
  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-zinc-800">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Direct Messages & Threaded Conversations
        </h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
          Realtime communication between creators, brands, and agency supervisors.
        </p>
      </div>

      <ChatWorkspace />
    </div>
  );
}
