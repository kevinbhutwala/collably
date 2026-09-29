import React, { Suspense } from "react";
import { UnifiedAuthForm } from "@/components/auth/UnifiedAuthForm";
import { AuthSkeleton } from "@/components/skeletons";

export const metadata = {
  title: "Sign In — AbeyCollab",
  description: "Sign in to manage your creator collaborations, campaigns, and payments.",
};

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthSkeleton />}>
      <UnifiedAuthForm initialTab="signin" />
    </Suspense>
  );
}
