import { crmRepo } from "../repositories/crm.repo";
import { CRMContact, CreatorShortlist } from "@/core/types";

export class CRMService {
  async getContacts(brandId: string): Promise<CRMContact[]> {
    return crmRepo.findContactsByBrand(brandId);
  }

  async getShortlists(brandId: string): Promise<CreatorShortlist[]> {
    return crmRepo.findShortlistsByBrand(brandId);
  }

  async addContactNote(contactId: string, authorName: string, content: string): Promise<CRMContact | null> {
    return crmRepo.addNote(contactId, authorName, content);
  }

  async createShortlist(brandId: string, name: string, description: string, creatorIds: string[] = []): Promise<CreatorShortlist> {
    return crmRepo.createShortlist(brandId, name, description, creatorIds);
  }
}

export const crmService = new CRMService();
