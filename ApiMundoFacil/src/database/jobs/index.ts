import { clearAbandonedCartsJob } from "./clearAbondoneCarts";
import { clearInvalidTokens } from "./clearTokenInValid";
import { removeUnverifiedUsersJob } from "./removeUnverifieldUsers";
import { sendDailyPromotionsJob } from "./sendDailyPromotions";

export const startAllJobs = () => {
  console.log("⚙️ Iniciando cron jobs...");

  removeUnverifiedUsersJob.start()
  clearAbandonedCartsJob.start();
  sendDailyPromotionsJob.start();
  clearInvalidTokens.start()
  
  console.log("✅ Todos os cron jobs foram iniciados!");
};
