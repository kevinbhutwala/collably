import { creatorRepo } from "../repositories/creator.repo";
import { CreatorProfile, CreatorFilterParams } from "@/core/types";

export class CreatorService {
  async getCreators(filters: CreatorFilterParams = {}): Promise<CreatorProfile[]> {
    return creatorRepo.findAll(filters);
  }

  async getCreatorById(id: string): Promise<CreatorProfile | null> {
    return creatorRepo.findById(id);
  }

  async getCreatorByUserId(userId: string): Promise<CreatorProfile | null> {
    return creatorRepo.findByUserId(userId);
  }

  async updateProfile(id: string, updates: Partial<CreatorProfile>): Promise<CreatorProfile | null> {
    return creatorRepo.updateCreator(id, updates);
  }
}

export const creatorService = new CreatorService();
