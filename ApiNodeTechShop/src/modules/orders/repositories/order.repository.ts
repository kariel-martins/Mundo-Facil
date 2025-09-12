import { eq } from "drizzle-orm";
import { db } from "../../../database/client.database";
import { AppError } from "../../../errors/AppErro";
import { orders } from "../../../database/schema.database";
import { Order, OrderInsert, OrderUpdate } from "../dtos/order.type.dto";

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

  public async createOrder(data: OrderInsert): Promise<Order> {
    return this.execute(
      async () => {
        const [order] = await db.insert(orders).values(data).returning();
        return order;
      },
      "Erro ao criar pedido",
      "orders/repositories/order.repository.ts/createOrder"
    );
  }

  public async findOrder(order_id: string): Promise<Order | null> {
    return this.execute(
      async () => {
        const [order] = await db
          .select()
          .from(orders)
          .where(eq(orders.id, order_id));
        return order ?? null;
      },
      "Pedido não encontrado",
      "orders/repositories/order.repository.ts/findOrder"
    );
  }

  public async findAllOrders(): Promise<Order[]> {
    return this.execute(
      async () => {
        const result = await db.select().from(orders);
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
