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
      <div className="h-screen flex flex-col bg-[#F8F8FB] dark:bg-[#07070B] text-[#0B0A14] dark:text-[#F4F4F8] selection:bg-primary selection:text-[#0B0A14] relative overflow-hidden">
        {/* Soft Warm Ambient Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-96 bg-primary/10 dark:bg-primary/5 blur-[140px] rounded-full pointer-events-none z-0" />

        <AppNavbar />
        
          {/* Main Body: Fixed Static Sidebar on Left, Independent Scrollable Main Screen on Right */}
          <div className="flex flex-1 overflow-hidden relative z-10">
            <AppSidebar />
            <main className="flex-1 h-full overflow-y-auto overflow-x-hidden px-3 sm:px-6 lg:px-8 py-3.5 sm:py-6 lg:py-8 pb-32 sm:pb-36 lg:pb-10 w-full scroll-smooth">
              <div className="max-w-7xl mx-auto w-full">
                {children}
              </div>
            </main>
          </div>

        <MobileBottomDock />
        <PlanUpgradeModal />
      </div>
    </AuthGuard>
  );
}
