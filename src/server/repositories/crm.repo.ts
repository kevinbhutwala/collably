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

  addContact(brandId: string, creatorId: string, stage: CRMStage = "Prospect", initialNote?: string): CRMContact | null {
    const targetBrand = brandId || "brand-demo";
    const allCreators = db.getState().creators || [];
    const creator = allCreators.find((c) => c.id === creatorId);
    if (!creator) return null;

    let newContact: CRMContact | null = null;
    db.updateState((state) => {
      state.crmContacts = state.crmContacts || [];
      const existing = state.crmContacts.find(
        (c) => (c.brandId === targetBrand || (targetBrand === "brand-demo" && c.brandId === "brand-1")) && c.creatorId === creatorId
      );
      if (existing) {
        newContact = existing;
        return;
      }

      newContact = {
        id: `crm-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        creatorId: creator.id,
        creator,
        brandId: targetBrand,
        stage,
        tags: [creator.primaryCategory],
        privateNotes: initialNote
          ? [
              {
                id: `note-${Date.now()}`,
                authorName: "Brand Team",
                content: initialNote,
                createdAt: new Date().toISOString().split("T")[0],
              },
            ]
          : [],
        pastCampaignsCount: 0,
        totalPaid: 0,
        lastContactedAt: new Date().toISOString().split("T")[0],
      };
      state.crmContacts.unshift(newContact);
    });

    return newContact;
  }

  removeContact(contactId: string): boolean {
    let success = false;
    db.updateState((state) => {
      state.crmContacts = state.crmContacts || [];
      const prevLen = state.crmContacts.length;
      state.crmContacts = state.crmContacts.filter((c) => c.id !== contactId);
      success = state.crmContacts.length < prevLen;
    });
    return success;
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
      brandId: brandId || "brand-demo",
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
      let sl = state.shortlists.find((s) => s.id === shortlistId);
      if (!sl && state.shortlists.length > 0) {
        sl = state.shortlists[0];
      }
      if (sl) {
        if (!sl.creatorIds.includes(creator.id)) {
          sl.creatorIds.push(creator.id);
          sl.creators.push(creator);
          sl.updatedAt = new Date().toISOString().split("T")[0];
        }
        success = true;
      }
    });
    return success;
  }

  removeCreatorFromShortlist(shortlistId: string, creatorId: string): boolean {
    let success = false;
    db.updateState((state) => {
      state.shortlists = state.shortlists || [];
      let sl = state.shortlists.find((s) => s.id === shortlistId);
      if (!sl && state.shortlists.length > 0) {
        sl = state.shortlists[0];
      }
      if (sl) {
        sl.creatorIds = sl.creatorIds.filter((id) => id !== creatorId);
        sl.creators = sl.creators.filter((c) => c.id !== creatorId);
        sl.updatedAt = new Date().toISOString().split("T")[0];
        success = true;
      }
    });
    return success;
  }

  toggleCreatorInShortlist(shortlistId: string | undefined, creator: CreatorProfile, brandId?: string): { added: boolean; shortlist: CreatorShortlist | null } {
    let result = { added: false, shortlist: null as CreatorShortlist | null };
    db.updateState((state) => {
      state.shortlists = state.shortlists || [];
      let sl = shortlistId ? state.shortlists.find((s) => s.id === shortlistId) : null;
      if (!sl) {
        const targetBrand = brandId || "brand-demo";
        sl = state.shortlists.find((s) => s.brandId === targetBrand || (targetBrand === "brand-demo" && s.brandId === "brand-1"));
      }
      if (!sl) {
        const targetBrand = brandId || "brand-demo";
        sl = {
          id: `sl-default-${targetBrand}`,
          brandId: targetBrand,
          name: "Saved Talent Roster",
          description: "Curated creator profiles saved for upcoming campaign briefs.",
          creatorIds: [],
          creators: [],
          createdAt: new Date().toISOString().split("T")[0],
          updatedAt: new Date().toISOString().split("T")[0],
        };
        state.shortlists.unshift(sl);
      }

      if (sl.creatorIds.includes(creator.id)) {
        sl.creatorIds = sl.creatorIds.filter((id) => id !== creator.id);
        sl.creators = sl.creators.filter((c) => c.id !== creator.id);
        result = { added: false, shortlist: sl };
      } else {
        const fullCreator =
          creator.fullName && creator.handle
            ? creator
            : (db.getState().creators || []).find((c) => c.id === creator.id) || creator;
        sl.creatorIds.push(creator.id);
        sl.creators.push(fullCreator);
        result = { added: true, shortlist: sl };
      }
      sl.updatedAt = new Date().toISOString().split("T")[0];
    });
    return result;
  }
}

export const crmRepo = new CRMRepository();
