import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { users } from "../../../database/schema.database";

export type UserInsert = InferInsertModel<typeof users>;

export type User = InferSelectModel<typeof users>

export type UserUpdate = Partial<UserInsert>