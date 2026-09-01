import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CinematicFooter } from "@/components/layout/CinematicFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-[#0A0A0E]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <CinematicFooter />
    </div>
  );
}
