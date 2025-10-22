import { eq } from "drizzle-orm";
import { db } from "../../../database/client.database";
import {
  carts,
  order_items,
  orders,
  products,
  users,
} from "../../../database/schema.database";
import {
  cartsProducts,
  insertOrder,
  insertOrderProduct,
  Order,
  OrderItems,
  OrderUsers,
  updateOrder,
} from "../dtos/payment.types.dto";
import { AppError } from "../../../errors/AppErro";

export class PaymentRepository {
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
  public async createOrder(data: insertOrder): Promise<OrderUsers> {
    return this.execute(
      async () => {
        const [newOrder] = await db.insert(orders).values(data).returning();
        const [result] = await db.select().from(orders).where(eq(orders.id, newOrder.id)).innerJoin(users, eq(users.id, newOrder.user_id))
        return result;
      },
      "Erro ao cadastrar o pedido",
      "payment/repositories/createOrder"
    );
  }

  public async createOrderProduct(data: insertOrderProduct): Promise<OrderItems[]> {
    return this.execute(
      async ()=> {
        console.log("dados passadoa para order_items",data)
        const result = await db.insert(order_items).values(data).returning()
        console.log("resultado de order_items", result)
        return result
      }, "Erro ao inserir items ao pedido","payment/repositories/createOrderProduct"
    )

  }

  public async getAllCarts(cart_id: string): Promise< cartsProducts >  {
    return this.execute(
      async ()=> {
        const [result] = await db.select().from(carts).where(eq(carts.id, cart_id)).innerJoin(products, eq(products.id, carts.product_id))
        return result
      }, "Erro ao processar getAllCarts", "payment/repositories/getAllCarts"
    )
  }
  public async update(order_id: string, data: updateOrder): Promise<Order> {
    return this.execute(
      async () => {
      const [result] = await db
        .update(orders)
        .set(data)
        .where(eq(orders.id, order_id))
        .returning();
      return result;
    }, "Erro ao atualizar o pedido",
        "payment/payment.repository/update"
      );
    }
}
