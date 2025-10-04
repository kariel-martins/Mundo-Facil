import { axiosInstance } from "@/lib/axios";
import type { CartRequest, CartResponce } from "@/types/carts";

export class CartService {
  public async getCart(user_id: string): Promise<CartRequest[]> {
    const result = await axiosInstance.get(`/carts/${user_id}`);
    return result.data;
  }

  public async create(data: CartResponce): 
  Promise<CartRequest> {
    const result = await axiosInstance.post("/carts", data);
    return result.data;
  }

  public async update({cart_id, quantity}: {cart_id: string, quantity: number}): Promise<CartRequest> {
    const result = await axiosInstance.put(`/carts/${cart_id}`, {quantity});
    return result.data;
  }

  public async remove(cart_id: string): Promise<CartRequest> {
    const result = await axiosInstance.delete(`/carts/${cart_id}`);
    return result.data;
  }
}
