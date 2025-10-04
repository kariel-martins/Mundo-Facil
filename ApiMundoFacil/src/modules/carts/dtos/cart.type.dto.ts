import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { carts, products } from "../../../database/schema.database";

export type CartInsert = InferInsertModel<typeof carts>

export type Cart = InferSelectModel<typeof carts>

export type UpdateCart = Partial<InferInsertModel<typeof carts>>

export type Product = InferSelectModel<typeof products>


export type CartWithProduct = {
  carts: Cart,
  products: Product
}
