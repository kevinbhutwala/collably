"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  size?: number;
}

export function LinearLogo({ className, size = 24 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <path d="M1.229 60.3a50.007 50.007 0 0 1 38.47-59.07l-.768 7.962a42.01 42.01 0 0 0-32.32 49.626l-5.382 1.482Zm9.467 15.65A49.99 49.99 0 0 1 2.298 63.85l5.38-1.482a42.02 42.02 0 0 0 7.042 10.158l-4.024 3.424Zm12.395 12.01A50.04 50.04 0 0 1 12.87 79.16l4.024-3.424a42.05 42.05 0 0 0 8.75 6.942l-2.553 4.282Zm14.28 6.97a49.98 49.98 0 0 1-11.727-2.69l2.553-4.28a42.01 42.01 0 0 0 9.852 2.261l-.678 4.709ZM98.771 39.7a50.007 50.007 0 0 1-38.47 59.07l.768-7.962a42.01 42.01 0 0 0 32.32-49.626l5.382-1.482Zm-9.467-15.65a49.99 49.99 0 0 1 8.398 12.1l-5.38 1.482a42.02 42.02 0 0 0-7.042-10.158l4.024-3.424Zm-12.395-12.01a50.04 50.04 0 0 1 10.22 8.8l-4.024 3.424a42.05 42.05 0 0 0-8.75-6.942l2.553-4.282Zm-14.28-6.97a49.98 49.98 0 0 1 11.727 2.69l-2.553 4.28a42.01 42.01 0 0 0-9.852-2.261l.678-4.709Z" />
    </svg>
  );
}

export function StripeLogo({ className, size = 24 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.5 12.521.5 7.106.5 3.09 3.322 3.09 7.625c0 4.885 4.542 6.643 8.36 8.067 2.445.912 3.528 1.657 3.528 2.678 0 .991-.877 1.586-2.316 1.586-2.554 0-5.46-1.192-7.393-2.277L4.38 23.23c2.08 1.054 5.378 1.77 8.784 1.77 5.765 0 9.836-2.69 9.836-7.324 0-5.183-4.764-6.852-9.024-8.526Z" />
    </svg>
  );
}

export function NotionLogo({ className, size = 24 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.466-.373-.933-.56-1.68-.466L2.966 2.994c-.42.046-.513.326-.326.513l1.819 1.701Zm1.4 3.733v13.533c0 .84.42 1.166 1.306 1.12l14.475-.84c.84-.047 1.12-.56 1.12-1.353V6.994c0-.793-.327-1.12-1.12-1.073l-14.475.84c-.886.047-1.306.467-1.306 1.18Zm13.491.747c.093.373 0 .746-.374.793l-1.073.233v9.845c-1.307.747-2.614 1.167-3.687 1.167-1.587 0-2.054-.513-3.267-2.053l-4.153-6.113v6.766l2.193.513c.373.093.466.467.373.793l-.84 1.587-4.106-.233c-.373-.047-.466-.42-.373-.747l.933-.28V9.188c0-.653.28-.933.933-.98l3.967-.28c.793 0 1.213.233 1.82 1.073l4.34 6.487V9.748l-1.82-.42c-.373-.093-.373-.513-.233-.793l1.166-.373 4.153-.28c.373 0 .606.186.699.56Z" />
    </svg>
  );
}

export function FigmaLogo({ className, size = 24 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <path d="M12 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm-6 6a3 3 0 0 1 3-3h3v3a3 3 0 0 1-6 0Zm0-6a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3Zm0-6a3 3 0 0 1 3-3h3v6H9a3 3 0 0 1-3-3Zm6-3h3a3 3 0 0 1 0 6h-3V3Z" />
    </svg>
  );
}

export function VercelLogo({ className, size = 24 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <path d="M12 1L24 22H0L12 1Z" />
    </svg>
  );
}

export function SupabaseLogo({ className, size = 24 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <path d="M11.968 2.05c-.47-.468-1.253-.23-1.4.425L7.26 17.58c-.144.64.444 1.185 1.055.978l5.225-1.77-2.096 4.982c-.288.685.51 1.34 1.11.91l9.146-6.57c.545-.39.406-1.252-.224-1.444l-6.196-1.89 4.394-9.33c.31-.66-.403-1.346-1.026-.957l-6.684 4.562Z" />
    </svg>
  );
}

export function RaycastLogo({ className, size = 24 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <path d="M4.654 3.033A1.5 1.5 0 0 0 3.033 4.654l-.79 3.945a1.5 1.5 0 0 0 .54 1.405l6.398 5.333a1.5 1.5 0 0 0 1.92 0l6.398-5.333a1.5 1.5 0 0 0 .54-1.405l-.79-3.945a1.5 1.5 0 0 0-1.621-1.621l-3.945.79a1.5 1.5 0 0 0-1.042.846L9.6 9.6 8.56 7.667a1.5 1.5 0 0 0-1.042-.846l-3.945-.79Z" />
      <path d="M2.243 15.42a1.5 1.5 0 0 0 .54 1.404l6.398 5.333a1.5 1.5 0 0 0 1.92 0l6.398-5.333a1.5 1.5 0 0 0 .54-1.404l-.79-3.945a1.5 1.5 0 0 0-1.621-1.621l-3.945.79a1.5 1.5 0 0 0-1.042.846L9.6 17.4l-1.04-1.91a1.5 1.5 0 0 0-1.042-.845l-3.945-.79a1.5 1.5 0 0 0-1.621 1.621l.291 1.944Z" />
    </svg>
  );
}

export function SpotifyLogo({ className, size = 24 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.498 17.307c-.218.358-.684.471-1.042.253-2.859-1.747-6.458-2.142-10.697-1.173-.41.094-.813-.163-.907-.573-.094-.41.163-.813.573-.907 4.638-1.06 8.62-.612 11.82 1.344.358.218.471.684.253 1.056Zm1.47-3.267c-.275.448-.863.59-1.311.315-3.272-2.01-8.261-2.593-12.132-1.417-.503.153-1.037-.137-1.19-.64-.153-.503.137-1.037.64-1.19 4.417-1.34 9.907-.69 13.678 1.631.448.275.59.863.315 1.301Zm.126-3.41c-3.924-2.33-10.39-2.545-14.13-1.41-.602.183-1.242-.162-1.425-.764-.183-.602.162-1.242.764-1.425 4.303-1.306 11.438-1.05 15.932 1.618.542.322.72 1.026.398 1.568-.322.542-1.026.72-1.539.413Z" />
    </svg>
  );
}

export function OpenAILogo({ className, size = 24 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073ZM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494ZM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646ZM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896Zm15.597 3.86-5.84-3.37L14.117 7.22a.076.076 0 0 1 .071 0l4.83 2.79a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.405-.681Zm2.46-4.053a4.494 4.494 0 0 1 .536 3.015l-.142-.085-4.783-2.759a.775.775 0 0 0-.78 0L9.4 11.248V8.916a.08.08 0 0 1 .033-.062l4.84-2.795a4.5 4.5 0 0 1 6.147 1.646ZM10.47 7.373l2.842 1.64v3.284l-2.842-1.64V7.373Zm.68 4.673 2.842 1.64-2.842 1.642-2.842-1.642 2.842-1.64Z" />
    </svg>
  );
}

export function AirbnbLogo({ className, size = 24 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <path d="M12.001 0c-4.417 0-8.001 3.584-8.001 8.001 0 4.195 4.316 9.878 7.355 15.342a.747.747 0 0 0 1.292 0c3.039-5.464 7.355-11.147 7.355-15.342 0-4.417-3.584-8.001-8.001-8.001Zm0 12.001a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z" />
    </svg>
  );
}

export function AethelLogo({ className, size = 24 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function KuroLogo({ className, size = 24 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LuminaryLogo({ className, size = 24 }: BrandLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("shrink-0", className)}
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Universal BrandIcon resolver: matches brand name to its vector logo
 */
export function BrandIcon({
  name,
  size = 20,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const norm = name.toLowerCase();

  if (norm.includes("linear")) return <LinearLogo size={size} className={className} />;
  if (norm.includes("stripe")) return <StripeLogo size={size} className={className} />;
  if (norm.includes("notion")) return <NotionLogo size={size} className={className} />;
  if (norm.includes("figma")) return <FigmaLogo size={size} className={className} />;
  if (norm.includes("vercel")) return <VercelLogo size={size} className={className} />;
  if (norm.includes("supabase")) return <SupabaseLogo size={size} className={className} />;
  if (norm.includes("raycast")) return <RaycastLogo size={size} className={className} />;
  if (norm.includes("openai")) return <OpenAILogo size={size} className={className} />;
  if (norm.includes("spotify")) return <SpotifyLogo size={size} className={className} />;
  if (norm.includes("airbnb")) return <AirbnbLogo size={size} className={className} />;
  if (norm.includes("aethel")) return <AethelLogo size={size} className={className} />;
  if (norm.includes("kuro")) return <KuroLogo size={size} className={className} />;
  if (norm.includes("luminary")) return <LuminaryLogo size={size} className={className} />;

  // Default elegant monogram badge
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      style={{ width: size, height: size }}
      className={cn(
        "rounded-lg bg-slate-900 text-white font-extrabold flex items-center justify-center font-mono text-[10px] shrink-0 border border-slate-800 shadow-xs",
        className
      )}
    >
      {initials}
    </div>
  );
}
