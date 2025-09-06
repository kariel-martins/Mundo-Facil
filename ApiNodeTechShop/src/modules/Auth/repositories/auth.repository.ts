import { and, eq, isNull } from "drizzle-orm";
import { db } from "../../../database/client.database";
import { email_verifications, users } from "../../../database/schema.database";
import { AppError } from "../../../errors/AppErro";
import { authInsert, emailVerification } from "../dtos/types.dto.auth";
import crypto from "crypto"

export class AuthRepository {
  async create(data: authInsert): Promise<authInsert | null> {
    try {
      const auth = await db.insert(users).values(data).returning();
      return auth[0] ?? null;
    } catch (err) {
      console.error(err)
      throw new AppError(
        "Error ao criar o usuáiro",
        500,
        "aut/repositeries/auth.repository.ts/create"
      );
    }
  }
  async emailVerificationCreate(
    tokenHash: string, time: Date, user_id: string
  ): Promise<emailVerification | null> {
    try {
      const auth = await db.insert(email_verifications).values({tokenHash, expires_at: time, user_id}).returning();
      return auth[0] ?? null;
    } catch(err: any) {
      console.error("Erro ao salvar token:", err.message, err.stack);
      throw new AppError(
        "Error ao criar token de verificação",
        500,
        "aut/repositeries/auth.repository.ts/emailVerificationCreate"
      );
    }
  }
  async findByEmail(email: string): Promise<authInsert | null> {
    try {
      const auth = await db.select().from(users).where(eq(users.email, email));
      return auth[0] ?? null;
    } catch {
      throw new AppError(
        "Error ao busca o usuário",
        500,
        "aut/repositeries/auth.repository.ts/findByEmail"
      );
    }
  }
  async findByIdTokenVerication(user_id: string): Promise<emailVerification | null> {
    try {
      const auth = await db
        .select()
        .from(email_verifications)
        .where(eq(email_verifications.user_id, user_id));
      return auth[0] ?? null;
    } catch {
      throw new AppError(
        "Error ao busca o token de verificação",
        500,
        "aut/repositeries/auth.repository.ts/findTokenVerication"
      );
    }
  }
  async updatePassword(
    email: string,
    passwordHash: string
  ): Promise<authInsert | null> {
    try {
      const auth = await db
        .update(users)
        .set({ passwordHash })
        .where(eq(users.email, email))
        .returning();
      return auth[0] ?? null;
    } catch {
      throw new AppError(
        "Error ao atualizar a senha do usuário",
        500,
        "auth/auth.repositories.ts/updatePassword"
      );
    }
  }
  async updateAutenticationUser(
    user_id: string,
    email_verified_at: Date, status: string
  ): Promise<authInsert | null> {
    try {
      const auth = await db
        .update(users)
        .set({ email_verified_at, status})
        .where(eq(users.id, user_id))
        .returning();
      return auth[0] ?? null;
    } catch {
      throw new AppError(
        "Error ao autalizar o usuário",
        500,
        "auth/auth.repositories.ts/updatePassword"
      );
    }
  }
  async updateAuteticationToken(user_id: string): Promise<emailVerification | null> {
 try {
      const auth = await db
        .update(email_verifications)
        .set({consumed_at: new Date()})
        .where(and(eq(email_verifications.user_id, user_id), isNull(email_verifications.consumed_at)))
        .returning();
      return auth[0] ?? null;
    } catch {
      throw new AppError(
        "Error ao autalizar o usuário",
        500,
        "auth/auth.repositories.ts/updatePassword"
      );
    }
  }
  async removeTokenUser(userId: string) {
    try {
      const auth = await db
        .delete(email_verifications)
        .where(eq(email_verifications.user_id, userId))
        .returning();
      return auth[0] ?? null;
    } catch {
      throw new AppError(
        "Erro ao remove token de verificação",
        500,
        "auth/auth.repositories.ts/removeTokenUser"
      );
    }
  }
}
