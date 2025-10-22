import cron from "node-cron";
import { db } from "../client.database";
import { email_verifications } from "../schema.database";
import { eq, lt, or } from "drizzle-orm";

export const clearInvalidTokens = cron.schedule("*/5 * * * *", async () => {
  try {
    const now = new Date();
    const result = await db
      .delete(email_verifications)
      .where(
        or(
          lt(email_verifications.expires_at, now),
          eq(email_verifications.isValid, "invalid") 
        )
      );
    const deletedCount = result?.rowCount?? 0;

    if (deletedCount > 0) {
      console.log(`🧹 ${deletedCount} tokens inválidos ou expirados removidos`);
    } else {
      console.log("ℹ️ Nenhum token inválido encontrado nesta execução");
    }
  } catch (err) {
    console.error("❌ Erro ao remover tokens inválidos:", err);
  }
});
