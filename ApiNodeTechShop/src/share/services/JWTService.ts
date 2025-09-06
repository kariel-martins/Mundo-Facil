import * as jwt from "jsonwebtoken";
import { env } from "../../config/env";

interface IJwtData {
  scope: string;
}

const { jwtSecret } = env();
export class JWTService {
  async sign(
    data: IJwtData,
    expireInMinutes = 15
  ): Promise<string | "INVALID_TOKEN" | "JWT_SECRET_NOT_FOUND" | "ERRO_TOKEN_SIGN"> {
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
  ): IJwtData | "JWT_SECRET_NOT_FOUND" | "INVALID_TOKEN" | "ERRO_TOKEN_VERIFY"{
    if (!jwtSecret) return "JWT_SECRET_NOT_FOUND";
    try {
      const decoded = jwt.verify(token, jwtSecret);
      if (typeof decoded === "string") {
        return "INVALID_TOKEN";
      }
      return decoded as IJwtData
    } catch {
      return "ERRO_TOKEN_VERIFY";
    }
  }
}