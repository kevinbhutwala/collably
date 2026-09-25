"use client";

import { useEffect } from "react";

export function ThemeToggle({ className }: { className?: string }) {
  useEffect(() => {
    // Dark theme temporarily removed - enforce light theme
    try {
      localStorage.setItem("abeycollab_theme", "light");
      localStorage.setItem("collably_theme", "light");
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    } catch (e) {}
  }, []);

  return null;
}

