import { RequestHandler } from "express";
import { JWTService } from "../services/JWTService";

const jwtService = new JWTService();
export const Authorization: RequestHandler = async (req, res, next) => {
  try {
    const headerCookie = req.headers.cookie;

    if (!headerCookie) {
      return res.status(401).json({ errors: { default: "Não autorizado" } });
    }

    const cookies = headerCookie.split(";").map((c) => c.trim());
    const authCookie = cookies.find((c) => c.startsWith("auth_token="));

    if (!authCookie) {
      return res.status(401).json({ errors: { default: "Token não encontrado" } });
    }

    const [, token] = authCookie.split("=");

    if (!token) {
      return res.status(400).json({ errors: { default: "Token inválido" } });
    }

    const verify = await jwtService.verifyToken(token);

    if (
      !verify ||
      verify === "ERRO_TOKEN_VERIFY" ||
      verify === "INVALID_TOKEN" ||
      verify === "JWT_SECRET_NOT_FOUND"
    ) {
      return res.status(401).json({ errors: { default: "Token inválido ou expirado" } });
    }
    next();
  } catch (error) {
    console.error("Erro no middleware Authorization:", error);
    return res.status(500).json({ errors: { default: "Erro interno na autenticação" } });
  }
};
