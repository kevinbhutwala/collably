import { db } from "../db/database";
import { CRMContact, CreatorShortlist, CRMStage, CreatorProfile } from "@/core/types";

export class CRMRepository {
  getContacts(brandId?: string): CRMContact[] {
    const list = [...(db.getState().crmContacts || [])];
    if (!brandId || brandId === "all") return list;
    return list.filter((c) => c.brandId === brandId);
  }

  findContactsByBrand(brandId?: string): CRMContact[] {
    return this.getContacts(brandId);
  }

  updateStage(contactId: string, stage: CRMStage): CRMContact | null {
    let updated: CRMContact | null = null;
    db.updateState((state) => {
      state.crmContacts = state.crmContacts || [];
      const c = state.crmContacts.find((item) => item.id === contactId);
      if (c) {
        c.stage = stage;
        updated = c;
      }
    });
    return updated;
  }

  addNote(contactId: string, authorName: string, content: string): CRMContact | null {
    let updated: CRMContact | null = null;
    db.updateState((state) => {
      state.crmContacts = state.crmContacts || [];
      const c = state.crmContacts.find((item) => item.id === contactId);
      if (c) {
        c.privateNotes = c.privateNotes || [];
        c.privateNotes.unshift({
          id: `note-${Date.now()}`,
          authorName,
          content,
          createdAt: new Date().toISOString().split("T")[0],
        });
        updated = c;
      }
    });
    return updated;
  }

  addTag(contactId: string, tag: string): boolean {
    let success = false;
    db.updateState((state) => {
      state.crmContacts = state.crmContacts || [];
      const c = state.crmContacts.find((item) => item.id === contactId);
      if (c && !c.tags.includes(tag)) {
        c.tags.push(tag);
        success = true;
      }
    });
    return success;
  }

  getShortlists(brandId?: string): CreatorShortlist[] {
    const list = [...(db.getState().shortlists || [])];
    if (!brandId || brandId === "all") return list;
    return list.filter((s) => s.brandId === brandId);
  }

  findShortlistsByBrand(brandId?: string): CreatorShortlist[] {
    return this.getShortlists(brandId);
  }

  createShortlist(brandId: string, name: string, description: string, creatorIds: string[] = []): CreatorShortlist {
    const creators = (db.getState().creators || []).filter((c) => creatorIds.includes(c.id));
    const newSl: CreatorShortlist = {
      id: `sl-${Date.now()}`,
      brandId,
      name,
      description,
      creatorIds,
      creators,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };

    db.updateState((state) => {
      state.shortlists = state.shortlists || [];
      state.shortlists.unshift(newSl);
    });

    return newSl;
  }

  addCreatorToShortlist(shortlistId: string, creator: CreatorProfile): boolean {
    let success = false;
    db.updateState((state) => {
      state.shortlists = state.shortlists || [];
      const sl = state.shortlists.find((s) => s.id === shortlistId);
      if (sl && !sl.creatorIds.includes(creator.id)) {
        sl.creatorIds.push(creator.id);
        sl.creators.push(creator);
        sl.updatedAt = new Date().toISOString().split("T")[0];
        success = true;
      }
    });
    return success;
  }
}

export const crmRepo = new CRMRepository();
