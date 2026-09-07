"use client";

import React from "react";
import { useAuthStore } from "@/stores/auth.store";
import { UserRole } from "@/core/types";
import { Sparkles, Building2, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/ui.store";

export function RoleSwitcher({ className }: { className?: string }) {
  // Direct role switching is disabled by security policy. Users must log into their respective accounts.
  return null;
}
