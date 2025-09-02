import { AppError } from "../../../errors/AppErro";
import { JWTService } from "../../../share/services/JWTService";
import { authInsert, emailVerification } from "../dtos/types.dto.auth";
import { AuthRepository } from "../repositories/auth.repository";

interface dataData {
  name: string;
  email: string;
  passwordHash: string;
}
export class AuthTokenService {
  private jwtService = new JWTService();

  async signToken(uid: string, minutes: number) {
    try {
      const authToken = await this.jwtService.sign({ scope: uid }, minutes);
      if (!authToken || authToken === "JWT_SECRET_NOT_FOUND")
        throw new AppError("Erro ao gera o token", 400);
      return authToken;
    } catch {
      throw new AppError(
        "Não foi possível gerar o token",
        500,
        "auth/services/service.auth.ts/signToken"
      );
    }
  }

  async verifyToken(token: string) {
    try {
      const authToken = await this.jwtService.verify(token);
      if (
        !authToken ||
        authToken === "JWT_SECRET_NOT_FOUND" ||
        authToken === "INVALID_TOKEN"
      )
        throw new AppError("Erro ao verificar o token", 400);
        return authToken;
    } catch {
      throw new AppError(
        "Não foi possível verificar o token",
        500,
        "auth/services/service.auth.ts/verifyToken"
      );
    }
  }
}
export class AuthService {
  private repo = new AuthRepository();

  async createUser(data: dataData): Promise<authInsert> {
    try {
      const auth = await this.repo.create(data);
      if (!auth) throw new AppError("Error ao criar o usuário", 400);
      return auth;
    } catch (err) {
      throw new AppError(
        "Não foi possíel criar o usuário",
        500,
        "auth/services/service.auth.ts/createUser"
      );
    }
  }
  async createTokenUser(token: string, minutes: number): Promise<emailVerification> {
    const now = new Date()
    const time = new Date(now.getTime() + minutes * 60 * 1000)
    if (!time) throw new AppError("Erro ao gera a data", 500, "auth/services/service.auth.ts/createTokenUser")
    try {
      const auth = await this.repo.emailVerificationCreate(token, time);
      if (!auth)
        throw new AppError("Error ao criar o token de verificação", 400);
      return auth;
    } catch {
      throw new AppError(
        "Não foi possíel criar o token de verificação",
        500,
        "auth/services/service.auth.ts/createTokenUser"
      );
    }
  }
  async getByEmail(email: string): Promise<authInsert> {
    try {
      const auth = await this.repo.findByEmail(email);
      if (!auth) throw new AppError("Usuário não encontrado", 404);
      return auth;
    } catch {
      throw new AppError(
        "Usuário não encontrado",
        500,
        "auth/services/service.auth.ts/getByEmail"
      );
    }
  }
  async getByIdTokenVerication(userId: string): Promise<emailVerification> {
    try {
      const auth = await this.repo.findTokenVerication(userId);
      if (!auth) throw new AppError("Token não encontrado", 404);
      return auth;
    } catch {
      throw new AppError(
        "Token não encontrado",
        500,
        "auth/services/service.auth.ts/getByIdTokenVerication"
      );
    }
  }
  async UpdatePasswordUser(
    email: string,
    password: string
  ): Promise<authInsert> {
    try {
      const auth = await this.repo.updatePassword(email, password);
      if (!auth) throw new AppError("Error ao atualizar o usuário", 400);
      return auth;
    } catch {
      throw new AppError(
        "Error ao atualizar a senha do usuário",
        500,
        "auth/services/service.auth.ts/UpdatePasswordUser"
      );
    }
  }
  async UpdateUser(
    email: string,
    email_verified_at: Date,
    status: string
  ): Promise<authInsert> {
    try {
      const auth = await this.repo.updateUser(email, email_verified_at, status);
      if (!auth) throw new AppError("Error ao atualizar o usuário", 400);
      return auth;
    } catch {
      throw new AppError(
        "Error ao atualizar o usuário",
        500,
        "auth/services/service.auth.ts/UpdatePasswordUser"
      );
    }
  }
  async updateAutetication(
    userId: string,
    expiresAt: Date,
    consumeAt: Date
  ): Promise<emailVerification> {
    try {
      const auth = await this.repo.updateAutetication(
        userId,
        expiresAt,
        consumeAt
      );
      if (!auth)
        throw new AppError("Error ao atualizar o token de verificação", 400);
      return auth;
    } catch {
      throw new AppError(
        "Error ao atualizar o token de verificação",
        500,
        "auth/services/service.auth.ts/updateAutetication"
      );
    }
  }
  async removeTokenUser(userId: string) {
    try {
      const auth = await this.repo.removeTokenUser(userId);
      if (!auth)
        throw new AppError("Error ao remove o token de verificação", 400);
      return auth;
    } catch {
      throw new AppError(
        "Error ao remove o token de verificação",
        500,
        "auth/services/service.auth.ts/updateAutetication"
      );
    }
  }
}
