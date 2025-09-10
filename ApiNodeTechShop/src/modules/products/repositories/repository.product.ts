import { eq } from "drizzle-orm";
import { db } from "../../../database/client.database";
import { products, stores } from "../../../database/schema.database";
import { AppError } from "../../../errors/AppErro";
import { ProductInsert, productStore } from "../dtos/types.dto.product";


export class ProductRepository {
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

  public async create(data: ProductInsert): Promise<productStore> {
    return this.execute(
      async () => {
        const [newProduct] = await db.insert(products).values(data).returning();
        const result = await db
          .select()
          .from(products)
          .innerJoin(stores, eq(products.store_id, stores.id))
          .where(eq(products.id, newProduct.id));
        return result[0];
      },
      "Erro ao criar Produto",
      "auth/repositories/products.repository.ts/create"
    );
  }

  public async getById(product_id: string): Promise<ProductInsert> {
    return this.execute(
      async () => {
        const result = await db
          .select()
          .from(products)
          .where(eq(products.id, product_id));
        return result[0];
      },
      "Error ao buscar o Produto",
      "auth/repositories/products.repository.ts/getById"
    );
  }

  public async getAll(): Promise<ProductInsert[]> {
    return this.execute(
      async () => {
        const result = await db.select().from(products);
        return result;
      },
      "Error ao buscar o Produto",
      "auth/repositories/products.repository.ts/getAll"
    );
  }

  public async update(
    product_id: string,
    data: ProductInsert
  ): Promise<ProductInsert> {
    return this.execute(
      async () => {
        const result = await db
          .update(products)
          .set(data)
          .where(eq(products.id, product_id))
          .returning();
        return result[0];
      },
      "Error ao atualizar o Produto",
      "auth/repositories/products.repository.ts/update"
    );
  }

  public async delete(product_id: string): Promise<ProductInsert> {
    return this.execute(
      async () => {
        const result = await db
          .delete(products)
          .where(eq(products.id, product_id))
          .returning();
        return result[0];
      },
      "Error ao deletar o Produto",
      "auth/repositories/products.repository.ts/delete"
    );
  }
}
