import * as jwt from "jsonwebtoken";
import { env } from "../../config/env";

interface IJwtData {
  scope?: string;
}
type messageErroToken = "INVALID_TOKEN"
  | "JWT_SECRET_NOT_FOUND"
  | "ERRO_TOKEN_SIGN"
  | "ERRO_TOKEN_VERIFY";

const { jwtSecret } = env();
export class JWTService {
  async sign(
    data: IJwtData,
    expireInMinutes = 15
  ): Promise<string | messageErroToken> {
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

  verify(
    token: string
  ): (IJwtData & { exp?: number; iat?: number }) | messageErroToken {
    if (!jwtSecret) return "JWT_SECRET_NOT_FOUND";
    try {
      const decoded = jwt.verify(token, jwtSecret);
      if (typeof decoded === "string") {
        return "INVALID_TOKEN";
      }
      return decoded as IJwtData & { exp?: number; iat?: number };
    } catch {
      return "ERRO_TOKEN_VERIFY";
    }
  }
}
