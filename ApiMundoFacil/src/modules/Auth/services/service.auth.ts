import { AppError } from "../../../errors/AppErro";
import {
  publishEmailVerificationRequested,
  publishForgotPasswordEmail,
  publishResertPasswordUser,
  publishUserCreated,
} from "../../../messages/producers/auth.producers";
import { CryptoService } from "../../../share/services/CryptoService";
import { JWTService } from "../../../share/services/JWTService";
import { MaskData } from "../../../share/utils/maskFunctions";
import { authInsert, emailVerification } from "../dtos/types.dto.auth";
import { AuthRepository } from "../repositories/auth.repository";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface ResponseUser {
  user: {
    user_id: string;
    name: string;
    email: string;
  };
  token: string;
}
type SafeUser = Omit<authInsert, "passwordHash">;

interface registerUserProps {
  safeUser: SafeUser;
  token: string;
}

export class AuthService {
  private repo = new AuthRepository();
  private tokenService = new JWTService();
  private crypto = new CryptoService();
  private MaskUser = new MaskData();

  private async execute<T>(
    fn: () => Promise<T>,
    message: string,
    context: string
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      console.error(`Erro em ${context}:`, error);
      if (error instanceof AppError) throw error;
      throw new AppError(message, 500, context);
    }
  }

  public async registerUser(data: RegisterData): Promise<registerUserProps> {
    return this.execute(
      async () => {
        const existing = await this.repo.findByEmailOrNull(data.email);
        if (existing instanceof AppError)
          throw new AppError("Usuário já existe", 409);

        const passwordHash = await this.crypto.hashText(data.password);
        const auth = await this.repo.create({ ...data, passwordHash });
        if (!auth) throw new AppError("Erro ao criar o usuário", 400);

        const uid = auth.id;
        if (!uid) throw new AppError("Id não encontrado");
        const token = await this.tokenService.signToken(uid, 15);
        const tokenHash = await this.crypto.hashText(token);
        const userToken = await this.createTokenUser(tokenHash, 15, uid);

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

        // retorna user seguro
        const { passwordHash: _, ...safeUser } = auth;
        return { safeUser, token };
      },
      "Não foi possível criar o usuário",
      "auth/services/service.auth.ts/registerUser"
    );
  }
  
  public async getUser(email: string, password: string): Promise<ResponseUser> {
    return this.execute(
      async () => {
        const user = await this.repo.findByEmail(email, "ativo");
        if (!user.id) throw new AppError("Usuário não encontrado", 404);

        const validPassword = await this.crypto.verifyText(
          password,
          user.passwordHash
        );
        if (!validPassword)
          throw new AppError("Usuário ou senha inválidos", 401);

        const uid = user.id;
        if (!uid) throw new AppError("Id não encontrado");
        const token = await this.tokenService.signToken(uid, 15);

        const maskDataUser = {
          user: {
            user_id: uid,
            email: this.MaskUser.maskEmail(user.email),
            name: user.name,
          },
          token: token,
        };
        return maskDataUser;
      },
      "Erro ao buscar usuário",
      "auth/services/service.auth.ts/getUser"
    );
  }

  public async forgotPassword(email: string): Promise<{ message: string }> {
    return this.execute(
      async () => {
        const user = await this.repo.findByEmail(email, "ativo");
        if (!user || !user.id)
          throw new AppError("Usuário ou Id não encontrado", 404);

        const token = await this.tokenService.signToken(user.email, 15);
        const tokenHash = await this.crypto.hashText(token);
        await this.createTokenUser(tokenHash, 15, user.id);

        await publishForgotPasswordEmail(user.email, token, user.name);
        return {
          message: "E-mail de recuperação enviado com sucesso",
          token: token,
        };
      },
      "Erro ao processar recuperação de senha",
      "auth/services/service.auth.ts/forgotPassword"
    );
  }

  public async verifyAuthentication(user_id: string, token: string) {
    return this.execute(
      async () => {
        const verification = await this.getByIdTokenVerification(
          user_id,
          token
        );
        if (!verification)
          throw new AppError("Verificação não encontrada ou já usada", 404);
        if (new Date() > verification.expires_at)
          throw new AppError("Token expirado", 400);

        const uid = verification.user_id;
        if (!uid) throw new AppError("Usuário não encontrado", 404);

        return await this.updateAuthentication(uid);
      },
      "Erro ao verificar autenticação",
      "auth/services/service.auth.ts/verifyAuthentication"
    );
  }

  public async resetPassword(
    token: string,
    password: string
  ): Promise<{ message: string }> {
    return this.execute(
      async () => {
        const payload = await this.tokenService.verifyToken(token);
        if (
          !payload ||
          payload === "INVALID_TOKEN" ||
          payload === "JWT_SECRET_NOT_FOUND" ||
          payload === "ERRO_TOKEN_VERIFY"
        )
          throw new AppError("Token inválido", 404, "services/resetPassword");

        const user = await this.repo.findByEmail(payload.scope, "ativo");
        if (!user)
          throw new AppError(
            "Email não encontrado",
            404,
            "services/resetPassword"
          );

        const passwordHash = await this.crypto.hashText(password);
        const updated = await this.updatePasswordUser(
          user.email,
          passwordHash
        );

        await publishResertPasswordUser(updated.email, updated.name);

        return { message: "Senha atualizada com sucesso" };
      },
      "Erro ao processar resetPassword",
      "auth/services/service.auth.ts/resetPassword"
    );
  }

  private async createTokenUser(
    token: string,
    minutes: number,
    user_Id: string
  ): Promise<emailVerification> {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + minutes * 60 * 1000);
    if (!expiresAt)
      throw new AppError("Erro ao gerar a data de expiração", 500);

    return this.execute(
      () => this.repo.emailVerificationCreate(token, expiresAt, user_Id),
      "Não foi possível criar o token de verificação",
      "auth/services/service.auth.ts/createTokenUser"
    );
  }
  private async getByIdTokenVerification(
    user_id: string,
    token: string
  ): Promise<emailVerification> {
    return this.execute(
      async () => {
        const tokenHash = await this.repo.findByIdTokenVerification(user_id);
        if (!tokenHash) throw new AppError("Usuário não encontrado", 404);

        const isValid = await this.crypto.verifyText(
          token,
          tokenHash.tokenHash
        );
        if (!isValid) throw new AppError("Token inválido", 404);

        return tokenHash;
      },
      "Erro ao verificar token",
      "auth/services/service.auth.ts/getByIdTokenVerification"
    );
  }

  private async updateAuthentication(user_id: string): Promise<authInsert> {
    return this.execute(
      async () => {
        const tokenUpdated = await this.repo.updateAuthenticationToken(user_id);
        if (!tokenUpdated)
          throw new AppError("Erro ao atualizar o token de verificação", 400);

        const updatedUser = await this.repo.updateAuthenticationUser(
          user_id,
          new Date(),
          "ativo"
        );
        if (!updatedUser)
          throw new AppError("Erro ao atualizar autenticação de usuário", 400);

        return updatedUser;
      },
      "Erro ao atualizar autenticação",
      "auth/services/service.auth.ts/updateAuthentication"
    );
  }

  private async updatePasswordUser(
    email: string,
    passwordHash: string
  ): Promise<authInsert> {
    return this.execute(
      () => this.repo.updatePassword(email, passwordHash),
      "Erro ao atualizar a senha",
      "auth/services/service.auth.ts/updatePasswordUser"
    );
  }
}
