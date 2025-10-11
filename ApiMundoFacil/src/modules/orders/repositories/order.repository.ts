import { eq } from "drizzle-orm";
import { db } from "../../../database/client.database";
import { AppError } from "../../../errors/AppErro";
import { order_items, orders, products } from "../../../database/schema.database";
import { Order, OrderItems, OrderUpdate } from "../dtos/order.type.dto";

export class OrderRepository {
  private async execute<T>(
    fn: () => Promise<T>,
    message: string,
    context: string,
    allowEmpty = false
  ): Promise<T> {
    try {
      const result = await fn();

      if (
        (!result || (Array.isArray(result) && result.length === 0)) &&
        !allowEmpty
      ) {
        throw new AppError(message, 404, context);
      }

      return result;
    } catch (error: any) {
      console.error(`Erro em ${context}:`, error?.message, error?.stack);
      if (error instanceof AppError) throw error;
      throw new AppError(message, 500, context);
    }
  }
  
  public async findAllOrders(user_id: string): Promise<Order[]> {
    return this.execute(
      async () => {
        const result = await db.select().from(orders).where(eq(orders.user_id, user_id))
        return result;
      },
      "Nenhum pedido encontrado",
      "orders/repositories/order.repository.ts/findAllOrders",
      true
    );
  }

  public async findAllOrdersItems(order_id: string): Promise<OrderItems[]> {
    return this.execute(
      async () => {
        const result = await db.select().from(order_items).where(eq(order_items.order_id, order_id)).innerJoin(products, eq(products.id, order_items.product_id));
        return result;
      },
      "Nenhum pedido encontrado",
      "orders/repositories/order.repository.ts/findAllOrders",
      true
    );
  }

  public async updateOrder(
    order_id: string,
    data: OrderUpdate
  ): Promise<Order | null> {
    return this.execute(
      async () => {
        const [order] = await db
          .update(orders)
          .set(data)
          .where(eq(orders.id, order_id))
          .returning();
        return order ?? null;
      },
      "Não foi possível atualizar o pedido",
      "orders/repositories/order.repository.ts/updateOrder"
    );
  }

  public async deleteOrder(order_id: string): Promise<Order | null> {
    return this.execute(
      async () => {
        const [order] = await db
          .delete(orders)
          .where(eq(orders.id, order_id))
          .returning();
        return order ?? null;
      },
      "Não foi possível deletar o pedido",
      "orders/repositories/order.repository.ts/deleteOrder"
    );
  }
}
