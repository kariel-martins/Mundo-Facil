import { drizzle } from "drizzle-orm/node-postgres";
import { env } from "../config/env";
import { AppError } from "../errors/AppErro";
import { Pool } from "pg";

const { urlDatabase } = env();

if (!urlDatabase)
  throw new AppError(
    "urlDatabase não encontrada",
    500,
    "database/client.database.ts"
  );
const pool = new Pool({
  connectionString: urlDatabase,
});

export const db = drizzle(pool);
