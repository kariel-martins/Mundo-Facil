import { drizzle } from "drizzle-orm/node-postgres"
import { env } from "../config/env"
import { AppError } from "../errors/AppErro";

const { urlDatabase } = env();

if (!urlDatabase) throw new AppError("urlDatabase não encontrada", 500, "database/client.database.ts")

export const db = drizzle(urlDatabase);