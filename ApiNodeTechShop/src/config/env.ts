import { AppError } from "../errors/AppErro";
import dotenv from "dotenv"
dotenv.config()

export function env() {
  const reqVars = ["PORT", "URL_DATABASE", "JWT_SECRET", "RABBITMQ_URL", "EMAIL_USER", "EMAIL_PASS", "FRONTEND_URL"] as const;

  reqVars.forEach((key) => {
    if (!process.env[key])
      throw new AppError(`Variavel de ambiente ${key}`, 500, "config/env.ts");
  });

  return {
    port: Number(process.env.PORT) || 3333,
    urlDatabase: process.env.URL_DATABASE,
    jwtSecret: process.env.JWT_SECRET,
    rabbitMQ: process.env.RABBITMQ_URL, 
    emialUser: process.env.EMAIL_USER,
    emialPass: process.env.EMAIL_PASS,
    urlFrontEnd: process.env.FRONTEND_URL
  };
}
