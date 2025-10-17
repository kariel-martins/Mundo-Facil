import { RequestHandler } from "express";
import { AuthService } from "../services/service.auth";
import { AppError } from "../../../errors/AppErro";

const service = new AuthService();

export const signUp: RequestHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await service.registerUser({ name, email, password });
    return res.status(201).json(user);
  } catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar signUp", context: "auth/controllers/auth.controller.ts/signUp"})
    }
};

export const verifyAuthenticationEmailUser: RequestHandler = async (req, res) => {
  const { user_id, token } = req.query;

  if (typeof token !== "string" || typeof user_id !== "string") {
    return res.status(401).json({ errors: { default: "Token e user_id não são válidos" } });
  }

  try {
    await service.verifyAuthentication(user_id, token);
    return res.status(200).json({ message: "Email verificado com sucesso" });
  } catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar verifyAuthenticationUser", context: "auth/controllers/auth.controller.ts/verifyAuthenticationUser"})
    }
};

export const verifyAuthentication: RequestHandler = async (_req, res) => {
  return res.status(200).json({ok: true})
}

export const signIn: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await service.getUser(email, password);
    res.cookie("auth_token", user.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
        sameSite: "none", 
        maxAge: 1000 * 60 * 60 * 2 // 2 horas
    })
    return res.status(200).json(user.user);
  } catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar signIn", context: "auth/controllers/auth.controller.ts/signIn"})
    }
};

export const forgotPassword: RequestHandler = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await service.forgotPassword(email);
    return res.status(200).json({ user });
  } catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar forgotPassword", context: "auth/controllers/auth.controller.ts/forgotPassword"})
    }
};

export const resetPassword: RequestHandler = async (req, res) => {
  const { password, confirmPassword } = req.body;
  const { token } = req.query;

  if (!token || !password || !confirmPassword || typeof token !== "string") {
    return res.status(400).json({ errors: { default: "Todos os campos são necessários" } });
  }
  try {
    const updatedUser = await service.resetPassword(token, password);
    return res.status(200).json({ updatedUser });
  } catch (error: any) {
      if (error instanceof AppError) {
        return res
        .status(error.statusCode)
        .json({ errors: { default: error.message } });
      }
      return res.status(500).json({message: "Erro ao processar resetPassword", context: "auth/controllers/auth.controller.ts/resetPassword"})
    }
};
