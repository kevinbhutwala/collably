"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export function RoleThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role } = useAuthStore();

  const isBrand =
    role === "brand" ||
    pathname.startsWith("/app/brand") ||
    pathname.startsWith("/brand") ||
    pathname.startsWith("/for-brands");

  const activeRole = isBrand ? "brand" : "creator";

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
