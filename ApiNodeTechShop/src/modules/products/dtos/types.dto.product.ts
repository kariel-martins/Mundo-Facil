import { InferInsertModel } from "drizzle-orm";
import { products } from "../../../database/schema.database";

export type ProductInsert = InferInsertModel<typeof products>

export type productStore = {
  products: {
    id: string;
    productName: string;
    price: number;
    store_id: string;
    image: string;
    estoque: number;
    created_at: Date;
  };
  stores: {
    id: string;
    boss_id: string;
    storeName: string;
    email: string;
    created_at: Date;
  };
};
