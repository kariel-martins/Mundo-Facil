import type { CartRequest } from "./carts";

export type OrderResponce = {
    id: string;
    status: string;
    created_at: string;
    total: string;
  };
export type OrderRequest = {
  user_id: string;
  status?: string;
  total: number;
  carts: CartRequest[];
};

export type OrderItems = {
    order_items: {
        id: string;
        price: string;
        product_id: string;
        quantity: number;
        order_id: string;
    };
    products: {
        id: string;
        created_at: Date;
        store_id: string;
        rating: number | null;
        productName: string;
        category: string;
        price: string;
        description: string | null;
        estoque: number;
        image: string;
    };
}