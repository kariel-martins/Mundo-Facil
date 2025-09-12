import { RequestHandler } from "express";
import { AuthService } from "../services/service.auth";

const service = new AuthService();

export const signUp: RequestHandler = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ errors: { default: "Todos os campos são obrigatórios" } });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ errors: { default: "As senhas não coincidem" } });
  }

  try {
    const user = await service.registerUser({ name, email, password });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao registrar usuário" } });
  }
};

export const verifyAuthenticationUser: RequestHandler = async (req, res) => {
  const { user_id, token } = req.query;

  if (!user_id || !token || typeof token !== "string" || typeof user_id !== "string") {
    return res.status(401).json({ errors: { default: "Token e user_id não são válidos" } });
  }

  try {
    const verifyUser = await service.verifyAuthentication(user_id, token);
    if (!verifyUser) {
      return res.status(404).json({ errors: { default: "Usuário não encontrado ou token inválido" } });
    }

    return res.status(200).json({ verifyUser });
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao verificar usuário" } });
  }
};

export const signIn: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ errors: { default: "Email e senha são obrigatórios" } });
  }

  try {
    const user = await service.getUser(email, password);
    if (!user) {
      return res.status(404).json({ errors: { default: "Usuário não encontrado" } });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao realizar login" } });
  }
};

export const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ errors: { default: "Email é obrigatório" } });
  }

  try {
    const user = await service.forgotPassword(email);
    if (!user) {
      return res.status(404).json({ errors: { default: "Usuário não encontrado" } });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao processar recuperação de senha" } });
  }
};

export const resetPassword: RequestHandler = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.query;
  console.log(password, confirmPassword, token)

  if (!token || !password || !confirmPassword) {
    return res.status(400).json({ errors: { default: "Todos os campos são necessários" } });
  }
  if (password !== confirmPassword) {
    return res.status(400).json({ errors: { default: "As senhas não coincidem" } });
  }

  try {
    const updatedUser = await service.resetPassword(token.toString(), password);
    return res.status(200).json({ updatedUser });
  } catch (error) {
    return res.status(500).json({ errors: { default: "Erro ao redefinir senha" } });
  }
};
