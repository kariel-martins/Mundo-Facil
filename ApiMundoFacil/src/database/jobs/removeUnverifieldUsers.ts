import cron from "node-cron";
import { db } from "../client.database";
import { users } from "../schema.database";
import { and, eq, lt } from "drizzle-orm";

export const removeUnverifiedUsersJob = cron.schedule(
  "* * * * *",
  async () => {
    try {
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

      const result = await db
        .delete(users)
        .where(
          and(
            eq(users.status, "pending"),
            lt(users.created_at, fifteenMinutesAgo)
          )
        );

      const deletedCount = result.rowCount ?? 0;

      if (deletedCount > 0) {
        console.log(`🧹 ${deletedCount} contas não validadas removidas`);
      }
    } catch (err) {
      console.error("Erro ao remover contas não verificadas:", err);
    }
  },
  {
    timezone: "UTC",
  }
);
