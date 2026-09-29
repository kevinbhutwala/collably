"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export function RoleThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role, isAuthenticated } = useAuthStore();

  // ONLY creators side AFTER login in violet color
  // That means: authenticated creator visiting /app routes (excluding brand workspaces)
  const isCreatorAfterLogin =
    Boolean(isAuthenticated) &&
    role === "creator" &&
    pathname.startsWith("/app") &&
    !pathname.startsWith("/app/brand");

  const activeRole = isCreatorAfterLogin ? "creator" : "brand";

  useEffect(() => {
    document.documentElement.setAttribute("data-role", activeRole);
    return () => {
      document.documentElement.removeAttribute("data-role");
    };
  }, [activeRole]);

  return (
    <div data-role={activeRole} className="contents">
      {children}
    </div>
  );
}
