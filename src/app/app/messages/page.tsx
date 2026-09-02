import React from "react";
import { ChatWorkspace } from "@/components/messages/ChatWorkspace";

export default function MessagesPage() {
  return (
    <div className="h-[calc(100vh-6.5rem)] lg:h-[calc(100vh-7.5rem)] w-full text-[#0A0A0E] select-none flex flex-col overflow-hidden">
      <ChatWorkspace />
    </div>
  );
}
