import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CinematicFooter } from "@/components/layout/CinematicFooter";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SmoothScrollProvider>
      <div className="flex flex-col min-h-screen bg-white text-[#0A0A0E] selection:bg-[#FFD21F] selection:text-[#0A0A0E]">
        <Navbar />
        <main className="flex-1">{children}</main>
        <CinematicFooter />
      </div>
    </SmoothScrollProvider>
  );
}
