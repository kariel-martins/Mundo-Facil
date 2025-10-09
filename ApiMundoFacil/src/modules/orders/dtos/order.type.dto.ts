import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { carts, orders, products, stores, users } from "../../../database/schema.database";

export type Order = InferSelectModel<typeof orders>;

export type OrderInsert = InferInsertModel<typeof orders>;

export type OrderUpdate = Partial<OrderInsert>;

export type OrderStoreProductsCarts = {
  orders: Order;
  stores: InferInsertModel<typeof stores>;
  products: InferInsertModel<typeof products>;
  carts:  InferInsertModel<typeof carts>;
};

export type OrderProductsUsersCarts = {
  orders: Order;
  products: InferInsertModel<typeof products>;
  users: InferInsertModel<typeof users>;
  carts: InferInsertModel<typeof carts>;
};
