import { sql } from "drizzle-orm";
import { text } from "drizzle-orm/pg-core";
import { timestamp } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";
import { integer } from "drizzle-orm/pg-core";
import { uuid } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: text().notNull(),
  email: text().unique().notNull(),
  passwordHash: text().notNull(),
  email_verified_at: timestamp("email_verified_at", { withTimezone: true}),
  status: varchar("status", {length: 20}).notNull().default("pending"),
  created_At: timestamp("created_At", {withTimezone: true}).notNull().default(sql`NOW()`)
});

export const email_Verifications = pgTable("email_verifications", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  user_Id: uuid("user_id").references(()=> users.id, { onDelete: "cascade" }),
  tokenHash: text().notNull(),
  expires_At: timestamp("expires_At", {withTimezone: true}).notNull(),
  consume_At: timestamp("consumer_At", {withTimezone: true}),
  created_At: timestamp("created_At", {withTimezone: true}).notNull().default(sql`NOW()`)
})

export const products = pgTable("products", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: text().notNull(),
  estoque: integer().notNull().default(0),
  image: text().notNull(),
  price: integer().default(0),
});

export const carts = pgTable("carts", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer().notNull().default(0),
  datatime: timestamp().defaultNow(),
});

export const orders = pgTable("orders", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  user_id: uuid("user_id")
    .notNull()
    .references(() => users.id),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer().notNull().default(0),
  datatime: timestamp().defaultNow(),
});
