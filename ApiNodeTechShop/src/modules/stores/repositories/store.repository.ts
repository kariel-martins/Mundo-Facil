import { and, eq } from "drizzle-orm";
import { db } from "../../../database/client.database";
import { stores } from "../../../database/schema.database";
import { AppError } from "../../../errors/AppErro";
import { Store, StoreInsert, StoreUpdate } from "../dtos/store.types.store.dto";

export class StoreRepository {
  // helper para centralizar erros
  private async execute<T>(
    fn: () => Promise<T>,
    message: string,
    context: string,
    allowEmpty = false
  ): Promise<T> {
    try {
      const result = await fn();
      if (!result || (Array.isArray(result) && result.length === 0)) {
        if (!allowEmpty) {
          throw new AppError(message, 404, context);
        }
      }
      return result;
    } catch (error: any) {
      console.error(`Erro em ${context}:`, error?.message, error?.stack);
      if (error instanceof AppError) throw error;
      throw new AppError(message, 500, context);
    }
  }

  public async create(data: StoreInsert): Promise<Store> {
    return this.execute(
      async () => {
        const [newStore] = await db.insert(stores).values(data).returning();
        return newStore;
      },
      "Erro ao criar loja",
      "stores/repositories/store.repository.ts/create"
    );
  }

  public async getById(store_id: string): Promise<Store> {
    return this.execute(
      async () => {
        const [result] = await db.select().from(stores).where(eq(stores.id, store_id));
        return result;
      },
      "Erro ao buscar loja",
      "stores/repositories/store.repository.ts/getById"
    );
  }
  public async getStore(email: string , storeName: string): Promise<Store> {
    return this.execute(
      async () => {
        const result = await db.select().from(stores).where(and(eq(stores.email, email), eq(stores.storeName, storeName)));
        return result[0];
      },
      "Erro ao buscar loja",
      "stores/repositories/store.repository.ts/getStore"
    );
  }

  public async getAll(): Promise<Store[]> {
    return this.execute(
      async () => {
        return await db.select().from(stores);
      },
      "Erro ao buscar lojas",
      "stores/repositories/store.repository.ts/getAll",
      true // permite retornar []
    );
  }

  public async update(store_id: string, data: StoreUpdate): Promise<Store> {
    return this.execute(
      async () => {
        const [result] = await db
          .update(stores)
          .set(data)
          .where(eq(stores.id, store_id))
          .returning();
        return result;
      },
      "Erro ao atualizar loja",
      "stores/repositories/store.repository.ts/update"
    );
  }

  public async delete(store_id: string): Promise<Store> {
    return this.execute(
      async () => {
        const [result] = await db.delete(stores).where(eq(stores.id, store_id)).returning();
        return result;
      },
      "Erro ao deletar loja",
      "stores/repositories/store.repository.ts/delete"
    );
  }
}
