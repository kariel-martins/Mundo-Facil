import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { stores } from "../../../database/schema.database";

// Entidade completa (registro do banco)
export type Store = InferSelectModel<typeof stores>;

// DTO para criação (não inclui id, createdAt, updatedAt)
export type StoreInsert = InferInsertModel<typeof stores>;

// DTO para atualização parcial
export type StoreUpdate = Partial<StoreInsert>;
