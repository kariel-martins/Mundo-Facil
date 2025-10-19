import { clearAbandonedCartsJob } from "./clearAbondoneCarts";
import { removeUnverifieldUsersJob } from "./removeUnverifieldUsers";
import { sendDailyPromotionsJob } from "./sendDailyPromotions";

export const startAllJobs = () => {
  console.log("⚙️ Iniciando cron jobs...");

  removeUnverifieldUsersJob.start();
  clearAbandonedCartsJob.start();
  sendDailyPromotionsJob.start();
  
  console.log("✅ Todos os cron jobs foram iniciados!");
};
