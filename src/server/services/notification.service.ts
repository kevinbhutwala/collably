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
            from: "Collably Platform <notifications@collably.io>",
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
    return `
      <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
        <h2 style="color: #0f172a;">Collably | Creator × Brand Platform</h2>
        <p style="font-size: 16px; color: #334155;">Hello <strong>${vars.name || "there"}</strong>,</p>
        <p style="font-size: 15px; color: #475569;">${vars.message || "You have a new update regarding your campaign collaboration."}</p>
        ${vars.actionUrl ? `<a href="${vars.actionUrl}" style="display: inline-block; background-color: #FF4D00; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 16px; font-weight: bold;">View on Collably</a>` : ""}
        <hr style="margin-top: 32px; border: 0; border-top: 1px solid #e2e8f0;" />
        <p style="font-size: 12px; color: #94a3b8;">© ${new Date().getFullYear()} Collably Inc. All rights reserved.</p>
      </div>
    `;
  }
}

export const notificationService = new NotificationService();
