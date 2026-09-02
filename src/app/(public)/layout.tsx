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
      <div className="flex flex-col min-h-screen bg-white text-[#0A0A0E] selection:bg-[#FFD21F] selection:text-[#0A0A0E] relative overflow-x-hidden">
        {/* Mobile: warm gold radial glow at top — gives depth on small screens */}
        <div className="md:hidden fixed top-0 left-1/2 -translate-x-1/2 w-[350px] h-[250px] bg-[#FFD21F]/8 blur-[80px] rounded-full pointer-events-none z-0" />
        <Navbar />
        <main className="flex-1 relative z-10">{children}</main>
        <CinematicFooter />
      </div>
    </SmoothScrollProvider>
  );
}
