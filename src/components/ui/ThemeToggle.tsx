"use client";

import { useEffect } from "react";

export interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

/**
 * Dark mode has been explicitly disabled across the platform per product requirements.
 * This component renders nothing and ensures document stays locked in Pure White mode.
 */
export function ThemeToggle(_props: ThemeToggleProps) {
  useEffect(() => {
    try {
      localStorage.removeItem("abeycollab_theme");
      localStorage.removeItem("collably_theme");
      localStorage.setItem("abeycollab_theme", "light");
      localStorage.setItem("collably_theme", "light");
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    } catch (e) {}
  }, []);

  return null;
}
