import { RequestHandler } from "express";
import { AuthService, AuthTokenService } from "../services/service.auth";
import { passwordCrypto } from "../../../share/services/PasswordCrypto";
import { JWTService } from "../../../share/services/JWTService";
import { publishEmailVerificationRequested, publishUserCreated } from "../../../messages/producers/auth.producers";

type signUp = {
  name: string;
  email: string;
  password: string;
  confPassword: string;
};
const tokenService = new AuthTokenService()
const service = new AuthService();
export const signUp: RequestHandler = async (req, res) => {
  const { name, email, password, confPassword } = req.body;
  if (!name || !email || !password || !confPassword) {
    res.status(400).json({ errors: { default: "Os campos são obrigatorios" } });
    return;
  }

  if (password !== confPassword) {
    res.status(400).json({
      errors: {
        default: "Senhas não coincidem.",
      },
    });
    return;
  }

  try {
    await service.getByEmail(email);
    res.status(409).json({ field: "email", message: "Email já existe" });
    return;
  } catch {
    const passwordHash = (
      await passwordCrypto.hashText(password)
    ).toString();
    const user = await service.createUser({ name, email, passwordHash });
    if (!user) {
      res.status(400).json({
        errors: {
          default: "Não foi possível criar o usuário",
        },
      });
      return;
    }
    const uid = user.id;
    if (uid === undefined) {
      res.status(404).json({
        errors: {
          default: "Id do usuario não encontrado",
        },
      });
      return;
    }
    const token = await tokenService.signToken(uid, 15)
    const userToken = await service.createTokenUser(token, 15)

    await publishUserCreated({
      id: uid,
      name: user.name,
      email: user.email,
    });
    await publishEmailVerificationRequested({
      userId: uid,
      email: user.email,
      token: userToken.tokenHash,
      expiresAt: userToken.expiresAt.toISOString()
    });
    res.status(200).json({ id:user.id, email: user.email });
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
