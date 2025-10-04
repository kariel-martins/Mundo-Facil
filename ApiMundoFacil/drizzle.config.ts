import { defineConfig } from "drizzle-kit"
import { env } from "./src/config/env"
import { AppError } from "./src/errors/AppErro";

const { urlDatabase } = env()

if (!urlDatabase)
  throw new AppError(
    "urlDatabase não encontrada",
    500,
    "database/client.database.ts"
  );

export default defineConfig({
    dialect: 'postgresql',
    schema: './src/database/schema.database.ts',
    dbCredentials: {
        url: urlDatabase,
    }
})