import fs from "fs";
import path from "path";
import { DatabaseState } from "./schema";
import { getInitialSeedDatabase } from "./seed";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "valence_db.json");

class DatabaseClient {
  private state: DatabaseState | null = null;

  constructor() {
    this.ensureInitialized();
  }

  private ensureInitialized(): void {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, "utf-8");
        this.state = JSON.parse(raw);

        const seed = getInitialSeedDatabase();

        // Ensure all required collections exist (in case of schema additions)
        if (!this.state!.subscriptions) this.state!.subscriptions = [];
        if (!this.state!.creators) this.state!.creators = [];
        if (!this.state!.brands) this.state!.brands = [];
        if (!this.state!.campaigns) this.state!.campaigns = [];
        if (!this.state!.applications) this.state!.applications = [];
        if (!this.state!.collaborations) this.state!.collaborations = [];
        if (!this.state!.payouts) this.state!.payouts = [];
        if (!this.state!.crmContacts) this.state!.crmContacts = [];
        if (!this.state!.shortlists) this.state!.shortlists = [];
        if (!this.state!.disputes) this.state!.disputes = [];
        if (!this.state!.tickets) this.state!.tickets = [];
        if (!this.state!.conversations) this.state!.conversations = [];
        if (!this.state!.messages) this.state!.messages = [];
        if (!this.state!.notifications) this.state!.notifications = [];
        if (!this.state!.auditLogs) this.state!.auditLogs = [];
        if (!this.state!.aiUsage) this.state!.aiUsage = [];
        if (!this.state!.ledgerEntries) this.state!.ledgerEntries = [];

        // Merge only the 3 seed users — do not re-add removed users
        for (const seedUser of seed.users) {
          if (!this.state!.users.some((u) => u.id === seedUser.id)) {
            this.state!.users.push(seedUser);
          }
        }

        // Merge only the 3 seed subscriptions
        for (const seedSub of seed.subscriptions) {
          if (!this.state!.subscriptions.some((s) => s.userId === seedSub.userId)) {
            this.state!.subscriptions.push(seedSub);
          }
        }

        // Backfill functional demo profiles for databases created before the
        // demo profile seed existed. Never overwrite user-created profiles.
        for (const seedCreator of seed.creators) {
          if (!this.state!.creators.some((creator) => creator.userId === seedCreator.userId)) {
            this.state!.creators.push(seedCreator);
          }
        }
        for (const seedBrand of seed.brands) {
          if (!this.state!.brands.some((brand) => brand.userId === seedBrand.userId)) {
            this.state!.brands.push(seedBrand);
          }
        }

        this.persist();
      } else {
        this.state = getInitialSeedDatabase();
        this.persist();
      }
    } catch (err) {
      console.error("Failed to read database file, initializing from seeds:", err);
      this.state = getInitialSeedDatabase();
      this.persist();
    }
  }

  private persist(): void {
    if (!this.state) return;
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(this.state, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to persist database state to disk:", err);
    }
  }

  public getState(): DatabaseState {
    if (!this.state) {
      this.ensureInitialized();
    }
    return this.state!;
  }

  public updateState(updater: (state: DatabaseState) => void): DatabaseState {
    const current = this.getState();
    updater(current);
    this.persist();
    return current;
  }
}

// Global singleton instance
export const db = new DatabaseClient();
