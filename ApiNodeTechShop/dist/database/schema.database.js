"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orders = exports.carts = exports.products = exports.stores = exports.email_verifications = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const pg_core_2 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_2.pgTable)("users", {
    id: (0, pg_core_2.uuid)().primaryKey().notNull().defaultRandom(),
    name: (0, pg_core_2.text)().notNull(),
    email: (0, pg_core_2.text)().unique().notNull(),
    passwordHash: (0, pg_core_2.text)().notNull(),
    email_verified_at: (0, pg_core_2.timestamp)("email_verified_at", { withTimezone: true }),
    status: (0, pg_core_2.varchar)("status", { length: 20 }).notNull().default("pending"),
    created_at: (0, pg_core_2.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .default((0, drizzle_orm_1.sql) `NOW()`),
});
exports.email_verifications = (0, pg_core_2.pgTable)("email_verifications", {
    id: (0, pg_core_2.uuid)().primaryKey().notNull().defaultRandom(),
    user_id: (0, pg_core_2.uuid)("user_id").references(() => exports.users.id, { onDelete: "cascade" }).notNull(),
    tokenHash: (0, pg_core_2.text)().notNull(),
    expires_at: (0, pg_core_2.timestamp)("expires_at", { withTimezone: true }).notNull(),
    consumed_at: (0, pg_core_2.timestamp)("consumed_at", { withTimezone: true }),
    created_at: (0, pg_core_2.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .default((0, drizzle_orm_1.sql) `NOW()`),
});
exports.stores = (0, pg_core_2.pgTable)("stores", {
    id: (0, pg_core_2.uuid)().primaryKey().notNull().defaultRandom(),
    boss_id: (0, pg_core_2.uuid)("boss_id").references(() => exports.users.id, { onDelete: "cascade" }).notNull(),
    rating: (0, pg_core_2.integer)(),
    storeName: (0, pg_core_2.text)().unique().notNull(),
    email: (0, pg_core_2.text)().notNull(),
    created_at: (0, pg_core_2.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .default((0, drizzle_orm_1.sql) `NOW()`),
});
exports.products = (0, pg_core_2.pgTable)("products", {
    id: (0, pg_core_2.uuid)().primaryKey().defaultRandom().notNull(),
    store_id: (0, pg_core_2.uuid)("store_id").references(() => exports.stores.id, { onDelete: "cascade" }).notNull(),
    productName: (0, pg_core_2.text)().notNull(),
    category: (0, pg_core_2.text)().notNull(),
    rating: (0, pg_core_2.integer)(),
    price: (0, pg_core_1.numeric)("price", { precision: 10, scale: 2 }).notNull(),
    description: (0, pg_core_2.text)(),
    estoque: (0, pg_core_2.integer)().default(0).notNull(),
    image: (0, pg_core_2.text)().notNull(),
    created_at: (0, pg_core_2.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .default((0, drizzle_orm_1.sql) `NOW()`),
});
exports.carts = (0, pg_core_2.pgTable)("carts", {
    id: (0, pg_core_2.uuid)().primaryKey().notNull().defaultRandom(),
    user_id: (0, pg_core_2.uuid)("user_id").references(() => exports.users.id, { onDelete: "cascade" }).notNull(),
    product_id: (0, pg_core_2.uuid)("product_id")
        .notNull()
        .references(() => exports.products.id),
    quantity: (0, pg_core_2.integer)().notNull().default(0),
    created_at: (0, pg_core_2.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .default((0, drizzle_orm_1.sql) `NOW()`),
});
exports.orders = (0, pg_core_2.pgTable)("orders", {
    id: (0, pg_core_2.uuid)().primaryKey().notNull().defaultRandom(),
    user_id: (0, pg_core_2.uuid)("user_id").references(() => exports.users.id, { onDelete: "cascade" }).notNull(),
    store_id: (0, pg_core_2.uuid)("store_id").references(() => exports.stores.id, { onDelete: "cascade" }).notNull(),
    product_id: (0, pg_core_2.uuid)("product_id")
        .notNull()
        .references(() => exports.products.id),
    status: (0, pg_core_2.text)().notNull().default("Processando"),
    quantity: (0, pg_core_2.integer)().notNull().default(0),
    created_at: (0, pg_core_2.timestamp)("created_at", { withTimezone: true })
        .notNull()
        .default((0, drizzle_orm_1.sql) `NOW()`),
});
