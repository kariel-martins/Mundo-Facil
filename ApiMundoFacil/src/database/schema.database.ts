import { sql } from "drizzle-orm";
import { numeric } from "drizzle-orm/pg-core";
import {
  text,
  timestamp,
  varchar,
  integer,
  uuid,
  pgTable,
} from "drizzle-orm/pg-core";

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
  user_id: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  tokenHash: text().notNull(),
  expires_at: timestamp("expires_at", { withTimezone: true }).notNull(),
  consumed_at: timestamp("consumed_at", { withTimezone: true }),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});

export const stores = pgTable("stores", { 
  id: uuid().primaryKey().notNull().defaultRandom(),
  boss_id: uuid("boss_id").references(()=> users.id, {onDelete: "cascade"}).notNull(),
  rating: integer(),
  storeName: text().unique().notNull(),
  email: text().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
})

export const products = pgTable("products", {
  id: uuid().primaryKey().defaultRandom().notNull(),
  store_id: uuid("store_id").references(()=> stores.id, {onDelete: "cascade"}).notNull(),
  productName: text().notNull(),
  category: text().notNull(),
  rating: integer(),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  description: text(),
  estoque: integer().default(0).notNull(),
  image: text().notNull(),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});

export const carts = pgTable("carts", {
  id: uuid().primaryKey().notNull().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
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
  user_id: uuid("user_id").references(() => users.id, { onDelete: "cascade" }).notNull(),
  store_id: uuid("store_id").references(() => stores.id, { onDelete: "cascade" }).notNull(),
  product_id: uuid("product_id")
    .notNull()
    .references(() => products.id),
  status: text().notNull().default("Processando"),
  quantity: integer().notNull().default(0),
  created_at: timestamp("created_at", { withTimezone: true })
    .notNull()
    .default(sql`NOW()`),
});
