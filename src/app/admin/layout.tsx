import React from "react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard requiredRole={["agency_admin", "super_admin", "agency_owner"]}>
      <div className="h-screen flex flex-col bg-[#F8F8FB] text-[#0A0A0E] selection:bg-[#FFD21F] selection:text-[#0A0A0E] relative overflow-hidden">
        {/* Soft Warm Ambient Glow */}
        <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[900px] h-96 bg-[#FFD21F]/10 blur-[140px] rounded-full pointer-events-none z-0" />

        <AppNavbar />
        
        {/* Main Body: Fixed Static Sidebar on Left, Independent Scrollable Main Screen on Right */}
        <div className="flex flex-1 overflow-hidden relative z-10">
          <AppSidebar />
          <main className="flex-1 h-full overflow-y-auto overflow-x-hidden p-4 sm:p-7 lg:p-9 pb-10 w-full">
            <div className="max-w-7xl mx-auto w-full">
              {children}
            </div>
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
