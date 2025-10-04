import { eq } from "drizzle-orm";
import { db } from "../../../database/client.database";
import { users } from "../../../database/schema.database";
import { AppError } from "../../../errors/AppErro";
import { User, UserInsert, UserUpdate } from "../dtos/user.type.dto";

export class UserRepository {
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

  public async findUser(user_id: string): Promise<User> {
    return this.execute(
        async ()=> {
            const [result] = await db.select().from(users).where(eq(users.id, user_id))
            return result
        }, "Erro ao buscar o usuario",
        "users/repositories/users.repository.ts/findUser"
    )
  }

  public async findAllUser(): Promise<User[]> {
    return this.execute(
        async ()=> {
            const results = await db.select().from(users)
            return results
        }, "Erro ao buscar o usuarios",
        "users/repositories/users.repository.ts/findAllUser"
    )
  }

  public async updateUser(user_id: string, data: UserUpdate): Promise<User> {
    return this.execute(
        async ()=> {
            const result = await db.update(users).set(data).where(eq(users.id, user_id)).returning()
            return result[0]
        }, "Erro ao atualizar o usuario",
         "users/repositories/users.repository.ts/findUser"
    )
  }

  public async deleteUser(user_id: string): Promise<User> {
    return this.execute(
        async ()=> {
            const result = await db.delete(users).where(eq(users.id, user_id)).returning()
            return result[0]
        }, "Erro ao deletar o usuario",
        "users/repositories/users.repository.ts/findUser"
    )
  }
}
