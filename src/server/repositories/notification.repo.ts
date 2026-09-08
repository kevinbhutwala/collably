import { db } from "../db/database";
import { NotificationItem } from "@/core/types";

export class NotificationRepository {
  async getNotifications(userId: string): Promise<NotificationItem[]> {
    const state = db.getState();
    if (!state.notifications || state.notifications.length === 0) {
      const defaultNotifs: NotificationItem[] = [
        {
          id: "notif-1",
          userId: "user-creator",
          type: "payment",
          title: "Tranche Payout Released",
          message: "Linear Dynamics released $2,250 for milestone 'Dedicated AI Triage 60s Segment'.",
          linkUrl: "/app/collaborations",
          read: false,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: "notif-2",
          userId: "user-creator",
          type: "campaign",
          title: "Direct Brief Opportunity",
          message: "Aethel Watches reviewed your portfolio and tagged your profile for luxury tier.",
          linkUrl: "/app/campaigns",
          read: false,
          createdAt: new Date(Date.now() - 7200000).toISOString(),
        },
        {
          id: "notif-3",
          userId: "user-brand",
          type: "deliverable",
          title: "New Deliverable Submitted",
          message: "Demo Creator submitted a production cut for 'Dedicated AI Triage 60s Segment'.",
          linkUrl: "/app/collaborations",
          read: false,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: "notif-4",
          userId: "user-brand",
          type: "system",
          title: "Escrow Protection Verified",
          message: "Vault funds successfully authenticated under AbeyCollab SLA protection.",
          linkUrl: "/app/collaborations",
          read: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ];
      db.updateState((s) => {
        s.notifications = defaultNotifs;
      });
      state.notifications = defaultNotifs;
    }
    const userIds = [userId];
    if (userId === "user-creator") userIds.push("user-c1", "creator-1", "creator-demo");
    if (userId === "user-brand") userIds.push("user-b1", "brand-1", "brand-demo");
    return (state.notifications || []).filter((n) => userIds.includes(n.userId));
  }

  async createNotification(notification: Omit<NotificationItem, "id" | "createdAt" | "read">): Promise<NotificationItem> {
    const id = `notif-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newNotif: NotificationItem = {
      ...notification,
      id,
      read: false,
      createdAt: new Date().toISOString(),
    };
    db.updateState((s) => {
      s.notifications = s.notifications || [];
      s.notifications.unshift(newNotif);
    });
    return newNotif;
  }

  async markAsRead(id: string, userId: string): Promise<boolean> {
    let marked = false;
    db.updateState((s) => {
      s.notifications = s.notifications || [];
      const notif = s.notifications.find((n) => n.id === id && n.userId === userId);
      if (notif) {
        notif.read = true;
        marked = true;
      }
    });
    return marked;
  }

  async markAllAsRead(userId: string): Promise<void> {
    db.updateState((s) => {
      s.notifications = s.notifications || [];
      s.notifications.forEach((n) => {
        if (n.userId === userId) {
          n.read = true;
        }
      });
    });
  }
}

export const notificationRepo = new NotificationRepository();
