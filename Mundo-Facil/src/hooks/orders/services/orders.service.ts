import { axiosInstance } from "@/lib/axios";
import type { OrderResponce } from "@/types/orders";

export class OrderServices {

  async getAll(users_id: string): Promise<OrderResponce[]> {
    const result = await axiosInstance.get(`/orders/${users_id}`);
    return result.data;
  }

  async getById(order_id: string): Promise<OrderResponce[]> {
    const result = await axiosInstance.get(`/orders/${order_id}`);
    return result.data;
  }

  async update(data: { order_id: string; status: string }): Promise<OrderResponce> {
    const result = await axiosInstance.put(
      `/orders/${data.order_id}`,
      data.status
    );
    return result.data;
  }

  async remove(order_id: string): Promise<OrderResponce> {
    const result = await axiosInstance.delete(`/orders/${order_id}`);
    return result.data;
  }
}
