"use client";

import React from "react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // Use native hardware-accelerated 120Hz/60Hz browser scrolling
  return <>{children}</>;
}
