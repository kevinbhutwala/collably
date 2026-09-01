import React from "react";
import { CinematicNavbar } from "@/components/layout/CinematicNavbar";
import { CinematicFooter } from "@/components/layout/CinematicFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-[#07070B] text-white">
      <CinematicNavbar />
      <main className="flex-1">{children}</main>
      <CinematicFooter />
    </div>
  );
}
