import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { CommandPalette } from "@/components/navigation/CommandPalette";

export const metadata: Metadata = {
  title: "Collably | Creator Commerce & Milestone Collaboration Workspace",
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
    <html lang="en" style={{ colorScheme: "dark" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Instrument+Serif:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="min-h-screen bg-[#04060E] text-white antialiased font-sans selection:bg-[#2563EB] selection:text-white">
        {children}
        <CommandPalette />
        <ToastContainer />
      </body>
    </html>
  );
}
