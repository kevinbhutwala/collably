import { brandRepo } from "../repositories/brand.repo";
import { BrandProfile } from "@/core/types";

export class BrandService {
  async getBrands(): Promise<BrandProfile[]> {
    return brandRepo.findAll();
  }

  async getBrandById(id: string): Promise<BrandProfile | null> {
    return brandRepo.findById(id);
  }

  async getBrandByUserId(userId: string): Promise<BrandProfile | null> {
    return brandRepo.findByUserId(userId);
  }

  async updateProfile(id: string, updates: Partial<BrandProfile>): Promise<BrandProfile | null> {
    return brandRepo.updateBrand(id, updates);
  }
}

export const brandService = new BrandService();
