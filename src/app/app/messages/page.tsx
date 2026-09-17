import React, { Suspense } from "react";
import { ChatWorkspace } from "@/components/messages/ChatWorkspace";

export default function MessagesPage() {
  return (
    <div className="h-[calc(100vh-6.5rem)] lg:h-[calc(100vh-7.5rem)] w-full text-[#0A0A0E] dark:text-[#F4F4F8] select-none flex flex-col overflow-hidden">
      <Suspense fallback={
        <div className="h-full flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-3 border-[#FFD21F] border-t-transparent animate-spin" />
        </div>
      }>
        <ChatWorkspace />
      </Suspense>
    </div>
  );
}
