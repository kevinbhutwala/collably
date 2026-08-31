import React from "react";
import { AppNavbar } from "@/components/layout/AppNavbar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function AuthenticatedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-900">
        <AppNavbar />
        <div className="flex flex-1">
          <AppSidebar />
          <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
