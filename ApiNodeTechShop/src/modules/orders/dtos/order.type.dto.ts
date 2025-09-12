import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { orders } from "../../../database/schema.database";

export type Order = InferSelectModel<typeof orders>

export type OrderInsert = InferInsertModel<typeof orders>

export type OrderUpdate = Partial<OrderInsert>