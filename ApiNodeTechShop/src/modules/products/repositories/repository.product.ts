import { eq } from "drizzle-orm";
import { db } from "../../../database/client.database";
import { products, stores } from "../../../database/schema.database";
import { AppError } from "../../../errors/AppErro";
import { Product, ProductInsert, ProductUpdate, productStore } from "../dtos/types.dto.product";
import { Store } from "../../stores/dtos/store.types.store.dto";

export class ProductRepository {
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

  public async create(data: ProductInsert): Promise<productStore> {
    return this.execute(
      async () => {
        const [newProduct] = await db.insert(products).values(data).returning();
        const [result] = await db
          .select()
          .from(products)
          .innerJoin(stores, eq(products.store_id, stores.id))
          .where(eq(products.id, newProduct.id));
        return result;
      },
      "Erro ao criar produto",
      "products/repositories/products.repository.ts/create"
    );
  }

  public async getStore(store_id: string): Promise<Store> {
    return this.execute(
      async () => {
        const [result] = await db
          .select()
          .from(stores)
          .where(eq(stores.id, store_id));
        return result;
      },
      "Erro ao buscar loja",
      "products/repositories/products.repository.ts/getStore"
    );
  }

  public async getById(product_id: string): Promise<Product> {
    return this.execute(
      async () => {
        const [result] = await db
          .select()
          .from(products)
          .where(eq(products.id, product_id));
        return result;
      },
      "Erro ao buscar produto",
      "products/repositories/products.repository.ts/getById"
    );
  }

  public async getAll(): Promise<Product[]> {
    return this.execute(
      async () => {
        return await db.select().from(products);
      },
      "Erro ao buscar produtos",
      "products/repositories/products.repository.ts/getAll",
      true // aceita array vazio
    );
  }

  public async update(product_id: string, data: ProductUpdate): Promise<Product> {
    return this.execute(
      async () => {
        const [result] = await db
          .update(products)
          .set(data)
          .where(eq(products.id, product_id))
          .returning();
        return result;
      },
      "Erro ao atualizar produto",
      "products/repositories/products.repository.ts/update"
    );
  }

  public async delete(product_id: string): Promise<Product> {
    return this.execute(
      async () => {
        const [result] = await db
          .delete(products)
          .where(eq(products.id, product_id))
          .returning();
        return result;
      },
      "Erro ao deletar produto",
      "products/repositories/products.repository.ts/delete"
    );
  }
}
