import Redis from "ioredis";
import { env } from "../config/env";

const { urlRedis } = env();

  const redis = new Redis(urlRedis);

  redis.on("connect", () => {
    console.log("✅ Redis conectado com sucesso");
  });

  redis.on("error", (err) => {
    console.error("❌ Erro no Redis:", err);
  });
  
  export { redis }