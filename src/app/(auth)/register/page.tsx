import React, { Suspense } from "react";
import { UnifiedAuthForm } from "@/components/auth/UnifiedAuthForm";
import { AuthSkeleton } from "@/components/skeletons";

export const metadata = {
  title: "Join AbeyCollab — Create Account",
  description: "Join India's verified creator & brand collaboration network.",
};

export default function RegisterPage() {
  return (
    <Suspense fallback={<AuthSkeleton />}>
      <UnifiedAuthForm initialTab="register" />
    </Suspense>
  );
}
