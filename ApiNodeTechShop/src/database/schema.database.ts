import { sql } from "drizzle-orm";
import { text, timestamp, varchar, integer, uuid, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: text().notNull(),
  email: text().unique().notNull(),
  passwordHash: text().notNull(),
  email_verified_at: timestamp("email_verified_at", { withTimezone: true }),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});

export const email_verifications = pgTable("email_verifications", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text().notNull(),
  expires_at: timestamp("expires_at", { withTimezone: true }).notNull(),
  consumed_at: timestamp("consumed_at", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});

export const products = pgTable("products", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  name: text().notNull(),
  estoque: integer().notNull().default(0),
  image: text().notNull(),
  price: integer().default(0),
});

export const carts = pgTable("carts", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer().notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});

export const orders = pgTable("orders", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.id),
  quantity: integer().notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});
