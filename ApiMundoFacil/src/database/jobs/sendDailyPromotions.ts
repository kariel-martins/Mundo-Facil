import cron from "node-cron";
import { sendEmail } from "../../share/services/EmailService";
import { db } from "../client.database";
import { users } from "../schema.database";
import { generalPromotionEmailTemplate } from "../../share/templetes/promotions.stores";

export const sendDailyPromotionsJob = cron.schedule("0 9 * * *", async () => {
  console.log("💌 Enviando promoções diárias às 9h...");
  try {
    const result = await db.select().from(users);
    if (result.length > 0) {
        result.map((user)=> {
            return sendEmail(user.email, "Chegou 📩", generalPromotionEmailTemplate());
        })
    }
  } catch (error) {}
});
