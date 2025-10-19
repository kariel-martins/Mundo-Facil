import cron from "node-cron";
import { db } from "../client.database";
import { users } from "../schema.database";
import { and, eq, lt } from "drizzle-orm";

export const removeUnverifieldUsersJob = cron.schedule(
  "* * * * *",
  async () => {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);

    const result = await db
      .delete(users)
      .where(
        and(
          eq(users.status, "pending"),
          lt(users.created_at, fifteenMinutesAgo)
        )
      );
    if (result.rowCount && result.rowCount > 0) {
      console.log(`🧹 ${result.rowCount} contas não validadas removidas`);
    }
  }
);
