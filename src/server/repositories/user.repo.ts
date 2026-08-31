import { db } from "../db/database";
import { UserEntity } from "../db/schema";
import { hashPassword, verifyPassword } from "../auth/crypto";
import { UserRole } from "@/core/types";

export class UserRepository {
  findByEmail(email: string): UserEntity | undefined {
    return (db.getState().users || []).find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  findById(id: string): UserEntity | undefined {
    return (db.getState().users || []).find((u) => u.id === id);
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

    const passwordHash = data.passwordHash || (data.password ? hashPassword(data.password) : hashPassword("password123"));

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
}

export const userRepo = new UserRepository();
