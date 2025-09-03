import { InferInsertModel } from "drizzle-orm";
import { email_Verifications, users } from "../../../database/schema.database";

export type authInsert = InferInsertModel<typeof users>

export type emailVerification = InferInsertModel<typeof email_Verifications>