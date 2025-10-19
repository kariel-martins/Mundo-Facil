import cron from "node-cron";
import { lt } from "drizzle-orm";
import { carts } from "../schema.database";
import { db } from "../client.database";

export const clearAbandonedCartsJob = cron.schedule("0 * * * *", async () => {
  const twentyFourHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const result = await db.delete(carts).where(lt(carts.created_at, twentyFourHoursAgo));

  if (result.rowCount && result.rowCount > 0) {
    console.log(`🛒 ${result.rowCount} carrinhos abandonados removidos`);
  }
});
