import { AppError } from "../../../errors/AppErro";
import { Order, OrderUpdate, OrderItems } from "../dtos/order.type.dto";
import { OrderRepository } from "../repositories/order.repository";

type OrderResponce = Omit<Order, "user_id">

export class OrderService {
  private repo = new OrderRepository();

  private async execute<T>(
    fn: () => Promise<T>,
    message: string,
    context: string
  ): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      console.error(`Erro em ${context}:`, error);
      if (error instanceof AppError) throw error;
      throw new AppError(message, 500, context);
    }
  }

  public async getAllOrders(user_id: string): Promise<OrderResponce[]> {
    return this.execute(
      async () => {
        return await this.repo.findAllOrders(user_id);
      },
      "Erro ao buscar pedidos",
      "orders/services/order.service.ts/getAllOrders"
    );
  }

  public async getAllOrdersItems(order_id: string): Promise<OrderItems[]> {
    return this.execute(
      async () => {
        return await this.repo.findAllOrdersItems(order_id);
      },
      "Erro ao buscar pedidos",
      "orders/services/order.service.ts/getAllOrders"
    );
  }

  public async updateOrder(
    order_id: string,
    data: OrderUpdate
  ): Promise<OrderResponce> {
    return this.execute(
      async () => {
        const order = await this.repo.updateOrder(order_id, data);
        if (!order) throw new AppError("Não foi possível atualizar o produto", 400);
        return order;
      },
      "Erro ao atualizar pedido",
      "orders/services/order.service.ts/updateOrder"
    );
  }

  public async deleteOrder(order_id: string): Promise<OrderResponce> {
    return this.execute(
      async () => {
        const order = await this.repo.deleteOrder(order_id);
        if (!order) throw new AppError("Não foi possível deletar", 400);
        return order;
      },
      "Erro ao deletar pedido",
      "orders/services/order.service.ts/deleteOrder"
    );
  }
}
