import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "@/components/ui/ToastContainer";
import { CommandPalette } from "@/components/navigation/CommandPalette";

export const metadata: Metadata = {
  title: "Collably | The Creator × Brand Collaboration Platform",
  description:
    "Where great brands collaborate with world-class creators. Milestone escrow, automated deliverable pipelines, and fast creator payouts.",
  keywords: [
    "collably",
    "creator marketplace",
    "influencer marketing platform",
    "brand partnerships",
    "creator crm",
    "creator escrow",
    "content collaboration",
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
        {children}
        <CommandPalette />
        <ToastContainer />
      </body>
    </html>
  );
}
