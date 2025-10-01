import { RequestHandler } from "express";
import { JWTService } from "../services/JWTService";

const jwtService = new JWTService()

export const Autorization: RequestHandler = async (req, res, next) => {
  const headerToken = req.headers.cookie;
  if (!headerToken) {
    return res.status(401).json({ errors: { default: "Não autorizado" } });
  }
  const [name, token] = headerToken.split("=");
  if (!name || !token) {
    return res.status(400).json({ errors: { default: "Token inválido" } });
  }
  const verify = await jwtService.verifyToken(token)
  if (!verify || verify==="ERRO_TOKEN_VERIFY" || verify==="INVALID_TOKEN" || verify==="JWT_SECRET_NOT_FOUND") {
    res.status(500).json({errors: { default: "Erro ao verificar o token"}})
  }
  next();
};
