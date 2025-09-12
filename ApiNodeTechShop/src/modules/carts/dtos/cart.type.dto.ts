import { InferInsertModel } from "drizzle-orm";
import { carts } from "../../../database/schema.database";

export type CartInsert = InferInsertModel<typeof carts>