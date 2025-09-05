import { RequestHandler } from "express";
import { AuthService} from "../services/service.auth";

const service = new AuthService();
export const signUp: RequestHandler = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (!name || !email || !password || !confPassword) {
    res.status(400).json({ errors: { default: "Os campos são obrigatorios" } });
    return;
  }
  if (password !== confPassword) {
    res.status(400).json({ errors: { default: "Senhas não coincidem." }});
    return;
  }
  try {
    const user = await service.registerUser({name, email, password})
     return res.status(201).json(user);
  } catch {
    return res.status(500).json({ error: "Erro ao registrar usuário" });
    }
};

export const verifyEmail: RequestHandler = (req, res) => {
  const token = req.cookies["verifyEmail"];
  if (!token) {
    res.status(401).json({ errors: { default: "Token não encotrado." } });
    return;
  }

};
export const sigIn: RequestHandler = (req, res) => {};

export const forgotPassword: RequestHandler = (req, res) => {};

export const resertPassword: RequestHandler = (req, res) => {};
