"use client";

import React from "react";
import { CreativeLoader } from "@/components/ui/CreativeLoader";

export default function AppLoading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <CreativeLoader size="lg" label="Workspace Telemetry Active" />
    </div>
  );
}
