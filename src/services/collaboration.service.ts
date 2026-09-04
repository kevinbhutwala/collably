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
      assetUrl?: string;
      notes?: string;
      mediaUrls?: string[];
      captionText?: string;
      creatorNotes?: string;
    }
  ): Promise<CollaborationDeliverableItem | null> {
    const assetUrl = data.assetUrl || data.mediaUrls?.[0] || "";
    const notes = data.notes !== undefined ? data.notes : data.creatorNotes;

    const res = await fetch(`/api/milestones/${deliverableId}/deliverables`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        assetUrl,
        notes,
      }),
    });
    if (!res.ok) {
      const fallbackRes = await fetch(`/api/collaborations/${collaborationId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit",
          deliverableId,
          assetUrl,
          notes,
          ...data,
        }),
      });
      if (!fallbackRes.ok) throw new Error("Failed to submit deliverable");
      const fallbackJson = await fallbackRes.json();
      return fallbackJson.deliverable;
    }
    const json = await res.json();
    return json.milestone;
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
