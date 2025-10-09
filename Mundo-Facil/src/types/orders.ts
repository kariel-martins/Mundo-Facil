import type { CartRequest } from "./carts";

export type OrderResponce = {
 orders: {
        id: string;
        user_id: string;
        status: string;
        total: string;
        created_at: Date;
    };
    stores: {
        email: string;
        boss_id: string;
        storeName: string;
        id?: string | undefined;
        created_at?: Date | undefined;
        rating?: number | null | undefined;
    };
    products: {
        store_id: string;
        productName: string;
        category: string;
        price: string;
        image: string;
        id?: string | undefined;
        created_at?: Date | undefined;
        rating?: number | null | undefined;
        description?: string | null | undefined;
        estoque?: number | undefined;
    };
    carts: {
        user_id: string;
        product_id: string;
        id?: string | undefined;
        created_at?: Date | undefined;
        quantity?: number | undefined;
    };
};
export type OrderRequest = {
  user_id: string;
  status?: string;
  total: number;
  carts: CartRequest[]
};
