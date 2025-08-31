import { AppError } from "../errors/AppErro";

export function env() {
  const reqVars = ["PORT", "URL_DATABASE", "JWT_SECRET"] as const;

  reqVars.forEach((key) => {
    if (!process.env[key])
      throw new AppError(`Variavel de ambiente ${key}`, 500, "config/env.ts");
  });

  return {
    port: Number(process.env.PORT) || 3333,
    urlDatabase: process.env.URL_DATABASE,
    jwtSecret: process.env.JWT_SECRET,
  };
}
