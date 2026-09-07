import { db } from "../db/database";
import { UserEntity } from "../db/schema";
import { hashPassword, verifyPassword } from "../auth/crypto";
import { UserRole } from "@/core/types";

export class UserRepository {
  findByEmail(email: string): UserEntity | undefined {
    const normalized = email.toLowerCase().trim();
    const users = db.getState().users || [];
    const direct = users.find((u) => u.email.toLowerCase() === normalized);
    if (direct) return direct;

    // Cross-domain alias resolution
    const aliasMap: Record<string, string> = {
      "creator@abeycollab.io": "creator@collably.io",
      "creator@abeycollab.com": "creator@collably.io",
      "brand@abeycollab.io": "brand@collably.io",
      "brand@abeycollab.com": "brand@collably.io",
      "admin@abeycollab.io": "kevinbhutwala417@gmail.com",
      "admin@abeycollab.com": "kevinbhutwala417@gmail.com",
      "admin@collably.io": "kevinbhutwala417@gmail.com",
      "creator@collably.io": "creator@collably.io",
      "brand@collably.io": "brand@collably.io",
    };

    const targetEmail = aliasMap[normalized];
    if (targetEmail) {
      return users.find((u) => u.email.toLowerCase() === targetEmail.toLowerCase());
    }

    return undefined;
  }


  findById(id: string): UserEntity | undefined {
    return (db.getState().users || []).find((u) => u.id === id);
  }

  getAllUsersCount(): number {
    return (db.getState().users || []).length;
  }

  createUser(data: {
    name: string;
    email: string;
    password?: string;
    passwordHash?: string;
    role: UserRole;
    avatarUrl?: string;
    verified?: boolean;
  }): UserEntity {
    const existing = this.findByEmail(data.email);
    if (existing) {
      throw new Error("User with this email already exists");
    }

    if (!data.passwordHash && !data.password) {
      throw new Error("A password or password hash is required to create a user");
    }
    const passwordHash = data.passwordHash || hashPassword(data.password!);

    const newUser: UserEntity = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email.toLowerCase(),
      passwordHash,
      role: data.role,
      avatarUrl: data.avatarUrl || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=80`,
      verified: data.verified ?? false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    db.updateState((state) => {
      state.users = state.users || [];
      state.users.push(newUser);
    });

    return newUser;
  }

  verifyCredentials(email: string, password: string): UserEntity | null {
    const user = this.findByEmail(email);
    if (!user) return null;
    const isValid = verifyPassword(password, user.passwordHash);
    if (!isValid) return null;
    return user;
  }

  updatePassword(id: string, newPassword: string): boolean {
    let success = false;
    const newHash = hashPassword(newPassword);
    db.updateState((state) => {
      const u = (state.users || []).find((user) => user.id === id);
      if (u) {
        u.passwordHash = newHash;
        u.updatedAt = new Date().toISOString();
        success = true;
      }
    });
    return success;
  }

  updateUser(id: string, updates: Partial<UserEntity>): UserEntity | null {
    let updated: UserEntity | null = null;
    db.updateState((state) => {
      const idx = (state.users || []).findIndex((user) => user.id === id);
      if (idx !== -1) {
        state.users[idx] = {
          ...state.users[idx],
          ...updates,
          updatedAt: new Date().toISOString(),
        };
        updated = state.users[idx];
      }
    });
    return updated;
  }
}

export const userRepo = new UserRepository();
