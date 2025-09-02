import { eq } from "drizzle-orm";
import { db } from "../../../database/client.database";
import { emailVerifications, users } from "../../../database/schema.database";
import { AppError } from "../../../errors/AppErro";
import { authInsert, emailVerification } from "../dtos/types.dto.auth";

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
    token: string, time: Date
  ): Promise<emailVerification | null> {
    try {
      const auth = await db.insert(emailVerifications).values({tokenHash: token, expiresAt: time}).returning();
      return auth[0] ?? null;
    } catch {
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
  async findTokenVerication(userId: string): Promise<emailVerification | null> {
    try {
      const auth = await db
        .select()
        .from(emailVerifications)
        .where(eq(emailVerifications.userId, userId));
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
  async updateUser(
    email: string,
    email_verified_at: Date, status: string
  ): Promise<authInsert | null> {
    try {
      const auth = await db
        .update(users)
        .set({ email_verified_at, status})
        .where(eq(users.email, email))
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
  async updateAutetication(userId: string, expiresAt: Date, consumeAt: Date): Promise<emailVerification | null> {
 try {
      const auth = await db
        .update(emailVerifications)
        .set({expiresAt, consumeAt})
        .where(eq(emailVerifications.userId, userId))
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
        .delete(emailVerifications)
        .where(eq(emailVerifications.userId, userId))
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
