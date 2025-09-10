import { and, eq, isNull } from "drizzle-orm";
import { db } from "../../../database/client.database";
import { email_verifications, users } from "../../../database/schema.database";
import { AppError } from "../../../errors/AppErro";
import { authInsert, emailVerification } from "../dtos/types.dto.auth";

export class AuthRepository {
  // helper para centralizar erros
  private async execute<T>(
    fn: () => Promise<T | undefined>,
    message: string,
    context: string
  ): Promise<T> {
    try {
      const result = await fn();
      if (!result) {
        throw new AppError(message, 404, context);
      } 
      return result;
    } catch (error: any) {
      console.error(`Erro em ${context}:`, error?.message, error?.stack);
      if (error instanceof AppError) throw error;
      throw new AppError(message, 500, context);
    }
  }

  async create(data: authInsert): Promise<authInsert> {
    return this.execute(
      async () => {
        const result = await db.insert(users).values(data).returning();
        return result[0];
      },
      "Erro ao criar o usuário",
      "auth/repositories/auth.repository.ts/create"
    );
  }

  async emailVerificationCreate(
    tokenHash: string,
    expires_at: Date,
    user_id: string
  ): Promise<emailVerification> {
    return this.execute(
      async () => {
        const result = await db
          .insert(email_verifications)
          .values({ tokenHash, expires_at, user_id })
          .returning();
        return result[0];
      },
      "Erro ao criar token de verificação",
      "auth/repositories/auth.repository.ts/emailVerificationCreate"
    );
  }

  async findByEmail(email: string, status: string): Promise<authInsert> {
    return this.execute(
      async () => {
        const result = await db
          .select()
          .from(users)
          .where(and(eq(users.email, email), eq(users.status, status)));
        return result[0];
      },
      "Usuário não encontrado",
      "auth/repositories/auth.repository.ts/findByEmail"
    );
  }

  async findByIdTokenVerification(user_id: string): Promise<emailVerification> {
    return this.execute(
      async () => {
        const result = await db
          .select()
          .from(email_verifications)
          .where(eq(email_verifications.user_id, user_id));
        return result[0];
      },
      "Token de verificação não encontrado",
      "auth/repositories/auth.repository.ts/findByIdTokenVerification"
    );
  }

  async updatePassword(email: string, passwordHash: string): Promise<authInsert> {
    return this.execute(
      async () => {
        const result = await db
          .update(users)
          .set({ passwordHash })
          .where(eq(users.email, email))
          .returning();
        return result[0];
      },
      "Erro ao atualizar senha do usuário",
      "auth/repositories/auth.repository.ts/updatePassword"
    );
  }

  async updateAuthenticationUser(
    user_id: string,
    email_verified_at: Date,
    status: string
  ): Promise<authInsert> {
    return this.execute(
      async () => {
        const result = await db
          .update(users)
          .set({ email_verified_at, status })
          .where(eq(users.id, user_id))
          .returning();
        return result[0];
      },
      "Erro ao atualizar autenticação do usuário",
      "auth/repositories/auth.repository.ts/updateAuthenticationUser"
    );
  }

  async updateAuthenticationToken(user_id: string): Promise<emailVerification> {
    return this.execute(
      async () => {
        const result = await db
          .update(email_verifications)
          .set({ consumed_at: new Date() })
          .where(
            and(
              eq(email_verifications.user_id, user_id),
              isNull(email_verifications.consumed_at)
            )
          )
          .returning();
        return result[0];
      },
      "Erro ao atualizar token de autenticação",
      "auth/repositories/auth.repository.ts/updateAuthenticationToken"
    );
  }

  async removeTokenUser(userId: string): Promise<emailVerification> {
    return this.execute(
      async () => {
        const result = await db
          .delete(email_verifications)
          .where(eq(email_verifications.user_id, userId))
          .returning();
        return result[0];
      },
      "Erro ao remover token de verificação",
      "auth/repositories/auth.repository.ts/removeTokenUser"
    );
  }
}
