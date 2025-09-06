import { RequestHandler } from "express";
import { AuthService } from "../services/service.auth";

const service = new AuthService();
export const signUp: RequestHandler = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (!name || !email || !password || !confPassword) {
    res.status(400).json({ errors: { default: "Os campos são obrigatorios" } });
    return;
  }
  if (password !== confPassword) {
    res.status(400).json({ errors: { default: "Senhas não coincidem." } });
    return;
  }
  try {
    const user = await service.registerUser({ name, email, password });
    return res.status(201).json(user);
  } catch {
    return res.status(500).json({ error: "Erro ao registrar usuário" });
  }
};

export const verifyEmail: RequestHandler = async (req, res) => {
  const { user_id, token } = req.query;

  if (
    !user_id ||
    !token ||
    typeof token !== "string" ||
    typeof user_id !== "string"
  ) {
    res
      .status(401)
      .json({ errors: { default: "Token e user_id não são válidos" } });
    return;
  }

  const verification = await service.getByIdTokenVerication(user_id, token);

  if (!verification) {
    res.status(404).json({
      errors: {
        default: "Verificação não encontrada ou já usada",
      },
    });
    return;
  }
  if (new Date() > verification.expires_at) {
    res.status(400).json({
      errors: {
        default: "Token expirado",
      },
    });
    return;
  }
  const uid = verification.user_id;
  if (!uid) {
    res.status(404).json({
      errors: {
        default: "Usuário não encotrado",
      },
    });
    return;
  }
  const updateAuteticationUser = await service.updateAutetication(uid);
  res.status(201).json({ updateAuteticationUser });
};
export const sigIn: RequestHandler = (req, res) => {};

export const forgotPassword: RequestHandler = (req, res) => {};

export const resertPassword: RequestHandler = (req, res) => {};
