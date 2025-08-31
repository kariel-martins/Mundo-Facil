import * as jwt from "jsonwebtoken";
import { env } from "../../config/env";

interface IJwtData {
  scope?: string;
}

const { jwtSecret } = env();
const sign = (
  data: IJwtData,
  expireInMinutes = 15
): string | "JWT_SECRET_NOT_FOUND" => {
  if (!jwtSecret) return "JWT_SECRET_NOT_FOUND";
  return jwt.sign(data, jwtSecret, { expiresIn: `${expireInMinutes}m` });
};

const verify = (
  token: string
):
  | (IJwtData & { exp?: number; iat?: number })
  | "JWT_SECRET_NOT_FOUND"
  | "INVALID_TOKEN" => {
  if (!jwtSecret) return "JWT_SECRET_NOT_FOUND";
  try {
    const decoded = jwt.verify(token, jwtSecret);
    if (typeof decoded === "string") {
      return "INVALID_TOKEN";
    }
    return decoded as IJwtData & { exp?: number; iat?: number };
  } catch {
    return "INVALID_TOKEN";
  }
};

export const JWTService = {
  sign,
  verify,
};
