"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuthStore } from "@/stores/auth.store";
import { CreativeLoader } from "@/components/ui/CreativeLoader";

export interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: string | string[];
}

export function AuthGuard({ children, requiredRole }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, role, checkSession } = useAuthStore();

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
    } else if (!isLoading && isAuthenticated && requiredRole) {
      const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
      if (!allowedRoles.includes(role)) {
        router.push("/app/dashboard");
      }
    }
  }, [isLoading, isAuthenticated, role, requiredRole, router, pathname]);

  if (isLoading) {
    return <CreativeLoader size="fullscreen" label="Verifying Secure Session" />;
  }


  if (!isAuthenticated) {
    return null;
  }

  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!allowedRoles.includes(role)) {
      return null;
    }
  }

  return <>{children}</>;
}
