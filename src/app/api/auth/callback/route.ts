import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { authService } from "@/server/services/auth.service";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const role = (searchParams.get("role") as "creator" | "brand") || "creator";
  const redirectTarget = searchParams.get("redirect") || (role === "brand" ? "/app/brand/campaigns" : "/app/dashboard");
  const errorParam = searchParams.get("error_description") || searchParams.get("error");

  if (errorParam) {
    console.error("OAuth Error received in callback:", errorParam);
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(errorParam)}`, req.url)
    );
  }

  // 1. If an authorization code was returned by Google/Apple/Supabase
  if (code) {
    try {
      const supabaseUrl =
        process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
      const supabaseAnonKey =
        process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: { persistSession: false },
      });

      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error || !data?.session?.user) {
        console.error("Code exchange error:", error);
        return NextResponse.redirect(
          new URL("/login?error=Failed+to+exchange+OAuth+code", req.url)
        );
      }

      const sbUser = data.session.user;
      const provider = (sbUser.app_metadata?.provider || "google") as "google" | "apple" | "github";
      const email = sbUser.email;

      if (!email) {
        return NextResponse.redirect(
          new URL("/login?error=No+email+provided+by+social+provider", req.url)
        );
      }

      const fullName =
        sbUser.user_metadata?.full_name ||
        sbUser.user_metadata?.name ||
        sbUser.user_metadata?.user_name ||
        email.split("@")[0];

      const avatarUrl =
        sbUser.user_metadata?.avatar_url ||
        sbUser.user_metadata?.picture ||
        undefined;

      // Authenticate or create user in our repository with their actual identity
      const result = await authService.socialAuth({
        provider: ["google", "apple", "github"].includes(provider) ? provider : "google",
        email,
        name: fullName,
        avatarUrl,
        role: role === "brand" ? "brand" : "creator",
      });

      const destination =
        result.user.role === "brand" ? "/app/brand/campaigns" : "/app/dashboard";
      const response = NextResponse.redirect(new URL(destination, req.url));

      // Set session cookie
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      };
      response.cookies.set("abeycollab_session", result.token, cookieOptions);
      response.cookies.set("collably_session", result.token, cookieOptions);

      return response;
    } catch (err: any) {
      console.error("Server OAuth callback processing error:", err);
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(err.message || "OAuth processing failed")}`, req.url)
      );
    }
  }

  // 2. Direct provider query parameters fallback
  const provider = searchParams.get("provider") as "google" | "apple" | "github" | null;
  const email = searchParams.get("email");
  const name = searchParams.get("name") || "";

  if (provider && email) {
    try {
      const result = await authService.socialAuth({
        provider,
        email,
        name: name || `${provider} User`,
        role: role || "creator",
      });

      const destinationUrl = new URL(
        result.user.role === "brand" ? "/app/brand/campaigns" : redirectTarget,
        req.url
      );

      const response = NextResponse.redirect(destinationUrl);
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        maxAge: 7 * 24 * 60 * 60,
        path: "/",
      };
      response.cookies.set("abeycollab_session", result.token, cookieOptions);
      response.cookies.set("collably_session", result.token, cookieOptions);

      return response;
    } catch (err) {
      console.error("Direct callback error:", err);
      return NextResponse.redirect(new URL("/login?error=OAuthCallbackFailed", req.url));
    }
  }

  // Default redirect to login if no parameters
  return NextResponse.redirect(new URL("/login", req.url));
}
