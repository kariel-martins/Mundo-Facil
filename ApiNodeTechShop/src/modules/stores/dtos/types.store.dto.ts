import { InferInsertModel } from "drizzle-orm";
import { stores } from "../../../database/schema.database";

export type StoreInsert = InferInsertModel<typeof stores>;