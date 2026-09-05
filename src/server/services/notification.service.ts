import { notificationRepo } from "../repositories/notification.repo";
import { NotificationItem } from "@/core/types";

export interface SendEmailParams {
  to: string;
  subject: string;
  template: "welcome" | "campaign_invitation" | "application_accepted" | "deliverable_submitted" | "payout_released";
  variables: Record<string, any>;
}

export class NotificationService {
  private resendApiKey = process.env.RESEND_API_KEY || "";

  async getNotifications(userId: string): Promise<NotificationItem[]> {
    return notificationRepo.getNotifications(userId);
  }

  async markAsRead(id: string, userId: string): Promise<boolean> {
    return notificationRepo.markAsRead(id, userId);
  }

  async markAllAsRead(userId: string): Promise<void> {
    return notificationRepo.markAllAsRead(userId);
  }

  async sendTransactionalEmail(params: SendEmailParams): Promise<boolean> {
    if (this.resendApiKey) {
      try {
        const htmlBody = this.renderEmailTemplate(params.template, params.variables);
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${this.resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "AbeyCollab Platform <notifications@abeycollab.com>",
            to: [params.to],
            subject: params.subject,
            html: htmlBody,
          }),
        });
        return res.ok;
      } catch (err) {
        console.error("Resend transactional email dispatch failed:", err);
      }
    } else {
      // Email provider not configured — skip silently in production
      return true;
    }
    return true;
  }

  private renderEmailTemplate(template: string, vars: Record<string, any>): string {
    const brandColor = "#FFD21F";
    const darkBg = "#0A0A0E";

    let title = "AbeyCollab Platform Update";
    let bodyContent = `<p style="font-size: 15px; color: #475569;">${vars.message || "You have a new update regarding your campaign collaboration."}</p>`;

    switch (template) {
      case "welcome":
        title = "Welcome to AbeyCollab!";
        bodyContent = `
          <p style="font-size: 16px; color: #1E293B;">Welcome aboard, <strong>${vars.name || "Collaborator"}</strong>!</p>
          <p style="font-size: 15px; color: #475569; line-height: 1.6;">
            Your AbeyCollab workspace is active. Connect your social channels, browse high-converting brand briefs, and access 100% escrow-backed deals.
          </p>
          <div style="background-color: #F8F8FC; border-radius: 8px; padding: 16px; margin: 16px 0; border: 1px solid #E2E8F0;">
            <p style="margin: 0; font-size: 14px; font-weight: 600; color: #0A0A0E;">Next Recommended Steps:</p>
            <ul style="margin: 8px 0 0 0; padding-left: 20px; font-size: 13px; color: #475569;">
              <li>Complete your profile &amp; link social handles</li>
              <li>Browse open campaign briefs or create a new brief</li>
              <li>Collaborate with automatic escrow milestones</li>
            </ul>
          </div>
        `;
        break;

      case "campaign_invitation":
        title = "You've Been Invited to a Campaign!";
        bodyContent = `
          <p style="font-size: 16px; color: #1E293B;">Hi <strong>${vars.name || "there"}</strong>,</p>
          <p style="font-size: 15px; color: #475569; line-height: 1.6;">
            <strong>${vars.brandName || "A premier brand"}</strong> has invited you to collaborate on the campaign <strong>"${vars.campaignTitle || "Brand Sponsorship"}"</strong>.
          </p>
          ${vars.budget ? `<p style="font-size: 14px; color: #087F5B; font-weight: bold;">Offered Budget: ${vars.budget}</p>` : ""}
        `;
        break;

      case "application_accepted":
        title = "Your Application Was Accepted!";
        bodyContent = `
          <p style="font-size: 16px; color: #1E293B;">Great news, <strong>${vars.name || "Creator"}</strong>!</p>
          <p style="font-size: 15px; color: #475569; line-height: 1.6;">
            Your proposal for <strong>"${vars.campaignTitle || "the campaign"}"</strong> was approved by <strong>${vars.brandName || "the brand"}</strong>.
          </p>
          <div style="background-color: #ECFDF5; border: 1px solid #A7F3D0; border-radius: 8px; padding: 14px; margin: 16px 0;">
            <p style="margin: 0; font-size: 14px; color: #065F46; font-weight: 600;">
              ✓ Escrow Allocated: ${vars.amount || "Agreed milestone fee"}
            </p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #047857;">Funds are safely held in escrow and will be released upon deliverable approval.</p>
          </div>
        `;
        break;

      case "deliverable_submitted":
        title = "New Deliverable Submitted for Review";
        bodyContent = `
          <p style="font-size: 16px; color: #1E293B;">Hello <strong>${vars.brandName || "Brand Team"}</strong>,</p>
          <p style="font-size: 15px; color: #475569; line-height: 1.6;">
            <strong>${vars.creatorName || "A creator"}</strong> has submitted a deliverable draft for <strong>"${vars.campaignTitle || "your campaign"}"</strong>.
          </p>
          <p style="font-size: 14px; color: #475569;">
            Deliverable: <strong>${vars.deliverableTitle || "Content draft"}</strong>
          </p>
        `;
        break;

      case "payout_released":
        title = "Payout Released to Your Account";
        bodyContent = `
          <p style="font-size: 16px; color: #1E293B;">Hello <strong>${vars.name || "Creator"}</strong>,</p>
          <p style="font-size: 15px; color: #475569; line-height: 1.6;">
            Your payout for <strong>"${vars.campaignTitle || "Milestone deliverable"}"</strong> has been processed and released.
          </p>
          <div style="background-color: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 14px; margin: 16px 0;">
            <p style="margin: 0; font-size: 15px; font-weight: bold; color: #92400E;">Net Payout Amount: ${vars.amount || "Processed"}</p>
            <p style="margin: 4px 0 0 0; font-size: 12px; color: #B45309;">Sent directly to your connected bank / payout destination.</p>
          </div>
        `;
        break;
    }

    return `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: auto; padding: 32px; border: 1px solid #E2E8F0; border-radius: 16px; background-color: #ffffff;">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 24px; padding-bottom: 16px; border-bottom: 1px solid #F1F5F9;">
          <span style="background-color: ${brandColor}; width: 14px; height: 14px; border-radius: 50%; display: inline-block;"></span>
          <span style="font-size: 18px; font-weight: 800; color: ${darkBg}; letter-spacing: -0.5px;">ABEYCOLLAB</span>
        </div>
        <h2 style="color: ${darkBg}; font-size: 20px; font-weight: 800; margin-top: 0; margin-bottom: 16px;">${title}</h2>
        ${bodyContent}
        ${vars.actionUrl ? `
          <div style="margin-top: 24px;">
            <a href="${vars.actionUrl}" style="display: inline-block; background-color: ${darkBg}; color: ${brandColor}; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-size: 14px; font-weight: 700;">
              ${vars.actionLabel || "View on AbeyCollab"} →
            </a>
          </div>
        ` : ""}
        <hr style="margin-top: 36px; margin-bottom: 16px; border: 0; border-top: 1px solid #F1F5F9;" />
        <p style="font-size: 11px; color: #94A3B8; margin: 0;">
          © ${new Date().getFullYear()} AbeyCollab Technologies Inc. All rights reserved. Protected by 100% Escrow Rails.
        </p>
      </div>
    `;
  }
}

export const notificationService = new NotificationService();
