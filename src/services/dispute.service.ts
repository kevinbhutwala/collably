import { DisputeRecord, SupportTicket } from "@/core/types";

class DisputeService {
  async getDisputes(): Promise<DisputeRecord[]> {
    try {
      const res = await fetch("/api/disputes", { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch disputes");
      return await res.json();
    } catch {
      return [];
    }
  }

  async fileDispute(data: Omit<DisputeRecord, "id" | "status" | "createdAt">): Promise<DisputeRecord> {
    const res = await fetch("/api/disputes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to file dispute");
    return await res.json();
  }

  async resolveDispute(id: string, adminNotes: string): Promise<void> {
    await fetch("/api/disputes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "resolve", id, adminNotes }),
    });
  }

  async getTickets(userId?: string): Promise<SupportTicket[]> {
    try {
      const url = userId ? `/api/support/tickets?userId=${userId}` : "/api/support/tickets";
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch tickets");
      return await res.json();
    } catch {
      return [];
    }
  }

  async createTicket(ticket: Omit<SupportTicket, "id" | "messages" | "status" | "createdAt" | "updatedAt"> & { initialMessage: string }): Promise<SupportTicket> {
    const res = await fetch("/api/support/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });
    if (!res.ok) throw new Error("Failed to create support ticket");
    return await res.json();
  }
}

export const disputeService = new DisputeService();
