import { NotificationItem } from "../core/types";

class NotificationService {
  async getNotifications(userId?: string): Promise<NotificationItem[]> {
    try {
      const url = userId ? `/api/notifications?userId=${encodeURIComponent(userId)}` : `/api/notifications`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        return data.notifications || [];
      }
    } catch (err) {
      console.warn("Failed to fetch notifications from API:", err);
    }
    return [];
  }

  async markAsRead(id: string, userId?: string): Promise<void> {
    try {
      await fetch("/api/notifications/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, userId }),
      });
    } catch (err) {
      console.warn("Failed to mark notification read:", err);
    }
  }

  async markAllAsRead(userId?: string): Promise<void> {
    try {
      await fetch("/api/notifications/read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ all: true, userId }),
      });
    } catch (err) {
      console.warn("Failed to mark all notifications read:", err);
    }
  }
}

export const notificationService = new NotificationService();
