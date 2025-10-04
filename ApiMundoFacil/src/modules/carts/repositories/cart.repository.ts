import { eq } from "drizzle-orm";
import { db } from "../../../database/client.database";
import { AppError } from "../../../errors/AppErro";
import { Cart, CartInsert, CartWithProduct, UpdateCart } from "../dtos/cart.type.dto";
import { carts, products } from "../../../database/schema.database";

export class CartRepository {
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

  public async create(data: CartInsert): Promise<Cart> {
      return this.execute(
        async () => {
          const result = await db.insert(carts).values(data).returning()
          return result[0];
        },
        "Erro ao criar Produto",
        "auth/repositories/products.repository.ts/create"
      );
    }

  public async findCart(user_id: string): Promise<CartWithProduct[]> {
    return this.execute(
        async ()=> {
            const result = await db.select().from(carts).innerJoin(products, eq(products.id, carts.product_id)).where(eq(carts.user_id, user_id))
            if (!result) throw new AppError("carrinho não encontrado",404)
            return result
        }, "Erro ao buscar o carrinho",
        "carts/repositories/cart.repository.ts/findCart"
    )
  }

  public async updateCart(cart_id: string, data: CartInsert): Promise<UpdateCart> {
    return this.execute(
        async ()=> {
            const result = await db.update(carts).set(data).where(eq(carts.id, cart_id)).returning()
              if (!result) throw new AppError("Não foi possível atualizar o carrinho",404)
            return result[0]
        }, "Erro ao atualizar o carrinhos",
         "carts/repositories/cart.repository.ts/findCart"
    )
  }

  public async deleteCart(cart_id: string): Promise<Cart> {
    return this.execute(
        async ()=> {
            const result = await db.delete(carts).where(eq(carts.id, cart_id)).returning()
            if (!result) throw new AppError("Não foi possível deletar o carrinho",404)
            return result[0]
        }, "Erro ao deletar o carrinho",
        "carts/repositories/cart.repository.ts/findCart"
    )
  }
}
