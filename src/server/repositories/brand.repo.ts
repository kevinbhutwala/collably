import { db } from "../db/database";
import { BrandProfile } from "@/core/types";

export class BrandRepository {
  getAll(): BrandProfile[] {
    return [...(db.getState().brands || [])];
  }

  findAll(): BrandProfile[] {
    return this.getAll();
  }

  getById(id: string): BrandProfile | undefined {
    return (db.getState().brands || []).find((b) => b.id === id);
  }

  findById(id: string): BrandProfile | null {
    return this.getById(id) || null;
  }

  getByUserId(userId: string): BrandProfile | undefined {
    return (db.getState().brands || []).find((b) => b.userId === userId);
  }

  findByUserId(userId: string): BrandProfile | null {
    return this.getByUserId(userId) || null;
  }

  createOrUpdate(brand: BrandProfile): BrandProfile {
    db.updateState((state) => {
      state.brands = state.brands || [];
      const index = state.brands.findIndex((b) => b.id === brand.id);
      if (index >= 0) {
        state.brands[index] = brand;
      } else {
        state.brands.unshift(brand);
      }
    });
    return brand;
  }

  createBrand(brand: Omit<BrandProfile, "id" | "createdAt">): BrandProfile {
    const id = `brand-${Date.now()}`;
    const newBrand: BrandProfile = {
      ...brand,
      id,
      createdAt: new Date().toISOString(),
    };
    return this.createOrUpdate(newBrand);
  }

  updateBrand(id: string, updates: Partial<BrandProfile>): BrandProfile | null {
    let updated: BrandProfile | null = null;
    db.updateState((state) => {
      state.brands = state.brands || [];
      const index = state.brands.findIndex((b) => b.id === id);
      if (index >= 0) {
        state.brands[index] = {
          ...state.brands[index],
          ...updates,
        };
        updated = state.brands[index];
      }
    });
    return updated;
  }
}

export const brandRepo = new BrandRepository();
