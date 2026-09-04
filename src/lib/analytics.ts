import { track } from "@vercel/analytics";

/**
 * Platform-wide Custom Analytics Event Tracker
 * Sends telemetry directly to Vercel Web Analytics dashboard.
 */
export function trackEvent(name: string, properties?: Record<string, string | number | boolean | null | undefined>) {
  try {
    if (typeof window !== "undefined") {
      track(name, properties);
    }
  } catch (err) {
    // Non-blocking: Silently handle if user has strict adblocker
  }
}

/**
 * Standard Telemetry Event Definitions
 */
export const AnalyticsEvents = {
  USER_LOGGED_IN: "User Logged In",
  USER_REGISTERED: "User Registered",
  CAMPAIGN_CREATED: "Campaign Created",
  PROPOSAL_SUBMITTED: "Proposal Submitted",
  MILESTONE_APPROVED: "Milestone Approved",
  ESCROW_FUNDED: "Escrow Funded",
  PAYOUT_RELEASED: "Payout Released",
  THEME_TOGGLED: "Theme Toggled",
  MEDIA_UPLOAD_INITIATED: "Media Upload Initiated",
} as const;
