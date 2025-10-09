import { eq } from "drizzle-orm";
import { db } from "../../../database/client.database";
import {
  order_items,
  orders,
} from "../../../database/schema.database";
import {
  insertOrder,
  insertOrderProduct,
  Order,
  OrderItems,
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
  public async createOrder(data: insertOrder): Promise<Order> {
    return this.execute(
      async () => {
        const [result] = await db.insert(orders).values(data).returning();
        return result;
      },
      "Erro ao cadastrar o pedido",
      "payment/repositories/createOrder"
    );
  }

  public async createOrderProduct(data: insertOrderProduct): Promise<OrderItems[]> {
    return this.execute(
      async ()=> {
        const result = await db.insert(order_items).values(data).returning()
        return result
      }, "Erro ao inserir items ao pedido","payment/repositories/createOrderProduct"
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
