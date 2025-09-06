import { AppError } from "../../../errors/AppErro";
import {
  publishEmailVerificationRequested,
  publishUserCreated,
} from "../../../messages/producers/auth.producers";
import { CryptoService } from "../../../share/services/CryptoService";
import { JWTService } from "../../../share/services/JWTService";
import { authInsert, emailVerification } from "../dtos/types.dto.auth";
import { AuthRepository } from "../repositories/auth.repository";

interface dataData {
  name: string;
  email: string;
  password: string;
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
        authToken === "INVALID_TOKEN" ||
        authToken === "ERRO_TOKEN_VERIFY"
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
  private tokenService = new AuthTokenService();
  private Crypto = new CryptoService();

  public async registerUser(data: dataData): Promise<authInsert> {
    try {
      await this.getByEmail(data.email);
      throw new AppError("Email já existe", 409);
    } catch {
      try {
        // criar o usuário

        const passwordHash = await this.Crypto.hashText(data.password);
        const auth = await this.repo.create({ ...data, passwordHash });
        if (!auth) throw new AppError("Error ao criar o usuário", 400);

        // cria o token de verificão
        const uid = auth.id;

        if (!uid) throw new AppError("Id Não encotrado!");
        const token = await this.tokenService.signToken(uid, 15);
        const tokenHash = await this.Crypto.hashText(token);
        const userToken = await this.createTokenUser(tokenHash, 15, uid);
        // Publicar eventos
        await publishUserCreated({
          id: uid,
          name: auth.name,
          email: auth.email,
        });
        await publishEmailVerificationRequested({
          userId: uid,
          email: auth.email,
          token: token,
          expiresAt: userToken.expires_at.toISOString(),
        });
        return auth;
      } catch (err) {
        throw new AppError(
          "Não foi possíel criar o usuário",
          500,
          "auth/services/service.auth.ts/createUser"
        );
      }
    }
  }
  private async createTokenUser(
    token: string,
    minutes: number,
    user_Id: string
  ): Promise<emailVerification> {
    const now = new Date();
    const time = new Date(now.getTime() + minutes * 60 * 1000);
    if (!time)
      throw new AppError(
        "Erro ao gera a data",
        500,
        "auth/services/service.auth.ts/createTokenUser"
      );
    try {
      const auth = await this.repo.emailVerificationCreate(
        token,
        time,
        user_Id
      );
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
  public async getByEmail(email: string): Promise<authInsert> {
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
  public async getByIdTokenVerication(
    user_id: string,
    token: string
  ): Promise<emailVerification> {
    
      const tokenHash = await this.repo.findByIdTokenVerication(user_id);
      if (!tokenHash) throw new AppError("Usuário não encotrado", 404);
      const tokenVericate = await this.Crypto.verifyText(token,tokenHash.tokenHash);
      if (!tokenVericate) throw new AppError("Token inválido", 404)
      const auth = await this.repo.findByIdTokenVerication(user_id);
      if (!auth) throw new AppError("Token não encontrado", 404);
      return auth;
  }
  public async UpdatePasswordUser(
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
  public async UpdateUser(
    email: string,
    email_verified_at: Date,
    status: string
  ): Promise<authInsert> {
    try {
      const auth = await this.repo.updateAutenticationUser(
        email,
        email_verified_at,
        status
      );
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
  public async updateAutetication(
    user_id: string,
  ): Promise<authInsert> {
    try {
      const verifyTokenUpdate = await this.repo.updateAuteticationToken(
        user_id
      );
      if (!verifyTokenUpdate)
        throw new AppError("Error ao atualizar o token de verificação", 400);
      const updatedUser = await this.repo.updateAutenticationUser(
        user_id,
        new Date(),
        "ativo"
      );
      if (!updatedUser)
        throw new AppError("Error ao atualizar a autorização de usuário");
      return updatedUser;
    } catch {
      throw new AppError(
        "Error ao atualizar o token de verificação",
        500,
        "auth/services/service.auth.ts/updateAutetication"
      );
    }
  }
  public async removeTokenUser(userId: string) {
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
