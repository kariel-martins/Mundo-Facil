import * as jwt from "jsonwebtoken";
import { env } from "../../config/env";
import { AppError } from "../../errors/AppErro";

interface IJwtData {
  scope: string;
}

const { jwtSecret } = env();
export class JWTService {
  public async signToken(uid: string, minutes: number) {
    try {
      const authToken = await this.sign({ scope: uid }, minutes);
      if (!authToken || authToken === "JWT_SECRET_NOT_FOUND") {
        throw new AppError("Erro ao gerar o token", 400);
      }
      return authToken;
    } catch (error) {
      console.error("Erro em signToken:", error);
      throw new AppError(
        "Não foi possível gerar o token",
        500,
        "auth/services/service.auth.ts/signToken"
      );
    }
  }

  public async verifyToken(token: string) {
    try {
      const authToken = await this.verify(token);
      if (
        !authToken ||
        (typeof authToken === "string" &&
          [
            "JWT_SECRET_NOT_FOUND",
            "INVALID_TOKEN",
            "ERRO_TOKEN_VERIFY",
          ].includes(authToken))
      ) {
        throw new AppError("Token inválido", 400);
      }
      return authToken;
    } catch (error) {
      console.error("Erro em verifyToken:", error);
      throw new AppError(
        "Não foi possível verificar o token",
        500,
        "auth/services/service.auth.ts/verifyToken"
      );
    }
  }

  private async sign(
    data: IJwtData,
    expireInMinutes = 15
  ): Promise<
    string | "INVALID_TOKEN" | "JWT_SECRET_NOT_FOUND" | "ERRO_TOKEN_SIGN"
  > {
    if (!jwtSecret) return "JWT_SECRET_NOT_FOUND";
    try {
      const result = await jwt.sign(data, jwtSecret, {
        expiresIn: `${expireInMinutes}m`,
      });
      return result;
    } catch {
      return "ERRO_TOKEN_SIGN";
    }
  }
  private verify(
    token: string
  ): IJwtData | "JWT_SECRET_NOT_FOUND" | "INVALID_TOKEN" | "ERRO_TOKEN_VERIFY" {
    if (!jwtSecret) return "JWT_SECRET_NOT_FOUND";
    try {
      const decoded = jwt.verify(token, jwtSecret);
      if (typeof decoded === "string") {
        return "INVALID_TOKEN";
      }
      return decoded as IJwtData;
    } catch {
      return "ERRO_TOKEN_VERIFY";
    }
  }
}
