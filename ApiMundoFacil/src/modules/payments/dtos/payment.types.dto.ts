import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import {
  carts,
  order_items,
  orders,
  products,
  stores,
  users,
} from "../../../database/schema.database";

export type Order = InferSelectModel<typeof orders>;

export type insertOrder = InferInsertModel<typeof orders>;

export type OrderInsert = InferInsertModel<typeof orders>;

export type updateOrder = Partial<OrderInsert>;

export type insertOrderProduct = InferInsertModel<typeof order_items>;

export type OrderItems = InferSelectModel<typeof order_items>;

export type OrderStoreProductsCarts = {
  orders: Order;
  stores: InferInsertModel<typeof stores>;
  products: InferInsertModel<typeof products>;
  carts: InferInsertModel<typeof carts>;
};

export type OrderUsers = {
  orders: Order;
  users: InferInsertModel<typeof users>;
};

export type OrderProductsUsersCarts = {
  orders: Order;
  products: InferInsertModel<typeof products>;
  users: InferInsertModel<typeof users>;
  carts: InferInsertModel<typeof carts>;
};

export type createOrders = {
  user_id: string;
  status: string;
  total: string;
  carts: [
    {
      carts: InferInsertModel<typeof carts>;
      products: InferInsertModel<typeof products>;
    }
  ];
};
