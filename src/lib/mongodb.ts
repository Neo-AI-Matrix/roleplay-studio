import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const dbName = 'roleplay_studio';

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

// Rating document structure
export interface Rating {
  scenarioId: string;
  clerkUserId: string;
  rating: number; // 1-5 stars
  createdAt: Date;
  updatedAt: Date;
}

// Aggregated rating for display
export interface ScenarioRating {
  scenarioId: string;
  averageRating: number;
  totalRatings: number;
}
