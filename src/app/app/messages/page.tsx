import React from "react";
import { ChatWorkspace } from "@/components/messages/ChatWorkspace";

export default function MessagesPage() {
  return (
    <div className="space-y-6 text-[#111111]">
      <div className="pb-4 border-b border-[#E7E7E4]">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">
          Direct Messages &amp; Threaded Conversations
        </h1>
        <p className="text-xs sm:text-sm text-[#6B6B6B] mt-0.5 font-medium">
          Realtime communication between creators, brands, and agency supervisors.
        </p>
      </div>

      <ChatWorkspace />
    </div>
  );
}
