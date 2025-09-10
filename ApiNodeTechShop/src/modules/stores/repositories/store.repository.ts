import { and, eq } from "drizzle-orm";
import { db } from "../../../database/client.database";
import { AppError } from "../../../errors/AppErro";
import { StoreInsert } from "../dtos/types.store.dto";
import { stores } from "../../../database/schema.database";

export class StoreRepository {
  //helper para centralizer erros
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

  public async create(data: StoreInsert): Promise<StoreInsert> {
    return this.execute(
      async () => {
        const result = await db.insert(stores).values(data).returning();
        return result[0];
      },
      "Erro ao criar Produto",
      "auth/repositories/products.repository.ts/create"
    );
  }

  public async getById(store_id: string): Promise<StoreInsert> {
    return this.execute(
      async () => {
        const result = await db
          .select()
          .from(stores)
          .where(eq(stores.id, store_id));
        return result[0];
      },
      "Error ao buscar o Produto",
      "auth/repositories/products.repository.ts/getById"
    );
  }
  public async getStore(name: string, email: string): Promise<StoreInsert> {
    return this.execute(
      async () => {
        const result = await db
          .select()
          .from(stores)
          .where(and(eq(stores.email, email), eq(stores.storeName, name)));
        return result[0];
      },
      "Error ao buscar o Produto",
      "auth/repositories/products.repository.ts/getById"
    );
  }

  public async getAll(): Promise<StoreInsert[]> {
    return this.execute(
      async () => {
        const result = await db.select().from(stores);
        return result;
      },
      "Error ao buscar o Produto",
      "auth/repositories/products.repository.ts/getAll"
    );
  }

  public async update(
    store_id: string,
    data: StoreInsert
  ): Promise<StoreInsert> {
    return this.execute(
      async () => {
        const result = await db
          .update(stores)
          .set(data)
          .where(eq(stores.id, store_id))
          .returning();
        return result[0];
      },
      "Error ao atualizar o Produto",
      "auth/repositories/products.repository.ts/update"
    );
  }

  public async delete(store_id: string): Promise<StoreInsert> {
    return this.execute(
      async () => {
        const result = await db
          .delete(stores)
          .where(eq(stores.id, store_id))
          .returning();
        return result[0];
      },
      "Error ao deletar o Produto",
      "auth/repositories/products.repository.ts/delete"
    );
  }
}
