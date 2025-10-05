import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { products, stores } from "../../../database/schema.database";

export type Product = InferSelectModel<typeof products>;

export type ProductInsert = InferInsertModel<typeof products>;

export type ProductUpdate = Partial<ProductInsert>;

export type productStore = {
  products: Product;
  stores: InferSelectModel<typeof stores>;
};