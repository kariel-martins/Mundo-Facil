import path from "node:path";
import { AppError } from "../errors/AppErro";
import dotenv from "dotenv"

const nodeEnv = process.env.NODE_ENV || "development";

const envPath = path.resolve(process.cwd(), `.env.${nodeEnv}`);

dotenv.config({path: envPath});

function getRequiredEnv(key: string): string {
  const val = process.env[key];
  if (!val) throw new AppError(`Variável de ambiente ${key} não definida`, 500, "config/env.ts");
  return val;
}

export function env() {
  const reqVars = ["PORT", "URL_DATABASE", "JWT_SECRET", "RABBITMQ_URL", "FRONTEND_URL", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "REDIS_URL", "SENDGRID_API_KEY", "EMAIL_USER"] as const;

  reqVars.forEach((key) => {
    if (!process.env[key])
      throw new AppError(`Variavel de ambiente ${key}`, 500, "config/env.ts");
  });

  return {
    port: Number(getRequiredEnv("PORT")) || 3333,
    urlDatabase: getRequiredEnv("URL_DATABASE"),
    urlRedis: getRequiredEnv("REDIS_URL"),
    jwtSecret: getRequiredEnv("JWT_SECRET"),
    rabbitMQ: getRequiredEnv("RABBITMQ_URL"), 
    urlFrontEnd: getRequiredEnv("FRONTEND_URL"),
    stripeSecretKey: getRequiredEnv("STRIPE_SECRET_KEY"),
    stripeWebHoohSecret: getRequiredEnv("STRIPE_WEBHOOK_SECRET"),
    sendgridKey: getRequiredEnv("SENDGRID_API_KEY"),
    emailUser: getRequiredEnv("EMAIL_USER")
  };
}
