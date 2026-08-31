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
