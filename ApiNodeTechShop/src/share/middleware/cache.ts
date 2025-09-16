import { Request, Response, NextFunction } from "express";
import redis from "../../database/redis";

export const cacheProdutos = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const produtosCache = await redis.get("produtos:all");

    if (produtosCache) {
      console.log("📦 Retornando produtos do cache");
      return res.json(JSON.parse(produtosCache));
    }

    next();
  } catch (err) {
    console.error("Erro ao acessar cache:", err);
    next();
  }
};
