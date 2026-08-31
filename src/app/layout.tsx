import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { CommandPalette } from "@/components/navigation/CommandPalette";
import { CustomCursor } from "@/components/ui/CustomCursor";

export const metadata: Metadata = {
  title: "Collably | The Premier Creator × Brand Collaboration Workspace",
  description:
    "Where world-class creators and high-growth brands collaborate. Milestone payment protection, 4K timecoded video review, and instant automated creator payouts.",
  keywords: [
    "collably",
    "creator marketplace",
    "influencer marketing platform",
    "brand partnerships",
    "creator crm",
    "creator escrow",
    "milestone payments",
    "video review player",
  ],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light" style={{ colorScheme: "light" }}>
      <body className="min-h-screen bg-white text-slate-900 antialiased font-sans selection:bg-brand-accent/20 selection:text-brand-accent">
        <CustomCursor />
        {children}
        <CommandPalette />
        <ToastContainer />
      </body>
    </html>
  );
}
