import { eq } from "drizzle-orm";
import { db } from "../../../database/client.database";
import { AppError } from "../../../errors/AppErro";
import { orders, products, stores } from "../../../database/schema.database";
import { Order, OrderInsert, OrderProducts, OrderStoreProducts, OrderUpdate } from "../dtos/order.type.dto";

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

  public async createOrder(data: OrderInsert): Promise<OrderStoreProducts> {
    return this.execute(
      async () => {
        const [newOrder] = await db.insert(orders).values(data).returning();
        const [result] = await db.select().from(orders).innerJoin(stores, eq(orders.store_id, stores.id)).innerJoin(products, eq(orders.product_id, products.id)).where(eq(orders.id, newOrder.id))
        return result;
      },
      "Erro ao criar pedido",
      "orders/repositories/order.repository.ts/createOrder"
    );
  }

  public async findAllOrders(user_id: string): Promise<OrderProducts[]> {
    return this.execute(
      async () => {
        const result = await db.select().from(orders).innerJoin(products, eq(products.id, orders.product_id)).where(eq(orders.user_id, user_id));
        return result;
      },
      "Nenhum pedido encontrado",
      "orders/repositories/order.repository.ts/findAllOrders",
      true // Permitir retorno vazio sem erro
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
