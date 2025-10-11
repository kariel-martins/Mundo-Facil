import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { carts, order_items, orders, products, stores, users } from "../../../database/schema.database";

export type Order = InferSelectModel<typeof orders>;

export type OrderInsert = InferInsertModel<typeof orders>;

export type OrderUpdate = Partial<OrderInsert>;

export type OrderProductsUsersCarts = {
  orders: Order;
  products: InferInsertModel<typeof products>;
  users: InferInsertModel<typeof users>;
  carts: InferInsertModel<typeof carts>;
};

export type OrderItems = {
  order_items: InferSelectModel<typeof order_items>;
  products: InferSelectModel<typeof products>
}
