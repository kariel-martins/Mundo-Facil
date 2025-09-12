import { AppError } from "../../../errors/AppErro";
import { Order, OrderInsert, OrderUpdate } from "../dtos/order.type.dto";
import { OrderRepository } from "../repositories/order.repository";

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

  public async createOrder(data: OrderInsert): Promise<Order> {
    return this.execute(
      async () => {
        const order = await this.repo.createOrder(data);
        if (!order) throw new AppError("Erro ao criar pedido", 400);
        return order;
      },
      "Erro ao criar pedido",
      "orders/services/order.service.ts/createOrder"
    );
  }

  public async getByIdOrder(order_id: string): Promise<Order> {
    return this.execute(
      async () => {
        const order = await this.repo.findOrder(order_id);
        if (!order) throw new AppError("Não foi possível buscar o produto", 400);
        return order;
      },
      "Erro ao buscar pedido",
      "orders/services/order.service.ts/getByIdOrder"
    );
  }

  public async getAllOrders(): Promise<Order[]> {
    return this.execute(
      async () => {
        return await this.repo.findAllOrders();
      },
      "Erro ao buscar pedidos",
      "orders/services/order.service.ts/getAllOrders"
    );
  }

  public async updateOrder(
    order_id: string,
    data: OrderUpdate
  ): Promise<Order> {
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

  public async deleteOrder(order_id: string): Promise<Order> {
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
