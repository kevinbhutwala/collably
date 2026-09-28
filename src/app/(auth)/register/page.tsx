import React, { Suspense } from "react";
import { UnifiedAuthForm } from "@/components/auth/UnifiedAuthForm";
import { CreativeLoader } from "@/components/ui/CreativeLoader";

export const metadata = {
  title: "Join AbeyCollab — Create Account",
  description: "Join India's verified creator & brand collaboration network.",
};

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-[#12121A] border border-black/8 dark:border-white/10 text-center text-[#0A0A0E] dark:text-[#F4F4F8] shadow-sm">
          <CreativeLoader size="sm" label="Loading Account Creation..." />
        </div>
      }
    >
      <UnifiedAuthForm initialTab="register" />
    </Suspense>
  );
}
