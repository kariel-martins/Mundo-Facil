import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { email_verifications, stores, users } from "../../../database/schema.database";

export type User = InferSelectModel<typeof users>

export type authInsert = InferInsertModel<typeof users>;

export type emailVerification = InferInsertModel<typeof email_verifications>;

export type Store = InferSelectModel<typeof stores> 

export type signUp = {
  name: string;
  email: string;
  password: string;
  confPassword: string;
};