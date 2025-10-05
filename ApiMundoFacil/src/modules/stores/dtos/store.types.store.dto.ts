import { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { stores } from "../../../database/schema.database";

export type Store = InferSelectModel<typeof stores>;

export type StoreInsert = InferInsertModel<typeof stores>;


export type StoreUpdate = Partial<StoreInsert>;
