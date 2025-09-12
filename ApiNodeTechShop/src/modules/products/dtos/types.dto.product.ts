import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { products, stores } from "../../../database/schema.database";

// Produto completo (registro do banco)
export type Product = InferSelectModel<typeof products>;

// DTO para criação (não inclui id, createdAt, updatedAt)
export type ProductInsert = InferInsertModel<typeof products>;

// DTO para atualização parcial
export type ProductUpdate = Partial<ProductInsert>;

// Estrutura quando fazemos join de produto com loja
export type productStore = {
  products: Product;
  stores: InferSelectModel<typeof stores>;
};