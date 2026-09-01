import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CinematicFooter } from "@/components/layout/CinematicFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#07070B] text-white">
      <Navbar />
      <main className="flex-1">{children}</main>
      <CinematicFooter />
    </div>
  );
}
