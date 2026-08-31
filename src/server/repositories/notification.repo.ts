import { db } from "../db/database";
import { NotificationItem } from "@/core/types";

export class NotificationRepository {
  async getNotifications(userId: string): Promise<NotificationItem[]> {
    const state = db.getState();
    return (state.notifications || []).filter((n) => n.userId === userId);
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
