import { Collaboration, CollaborationDeliverableItem } from "@/core/types";

class CollaborationService {
  async getCollaborations(role?: string, entityId?: string): Promise<Collaboration[]> {
    try {
      const params = new URLSearchParams();
      if (role) params.set("role", role);
      if (entityId) params.set("entityId", entityId);

      const url = `/api/collaborations${params.toString() ? `?${params.toString()}` : ""}`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch collaborations");
      return await res.json();
    } catch {
      return [];
    }
  }

  async getCollaborationById(id: string): Promise<Collaboration | undefined> {
    try {
      const res = await fetch(`/api/collaborations/${id}`, { cache: "no-store" });
      if (!res.ok) return undefined;
      return await res.json();
    } catch {
      return undefined;
    }
  }

  async submitDeliverableDraft(
    collaborationId: string,
    deliverableId: string,
    data: {
      mediaUrls: string[];
      captionText: string;
      creatorNotes?: string;
    }
  ): Promise<CollaborationDeliverableItem | null> {
    const res = await fetch(`/api/collaborations/${collaborationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "submit",
        deliverableId,
        ...data,
      }),
    });
    if (!res.ok) throw new Error("Failed to submit deliverable");
    const json = await res.json();
    return json.deliverable;
  }

  async approveDeliverable(collaborationId: string, deliverableId: string): Promise<boolean> {
    const res = await fetch(`/api/collaborations/${collaborationId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "approve",
        deliverableId,
      }),
    });
    return res.ok;
  }
}

export const collaborationService = new CollaborationService();
