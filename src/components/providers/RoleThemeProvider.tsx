"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

export function RoleThemeProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { role, user, currentCreator, isAuthenticated } = useAuthStore();

  // ONLY creators side AFTER login:
  // authenticated creator visiting /app routes (excluding brand workspaces)
  const isCreatorAfterLogin =
    Boolean(isAuthenticated) &&
    role === "creator" &&
    pathname.startsWith("/app") &&
    !pathname.startsWith("/app/brand");

  // Normalized gender: "female" or "male"
  const rawGender = (user?.gender || currentCreator?.gender || "").toLowerCase().trim();
  const isFemaleCreator =
    isCreatorAfterLogin &&
    (rawGender === "female" || rawGender === "f" || rawGender === "woman" || rawGender === "she/her");

  // Determine active theme role:
  // - "creator-female" for female creators (Soft Pink + Red 🌸: #FFF7FA, #E11D48, #FB7185, #1F1720)
  // - "creator" for male creators (Midnight Purple 🟣: #F8FAFC, #7C3AED, #C084FC, #0B0A14)
  // - "brand" for brands and public default (Emerald 🟢: #F8FAF9, #0F766E, #34D399, #0F172A)
  let activeRole: string;
  if (isCreatorAfterLogin) {
    activeRole = isFemaleCreator ? "creator-female" : "creator";
  } else {
    activeRole = "brand";
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-role", activeRole);
    if (isCreatorAfterLogin) {
      document.documentElement.setAttribute("data-creator-gender", isFemaleCreator ? "female" : "male");
    } else {
      document.documentElement.removeAttribute("data-creator-gender");
    }

    return () => {
      document.documentElement.removeAttribute("data-role");
      document.documentElement.removeAttribute("data-creator-gender");
    };
  }, [activeRole, isCreatorAfterLogin, isFemaleCreator]);

  return (
    <div
      data-role={activeRole}
      data-creator-gender={isCreatorAfterLogin ? (isFemaleCreator ? "female" : "male") : undefined}
      className="contents"
    >
      {children}
    </div>
  );
}
