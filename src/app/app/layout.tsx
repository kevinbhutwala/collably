import React from "react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { MobileBottomDock } from "@/components/layout/MobileBottomDock";
import { AuthGuard } from "@/components/auth/AuthGuard";
import { PlanUpgradeModal } from "@/components/subscriptions/PlanUpgradeModal";

export default function AuthenticatedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-[#F8F8FB] text-[#0A0A0E] selection:bg-[#FFD21F] selection:text-[#0A0A0E] relative overflow-x-hidden">
        {/* Soft Warm Ambient Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-96 bg-[#FFD21F]/10 blur-[140px] rounded-full pointer-events-none z-0" />

        <AppNavbar />
        <div className="flex flex-1 relative z-10">
          <AppSidebar />
          {/* Extra bottom padding on mobile so content clears the dock */}
          <main className="flex-1 p-4 sm:p-7 lg:p-9 pb-24 lg:pb-10 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
        <MobileBottomDock />
        <PlanUpgradeModal />
      </div>
    </AuthGuard>
  );
}
