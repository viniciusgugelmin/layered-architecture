import pg, {Pool, PoolConfig} from "pg";
import "./setup.js";

let cachedDB: Pool;
let connectionParams: PoolConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT),
};

export async function connectDB(): Promise<Pool> {
  if (cachedDB) {
    return cachedDB;
  }

  if (process.env.DATABASE_URL) {
    connectionParams = {
      connectionString: process.env.DATABASE_URL,
    };
  }

  if (process.env.MODE === "PROD") {
    connectionParams.ssl = {
      rejectUnauthorized: false,
    };
  }

  const { Pool } = pg;

  const db = new Pool(connectionParams);
  await db.connect();

  cachedDB = db;

  return db;
}
