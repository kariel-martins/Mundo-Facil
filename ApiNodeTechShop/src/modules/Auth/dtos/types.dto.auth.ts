import { InferInsertModel } from "drizzle-orm";
import { emailVerifications, users } from "../../../database/schema.database";

export type authInsert = InferInsertModel<typeof users>

export type emailVerification = InferInsertModel<typeof emailVerifications>