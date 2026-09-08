import { CRMContact, CreatorShortlist, CreatorProfile, CRMStage } from "@/core/types";

class CRMService {
  async getContacts(brandId: string): Promise<CRMContact[]> {
    try {
      const res = await fetch(`/api/crm/contacts?brandId=${brandId}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch CRM contacts");
      return await res.json();
    } catch {
      return [];
    }
  }

  async updateStage(contactId: string, stage: CRMStage): Promise<void> {
    await fetch("/api/crm/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "updateStage", contactId, stage }),
    });
  }

  async addNote(contactId: string, authorName: string, content: string): Promise<void> {
    await fetch("/api/crm/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "addNote", contactId, authorName, content }),
    });
  }

  async addTag(contactId: string, tag: string): Promise<void> {
    await fetch("/api/crm/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "addTag", contactId, tag }),
    });
  }

  async addContact(creatorId: string, stage: CRMStage = "Prospect", content?: string, brandId?: string): Promise<CRMContact | null> {
    try {
      const res = await fetch("/api/crm/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "addContact", creatorId, stage, content, brandId }),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.contact;
    } catch {
      return null;
    }
  }

  async removeContact(contactId: string): Promise<boolean> {
    try {
      const res = await fetch("/api/crm/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "removeContact", contactId }),
      });
      return res.ok;
    } catch {
      return false;
    }
  }

  async getShortlists(brandId: string): Promise<CreatorShortlist[]> {
    try {
      const res = await fetch(`/api/crm/shortlists?brandId=${brandId}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed to fetch shortlists");
      return await res.json();
    } catch {
      return [];
    }
  }

  async createShortlist(brandId: string, name: string, description: string): Promise<CreatorShortlist> {
    const res = await fetch("/api/crm/shortlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ brandId, name, description }),
    });
    if (!res.ok) throw new Error("Failed to create shortlist");
    return await res.json();
  }

  async addCreatorToShortlist(shortlistId: string, creator: CreatorProfile): Promise<void> {
    await fetch("/api/crm/shortlists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "addCreator", shortlistId, creator }),
    });
  }
}

export const crmService = new CRMService();
