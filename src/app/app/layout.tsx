import React from "react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { MobileBottomDock } from "@/components/layout/MobileBottomDock";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function AuthenticatedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-[#04060E] bg-gradient-to-b from-[#060A1A] via-[#080E24] to-[#04060E] text-white selection:bg-[#2563EB] selection:text-white">
        <AppNavbar />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-4 sm:p-8 lg:p-10 pb-28 lg:pb-10 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
        <MobileBottomDock />
      </div>
    </AuthGuard>
  );
}
