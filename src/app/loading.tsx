"use client";

import React from "react";
import { CreativeLoader } from "@/components/ui/CreativeLoader";

export default function RootLoading() {
  return (
    <CreativeLoader
      size="fullscreen"
      label="ABEYCOLLAB // NEXUS 2.0"
      subtext="Connecting workspace pipelines..."
    />
  );
}
