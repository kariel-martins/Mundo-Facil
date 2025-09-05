import { InferInsertModel } from "drizzle-orm";
import { email_verifications, users } from "../../../database/schema.database";

export type authInsert = InferInsertModel<typeof users>;

export type emailVerification = InferInsertModel<typeof email_verifications>;

export type signUp = {
  name: string;
  email: string;
  password: string;
  confPassword: string;
};