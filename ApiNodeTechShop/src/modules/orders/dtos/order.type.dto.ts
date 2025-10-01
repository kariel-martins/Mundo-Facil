import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { orders, products, stores } from "../../../database/schema.database";

export type Order = InferSelectModel<typeof orders>;

export type OrderInsert = InferInsertModel<typeof orders>;

export type OrderUpdate = Partial<OrderInsert>;

export type OrderStoreProducts = {
  orders: Order;
  stores: InferInsertModel<typeof stores>;
  products: InferInsertModel<typeof products>;
};

export type OrderProducts = {
  orders: Order;
  products: InferInsertModel<typeof products>;
};
